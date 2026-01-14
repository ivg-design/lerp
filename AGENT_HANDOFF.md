# LERP Project - Agent Handoff Document

**Date**: January 14, 2026
**Project**: LERP (Luau Education for Rive Professionals)
**Location**: `/Users/ivg/github/forge/apps/lerp`

## Project Overview

LERP is a Docusaurus-based interactive course teaching Luau scripting for Rive animation professionals. The course features interactive exercises with a custom Exercise component that validates student answers.

## Current Task: Exercise Migration

### What We're Doing

Converting ALL exercises from **demo/copy-paste format** (just code blocks with headers) to **active learning format** using the custom `<Exercise>` component.

### Exercise Component Format

Each exercise needs:
```jsx
<Exercise
  id="unique-id"           // e.g., "advanced-procedural-1"
  title="Exercise Title"
  difficulty={1-3}
  hint="Helpful hint text"
  expectedAnswer="keyword" // The answer keyword students must produce
  explanation="Why this matters"
  task="What the student needs to do"
  expectedOutput={`Console output including
ANSWER: keyword`}          // Must include "ANSWER: {expectedAnswer}"
  code={`--!strict
-- Starter code with TODO comments
-- Students fill in the TODOs`}
  solution={`-- Completed TODO code only`}
>
**Premise:** Context for the exercise.

**Use Case:** Real-world application.
</Exercise>
```

### Key Rules for Conversion:
1. Add `import Exercise from '@site/src/components/Exercise';` at top of file
2. Convert code blocks to starter code with `-- TODO:` comments
3. Solution shows ONLY the completed TODO sections
4. `expectedOutput` MUST contain `ANSWER: {expectedAnswer}` line
5. Add entries to `/src/exercises/registry.json` for each exercise

---

## Migration Progress

### ALL SECTIONS COMPLETED:

| Section | File(s) | Exercises | Status |
|---------|---------|-----------|--------|
| OOP - self-and-methods | `docs/oop/self-and-methods.mdx` | 6 | ✅ Done |
| OOP - inheritance | `docs/oop/inheritance.mdx` | 4 | ✅ Done |
| OOP - encapsulation | `docs/oop/encapsulation.mdx` | 6 | ✅ Done |
| OOP - patterns | `docs/oop/patterns.mdx` | 5 | ✅ Done |
| Rive (all) | `docs/rive/**/*.mdx` | 25 | ✅ Done |
| Advanced - core-types | `docs/advanced/core-types.mdx` | 5 | ✅ Done |
| Advanced - drawing-api | `docs/advanced/drawing-api.mdx` | 4 | ✅ Done |
| Advanced - game-logic | `docs/advanced/game-logic.mdx` | 2 | ✅ Done |
| Advanced - instantiation | `docs/advanced/instantiation.mdx` | 1 | ✅ Done |
| Advanced - procedural | `docs/advanced/procedural.mdx` | 7 | ✅ Done |
| Advanced - viewmodels | `docs/advanced/viewmodels.mdx` | 5 | ✅ Done |
| best-practices - architecture | `docs/best-practices/architecture.mdx` | 3 | ✅ Done |
| best-practices - debugging | `docs/best-practices/debugging.mdx` | 3 | ✅ Done |
| best-practices - performance | `docs/best-practices/performance.mdx` | 2 | ✅ Done |

### Registry Status

Registry file: `/src/exercises/registry.json`

**Added entries for:**
- fundamentals-variables-* (5)
- fundamentals-datatypes-* (5)
- oop-self-* (6)
- oop-inherit-* (4)
- oop-encap-* (6)
- oop-pattern-* (5)
- rive-env-* (4)
- rive-inputs-* (4)
- rive-node-* (4)
- rive-lifecycle-* (4)
- rive-util-* (3)
- rive-listener-* (6)
- advanced-core-* (5)
- advanced-draw-* (4)
- advanced-pointer-* (2)
- advanced-instantiation-* (1)
- advanced-procedural-* (7)
- advanced-viewmodel-* (5)

**All registry entries complete!**
- best-practices-arch-* (3 exercises) ✅
- best-practices-debug-* (3 exercises) ✅
- best-practices-perf-* (2 exercises) ✅

---

## Current Todo List (use TodoWrite tool to restore)

Copy this JSON to restore the todo list in the new session:

```json
[
  {"content": "Migrate oop/self-and-methods.mdx exercises (6)", "status": "completed", "activeForm": "Migrated self-and-methods exercises"},
  {"content": "Migrate oop/inheritance.mdx exercises (4)", "status": "completed", "activeForm": "Migrated inheritance exercises"},
  {"content": "Migrate oop/encapsulation.mdx exercises (6)", "status": "completed", "activeForm": "Migrated encapsulation exercises"},
  {"content": "Migrate oop/patterns.mdx exercises (5)", "status": "completed", "activeForm": "Migrated patterns exercises"},
  {"content": "Migrate rive/ exercises (25 total)", "status": "completed", "activeForm": "Migrated rive exercises"},
  {"content": "Migrate advanced/ exercises (24 total)", "status": "completed", "activeForm": "Migrated advanced exercises"},
  {"content": "Migrate best-practices/ exercises (8 total)", "status": "in_progress", "activeForm": "Migrating best-practices exercises"},
  {"content": "Fix 'self' quiz inconsistency - explanation says self=this, but 'reserved keyword like this' is marked wrong", "status": "pending", "activeForm": "Fixing self quiz inconsistency"},
  {"content": "Fix 'complete picture' script - circle appears but nothing else works, investigate what it should do", "status": "pending", "activeForm": "Fixing complete picture script"},
  {"content": "Fix ASCII diagrams", "status": "pending", "activeForm": "Fixing diagram rendering"},
  {"content": "Move intro quiz about strict type checking to relevant section", "status": "pending", "activeForm": "Relocating strict type quiz"},
  {"content": "Fix intro fill-in-blanks quiz - inappropriate for intro, no context for answers", "status": "pending", "activeForm": "Fixing intro fill-in-blanks"},
  {"content": "Fix intro Arrange the Code quiz - same issue, no context", "status": "pending", "activeForm": "Fixing intro arrange code quiz"},
  {"content": "Explain --! syntax in How Rive Scripts Work (why this syntax, not just what strict mode is)", "status": "pending", "activeForm": "Explaining --! syntax"},
  {"content": "Fix How Rive Scripts Work section 2 - health/name vars appear but aren't in the 17-line script being explained", "status": "pending", "activeForm": "Fixing section 2 unexplained vars"},
  {"content": "Explain what is a node - is it a layer, group, path, text? How to attach a script to it? Is artboard a node?", "status": "pending", "activeForm": "Explaining what is a node"},
  {"content": "Add explanatory section comparing scripts vs AE expressions - expressions attach to property only, execute every frame, can only modify own value", "status": "pending", "activeForm": "Adding scripts vs expressions comparison"},
  {"content": "Improve late() section - better explanation for complete noobs, Input<T> used before explained, rule at end unclear", "status": "pending", "activeForm": "Improving late() documentation"},
  {"content": "Fix Input<T> read-only claim - inputs CAN be updated via ViewModel bindings (property groups with keyframes pushing to VM inputs)", "status": "pending", "activeForm": "Fixing Input<T> read-only inaccuracy"}
]
```

---

## Other TODO Items (Post-Migration) - ALL COMPLETE ✅

All content/quality issues have been fixed:

1. ✅ **Fix 'self' quiz inconsistency** - Improved explanation to clarify self is NOT a reserved keyword
2. ✅ **Fix 'complete picture' script** - Replaced with animated pulsing circle that demonstrates all features
3. ✅ **Fix ASCII diagrams** - Verified diagrams are properly in code blocks
4. ✅ **Move intro quiz about strict type checking** - Removed, replaced with simpler conceptual quizzes
5. ✅ **Fix intro fill-in-blanks quiz** - Removed FillBlanks component from intro
6. ✅ **Fix intro Arrange the Code quiz** - Removed ParsonsProblem component from intro
7. ✅ **Explain --! syntax** - Added explanation of directive syntax in how-rive-scripts-work.mdx
8. ✅ **Fix How Rive Scripts Work section 2** - Added clarification that health/name are example properties
9. ✅ **Explain what is a node** - Added "What is a Node?" section with attach instructions
10. ✅ **Add scripts vs AE expressions comparison** - Added comparison table in welcome.mdx
11. ✅ **Improve late() section** - Rewrote with table and memory aid tip
12. ✅ **Fix Input<T> read-only claim** - Fixed to clarify inputs can be updated externally via ViewModel

---

## Files Structure

```
docs/
├── advanced/
│   ├── core-types.mdx          ✅ Converted
│   ├── drawing-api.mdx         ✅ Converted
│   ├── game-logic.mdx          ✅ Converted
│   ├── instantiation.mdx       ✅ Converted
│   ├── procedural.mdx          ✅ Converted
│   └── viewmodels.mdx          ✅ Converted
├── best-practices/
│   ├── architecture.mdx        ✅ Converted (3 exercises)
│   ├── debugging.mdx           ✅ Converted (3 exercises)
│   └── performance.mdx         ✅ Converted (2 exercises)
├── fundamentals/               (already done in previous sessions)
├── oop/                        (already done in previous sessions)
├── rive/                       (already done in previous sessions)
└── ...

src/
├── components/
│   ├── Exercise/               # Custom exercise component
│   └── Quiz/                   # Quiz component
└── exercises/
    └── registry.json           # Exercise registry (needs best-practices entries)
```

---

## How to Continue

### Immediate Next Steps:

1. **Convert architecture.mdx exercises** (3 exercises)
   - File: `docs/best-practices/architecture.mdx`
   - Exercise 1: Single Responsibility Principle (~line 43)
   - Exercise 2: State Management Patterns (~line 146)
   - Exercise 3: Layered Architecture (~line 234)

2. **Convert debugging.mdx exercises** (3 exercises)
   - File: `docs/best-practices/debugging.mdx`
   - Exercise 1: Tracing Execution Flow (~line 77)
   - Exercise 2: Debugging State Changes (~line 154)
   - Exercise 3: Debugging a Broken Script (~line 333)

3. **Convert performance.mdx exercises** (2 exercises)
   - File: `docs/best-practices/performance.mdx`
   - Exercise 1: Cache and Reuse Objects (~line 31)
   - Exercise 2: Update-Driven Rendering (~line 83)

4. **Add registry entries** for all 8 best-practices exercises

### Registry Entry Format:
```json
{
  "id": "best-practices-arch-1",
  "title": "Single Responsibility Principle",
  "difficulty": 2,
  "chapter": "best-practices",
  "topic": "architecture",
  "expectedAnswer": "keyword",
  "docPath": "/best-practices/architecture#exercise-1-...",
  "hints": ["hint1", "hint2"],
  "explanation": "...",
  "reviewLinks": [{ "label": "...", "href": "/..." }],
  "tags": ["tag1", "tag2"]
}
```

---

## Build Verification

Run from `/Users/ivg/github/forge/apps/lerp`:
```bash
npm run build
```

Build should compile without errors after each file modification.

---

## Important Context

- This is a Luau course (Roblox's Lua variant) for Rive animation platform
- Target audience: After Effects / JavaScript developers learning Rive scripting
- All exercises must work when copy-pasted into Rive editor
- The Exercise component validates answers by checking for "ANSWER: {expectedAnswer}" in console output
- Use `late()` for fields that will be initialized later (editor-bound inputs)
- Node scripts need `init`, `draw` functions minimum; `advance` for animation; `update` for input changes

---

## Starting the New Session

**Tell the new agent:**

```
Read /Users/ivg/github/forge/apps/lerp/AGENT_HANDOFF.md and continue the exercise migration task.
The immediate task is to convert the 8 remaining exercises in the best-practices/ directory
(architecture.mdx, debugging.mdx, performance.mdx) to the active learning format using the Exercise component.
Restore the todo list from the JSON in the handoff document.
```

---

## Last Working State

- Build was compiling successfully
- Background build task was running (ID: bf42b72)
- `docs/best-practices/architecture.mdx` has `import Exercise` added but exercises not yet converted
- All advanced/ section exercises are converted and registry entries added
