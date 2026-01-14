# LERP Exercise Template v2

**Synthesized from:** Audit findings + Codex proposal
**Date:** 2026-01-14

---

## Template Structure

Every exercise must have these sections in order:

1. **Title & Difficulty** — What and how hard
2. **Premise** — Why this concept matters
3. **Goal** — What you'll achieve
4. **Use Case** — Real-world application (detailed)
5. **Setup** — Exact Rive setup steps
6. **Starter Code** — Incomplete code with TODOs
7. **Assignment** — Numbered tasks to complete
8. **Expected Output** — What the console should show
9. **Answer Field** — Where to paste the `ANSWER:` line
10. **Checklist** — Self-verification before submitting

---

## Complete Template

````mdx
## Exercise X: <Short Descriptive Title> <Difficulty>

### Premise

<Why does this concept exist? What problem does it solve? 2-3 sentences explaining the "why" behind what you're learning.>

:::info Goal
<One clear sentence: "By the end of this exercise, you will be able to...">
:::

### Use Case

<A detailed, practical scenario where this concept is essential. This should be specific enough that the learner can visualize using it in their own work. 3-5 sentences minimum.>

**Example scenarios:**
- <Scenario 1>
- <Scenario 2>

---

### Setup

#### In Rive Editor:

1. **Create the script:**
   - Assets Panel → `+` → Script → Node Script
   - Name it `<ExerciseX_TopicName>`

2. **Create required elements:**
   - <If needed: "Draw a rectangle (any size) on the artboard">
   - <If needed: "Create a Text Run named 'label'">
   - <If needed: "Add a ViewModel with property 'score' (Number)">

3. **Attach the script:**
   - Drag the script onto `<target node/group>`
   - <Or: "Select the rectangle → Inspector → Script → Choose your script">

4. **Prepare the Console:**
   - View → Console (or use the Console panel)
   - Clear any previous output

5. **Run:**
   - Press Play in the State Machine
   - Watch the Console for output

---

### Starter Code

```lua
--!strict

export type ExerciseX = {
    -- TODO: Define your state properties here
}

function init(self: ExerciseX): boolean
    -- TODO: Initialize your state

    return true
end

function advance(self: ExerciseX, seconds: number): boolean
    -- TODO: Update state each frame (if needed)

    return true
end

function draw(self: ExerciseX, renderer: Renderer)
    -- TODO: Draw visuals (if needed)
end

return function(): Node<ExerciseX>
    return {
        init = init,
        advance = advance,
        draw = draw,
        -- TODO: Add default values or late() initializers
    }
end
```

---

### Assignment

Complete these tasks:

1. **<Task 1>**
   - <Specific instruction>
   - <Hint if helpful>

2. **<Task 2>**
   - <Specific instruction>

3. **<Task 3>**
   - <Specific instruction>

4. **Add the validation print** (do not modify):
   ```lua
   print(`ANSWER: <template with your variables>`)
   ```

---

### Expected Output

When your code is correct, the Console should show:

```
<Setup confirmation or intermediate output>
<Any debug prints from your logic>
ANSWER: <exact expected value>
```

:::warning The ANSWER line must match exactly
Copy the entire `ANSWER: ...` line from your Console.
Whitespace and capitalization matter.
:::

---

### Verify Your Answer

<ExerciseValidator
    exerciseId="<chapter>-<topic>-<number>"
    expectedAnswer="ANSWER: <exact expected value>"
/>

---

### Checklist

Before submitting, verify:

- [ ] Code compiles without errors (no red underlines)
- [ ] `--!strict` is at the top of your file
- [ ] All TODO comments have been replaced with code
- [ ] Console shows the expected output
- [ ] `ANSWER:` line matches exactly
- [ ] <Any exercise-specific check>
````

---

## Worked Examples

### Example 1: Variables (Beginner)

````mdx
## Exercise 1: Character Stats ⭐

### Premise

Every interactive Rive animation needs to track state — health bars, scores, progress indicators, toggle states. Before you can animate or display these values, you need to store them in variables with the correct types. This exercise establishes the foundation: declaring typed variables and outputting them for verification.

:::info Goal
By the end of this exercise, you will be able to declare local variables of different types and print them to the Console.
:::

### Use Case

Imagine you're building a character select screen for a game. Each character has stats: a name (string), level (number), experience points (decimal number), and whether they have a special ability unlocked (boolean). These values drive the UI — the name appears in a text field, the level shows as "Lv. 5", experience fills a progress bar, and the ability icon is either visible or hidden.

Before you can bind these to UI elements, you must first declare them correctly. Type errors here cascade everywhere: a string where a number is expected breaks your progress bar math; a missing boolean crashes your conditional logic.

**Example scenarios:**
- Character selection screens with stats display
- Settings panels with toggle states (sound on/off, dark mode)
- Score displays that combine text and numbers

---

### Setup

#### In Rive Editor:

1. **Create the script:**
   - Assets Panel → `+` → Script → Node Script
   - Name it `Exercise1_CharacterStats`

2. **Create required elements:**
   - Draw any shape on the artboard (rectangle, ellipse — doesn't matter)
   - This gives the script a node to attach to

3. **Attach the script:**
   - Drag `Exercise1_CharacterStats` onto your shape

4. **Prepare the Console:**
   - View → Console
   - Clear previous output

5. **Run:**
   - Press Play
   - Check Console for output

---

### Starter Code

```lua
--!strict

export type Exercise1 = {}

function init(self: Exercise1): boolean
    -- TODO 1: Declare a string variable 'characterName' set to "Warrior"

    -- TODO 2: Declare a number variable 'level' set to 5

    -- TODO 3: Declare a number variable 'experience' set to 1250.5

    -- TODO 4: Declare a boolean variable 'hasUltimate' set to true

    -- Validation (add this after your declarations):
    print(`ANSWER: {characterName}, Lv.{level}, {experience}xp, ult={hasUltimate}`)

    return true
end

function draw(self: Exercise1, renderer: Renderer)
end

return function(): Node<Exercise1>
    return {
        init = init,
        draw = draw,
    }
end
```

---

### Assignment

Complete these tasks:

1. **Declare `characterName`**
   - Type: string
   - Value: `"Warrior"`
   - Syntax: `local characterName = "Warrior"`

2. **Declare `level`**
   - Type: number (integer)
   - Value: `5`

3. **Declare `experience`**
   - Type: number (decimal)
   - Value: `1250.5`

4. **Declare `hasUltimate`**
   - Type: boolean
   - Value: `true`

5. **Keep the validation print unchanged**
   - The `ANSWER:` line uses your variable names
   - If you misname a variable, you'll get an error

---

### Expected Output

```
ANSWER: Warrior, Lv.5, 1250.5xp, ult=true
```

:::warning The ANSWER line must match exactly
- `Warrior` not `warrior` or `"Warrior"`
- `Lv.5` not `Lv. 5` (no space)
- `1250.5xp` not `1250.50xp`
- `ult=true` not `ult = true`
:::

---

### Verify Your Answer

<ExerciseValidator
    exerciseId="fundamentals-variables-1"
    expectedAnswer="ANSWER: Warrior, Lv.5, 1250.5xp, ult=true"
/>

---

### Checklist

- [ ] All 4 variables declared with `local`
- [ ] Variable names match exactly (case-sensitive)
- [ ] String uses quotes, number and boolean do not
- [ ] Console shows the expected `ANSWER:` line
- [ ] No type errors in the editor
````

---

### Example 2: Functions (Intermediate)

````mdx
## Exercise 2: Damage Calculator ⭐⭐

### Premise

Games and animations constantly perform calculations: damage formulas, easing curves, unit conversions, score multipliers. Hard-coding these calculations everywhere leads to bugs and maintenance nightmares. Functions let you write the logic once, test it thoroughly, and reuse it everywhere. This exercise teaches you to write typed functions that take inputs and return outputs — the building blocks of clean, maintainable code.

:::info Goal
By the end of this exercise, you will be able to write a function with typed parameters and a typed return value, then verify it works with test cases.
:::

### Use Case

You're building a combat system for an action game. When a character attacks, you need to calculate damage based on their base attack power, a weapon multiplier, and whether the hit was critical. This calculation happens every time any character attacks any other character — potentially hundreds of times per second in a busy scene.

Without a function, you'd copy-paste the formula everywhere. Change the formula once (maybe criticals should be 2.5x instead of 2x), and you'd have to find and update every copy. With a function, you change it in one place.

The function also serves as documentation: `calculateDamage(base, multiplier, isCritical)` tells future you (and teammates) exactly what inputs are needed and what comes out.

**Example scenarios:**
- Damage/healing calculations in RPGs
- Score multipliers (combo systems, streak bonuses)
- Physics calculations (velocity, acceleration, bounce)
- Currency conversions in shop interfaces

---

### Setup

#### In Rive Editor:

1. **Create the script:**
   - Assets Panel → `+` → Script → Node Script
   - Name it `Exercise2_DamageCalculator`

2. **Create required elements:**
   - Any shape on the artboard (for script attachment)

3. **Attach and run:**
   - Drag script onto shape
   - Press Play
   - Check Console

---

### Starter Code

```lua
--!strict

export type Exercise2 = {}

-- TODO: Implement this function
-- Parameters:
--   baseDamage: number - The raw damage value
--   weaponMultiplier: number - Weapon bonus (1.0 = normal, 1.5 = strong weapon)
--   isCritical: boolean - Whether this is a critical hit (2x damage)
-- Returns:
--   number - The final calculated damage
--
-- Formula: baseDamage * weaponMultiplier * (2 if critical, 1 if not)
local function calculateDamage(baseDamage: number, weaponMultiplier: number, isCritical: boolean): number
    -- YOUR CODE HERE (one line)

end

function init(self: Exercise2): boolean
    -- Test cases (do not modify)
    local test1 = calculateDamage(100, 1.0, false)  -- 100 * 1.0 * 1 = 100
    local test2 = calculateDamage(100, 1.5, false)  -- 100 * 1.5 * 1 = 150
    local test3 = calculateDamage(100, 1.0, true)   -- 100 * 1.0 * 2 = 200
    local test4 = calculateDamage(50, 2.0, true)    -- 50 * 2.0 * 2 = 200

    print(`Test 1 (base): {test1}`)
    print(`Test 2 (weapon): {test2}`)
    print(`Test 3 (crit): {test3}`)
    print(`Test 4 (combined): {test4}`)

    print(`ANSWER: {test1},{test2},{test3},{test4}`)

    return true
end

function draw(self: Exercise2, renderer: Renderer)
end

return function(): Node<Exercise2>
    return {
        init = init,
        draw = draw,
    }
end
```

---

### Assignment

Complete these tasks:

1. **Implement `calculateDamage`**
   - Apply the formula: `baseDamage * weaponMultiplier * critMultiplier`
   - For `critMultiplier`: use `2` if `isCritical` is true, `1` if false
   - Hint: Use inline conditional `if isCritical then 2 else 1`

2. **Return the result**
   - Your function must return a number
   - One line is enough: `return baseDamage * weaponMultiplier * (if isCritical then 2 else 1)`

3. **Verify all test cases pass**
   - Test 1: 100 (no weapon bonus, no crit)
   - Test 2: 150 (1.5x weapon)
   - Test 3: 200 (2x crit)
   - Test 4: 200 (2x weapon + 2x crit)

---

### Expected Output

```
Test 1 (base): 100
Test 2 (weapon): 150
Test 3 (crit): 200
Test 4 (combined): 200
ANSWER: 100,150,200,200
```

---

### Verify Your Answer

<ExerciseValidator
    exerciseId="fundamentals-functions-2"
    expectedAnswer="ANSWER: 100,150,200,200"
/>

---

### Checklist

- [ ] Function has all three typed parameters
- [ ] Function has return type `: number`
- [ ] Critical hit multiplier is exactly 2 (not 2.0, not 1.5)
- [ ] All four test cases produce correct values
- [ ] `ANSWER:` line shows `100,150,200,200`
````

---

### Example 3: Animation State (Intermediate)

````mdx
## Exercise 3: Pulse Animation ⭐⭐

### Premise

Real animations aren't static — they evolve over time. A pulsing glow, a bouncing logo, a breathing idle animation all require tracking time and using it to drive visual changes. The `advance` callback gives you delta time (seconds since last frame); accumulating this lets you create smooth, frame-rate-independent animations. This exercise teaches the fundamental pattern: track time, compute a value, use it to drive visuals.

:::info Goal
By the end of this exercise, you will be able to accumulate time in `advance` and use trigonometry to create a smooth pulsing animation.
:::

### Use Case

You're designing a "press start" screen. The text should gently pulse — scaling up and down in a smooth sine wave to draw the player's attention without being jarring. This same pattern powers countless UI effects: notification badges that pulse, buttons that breathe when hovered, health bars that throb when low.

The key insight is separating concerns:
- `advance` handles **logic** (updating time, computing scale)
- `draw` handles **rendering** (using the computed scale)

This separation means your animation logic runs consistently regardless of frame rate, and your rendering code stays clean.

**Example scenarios:**
- Pulsing "Press Start" or "Tap to Continue" prompts
- Breathing/idle animations on characters
- Attention-grabbing notifications
- Heart rate monitors, audio visualizers
- Loading spinners and progress indicators

---

### Setup

#### In Rive Editor:

1. **Create the script:**
   - Assets Panel → `+` → Script → Node Script
   - Name it `Exercise3_PulseAnimation`

2. **Create the visual:**
   - Draw a rectangle or ellipse (this will be scaled by the animation)
   - Size it around 100x100 for visibility

3. **Attach and run:**
   - Drag script onto your shape
   - Press Play
   - Watch Console AND observe the shape pulsing

---

### Starter Code

```lua
--!strict

export type Exercise3 = {
    -- TODO: Add state for tracking time and scale
}

function init(self: Exercise3): boolean
    -- TODO: Initialize time to 0

    print("Pulse animation started")
    return true
end

function advance(self: Exercise3, seconds: number): boolean
    -- TODO: Accumulate time
    -- TODO: Calculate scale using sine wave (range: 0.8 to 1.2)
    -- Formula: scale = 1.0 + 0.2 * sin(time * 2)

    -- Print every ~60 frames (approximately once per second)
    -- Use math.floor to check frame count
    local frame = math.floor(self.time * 60)
    if frame % 60 == 0 and frame > 0 then
        print(`ANSWER: time={string.format("%.1f", self.time)}, scale={string.format("%.2f", self.scale)}`)
    end

    return true
end

function draw(self: Exercise3, renderer: Renderer)
    -- TODO: Apply scale transform and draw something
    -- (Visual feedback - not required for answer validation)
end

return function(): Node<Exercise3>
    return {
        init = init,
        advance = advance,
        draw = draw,
        -- TODO: Initialize state values
    }
end
```

---

### Assignment

Complete these tasks:

1. **Define state in the type**
   - Add `time: number` to track elapsed time
   - Add `scale: number` to store the current scale

2. **Initialize in `init`**
   - Set `self.time = 0`
   - Set `self.scale = 1.0`

3. **Update in `advance`**
   - Accumulate time: `self.time += seconds`
   - Calculate scale: `self.scale = 1.0 + 0.2 * math.sin(self.time * 2)`

4. **Add defaults in factory return**
   - `time = 0`
   - `scale = 1.0`

5. **Let it run for 2 seconds**
   - The validation print triggers at t=1.0 and t=2.0
   - Copy the line at t=2.0

---

### Expected Output

After ~2 seconds:

```
Pulse animation started
ANSWER: time=1.0, scale=1.18
ANSWER: time=2.0, scale=0.93
```

:::note Copy the t=2.0 line
The answer at exactly 2.0 seconds is what we validate.
:::

---

### Verify Your Answer

<ExerciseValidator
    exerciseId="fundamentals-advance-3"
    expectedAnswer="ANSWER: time=2.0, scale=0.93"
/>

---

### Checklist

- [ ] `time` and `scale` defined in export type
- [ ] Time accumulates each frame (`+= seconds`)
- [ ] Scale uses sine wave formula with correct constants
- [ ] Factory return includes `time = 0, scale = 1.0`
- [ ] Console shows scale values changing over time
- [ ] `ANSWER:` at t=2.0 shows `scale=0.93`
````

---

## Template Variables Reference

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `<Short Title>` | 2-4 word exercise name | "Character Stats", "Damage Calculator" |
| `<Difficulty>` | Star rating | ⭐, ⭐⭐, ⭐⭐⭐ |
| `<ScriptName>` | PascalCase name | `Exercise1_CharacterStats` |
| `<chapter>` | Section of course | `fundamentals`, `types`, `oop` |
| `<topic>` | Specific topic | `variables`, `functions`, `tables` |
| `<number>` | Exercise number | `1`, `2`, `3` |

---

## ANSWER Line Design Principles

### 1. Deterministic Output

The answer must be the same every time:
- ❌ `ANSWER: {math.random()}` — Different each run
- ✅ `ANSWER: {computedValue}` — Same if logic is correct

### 2. Verifies Correctness

The answer should only be achievable if the task was done right:
- ❌ `ANSWER: done` — Can be typed without doing work
- ✅ `ANSWER: {var1},{var2},{var3}` — Requires correct variable values

### 3. Compact but Readable

Keep it short enough to paste, detailed enough to verify:
- ❌ `ANSWER: {entire table dump}` — Too long
- ✅ `ANSWER: count=5, sum=150` — Key values only

### 4. Formatted Consistently

Use consistent formatting for easy validation:
- Numbers: `{value}` or `{string.format("%.2f", value)}`
- Booleans: `{value}` (prints `true`/`false`)
- Strings: `{value}` (no extra quotes)
- Multiple values: comma-separated, no spaces after commas

---

## Exercise Validator Component

### Props

```tsx
interface ExerciseValidatorProps {
    exerciseId: string;        // "fundamentals-variables-1"
    expectedAnswer: string;    // "ANSWER: Warrior, Lv.5, 1250.5xp, ult=true"
    chapter?: string;          // For progress tracking
    hints?: string[];          // Optional hints shown on failure
}
```

### Behavior

1. User pastes console output into textarea
2. Component extracts line starting with `ANSWER:`
3. Compares against `expectedAnswer` (trimmed, exact match)
4. Shows ✓ on match, helpful message on mismatch
5. Stores completion in localStorage

### UI States

```
┌─────────────────────────────────────────────────────┐
│ Paste your ANSWER line from the Console:            │
│ ┌─────────────────────────────────────────────────┐ │
│ │ ANSWER: Warrior, Lv.5, 1250.5xp, ult=true       │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ [Check Answer]                                      │
│                                                     │
│ ✓ Correct! Exercise completed.                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ✗ Not quite. Your answer:                           │
│   "ANSWER: warrior, Lv.5, 1250.5xp, ult=true"      │
│                                                     │
│ Expected:                                           │
│   "ANSWER: Warrior, Lv.5, 1250.5xp, ult=true"      │
│            ^ Check capitalization                   │
│                                                     │
│ [Try Again]                                         │
└─────────────────────────────────────────────────────┘
```

---

## Checklist for Exercise Authors

When writing a new exercise, verify:

- [ ] **Premise** explains WHY (not just WHAT)
- [ ] **Goal** is one clear sentence starting with "By the end..."
- [ ] **Use Case** is 3+ sentences with concrete scenarios
- [ ] **Setup** has exact steps including element creation
- [ ] **Starter Code** compiles but produces wrong/no output
- [ ] **TODOs** are specific and numbered
- [ ] **Assignment** tasks match TODOs exactly
- [ ] **ANSWER line** is deterministic and verifiable
- [ ] **Expected Output** shows full console output
- [ ] **Checklist** includes exercise-specific items

---

**End of Template**
