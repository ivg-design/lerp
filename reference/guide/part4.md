<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en

comment:  Part 4: Object-Oriented Programming - Part of the LERP Luau Guide

-->

# Part 4: Object-Oriented Programming

---

**Navigation:** [← Course](https://forge.mograph.life/apps/lerp/) | [Guide Index](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/index.md) | [API Ref](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/api-reference.md)

**Parts:** [1](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part1.md) | [2](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part2.md) | [3](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part3.md) | [4](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part4.md) | [5](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part5.md) | [6](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part6.md) | [7](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part7.md)

---

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

