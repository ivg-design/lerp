# Exercise Migration Assignments

**Date:** 2026-01-14
**Total Exercises:** 186
**Split:** Codex (108) | Claude (78)

---

## Instructions for Both Agents

### Goal
Convert copy-paste demos into active learning exercises using the template in `EXERCISE-TEMPLATE.md`.

### Key Changes Required

For each exercise:

1. **Remove complete working code** - Replace with starter code containing `-- TODO:` markers
2. **Add Premise section** - Why does this concept matter? (2-3 sentences)
3. **Add Use Case section** - Detailed real-world scenario (3-5 sentences)
4. **Create specific tasks** - Numbered assignment items
5. **Design ANSWER line** - Output that proves correct completion
6. **Add ExerciseValidator** - Component with exerciseId and expectedAnswer
7. **Add Checklist** - Self-verification items

### ANSWER Line Requirements

- Must be deterministic (same every run if code is correct)
- Must verify the actual work was done
- Format: `ANSWER: value1, value2, value3` (no spaces after commas)
- Keep compact but readable

### File Naming Convention

Exercise IDs follow: `{chapter}-{topic}-{number}`
- Example: `fundamentals-variables-1`, `types-generics-3`, `oop-metatables-2`

### Registry Updates

After updating exercises in MDX files, add entries to `src/exercises/registry.json`:

```json
{
  "id": "fundamentals-variables-1",
  "title": "Character Stats",
  "difficulty": 1,
  "chapter": "fundamentals",
  "topic": "variables",
  "expectedAnswer": "ANSWER: Warrior, Lv.5, 1250.5xp, ult=true",
  "docPath": "/fundamentals/variables#exercise-1-character-stats",
  "hints": ["Hint 1", "Hint 2"],
  "explanation": "Why this answer is correct...",
  "reviewLinks": [
    { "label": "Variables", "href": "/fundamentals/variables" }
  ],
  "tags": ["variables", "types"]
}
```

---

## CODEX ASSIGNMENTS (~104 exercises)

### Phase 1: Fundamentals (43 exercises)

| File | Exercises | IDs |
|------|-----------|-----|
| `docs/fundamentals/variables.mdx` | 5 | fundamentals-variables-1 through 5 |
| `docs/fundamentals/data-types.mdx` | 5 | fundamentals-datatypes-1 through 5 |
| `docs/fundamentals/operators.mdx` | 6 | fundamentals-operators-1 through 6 |
| `docs/fundamentals/control-flow.mdx` | 7 | fundamentals-controlflow-1 through 7 |
| `docs/fundamentals/functions.mdx` | 6 | fundamentals-functions-1 through 6 |
| `docs/fundamentals/tables.mdx` | 6 | fundamentals-tables-1 through 6 |
| `docs/fundamentals/iteration.mdx` | 8 | fundamentals-iteration-1 through 8 |

### Phase 2: Types (43 exercises)

| File | Exercises | IDs |
|------|-----------|-----|
| `docs/types/intro.mdx` | 6 | types-intro-1 through 6 |
| `docs/types/annotations.mdx` | 6 | types-annotations-1 through 6 |
| `docs/types/strict-mode.mdx` | 6 | types-strictmode-1 through 6 |
| `docs/types/custom-types.mdx` | 7 | types-customtypes-1 through 7 |
| `docs/types/generics.mdx` | 6 | types-generics-1 through 6 |
| `docs/types/advanced-types.mdx` | 6 | types-advancedtypes-1 through 6 |
| `docs/types/late-initializer.mdx` | 6 | types-lateinit-1 through 6 |

### Phase 3: OOP (22 exercises - first 4 files)

| File | Exercises | IDs |
|------|-----------|-----|
| `docs/oop/prototype-based.mdx` | 4 | oop-prototypes-1 through 4 |
| `docs/oop/metatables.mdx` | 6 | oop-metatables-1 through 6 |
| `docs/oop/index-metamethod.mdx` | 6 | oop-indexmeta-1 through 6 |
| `docs/oop/classes.mdx` | 6 | oop-classes-1 through 6 |

**CODEX TOTAL: 43 + 43 + 22 = 108 exercises**

---

## CLAUDE ASSIGNMENTS (~52 exercises)

### Phase 3: OOP (remaining 4 files - 21 exercises)

| File | Exercises | IDs |
|------|-----------|-----|
| `docs/oop/self-and-methods.mdx` | 6 | oop-selfmethods-1 through 6 |
| `docs/oop/inheritance.mdx` | 4 | oop-inheritance-1 through 4 |
| `docs/oop/encapsulation.mdx` | 6 | oop-encapsulation-1 through 6 |
| `docs/oop/patterns.mdx` | 5 | oop-patterns-1 through 5 |

### Phase 4: Rive Integration (21 exercises)

| File | Exercises | IDs |
|------|-----------|-----|
| `docs/rive/environment.mdx` | 4 | rive-environment-1 through 4 |
| `docs/rive/inputs.mdx` | 4 | rive-inputs-1 through 4 |
| `docs/rive/protocols/node-protocol.mdx` | 4 | rive-nodeprotocol-1 through 4 |
| `docs/rive/protocols/node-lifecycle.mdx` | 4 | rive-nodelifecycle-1 through 4 |
| `docs/rive/protocols/util-protocol.mdx` | 3 | rive-utilprotocol-1 through 3 |
| `docs/rive/protocols/listener-protocol.mdx` | 6 | rive-listenerprotocol-1 through 6 |

**Note:** layout-protocol, converter-protocol, path-effect-protocol, and test-protocol are placeholder docs that need content first.

### Phase 5: Advanced (24 exercises)

| File | Exercises | IDs |
|------|-----------|-----|
| `docs/advanced/core-types.mdx` | 5 | advanced-coretypes-1 through 5 |
| `docs/advanced/drawing-api.mdx` | 4 | advanced-drawingapi-1 through 4 |
| `docs/advanced/viewmodels.mdx` | 5 | advanced-viewmodels-1 through 5 |
| `docs/advanced/procedural.mdx` | 7 | advanced-procedural-1 through 7 |
| `docs/advanced/game-logic.mdx` | 2 | advanced-gamelogic-1 through 2 |
| `docs/advanced/instantiation.mdx` | 1 | advanced-instantiation-1 |

### Phase 6: Best Practices (8 exercises)

| File | Exercises | IDs |
|------|-----------|-----|
| `docs/best-practices/architecture.mdx` | 3 | bestpractices-architecture-1 through 3 |
| `docs/best-practices/performance.mdx` | 2 | bestpractices-performance-1 through 2 |
| `docs/best-practices/debugging.mdx` | 3 | bestpractices-debugging-1 through 3 |

**CLAUDE TOTAL: 21 + 25 + 24 + 8 = 78 exercises**

---

## Step-by-Step Migration Process

### For Each File:

1. **Read the existing file** - Understand current exercises
2. **For each exercise:**
   - Copy the exercise heading
   - Write Premise (2-3 sentences on WHY)
   - Write Use Case (detailed scenario)
   - Create starter code with TODOs (remove complete solution)
   - Write numbered Assignment tasks
   - Design ANSWER line that proves completion
   - Add ExerciseValidator component
   - Add Checklist items

3. **Test the starter code** - Ensure it compiles but needs work
4. **Verify ANSWER line** - Run complete solution, confirm output
5. **Add to registry.json** - Include all metadata

### Example Transformation

**BEFORE (Copy-Paste):**
```mdx
## Exercise 1: Variable Declaration

Copy this code:
\`\`\`lua
local name = "Warrior"
local level = 5
print(name, level)
\`\`\`

Expected output: Warrior 5
```

**AFTER (Active Exercise):**
```mdx
## Exercise 1: Character Stats

### Premise
Every Rive animation tracks state. Variables store that state...

:::info Goal
By the end of this exercise, you will declare typed variables...
:::

### Use Case
Imagine building a character select screen...

### Starter Code
\`\`\`lua
function init(self: Exercise1): boolean
    -- TODO: Declare 'name' as "Warrior"
    -- TODO: Declare 'level' as 5

    print(\`ANSWER: {name}, {level}\`)
    return true
end
\`\`\`

### Assignment
1. Declare `name` with value "Warrior"
2. Declare `level` with value 5

### Verify Your Answer
<Exercise id="fundamentals-variables-1" />

### Checklist
- [ ] Both variables declared with `local`
- [ ] Console shows ANSWER line
```

---

## Quality Checklist

Before marking an exercise complete:

- [ ] Premise explains WHY (not just WHAT)
- [ ] Use Case is detailed and practical
- [ ] Starter code compiles but produces wrong/no output
- [ ] TODOs are specific and numbered
- [ ] ANSWER line is deterministic
- [ ] ExerciseValidator has correct exerciseId
- [ ] Registry entry added with all fields
- [ ] Hints are helpful but don't give away answer

---

## Progress Tracking

### Codex Progress
- [ ] fundamentals/variables.mdx (5)
- [ ] fundamentals/data-types.mdx (5)
- [ ] fundamentals/operators.mdx (6)
- [ ] fundamentals/control-flow.mdx (7)
- [ ] fundamentals/functions.mdx (6)
- [ ] fundamentals/tables.mdx (6)
- [ ] fundamentals/iteration.mdx (8)
- [ ] types/intro.mdx (6)
- [ ] types/annotations.mdx (6)
- [ ] types/strict-mode.mdx (6)
- [ ] types/custom-types.mdx (7)
- [ ] types/generics.mdx (6)
- [ ] types/advanced-types.mdx (6)
- [ ] types/late-initializer.mdx (6)
- [ ] oop/prototype-based.mdx (4)
- [ ] oop/metatables.mdx (6)
- [ ] oop/index-metamethod.mdx (6)
- [ ] oop/classes.mdx (6)

### Claude Progress
- [ ] oop/self-and-methods.mdx (6)
- [ ] oop/inheritance.mdx (4)
- [ ] oop/encapsulation.mdx (6)
- [ ] oop/patterns.mdx (5)
- [ ] rive/environment.mdx (4)
- [ ] rive/inputs.mdx (4)
- [ ] rive/protocols/node-protocol.mdx (4)
- [ ] rive/protocols/node-lifecycle.mdx (4)
- [ ] rive/protocols/util-protocol.mdx (3)
- [ ] rive/protocols/listener-protocol.mdx (6)
- [ ] advanced/core-types.mdx (5)
- [ ] advanced/drawing-api.mdx (4)
- [ ] advanced/viewmodels.mdx (5)
- [ ] advanced/procedural.mdx (7)
- [ ] advanced/game-logic.mdx (2)
- [ ] advanced/instantiation.mdx (1)
- [ ] best-practices/architecture.mdx (3)
- [ ] best-practices/performance.mdx (2)
- [ ] best-practices/debugging.mdx (3)

---

## Branch Strategy

- Codex works on: `codex/exercise-migration`
- Claude works on: `claude/exercise-migration`
- Both merge into: `main` after review

---

**End of Assignments**
