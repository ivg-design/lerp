# Lesson 2.1: Type Annotations & Inference

## Learning Objectives
- Enable and understand `--!strict` mode
- Add type annotations to variables and functions
- Understand type inference and when to rely on it
- Use type refinement with control flow

---

## Why Types Matter

In Module 1, you wrote code that worked—but how do you know it won't break when you change something? Types act as guardrails:

1. **Catch errors early**: Before your animation even runs
2. **Better autocomplete**: The editor knows what methods are available
3. **Self-documenting code**: Types explain what data flows where
4. **Rive integration**: Rive generates types for its entire API

---

## Quick Concept Review

### Mode Directives
```lua
--!strict    -- Full type checking (recommended for Rive)
--!nonstrict -- Partial checking, allows 'any' inference
--!nocheck   -- No type checking (default if no directive)
```

### Basic Type Annotations
```lua
local age: number = 25
local name: string = "Hero"
local active: boolean = true

local function greet(name: string): string
    return `Hello, {name}!`
end
```

### Type Inference
```lua
local score = 100        -- Luau infers: number
local items = {"a", "b"} -- Luau infers: {string}
```

---

## Exercise 1: Enable Strict Mode ⭐

**Context**: You're reviewing code from a teammate. They forgot strict mode, and there's a bug hiding in plain sight.

**Part A**: Create a Node Script with this buggy code (NO strict mode):

```lua
export type BuggyScript = {}

function init(self: BuggyScript): boolean
    local damage = "50"  -- Oops, string instead of number!
    local health = 100

    local result = health - damage  -- This should error...
    print(`Result: {result}`)

    return true
end

return function(): Node<BuggyScript>
    return { init = init }
end
```

**Question 1**: What happens when you run this? Does it catch the bug?

**Part B**: Now add `--!strict` at the very top and observe:

```lua
--!strict

export type BuggyScript = {}
-- ... rest of code
```

**Question 2**: What error do you see in the Problems tab?

**Part C**: Fix the bug by changing `"50"` to `50`.

---

## Exercise 2: Variable Type Annotations ⭐

**Context**: You're building a character stat system. Explicit types help teammates understand your code.

**Task**: Add type annotations to ALL variables in this script:

```lua
--!strict

export type CharacterStats = {}

function init(self: CharacterStats): boolean
    -- Add type annotations to each variable
    local playerName = "Warrior"
    local level = 15
    local experience = 2500.75
    local isAlive = true
    local inventory = {"sword", "shield", "potion"}
    local position = {x = 100, y = 200}

    -- Print all values
    print(`Player: {playerName}`)
    print(`Level {level} with {experience} XP`)
    print(`Alive: {isAlive}`)
    print(`Items: {#inventory}`)
    print(`Position: ({position.x}, {position.y})`)

    return true
end

return function(): Node<CharacterStats>
    return { init = init }
end
```

**Your Task**: Transform each line like this:
```lua
local playerName = "Warrior"
-- becomes:
local playerName: string = "Warrior"
```

**Hint for arrays**: `local inventory: {string} = ...`
**Hint for tables**: `local position: {x: number, y: number} = ...`

**Self-check**: After adding all types, strict mode should show no errors.

---

## Exercise 3: Function Type Annotations ⭐⭐

**Context**: You're creating utility functions for game math. Well-typed functions prevent misuse.

**Task**: Add complete type annotations (parameters AND return types):

```lua
--!strict

-- 1. Add types to this function
-- Takes two numbers, returns their sum
local function add(a, b)
    return a + b
end

-- 2. Add types to this function
-- Takes a number array, returns the average (or 0 if empty)
local function average(numbers)
    if #numbers == 0 then return 0 end
    local sum = 0
    for _, n in numbers do
        sum += n
    end
    return sum / #numbers
end

-- 3. Add types to this function
-- Takes damage and armor, returns reduced damage (minimum 0)
local function calculateDamage(baseDamage, armor)
    local reduced = baseDamage - armor
    if reduced < 0 then return 0 end
    return reduced
end

-- 4. Add types to this function
-- Takes a name string, returns a greeting string
local function createGreeting(name)
    return `Welcome, {name}!`
end

export type FunctionTypes = {}

function init(self: FunctionTypes): boolean
    print(add(10, 20))                        -- 30
    print(average({10, 20, 30}))              -- 20
    print(calculateDamage(50, 20))            -- 30
    print(calculateDamage(10, 50))            -- 0
    print(createGreeting("Hero"))             -- Welcome, Hero!
    return true
end

return function(): Node<FunctionTypes>
    return { init = init }
end
```

**Expected signatures**:
```lua
local function add(a: number, b: number): number
-- etc.
```

---

## Exercise 4: Type Inference Investigation ⭐⭐

**Context**: Understanding when Luau can infer types saves you from writing redundant annotations.

**Task**: For each variable, predict what type Luau infers, then verify in strict mode:

```lua
--!strict

export type InferenceTest = {}

function init(self: InferenceTest): boolean
    -- Part A: What types does Luau infer?
    local a = 42
    local b = "hello"
    local c = true
    local d = {1, 2, 3}
    local e = {name = "test", value = 10}
    local f = function(x: number) return x * 2 end

    -- Part B: Which of these NEED explicit types?
    -- (Hover over each in the editor to see inferred type)

    -- This empty table needs a type - Luau can't infer it!
    local emptyArray = {}  -- Error in strict mode!

    -- Fix it:
    -- local emptyArray: {number} = {}

    -- Part C: Test your understanding
    -- Which line will cause a type error?
    local mixed = {1, "two", 3}  -- What type is this?

    return true
end

return function(): Node<InferenceTest>
    return { init = init }
end
```

**Questions**:
1. What type is inferred for `d`?
2. What type is inferred for `e`?
3. Why does `emptyArray = {}` cause an error in strict mode?
4. What type is inferred for `mixed`?

---

## Exercise 5: Type Refinement ⭐⭐

**Context**: Luau tracks types through control flow. This is called "type refinement" or "narrowing."

**Task**: Use type refinement to handle optional and union types safely:

```lua
--!strict

-- A user might or might not have an email
type UserProfile = {
    name: string,
    email: string?  -- The ? means optional (string | nil)
}

local function sendEmail(email: string)
    print(`Sending email to: {email}`)
end

local function processUser(user: UserProfile)
    print(`Processing: {user.name}`)

    -- This would ERROR without the check:
    -- sendEmail(user.email)  -- Error: string? is not string

    -- Type refinement: after the check, Luau knows email is string
    if user.email then
        sendEmail(user.email)  -- OK! Luau knows it's a string here
    else
        print("No email on file")
    end
end

-- YOUR TASK: Implement these functions using type refinement

-- Function 1: Takes a value that might be number or string
-- If number, return it doubled
-- If string, return its length
local function processValue(value: number | string): number
    -- YOUR CODE HERE
    -- Hint: use type(value) == "number" or type(value) == "string"
end

-- Function 2: Safely get the length of an optional array
-- If nil, return 0
local function safeLength(arr: {number}?): number
    -- YOUR CODE HERE
end

export type RefinementTest = {}

function init(self: RefinementTest): boolean
    local user1: UserProfile = {name = "Alice", email = "alice@example.com"}
    local user2: UserProfile = {name = "Bob"}  -- No email

    processUser(user1)
    processUser(user2)

    -- Test your functions
    print(processValue(10))         -- Expected: 20
    print(processValue("hello"))    -- Expected: 5
    print(safeLength({1, 2, 3}))    -- Expected: 3
    print(safeLength(nil))          -- Expected: 0

    return true
end

return function(): Node<RefinementTest>
    return { init = init }
end
```

---

## Exercise 6: Real-World Rive Types ⭐⭐

**Context**: Rive provides types for its API. Let's use them correctly.

**Task**: Fix the type errors in this Rive script:

```lua
--!strict

export type RiveTypesDemo = {
    position: Vector,
    color: Color,
    path: Path,
    paint: Paint,
}

function init(self: RiveTypesDemo): boolean
    -- FIX: These have type errors

    -- Error 1: Wrong way to create a Vector
    self.position = {x = 100, y = 50}  -- Wrong! Should use Vector.xy()

    -- Error 2: Wrong color format
    self.color = "#FF0000"  -- Wrong! Should use Color.rgba()

    -- Error 3: Uninitialized objects
    -- self.path and self.paint need to be created

    print("Position:", self.position.x, self.position.y)

    return true
end

return function(): Node<RiveTypesDemo>
    return {
        init = init,
        position = late(),
        color = late(),
        path = late(),
        paint = late(),
    }
end
```

**Fix each error using correct Rive API calls.**

---

## Comprehension Check

Before moving on, answer these questions (check your understanding against the guide):

1. **What does `--!strict` do differently from `--!nonstrict`?**

2. **When should you add explicit type annotations vs. rely on inference?**

3. **What is type refinement, and when does it happen?**

4. **Why does `local x = {}` cause an error in strict mode?**

5. **What's the difference between `string?` and `string | nil`?**

---

## Self-Assessment Checklist

- [ ] I always add `--!strict` to my Rive scripts
- [ ] I can annotate variables: `local x: number = 5`
- [ ] I can annotate functions: `function(a: string): boolean`
- [ ] I understand when Luau can infer types automatically
- [ ] I can use type refinement with `if` checks
- [ ] I use Rive's built-in types correctly (Vector, Color, etc.)

---

## Common Mistakes

1. **Forgetting `--!strict`**: Always add it as the first line
2. **Empty tables without types**: `local t: {string} = {}` not `local t = {}`
3. **Wrong Rive constructors**: Use `Vector.xy()` not plain tables
4. **Not checking optionals**: Always guard `string?` before using as `string`
5. **Redundant annotations**: Don't annotate when inference is obvious

---

## Reflection Questions

Take a moment to think:

1. Did strict mode catch any bugs you would have missed?
2. Where else in your code could types prevent errors?
3. How do types serve as documentation for other developers?

---

## Submit Your Results

Share:
1. Your answers to the comprehension questions
2. Console output from exercises 5 and 6
3. Any type errors you found surprising

I'll review your understanding and clarify any confusion!

---

## Next Lesson
**Lesson 2.2: Custom Types & Unions** - Define your own types for complex data
