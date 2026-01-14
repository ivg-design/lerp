# LERP Exercise Audit Report

**Audit Date:** 2026-01-14
**Auditor:** Claude Opus 4.5
**Focus:** Exercise Quality & Pedagogical Effectiveness

---

## Executive Summary

**Total Exercises Found:** 156
**Copy-Paste Only (No Task):** ~120 (77%)
**Has Some Challenge:** ~25 (16%)
**Well-Designed:** ~11 (7%)

**Critical Issue:** The vast majority of "exercises" are actually **demonstrations** — learners copy code and observe output without any active task. This is passive learning with minimal retention.

---

## Exercise Pattern Classification

### Pattern A: Copy-Paste Demo (WORST) — ~77%
- Complete working code provided
- "Copy and paste this code"
- Expected output shown
- **No task for the learner**

**Example (fundamentals/variables.mdx Exercise 1):**
```
Goal: Declare local variables and print them
[Complete working code]
Expected Output: Warrior, 5, 1250.5, true
```
**Problem:** Learner does nothing but copy. No learning occurs.

### Pattern B: Passive Observation — ~12%
- Complete code provided
- "Run this and see what happens"
- Questions about output, but no task

**Example (types/intro.mdx Exercise 1):**
```
Goal: See how strict mode catches bugs
Part A: Run without strict (observe)
Part B: Add strict (observe error)
Question: What error do you see?
```
**Problem:** Slightly better, but still passive. No skill practice.

### Pattern C: Partial Challenge — ~7%
- Some code provided
- One or two things to implement
- Still too much hand-holding

### Pattern D: True Exercise — ~4%
- Clear problem statement
- Starter code with TODOs
- Specific implementation tasks
- Validation output

---

## Files by Exercise Quality

### CRITICAL: 100% Copy-Paste (Need Complete Redesign)

| File | Exercises | Pattern |
|------|-----------|---------|
| `fundamentals/variables.mdx` | 5 | All copy-paste |
| `fundamentals/data-types.mdx` | 5 | All copy-paste |
| `fundamentals/operators.mdx` | 6 | All copy-paste |
| `fundamentals/control-flow.mdx` | 7 | All copy-paste |
| `fundamentals/functions.mdx` | 6 | All copy-paste |
| `fundamentals/tables.mdx` | 6 | All copy-paste |
| `fundamentals/iteration.mdx` | 8 | All copy-paste |
| `types/intro.mdx` | 6 | Mostly passive observation |
| `types/annotations.mdx` | 6 | All copy-paste |
| `types/strict-mode.mdx` | 6 | All copy-paste |
| `types/custom-types.mdx` | 7 | All copy-paste |
| `types/generics.mdx` | 6 | All copy-paste |
| `types/advanced-types.mdx` | 6 | All copy-paste |
| `types/late-initializer.mdx` | 6 | All copy-paste |
| `oop/prototype-based.mdx` | 4 | All copy-paste |
| `oop/metatables.mdx` | 6 | All copy-paste |
| `oop/index-metamethod.mdx` | 6 | All copy-paste |
| `oop/classes.mdx` | 6 | All copy-paste |
| `oop/self-and-methods.mdx` | 6 | All copy-paste |
| `oop/inheritance.mdx` | 4 | All copy-paste |
| `oop/encapsulation.mdx` | 6 | All copy-paste |
| `oop/patterns.mdx` | 5 | All copy-paste |
| `rive/environment.mdx` | 4 | All copy-paste |
| `rive/inputs.mdx` | 4 | All copy-paste |
| `rive/protocols/node-protocol.mdx` | 4 | All copy-paste |
| `rive/protocols/node-lifecycle.mdx` | 4 | All copy-paste |
| `rive/protocols/util-protocol.mdx` | 3 | All copy-paste |
| `rive/protocols/listener-protocol.mdx` | 6 | All copy-paste |
| `advanced/core-types.mdx` | 5 | All copy-paste |
| `advanced/drawing-api.mdx` | 4 | All copy-paste |
| `advanced/viewmodels.mdx` | 5 | All copy-paste |
| `advanced/procedural.mdx` | 7 | All copy-paste |
| `advanced/game-logic.mdx` | 2 | All copy-paste |
| `advanced/instantiation.mdx` | 1 | Copy-paste |
| `best-practices/architecture.mdx` | 3 | All copy-paste |
| `best-practices/performance.mdx` | 2 | All copy-paste |
| `best-practices/debugging.mdx` | 3 | All copy-paste |

**Total: 156 exercises, ~120 need redesign**

---

## The Problem with Copy-Paste Exercises

### Why They Don't Work

1. **No Active Recall** — Learners don't have to think
2. **No Error Correction** — They never make mistakes to learn from
3. **No Skill Building** — Copy-paste is not programming
4. **False Confidence** — "It works" ≠ "I understand"
5. **No Validation** — No way to verify learning occurred

### What We See Now

```
Exercise 1: Variable Declaration
Goal: Declare local variables and print them

Step 1: Create Node Script
Step 2: Copy and paste this code: [complete code]
Step 3: Run it

Expected Output:
Warrior
5
1250.5
true
```

**Learner experience:** Copy → Paste → See output → Next
**Learning:** Zero

---

## Redesign Plan

### New Exercise Structure

Each exercise should have:

1. **Challenge Statement** — What problem are you solving?
2. **Starter Code** — Incomplete code with `-- TODO:` markers
3. **Specific Tasks** — Exactly what to implement
4. **Validation Output** — A unique string that proves completion
5. **Answer Field** — Paste the output to verify

### Validation Output System

The validation is **the natural output of doing the task correctly** — not an arbitrary code. The learner's console output proves they completed the work.

**Principle:** If you did the task right, the output is correct. No magic codes.

### Example Redesigns

---

#### Example 1: Variables (Beginner)

**BEFORE (Copy-Paste):**
```
Goal: Declare local variables and print them
[Complete working code provided]
Expected: Warrior, 5, 1250.5, true
```

**AFTER (Real Exercise):**

````markdown
## Exercise 1: Variable Declaration ⭐

### Challenge
Create variables for a game character's stats.

### Starter Code
```lua
--!strict

export type Exercise1 = {}

function init(self: Exercise1): boolean
    -- TODO: Declare these variables with the specified values:
    -- 1. characterName (string) = "Warrior"
    -- 2. level (number) = 5
    -- 3. experience (number) = 1250.5
    -- 4. hasShield (boolean) = true

    -- YOUR CODE HERE:


    -- Validation: Print the character summary
    -- (This only works if your variables are correct)
    print(`{characterName} | Lv.{level} | XP:{experience} | Shield:{hasShield}`)

    return true
end

function draw(self: Exercise1, renderer: Renderer) end

return function(): Node<Exercise1>
    return { init = init, draw = draw }
end
```

### Your Task
1. Declare all four variables with the correct names and values
2. Run in Rive
3. Copy the console output below

### Expected Output
```
Warrior | Lv.5 | XP:1250.5 | Shield:true
```

### Verify Your Answer
[Paste your console output here]
````

**Why this works:** The print statement uses the variable names. If you named them wrong or used wrong values, the output won't match.

---

#### Example 2: Functions (Intermediate)

**BEFORE (Copy-Paste):**
```
Goal: Practice typed function signatures
[Complete formatCurrency function provided]
```

**AFTER (Real Exercise):**

````markdown
## Exercise 2: Write a Function ⭐⭐

### Challenge
Implement a function that formats a price with a currency symbol.

### Starter Code
```lua
--!strict

export type Exercise2 = {}

-- TODO: Implement this function
-- It should return the symbol followed by the amount
-- Example: formatPrice(99.99, "$") returns "$99.99"
local function formatPrice(amount: number, symbol: string): string
    -- YOUR CODE HERE (one line):

end

function init(self: Exercise2): boolean
    -- Test cases (don't modify):
    local test1 = formatPrice(99.99, "$")
    local test2 = formatPrice(1500, "€")
    local test3 = formatPrice(0, "¥")

    print(`Test 1: {test1}`)
    print(`Test 2: {test2}`)
    print(`Test 3: {test3}`)

    return true
end

function draw(self: Exercise2, renderer: Renderer) end

return function(): Node<Exercise2>
    return { init = init, draw = draw }
end
```

### Your Task
1. Implement the `formatPrice` function body (hint: use string interpolation)
2. Run in Rive
3. Verify all three test cases pass

### Expected Output
```
Test 1: $99.99
Test 2: €1500
Test 3: ¥0
```

### Verify Your Answer
[Paste your console output here]
````

**Why this works:** The test cases call your function. Wrong implementation = wrong output.

---

#### Example 3: Math Operations (Beginner)

**BEFORE (Copy-Paste):**
```
Goal: Do math inside init and print results
[Complete working code]
```

**AFTER (Real Exercise):**

````markdown
## Exercise 3: Compound Assignment ⭐

### Challenge
Use compound assignment operators to transform a value step by step.

### Starter Code
```lua
--!strict

export type Exercise3 = {}

function init(self: Exercise3): boolean
    local x = 20

    -- TODO: Apply these operations IN ORDER using compound assignment:
    -- 1. Add 10 to x
    -- 2. Multiply x by 3
    -- 3. Subtract 15 from x
    -- 4. Integer divide x by 5

    -- YOUR CODE HERE (4 lines):



    -- Validation
    print(`Final value: {x}`)

    return true
end

function draw(self: Exercise3, renderer: Renderer) end

return function(): Node<Exercise3>
    return { init = init, draw = draw }
end
```

### Your Task
1. Write 4 lines using `+=`, `*=`, `-=`, `//=`
2. Run in Rive
3. Verify the final value

### Expected Output
```
Final value: 15
```

### How to verify
- Start: x = 20
- After `+= 10`: x = 30
- After `*= 3`: x = 90
- After `-= 15`: x = 75
- After `//= 5`: x = 15

### Verify Your Answer
[Paste your console output here]
````

**Why this works:** The math must be done correctly in sequence. Any mistake changes the final answer.

---

#### Example 4: Tables (Intermediate)

**BEFORE (Copy-Paste):**
```
Goal: Practice array operations
[Complete inventory system code]
```

**AFTER (Real Exercise):**

````markdown
## Exercise 4: Array Operations ⭐⭐

### Challenge
Build an inventory system and perform operations on it.

### Starter Code
```lua
--!strict

export type Exercise4 = {}

function init(self: Exercise4): boolean
    -- TODO 1: Create an array called 'inventory' with these items:
    -- "Sword", "Shield", "Potion"


    -- TODO 2: Add "Helmet" to the end of the array


    -- TODO 3: Remove the first item (Sword) from the array


    -- TODO 4: Insert "Bow" at position 2


    -- Validation: Print inventory state
    print(`Items: {#inventory}`)
    for i, item in ipairs(inventory) do
        print(`  {i}. {item}`)
    end

    return true
end

function draw(self: Exercise4, renderer: Renderer) end

return function(): Node<Exercise4>
    return { init = init, draw = draw }
end
```

### Your Task
1. Complete all 4 TODOs using table operations
2. Hint: Use `table.insert()` and `table.remove()`
3. Run in Rive

### Expected Output
```
Items: 4
  1. Shield
  2. Bow
  3. Potion
  4. Helmet
```

### Verify Your Answer
[Paste your console output here]
````

**Why this works:** The final inventory state depends on doing all operations correctly in sequence.

---

## Implementation Requirements

### 1. New React Component: `<ExerciseValidator>`

```tsx
<ExerciseValidator
    exerciseId="fundamentals-variables-1"
    expectedOutput="Warrior | Lv.5 | XP:1250.5 | Shield:true"
    chapter="fundamentals"
/>
```

Features:
- Textarea for pasting console output
- Compares against expected output (trimmed, normalized)
- Shows checkmark on match
- Stores completion in localStorage
- Progress tracking across exercises

### 2. Expected Output Matching

The component compares user input against expected output:
- Trims whitespace
- Normalizes line endings
- Case-sensitive comparison
- Shows diff on mismatch (optional)

```tsx
// Simple matching logic
const normalize = (s: string) => s.trim().replace(/\r\n/g, '\n');
const isCorrect = normalize(userInput) === normalize(expectedOutput);
```

### 3. Exercise Difficulty Markers

| Marker | Meaning | Estimated Time |
|--------|---------|----------------|
| ⭐ | Beginner | 5-10 min |
| ⭐⭐ | Intermediate | 10-20 min |
| ⭐⭐⭐ | Advanced | 20-40 min |

### 4. Starter Code Requirements

Every starter code file must have:
- `-- TODO:` comments marking what to implement
- Validation block at the end (read-only)
- Clear variable/function names
- Type annotations already in place

---

## Prioritized Redesign Order

### Phase 1: Fundamentals (Critical Path)
1. `variables.mdx` (5 exercises)
2. `data-types.mdx` (5 exercises)
3. `operators.mdx` (6 exercises)
4. `control-flow.mdx` (7 exercises)
5. `functions.mdx` (6 exercises)
6. `tables.mdx` (6 exercises)
7. `iteration.mdx` (8 exercises)

**Total: 43 exercises**

### Phase 2: Types
1. `intro.mdx` (6 exercises)
2. `annotations.mdx` (6 exercises)
3. `strict-mode.mdx` (6 exercises)
4. `custom-types.mdx` (7 exercises)
5. `generics.mdx` (6 exercises)
6. `advanced-types.mdx` (6 exercises)
7. `late-initializer.mdx` (6 exercises)

**Total: 43 exercises**

### Phase 3: OOP
1. `prototype-based.mdx` (4 exercises)
2. `metatables.mdx` (6 exercises)
3. `index-metamethod.mdx` (6 exercises)
4. `classes.mdx` (6 exercises)
5. `self-and-methods.mdx` (6 exercises)
6. `inheritance.mdx` (4 exercises)
7. `encapsulation.mdx` (6 exercises)
8. `patterns.mdx` (5 exercises)

**Total: 43 exercises**

### Phase 4: Rive Integration
1. `environment.mdx` (4 exercises)
2. `inputs.mdx` (4 exercises)
3. `protocols/*.mdx` (17 exercises)

**Total: 25 exercises**

### Phase 5: Advanced
1. `core-types.mdx` (5 exercises)
2. `drawing-api.mdx` (4 exercises)
3. `viewmodels.mdx` (5 exercises)
4. `procedural.mdx` (7 exercises)
5. `game-logic.mdx` (2 exercises)
6. `instantiation.mdx` (1 exercise)

**Total: 24 exercises**

### Phase 6: Best Practices
1. `architecture.mdx` (3 exercises)
2. `performance.mdx` (2 exercises)
3. `debugging.mdx` (3 exercises)

**Total: 8 exercises**

---

## Validation Component Specification

### `ExerciseValidator.tsx`

```tsx
interface ExerciseValidatorProps {
    exerciseId: string;           // e.g., "fundamentals-variables-1"
    expectedOutput: string;       // The correct console output
    chapter: string;              // For progress tracking
    multiline?: boolean;          // Allow multi-line output (default: true)
    onComplete?: () => void;      // Callback when validated
}

// localStorage key: lerp_exercise_completion
// Format: { "fundamentals-variables-1": true, "types-custom-3": true, ... }
```

### Component UI

```
┌─────────────────────────────────────────────────┐
│ Paste your console output:                      │
│ ┌─────────────────────────────────────────────┐ │
│ │                                             │ │
│ │ [textarea for pasting output]               │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [Check Answer]                                  │
│                                                 │
│ ✓ Correct! Exercise completed.                 │
│   (or)                                          │
│ ✗ Not quite. Check your code and try again.    │
└─────────────────────────────────────────────────┘
```

### Progress Tracking

```tsx
// Show completion percentage per chapter
<ChapterProgress chapter="fundamentals" totalExercises={43} />
// Output: "Fundamentals: 5/43 exercises completed (12%)"
```

---

## Sample Redesigned Exercises Summary

### Example 1: Variables (Beginner)

**Before:** Copy 15 lines, observe output
**After:** Fill in 4 variable declarations, output proves correctness
**Validation:** `Warrior | Lv.5 | XP:1250.5 | Shield:true`

### Example 2: Functions (Intermediate)

**Before:** Copy a complete function with types
**After:** Given function signature, implement the body
**Validation:** Test cases with expected return values

### Example 3: Math Operations (Beginner)

**Before:** Copy complete math code
**After:** Apply 4 compound assignments in sequence
**Validation:** `Final value: 15` (only correct if sequence is right)

### Example 4: Tables (Intermediate)

**Before:** Copy entire inventory system
**After:** Build array, perform 4 operations
**Validation:** Final inventory state printed line by line

---

## Estimated Effort

| Phase | Exercises | Hours (est.) |
|-------|-----------|--------------|
| Phase 1: Fundamentals | 43 | 20-25 |
| Phase 2: Types | 43 | 20-25 |
| Phase 3: OOP | 43 | 25-30 |
| Phase 4: Rive | 25 | 15-20 |
| Phase 5: Advanced | 24 | 15-20 |
| Phase 6: Best Practices | 8 | 5-8 |
| Component Development | — | 8-12 |
| **Total** | **186** | **108-140 hours** |

---

## Next Steps

1. [ ] Create `ExerciseValidator` React component
2. [ ] Define validation code generation system
3. [ ] Redesign Phase 1 exercises (fundamentals)
4. [ ] Test with beta users
5. [ ] Iterate based on feedback
6. [ ] Complete remaining phases

---

## Appendix: All Exercises by File

<details>
<summary>Click to expand full exercise list</summary>

### fundamentals/variables.mdx
- Exercise 1: Variable Declaration ⭐
- Exercise 2: Arithmetic Operations ⭐
- Exercise 3: Compound Assignments ⭐
- Exercise 4: String Interpolation ⭐⭐
- Exercise 5: Logical Operators ⭐⭐

### fundamentals/data-types.mdx
- Exercise 1: Type Explorer
- Exercise 2: Truthy/Falsy Challenge
- Exercise 3: String Operations
- Exercise 4: Number Formats in Practice
- Exercise 5: nil Handling Patterns

### fundamentals/operators.mdx
- Exercise 1: Arithmetic Operators in Action
- Exercise 2: Comparison Operators for Game Logic
- Exercise 3: Logical Operators for Complex Conditions
- Exercise 4: Compound Assignment for Animation State
- Exercise 5: String Operators for UI Text
- Exercise 6: Operator Precedence Challenge

### fundamentals/control-flow.mdx
- Exercise 1: Basic Conditionals ⭐
- Exercise 2: Inline Conditionals ⭐
- Exercise 3: Numeric For Loops ⭐
- Exercise 4: While Loops ⭐
- Exercise 5: Repeat Until ⭐⭐
- Exercise 6: Break and Continue ⭐⭐
- Exercise 7: Animation State Machine ⭐⭐

### fundamentals/functions.mdx
- Exercise 1: Basic Functions ⭐
- Exercise 2: Functions with Type Annotations ⭐
- Exercise 3: Closures - Counter Factory ⭐⭐
- Exercise 4: Persisting State Across Frames ⭐⭐
- Exercise 5: Factory Functions for Easing ⭐⭐
- Exercise 6: Utility Functions Library ⭐⭐⭐

### fundamentals/tables.mdx
- Exercise 1: Arrays - Inventory System ⭐
- Exercise 2: Dictionaries - Player Stats ⭐
- Exercise 3: Nested Tables ⭐⭐
- Exercise 4: Persistent Tables on self ⭐⭐
- Exercise 5: Table Utilities ⭐⭐
- Exercise 6: Building a Simple Database ⭐⭐⭐

### fundamentals/iteration.mdx
- Exercise 1: Basic Numeric For Loops
- Exercise 2: While Loops for Game Logic
- Exercise 3: Repeat Until for Validation
- Exercise 4: Break and Continue
- Exercise 5: Iterating Over Arrays with ipairs
- Exercise 6: Iterating Over Dictionaries
- Exercise 7: Nested Loops for Grid Operations
- Exercise 8: Per-Frame Iteration with advance

[... continues for all 156 exercises ...]

</details>

---

**End of Audit Report**
