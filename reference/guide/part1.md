<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en

comment:  Part 1: Introduction to Rive and Luau - Part of the LERP Luau Guide

-->

# Part 1: Introduction to Rive and Luau

---

**Navigation:** [← Course](https://forge.mograph.life/apps/lerp/) | [Guide Index](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/index.md) | [API Ref](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/api-reference.md)

**Parts:** [1](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part1.md) | [2](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part2.md) | [3](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part3.md) | [4](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part4.md) | [5](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part5.md) | [6](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part6.md) | [7](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part7.md)

---

### 1. Welcome to Rive Scripting

Rive is a powerful tool for creating interactive graphics that run anywhere. Traditionally, Rive animations are driven by Timelines and the State Machine, which are excellent for predefined motion and transitions. However, complex interactivity, procedural generation, dynamic layouts, and game logic often require programmatic control.

Rive Scripting allows you to embed code directly within the Rive Editor, executing logic in real-time alongside your designs. This bridges the gap between design and development, enabling rapid iteration on code, design, and animation in one unified environment.

#### The Rive AI Coding Agent

Rive includes an **AI Coding Agent** built directly into the Editor. This assistant can help you:

- Create new scripts from natural language descriptions
- Edit and refactor existing code
- Explain unfamiliar script logic
- Debug issues by analyzing your code

The AI agent has seamless integration with Rive's scripting engine—no API keys, external apps, or setup required. It understands the Rive API and can generate correctly-typed code that works with your artboards and ViewModels.

### 2. Why Luau? The Power of Typed Scripting in Design

Rive selected Luau (pronounced "Loo-ow") as its scripting language. Luau is a fast, small, safe, and gradually typed scripting language derived from Lua 5.1, primarily developed and maintained by Roblox.

Why is this choice significant for a design tool?

- **Performance and Size**: Real-time graphics demand efficiency. Luau's highly optimized Virtual Machine (VM) ensures scripts run quickly without causing frame drops, and its small footprint is crucial for web deployment.

- **Embeddability**: Luau is designed to be easily integrated into larger C++ applications, like the Rive Editor and its various runtimes.

- **Gradual Typing (The Key Advantage)**: This is the cornerstone of the Rive scripting experience. While Luau can be written dynamically (like JavaScript or standard Lua), it supports a robust type system.
  - **Robustness**: Types help catch errors before the animation even runs. If you try to assign a Color where a number is expected, the editor flags it immediately.
  - **Tooling**: Rive generates Luau type definitions **directly from its C++ engine APIs**—paths, shapes, transforms, artboards, view models, and more. The Editor builds a typed Abstract Syntax Tree (AST) of your script and passes it to Luau's type checker. This powers accurate autocomplete (IntelliSense) and ensures that API changes automatically propagate to the type definitions.

- **Simple Semantics**: Based on Lua, the syntax is minimalist and accessible, making it easier for designers and new programmers to learn.

*(Reference: Rive Blog: Why Scripting runs on Luau)*

---

