---
title: Native AOT in .NET: What You Gain, What You Give Up
date: 2026-11-15
summary: My notes before building a modular monolith with Native AOT instead of JIT: the real benefits, the trade-offs, and how to set it up.
tags: [dotnet, native-aot, architecture]
image: /native-aot.png
draft: false
---

Every .NET app you have run so far did a bit of last-minute cooking. Your C# compiles to an intermediate language (IL), and when the app starts, the **JIT** (just-in-time) compiler turns that IL into machine code, method by method, as it is needed.

**Native AOT** (ahead-of-time) moves that work to build time. You publish a self-contained native executable. There is no JIT in it and no separate .NET runtime to install on the server.

My next C# project will be a modular monolith compiled with Native AOT instead of JIT. I have not shipped one yet, so this post is my pre-flight check: what the trade really is, and what to watch for.

## What you gain

- **Faster startup.** The code is already compiled, so the app does not spend its first moments warming up. This matters most for containers that scale up often and for serverless workloads.
- **Smaller memory footprint.** There is no JIT compiler in memory and the trimmer removes code you never call. That helps when you run many instances on the same machine.
- **Simpler deployment.** One executable, no runtime installation on the target. Microsoft's own guidance says the benefits are largest for workloads with a high number of deployed instances, such as cloud infrastructure.
- **Less surface to attack.** Trimming removes unused code, and without a JIT there is no code being generated at runtime.

I am deliberately not quoting benchmark numbers here. They depend heavily on the app, the hardware and the container. Measure your own: image size, memory at idle, and time to first request.

## What you give up

Native AOT has real limits, and Microsoft documents them plainly:

- **No dynamic loading.** `Assembly.LoadFile` and similar plugin-style loading are out.
- **No runtime code generation.** Anything built on `System.Reflection.Emit` will not work.
- **Trimming is required.** The compiler removes code it cannot prove you use, so anything found only through reflection can disappear.
- **Single-file output has known incompatibilities** with some libraries.
- **Not everything is annotated yet.** Some libraries, and parts of the runtime, still produce warnings you cannot fix yourself.

There are softer costs too:

- **Slower builds.** Publishing does a lot more work, so plan for it in CI.
- **Build on the OS you deploy to.** Cross-OS compilation is not the happy path, so a Linux container in CI is the usual answer for Linux targets.
- **Peak throughput is not guaranteed to be better.** A JIT can optimise using what it sees while the app runs. AOT trades some of that for startup and memory. For a long-running, CPU-heavy service, measure before you decide.
- **Framework features are limited.** In ASP.NET Core, minimal APIs are the main supported path. MVC controllers with Razor views are not a good fit, so check the Native AOT support table for your .NET version before you commit.

## Setting it up

For a new API, start from the minimal API model. Enabling AOT is one property:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <PublishAot>true</PublishAot>
    <InvariantGlobalization>true</InvariantGlobalization>
  </PropertyGroup>
</Project>
```

The biggest code change is JSON. Reflection-based serialization does not survive trimming, so you use **source generation** instead. The compiler writes the serialization code ahead of time:

```csharp
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonContext.Default));

var app = builder.Build();

app.MapGet("/health", () => new Health("ok"));

app.Run();

public record Health(string Status);

[JsonSerializable(typeof(Health))]
internal partial class AppJsonContext : JsonSerializerContext { }
```

`CreateSlimBuilder` starts with a smaller set of defaults than `CreateBuilder`, which suits AOT. Every type you return or accept in JSON gets a `[JsonSerializable]` line.

Then publish:

```bash
dotnet publish -c Release
```

Read the warnings. Codes like `IL2026` and `IL3050` tell you a piece of code relies on reflection or runtime code generation. Each one is a place that may break in the published app, so fix them as they appear instead of letting them pile up.

## Where it clashes with common habits

- **Assembly scanning.** Many libraries find handlers, mappers or validators by scanning assemblies at startup. That is reflection, and trimming can remove what it expects to find. Prefer explicit registration, or libraries that offer source generators.
- **Reflection-heavy mappers and serializers.** Check each package for AOT support before you depend on it. Library authors can mark compatibility with `IsAotCompatible`.
- **ORMs.** Entity Framework Core's Native AOT story has improved, but it has been the least straightforward part of the stack. Check the current EF Core documentation for your version, and prototype your data layer early, not last.
- **Runtime-generated documentation.** Anything that inspects your endpoints at runtime, such as some OpenAPI tooling, needs an AOT-friendly path.

## Why it pairs well with a modular monolith

A modular monolith puts clear boundaries between modules, such as Catalog, Orders and Billing, inside one deployable app. The habit that makes those boundaries clean also happens to suit AOT: **registering each module explicitly** rather than discovering modules by scanning.

```csharp
public interface IModule
{
    void AddServices(IServiceCollection services, IConfiguration config);
    void MapEndpoints(IEndpointRouteBuilder endpoints);
}

IModule[] modules = [new CatalogModule(), new OrdersModule()];

foreach (var module in modules)
    module.AddServices(builder.Services, builder.Configuration);

var app = builder.Build();

foreach (var module in modules)
    module.MapEndpoints(app);
```

Everything is visible at compile time. The trimmer can see what is used, a new developer can read the list of modules in one place, and removing a module is deleting a line. That is the kind of code AOT likes: no magic.

## My pre-flight checklist

1. Start with a minimal API project, not a port of an existing app.
2. Turn on `PublishAot` from day one, so every warning is fresh and small.
3. Use source-generated JSON for every request and response type.
4. Check every package for AOT compatibility before adding it.
5. Prototype the database layer in the first week.
6. Publish in a Linux container in CI, and run the published binary, not just the tests, on every build.
7. Record image size, idle memory and time to first request, and compare with a JIT build of the same app.

## The verdict

Native AOT is not a free upgrade. It is a trade: you give up some flexibility and build speed, and you get faster starts, lower memory and simpler deployment. For a new, API-focused service built with explicit modules and source-generated serialization, I think the trade is worth making. For an app that leans heavily on reflection, plugins or MVC views, it probably is not.

When the project is far enough along, I will follow up with real numbers from my own build.
