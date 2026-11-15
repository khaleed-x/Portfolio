---
title: Why I default to modular monoliths
date: 2026-11-15
summary: Notes on module boundaries, and why I reach for a modular monolith before microservices.
tags: [architecture, dotnet]
image: /og-default.png
draft: false
---



When starting a new application, one of the earliest architectural decisions is how the system should be structured.

Microservices are often presented as the natural choice for building scalable applications. However, introducing distributed services also introduces operational complexity, network communication, data consistency challenges, and additional infrastructure requirements.

For many applications, that complexity is unnecessary at the beginning.

I generally prefer starting with a **modular monolith**: a single deployable application internally organized into well-defined, independent modules.

The goal is to establish a structure that supports growth without introducing distributed-system complexity before it is needed.

## What Is a Module Boundary?

A module boundary defines where one part of an application ends and another begins.

Each module is responsible for a specific business capability and should own its internal logic, rules, and data access responsibilities.

For example, an application might contain:

- **Identity:** Authentication, authorization, and user management.
- **Billing:** Payments, invoices, and transaction processing.
- **Notifications:** Email, SMS, and other communication workflows.
- **Orders:** Order creation, processing, and management.

Although these modules exist within the same application, they should not freely access or manipulate one another's internal implementation.

Instead, communication should happen through clearly defined contracts or interfaces.

This creates boundaries that make responsibilities easier to understand and changes easier to manage.

## Why Not Just Use a Layered Monolith?

A layered architecture is useful for separating technical responsibilities.

For example, an application may have:

- Presentation layer
- Application layer
- Domain layer
- Infrastructure layer

However, organizing an application only by technical layers can become problematic as the system grows.

Consider an application where the controllers, services, repositories, and entities for every business feature are grouped separately.

As more features are introduced, developers may find themselves navigating large folders containing unrelated functionality. Business responsibilities become less obvious, and different parts of the application can become tightly coupled.

The problem is not the layered architecture itself. The problem is allowing technical organization to replace clear business boundaries.

A modular monolith addresses this by organizing the application around business capabilities while still allowing each module to use appropriate internal layers.

For example:

```text
src/
├── Modules/
│   ├── Identity/
│   │   ├── Domain/
│   │   ├── Application/
│   │   ├── Infrastructure/
│   │   └── Presentation/
│   │
│   ├── Billing/
│   │   ├── Domain/
│   │   ├── Application/
│   │   ├── Infrastructure/
│   │   └── Presentation/
│   │
│   └── Notifications/
│       ├── Domain/
│       ├── Application/
│       ├── Infrastructure/
│       └── Presentation/
│
└── Shared/
```

This structure makes it easier to identify which module owns a particular responsibility.

It also encourages developers to think about business capabilities rather than simply deciding where another controller or service class should go.

## When Should a Module Become a Separate Service?

A modular monolith does not mean an application must remain a monolith forever.

As requirements evolve, certain modules may develop needs that justify independent deployment.

However, extracting a module should be a deliberate architectural decision, not an automatic response to application growth.

Some situations that may justify the transition include:

**1. Independent scaling**

A particular module may experience significantly higher workloads than the rest of the application. Running it independently could allow its resources to be scaled without scaling the entire system.

**2. Independent deployment**

A module may require frequent releases that should not depend on the deployment schedule of the rest of the application.

**3. Different operational requirements**

Some workloads may require different infrastructure, processing strategies, or availability requirements.

**4. Clear business and technical boundaries**

The module should already have well-defined responsibilities and limited dependencies on other parts of the application.

This last point is particularly important.

Extracting tightly coupled code into separate services does not automatically create a good microservices architecture. It can simply move existing coupling across network boundaries, making the system harder to operate.

A well-structured modular monolith provides a better starting point because its boundaries can make future extraction more manageable.

## The Trade-Off

Modular monoliths are not without disadvantages.

They still require discipline. Developers must respect module boundaries, avoid unnecessary dependencies, and prevent shared components from becoming a place where unrelated business logic accumulates.

A single deployment unit also means modules generally share the same release lifecycle and application runtime.

These are important trade-offs, but for many applications, they are reasonable compared with the operational demands of independently deployed services.

## Final Thoughts

I don't consider microservices the default destination for every growing application.

I prefer starting with a well-structured modular monolith, establishing clear business boundaries, and allowing actual requirements to guide architectural decisions.

This approach keeps development and deployment relatively straightforward while providing room for the system to evolve.

**Good architecture is not about introducing the most sophisticated structure. It is about choosing a structure that solves today's problems without making tomorrow's changes unnecessarily difficult.**