<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en

comment:  Part 3: The Strictly Typed Approach - Part of the LERP Luau Guide

-->

# Part 3: The Strictly Typed Approach

---

**Navigation:** [← Course](https://forge.mograph.life/apps/lerp/) | [Guide Index](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/index.md) | [API Ref](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/api-reference.md)

**Parts:** [1](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part1.md) | [2](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part2.md) | [3](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part3.md) | [4](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part4.md) | [5](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part5.md) | [6](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part6.md) | [7](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part7.md)

---

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

