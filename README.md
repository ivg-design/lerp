# LERP — Luau Education for Rive Professionals

LERP is a free, open-source interactive course for learning Rive Luau scripting.

It is built for people who already understand visual animation workflows in Rive, but want to move into scripting, procedural behavior, data-driven interfaces, and interactive systems inside the Rive Editor.

Live course: https://forge.mograph.life/apps/lerp/

---

## What is LERP?

Rive’s scripting engine makes it possible to add logic, data binding, procedural behavior, custom drawing, and interactivity to animations.

LERP was created to provide a structured path for learning that system.

This is not a general Luau course and not a separate coding sandbox. LERP teaches Luau in the context of Rive’s runtime, APIs, protocols, and production workflows.

Every exercise is designed around real scripting inside the Rive Editor.

---

## What the course includes

- 8 structured parts
- 90 docs and reference pages
- 222 hands-on coding exercises
- 203 quizzes
- 4 guided project paths
- 11 Rive protocol lessons
- real-time validation
- zero paywalls
- no account required
- MIT licensed

---

## Why LERP exists

Many Rive users know keyframes, timelines, and state machines, but do not yet have a clear path into scripting.

LERP is designed to close that gap.

It starts at the beginning for learners who are new to code, while also giving experienced developers useful bridges into the way Rive scripting works, including comparisons, patterns, lifecycle concepts, and protocol-based design.

---

## Built for the Rive Editor

LERP does not teach scripting in abstraction.

The course is built around writing scripts in the actual Rive Editor, using the same environment and runtime model used in production. That means the concepts map directly to real Rive workflows instead of toy examples in a disconnected sandbox.

---

## Curriculum

### Part 01 — Getting Started
A practical introduction to Rive scripting and Luau in Rive.

Lessons include:
- Welcome to Rive Scripting
- Why Luau?
- Your First Script
- How Rive Scripts Work

### Part 02 — Luau Fundamentals
Core programming concepts needed to work effectively with Rive scripts.

Topics include:
- variables
- data types
- operators
- control flow
- functions
- tables
- iteration

### Part 03 — Type System
A focused guide to the parts of Luau’s type system that matter in practice.

Topics include:
- annotations
- strict mode
- custom types
- advanced types
- generics
- late initialization

### Part 04 — OOP Deep Dive
Protocol-oriented and object-style patterns used throughout Rive scripting.

Topics include:
- prototype-based programming
- metatables
- `__index`
- classes
- methods and `self`
- inheritance
- encapsulation
- patterns

### Part 05 — Rive Integration
The bridge between Luau syntax and actual Rive scripting architecture.

Topics include:
- environment
- script types
- script capability matrix
- inputs
- AI agent
- Node protocol
- Node lifecycle
- Layout protocol
- Converter protocol
- Path Effect protocol
- Listener Action protocol
- Transition Condition protocol
- Util protocol
- Test protocol

### Part 06 — Advanced Rive Scripting
Higher-level patterns for creating richer systems and visuals.

Topics include:
- core types
- Drawing API
- ViewModels
- Listener protocol
- game logic
- instantiation
- procedural techniques
- early-access GPU shaders and 3D-style rendering

### Part 07 — Best Practices
Production-focused guidance for writing maintainable and efficient scripts.

Topics include:
- architecture
- performance
- debugging
- resources

### Part 08 — Keystone Projects
Larger builds and guided labs that combine the course concepts into practical systems.

Projects:
- Interactive Button — pointer input + ViewModel triggers
- Data Visualization — bar chart driven by ViewModel data
- Catch the Stars — mini-game with clicking, scoring, and physics
- GPU Shader Example Labs — early-access GPUCanvas, shader, texture, and post-processing labs

---

## What makes LERP different

- Interactive, not just explanatory
- Built specifically for Rive scripting
- Teaches Luau through real Rive use cases
- Uses real-time validation for exercises
- Focuses on production-ready patterns
- No account, no paywall, no telemetry
- Progress is stored locally on your device

---

## Who it is for

LERP is for:

- motion designers learning to script in Rive
- creative technologists
- frontend developers working with Rive
- technical artists
- interactive designers
- anyone who wants to go beyond keyframes and state machines

You do not need prior programming experience to begin. The course starts from zero. Experience with JavaScript, After Effects expressions, game engines, or other scripting environments can help, but it is not required.

---

## What you will learn

By the end of the course, learners should be able to:

- understand how Rive scripts work
- write Luau confidently in Rive’s scripting context
- use Rive’s script protocols and lifecycle callbacks
- build procedural animation and custom behavior
- work with ViewModels and data-driven systems
- structure scripts for production use
- combine scripting with state machines effectively

---

## Course philosophy

LERP is designed around the idea that interactive creatives should be able to learn scripting without needing a traditional software-engineering setup.

The course keeps the barrier to entry low while still covering serious concepts such as types, metatables, protocols, lifecycles, architecture, debugging, and production workflows.

This is not filler content. It is meant to take learners from zero to runtime-ready Rive scripting.

---

## Privacy and accessibility

LERP is intentionally lightweight and privacy-friendly.

- no account required
- no tracking
- no telemetry
- progress stored locally via LocalStorage
- exportable progress data

All you need to use the course is the free Rive Editor.

---

## Open source

LERP is open source and contributions are welcome.

If you find an error, want to suggest an improvement, or want to contribute to the course, please open an issue or submit a pull request.

GitHub repo: https://github.com/ivg-design/lerp

---

## Related references inside the course

The course also includes dedicated reference sections for:

- API docs
- OOP patterns
- AI agent guidance

---

## License

MIT License.

---

## Author

Created by Ilya Gusinski / IVG Design.

LERP is an interactive scripting course for Rive, focused on helping designers and developers learn how to build real interactive systems with Luau inside the Rive Editor.

# Repository

This course is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Production is hosted on Vercel at `https://forge.mograph.life/apps/lerp/`.

The production-equivalent local build is:

```bash
node scripts/build-with-landing.mjs
```

The full release and production deployment protocol is documented in `docs/release-workflow.mdx`.
