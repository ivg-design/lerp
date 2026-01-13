# Lesson 2.3: Generics & Advanced Types

## Learning Objectives
- Understand generic type parameters (`<T>`)
- Create reusable generic functions
- Define generic type aliases
- Use Rive's generic types (`Input<T>`, `Node<T>`)
- Apply intersection types for composition

---

## What Are Generics?

Generics let you write code that works with multiple types while maintaining type safety. Instead of writing separate functions for each type:

```lua
function getFirstString(arr: {string}): string? ... end
function getFirstNumber(arr: {number}): number? ... end
```

You write one generic function:

```lua
function getFirst<T>(arr: {T}): T? ... end
```

The `<T>` is a **type parameter** - a placeholder that gets filled in when you use the function.

---

## Quick Concept Review

```lua
-- Generic function
function identity<T>(value: T): T
    return value
end

-- Generic type alias
type Container<T> = { value: T, count: number }

-- Multiple type parameters
function pair<A, B>(first: A, second: B): (A, B)
    return first, second
end

-- Rive uses generics extensively
Input<number>
Input<Color>
Node<MyScriptType>
Artboard<Data.MyViewModel>
```

---

## Exercise 1: Generic Functions Basics ⭐

**Context**: Generic functions let you write reusable code that works with any type.

**Task**: Implement these generic functions:

```lua
--!strict

-- EXAMPLE: A generic identity function (returns what it receives)
local function identity<T>(value: T): T
    return value
end

-- YOUR TASK: Implement these generic functions

-- 1. getFirst: Returns the first element of any array
local function getFirst<T>(arr: {T}): T?
    -- YOUR CODE HERE
end

-- 2. getLast: Returns the last element of any array
local function getLast<T>(arr: {T}): T?
    -- YOUR CODE HERE
end

-- 3. wrapInArray: Wraps any single value in an array
local function wrapInArray<T>(value: T): {T}
    -- YOUR CODE HERE
end

-- 4. defaultIfNil: Returns value if not nil, otherwise returns default
local function defaultIfNil<T>(value: T?, default: T): T
    -- YOUR CODE HERE
end

export type GenericsBasics = {}

function init(self: GenericsBasics): boolean
    -- Test with strings
    local names = {"Alice", "Bob", "Charlie"}
    print(`First name: {getFirst(names)}`)
    print(`Last name: {getLast(names)}`)

    -- Test with numbers
    local scores = {100, 85, 92}
    print(`First score: {getFirst(scores)}`)
    print(`Last score: {getLast(scores)}`)

    -- Test wrapInArray
    local wrapped = wrapInArray(42)
    print(`Wrapped: {wrapped[1]}`)

    -- Test defaultIfNil
    local maybeValue: string? = nil
    local result = defaultIfNil(maybeValue, "default")
    print(`Default result: {result}`)

    local actualValue: string? = "actual"
    local result2 = defaultIfNil(actualValue, "default")
    print(`Actual result: {result2}`)

    return true
end

return function(): Node<GenericsBasics>
    return { init = init }
end
```

**Expected Output**:
```
First name: Alice
Last name: Charlie
First score: 100
Last score: 92
Wrapped: 42
Default result: default
Actual result: actual
```

---

## Exercise 2: Generic Type Aliases ⭐⭐

**Context**: Generic types create reusable data structure definitions.

**Task**: Create and use generic type aliases:

```lua
--!strict

-- A container that holds a value of any type
type Box<T> = {
    value: T,
    label: string,
}

-- A result type that's either success or error
type Result<T, E> = {
    success: boolean,
    value: T?,
    error: E?,
}

-- YOUR TASK: Define these generic types

-- 1. Pair<A, B>: Holds two values of different types (first: A, second: B)
type Pair<A, B> = {
    -- YOUR CODE HERE
}

-- 2. Stack<T>: A stack with items array and push/pop placeholders
type Stack<T> = {
    items: {T},
    top: number,
}

-- 3. Optional<T>: Like Result but simpler - just hasValue boolean and value T?
type Optional<T> = {
    -- YOUR CODE HERE
}

-- Create values using these types
local function createBox<T>(value: T, label: string): Box<T>
    return { value = value, label = label }
end

local function createPair<A, B>(first: A, second: B): Pair<A, B>
    return { first = first, second = second }
end

local function createStack<T>(): Stack<T>
    return { items = {}, top = 0 }
end

local function pushStack<T>(stack: Stack<T>, value: T)
    stack.top += 1
    stack.items[stack.top] = value
end

local function popStack<T>(stack: Stack<T>): T?
    if stack.top > 0 then
        local value = stack.items[stack.top]
        stack.items[stack.top] = nil :: any
        stack.top -= 1
        return value
    end
    return nil
end

export type GenericTypes = {}

function init(self: GenericTypes): boolean
    -- Test Box
    local numberBox = createBox(42, "Answer")
    local stringBox = createBox("Hello", "Greeting")
    print(`Number box: {numberBox.label} = {numberBox.value}`)
    print(`String box: {stringBox.label} = {stringBox.value}`)

    -- Test Pair
    local coords = createPair(100, 200)
    local mixed = createPair("name", 42)
    print(`Coords: ({coords.first}, {coords.second})`)
    print(`Mixed: {mixed.first} = {mixed.second}`)

    -- Test Stack
    local numStack: Stack<number> = createStack()
    pushStack(numStack, 1)
    pushStack(numStack, 2)
    pushStack(numStack, 3)
    print(`Pop: {popStack(numStack)}`)  -- 3
    print(`Pop: {popStack(numStack)}`)  -- 2

    return true
end

return function(): Node<GenericTypes>
    return { init = init }
end
```

---

## Exercise 3: Understanding Rive's Generic Types ⭐⭐

**Context**: Rive uses generics extensively. Understanding them helps you use the API correctly.

**Task**: Work with Rive's built-in generic types:

```lua
--!strict

-- Rive's Input<T> is generic - it wraps any value type
-- The T parameter specifies what type of value the input holds

export type RiveGenerics = {
    -- Different Input types
    speed: Input<number>,
    playerName: Input<string>,
    isActive: Input<boolean>,
    tint: Input<Color>,

    -- Path and Paint (not generic, but used with generics)
    myPath: Path,
    myPaint: Paint,
}

function init(self: RiveGenerics): boolean
    -- Accessing generic Input values
    -- All use .value, but the TYPE of .value differs

    local speedValue: number = self.speed.value       -- number
    local nameValue: string = self.playerName.value   -- string
    local activeValue: boolean = self.isActive.value  -- boolean
    local colorValue: Color = self.tint.value         -- Color

    print(`Speed (number): {speedValue}`)
    print(`Name (string): {nameValue}`)
    print(`Active (boolean): {activeValue}`)
    print(`Tint: R={Color.red(colorValue)}`)

    -- Initialize non-generic types
    self.myPath = Path.new()
    self.myPaint = Paint.new()
    self.myPaint.color = self.tint.value  -- Use the Input value

    return true
end

-- The factory function uses Node<T> - also generic!
-- Node<RiveGenerics> tells Rive this Node has RiveGenerics properties

return function(): Node<RiveGenerics>
    return {
        init = init,
        -- Inputs with default values
        speed = 100,
        playerName = "Hero",
        isActive = true,
        tint = Color.rgba(255, 128, 0, 255),
        -- late() for things initialized in init
        myPath = late(),
        myPaint = late(),
    }
end
```

**Questions to answer**:
1. What is the type of `self.speed` vs `self.speed.value`?
2. Why do some properties use `late()` and others have direct values?
3. What does `Node<RiveGenerics>` mean?

---

## Exercise 4: Generic Constraints (Advanced) ⭐⭐⭐

**Context**: Sometimes you need generics that only work with certain types.

**Note**: Luau doesn't have explicit generic constraints like TypeScript, but we can use patterns to achieve similar results.

**Task**: Implement type-safe utility functions:

```lua
--!strict

-- A type for things that have a length
type HasLength = { length: number }

-- A type for things that can be compared
type Comparable = number | string

-- Implement these functions that work with specific kinds of types

-- 1. maxLength: Works with anything that has a 'length' property
local function maxLength<T>(a: T & HasLength, b: T & HasLength): T
    if a.length > b.length then
        return a
    else
        return b
    end
end

-- 2. clampNumber: Only works with numbers
local function clampNumber(value: number, min: number, max: number): number
    return math.clamp(value, min, max)
end

-- 3. compareValues: Works with numbers or strings
local function compareValues<T>(a: T, b: T): number where T: Comparable
    -- This syntax doesn't exist in Luau, so we use a different approach
    if type(a) == "number" and type(b) == "number" then
        if a < b then return -1
        elseif a > b then return 1
        else return 0
        end
    elseif type(a) == "string" and type(b) == "string" then
        if a < b then return -1
        elseif a > b then return 1
        else return 0
        end
    end
    return 0
end

-- YOUR TASK: Create a generic cache system

type CacheEntry<T> = {
    value: T,
    timestamp: number,
    key: string,
}

type Cache<T> = {
    entries: {[string]: CacheEntry<T>},
    maxAge: number,
}

-- Implement these cache functions:

local function createCache<T>(maxAge: number): Cache<T>
    -- YOUR CODE HERE
    -- Return a new cache with empty entries and the given maxAge
end

local function setCache<T>(cache: Cache<T>, key: string, value: T)
    -- YOUR CODE HERE
    -- Add entry with current timestamp (use os.clock())
end

local function getCache<T>(cache: Cache<T>, key: string): T?
    -- YOUR CODE HERE
    -- Return value if exists and not expired, nil otherwise
end

export type CacheDemo = {}

function init(self: CacheDemo): boolean
    -- Test the cache
    local stringCache: Cache<string> = createCache(10)  -- 10 second max age

    setCache(stringCache, "greeting", "Hello!")
    setCache(stringCache, "farewell", "Goodbye!")

    local greeting = getCache(stringCache, "greeting")
    print(`Cached greeting: {greeting or "not found"}`)

    local missing = getCache(stringCache, "missing")
    print(`Missing key: {missing or "not found"}`)

    return true
end

return function(): Node<CacheDemo>
    return { init = init }
end
```

---

## Exercise 5: Intersection Types ⭐⭐

**Context**: Intersection types (`&`) combine multiple types into one. The result must satisfy ALL combined types.

**Task**: Use intersection types for composition:

```lua
--!strict

-- Base types
type Named = { name: string }
type Positioned = { x: number, y: number }
type Sized = { width: number, height: number }
type Colored = { color: Color }

-- Intersection: Must have ALL properties from both types
type NamedPosition = Named & Positioned

-- More complex intersection
type GameObject = Named & Positioned & Sized

-- Full intersection
type VisualObject = Named & Positioned & Sized & Colored

-- Functions that work with different intersection levels
local function printName(obj: Named)
    print(`Name: {obj.name}`)
end

local function printPosition(obj: Positioned)
    print(`Position: ({obj.x}, {obj.y})`)
end

local function printBounds(obj: Positioned & Sized)
    print(`Bounds: ({obj.x}, {obj.y}) to ({obj.x + obj.width}, {obj.y + obj.height})`)
end

export type IntersectionDemo = {}

function init(self: IntersectionDemo): boolean
    -- Create objects with different intersection types
    local simple: NamedPosition = {
        name = "Point A",
        x = 10,
        y = 20,
    }

    local gameObj: GameObject = {
        name = "Player",
        x = 100,
        y = 100,
        width = 32,
        height = 48,
    }

    local visual: VisualObject = {
        name = "Enemy",
        x = 200,
        y = 150,
        width = 24,
        height = 24,
        color = Color.rgba(255, 0, 0, 255),
    }

    -- All objects with Named work with printName
    printName(simple)
    printName(gameObj)
    printName(visual)

    -- All objects with Positioned work with printPosition
    printPosition(simple)
    printPosition(gameObj)
    printPosition(visual)

    -- Only objects with Positioned & Sized work with printBounds
    -- printBounds(simple)  -- Error! simple doesn't have width/height
    printBounds(gameObj)
    printBounds(visual)

    -- YOUR TASK: Create a function that only works with Colored objects
    local function printColor(obj: Colored)
        -- YOUR CODE HERE
    end

    printColor(visual)  -- Should work
    -- printColor(gameObj)  -- Would error - no color property

    return true
end

return function(): Node<IntersectionDemo>
    return { init = init }
end
```

---

## Exercise 6: Putting It All Together ⭐⭐⭐

**Context**: Build a mini entity system using all the type features you've learned.

```lua
--!strict

-- Base entity type with generic data
type Entity<T> = {
    id: number,
    name: string,
    data: T,
    active: boolean,
}

-- Specific data types
type PlayerData = {
    health: number,
    score: number,
    inventory: {string},
}

type EnemyData = {
    health: number,
    damage: number,
    speed: number,
}

type ItemData = {
    value: number,
    rarity: "common" | "rare" | "epic" | "legendary",
}

-- Type aliases for specific entities
type Player = Entity<PlayerData>
type Enemy = Entity<EnemyData>
type Item = Entity<ItemData>

-- Union of all entity types
type AnyEntity = Player | Enemy | Item

-- Entity registry with generics
type EntityRegistry<T> = {
    entities: {[number]: Entity<T>},
    nextId: number,
}

-- YOUR TASK: Implement these functions

local function createRegistry<T>(): EntityRegistry<T>
    -- YOUR CODE HERE
end

local function addEntity<T>(registry: EntityRegistry<T>, name: string, data: T): Entity<T>
    -- YOUR CODE HERE
    -- Create new entity with auto-incremented id, return it
end

local function getEntity<T>(registry: EntityRegistry<T>, id: number): Entity<T>?
    -- YOUR CODE HERE
end

local function removeEntity<T>(registry: EntityRegistry<T>, id: number): boolean
    -- YOUR CODE HERE
    -- Return true if removed, false if not found
end

export type EntitySystem = {
    players: EntityRegistry<PlayerData>,
    enemies: EntityRegistry<EnemyData>,
    items: EntityRegistry<ItemData>,
}

function init(self: EntitySystem): boolean
    -- Initialize registries
    self.players = createRegistry()
    self.enemies = createRegistry()
    self.items = createRegistry()

    -- Add some entities
    local player1 = addEntity(self.players, "Hero", {
        health = 100,
        score = 0,
        inventory = {"Sword", "Shield"}
    })

    local enemy1 = addEntity(self.enemies, "Goblin", {
        health = 30,
        damage = 5,
        speed = 2
    })

    local item1 = addEntity(self.items, "Gold Coin", {
        value = 10,
        rarity = "common"
    })

    print(`Created player: {player1.name} (ID: {player1.id})`)
    print(`Created enemy: {enemy1.name} (ID: {enemy1.id})`)
    print(`Created item: {item1.name} (ID: {item1.id})`)

    -- Retrieve entity
    local retrieved = getEntity(self.players, player1.id)
    if retrieved then
        print(`Retrieved: {retrieved.name} with {retrieved.data.health} HP`)
    end

    return true
end

return function(): Node<EntitySystem>
    return {
        init = init,
        players = late(),
        enemies = late(),
        items = late(),
    }
end
```

---

## Comprehension Check

1. **What does `<T>` mean in a function definition?**

2. **How is `Input<number>` different from just `number`?**

3. **What's the difference between union (`|`) and intersection (`&`) types?**

4. **Why might you use `Entity<T>` instead of separate `Player`, `Enemy`, `Item` types?**

---

## Self-Assessment Checklist

- [ ] I can write generic functions with `<T>`
- [ ] I can create generic type aliases
- [ ] I understand how Rive's `Input<T>` and `Node<T>` work
- [ ] I can use intersection types to combine properties
- [ ] I know when to use generics vs. specific types

---

## Common Mistakes

1. **Forgetting the `<T>` in function definition**: `function foo<T>(x: T)` not `function foo(x: T)`
2. **Confusing union and intersection**: `A | B` means "A or B", `A & B` means "A and B"
3. **Not specifying type parameters when needed**: `local cache: Cache<string>` not `local cache: Cache`

---

## Next Module
**Module 3: Object-Oriented Programming** - Build classes using metatables
