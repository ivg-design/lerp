<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.0.0
language: en
narrator: US English Female

logo:     assets/images/lerp-logo.svg

comment:  LERP: Luau Education for Rive Professionals - An interactive course for mastering Rive scripting with Luau.

link:     https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css
script:   https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js

import:   https://raw.githubusercontent.com/liaScript/mermaid_template/master/README.md

-->

# LERP: Luau Education for Rive Professionals

> *Interpolate your way from zero to hero*

Welcome to **LERP** - a comprehensive, interactive course for mastering Rive scripting with Luau.

---

**What you'll learn:**

- [x] Luau language fundamentals and type system
- [x] Object-oriented programming patterns
- [x] Rive scripting protocols and lifecycle
- [x] Custom rendering with Path, Paint, and Renderer
- [x] Advanced techniques: events, instantiation, optimization

---

## How to Use This Course

This course is built with [LiaScript](https://liascript.github.io/), providing:

* **Interactive Quizzes** - Test your knowledge as you go
* **Code Examples** - Copy to Rive Editor to try them
* **Progress Tracking** - Your progress is saved in your browser
* **Text-to-Speech** - Listen to content if preferred

**Navigation:**

- Use the **sidebar** (☰ menu) to jump between modules
- Use **arrow keys** or swipe to navigate pages
- Click **speaker icon** 🔊 for audio narration

**Tips:**

- **Try code examples**: Copy code blocks and paste into the Rive Editor's script panel
- **Reset quizzes**: Click ☰ menu → Settings → Reset Progress to retry quizzes
- **Reference docs**: Use the header links for Full Guide, API Ref, Quick Ref

---

## Course Modules

| Module | Description | Duration |
|--------|-------------|----------|
| [Module 1: Fundamentals](#module-1-fundamentals) | Syntax, variables, data types | ~2 hours |
| [Module 2: Type System](#module-2-type-system) | Strict mode, annotations, generics | ~2 hours |
| [Module 3: OOP](#module-3-oop) | Metatables, classes, inheritance | ~3 hours |
| [Module 4: Rive Integration](#module-4-rive-integration) | Protocols, inputs, lifecycle | ~3 hours |
| [Module 5: Drawing API](#module-5-drawing-api) | Path, Paint, Renderer | ~2 hours |
| [Module 6: Advanced](#module-6-advanced) | Events, instantiation, performance | ~3 hours |
| [Module 7: Projects](#module-7-projects) | Real-world applications | ~4 hours |

---

# Module 1: Fundamentals

Learn the building blocks of Luau programming.

## 1.1 Welcome to Rive Scripting

Rive is a powerful tool for creating interactive graphics that run anywhere. While Timelines and State Machines handle predefined motion, **scripting** enables:

- Complex interactivity
- Procedural generation
- Dynamic layouts
- Game logic

                          {{1}}
*****
**Why Luau?**

Luau is a fast, safe scripting language derived from Lua 5.1. It adds:

- Optional static typing
- Type inference
- Modern syntax features
- Performance optimizations

*****

### Quick Check

What does Rive scripting enable that State Machines cannot?

    [( )] Only timeline animations
    [(X)] Procedural generation and complex logic
    [( )] Faster rendering
    [( )] Better compression

---

## 1.2 Syntax and Variables

Every Luau script in Rive should start with strict mode:

``` lua
--!strict

-- This is a comment
local message = "Hello, Rive!"
print(message)
```

### Variable Declaration

``` lua
--!strict

-- Local variables (preferred)
local score = 100
local playerName = "Hero"
local isActive = true

-- Constants (by convention, use UPPER_CASE)
local MAX_HEALTH = 100
local PI = 3.14159
```

                          {{1}}
> **Best Practice:** Always use `local` for variables. Global variables pollute the namespace and are slower.

### Exercise: Your First Variables

Copy this code to a **Node Script** in Rive Editor and try modifying it:

``` lua
--!strict

local greeting = "Hello"
local target = "World"
local count = 42

print(greeting .. ", " .. target .. "!")
print("The answer is: " .. count)
```

> 💡 **Try it**: Change `greeting` to your name. What output do you see in Rive's console?

    [[Your answer here]]

---

## 1.3 Data Types

Luau has these fundamental types:

| Type | Example | Description |
|------|---------|-------------|
| `nil` | `nil` | Absence of value |
| `boolean` | `true`, `false` | Logical values |
| `number` | `42`, `3.14` | All numeric values |
| `string` | `"hello"` | Text |
| `table` | `{1, 2, 3}` | Arrays and dictionaries |
| `function` | `function() end` | Callable code |

### Type Checking Quiz

What is the type of `local x = "42"`?

    [( )] number
    [(X)] string
    [( )] nil
    [( )] boolean

What is the result of `type(nil)`?

    [(X)] "nil"
    [( )] nil
    [( )] error
    [( )] "null"

---

## 1.4 Operators

### Arithmetic Operators

``` lua
local a, b = 10, 3

print(a + b)   -- 13 (addition)
print(a - b)   -- 7  (subtraction)
print(a * b)   -- 30 (multiplication)
print(a / b)   -- 3.333... (division)
print(a % b)   -- 1  (modulo)
print(a ^ b)   -- 1000 (exponentiation)
```

### Luau-Specific: Compound Assignment

``` lua
--!strict

local score = 0

score += 10    -- score = score + 10
score -= 5     -- score = score - 5
score *= 2     -- score = score * 2

print(score)   -- 10
```

### String Concatenation

``` lua
local first = "Hello"
local second = "World"

-- Traditional concatenation
local result1 = first .. ", " .. second .. "!"

-- String interpolation (Luau feature!)
local result2 = `{first}, {second}!`

print(result1)  -- Hello, World!
print(result2)  -- Hello, World!
```

---

## 1.5 Control Flow

### If-Then-Else

``` lua
--!strict

local health = 75

if health > 80 then
    print("Healthy")
elseif health > 30 then
    print("Wounded")
else
    print("Critical!")
end
```

### Luau If-Expression

``` lua
--!strict

local health = 75

-- Single-line conditional expression
local status = if health > 50 then "Good" else "Bad"
print(status)  -- Good
```

### Loops

``` lua
--!strict

-- For loop (numeric)
for i = 1, 5 do
    print(i)
end

-- While loop
local count = 0
while count < 3 do
    print(count)
    count += 1
end

-- For loop (array iteration)
local colors = {"red", "green", "blue"}
for index, color in colors do
    print(index, color)
end
```

---

## Module 1 Self-Assessment

Check off what you've learned:

- [ ] I understand the difference between local and global variables
- [ ] I can use all basic data types
- [ ] I know how to use compound assignment operators
- [ ] I can write if-then-else statements
- [ ] I can use for and while loops
- [ ] I understand string interpolation with backticks

### Module 1 Quiz

1. What directive enables strict type checking?

    [[--!strict]]

2. Which operator is used for string interpolation?

    [( )] `"text" .. variable`
    [(X)] `` `text {variable}` ``
    [( )] `"text ${variable}"`
    [( )] `"text" + variable`

3. What is the output of `10 % 3`?

    [[1]]

---

# Module 2: Type System

Master Luau's gradual type system for safer, more maintainable code.

## 2.1 Why Types Matter

In strict mode, the type checker catches errors before runtime:

``` lua
--!strict

local function add(a: number, b: number): number
    return a + b
end

-- This would cause a type error:
-- add("hello", "world")  -- Error: string is not compatible with number

print(add(5, 3))  -- 8
```

### Benefits of Strict Mode

    {{1}}
*****
1. **Catch errors early** - Before your animation runs
2. **Better autocomplete** - IDE knows what's available
3. **Self-documenting** - Types explain what code expects
4. **Refactoring safety** - Changes propagate correctly
*****

---

## 2.2 Type Annotations

### Basic Annotations

``` lua
--!strict

-- Variables
local name: string = "Player"
local score: number = 0
local isActive: boolean = true

-- Functions
local function greet(name: string): string
    return `Hello, {name}!`
end

-- Optional parameters
local function damage(amount: number, isCritical: boolean?): number
    if isCritical then
        return amount * 2
    end
    return amount
end
```

### Type Aliases

``` lua
--!strict

-- Simple alias
type PlayerID = number

-- Table type
type Position = {
    x: number,
    y: number,
}

-- Function type
type DamageCalculator = (base: number, multiplier: number) -> number

-- Usage
local pos: Position = { x = 100, y = 200 }
```

---

## 2.3 Union and Optional Types

### Union Types (|)

A value can be one of several types:

``` lua
--!strict

type StringOrNumber = string | number

local function process(value: StringOrNumber)
    if type(value) == "string" then
        print("String: " .. value)
    else
        print("Number: " .. value)
    end
end

process("hello")  -- String: hello
process(42)       -- Number: 42
```

### Optional Types (?)

Shorthand for `T | nil`:

``` lua
--!strict

local function findPlayer(id: number): Player?
    -- Returns Player or nil
    return players[id]
end

local player = findPlayer(1)
if player then
    print(player.name)
end
```

### Quiz: Type Annotations

What does `string?` mean?

    [(X)] string or nil
    [( )] optional string literal
    [( )] string array
    [( )] string question

---

## 2.4 Generics

Generics let you write reusable code that works with multiple types:

``` lua
--!strict

-- Generic function
local function getFirst<T>(arr: {T}): T?
    return arr[1]
end

-- Usage - T is inferred
local names = {"Alice", "Bob"}
local first = getFirst(names)  -- first: string?

local scores = {100, 90, 80}
local top = getFirst(scores)   -- top: number?
```

### Rive's Generic Types

Rive uses generics extensively:

``` lua
--!strict

type MyScript = {
    speed: Input<number>,      -- Input wrapping number
    color: Input<Color>,       -- Input wrapping Color
    position: Vec2D,           -- Not an Input, just Vec2D
}

-- Node<T> is generic over your script type
return function(): Node<MyScript>
    return {
        speed = 100,
        color = Color.rgba(255, 0, 0, 255),
        position = late(),
    }
end
```

---

## Module 2 Self-Assessment

- [ ] I can add type annotations to variables and functions
- [ ] I understand union types (|) and optional types (?)
- [ ] I can create type aliases for complex types
- [ ] I understand how generics work
- [ ] I know when to use `late()` in Rive

---

# Module 3: OOP

Object-Oriented Programming patterns in Luau using metatables.

*(Content continues...)*

---

# Module 4: Rive Integration

Protocols, inputs, and the script lifecycle.

*(Content continues...)*

---

# Module 5: Drawing API

Custom rendering with Path, Paint, and Renderer.

*(Content continues...)*

---

# Module 6: Advanced

Pointer events, dynamic instantiation, and performance optimization.

*(Content continues...)*

---

# Module 7: Projects

Real-world applications and capstone projects.

*(Content continues...)*

---

# Reference

## API Quick Reference

### Vec2D / Vector

``` lua
Vec2D.xy(x, y)           -- Create vector
Vec2D.origin()           -- (0, 0)
vec.x, vec.y             -- Read-only components
vec:lerp(other, t)       -- Interpolate
```

### Color

``` lua
Color.rgba(r, g, b, a)   -- Create (0-255 range)
Color.rgb(r, g, b)       -- Opaque color
Color.hex("#FF0066")     -- From hex string
Color.lerp(a, b, t)      -- Interpolate
Color.red(c)             -- Get red channel
```

### Paint

``` lua
Paint.new()              -- Create paint
paint.color = Color      -- Set color
paint.style = "fill"     -- or "stroke"
paint.thickness = 2      -- Stroke width
```

### Path

``` lua
Path.new()               -- Create path
path:moveTo(Vec2D)       -- Move pen
path:lineTo(Vec2D)       -- Draw line
path:close()             -- Close shape
path:reset()             -- Clear path
```

### Renderer

``` lua
renderer:save()          -- Push state
renderer:restore()       -- Pop state
renderer:transform(mat)  -- Apply transform
renderer:drawPath(path, paint)
renderer:clipPath(path)
```

---

## Changelog

### v1.0.0

- Initial release
- 7 modules covering Luau fundamentals to advanced Rive techniques
- Interactive quizzes and self-assessments
- Complete API reference

---

*Built with [LiaScript](https://liascript.github.io/) | [IVG Design](https://mograph.life) | [Forge](https://forge.mograph.life)*
