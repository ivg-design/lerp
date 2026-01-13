# Lesson 3.2: Building Classes

## Learning Objectives
- Create proper class constructors using metatables
- Type your classes correctly with `--!strict`
- Use the double-cast pattern for type safety
- Implement methods with proper `self` handling
- Build reusable game object classes

---

## The Class Pattern in Luau

In Lesson 3.1, we learned how `__index` enables shared behavior. Now we'll formalize this into a reusable class pattern that:

1. Works with `--!strict` type checking
2. Has a clear constructor (`new()`)
3. Defines a proper type for instances
4. Supports methods with the colon syntax

---

## Quick Concept Review

```lua
--!strict

-- 1. Create the class table
local MyClass = {}
MyClass.__index = MyClass

-- 2. Define the instance type
export type MyClassType = {
    property: number,
    -- Methods are NOT in the type (they're on the prototype)
}

-- 3. Create the constructor
function MyClass.new(): MyClassType
    local self = setmetatable({}, MyClass)
    self.property = 0
    return (self :: any) :: MyClassType  -- Double cast for strict mode
end

-- 4. Define methods on the class table
function MyClass:methodName()
    print(self.property)
end
```

---

## Exercise 1: Your First Typed Class ⭐

**Context**: Let's build a properly typed `Counter` class step by step.

**Task**: Complete the Counter class:

```lua
--!strict

-- Step 1: Create the class table
local Counter = {}
Counter.__index = Counter

-- Step 2: Define the instance type
export type CounterType = {
    value: number,
    step: number,
}

-- Step 3: Constructor
function Counter.new(startValue: number?, stepAmount: number?): CounterType
    local self = setmetatable({}, Counter)

    -- Initialize properties (use defaults if not provided)
    self.value = startValue or 0
    self.step = stepAmount or 1

    -- The double-cast pattern: tells strict mode the type is correct
    return (self :: any) :: CounterType
end

-- Step 4: Methods
function Counter:increment()
    self.value += self.step
end

function Counter:decrement()
    self.value -= self.step
end

function Counter:reset()
    self.value = 0
end

function Counter:getValue(): number
    return self.value
end

-- Test it in a Node script
export type CounterDemo = {}

function init(self: CounterDemo): boolean
    local counter1 = Counter.new()  -- Default: start at 0, step by 1
    local counter2 = Counter.new(100, 10)  -- Start at 100, step by 10

    print(`Counter 1: {counter1:getValue()}`)  -- 0
    counter1:increment()
    counter1:increment()
    print(`After 2 increments: {counter1:getValue()}`)  -- 2

    print(`\nCounter 2: {counter2:getValue()}`)  -- 100
    counter2:increment()
    print(`After increment: {counter2:getValue()}`)  -- 110
    counter2:decrement()
    counter2:decrement()
    print(`After 2 decrements: {counter2:getValue()}`)  -- 90

    return true
end

return function(): Node<CounterDemo>
    return { init = init }
end
```

---

## Exercise 2: Understanding the Double Cast ⭐⭐

**Context**: The `(self :: any) :: MyType` pattern seems strange. Let's understand why it's necessary.

**Task**: Observe what happens without the double cast:

```lua
--!strict

local BadClass = {}
BadClass.__index = BadClass

type BadType = { name: string }

-- Without the double cast, strict mode complains
function BadClass.new(): BadType
    local self = setmetatable({}, BadClass)
    self.name = "test"
    -- return self  -- Error! Type is not compatible
    return (self :: any) :: BadType  -- This works
end

-- Why? Let's trace the types:
-- 1. setmetatable({}, BadClass) returns a table with metatable
-- 2. But Luau sees it as a generic table, not BadType
-- 3. :: any tells Luau "trust me, forget the current type"
-- 4. :: BadType tells Luau "treat this as BadType from now on"

export type DoubleCastDemo = {}

function init(self: DoubleCastDemo): boolean
    -- The double cast is a "bridge" between runtime and compile-time
    -- At runtime: the object IS what we say it is (via metatable)
    -- At compile time: we need to convince the type checker

    local obj = BadClass.new()
    print(`Object name: {obj.name}`)  -- Works at runtime
    -- obj.undefinedProperty  -- Would error at compile time (good!)

    return true
end

return function(): Node<DoubleCastDemo>
    return { init = init }
end
```

**Key Insight**: The double cast doesn't change runtime behavior - it only satisfies the type checker. The metatable still provides the actual method lookup.

---

## Exercise 3: Complete Game Entity Class ⭐⭐

**Context**: Build a practical Entity class for game development.

**Task**: Implement all methods:

```lua
--!strict

local Entity = {}
Entity.__index = Entity

export type EntityType = {
    id: number,
    name: string,
    x: number,
    y: number,
    health: number,
    maxHealth: number,
    active: boolean,
}

-- Class variable for auto-incrementing IDs
local nextId = 1

function Entity.new(name: string, x: number, y: number, maxHealth: number): EntityType
    local self = setmetatable({}, Entity)

    self.id = nextId
    nextId += 1

    self.name = name
    self.x = x
    self.y = y
    self.maxHealth = maxHealth
    self.health = maxHealth
    self.active = true

    return (self :: any) :: EntityType
end

-- YOUR TASK: Implement these methods

function Entity:moveTo(newX: number, newY: number)
    -- Move the entity to new coordinates
    -- YOUR CODE HERE
end

function Entity:moveBy(dx: number, dy: number)
    -- Move by delta amounts
    -- YOUR CODE HERE
end

function Entity:takeDamage(amount: number)
    -- Reduce health by amount (minimum 0)
    -- If health reaches 0, set active to false
    -- YOUR CODE HERE
end

function Entity:heal(amount: number)
    -- Increase health by amount (maximum maxHealth)
    -- YOUR CODE HERE
end

function Entity:isAlive(): boolean
    -- Return true if health > 0
    -- YOUR CODE HERE
end

function Entity:distanceTo(other: EntityType): number
    -- Calculate distance to another entity
    -- YOUR CODE HERE
    -- Hint: math.sqrt((self.x - other.x)^2 + (self.y - other.y)^2)
end

-- Bonus: Add __tostring for debugging
Entity.__tostring = function(e: EntityType): string
    local status = if e.health > 0 then "alive" else "dead"
    return `Entity#{e.id} "{e.name}" at ({e.x},{e.y}) HP:{e.health}/{e.maxHealth} [{status}]`
end

-- Test your implementation
export type EntityDemo = {}

function init(self: EntityDemo): boolean
    local player = Entity.new("Player", 0, 0, 100)
    local enemy = Entity.new("Goblin", 50, 50, 30)

    print(player)
    print(enemy)

    print(`\nDistance: {player:distanceTo(enemy):.2f}`)

    player:moveBy(10, 10)
    print(`\nAfter move: {player}`)

    enemy:takeDamage(15)
    print(`\nAfter damage: {enemy}`)

    enemy:takeDamage(20)  -- Fatal!
    print(`After fatal: {enemy}`)
    print(`Is alive? {enemy:isAlive()}`)

    return true
end

return function(): Node<EntityDemo>
    return { init = init }
end
```

---

## Exercise 4: Class with Rive Integration ⭐⭐

**Context**: Classes can work with Rive's drawing system.

**Task**: Create a drawable Sprite class:

```lua
--!strict

local Sprite = {}
Sprite.__index = Sprite

export type SpriteType = {
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color,
    path: Path,
    paint: Paint,
}

function Sprite.new(x: number, y: number, width: number, height: number, color: Color): SpriteType
    local self = setmetatable({}, Sprite)

    self.x = x
    self.y = y
    self.width = width
    self.height = height
    self.color = color

    -- Create graphics objects
    self.path = Path.new()
    self.paint = Paint.new()
    self.paint.style = "fill"
    self.paint.color = color

    -- Build the path (centered on origin)
    self:_rebuildPath()

    return (self :: any) :: SpriteType
end

-- Private method (by convention, prefix with _)
function Sprite:_rebuildPath()
    local hw = self.width / 2
    local hh = self.height / 2

    self.path:reset()
    self.path:moveTo(Vector.xy(-hw, -hh))
    self.path:lineTo(Vector.xy(hw, -hh))
    self.path:lineTo(Vector.xy(hw, hh))
    self.path:lineTo(Vector.xy(-hw, hh))
    self.path:close()
end

function Sprite:setSize(width: number, height: number)
    self.width = width
    self.height = height
    self:_rebuildPath()
end

function Sprite:setColor(color: Color)
    self.color = color
    self.paint.color = color
end

function Sprite:draw(renderer: Renderer)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(self.x, self.y))
    renderer:drawPath(self.path, self.paint)
    renderer:restore()
end

-- Node script that uses Sprites
export type SpriteDemo = {
    sprites: {SpriteType},
}

function init(self: SpriteDemo): boolean
    self.sprites = {}

    -- Create some sprites
    table.insert(self.sprites, Sprite.new(100, 100, 50, 50, Color.rgb(255, 0, 0)))
    table.insert(self.sprites, Sprite.new(200, 100, 30, 60, Color.rgb(0, 255, 0)))
    table.insert(self.sprites, Sprite.new(300, 100, 40, 40, Color.rgb(0, 0, 255)))

    return true
end

function advance(self: SpriteDemo, seconds: number): boolean
    -- Animate the sprites
    for i, sprite in self.sprites do
        sprite.x += math.sin(os.clock() + i) * 50 * seconds
        sprite.y += math.cos(os.clock() + i) * 30 * seconds
    end
    return true
end

function draw(self: SpriteDemo, renderer: Renderer)
    for _, sprite in self.sprites do
        sprite:draw(renderer)
    end
end

return function(): Node<SpriteDemo>
    return {
        init = init,
        advance = advance,
        draw = draw,
        sprites = late(),
    }
end
```

---

## Exercise 5: Factory Functions vs. Constructors ⭐⭐⭐

**Context**: Sometimes you want different ways to create objects of the same class.

**Task**: Implement multiple factory functions:

```lua
--!strict

local Rectangle = {}
Rectangle.__index = Rectangle

export type RectangleType = {
    x: number,
    y: number,
    width: number,
    height: number,
}

-- Standard constructor
function Rectangle.new(x: number, y: number, width: number, height: number): RectangleType
    local self = setmetatable({}, Rectangle)
    self.x = x
    self.y = y
    self.width = width
    self.height = height
    return (self :: any) :: RectangleType
end

-- YOUR TASK: Implement these alternative constructors

-- Create from two corner points
function Rectangle.fromCorners(x1: number, y1: number, x2: number, y2: number): RectangleType
    -- YOUR CODE HERE
    -- Calculate x, y, width, height from the two corners
end

-- Create centered at a point
function Rectangle.centered(centerX: number, centerY: number, width: number, height: number): RectangleType
    -- YOUR CODE HERE
    -- x should be centerX - width/2, etc.
end

-- Create a square (equal width and height)
function Rectangle.square(x: number, y: number, size: number): RectangleType
    -- YOUR CODE HERE
end

-- Methods
function Rectangle:area(): number
    return self.width * self.height
end

function Rectangle:contains(px: number, py: number): boolean
    return px >= self.x and px <= self.x + self.width
       and py >= self.y and py <= self.y + self.height
end

function Rectangle:intersects(other: RectangleType): boolean
    return self.x < other.x + other.width
       and self.x + self.width > other.x
       and self.y < other.y + other.height
       and self.y + self.height > other.y
end

Rectangle.__tostring = function(r: RectangleType): string
    return `Rect({r.x}, {r.y}, {r.width}x{r.height})`
end

-- Test
export type RectDemo = {}

function init(self: RectDemo): boolean
    local r1 = Rectangle.new(0, 0, 100, 50)
    local r2 = Rectangle.fromCorners(10, 10, 60, 40)
    local r3 = Rectangle.centered(150, 150, 40, 40)
    local r4 = Rectangle.square(200, 200, 30)

    print(r1)
    print(r2)
    print(r3)
    print(r4)

    print(`\nr1 area: {r1:area()}`)
    print(`r1 contains (50, 25)? {r1:contains(50, 25)}`)
    print(`r1 intersects r2? {r1:intersects(r2)}`)

    return true
end

return function(): Node<RectDemo>
    return { init = init }
end
```

---

## Comprehension Check

1. **Why do we need `MyClass.__index = MyClass`?**

2. **What does the double cast `(self :: any) :: Type` accomplish?**

3. **Why are methods defined on the class table, not in the type definition?**

4. **When should you use a factory function instead of `new()`?**

---

## Self-Assessment Checklist

- [ ] I can create a class with `__index` self-reference
- [ ] I can define a proper instance type
- [ ] I understand and can use the double-cast pattern
- [ ] I can implement methods using colon syntax
- [ ] I can integrate classes with Rive's drawing system
- [ ] I can create multiple factory functions for different construction patterns

---

## Common Mistakes

1. **Forgetting `__index`**: Methods won't be found without it
2. **Methods in the type**: Only data properties go in the type definition
3. **Using dot instead of colon**: `obj.method()` won't pass `self`
4. **Missing double cast**: Strict mode will error on the return statement

---

## Next Lesson
**Lesson 3.3: Inheritance & Patterns** - Extend classes and implement design patterns
