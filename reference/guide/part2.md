<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en

comment:  Part 2: Luau Fundamentals - Part of the LERP Luau Guide

-->

# Part 2: Luau Fundamentals

---

**Navigation:** [← Course](https://forge.mograph.life/apps/lerp/) | [Guide Index](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/index.md) | [API Ref](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/api-reference.md)

**Parts:** [1](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part1.md) | [2](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part2.md) | [3](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part3.md) | [4](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part4.md) | [5](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part5.md) | [6](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part6.md) | [7](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part7.md)

---

This section covers the basics of the Luau language syntax, independent of Rive.

### 3. Syntax, Variables, and Scope

Luau syntax is clean and minimalist. Statements do not require semicolons at the end of lines.

```lua
-- This is a single-line comment

--[[
This is a
multi-line comment
]]
```

#### Variable Declaration and Scope

In Luau (and Lua), the concept of scope is critical. Scope determines where a variable is accessible.

```lua
-- Global variable (AVOID THIS)
gravity = 9.8

-- Local variable (PREFERRED)
local speed = 50
```

- **Global Variables**: Declaring a variable without the `local` keyword makes it global. This is strongly discouraged as it can lead to naming collisions and make code harder to trace and debug.

- **Local Variables**: Declared using the `local` keyword. Their scope is limited to the "block" where they are defined (e.g., a function, a loop, or the entire file).

```lua
local function calculate()
    local result = 10 -- 'result' only exists inside this function
    if result > 5 then
        local message = "High" -- 'message' only exists inside this if block
        print(message)
    end
    -- print(message) -- Error: 'message' is out of scope here
end
```

**Convention**: Always use `local` unless you have a very specific reason not to.

#### Blocks and `do ... end`

Luau uses `do ... end` blocks to create explicit scopes, which can be useful for limiting the lifetime of variables.

```lua
do
    local temp = 42
    print(temp)
end
-- print(temp) -- Error: temp is out of scope here
```

#### Upvalues and Closures

Functions capture variables from their surrounding scope (upvalues). This enables closures, which are especially useful for callbacks and stateful helpers.

```lua
local function makeCounter()
    local count = 0
    return function()
        count += 1
        return count
    end
end

local nextCount = makeCounter()
print(nextCount()) -- 1
print(nextCount()) -- 2
```

### 4. Data Types

Luau is dynamically typed by default, meaning a variable can hold a value of any type. However, we will introduce explicit typing in [Part 3](#part-3-the-strictly-typed-approach-the-hero-phase). The fundamental types are:

- **nil**: Represents the absence of a value. It is the default value of a variable before assignment. In conditional checks, both `nil` and `false` are considered "falsy"; everything else is "truthy".

- **boolean**: `true` or `false`.

- **number**: All numbers in Luau are double-precision floating-point. There is no distinction between integers and floats. Luau supports several numeric literal formats:
  - Decimal: `123`, `3.14159`
  - Hexadecimal: `0xFF`, `0xABCDEF`
  - Binary: `0b1010` (equals 10)
  - With separators for readability: `1_000_000`, `0xFF_FF_FF`

- **string**: Immutable sequences of characters. Can be defined with single or double quotes.

- **table**: The sole complex data structure in Luau. It is incredibly versatile and used for arrays, dictionaries, objects, and modules (See [Section 8](#8-tables-the-core-data-structure-arrays-and-dictionaries)).

- **function**: Functions are first-class values, meaning they can be stored in variables, passed as arguments, and returned from other functions.

### 5. Operators and Expressions (Luau Enhancements)

Luau includes all standard operators from Lua 5.1 and adds several modern enhancements.

#### Table 1: Key Luau Operators

| Category | Operators | Notes |
|---|---|---|
| Arithmetic | `+`, `-`, `*`, `/`, `^` (power), `%` (modulo) | Standard arithmetic operations. |
| Floor Division | `//` | **Luau Addition**. Divides and rounds down. `10 // 3` results in `3`. |
| Relational | `==` (equality), `~=` (inequality), `<`, `>`, `<=`, `>=` | Note the inequality operator is `~=`, not `!=`. |
| Logical | `and`, `or`, `not` | `and` returns the first falsy value or the last value. `or` returns the first truthy value or the last value. |
| Concatenation | `..` | Joins strings. `"A" .. "B"` results in `"AB"`. |
| Length | `#` | Gets the length of a table (when used as an array) or string. |

#### Luau Enhancements: Compound Assignments

Standard Lua 5.1 requires you to write `x = x + 5`. Luau adds modern compound assignments for brevity and clarity.

```lua
local x = 5
x += 10  -- x is now 15
x *= 2   -- x is now 30
x //= 4  -- x is now 7
```

#### Luau Enhancements: String Interpolation (Literals)

Luau provides a convenient way to embed expressions directly within strings using backticks (`` ` ``).

```lua
local apples = 5
local oranges = 3
-- Old way (concatenation)
local message1 = "I have " .. apples .. " apples and " .. (apples + oranges) .. " total fruits."
-- New way (interpolation)
local message2 = `I have {apples} apples and {apples + oranges} total fruits.`
```

### 6. Control Flow: Conditionals and Loops

#### Conditionals (if/then/else)

The structure is `if condition then ... elseif condition then ... else ... end`.

```lua
local score = 85

if score > 90 then
    print("A")
elseif score > 80 then
    print("B")
else
    print("C")
end
```

#### Luau Enhancement: If-Then-Else Expressions

Luau supports **if-then-else as an expression**, allowing conditional evaluation that returns a value without requiring the `end` keyword. This is similar to the ternary operator in other languages.

```lua
local a = 10
local b = 20

-- If-then-else expression (no 'end' keyword)
local max = if a > b then a else b  -- max is 20

-- Can be chained with elseif
local grade = if score > 90 then "A" elseif score > 80 then "B" else "C"

-- Useful in function arguments or table constructors
local config = {
    color = if isDarkMode then Color.rgba(255, 255, 255, 255) else Color.rgba(0, 0, 0, 255)
}
```

#### Loops

**while**: Executes as long as the condition is true.

```lua
local i = 1
while i <= 5 do
    print(i)
    i += 1
end
```

**repeat...until**: Similar to a do-while loop; it executes the block first and then checks the condition. It runs until the condition is true.

```lua
local i = 1
repeat
    print(i)
    i += 1
until i > 5
```

**for (Numeric)**: Used for counting through a range.

```lua
-- Counts from 1 to 5 (inclusive)
for i = 1, 5 do
    print(i)
end

-- Counts from 10 down to 1, stepping by -2
for i = 10, 1, -2 do
    print(i) -- 10, 8, 6, 4, 2
end
```

#### Luau Enhancement: continue

Unlike standard Lua 5.1, Luau includes the `continue` keyword, which immediately skips the rest of the current loop iteration and proceeds to the next one.

```lua
for i = 1, 5 do
    if i == 3 then
        continue -- Skip printing 3
    end
    print(i) -- Prints 1, 2, 4, 5
end
```

### 7. Functions (First-Class Citizens)

Functions are defined with the `function` keyword.

```lua
-- Define the function
local function calculateArea(width, height)
    return width * height
end

-- Call the function
local area = calculateArea(10, 5) -- 50
```

#### Multiple Return Values

A unique feature of Lua/Luau is the ability for functions to return multiple results efficiently.

```lua
local function getDimensions(area)
    local width = math.sqrt(area)
    local height = width
    return width, height, "square"
end

local w, h, shape = getDimensions(100)
print(w, h, shape) -- 10, 10, "square"
```

#### Variadic Functions (...)

Functions can accept a variable number of arguments using the `...` notation.

```lua
local function sum(...)
    local args = {...} -- Collect arguments into a table
    local total = 0
    for _, value in args do
        total += value
    end
    return total
end

print(sum(1, 2, 3, 4)) -- 10
```

#### Anonymous Functions and Callbacks

Anonymous functions are frequently used for callbacks (e.g., signals, timers, or table iteration).

```lua
local numbers = {1, 2, 3}
for i, v in numbers do
    local doubled = (function(x) return x * 2 end)(v)
    print(i, doubled)
end
```

#### Error Handling with pcall, xpcall, and assert

Use `pcall` (protected call) to catch runtime errors without crashing your script. `xpcall` allows you to attach a custom error handler.

```lua
local ok, result = pcall(function()
    return 10 / 0
end)

if not ok then
    print("Caught error:", result)
end

local function requireNonNil<T>(value: T?, message: string): T
    assert(value ~= nil, message)
    return value
end
```

### 8. Tables: The Core Data Structure (Arrays and Dictionaries)

Tables are the powerhouse of Luau. They are the only mechanism for structuring data. A table is an associative array—a collection of key-value pairs.

#### The Dual Nature of Tables

Tables seamlessly switch between acting as arrays (lists) and dictionaries (maps/hash tables).

**1. Arrays (Lists)**

When keys are consecutive integers starting from 1, the table behaves like a traditional array.

```lua
local items = {"sword", "shield", "potion"}
-- Accessing elements (Index starts at 1 by convention)
print(items[1]) -- "sword"
print(items[3]) -- "potion"

-- The length operator (#) only works reliably on array-like tables
print(#items)   -- 3
```

**Important Convention**: In Lua/Luau, arrays start at index 1, not 0. While you can use index 0, standard libraries and the `#` operator expect the sequence to begin at 1.

**2. Dictionaries (Maps)**

When keys are strings or non-consecutive numbers, the table behaves like a dictionary.

```lua
local player = {
    name = "Hero",
    health = 100,
    isAlive = true
}

-- Accessing elements (Dot syntax for string keys)
print(player.name)      -- "Hero"

-- Accessing elements (Bracket syntax for any key type)
print(player["health"]) -- 100
```

**3. Mixed Tables**

Tables can contain both array elements and dictionary entries, although this is generally discouraged for clarity.

```lua
local mixed = {"A", "B", color="red", id=123}
print(mixed[1])    -- "A"
print(mixed.color) -- "red"
print(#mixed)      -- 2 (Length operator ignores dictionary entries)
```

#### Table Library Essentials (Luau Additions)

Luau extends the standard table library with utilities that are worth using in Rive scripts.

- `table.create(n, value)`: Pre-allocates an array of size `n` filled with `value`. Useful for performance.
- `table.find(t, value, init?)`: Searches for `value` in array `t` starting at index `init` (default 1). Returns the index if found, `nil` otherwise.
- `table.clear(t)`: Removes all keys from a table in place.
- `table.clone(t)`: Creates a shallow copy.
- `table.freeze(t)`: Makes a table read-only (raises an error on write).
- `table.isfrozen(t)`: Returns `true` if the table is frozen.

```lua
local points = table.create(10, 0)
for i = 1, #points do
    points[i] = i * 2
end

local config = {speed = 10, jump = 5}
local copy = table.clone(config)
table.freeze(config)
-- config.speed = 20 -- Error: table is frozen

-- Using table.find
local items = {"sword", "shield", "potion"}
local shieldIndex = table.find(items, "shield")  -- Returns 2
local armorIndex = table.find(items, "armor")    -- Returns nil
```

### 9. Iteration: pairs, ipairs, and Generalized Iteration

Iterating over tables is fundamental. Historically, Lua used two iterator functions: `ipairs` and `pairs`.

- **ipairs(t)**: Iterates over the array part of a table (indices 1, 2, 3...) in order. It stops when it encounters the first `nil` value. Used for arrays.

- **pairs(t)**: Iterates over all key-value pairs in a table (both array and dictionary parts). The order is arbitrary (not guaranteed). Used for dictionaries.

```lua
local data = { "A", "B", id="Z1" }

print("Using ipairs:")
for index, value in ipairs(data) do
    print(index, value) -- 1 A, 2 B
end

print("Using pairs:")
for key, value in pairs(data) do
    print(key, value) -- (Order might vary) 1 A, id Z1, 2 B
end
```

#### Luau Enhancement: Generalized Iteration

Luau simplifies this by introducing Generalized Iteration. You can often omit `pairs` and `ipairs` entirely. The runtime intelligently chooses the most efficient iteration method based on the table structure.

```lua
local colors = {"red", "green", "blue"}

-- Luau Generalized Iteration (Cleaner syntax)
for index, color in colors do
     print(index, color)
end

local config = { speed = 10, jump = 5 }
for key, value in config do
    print(key, value)
end
```

**Convention**: In modern Luau, prefer generalized iteration unless you specifically need the behavior of `ipairs` (stopping at the first nil) or `pairs` (guaranteed iteration over all elements even if nils exist in the array sequence).

#### Iteration Order and Determinism

`pairs` and generalized iteration do not guarantee order for dictionary keys. If order matters (e.g., deterministic playback or tests), explicitly sort keys first.

```lua
local t = {b = 2, a = 1, c = 3}
local keys = {}
for k in t do
    table.insert(keys, k)
end
table.sort(keys)
for _, k in keys do
    print(k, t[k])
end
```

#### Custom Iterators with __iter

Luau supports the `__iter` metamethod, which allows you to define custom iteration behavior for your objects. When a table with an `__iter` metamethod is used in a `for` loop, that metamethod is called to produce the iterator.

```lua
--!strict
local Range = {}
Range.__index = Range

function Range.new(start: number, stop: number, step: number?): typeof(setmetatable({}, Range))
    local self = setmetatable({}, Range)
    self.start = start
    self.stop = stop
    self.step = step or 1
    return self
end

function Range:__iter()
    local i = self.start - self.step
    return function()
        i += self.step
        if i <= self.stop then
            return i
        end
        return nil
    end
end

-- Usage
local myRange = Range.new(1, 5)
for value in myRange do
    print(value)  -- Prints 1, 2, 3, 4, 5
end
```

---

