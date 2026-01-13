# Lesson 1.3: Functions & Closures

## Learning Objectives
- Define and call functions with parameters
- Use return values (including multiple returns)
- Understand scope and upvalues
- Create closures for stateful behavior
- Use variadic functions

---

## Quick Concept Review

```lua
-- Basic function
local function add(a: number, b: number): number
    return a + b
end

-- Multiple returns
local function minMax(a, b)
    return math.min(a, b), math.max(a, b)
end

-- Closure (captures outer variable)
local function makeCounter()
    local count = 0
    return function()
        count += 1
        return count
    end
end
```

---

## Exercise 1: Basic Functions ⭐

**Task**: Create utility functions for a game.

```lua
--!strict
export type Exercise1 = {}

function init(self: Exercise1): boolean
    -- Define these functions ABOVE init, then test them here:
    
    -- Function 1: calculateDamage(base, multiplier, reduction)
    -- Returns: (base * multiplier) - reduction
    -- If result < 0, return 0
    
    -- Function 2: isInRange(value, min, max)
    -- Returns: true if value is between min and max (inclusive)
    
    -- Function 3: formatGold(amount)
    -- Returns: formatted string like "1,234 gold" 
    -- (Just concat amount with " gold" for now)
    
    -- Test your functions:
    print(calculateDamage(50, 2, 30))  -- Expected: 70
    print(calculateDamage(10, 1, 50))  -- Expected: 0 (not negative)
    print(isInRange(5, 1, 10))         -- Expected: true
    print(isInRange(15, 1, 10))        -- Expected: false
    print(formatGold(500))             -- Expected: "500 gold"
    
    return true
end

-- YOUR FUNCTIONS HERE (before return)

return function(): Node<Exercise1>
    return { init = init }
end
```

---

## Exercise 2: Multiple Return Values ⭐

**Task**: Functions that return multiple values.

```lua
--!strict

-- Define this function:
-- divmod(dividend, divisor) -> quotient, remainder
-- Example: divmod(17, 5) returns 3, 2

-- Define this function:
-- getStats(values: {number}) -> min, max, sum, average
-- Takes an array of numbers, returns all four stats

export type Exercise2 = {}

function init(self: Exercise2): boolean
    -- Test divmod
    local q, r = divmod(17, 5)
    print(`17 / 5 = {q} remainder {r}`)
    
    local q2, r2 = divmod(100, 7)
    print(`100 / 7 = {q2} remainder {r2}`)
    
    -- Test getStats
    local testData = {10, 20, 30, 40, 50}
    local min, max, sum, avg = getStats(testData)
    print(`Min: {min}, Max: {max}, Sum: {sum}, Avg: {avg}`)
    
    return true
end
```

**Expected Output:**
```
17 / 5 = 3 remainder 2
100 / 7 = 14 remainder 2
Min: 10, Max: 50, Sum: 150, Avg: 30
```

---

## Exercise 3: Scope and Upvalues ⭐⭐

**Task**: Understand variable scope.

```lua
--!strict

local globalCounter = 0  -- Module-level variable

local function incrementGlobal()
    globalCounter += 1
    return globalCounter
end

local function scopeDemo()
    local outer = "outer"
    
    local function inner()
        local innerOnly = "inner"
        -- 'outer' is an upvalue here - captured from parent scope
        return outer .. " + " .. innerOnly
    end
    
    return inner()
end

export type Exercise3 = {}

function init(self: Exercise3): boolean
    -- Part A: Test global counter
    print("Part A: Module-level variable")
    print(incrementGlobal())  -- ?
    print(incrementGlobal())  -- ?
    print(incrementGlobal())  -- ?
    
    -- Part B: Scope demo
    print("\nPart B: Upvalues")
    print(scopeDemo())
    
    -- Part C: YOUR TASK
    -- Create a function called 'createMultiplier' that:
    -- - Takes a number 'factor' as parameter
    -- - Returns a FUNCTION that multiplies its input by 'factor'
    
    print("\nPart C: Your multiplier factory")
    local double = createMultiplier(2)
    local triple = createMultiplier(3)
    
    print(double(5))   -- Expected: 10
    print(triple(5))   -- Expected: 15
    print(double(10))  -- Expected: 20
    
    return true
end

-- YOUR createMultiplier function HERE

return function(): Node<Exercise3>
    return { init = init }
end
```

---

## Exercise 4: Practical Closures ⭐⭐

**Task**: Use closures for stateful behavior.

```lua
--!strict

-- Create a 'makeAccumulator' function that:
-- Returns a function which adds to a running total
-- Each call adds the argument and returns the new total

-- Create a 'makeToggle' function that:
-- Takes an initial boolean state
-- Returns a function that toggles and returns the new state

export type Exercise4 = {}

function init(self: Exercise4): boolean
    -- Test accumulator
    print("Accumulator test:")
    local acc = makeAccumulator()
    print(acc(10))   -- Expected: 10
    print(acc(5))    -- Expected: 15
    print(acc(25))   -- Expected: 40
    
    -- Test toggle
    print("\nToggle test:")
    local toggle = makeToggle(false)
    print(toggle())  -- Expected: true
    print(toggle())  -- Expected: false
    print(toggle())  -- Expected: true
    
    -- Part B: Create a 'makeLimitedCounter' that:
    -- - Takes a max value
    -- - Returns a counter function
    -- - Counter stops incrementing once max is reached
    
    print("\nLimited counter test:")
    local counter = makeLimitedCounter(3)
    print(counter())  -- Expected: 1
    print(counter())  -- Expected: 2
    print(counter())  -- Expected: 3
    print(counter())  -- Expected: 3 (stays at max)
    print(counter())  -- Expected: 3
    
    return true
end

-- YOUR FUNCTIONS HERE

return function(): Node<Exercise4>
    return { init = init }
end
```

---

## Exercise 5: Variadic Functions ⭐⭐

**Task**: Functions with variable arguments.

```lua
--!strict

-- Create 'sum' that adds all arguments
-- sum(1, 2, 3) -> 6
-- sum(10, 20) -> 30

-- Create 'average' that returns average of all arguments
-- average(10, 20, 30) -> 20

-- Create 'joinStrings' that joins all string arguments with a separator
-- First argument is the separator
-- joinStrings(", ", "a", "b", "c") -> "a, b, c"

export type Exercise5 = {}

function init(self: Exercise5): boolean
    print("Sum tests:")
    print(sum(1, 2, 3))           -- Expected: 6
    print(sum(10, 20, 30, 40))    -- Expected: 100
    
    print("\nAverage tests:")
    print(average(10, 20, 30))    -- Expected: 20
    print(average(5, 10))         -- Expected: 7.5
    
    print("\nJoin tests:")
    print(joinStrings(", ", "apple", "banana", "cherry"))
    -- Expected: "apple, banana, cherry"
    
    print(joinStrings(" - ", "A", "B"))
    -- Expected: "A - B"
    
    return true
end

-- YOUR FUNCTIONS HERE
-- Hint: Use ... to capture variable arguments
-- local args = {...} collects them into a table
-- Or use select("#", ...) to get count

return function(): Node<Exercise5>
    return { init = init }
end
```

---

## Challenge: Function Composition ⭐⭐⭐

**Task**: Create higher-order functions.

```lua
--!strict

-- Create 'compose' that takes two functions and returns a new function
-- compose(f, g) returns a function where compose(f,g)(x) = f(g(x))

-- Create 'pipe' that takes multiple functions and returns a new function
-- pipe(f, g, h)(x) = h(g(f(x))) -- applies left to right

export type Challenge = {}

function init(self: Challenge): boolean
    local function addOne(x: number): number
        return x + 1
    end
    
    local function double(x: number): number
        return x * 2
    end
    
    local function square(x: number): number
        return x * x
    end
    
    -- Test compose
    local addThenDouble = compose(double, addOne)  -- double(addOne(x))
    print(addThenDouble(5))  -- addOne(5)=6, double(6)=12 -> Expected: 12
    
    local doubleThenAdd = compose(addOne, double)  -- addOne(double(x))
    print(doubleThenAdd(5))  -- double(5)=10, addOne(10)=11 -> Expected: 11
    
    -- Test pipe (left to right)
    local pipeline = pipe(addOne, double, square)
    -- addOne(5)=6, double(6)=12, square(12)=144
    print(pipeline(5))  -- Expected: 144
    
    return true
end

-- YOUR FUNCTIONS HERE

return function(): Node<Challenge>
    return { init = init }
end
```

---

## Self-Assessment Checklist

- [ ] I can define functions with typed parameters and return types
- [ ] I can return multiple values from a function
- [ ] I understand how closures capture variables from outer scope
- [ ] I can create factory functions that return other functions
- [ ] I can use `...` for variadic functions

---

## Key Patterns to Remember

### Factory Pattern
```lua
local function createTimer(duration)
    local elapsed = 0
    return function(dt)
        elapsed += dt
        return elapsed >= duration
    end
end
```

### Memoization Pattern
```lua
local function memoize(fn)
    local cache = {}
    return function(x)
        if cache[x] == nil then
            cache[x] = fn(x)
        end
        return cache[x]
    end
end
```

---

## Submit Your Results

Share outputs for all exercises. Pay special attention to:
- Exercise 3 Part C (your multiplier factory)
- Exercise 4 (your closure implementations)
- The compose/pipe challenge

I'll provide feedback on your closure design!

---

## Next Lesson
**Lesson 1.4: Tables Deep Dive** - Master Luau's most powerful data structure

