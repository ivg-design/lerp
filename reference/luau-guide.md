<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en
narrator: US English Female

logo:     ../assets/images/lerp-logo.svg

comment:  The complete Rive scripting guide - from zero to hero with Luau. Covers fundamentals, type system, OOP, Rive protocols, and advanced techniques.

link:     https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css
script:   https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js

-->

# Rive Scripting with Luau: The Definitive Zero to Hero Guide (v1.4)

> *From zero to hero - master Rive scripting with Luau*

This comprehensive guide is designed to equip you with the knowledge and skills necessary to master Rive scripting using the Luau programming language. It provides a structured path from the foundational concepts of Luau to advanced techniques for creating dynamic, interactive experiences within the Rive environment.

---

## Table of Contents

### [Part 1: Introduction to Rive and Luau](#part-1-introduction-to-rive-and-luau)
1. [Welcome to Rive Scripting](#1-welcome-to-rive-scripting)
2. [Why Luau? The Power of Typed Scripting in Design](#2-why-luau-the-power-of-typed-scripting-in-design)

### [Part 2: Luau Fundamentals (The "Zero" Phase)](#part-2-luau-fundamentals-the-zero-phase)
3. [Syntax, Variables, and Scope](#3-syntax-variables-and-scope)
4. [Data Types](#4-data-types)
5. [Operators and Expressions (Luau Enhancements)](#5-operators-and-expressions-luau-enhancements)
6. [Control Flow: Conditionals and Loops](#6-control-flow-conditionals-and-loops)
7. [Functions (First-Class Citizens)](#7-functions-first-class-citizens)
8. [Tables: The Core Data Structure (Arrays and Dictionaries)](#8-tables-the-core-data-structure-arrays-and-dictionaries)
9. [Iteration: pairs, ipairs, and Generalized Iteration](#9-iteration-pairs-ipairs-and-generalized-iteration)

### [Part 3: The Strictly Typed Approach (The "Hero" Phase)](#part-3-the-strictly-typed-approach-the-hero-phase)
10. [Introduction to Luau's Gradual Type System](#10-introduction-to-luaus-gradual-type-system)
11. [Type Annotations and Inference](#11-type-annotations-and-inference)
12. [Strict Mode (--!strict) and Type Checking](#12-strict-mode---strict-and-type-checking)
13. [Defining Custom Types (Aliases and Interfaces)](#13-defining-custom-types-aliases-and-interfaces)
14. [Advanced Types: Unions, Intersections, and Optionals](#14-advanced-types-unions-intersections-and-optionals)
15. [Generics](#15-generics)
16. [The late() Initializer in Rive](#16-the-late-initializer-in-rive)

### [Part 4: Object-Oriented Programming (OOP) in Luau [DEEP DIVE]](#part-4-object-oriented-programming-oop-in-luau-deep-dive)
17. [The Prototype-Based Nature of Luau](#17-the-prototype-based-nature-of-luau)
18. [The Foundation: Metatables and Metamethods](#18-the-foundation-metatables-and-metamethods)
19. [The Cornerstone of OOP: __index](#19-the-cornerstone-of-oop-__index)
20. [The Anatomy of a Luau Class (The Strictly Typed Pattern)](#20-the-anatomy-of-a-luau-class-the-strictly-typed-pattern)
21. [The self Keyword and Method Syntax (:)](#21-the-self-keyword-and-method-syntax-)
22. [The Strict Mode Conundrum: Why (self :: any) :: Type?](#22-the-strict-mode-conundrum-why-self--any--type)
23. [Rive Integration: Structuring OOP Projects (Util and Node Scripts)](#23-rive-integration-structuring-oop-projects-util-and-node-scripts)
24. [Inheritance: Chaining Prototypes and Types](#24-inheritance-chaining-prototypes-and-types)
25. [Method Overriding and Super Calls](#25-method-overriding-and-super-calls)
26. [Encapsulation (Private Members)](#26-encapsulation-private-members)
27. [Common OOP Patterns in Rive](#27-common-oop-patterns-in-rive)

### [Part 5: Rive Scripting Integration and Protocols [DEEP DIVE]](#part-5-rive-scripting-integration-and-protocols-deep-dive)
28. [The Rive Scripting Environment and Debugging Workflow](#28-the-rive-scripting-environment-and-debugging-workflow)
29. [Protocols and the Rive Factory Function Pattern](#29-protocols-and-the-rive-factory-function-pattern)
30. [Deep Dive: Inputs and Data Binding (Input<T>)](#30-deep-dive-inputs-and-data-binding-inputt)
31. [Deep Dive: The Node Protocol (Logic and Drawing)](#31-deep-dive-the-node-protocol-logic-and-drawing)
32. [Deep Dive: The Util Protocol (Modules and Reusability)](#32-deep-dive-the-util-protocol-modules-and-reusability)
33. [Deep Dive: The Converter Protocol (Data Transformation)](#33-deep-dive-the-converter-protocol-data-transformation)
34. [Deep Dive: The Layout Protocol (Custom Positioning)](#34-deep-dive-the-layout-protocol-custom-positioning)
35. [Deep Dive: The Test Protocol (Unit Testing)](#35-deep-dive-the-test-protocol-unit-testing)

### [Part 6: Rive API and Advanced Techniques [DEEP DIVE]](#part-6-rive-api-and-advanced-techniques-deep-dive)
36. [Rive Luau API Overview: Core Types](#36-rive-luau-api-overview-core-types)
37. [The Drawing API (Path, Paint, Renderer)](#37-the-drawing-api-path-paint-renderer)
38. [Interacting with ViewModels (Deep Dive)](#38-interacting-with-viewmodels-deep-dive)
39. [Advanced Technique: Fixed-Step Updates (Game Logic and Physics)](#39-advanced-technique-fixed-step-updates-game-logic-and-physics)
40. [Advanced Technique: Dynamic Component Instantiation](#40-advanced-technique-dynamic-component-instantiation)
41. [Advanced Technique: Procedural Geometry Generation](#41-advanced-technique-procedural-geometry-generation)

### [Part 7: Architecture, Optimization, and Mastery [DEEP DIVE]](#part-7-architecture-optimization-and-mastery-deep-dive)
42. [Architectural Best Practices (The Rive Philosophy)](#42-architectural-best-practices-the-rive-philosophy)
43. [Performance Optimization Strategies](#43-performance-optimization-strategies)
44. [Common Pitfalls and Debugging Techniques](#44-common-pitfalls-and-debugging-techniques)
45. [Code Style and Readability](#45-code-style-and-readability)
46. [Comprehensive Resource Directory](#46-comprehensive-resource-directory)

### [Appendix A: Luau Standard Library Reference](#appendix-a-luau-standard-library-reference)

### [Changelog](#changelog)

---

## Part 1: Introduction to Rive and Luau

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

## Part 2: Luau Fundamentals (The "Zero" Phase)

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

## Part 3: The Strictly Typed Approach (The "Hero" Phase)

Luau's gradual type system is its most significant feature. Rive heavily utilizes this to ensure code robustness and provide a superior development experience.

### 10. Introduction to Luau's Gradual Type System

In dynamically typed languages (like standard Lua or Python), type errors are usually caught at runtime.

```lua
-- Dynamic Lua
local function add(a, b)
    return a + b
end

add(10, 5)    -- 15 (Works)
add("Hello", 5) -- Runtime Error: attempt to perform arithmetic on a string value
```

Gradual typing allows you to optionally add type annotations to your code. This enables **static analysis**, where the Luau type checker analyzes the code *without running it* to find type mismatches.

Rive generates type definitions for its entire API (e.g., `Vec2D`, `Color`, `Renderer`, `Input<T>`). This means the editor understands the Rive objects you are manipulating.

### 11. Type Annotations and Inference

You use the colon `:` to specify the type of a variable or function parameter.

#### Variable Annotations

```lua
local age: number = 25
local username: string = "RiveCoder"
local isActive: boolean = true
```

#### Function Annotations

```lua
-- Parameters (a: number, b: number) and return type (: number) are annotated
local function add(a: number, b: number): number
    return a + b
end

-- Function that returns nothing (void)
local function logMessage(message: string)
    print(message)
end
```

#### Type Inference

Luau features powerful **Type Inference**. If you don't provide an explicit type, the type checker attempts to deduce it from the assigned value.

```lua
local temperature = 25.5      -- Inferred as number
local message = "Loading..."  -- Inferred as string
local items = {1, 2, 3}       -- Inferred as {number} (an array of numbers)
```

#### Type Refinement and Guards

Luau refines types based on control flow. Use `type()` for primitives and `typeof()` for engine/userdata types.

```lua
local function lengthOf(x: string | Vec2D): number
    if type(x) == "string" then
        return #x
    elseif typeof(x) == "Vec2D" then
        return x:length()
    else
        return 0
    end
end
```

```lua
local temperature = 25.5      -- Inferred as number
local message = "Loading..."  -- Inferred as string
local items = {1, 2, 3}       -- Inferred as {number} (an array of numbers)
```

### 12. Strict Mode (--!strict) and Type Checking

To enable the type checker, you must add a directive (a special comment) to the top of your script file.

- **--!nocheck**: Disables the type checker (default behavior if no directive is present).
- **--!nonstrict**: Enables the type checker but allows variables to implicitly have the type `any` if they cannot be inferred. This provides partial safety.
- **--!strict**: Enables the full power of the type system. Every variable and expression must have a known type, either through explicit annotation or inference.

```lua
--!strict

local function greet(name: string)
    print("Hello, " .. name)
end

greet("Alice") -- OK
greet(123)     -- Static Analysis Error: Type 'number' could not be converted into 'string'
```

In Strict Mode, inference must succeed. If Luau cannot determine a type, it flags an error.

```lua
--!strict
local data = {} -- Error: Cannot infer type of table, use explicit type annotation
-- Fix:
local data: {string} = {} -- An empty array of strings
local data: {[string]: number} = {} -- An empty dictionary mapping strings to numbers
```

**Convention**: Rive scripting strongly encourages the use of `--!strict` for all scripts.

### 13. Defining Custom Types (Aliases and Interfaces)

You can define your own types using the `type` keyword. This creates a **Type Alias**.

```lua
--!strict
type Coordinate = { x: number, y: number }

local function move(point: Coordinate, dx: number, dy: number): Coordinate
    return {
        x = point.x + dx,
        y = point.y + dy
    }
end

local start: Coordinate = { x = 10, y = 20 }
local endPoint = move(start, 5, 5)
```

When used with tables, these type aliases function similarly to "Interfaces" or "Structs" in other languages. They define the expected *shape* of the data.

```lua
--!strict
type PlayerConfig = {
    name: string,
    maxHealth: number,
    abilities: {string} -- An array of strings
}

local config: PlayerConfig = {
    name = "Hero",
    maxHealth = 100,
    abilities = {"Jump", "Dash"}
}
```

#### Read-Only Properties

Luau supports marking table properties as read-only using the `read` modifier. This prevents assignment to the property after initialization.

```lua
--!strict
type ReadOnlyPoint = {
    read x: number,
    read y: number,
}

local point: ReadOnlyPoint = { x = 10, y = 20 }
print(point.x)  -- OK: reading is allowed
-- point.x = 30 -- Error: cannot assign to read-only property
```

This is particularly useful for defining immutable data structures or configuration objects that should not be modified after creation.

### 14. Advanced Types: Unions, Intersections, and Optionals

#### Optional Types (?)

In many cases, a value might exist or it might be `nil`. The `?` suffix indicates an optional type.

```lua
--!strict
type UserProfile = {
    username: string,
    email: string? -- Email is optional
}

local user1: UserProfile = { username = "Alice" } -- Valid
local user2: UserProfile = { username = "Bob", email = "bob@example.com" } -- Valid
```

When accessing an optional value, the type checker forces you to handle the `nil` case (type narrowing).

```lua
--!strict
local function printEmail(profile: UserProfile)
    if profile.email then
        -- Inside this block, Luau knows profile.email is a string (not nil)
        print(profile.email:upper())
    else
        print("No email provided.")
    end
end
```

#### Union Types (|)

A Union type allows a variable to be one of several specified types.

```lua
--!strict
-- Status can be a descriptive string OR an error code number
local status: string | number = "Loading"
status = 404 -- Also valid
```

#### Intersection Types (&)

Intersection types combine multiple types into one. A value must satisfy the requirements of *all* combined types. This is primarily used for combining table types (Interfaces) and is the basis for typed inheritance (See [Section 24](#24-inheritance-chaining-prototypes-and-types)).

#### Discriminated Unions (Tagged Tables)

A common pattern is to add a `kind` tag to narrow unions safely.

```lua
type Move = { kind: "move", dx: number, dy: number }
type Jump = { kind: "jump", height: number }
type Action = Move | Jump

local function apply(action: Action)
    if action.kind == "move" then
        print(action.dx, action.dy)
    else
        print(action.height)
    end
end
```

```lua
--!strict
type Position = { x: number, y: number }
type Velocity = { vx: number, vy: number }

-- A MovingObject has both Position and Velocity properties
type MovingObject = Position & Velocity

local obj: MovingObject = {
    x = 0, y = 0,
    vx = 5, vy = 2
}
```

### 15. Generics

Generics allow functions and types to be flexible while maintaining type safety. They use type parameters (commonly denoted by `<T>`) as placeholders for specific types provided later.

```lua
--!strict
-- A generic function that accepts an array of type T and returns the first element
function getFirst<T>(items: {T}): T?
    if #items > 0 then
        return items[1]
    else
        return nil
    end
end

local names: {string} = {"Alice", "Bob"}
local first_name = getFirst(names) -- T is inferred as string, returns string?

local scores: {number} = {100, 90}
local first_score = getFirst(scores) -- T is inferred as number, returns number?
```

Rive uses generics extensively in its API, most notably the `Input<T>` type (See [Section 30](#30-deep-dive-inputs-and-data-binding-inputt)).

### 16. The late() Initializer in Rive

In Rive scripting, especially within `--!strict` mode, you often define properties in your script's main type definition that cannot be initialized immediately when the script instance is created.

- **Properties initialized in `init()`**: The script instance is created before `init()` runs.
- **Inputs provided by the Editor**: Inputs bound to ViewModels or other Artboards are provided by the Rive engine after creation.

If you initialize these properties to `nil`, the type checker will treat them as optional (e.g., `number?`), requiring nil checks everywhere.

Rive provides a special utility function called `late()`.

```lua
--!strict
type MyScript = {
    -- We know this will be a number, but we initialize it later in init()
    counter: number
}

function init(self: MyScript)
    self.counter = 0 -- Initialize it here
    return true
end

return function(): Node<MyScript>
    return {
        init = init,
        -- Use late() as a placeholder value during creation
        counter = late()
    }
end
```

`late()` satisfies the type checker by signaling that the value is intentionally uninitialized at creation but will be assigned a value of the correct type before being used.

---

## Part 4: Object-Oriented Programming (OOP) in Luau [DEEP DIVE]

Object-Oriented Programming (OOP) is a paradigm that organizes code around "objects," which bundle data (properties) and behavior (methods). This structure is essential for managing complexity in interactive Rive projects, such as games or dynamic interfaces.

### 17. The Prototype-Based Nature of Luau

It is crucial to understand that Luau (like Lua) is fundamentally different from languages like C++, Java, or C#.

- **Class-Based (e.g., Java, C++)**: You define a blueprint (Class), and objects are instantiated based on that blueprint.
- **Prototype-Based (e.g., Luau, JavaScript)**: There are no traditional classes. Objects inherit directly from other objects (prototypes). You create a prototype object and then create new objects that link back to it for shared behavior.

Luau uses **Tables** and a powerful feature called **Metatables** to implement this prototype mechanism, allowing us to simulate class-based structures effectively.

### 18. The Foundation: Metatables and Metamethods

A **metatable** is a regular Luau table that defines the *special behavior* of another table. We assign it using `setmetatable(targetTable, metaTable)`.

Metatables contain "metamethods"—keys starting with a double underscore (`__`). These methods intercept operations on the target table.

#### Introduction to Metamethods: __tostring

A simple example is the `__tostring` metamethod, which defines what happens when you try to `print` a table. This is very useful for debugging in the Rive console.

```lua
local myObject = { name = "Rive" }
print(myObject) -- Output: table: 0x... (Memory address)

local meta = {
    __tostring = function(self)
        -- 'self' refers to the table the metatable is attached to (myObject)
        return "Object Name: " .. self.name
    end
}
setmetatable(myObject, meta)

print(myObject) -- Output: Object Name: Rive
```

### 19. The Cornerstone of OOP: __index

The most critical metamethod for OOP is `__index`. It intercepts the lookup of a key when that key is **not found** in the target table.

#### The Lookup Process Visualized

When you execute `myTable.key`:

1. **Local Check**: Luau checks if `key` exists in `myTable`. If yes, return the value.
2. **Metatable Check**: If no, Luau checks if `myTable` has a metatable with an `__index` field.
3. **Redirection**: If `__index` points to another table (the *Prototype*), Luau repeats the lookup in the Prototype (`Prototype.key`).

```
graph TD
    Start("Access myTable.key") --> CheckLocal{Found in myTable?};
    CheckLocal -- Yes --> ReturnLocal[Return myTable.key];
    CheckLocal -- No --> CheckMeta{Metatable with __index?};
    CheckMeta -- No --> ReturnNil[Return nil];
    CheckMeta -- Yes --> Redirect("Redirect lookup to Prototype");
    Redirect --> CheckPrototype{Found in Prototype?};
    CheckPrototype -- Yes --> ReturnProto[Return Prototype.key];
    CheckPrototype -- No --> ReturnNil;
```

#### Walkthrough Example:

```lua
--!strict

-- 1. The Prototype (Shared behavior/defaults)
local Prototype = {
    speed = 10,
    greet = function() print("Hello!") end
}

-- 2. The Instance (Specific data)
local Instance = {
    color = "blue"
}

-- 3. The Linkage
setmetatable(Instance, { __index = Prototype })

-- 4. The Behavior
print(Instance.color) -- "blue" (Found directly in Instance)

print(Instance.speed) -- 10
-- 'speed' is not in Instance.
-- Lookup is redirected via __index to Prototype.

Instance.greet()      -- "Hello!" (Found via __index in Prototype)
```

This mechanism is how we simulate inheritance: Instances (data) inherit behavior (methods) from the Prototype (Class table).

### 20. The Anatomy of a Luau Class (The Strictly Typed Pattern)

To create robust classes in Rive's `--!strict` environment, we must combine the runtime metatable mechanism with Luau's static type system. This results in a standard pattern.

Let's break down the creation of a `Sprite` class, analyzing each component. This class would typically be defined in a Rive **Util Script**.

```lua
--!strict
-- File: utils/Sprite.luau

-- ====================================================================
-- Component 1: The Prototype (The Class Table Implementation)
-- ====================================================================
local Sprite = {}
-- CRITICAL LINE:
Sprite.__index = Sprite

-- ====================================================================
-- Component 2: The Interface (Type Definition)
-- ====================================================================
-- Use 'export type' so other scripts can access this definition.
export type SpriteType = {
    -- Data Fields
    position: Vec2D,
    color: Color,
    -- Method Signatures
    -- NOTE: Methods MUST include 'self' as the first parameter here.
    move: (self: SpriteType, dx: number, dy: number) -> (),
    setColor: (self: SpriteType, newColor: Color) -> ()
}

-- ====================================================================
-- Component 3: The Constructor (Factory Function)
-- ====================================================================
function Sprite.new(x: number, y: number): SpriteType
    -- 1. Create the instance table (holds the data)
    local self = {}

    -- 2. Link the metatable (provides the methods)
    setmetatable(self, Sprite)

    -- 3. Initialize data using Rive types
    self.position = Vec2D.xy(x, y)
    self.color = Color.rgba(255, 255, 255, 255) -- Default white

    -- 4. Strict Mode Type Casting (Explained in detail in [Section 22](#22-the-strict-mode-conundrum-why-self--any--type))
    return (self :: any) :: SpriteType
end

-- ====================================================================
-- Component 4: The Methods (The Behavior)
-- ====================================================================
-- We use the colon syntax (:) for defining methods (See [Section 21](#21-the-self-keyword-and-method-syntax-))
function Sprite:move(dx: number, dy: number)
    self.position.x += dx
    self.position.y += dy
end

function Sprite:setColor(newColor: Color)
    self.color = newColor
end

-- ====================================================================
-- Component 5: Module Export
-- ====================================================================
-- A Util script must return the module it exposes.
return Sprite
```

#### Detailed Explanation of Components

1. **The Prototype** (`Sprite = {}`; `Sprite.__index = Sprite`): This table holds the methods (`move`, `setColor`). The line `Sprite.__index = Sprite` is crucial. When an instance is created, its metatable is set to `Sprite`. If we call `myInstance:move()`, the lookup fails on the instance, checks the metatable (`Sprite`), and follows its `__index`. By setting the `__index` to itself, the lookup is correctly redirected back to the `Sprite` table where the `move` function resides.

2. **The Interface** (`export type SpriteType`): This defines the "shape" of the object for the Luau type checker.

3. **The Constructor** (`Sprite.new`): Responsible for creating the instance, linking it to the prototype, initializing the data, and performing the necessary type casting.

### 21. The self Keyword and Method Syntax (:)

In OOP, methods need a reference to the instance that called them (the *receiver*). This is conventionally named `self`. Luau provides syntactic sugar using the colon (`:`) to handle this implicitly.

#### Defining Methods with :

Using a colon adds a hidden first parameter named `self`.

```lua
-- Preferred way
function Sprite:move(dx, dy)
    -- self is implicitly available here
end

-- Is exactly equivalent to:
function Sprite.move(self, dx, dy)
    -- self is explicitly passed
end
```

#### Calling Methods with :

Using a colon passes the object itself as the first argument.

```lua
local player = Sprite.new(10, 10)

-- Preferred way
player:move(5, 0)

-- Is exactly equivalent to:
Sprite.move(player, 5, 0)
```

#### Common Pitfall: Mixing . and :

A frequent mistake is calling a method defined with `:` using a `.`.

```lua
player.move(5, 0) -- Runtime Error!
```

This fails because `player.move(5, 0)` does *not* implicitly pass `player` as the first argument. Inside the function, `self` becomes `5`, and `dx` becomes `0`. The code then tries to access `self.position` (i.e., `5.position`), which causes an error.

### 22. The Strict Mode Conundrum: Why (self :: any) :: Type?

This specific line in the constructor is essential in `--!strict` mode and requires careful explanation.

```lua
return (self :: any) :: SpriteType
```

This **double cast** is necessary due to a conflict between how Luau's type system works (Static Analysis) and how the prototype mechanism works (Runtime Behavior).

#### The Conflict Explained

1. **The Type Checker's Expectation (Structural Typing)**: The `SpriteType` interface explicitly states that any object of this type *must* contain the methods `move` and `setColor`.

2. **The Runtime Reality (Prototypes)**: In the constructor, the `self` object only contains the data (`position`, `color`). The methods are located in the metatable (`Sprite`), *not* in `self` directly.

3. **The Dilemma**: The strict type checker compares the `self` object against the `SpriteType` requirements. It sees the methods are missing from `self` and would raise an error: `Type '...' is missing fields 'move', 'setColor' from 'SpriteType'`.

#### The Solution: The Double Cast Maneuver

We need to bypass this structural check by assuring the type checker that the methods *will be* available at runtime via the metatable.

1. `(self :: any)`: We first cast `self` to the `any` type. This temporarily disables type checking for the object.
2. `(...) :: SpriteType`: We immediately cast the result back to `SpriteType`.

This satisfies the type checker while allowing the efficient prototype mechanism to function.

### 23. Rive Integration: Structuring OOP Projects (Util and Node Scripts)

The best practice in Rive is to separate class definitions from the scene logic.

- **Util Scripts**: Define the OOP classes (as shown in [Section 20](#20-the-anatomy-of-a-luau-class-the-strictly-typed-pattern)).
- **Node Scripts**: Import the classes, create instances, and manage their lifecycle within the Rive environment (`init`, `advance`, `draw`).

#### Walkthrough: Using the Sprite Class

Let's use the `Sprite` class defined in `utils/Sprite.luau` within a Node script.

**The Manager (Node Script)**

File: `SceneManager.luau` (Node Protocol)

```lua
--!strict

-- Import the Class Table
local Sprite = require("utils/Sprite")
-- Import the Type Definition
type SpriteType = Sprite.SpriteType

export type SceneManager = {
    player: SpriteType
}

function init(self: SceneManager): boolean
    -- Create an instance
    self.player = Sprite.new(100, 100)
    self.player:setColor(Color.rgba(0, 255, 0, 255)) -- Make it green
    return true
end

function advance(self: SceneManager, seconds: number): boolean
    -- Move the player slowly to the right
    local speed = 50
    self.player:move(speed * seconds, 0)
    return true
end

-- (A draw function would be needed to visualize the Sprite using the Renderer API)

-- Factory function
return function(): Node<SceneManager>
    return {
        init = init,
        advance = advance,
        player = late()
    }
end
```

This pattern cleanly separates the logic of a single entity (the OOP class) from the management of the scene (the Node script).

### 24. Inheritance: Chaining Prototypes and Types

Inheritance allows a subclass to extend a parent class. This involves two steps: Chaining the runtime behavior (Metatables) and extending the type definition (Intersection Types).

Let's create a `MovingSprite` subclass inheriting from `Sprite`.

#### Step 1: Chaining the Prototypes (Runtime)

We set the metatable of the subclass such that its `__index` points to the parent prototype.

```lua
--!strict
-- File: utils/MovingSprite.luau

-- Import the Parent Class
local Sprite = require("utils/Sprite")

-- Create the Subclass Prototype
local MovingSprite = {}
MovingSprite.__index = MovingSprite

-- Establish the Inheritance Chain
-- If a method is not found in MovingSprite, look in Sprite.
setmetatable(MovingSprite, { __index = Sprite })
```

The lookup chain is now: `Instance -> MovingSprite -> Sprite`.

```
graph TD
    I[Instance] --> MS[MovingSprite Table];
    MS --> S[Sprite Table];

    subgraph Lookup Process
        A[Access instance:method()] --> B{In Instance?};
        B -- No --> C{Check Metatable (MovingSprite)};
        C --> D{In MovingSprite?};
        D -- No --> E{Check MS Metatable (__index = Sprite)};
        E --> F{In Sprite?};
    end
```

#### Step 2: Extending the Type (Static Analysis)

We use the intersection operator (`&`) to combine the parent type with the new fields/methods.

```lua
--!strict
type SpriteType = Sprite.SpriteType

export type MovingSpriteType = SpriteType & {
    velocity: Vec2D,
    update: (self: MovingSpriteType, dt: number) -> ()
}
```

#### Step 3: The Subclass Constructor

The subclass constructor must call the parent constructor and then adjust the metatable.

```lua
--!strict
function MovingSprite.new(x: number, y: number, vx: number, vy: number): MovingSpriteType
    -- 1. Call the parent constructor.
    -- We cast to 'any' because Sprite.new returns SpriteType,
    -- but we need to modify it further to become a MovingSpriteType.
    local self = (Sprite.new(x, y) :: any)

    -- 2. Re-assign the metatable from Sprite to MovingSprite.
    -- This ensures the instance finds MovingSprite-specific methods first.
    setmetatable(self, MovingSprite)

    -- 3. Initialize subclass-specific fields
    self.velocity = Vec2D.xy(vx, vy)

    -- 4. Final cast to the Subclass type
    return (self :: any) :: MovingSpriteType
end
```

### 25. Method Overriding and Super Calls

A subclass can override a method by defining it locally. To call the parent class's implementation (a "super call"), you must explicitly reference the parent prototype table.

```lua
--!strict
-- File: utils/MovingSprite.luau (Continued)

function MovingSprite:update(dt: number)
    -- Calculate movement based on velocity
    local dx = self.velocity.x * dt
    local dy = self.velocity.y * dt

    -- Super Call: Explicitly call the parent's 'move' implementation.
    -- We use the dot syntax and manually pass 'self'.
    Sprite.move(self, dx, dy)
end
```

**Note on Super Calls**: We use `Sprite.move(self, ...)` (dot syntax, manual `self`) rather than `Sprite:move(...)` (colon syntax). If we used the colon, the `Sprite` table itself would be passed as `self`, rather than the actual instance.

### 26. Encapsulation (Private Members)

Luau does not have `private` or `protected` keywords. Encapsulation is achieved through convention and scope.

#### Convention: Underscore Prefix (_)

By convention, members prefixed with an underscore (`_`) are considered private and should not be accessed outside the class.

```lua
export type CounterType = {
    _value: number, -- Private by convention
}
```

#### Enforcement: Module Scope

Truly private methods can be created by defining them as `local` functions within the Util script scope, rather than attaching them to the Class table.

```lua
--!strict
-- utils/Helper.luau

local Helper = {}
-- ...

-- Private function (Only visible within this file)
local function internalCalculation(a, b)
    return a + b
end

-- Public method
function Helper:process(data)
    -- Can call the private function
    self.result = internalCalculation(data.a, data.b)
end

return Helper
```

### 27. Common OOP Patterns in Rive

#### Pattern 1: Singletons (Modules as Managers)

If you only need one instance of a manager (e.g., `SoundManager`), the Luau module pattern (Util script) acts as a Singleton. When you `require` a Util script, the code runs once, and the returned table is cached.

```lua
--!strict
-- utils/SoundManager.luau
local SoundManager = {}

SoundManager.volume = 0.5

function SoundManager.playSound(id: string)
    print(`Playing sound {id} at volume {SoundManager.volume}`)
end

return SoundManager
```

Usage:

```lua
--!strict
local SoundManager = require("utils/SoundManager")
SoundManager.playSound("Click")
```

#### Pattern 2: Composition ("Has-a" relationship)

Prefer composition over deep inheritance hierarchies. Composition means an object *contains* instances of other classes.

```lua
--!strict
-- Assume a WeaponType class exists
type CharacterType = {
    name: string,
    -- Composition: Character HAS A Weapon
    equippedWeapon: WeaponType,
}

function Character:attack()
    -- Delegate the action to the composed object
    self.equippedWeapon:swing()
end
```

#### Pattern 3: Signals (Event Dispatching / Observer Pattern)

Signals allow different parts of the system to communicate without direct dependencies (decoupling). An object can "fire" a signal, and any number of "listeners" can "connect" to it.

**Simple Signal Class (Util Script):**

```lua
--!strict
-- utils/Signal.luau
local Signal = {}
Signal.__index = Signal

export type SignalType = {
    _connections: {() -> ()}
}

function Signal.new(): SignalType
    local self = setmetatable({}, Signal)
    self._connections = {}
    return (self :: any) :: SignalType
end

function Signal:connect(callback: () -> ())
    table.insert(self._connections, callback)
end

function Signal:fire()
    for _, callback in self._connections do
        callback()
    end
end

return Signal
```

**Usage:**

A `GameManager` can expose a signal:

```lua
--!strict
-- utils/GameManager.luau
local Signal = require("utils/Signal")
local GameManager = {}
GameManager.onGameOver = Signal.new()

function GameManager.endGame()
    GameManager.onGameOver:fire()
end
return GameManager
```

A UI Node script can listen to it:

```lua
--!strict
-- nodes/UIPanel.luau
local GameManager = require("utils/GameManager")

function init(self)
    GameManager.onGameOver:connect(function()
        print("UI Panel showing Game Over screen.")
    end)
    return true
end
-- ...
```

---

## Part 5: Rive Scripting Integration and Protocols [DEEP DIVE]

This section bridges the gap between the Luau language and the Rive environment. We will explore how Luau integrates into the Rive Editor, the structural patterns Rive enforces (Protocols), and a detailed analysis of each script type.

### 28. The Rive Scripting Environment and Debugging Workflow

Rive integrates a sophisticated code editor directly into the design environment. This integration is tightly coupled with the Luau engine and its type system, providing a development experience similar to modern IDEs.

#### Leveraging Luau for Tooling

When you write scripts in Rive, the environment is constantly performing **Static Analysis** using the Luau type checker.

- **Autocomplete (IntelliSense)**: Because Rive generates type definitions for its entire API (e.g., `Renderer`, `Vector`, `Input<T>`) and because Luau in `--!strict` mode understands the structure of your code, the editor can provide highly accurate suggestions. If you type `renderer:`, the editor immediately suggests all available methods like `drawPath`, `transform`, `save`, `restore`, etc., along with their expected parameters.

- **Real-time Error Checking (Linting)**: The editor flags type mismatches and syntax errors as you type, visualized by red underlines in the code.

#### The Debugging Workflow

Debugging Rive scripts involves two main approaches: Static Analysis (compile-time) and Runtime Logging.

**1. The Problems Tab (Static Analysis)**

This tab displays issues detected by the Luau type checker. It is your first line of defense.

- **Syntax Errors**: Basic mistakes like missing `end` keywords.
- **Type Errors**: Mismatches, such as passing a `number` to a function expecting a `string`, or attempting to access a property that doesn't exist on a type (common when misspelling properties in `--!strict` mode).

**Best Practice**: When using `--!strict` mode, your goal should be to keep the Problems tab empty. Address these issues before you try to run the animation.

**2. The Console Tab (Runtime Logging)**

This tab captures the output of the standard Luau `print()` function. This output is only visible when playing the animation within the Rive Editor.

```lua
function advance(self: MyNode, seconds: number): boolean
    -- Basic logging
    print("Frame advanced. Delta time: " .. seconds)

    -- Inspecting object state using string interpolation
    print(`Current position X: {self.position.x}`)

    -- Printing Rive types (Vec2D and Color have helpful default printing)
    print(self.position) -- Output: Vec2D(10.0, 20.0)

    return true
end
```

**Debugging Tip**: If you are using custom OOP classes ([Part 4](#part-4-object-oriented-programming-oop-in-luau-deep-dive)), implementing the `__tostring` metamethod on your classes significantly improves the usefulness of `print()` output in the console.

### 29. Protocols and the Rive Factory Function Pattern

When you create a new script in Rive, you must select a **Protocol**.

#### What are Protocols?

In the context of Rive scripting, a Protocol is a predefined contract or interface. It defines:

1. **The Purpose**: What the script is intended to do.
2. **The Execution Context**: When the script runs.
3. **The Lifecycle Functions**: The specific functions the script must implement for the Rive engine to interact with it (e.g., `init`, `advance`, `convert`).

#### Table 3: Rive Scripting Protocols Summary

| Protocol | Role | Key Interface Functions | Structure |
|---|---|---|---|
| Node | Logic & Drawing | `init`, `advance`, `draw`, `update` | Factory Function |
| Util | Reusable Code | (None required) | Module (Returns a table) |
| Converter | Data Transformation | `convert`, `reverseConvert` | Factory Function |
| Layout | Custom Positioning | `measure`, `resize` | Factory Function |
| Path Effect | Path Geometry | `update`, `init`, `advance` | Factory Function |
| Test | Unit Testing | `setup` | Factory Function |

#### The Factory Function Pattern

Every Rive script template (except Util scripts) ends with a specific structure:

```lua
--!strict

-- Define the type for the script instance
export type MyScript = { ... }

-- Define lifecycle functions (init, advance, etc.)
-- ...

-- The Factory Function
return function(): Node<MyScript> -- Specifies the Protocol and the custom type
    return {
        -- 1. Bind lifecycle functions
        init = init,
        advance = advance,
        -- 2. Initialize properties and input defaults
        speed = 1.0,
        counter = late()
    }
end
```

This structure is known as the **Factory Function Pattern**.

1. **Script Definition**: The main body of the Luau file defines the behavior (lifecycle functions) and the structure (the Type definition).
2. **Instantiation**: When the Rive engine needs to create an instance of this script (e.g., when the Artboard loads), it calls the anonymous function returned at the end (the Factory).
3. **The Factory's Role**: The Factory function creates the actual script instance table. This table binds the behavior and initializes the default state.
4. **Engine Integration**: Rive takes the table returned by the Factory and integrates it into the engine's update loop.

This pattern ensures that every script instance is self-contained, managing its own state independent of other instances of the same script.

#### Path Effect Protocol (Overview)

Path Effects let you modify `PathData` in real time and are attached to strokes. The required method is `update(self, inPath: PathData): PathData`, with optional `init(self, context: Context)` and `advance(self, seconds)`.

```lua
function update(self: MyPathEffect, inPath: PathData): PathData
    local outPath = Path.new()
    -- Transform or rebuild path commands here
    return outPath
end
```

### 30. Deep Dive: Inputs and Data Binding (Input<T>)

Inputs are the mechanism for exposing configuration from your Luau script to the Rive Editor interface. This allows designers to configure script instances without modifying the code, and it enables scripts to connect to the Data Binding system.

#### The Anatomy of Input<T>

`Input<T>` is a generic type provided by the Rive API. It acts as a wrapper around an underlying value.

```lua
--!strict
type MyNode = {
    -- Exposes a numeric field named "Speed" in the Editor
    speed: Input<number>,
    -- Exposes a color picker
    accentColor: Input<Color>,
}
```

**Key Concept**: `Input<T>` values are **read-only** inside scripts. You can set defaults in the factory function, but runtime values are supplied by the editor or data binding.

#### Accessing Values and Methods

For simple value inputs (number, boolean, color, string), use `.value` for clarity. For structured inputs (like Artboards), the input may expose methods (e.g., `:instance()`).

```lua
function advance(self: MyNode, seconds: number)
    local currentSpeed = self.speed.value
    local movement = currentSpeed * seconds
end
```

#### Setting Defaults vs. late() Initialization

Defaults are set in the factory function.

**Where Inputs Appear**: Node/Layout script inputs show in the right sidebar when the script node is selected. Converter inputs appear in the Data panel.

**1. Static Configuration (Defaults)**

If the input is meant to be configured statically by the designer, you provide a default value.

```lua
return function(): Node<MyNode>
    return {
        -- ...
        speed = 50.0, -- Default value
        accentColor = Color.rgba(255, 0, 0, 255) -- Default color
    }
end
```

**2. Dynamic Configuration (Data Binding and late())**

If the input is intended to be bound to a ViewModel or another Artboard asset, the value is provided externally after the script is initialized. In this case, we use the `late()` initializer.

```lua
--!strict
type MyNode = {
    gameState: Input<Data.GameState> -- Reference to a ViewModel
}

return function(): Node<MyNode>
    return {
        -- ...
        -- We cannot provide a default GameState here.
        -- late() tells the type checker this will be assigned later by the engine.
        gameState = late()
    }
end
```

`late()` satisfies the `--!strict` requirement that all fields must be initialized, acting as a placeholder until the Rive engine injects the actual bound value.

#### Listening for Input Changes

Inputs can notify you when they change. Use `update(self)` for any input change, or attach listeners for specific inputs.

```lua
function onSpeedChanged(value: number)
    print("Speed changed:", value)
end

function init(self: MyNode): boolean
    self.speed:addListener(self.speed.value, onSpeedChanged)
    return true
end
```

#### Data Binding Integration

The true power of Inputs lies in **Data Binding**. Instead of setting a static value, you can bind the input to a property in a ViewModel.

- When the ViewModel property changes, the input updates in your script.
- If the script has an `update(self)` lifecycle function, it will be called immediately after the value changes.
 
**Important**: Scripts cannot mutate regular inputs at runtime. To write values back, use a ViewModel input and set the nested property’s `.value`.

### 31. Deep Dive: The Node Protocol (Logic and Drawing)

The Node protocol is the workhorse of Rive scripting. It is used for frame-by-frame logic, procedural animation, interactivity, and custom rendering. Node scripts are attached directly to nodes (shapes, groups, etc.) in the Rive hierarchy.

#### The Node Lifecycle and Execution Order

The Rive engine calls specific functions on the Node script instance in a precise order during the animation loop.

```
sequenceDiagram
    participant E as Engine
    participant S as Node Script
    participant R as Renderer

    E->>S: 1. init() (Once at start)

    loop Every Frame
        E->>E: Calculate Delta Time (seconds)

        Note over E,S: Data Binding Phase
        alt Input Data Changed
            E->>S: 2. update()
        end

        Note over E,S: Logic Phase
        E->>S: 3. advance(seconds)

        Note over S,R: Rendering Phase
        E->>R: Begin Frame
        E->>S: 4. draw(renderer)
        S->>R: renderer:drawPath(...)
        E->>R: End Frame
    end
```

#### Detailed Lifecycle Analysis

**1. init(self): boolean**

- **When**: Called exactly once when the script instance is initialized.
- **Purpose**: Setup and initialization.
- **Best Practices**:
  - Initialize state variables (e.g., `self.elapsedTime = 0`).
  - **Performance Optimization**: Create reusable graphics objects (`Path` and `Paint`) here and store them in `self`. Avoid creating them every frame in `draw`.
- **Return Value**: Return `true` if initialization succeeded. If `false`, the script will not execute further.

**2. update(self)**

- **When**: Called when an input connected via Data Binding changes its value. This happens *before* `advance`.
- **Purpose**: React immediately to data changes.
- **Use Cases**: Recalculating parameters based on new input data, updating visual appearance (e.g., changing a Paint color based on a new Input color, or regenerating a Path if its dimensions change).

**3. advance(self, seconds): boolean**

- **When**: Called every frame, before rendering.
- **Purpose**: The core logic update. This is where state changes, physics calculations, and procedural animation logic occur.
- **The `seconds` Parameter (Delta Time)**: This is the elapsed time since the last frame. It is crucial for frame-rate independent motion.
  - Correct: `self.x += self.speed * seconds`
- **Return Value**: Return `true` to keep the script active. Return `false` to stop further updates (useful for one-shot behaviors).

**4. draw(self, renderer: Renderer)**

- **When**: Called every frame, after `advance`.
- **Purpose**: Custom rendering.
- **The `renderer` Parameter**: An object providing the API for issuing drawing commands (See [Part 6, Section 37](#37-the-drawing-api-path-paint-renderer)).

#### Node Protocol Example: Coordinating the Lifecycle

This example demonstrates how `init`, `update`, `advance`, and `draw` work together. We create a rectangle where the width can be changed dynamically via an Input.

```lua
--!strict
-- Node Script: DynamicRectangle.luau

export type DynamicRectangle = {
    position: Vec2D,
    width: Input<number>,
    height: number,
    rectPath: Path,
    rectPaint: Paint,
}

function init(self: DynamicRectangle): boolean
    -- Initialize graphics objects (Performance optimization)
    self.rectPaint = Paint.new()
    self.rectPaint.color = Color.rgba(255, 0, 0, 255) -- Red
    self.rectPath = Path.new()

    -- Call update manually to generate the path based on the *initial* width input value
    update(self)
    return true
end

function update(self: DynamicRectangle)
    -- This is called automatically if the 'width' input changes (e.g., via Data Binding).
    -- We must regenerate the Path geometry.
    self.rectPath:reset() -- Clear the old path

    local halfWidth = self.width.value / 2
    local halfHeight = self.height / 2

    self.rectPath:moveTo(Vec2D.xy(-halfWidth, -halfHeight))
    self.rectPath:lineTo(Vec2D.xy(halfWidth, -halfHeight))
    self.rectPath:lineTo(Vec2D.xy(halfWidth, halfHeight))
    self.rectPath:lineTo(Vec2D.xy(-halfWidth, halfHeight))
    self.rectPath:close()
end

function advance(self: DynamicRectangle, seconds: number): boolean
    -- Logic updates (e.g., moving the rectangle)
    self.position.x += 50 * seconds
    return true
end

function draw(self: DynamicRectangle, renderer: Renderer)
    renderer:save()
    -- Move the coordinate system to the calculated position
    renderer:transform(Mat2D.withTranslation(self.position.x, self.position.y))
    -- Draw the path (which is already updated with the correct width)
    renderer:drawPath(self.rectPath, self.rectPaint)
    renderer:restore()
end

return function(): Node<DynamicRectangle>
    return {
        init = init, advance = advance, draw = draw, update = update,
        position = Vec2D.xy(100, 100),
        width = 80.0,       -- Default width
        height = 40.0,      -- Static height
        rectPath = late(),
        rectPaint = late(),
    }
end
```

#### Pointer Events

Node and Layout scripts can implement `pointerDown`, `pointerMove`, `pointerUp`, or `pointerExit`. Handlers receive a `PointerEvent` with local coordinates and an id. Call `event:hit()` to stop propagation, or `event:hit(true)` to allow translucent pass-through.

```lua
function onPointerDown(self: MyNode, event: PointerEvent)
    print(event.position.x, event.position.y)
    print(event.id)
    event:hit()
end

return function(): Node<MyNode>
    return {
        init = init,
        draw = draw,
        pointerDown = onPointerDown,
    }
end
```

For instantiated artboards, pointer events must be forwarded manually to the instance.

### 32. Deep Dive: The Util Protocol (Modules and Reusability)

Util (Utility) scripts are the foundation of organized, scalable Rive projects. They do not execute on their own and cannot be attached to nodes. They function as Luau modules.

#### The Module Pattern

A Util script defines a scope for reusable code and must return a value, typically a table. This returned table is the public API of the module.

```lua
--!strict
-- File: utils/MathLib.luau

-- Define the module table
local MathLib = {}

-- Exported Type Definition
export type Vector3 = {x: number, y: number, z: number}

-- Private function (local to the file scope, not accessible outside)
local function internalHelper(v)
    return math.sqrt(v)
end

-- Public function (attached to the module table)
function MathLib.clamp(value: number, minVal: number, maxVal: number): number
    return math.max(minVal, math.min(maxVal, value))
end

-- Public constant
MathLib.PI = 3.14159

-- Return the public API
return MathLib
```

#### Importing Modules with require

Other scripts import Util scripts using the `require` function, passing the path (relative or absolute within the Rive project structure) without the `.luau` extension.

```lua
--!strict
-- File: Main.luau (Node Script)

-- Import the module. The variable 'ML' now holds the table returned by MathLib.luau
local ML = require("utils/MathLib")

-- Usage
local result = ML.clamp(150, 0, 100)
```

#### Accessing Exported Types (Namespacing)

When a Util script exports types using `export type`, Rive makes those types available to the parent script. You can still use the module namespace for clarity if you prefer.

```lua
--!strict
local ML = require("utils/MathLib")

-- Accessing the type using the module namespace
local v: ML.Vector3 = {x=1, y=2, z=3}
```

#### Key Concept: Module Caching and State

A crucial aspect of `require` is caching. A Util script is executed only the first time it is required. The returned value (the module table) is cached. Subsequent calls to `require` with the same path return the cached table without re-executing the script.

This behavior allows Util scripts to maintain state, effectively making them **Singletons** (See [Part 4, Section 27](#27-common-oop-patterns-in-rive)).

```lua
--!strict
-- utils/Counter.luau
print("Counter module loading...") -- This will print only once!
local count = 0
return {
    increment = function() count += 1 end,
    getCount = function() return count end
}
```

Any script requiring `utils/Counter` will interact with the same shared state.

### 33. Deep Dive: The Converter Protocol (Data Transformation)

Converters are specialized scripts used within Rive's Data Binding system. They act as intermediaries in the data pipeline, transforming data as it flows between the source (usually a ViewModel) and the target (a design property, like Text content or Shape fill color).

#### The Data Binding Pipeline

```
graph LR
    VM[ViewModel Property (Source Data)] --> C{Converter Script};
    C --> T[Target Property (e.g., Text Run)];

    subgraph Converter Logic
        direction TB
        C_IN(Input Data 'I') --> C_FUNC(convert()) --> C_OUT(Output Data 'O');
    end

    VM -- Data Type I --> C_IN;
    C_OUT -- Data Type O --> T;
```

#### The Template Structure: DataValue Types

Converters operate on `DataValue` wrappers provided by the data-binding system (e.g., `DataValueNumber`, `DataValueString`, `DataValueColor`). You create output values with constructors like `DataValue.number()` or `DataValue.color()`.

#### Lifecycle Functions

**1. convert(self: MyConverter, input: DataValueNumber): DataValueNumber**

- **Direction**: Source -> Target (e.g., ViewModel -> UI).
- **Purpose**: Transforms the input data (`I`) into the output format (`O`).

Example (Number to Number):

```lua
function convert(self: MyConverter, input: DataValueNumber): DataValueNumber
    local dv: DataValueNumber = DataValue.number()
    if input:isNumber() then
        dv.value = (input :: DataValueNumber).value + 1
    end
    return dv
end
```

**2. reverseConvert(self: MyConverter, input: DataValueNumber): DataValueNumber (Optional)**

- **Direction**: Target -> Source (e.g., UI Input Field -> ViewModel).
- **Purpose**: Transforms the data back. This is required for **two-way data binding**.

```lua
function reverseConvert(self: MyConverter, input: DataValueNumber): DataValueNumber
    local dv: DataValueNumber = DataValue.number()
    if input:isNumber() then
        dv.value = (input :: DataValueNumber).value - 1
    end
    return dv
end
```

#### Practical Example: Boolean to Color Converter

A common use case is changing the color of a UI element based on a boolean state.

```lua
--!strict
-- Converter: BooleanToColor.luau

export type BooleanToColor = {
    colorWhenTrue: Input<Color>,
    colorWhenFalse: Input<Color>,
}

function convert(self: BooleanToColor, input: DataValueBoolean): DataValueColor
    local dv: DataValueColor = DataValue.color()
    if input:isBoolean() then
        local flag = (input :: DataValueBoolean).value
        dv.value = flag and self.colorWhenTrue.value or self.colorWhenFalse.value
    end
    return dv
end

-- reverseConvert is generally not applicable here.

return function(): Converter<BooleanToColor, DataValueBoolean, DataValueColor>
    return {
        convert = convert,
        -- Defaults
        colorWhenTrue = Color.rgba(0, 255, 0, 255), -- Green
        colorWhenFalse = Color.rgba(128, 128, 128, 255), -- Gray
    }
end
```

### 34. Deep Dive: The Layout Protocol (Custom Positioning)

The Layout protocol allows developers to implement custom layout algorithms, overriding Rive's standard layout system. This is an advanced protocol used for creating complex, dynamic arrangements of elements such as flow layouts or dynamic grids.

#### The Two-Pass Layout System

Rive uses a standard two-pass system to determine the size and position of elements: The **Measure Pass** and the **Resize (or Arrange) Pass**.

#### The Layout Lifecycle

Layout scripts add two lifecycle functions:

- `measure(self): Vec2D` — optional; returns the layout’s preferred size.
- `resize(self, size: Vec2D)` — required; apply the final size and position children.

Measure only affects layouts with a Fit type of **Hug**.

```lua
--!strict
export type MyCustomLayout = { ... }

function measure(self: MyCustomLayout): Vec2D
    return Vec2D.xy(100, 100)
end

function resize(self: MyCustomLayout, size: Vec2D)
    print("New size:", size.x, size.y)
end

return function(): Layout<MyCustomLayout>
    return {
        measure = measure,
        resize = resize,
    }
end
```

**Complexity Note**: Implementing Layout scripts requires interaction with the Rive node hierarchy (accessing children, manipulating their transforms) and a solid understanding of layout algorithms.

### 35. Deep Dive: The Test Protocol (Unit Testing)

The Test protocol lets you run unit tests directly in the Rive editor, primarily for Util scripts and other pure logic.

#### The Testing Framework: Tester, Case, and expect

The protocol provides a `setup(test: Tester)` entry point and typically does **not** return a factory function. Use:

- `test.case(name, fn)` to define tests.
- `test.group(name, fn)` to group cases.
- `expect(value)` to assert on values with matchers.

#### The Test Template and Lifecycle

```lua
--!strict
-- File: test/MathLib.test.luau

local MathLib = require("utils/MathLib")

function setup(test: Tester)
    local case = test.case
    local group = test.group

    case("MathLib.clamp functionality", function(expect)
        local minValue, maxValue = 0, 100
        local result1 = MathLib.clamp(50, minValue, maxValue)
        local result2 = MathLib.clamp(150, minValue, maxValue)

        expect(result1).is(50)
        expect(result2).is(100)
    end)

    group("Math", function()
        case("Addition", function(expect)
            expect(MathLib.add(2, 3)).is(5)
        end)
    end)
end
```

Run tests by right-clicking the Test script in the Assets panel and selecting **Run Tests**. Results appear in the Assets panel and the editor.

---

## Part 6: Rive API and Advanced Techniques [DEEP DIVE]

To move beyond basic scripting, you must master the Rive Luau API. This API provides the types and functions necessary to interact with the Rive engine, manipulate geometry, perform rendering, and manage dynamic components.

### 36. Rive Luau API Overview: Core Types

Rive provides several fundamental types essential for 2D graphics programming. These are implemented as optimized types in Luau, often with overloaded operators for convenience.

#### Vec2D / Vector (2D Vector)

Rive’s scripting docs commonly use `Vec2D.xy`, while the API reference lists a `Vector` type with the same operations. In practice, both show up in the editor’s autocomplete depending on context. Treat them as equivalent 2D vector types.

**Creation and Access:**

```lua
--!strict
local position = Vec2D.xy(100, 50)
print(position.x, position.y)
```

**Operator Overloading**: Vectors support standard arithmetic operators, making vector math intuitive.

```lua
--!strict
local v1 = Vec2D.xy(10, 10)
local v2 = Vec2D.xy(5, 0)

local result_add = v1 + v2      -- (15, 10)
local result_sub = v1 - v2      -- (5, 10)
local result_mul_scalar = v1 * 2 -- (20, 20)
```

**Mutability Note**: Some vector types expose read-only `x`/`y`. If assignment fails, construct a new vector (e.g., `position = position + velocity * seconds`) instead of mutating components.

**Key Methods and Concepts:**

- `length()` / `lengthSquared()` for magnitude checks.
- `normalized()` for unit vectors.
- `distance()` / `distanceSquared()` for point-to-point distance.
- `dot()` for angle/relationship tests.
- `lerp()` for interpolation.

**Example: moveTowards Helper**

A common use case is moving an object towards a target at a fixed speed without overshooting.

```lua
--!strict
local function moveTowards(current: Vec2D, target: Vec2D, maxDistanceDelta: number): Vec2D
    local displacement = target - current
    local distance = displacement:length()

    if distance <= maxDistanceDelta or distance == 0 then
        return target
    end

    -- Normalize the displacement and scale by the movement amount
    return current + displacement / distance * maxDistanceDelta
end

-- Usage in advance():
-- self.position = moveTowards(self.position, self.target, self.speed * seconds)
```

#### Color

Represents an RGBA color.

**Channel Range (0 to 255)**: Rive color components use 8-bit channels in the range `0..255`. For normalized values, use `Color.opacity()` or convert manually.

```lua
--!strict
-- Creation: Color.rgba(r, g, b, a)
local brightRed = Color.rgba(255, 0, 0, 255)
local semiTransparentBlue = Color.rgba(0, 0, 255, 128)
```

**Key Methods:**

- `Color.lerp(a, b, t)`: Linear interpolation between two colors. This smoothly transitions the R, G, B, and A components simultaneously.
- `Color.opacity(color)`: Returns opacity as a normalized `0.0..1.0` value.

#### Mat2D (2D Transformation Matrix)

`Mat2D` represents a 2D affine transformation matrix. This single structure can encode translation (movement), rotation, scale, and skew. Matrices are fundamental to how the Rive engine manipulates the coordinate system.

**Creation:**

```lua
--!strict
-- Identity Matrix (No transformation)
local identity = Mat2D.identity()

-- Specific Transformations
local translation = Mat2D.withTranslation(10, 5)
local rotation = Mat2D.withRotation(math.rad(45)) -- Takes radians
```

**Combining Transformations (Matrix Multiplication):**

Transformations are combined using multiplication (`*`). The order is crucial (non-commutative).

```lua
--!strict
local T = Mat2D.withTranslation(100, 0)
local R = Mat2D.withRotation(math.rad(90))

-- Rotate first, then Translate
-- The object rotates around the origin (0,0), then moves along the world X-axis.
local TR = T * R

-- Translate first, then Rotate
-- The object moves to (100,0), then the entire coordinate system rotates around the origin.
local RT = R * T
```

**Key Methods:**

- `invert()`: Calculates the inverse matrix. Useful for converting coordinates from world space back to local space (e.g., converting a mouse click position into the local space of a rotated object).

### 37. The Drawing API (Path, Paint, Renderer)

Custom rendering is performed within the `draw(self, renderer)` function of a Node script. The process follows a standard 3-step pipeline: **Define Geometry (Path)**, **Define Appearance (Paint)**, and **Execute Command (Renderer)**.

**Performance Best Practice**: `Paint` and `Path` objects are expensive to create. **Never** create them inside the `draw` function every frame. Create them once in the `init` function, store them in `self`, and modify their properties as needed.

#### 1. Path (Geometry)

A `Path` object defines the shape or geometry you want to draw using a "pen" metaphor.

**Construction Methods (Path Verbs):**

- `Path.new()`: Creates a new, empty path.
- `moveTo(Vec2D.xy(x, y))`: Moves the pen to a new starting point.
- `lineTo(Vec2D.xy(x, y))`: Draws a straight line.
- `quadTo(control, end)` / `cubicTo(controlOut, controlIn, end)`: Draws Bézier curves.
- `close()`: Draws a line back to the last `moveTo` position.

```lua
-- Example: Drawing a Triangle
local path = Path.new()
path:moveTo(Vec2D.xy(50, 0))
path:lineTo(Vec2D.xy(100, 100))
path:lineTo(Vec2D.xy(0, 100))
path:close()
```

**Note**: Avoid calling `path:reset()` while the path is in flight for rendering; reset on subsequent frames.

**Additional Path Methods:**

- `add(path: Path, transform?: Mat2D)`: Merges another path into the current path with optional transformation.
- `#path` (length operator): Returns the number of PathCommand entries in the path.

#### Path Measurement (PathMeasure and ContourMeasure)

Rive provides powerful tools for measuring and manipulating paths. This is essential for effects like drawing along a path, extracting path segments, or placing objects at specific positions along a curve.

**PathMeasure - Measuring the Entire Path:**

```lua
--!strict
local path = Path.new()
path:moveTo(Vec2D.xy(0, 0))
path:lineTo(Vec2D.xy(100, 0))
path:lineTo(Vec2D.xy(100, 100))

local measure = path:measure()
print("Total path length:", measure.length)
print("Is path closed?", measure.isClosed)
```

**PathMeasure Properties:**

- `length`: The total length of the path across all contours.
- `isClosed`: Returns `true` only if the path has exactly one contour and that contour is closed.

**PathMeasure Methods:**

- `positionAndTangent(distance)`: Returns the position and tangent vector at a distance along the path. The distance is clamped to `[0, length]`.

```lua
local pos, tangent = measure:positionAndTangent(measure.length / 2)
print("Midpoint position:", pos.x, pos.y)
print("Tangent direction:", tangent.x, tangent.y)
```

- `warp(point)`: Transforms a point onto the path surface. The point's x-coordinate represents distance along the path, and y represents perpendicular offset.

```lua
-- Place a point 50 units along the path, 10 units offset perpendicular
local warpedPoint = measure:warp(Vec2D.xy(50, 10))
```

- `extract(startDistance, endDistance, destinationPath, startWithMove?)`: Extracts a segment of the path between two distances into a destination path.

```lua
local segment = Path.new()
measure:extract(20, 80, segment, true)  -- Extract from distance 20 to 80
renderer:drawPath(segment, paint)
```

**ContourMeasure - Measuring Individual Contours:**

A contour is a continuous sequence of path segments between `moveTo` operations. Use `ContourMeasure` to iterate through and measure individual contours.

```lua
--!strict
local path = Path.new()
-- First contour (a square)
path:moveTo(Vec2D.xy(0, 0))
path:lineTo(Vec2D.xy(50, 0))
path:lineTo(Vec2D.xy(50, 50))
path:lineTo(Vec2D.xy(0, 50))
path:close()

-- Second contour (a triangle)
path:moveTo(Vec2D.xy(100, 0))
path:lineTo(Vec2D.xy(150, 50))
path:lineTo(Vec2D.xy(100, 50))
path:close()

-- Iterate through contours
local contour = path:contours()
while contour do
    print("Contour length:", contour.length)
    contour = contour.next  -- Move to next contour
end
```

**Practical Example - Animated Path Drawing:**

```lua
--!strict
export type PathAnimator = {
    sourcePath: Path,
    displayPath: Path,
    paint: Paint,
    progress: number,  -- 0 to 1
}

function advance(self: PathAnimator, seconds: number): boolean
    self.progress += seconds * 0.5  -- Complete in 2 seconds
    if self.progress > 1 then self.progress = 1 end

    local measure = self.sourcePath:measure()
    local currentLength = measure.length * self.progress

    self.displayPath:reset()
    measure:extract(0, currentLength, self.displayPath, true)

    return true
end

function draw(self: PathAnimator, renderer: Renderer)
    renderer:drawPath(self.displayPath, self.paint)
end
```

#### 2. Paint (Appearance)

A `Paint` object defines how the geometry should be rendered.

**Key Properties:**

- `color: Color`: The RGBA color.
- `style: PaintStyle`: `'fill'` or `'stroke'`.
- `thickness: number`: (Stroke only) The width of the line.
- `join: StrokeJoin` / `cap: StrokeCap`: (Stroke only) Defines the appearance of corners and endpoints.
- `blendMode: BlendMode`: Defines how the paint interacts with colors already on the canvas (e.g., `BlendMode.srcOver` (default), `BlendMode.multiply`, `BlendMode.screen`).

```lua
local fillPaint = Paint.new()
fillPaint.color = Color.rgba(0, 255, 0, 255) -- Green
fillPaint.style = 'fill'
fillPaint.blendMode = BlendMode.multiply
```

**Alternative Constructor - `Paint.with()`:**

You can also create a Paint with multiple properties at once:

```lua
local strokePaint = Paint.with({
    style = 'stroke',
    thickness = 3,
    color = Color.hex('#FF0066'),
    join = 'round',
    cap = 'round'
})
```

**Copy with Overrides:**

```lua
-- Create a variation of an existing paint
local highlightPaint = basePaint:copy({ color = Color.rgba(255, 255, 0, 255) })
```

#### Gradients

Gradients allow smooth color transitions. Rive supports both **linear** and **radial** gradients. Apply them to Paint objects via the `gradient` property.

**Linear Gradient:**

A linear gradient transitions colors along a line between two points.

```lua
--!strict
local gradient = Gradient.linear(
    Vec2D.xy(0, 0),      -- Start point
    Vec2D.xy(100, 0),    -- End point
    {
        { position = 0, color = Color.rgba(255, 0, 0, 255) },   -- Red at start
        { position = 0.5, color = Color.rgba(255, 255, 0, 255) }, -- Yellow at middle
        { position = 1, color = Color.rgba(0, 0, 255, 255) }    -- Blue at end
    }
)

local paint = Paint.new()
paint.style = 'fill'
paint.gradient = gradient
```

**Radial Gradient:**

A radial gradient emanates outward from a center point.

```lua
--!strict
local gradient = Gradient.radial(
    Vec2D.xy(50, 50),  -- Center point
    40,                 -- Radius
    {
        { position = 0, color = Color.rgba(255, 255, 255, 255) }, -- White at center
        { position = 1, color = Color.rgba(0, 0, 0, 255) }        -- Black at edge
    }
)

local paint = Paint.new()
paint.style = 'fill'
paint.gradient = gradient
```

**GradientStop Properties:**

Each color stop requires:
- `position`: A value from 0 to 1 indicating where the color appears along the gradient
- `color`: The Color at that position

**Practical Example - Sunset Button:**

```lua
function init(self: SunsetButton): boolean
    self.path = Path.new()
    -- Build rounded rectangle path...

    self.paint = Paint.new()
    self.paint.style = 'fill'
    self.paint.gradient = Gradient.linear(
        Vec2D.xy(0, 0),
        Vec2D.xy(0, 50),  -- Vertical gradient
        {
            { position = 0, color = Color.rgba(255, 100, 50, 255) },  -- Orange top
            { position = 1, color = Color.rgba(200, 50, 100, 255) }   -- Pink bottom
        }
    )
    return true
end
```

#### 3. Renderer (Execution and Transformation)

The `Renderer` object is the interface for issuing drawing commands and managing the **transformation stack** (the Current Transformation Matrix or CTM).

**Drawing Command:**

- `drawPath(path: Path, paint: Paint)`: Executes the rendering.
- `drawImage(image, sampler, blendMode, opacity)`: Draws an image.
- `drawImageMesh(image, vertices, uvs, indices)`: Draws an image mesh.

**The Transformation Stack (save/restore)**

The `Renderer` provides methods to manipulate the CTM. It is crucial to manage this using a stack discipline.

- Always pair `save()` with `restore()` in the same function. Unbalanced stacks can leak transforms and clip states into later draws.


- `renderer:save()`: Pushes the current CTM onto the stack.
- `renderer:restore()`: Pops the last saved CTM, reverting the transformation state.
- `renderer:transform(mat: Mat2D)`: Applies a transform to the CTM.

**Walkthrough: Drawing a Rotated Object**

```lua
function draw(self, renderer)
    -- 1. Save the current state
    renderer:save()

    -- 2. Move the origin to the object's position
    renderer:transform(Mat2D.withTranslation(self.position.x, self.position.y))

    -- 3. Rotate the coordinate system around the new origin
    renderer:transform(Mat2D.withRotation(self.angle))

    -- 4. Draw the path (defined relative to (0,0)).
    renderer:drawPath(self.localPath, self.paint)

    -- 5. Restore the state
    renderer:restore()
end
```

**Clipping:**

The `Renderer` also allows you to restrict drawing to a specific region using `clipPath`.

```lua
function draw(self, renderer: Renderer)
    renderer:save()
    -- Define the clipping region
    renderer:clipPath(self.clippingMaskPath)

    -- Draw something complex. Only parts inside the clipping mask will be visible.
    renderer:drawPath(self.complexPatternPath, self.paint)

    renderer:restore() -- Clipping state is also restored
end
```

### 38. Interacting with ViewModels (Deep Dive)

ViewModels (Data Models) are the central nervous system for state management in Rive. They decouple the data from the presentation and logic.

#### Binding Scripts to ViewModels

To access a ViewModel, a script must declare an input typed specifically for that ViewModel. Rive automatically generates types under the `Data.` namespace.

```lua
--!strict
-- Assuming a ViewModel named 'PlayerStats' with properties 'health' (number) and 'isAlive' (boolean).

type HealthController = {
    stats: Input<Data.PlayerStats>
}

return function(): Node<HealthController>
    return {
        -- ...
        -- Initialized with late() as the binding is provided by the Rive editor environment.
        stats = late()
    }
end
```

**Note**: Scripts can only bind to **nested** ViewModel properties (e.g., `Main.character`) rather than the top-level ViewModel itself.

#### The Reactive Data Flow

The connection is reactive.

**1. Reading Data**: Access the ViewModel properties via the input, using `.value`.

```lua
function advance(self: HealthController, seconds: number)
    -- Access path: self.inputName.propertyName.value
    if self.stats.isAlive.value then
        local currentHealth = self.stats.health.value
        -- ...
    end
end
```

**2. Writing Data (Triggering Reactivity)**: Modify the ViewModel by assigning a new value to the `.value` property.

```lua
function takeDamage(self: HealthController, amount: number)
    local newHealth = self.stats.health.value - amount
    self.stats.health.value = newHealth -- Write the new value

    if newHealth <= 0 then
        self.stats.isAlive.value = false
    end
end
```

When a script modifies a ViewModel property, the change propagates instantly to all bound elements (Text Runs, Shape properties, State Machine inputs).

### 38.5 The Animation API (Timeline Control)

The Animation API provides programmatic control over Rive animations, allowing you to play, pause, scrub, and query animation state directly from scripts.

#### Accessing Animations

Animations are accessed through the Artboard. In most cases, you'll work with animations on instantiated artboards or the main artboard via context.

```lua
--!strict
-- Get an animation by name
local anim = artboard:animation("WalkCycle")
```

#### Animation Properties

- `duration`: The total length of the animation in seconds (read-only).

```lua
local totalTime = anim.duration
print(`Animation is {totalTime} seconds long`)
```

#### Animation Methods

**`advance(deltaTime: number): boolean`**

Progresses the animation forward by the specified time. Returns `true` if the animation is still playing, `false` if it reached the end (for non-looping animations).

```lua
function advance(self: MyNode, seconds: number): boolean
    local stillPlaying = self.animation:advance(seconds)
    if not stillPlaying then
        print("Animation completed!")
    end
    return true
end
```

**Note**: If the animation is set to loop or ping-pong, `advance()` always returns `true`.

**`setTime(seconds: number)`**

Jumps the animation to a specific time position in seconds.

```lua
-- Jump to 1.5 seconds into the animation
self.animation:setTime(1.5)

-- Jump to the end
self.animation:setTime(self.animation.duration)
```

**`setTimeFrames(frames: number)`**

Sets the animation position using frame numbers instead of seconds. Useful when working with frame-accurate timing.

```lua
-- Jump to frame 30
self.animation:setTimeFrames(30)
```

**`setTimePercentage(percentage: number)`**

Sets the animation position as a percentage (0.0 to 1.0) of the total duration.

```lua
-- Jump to 50% through the animation
self.animation:setTimePercentage(0.5)

-- Jump to the end
self.animation:setTimePercentage(1.0)
```

#### Practical Example: Animation Scrubber

Create a script that controls animation playback via a slider input:

```lua
--!strict
export type AnimationScrubber = {
    artboard: Input<Artboard<Data.Character>>,
    progress: Input<number>,  -- 0 to 1 from a slider
    animationName: string,
}

function init(self: AnimationScrubber): boolean
    self.animationName = "Idle"
    return true
end

function update(self: AnimationScrubber)
    -- Called when progress input changes
    local instance = self.artboard:instance()
    local anim = instance:animation(self.animationName)
    if anim then
        anim:setTimePercentage(self.progress.value)
    end
end

return function(): Node<AnimationScrubber>
    return {
        init = init,
        update = update,
        artboard = late(),
        progress = 0,
        animationName = "Idle",
    }
end
```

#### Practical Example: Sequential Animation Playback

Play multiple animations in sequence:

```lua
--!strict
type AnimationState = "intro" | "loop" | "outro"

export type SequentialAnimations = {
    artboard: Artboard<Data.MyArtboard>,
    currentAnim: Animation?,
    state: AnimationState,
}

function init(self: SequentialAnimations): boolean
    self.state = "intro"
    self.currentAnim = self.artboard:animation("Intro")
    return true
end

function advance(self: SequentialAnimations, seconds: number): boolean
    if self.currentAnim then
        local stillPlaying = self.currentAnim:advance(seconds)

        if not stillPlaying then
            -- Animation finished, move to next state
            if self.state == "intro" then
                self.state = "loop"
                self.currentAnim = self.artboard:animation("Loop")
            elseif self.state == "loop" then
                -- Loop plays indefinitely until triggered
            elseif self.state == "outro" then
                self.currentAnim = nil  -- Done
            end
        end
    end
    return true
end

function triggerOutro(self: SequentialAnimations)
    self.state = "outro"
    self.currentAnim = self.artboard:animation("Outro")
end
```

### 39. Advanced Technique: Fixed-Step Updates (Game Logic and Physics)

The standard `advance(self, seconds)` function uses a variable delta time based on the current frame rate. While correct for smooth animation, this is problematic for physics simulations or game logic that requires deterministic behavior.

#### The Solution: The Accumulator Pattern

The Fixed-Step Update pattern decouples the game logic updates from the rendering frame rate. We use an "accumulator" to track the passage of real time and consume it in fixed chunks (`DT`).

In Frame 2 (if a lag spike occurs), the simulation runs twice to catch up with the elapsed time.

#### Robust Implementation (Handling the "Spiral of Death")

If the device lags significantly, the accumulator can grow very large, potentially causing the simulation loop to run too many times in a single frame (the "spiral of death"). We must cap the maximum number of steps.

```lua
--!strict
export type PhysicsNode = {
    accumulator: number,
    positionY: number,
}

-- The fixed time step
local DT = 1 / 60 -- 60 updates per second
-- Cap the maximum steps per frame
local MAX_STEPS_PER_FRAME = 5

function physicsStep(self: PhysicsNode)
    -- All calculations here use the fixed DT
    self.positionY += 100 * DT -- Move 100 units per second
end

function advance(self: PhysicsNode, seconds: number): boolean
    -- 1. Accumulate real elapsed time
    self.accumulator += seconds
    local steps = 0

    -- 2. Consume time in fixed chunks, respecting the cap
    while self.accumulator >= DT and steps < MAX_STEPS_PER_FRAME do
        physicsStep(self)
        self.accumulator -= DT
        steps += 1
    end

    -- If we hit the max steps, we might discard the remaining time to prevent the spiral.
    if self.accumulator >= DT then
        self.accumulator = self.accumulator % DT
    end

    return true
end
-- ... Factory initialization ...
```

### 40. Advanced Technique: Dynamic Component Instantiation

Rive allows you to dynamically create (instantiate or spawn) instances of other Artboards (Components) at runtime.

#### The Instantiation Process

**1. Define the Template Input**: Define an input typed as `Input<Artboard<Data.ComponentName>>`.

```lua
--!strict
-- Assuming an Artboard component named "Projectile" exists.
export type SpawnerNode = {
    projectileTemplate: Input<Artboard<Data.Projectile>>,
    activeProjectiles: {Artboard<Data.Projectile>},
}
```

**2. Bind the Template**: In the Rive Editor, bind this input to the actual "Projectile" Artboard asset.

**3. Instantiate**: Use the `:instance()` method on the input.

```lua
function spawn(self: SpawnerNode)
    local newProjectile = self.projectileTemplate:instance()
    table.insert(self.activeProjectiles, newProjectile)
end
```

#### Crucial Concept: Manual Lifecycle Management

Dynamically instantiated components are **not** automatically updated. The script that created them is responsible for calling their `advance` and `draw` methods.

```lua
function advance(self: SpawnerNode, seconds: number): boolean
    -- Manually advance all instances
    for _, projectile in ipairs(self.activeProjectiles) do
        projectile:advance(seconds)
    end
    return true
end

function draw(self: SpawnerNode, renderer: Renderer)
    -- Manually draw all instances
    for _, projectile in ipairs(self.activeProjectiles) do
        renderer:save()
        -- Apply transformations (Position/Rotation) as needed
        -- ...
        projectile:draw(renderer)
        renderer:restore()
    end
end
```

#### Memory Management and Removal

You must remove instances when they are no longer needed. Iterate backward when removing items during iteration.

```lua
function advance(self: SpawnerNode, seconds: number): boolean
    -- Iterate backwards
    for i = #self.activeProjectiles, 1, -1 do
        local projectile = self.activeProjectiles[i]
        projectile:advance(seconds)

        -- Check removal condition (e.g., assuming a property 'isDead' exists)
        if isProjectileDead(projectile) then
            -- Remove from the management table
            table.remove(self.activeProjectiles, i)
        end
    end
    return true
end
```

#### Optimization: Object Pooling

For high-frequency spawning (like particles), constantly creating and destroying instances is inefficient. **Object Pooling** is an advanced pattern where you create a pool of instances upfront and reuse them by activating/deactivating them, rather than creating new ones.

### 41. Advanced Technique: Procedural Geometry Generation

While Rive is primarily a design tool, scripting allows you to generate geometry dynamically at runtime using the Path API.

#### Dynamic Path Modification

The key is to modify the path definition within the `advance` or `update` functions. Always call `path:reset()` before redefining the geometry.

#### Example: Dynamic Bar Chart

This example generates a bar chart based on an input value, utilizing the `update` lifecycle function to regenerate the path only when the input changes.

```lua
--!strict
export type BarChart = {
    value: Input<number>, -- Input value (e.g., 0 to 100)
    maxWidth: Input<number>,
    height: Input<number>,
    barPath: Path,
    paint: Paint,
}

function init(self: BarChart): boolean
    -- Initialize graphics objects once
    self.barPath = Path.new()
    self.paint = Paint.new()
    self.paint.color = Color.rgba(0, 255, 0, 255)
    update(self) -- Initial generation based on defaults
    return true
end

function update(self: BarChart)
    -- Called automatically when 'value', 'maxWidth', or 'height' changes (if bound).

    -- Calculate the actual width
    local normalizedValue = math.max(0, math.min(100, self.value.value)) / 100
    local width = normalizedValue * self.maxWidth.value
    local height = self.height.value

    -- Regenerate the geometry
    self.barPath:reset()

    -- Define the rectangle with path commands
    self.barPath:moveTo(Vec2D.xy(0, 0))
    self.barPath:lineTo(Vec2D.xy(width, 0))
    self.barPath:lineTo(Vec2D.xy(width, height))
    self.barPath:lineTo(Vec2D.xy(0, height))
    self.barPath:close()
end

function draw(self: BarChart, renderer: Renderer)
    -- Drawing is simple, as the geometry is already prepared in update()
    renderer:drawPath(self.barPath, self.paint)
end

-- ... Factory function initialization ...
```

---

## Part 7: Architecture, Optimization, and Mastery [DEEP DIVE]

Mastering Rive scripting involves more than just knowing the Luau syntax or the Rive API. It requires adopting robust architectural patterns, understanding performance implications in a real-time graphics environment, and knowing how to write clean, maintainable code.

### 42. Architectural Best Practices (The Rive Philosophy)

Adopting these practices ensures your Rive projects remain scalable and maintainable as complexity grows.

#### 42.1. Embrace Strict Mode (--!strict) as Non-Negotiable

For any non-trivial project, `--!strict` mode is essential.

- **Why**: Dynamically typed languages are prone to runtime errors caused by typos or incorrect assumptions. Strict mode enforces type safety, catching these errors during development (static analysis).
- **Benefits**:
  - **Compile-time Safety**: Prevents runtime crashes due to type mismatches.
  - **Superior Tooling**: Enables accurate autocomplete (IntelliSense), crucial for discovering and using the Rive API correctly.
  - **Self-Documenting Code**: Type definitions clarify the expected data structures and function signatures.
- **Implementation**: Always add `--!strict` to the top of every script. Master the techniques for defining types ([Part 3](#part-3-the-strictly-typed-approach-the-hero-phase)) and the OOP casting pattern ([Part 4, Section 20](#20-the-anatomy-of-a-luau-class-the-strictly-typed-pattern)).

#### 42.2. Modularity and Separation of Concerns

A common mistake is packing too much logic into a single Node script.

- **The Principle**: Separate different concerns into different files using the appropriate Protocols.
- **Implementation Strategy**:
  - **Util Scripts (Logic/Data/Services)**: Define OOP classes, math libraries, complex algorithms, data structures, and shared constants here.
  - **Node Scripts (Presentation/Integration)**: Node scripts should be lightweight "Controllers." They focus on integrating the logic from Util scripts with the Rive environment—reading inputs, managing the lifecycle (`init`, `advance`, `draw`), and handling rendering.

#### 42.3. The MVVM Pattern in Rive (ViewModel as the Source of Truth)

Rive is heavily designed around the **Model-View-ViewModel (MVVM)** pattern. Understanding this is crucial for clean data flow.

- **Model**: The underlying data structures and business logic (often defined in Util scripts).
- **View**: The visual elements in the Rive Editor (Artboards, Shapes, Text Runs).
- **ViewModel (Rive Data Model)**: The central hub that holds the application state and mediates between the Model and the View.

**Best Practices for State Management:**

- **Centralize State**: Avoid storing important application state (like `score`, `health`) inside individual Node scripts. Store them in the ViewModel.
- **Decoupled Interaction**: Scripts should primarily interact by reading from and writing to the ViewModel, rather than directly referencing each other.

**Example:**

- **Bad Practice**: `NodeScriptA` calculates the score and somehow finds the UI Text Run to update its display.
- **Good Practice**: `NodeScriptA` updates `ViewModel.score.value`. The UI Text Run is bound directly to `ViewModel.score`. The components remain decoupled.

#### 42.4. Prefer Composition Over Deep Inheritance

While Luau supports inheritance, creating deep hierarchies (e.g., A inherits from B inherits from C) can lead to rigid code. Prefer **composition**: design objects based on what they *do* (their components) rather than what they *are*. A `Character` object might *contain* instances of `Mover` and `HealthComponent` classes, allowing for flexible combinations of behaviors.

### 43. Performance Optimization Strategies

Rive is a real-time graphics engine. Performance is paramount. Script execution time directly impacts the frame rate.

#### 43.1. The Cardinal Rule: Avoid Memory Allocation in Hot Paths

The "hot paths" are functions called every frame: `advance(self, seconds)` and `draw(self, renderer)`.

- **The Problem**: Creating new objects (tables, `Vec2D`, `Path`, `Paint`) allocates memory. Frequent allocation increases pressure on the Luau Garbage Collector (GC). When the GC runs, it can cause noticeable frame hitches.
- **The Solution**: **Caching and Reuse**.

#### 43.2. Caching Graphics Objects

**Do Not** create `Path` and `Paint` objects inside `draw`.

```lua
--!strict
-- BAD PRACTICE (Slow - Allocates every frame)
function draw(self, renderer)
    local paint = Paint.new() -- BAD!
    paint.color = Color.rgba(255, 0, 0, 255)
    local path = Path.new() -- BAD!
    path:moveTo(Vec2D.xy(-10, -10))
    path:lineTo(Vec2D.xy(10, -10))
    path:lineTo(Vec2D.xy(10, 10))
    path:lineTo(Vec2D.xy(-10, 10))
    path:close()
    renderer:drawPath(path, paint)
end

-- GOOD PRACTICE (Fast - Caching)
function init(self)
    -- Allocate memory once
    self.paint = Paint.new()
    self.paint.color = Color.rgba(255, 0, 0, 255)
    self.path = Path.new()
    self.path:moveTo(Vec2D.xy(-10, -10))
    self.path:lineTo(Vec2D.xy(10, -10))
    self.path:lineTo(Vec2D.xy(10, 10))
    self.path:lineTo(Vec2D.xy(-10, 10))
    self.path:close()
    return true
end

function draw(self, renderer)
    -- No memory allocation, just execution
    renderer:drawPath(self.path, self.paint)
end
```

If the geometry or color changes, modify the existing cached objects rather than creating new ones. Use `path:reset()` to clear the geometry efficiently before rebuilding it.

#### 43.3. Leverage the update() Lifecycle

If a calculation or path generation depends on inputs that change infrequently, perform the work in the `update(self)` function. `update` is only called when bound inputs change, whereas `advance` and `draw` are called every frame.

#### 43.4. Mathematical Efficiency

- **Square Roots**: Functions like `Vec2D.length()` use `math.sqrt`, which is relatively expensive. If you only need to *compare* distances (e.g., checking if an object is within a radius), compare the *squared* distances instead (if the API provides a `lengthSquared()` method or similar).
- **Local Variables**: Luau optimizes access to `local` variables significantly better than global variables.
- **Avoid Per-Frame Allocations**: Reuse tables and avoid creating new anonymous functions inside `advance`/`draw` when possible.

#### 43.5. Advanced Optimization: Object Pooling

For scenarios involving frequent creation and destruction of dynamic instances (e.g., particles, projectiles), the standard instantiation pattern (`template:instance()`) can cause GC pressure.

**Object Pooling** is a technique where a fixed number of instances are created upfront and reused.

**Object Pool Implementation Sketch:**

```lua
--!strict
export type Spawner = {
    template: Input<Artboard<Data.Particle>>,
    pool: {Artboard<Data.Particle>},
    active: {Artboard<Data.Particle>},
}

local POOL_SIZE = 100

function init(self: Spawner)
    -- Pre-allocate the pool
    for i = 1, POOL_SIZE do
        local instance = self.template:instance()
        table.insert(self.pool, instance)
    end
    return true
end

function spawnParticle(self: Spawner)
    if #self.pool > 0 then
        -- Take one from the pool and move it to the active list
        local particle = table.remove(self.pool, 1)
        table.insert(self.active, particle)
        -- Reset its state (position, timer, etc.)
        -- resetParticleState(particle) -- Helper function assumed
    end
end

function advance(self: Spawner, seconds: number)
    -- Iterate backwards over active particles (See [Pitfall 44.4](#444-pitfall-modifying-tables-during-forward-iteration))
    for i = #self.active, 1, -1 do
        local particle = self.active[i]
        particle:advance(seconds)

        -- Check if the particle should be recycled
        if isParticleDead(particle) then -- Helper function assumed
            -- Remove from active list
            table.remove(self.active, i)
            -- Return to the pool
            table.insert(self.pool, particle)
        end
    end
    return true
end

-- draw() function would only iterate over the 'active' table.
```

### 44. Common Pitfalls and Debugging Techniques

Recognizing common pitfalls helps avoid them and speeds up debugging.

#### 44.1. Pitfall: The Colon (:) vs. Dot (.) Mistake (OOP)

The most frequent error when using OOP in Luau.

```lua
-- Definition:
function MyClass:myMethod(value) ... end

-- Incorrect Call:
myInstance.myMethod(10) -- Uses dot instead of colon
```

- **Symptom**: Runtime error similar to "attempt to index number with '...'".
- **Cause**: When calling with a dot, `myInstance` is *not* passed as `self`. Inside the method, `self` becomes the first argument (`10`).
- **Solution**: Always use the colon syntax (`:`) when calling methods defined with a colon.

#### 44.2. Pitfall: Forgetting .value on Inputs

```lua
--!strict
type MyNode = { speed: Input<number> }

-- Incorrect Usage:
-- local movement = self.speed * seconds
```

- **Symptom**: Type error (strict mode) or runtime arithmetic error (non-strict mode).
- **Cause**: `self.speed` is the wrapper object (`Input<T>`), not the underlying number.
- **Solution**: Always access the underlying data using `self.speed.value`.

#### 44.3. Pitfall: Frame-Rate Dependent Motion

```lua
-- Incorrect Usage:
function advance(self, seconds)
    self.position.x += self.speed -- Missing * seconds
end
```

- **Symptom**: The animation plays faster on high-refresh-rate monitors.
- **Solution**: Always multiply speed by `seconds` (delta time) for continuous movement, or use the Fixed-Step Update pattern ([Part 6, Section 39](#39-advanced-technique-fixed-step-updates-game-logic-and-physics)).

#### 44.4. Pitfall: Modifying Tables During Forward Iteration

When managing lists of objects, you cannot safely remove an item from a table while iterating forward.

```lua
-- Unsafe removal during forward iteration
for i, projectile in ipairs(self.projectiles) do
    if projectile.isDead then
        -- This shifts the indices, causing the loop to skip the next item!
        table.remove(self.projectiles, i)
    end
end
```

**Solution**: Iterate backward when you need to remove items.

```lua
-- Safe removal during backward iteration
for i = #self.projectiles, 1, -1 do
    if self.projectiles[i].isDead then
        table.remove(self.projectiles, i)
    end
end
```

#### 44.5. Debugging Technique: Visual Debugging

Often, the hardest bugs involve complex math. Use the `draw` function to visualize the internal state.

- **Visualize Vectors**: Draw lines representing velocity or direction.
- **Visualize Bounding Boxes**: Draw the bounding rectangles used for calculations.
- **Visualize Points**: Draw small circles at target locations or intersection points.

#### 44.6. Debugging Technique: Profiling

Rive provides structural profiling that shows where your frame budget is being spent. This helps identify performance bottlenecks in:

- **Layout calculations**: Complex layouts or frequent resize calls
- **State Machine evaluation**: Transitions and condition checks
- **Script overhead**: Time spent in `advance`, `draw`, and `update` functions

To profile effectively:
1. Use the editor's built-in profiling tools when available
2. Measure time with `os.clock()` for specific code sections
3. Look for consistent frame time spikes rather than isolated outliers

```lua
function advance(self: MyNode, seconds: number): boolean
    local startTime = os.clock()

    -- Your expensive logic here

    local elapsed = os.clock() - startTime
    if elapsed > 0.001 then -- More than 1ms
        print(`Warning: advance took {elapsed * 1000:.2f}ms`)
    end
    return true
end
```

#### 44.7. Pitfall: Unbalanced Renderer State

Forgetting a `renderer:restore()` leaves the transformation or clipping state active for later draws. Symptoms include skewed or clipped rendering far from the source of the bug.

#### 44.8. Pitfall: Using late() Values Before Initialization

If a field is initialized with `late()`, it must be assigned a valid value before any read. Accessing it too early can cause runtime errors or invalid rendering.

### 45. Code Style and Readability

Adhering to consistent conventions improves collaboration and maintainability.

#### 45.1. Naming Conventions

- **Variables and Functions**: `camelCase` (e.g., `elapsedTime`, `calculateArea`).
- **Classes (Prototypes and Types)**: `PascalCase` (e.g., `Sprite`, `SpriteType`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_HEALTH`).
- **Private Members (OOP)**: Prefix with an underscore (`_`) by convention (e.g., `self._internalState`).

#### 45.2. Use Luau Enhancements

Leverage Luau features for cleaner code:

- **Compound Assignments**: `x += 1` instead of `x = x + 1`.
- **String Interpolation**: `` `Position: {x}` `` instead of `"Position: " .. x`.
- **Generalized Iteration**: `for k, v in myTable do` instead of `for k, v in pairs(myTable) do`.
- **If-Then-Else Expressions**: `local max = if a > b then a else b` instead of a multi-line conditional.
- **Number Separators**: `1_000_000` for readability in large numbers.

---

## Appendix A: Luau Standard Library Reference

Luau extends the standard Lua 5.1 library with additional functions optimized for game development and interactive applications. This appendix covers the most useful additions not covered elsewhere in this guide.

### A.1 Math Library Extensions

Luau adds several practical math functions:

#### `math.clamp(n, min, max): number`

Constrains a value to a range. Returns `n` if it's within `[min, max]`; otherwise returns the boundary value.

```lua
local health = math.clamp(damage, 0, 100)  -- Never below 0 or above 100
local alpha = math.clamp(fadeProgress, 0, 1)
```

#### `math.sign(n): number`

Returns the sign of a number: `-1` if negative, `1` if positive, `0` if zero or NaN.

```lua
local direction = math.sign(velocity.x)  -- -1, 0, or 1
local facing = if math.sign(targetX - selfX) > 0 then "right" else "left"
```

#### `math.round(n): number`

Rounds to the nearest integer. Halfway values (`.5`) round away from zero.

```lua
local rounded = math.round(3.5)   -- 4
local rounded2 = math.round(-3.5) -- -4
local snapped = math.round(position / gridSize) * gridSize  -- Snap to grid
```

#### `math.noise(x, y?, z?): number`

Returns 3D Perlin noise in the range `[-1, 1]`. Use for procedural generation.

```lua
-- Generate terrain height
local height = math.noise(x * 0.1, z * 0.1) * 50

-- Animate organic movement
local wobble = math.noise(self.time * 2, 0) * 10
```

#### `math.lerp(a, b, t): number`

Linear interpolation between two numbers. `t` is typically 0 to 1.

```lua
local smoothX = math.lerp(currentX, targetX, 0.1)  -- Ease toward target
local midpoint = math.lerp(startValue, endValue, 0.5)
```

#### `math.map(x, inMin, inMax, outMin, outMax): number`

Maps a value from one range to another linearly.

```lua
-- Convert slider (0-100) to opacity (0-1)
local opacity = math.map(sliderValue, 0, 100, 0, 1)

-- Convert mouse position to rotation angle
local angle = math.map(mouseX, 0, screenWidth, -math.pi, math.pi)
```

### A.2 String Library Extensions

#### `string.split(s, separator?): {string}`

Splits a string into an array using the separator (defaults to `,`).

```lua
local parts = string.split("apple,banana,cherry", ",")
-- parts = {"apple", "banana", "cherry"}

local words = string.split("hello world", " ")
-- words = {"hello", "world"}

local lines = string.split(multiLineText, "\n")
```

### A.3 Table Library Extensions

Beyond the functions covered in [Section 8](#8-tables-the-core-data-structure-arrays-and-dictionaries), these are particularly useful:

#### `table.move(src, first, last, dest, target?)`

Efficiently moves elements between positions or tables.

```lua
-- Move elements 3-5 to positions 1-3
table.move(myArray, 3, 5, 1)
```

#### `table.pack(...): {n: number, ...}`

Packs variadic arguments into a table with an `n` field for count.

```lua
local function logAll(...)
    local args = table.pack(...)
    print(`Received {args.n} arguments`)
end
```

#### `table.unpack(t, i?, j?): ...`

Unpacks table elements as multiple return values.

```lua
local coords = {100, 200, 50}
local x, y, z = table.unpack(coords)
```

### A.4 Bit32 Library (Bitwise Operations)

The `bit32` library provides 32-bit bitwise operations, useful for flags, masks, and low-level data manipulation.

#### Basic Operations

```lua
-- AND: both bits must be 1
bit32.band(0b1100, 0b1010)  -- 0b1000 (8)

-- OR: either bit can be 1
bit32.bor(0b1100, 0b1010)   -- 0b1110 (14)

-- XOR: bits must differ
bit32.bxor(0b1100, 0b1010)  -- 0b0110 (6)

-- NOT: invert all bits
bit32.bnot(0b1100)          -- inverts all 32 bits
```

#### Bit Shifting

```lua
-- Left shift (multiply by powers of 2)
bit32.lshift(1, 4)    -- 16 (1 << 4)

-- Right shift (divide by powers of 2)
bit32.rshift(16, 2)   -- 4 (16 >> 2)
```

#### Practical Example: Flag System

```lua
--!strict
-- Define flags as powers of 2
local FLAGS = {
    VISIBLE = 1,        -- 0b0001
    INTERACTIVE = 2,    -- 0b0010
    ANIMATED = 4,       -- 0b0100
    SELECTED = 8,       -- 0b1000
}

local function hasFlag(value: number, flag: number): boolean
    return bit32.band(value, flag) ~= 0
end

local function setFlag(value: number, flag: number): number
    return bit32.bor(value, flag)
end

local function clearFlag(value: number, flag: number): number
    return bit32.band(value, bit32.bnot(flag))
end

-- Usage
local state = setFlag(0, FLAGS.VISIBLE)
state = setFlag(state, FLAGS.INTERACTIVE)
print(hasFlag(state, FLAGS.VISIBLE))      -- true
print(hasFlag(state, FLAGS.ANIMATED))     -- false
```

### A.5 Rive Sandbox Limitations

Rive's Luau environment is sandboxed for security. The following standard Lua libraries are **not available**:

- `io` - File system operations
- `os` (mostly) - Only `os.clock()`, `os.difftime()`, `os.time()` are available
- `debug` - Debugging and introspection
- `package` - Module loading from file system
- `loadfile`, `dofile`, `loadstring` - Dynamic code loading

The `__gc` metamethod is also disabled in Luau for safety reasons.

---

### 46. Comprehensive Resource Directory

#### 46.1. Official Rive Documentation

- **Rive Scripting Getting Started**: https://rive.app/docs/scripting/getting-started
- **Rive Scripting API Reference**: https://rive.app/docs/scripting/api-reference (Tip: The editor's autocomplete is often the most immediate reference.)
- **Script Inputs**: https://rive.app/docs/scripting/script-inputs
- **Protocols Overview**: https://rive.app/docs/scripting/protocols
- **Pointer Events**: https://rive.app/docs/scripting/pointer-events
- **Unit Testing**: https://rive.app/docs/scripting/debugging/unit-testing
- **Rive Docs GitHub Repository**: https://github.com/rive-app/rive-docs/tree/main/scripting

#### 46.2. Luau Language Resources

- **Luau Official Website**: https://luau-lang.org/ (The definitive resource for syntax, features, and performance).
- **Luau Type Checking Guide**: https://luau-lang.org/typecheck (Essential reading for understanding the type system in depth).
- **Luau Syntax Reference**: https://luau-lang.org/syntax (Complete syntax documentation).
- **Luau News & Updates**: https://luau.org/news (Monthly recaps of new features and improvements).
- **Luau GitHub Repository**: https://github.com/luau-lang/luau (Source code, releases, and RFCs).

#### 46.3. Foundational Lua Resources

- **Lua 5.1 Reference Manual**: https://www.lua.org/manual/5.1/ (Crucial for understanding core concepts like metatables, as Luau is derived from 5.1).

#### 46.4. Related Concepts

- **Vector Mathematics**: A strong understanding of vectors and matrices is essential for 2D graphics programming.
- **Game Programming Patterns**: Concepts like Object Pooling, the Observer Pattern (Signals), and Game Loops are highly applicable to complex Rive projects.

---

<a id="changelog"></a>
## Changelog

### v1.4

- **NEW**: Added Gradient API documentation (linear and radial gradients)
- **NEW**: Added PathMeasure and ContourMeasure documentation for path analysis
- **NEW**: Added Animation API for programmatic timeline control
- **NEW**: Added Appendix A: Luau Standard Library Reference (math.clamp, math.sign, math.round, math.noise, string.split, bit32)
- **NEW**: Added Paint.with() constructor and copy() method documentation
- Updated sandbox limitations section

### v1.3

- Added new Luau syntax features: if-then-else expressions, binary/hex literals with separators, `table.find()`
- Added coverage of the Rive AI Coding Agent for script creation and editing
- Expanded type system section with read-only properties and the `__iter` metamethod for custom iteration
- Clarified how Rive generates Luau type definitions from its C++ engine APIs
- Added profiling guidance in the debugging section
- Updated resource links and cross-references throughout

### v1.2

- Aligned scripting APIs with the latest Rive docs (inputs, converters, layout lifecycle, paint/style, renderer, color ranges)
- Added missing protocol coverage (Path Effects) and pointer events guidance
- Clarified ViewModel access rules, input mutability, and updated test API examples
