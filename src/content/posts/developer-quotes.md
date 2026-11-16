---
title: 10 Programmer Quotes That Still Hit, and What They Really Mean
date: 2026-11-16T12:00
summary: Ten famous lines from computer science's best minds, with the idea behind each one and what it means for the code you write today.
tags: [quotes, engineering, fun-facts]
image: /dev-quotes.png
draft: false
---

Some one-liners stay popular for decades because they are painfully true. Here are ten I keep coming back to, with the idea behind each and what it means in everyday work.

## 1. On optimising too early

> "Premature optimization is the root of all evil."
> Donald Knuth

Knuth wrote that we should forget about small efficiencies most of the time, and keep our effort for the critical few percent of code. In practice: measure first, then optimise the slow part, not the part that merely looks slow.

## 2. On the two hard problems

> "There are only two hard things in Computer Science: cache invalidation and naming things."
> attributed to Phil Karlton

It is funny because every developer has stared at a variable name for ten minutes. It is serious because stale cache data and unclear names cause a huge share of real bugs.

## 3. On who code is for

> "Programs must be written for people to read..."
> Harold Abelson and Gerald Sussman, *Structure and Interpretation of Computer Programs*

The rest of the line says machines execute them only incidentally. Your compiler does not care about naming or structure, but the next person reading your code does, and that person is often you in six months.

## 4. On being too clever

Brian Kernighan pointed out that debugging is twice as hard as writing the code in the first place. So if you write code as cleverly as you possibly can, you are, by definition, not smart enough to debug it. Choose the boring, readable version.

## 5. On what tests can prove

> "Testing shows the presence, not the absence of bugs."
> Edsger Dijkstra

Passing tests mean you did not find a bug, not that none exists. Tests are a safety net, not a guarantee, so write the ones that cover the risky parts.

## 6. On the order of work

> "Make it work, make it right, make it fast."
> often credited to Kent Beck

First get something working. Then clean it up. Only then make it fast, and only if measurements say it is needed. Most projects get into trouble by doing these steps in reverse.

## 7. On estimates

> "It always takes longer than you expect..."
> Douglas Hofstadter

The full line adds, "even when you take into account Hofstadter's Law", which makes it a joke that loops back on itself. It is the best reason to add buffer to any estimate, and then to add a bit more.

## 8. On how teams shape systems

Melvin Conway observed in 1967 that organisations design systems that mirror their own communication structure. Three teams that barely talk will build three pieces of software that barely connect. This is why module boundaries in a modular monolith should follow real ownership, not just folders.

## 9. On the best kind of performance gain

John Ousterhout said the best performance improvement is the transition from the nonworking state to the working state. A fast app that crashes is slower than a slow app that works.

## 10. On simplicity

> "Simplicity is prerequisite for reliability."
> Edsger Dijkstra

Fewer moving parts means fewer places to fail. It is a good question to ask of any design: what can I remove?

## Developer folklore (no author needed)

- **"It works on my machine."** Every developer has said it. It is the reason containers exist.
- **Rubber duck debugging.** Explain your bug out loud to a rubber duck, and you often find the answer mid-sentence. The practice was popularised by the book *The Pragmatic Programmer*.
- **"There's no place like 127.0.0.1."** Your own computer's address, and the only place where the code always works.

Do you have a favourite that I missed? Share it in the comments.
