# Lesson 3.3: Inheritance & Patterns

## Learning Objectives
- Implement inheritance between classes
- Use intersection types for typed inheritance
- Apply common design patterns (Singleton, Factory, Observer)
- Build a complete class hierarchy for game objects

---

## Inheritance in Luau

Since Luau uses prototype-based OOP, inheritance means linking one prototype to another. When a method isn't found on the child, it looks in the parent.

**Key concept**: Inheritance creates a chain of `__index` lookups.

```
Child instance → Child prototype → Parent prototype
```

---

## Quick Concept Review

```lua
-- Parent class
local Animal = {}
Animal.__index = Animal

function Animal.new(name)
    return setmetatable({ name = name }, Animal)
end

function Animal:speak()
    print("...")
end

-- Child class inherits from Parent
local Dog = {}
Dog.__index = Dog
setmetatable(Dog, { __index = Animal })  -- Dog looks in Animal for missing keys

function Dog.new(name, breed)
    local self = Animal.new(name)  -- Create base instance
    self.breed = breed
    return setmetatable(self, Dog)  -- Re-attach to Dog's metatable
end

function Dog:speak()  -- Override parent method
    print("Woof!")
end
```

---

## Exercise 1: Basic Inheritance ⭐

**Task**: Create a class hierarchy:

```lua
--!strict

-- Base class: Shape
local Shape = {}
Shape.__index = Shape

type ShapeBase = {
    x: number,
    y: number,
    color: Color,
}

function Shape.new(x: number, y: number, color: Color): ShapeBase
    local self = setmetatable({}, Shape)
    self.x = x
    self.y = y
    self.color = color
    return (self :: any) :: ShapeBase
end

function Shape:moveTo(newX: number, newY: number)
    self.x = newX
    self.y = newY
end

function Shape:describe()
    print(`Shape at ({self.x}, {self.y})`)
end

-- Derived class: Circle
local Circle = {}
Circle.__index = Circle
setmetatable(Circle, { __index = Shape })  -- Inherit from Shape

-- Extend the base type with circle-specific properties
type CircleType = ShapeBase & {
    radius: number,
}

function Circle.new(x: number, y: number, radius: number, color: Color): CircleType
    -- Start with a Shape
    local base = Shape.new(x, y, color)
    -- Add Circle-specific properties
    base.radius = radius
    -- Re-assign metatable to Circle
    return setmetatable(base, Circle) :: any :: CircleType
end

-- Override describe
function Circle:describe()
    print(`Circle at ({self.x}, {self.y}) with radius {self.radius}`)
end

-- Circle-specific method
function Circle:area(): number
    return math.pi * self.radius * self.radius
end

-- YOUR TASK: Create a Rectangle class that inherits from Shape
local Rectangle = {}
Rectangle.__index = Rectangle
setmetatable(Rectangle, { __index = Shape })

type RectangleType = ShapeBase & {
    width: number,
    height: number,
}

function Rectangle.new(x: number, y: number, width: number, height: number, color: Color): RectangleType
    -- YOUR CODE HERE
end

function Rectangle:describe()
    -- YOUR CODE HERE (override)
end

function Rectangle:area(): number
    -- YOUR CODE HERE
end

-- Test
export type InheritanceDemo = {}

function init(self: InheritanceDemo): boolean
    local circle = Circle.new(100, 100, 25, Color.rgb(255, 0, 0))
    local rect = Rectangle.new(200, 100, 50, 30, Color.rgb(0, 255, 0))

    circle:describe()
    rect:describe()

    print(`Circle area: {circle:area():.2f}`)
    print(`Rectangle area: {rect:area()}`)

    -- Both inherit moveTo from Shape
    circle:moveTo(150, 150)
    rect:moveTo(250, 150)

    circle:describe()
    rect:describe()

    return true
end

return function(): Node<InheritanceDemo>
    return { init = init }
end
```

---

## Exercise 2: Calling Parent Methods ⭐⭐

**Context**: Sometimes you want to extend a parent method rather than completely replace it.

**Task**: Call parent methods from child methods:

```lua
--!strict

local Enemy = {}
Enemy.__index = Enemy

type EnemyBase = {
    name: string,
    health: number,
    damage: number,
}

function Enemy.new(name: string, health: number, damage: number): EnemyBase
    local self = setmetatable({}, Enemy)
    self.name = name
    self.health = health
    self.damage = damage
    return (self :: any) :: EnemyBase
end

function Enemy:attack()
    print(`{self.name} attacks for {self.damage} damage!`)
end

function Enemy:describe()
    print(`{self.name}: {self.health} HP, {self.damage} DMG`)
end

-- Boss extends Enemy with special abilities
local Boss = {}
Boss.__index = Boss
setmetatable(Boss, { __index = Enemy })

type BossType = EnemyBase & {
    phase: number,
    specialAttackName: string,
}

function Boss.new(name: string, health: number, damage: number, specialAttackName: string): BossType
    local base = Enemy.new(name, health, damage)
    base.phase = 1
    base.specialAttackName = specialAttackName
    return setmetatable(base, Boss) :: any :: BossType
end

-- Override attack but also call parent's attack
function Boss:attack()
    -- Call the parent's attack method
    Enemy.attack(self)  -- Note: use dot notation and pass self explicitly

    -- Add boss-specific behavior
    if self.phase >= 2 then
        print(`{self.name} also uses {self.specialAttackName}!`)
    end
end

-- Override describe to add boss info
function Boss:describe()
    Enemy.describe(self)  -- Call parent
    print(`  Phase: {self.phase}, Special: {self.specialAttackName}`)
end

function Boss:nextPhase()
    self.phase += 1
    self.damage += 10
    print(`{self.name} enters phase {self.phase}!`)
end

export type BossDemo = {}

function init(self: BossDemo): boolean
    local boss = Boss.new("Dragon", 500, 25, "Fire Breath")

    boss:describe()

    print("\n--- Phase 1 Attack ---")
    boss:attack()

    boss:nextPhase()

    print("\n--- Phase 2 Attack ---")
    boss:attack()

    return true
end

return function(): Node<BossDemo>
    return { init = init }
end
```

**Key Pattern**: To call a parent method, use `ParentClass.methodName(self)` with dot notation.

---

## Exercise 3: The Singleton Pattern ⭐⭐

**Context**: A Singleton ensures only one instance exists. Useful for managers (GameManager, AudioManager).

**Task**: Implement a Singleton GameManager:

```lua
--!strict

local GameManager = {}
GameManager.__index = GameManager

type GameManagerType = {
    score: number,
    level: number,
    isPaused: boolean,
    playerName: string,
}

-- Private instance storage
local instance: GameManagerType? = nil

function GameManager.getInstance(): GameManagerType
    if instance == nil then
        local self = setmetatable({}, GameManager)
        self.score = 0
        self.level = 1
        self.isPaused = false
        self.playerName = "Player"
        instance = (self :: any) :: GameManagerType
    end
    return instance :: GameManagerType
end

-- Prevent direct construction
function GameManager.new()
    error("Use GameManager.getInstance() instead!")
end

-- Methods
function GameManager:addScore(points: number)
    self.score += points
    print(`Score: {self.score}`)
end

function GameManager:nextLevel()
    self.level += 1
    print(`Level up! Now on level {self.level}`)
end

function GameManager:togglePause()
    self.isPaused = not self.isPaused
    print(if self.isPaused then "Game Paused" else "Game Resumed")
end

function GameManager:reset()
    self.score = 0
    self.level = 1
    self.isPaused = false
    print("Game Reset!")
end

-- Test
export type SingletonDemo = {}

function init(self: SingletonDemo): boolean
    -- Get the singleton instance
    local game1 = GameManager.getInstance()
    local game2 = GameManager.getInstance()

    -- Verify they're the same instance
    print(`Same instance? {game1 == game2}`)  -- true

    game1:addScore(100)
    game2:addScore(50)  -- Same instance, so score is cumulative

    print(`Final score: {game1.score}`)  -- 150

    game1:nextLevel()
    game1:togglePause()
    game1:togglePause()

    return true
end

return function(): Node<SingletonDemo>
    return { init = init }
end
```

---

## Exercise 4: The Observer Pattern (Signals) ⭐⭐⭐

**Context**: The Observer pattern lets objects subscribe to events. Essential for decoupled systems.

**Task**: Build a Signal class:

```lua
--!strict

local Signal = {}
Signal.__index = Signal

type Connection = {
    callback: (...any) -> (),
    connected: boolean,
}

type SignalType = {
    _connections: {Connection},
}

function Signal.new(): SignalType
    local self = setmetatable({}, Signal)
    self._connections = {}
    return (self :: any) :: SignalType
end

function Signal:connect(callback: (...any) -> ()): Connection
    local connection: Connection = {
        callback = callback,
        connected = true,
    }
    table.insert(self._connections, connection)
    return connection
end

function Signal:disconnect(connection: Connection)
    connection.connected = false
    -- Remove from list
    for i = #self._connections, 1, -1 do
        if self._connections[i] == connection then
            table.remove(self._connections, i)
            break
        end
    end
end

function Signal:fire(...)
    for _, conn in self._connections do
        if conn.connected then
            conn.callback(...)
        end
    end
end

function Signal:disconnectAll()
    for _, conn in self._connections do
        conn.connected = false
    end
    self._connections = {}
end

-- Example usage: Game Events
local GameEvents = {
    onScoreChanged = Signal.new(),
    onPlayerDied = Signal.new(),
    onLevelComplete = Signal.new(),
}

-- Test
export type SignalDemo = {}

function init(self: SignalDemo): boolean
    -- Subscribe to events
    local scoreConn = GameEvents.onScoreChanged:connect(function(newScore: number)
        print(`[UI] Score updated to: {newScore}`)
    end)

    GameEvents.onScoreChanged:connect(function(newScore: number)
        print(`[Audio] Playing score sound for {newScore}`)
    end)

    GameEvents.onPlayerDied:connect(function()
        print("[UI] Showing death screen")
    end)

    GameEvents.onLevelComplete:connect(function(level: number)
        print(`[UI] Level {level} complete!`)
    end)

    -- Fire some events
    print("--- Firing events ---")
    GameEvents.onScoreChanged:fire(100)
    GameEvents.onScoreChanged:fire(250)
    GameEvents.onPlayerDied:fire()
    GameEvents.onLevelComplete:fire(1)

    -- Disconnect one listener
    print("\n--- After disconnecting first score listener ---")
    GameEvents.onScoreChanged:disconnect(scoreConn)
    GameEvents.onScoreChanged:fire(500)

    return true
end

return function(): Node<SignalDemo>
    return { init = init }
end
```

---

## Exercise 5: Complete Game Object Hierarchy ⭐⭐⭐

**Context**: Put it all together with a practical game object system.

**Task**: Build a drawable game object hierarchy:

```lua
--!strict

-- Import Signal from utils (in real code)
local Signal = {}
Signal.__index = Signal
type SignalType = { _connections: {any} }
function Signal.new(): SignalType
    return setmetatable({ _connections = {} }, Signal) :: any :: SignalType
end
function Signal:fire(...) end
function Signal:connect(cb: any) end

-- Base GameObject
local GameObject = {}
GameObject.__index = GameObject

type GameObjectBase = {
    id: number,
    x: number,
    y: number,
    active: boolean,
    onDestroy: SignalType,
}

local nextId = 1

function GameObject.new(x: number, y: number): GameObjectBase
    local self = setmetatable({}, GameObject)
    self.id = nextId
    nextId += 1
    self.x = x
    self.y = y
    self.active = true
    self.onDestroy = Signal.new()
    return (self :: any) :: GameObjectBase
end

function GameObject:update(seconds: number)
    -- Override in subclasses
end

function GameObject:draw(renderer: Renderer)
    -- Override in subclasses
end

function GameObject:destroy()
    self.active = false
    self.onDestroy:fire()
end

-- Character extends GameObject
local Character = {}
Character.__index = Character
setmetatable(Character, { __index = GameObject })

type CharacterType = GameObjectBase & {
    name: string,
    health: number,
    maxHealth: number,
    speed: number,
}

function Character.new(name: string, x: number, y: number, maxHealth: number): CharacterType
    local base = GameObject.new(x, y)
    base.name = name
    base.maxHealth = maxHealth
    base.health = maxHealth
    base.speed = 100
    return setmetatable(base, Character) :: any :: CharacterType
end

function Character:takeDamage(amount: number)
    self.health = math.max(0, self.health - amount)
    if self.health <= 0 then
        self:destroy()
    end
end

function Character:moveTo(targetX: number, targetY: number, seconds: number)
    local dx = targetX - self.x
    local dy = targetY - self.y
    local dist = math.sqrt(dx * dx + dy * dy)

    if dist > 0 then
        local moveAmount = math.min(self.speed * seconds, dist)
        self.x += (dx / dist) * moveAmount
        self.y += (dy / dist) * moveAmount
    end
end

-- Player extends Character
local Player = {}
Player.__index = Player
setmetatable(Player, { __index = Character })

type PlayerType = CharacterType & {
    score: number,
    inventory: {string},
}

function Player.new(name: string, x: number, y: number): PlayerType
    local base = Character.new(name, x, y, 100)
    base.score = 0
    base.inventory = {}
    return setmetatable(base, Player) :: any :: PlayerType
end

function Player:addItem(item: string)
    table.insert(self.inventory, item)
    print(`{self.name} picked up: {item}`)
end

function Player:addScore(points: number)
    self.score += points
    print(`Score: {self.score}`)
end

-- Enemy extends Character
local Enemy = {}
Enemy.__index = Enemy
setmetatable(Enemy, { __index = Character })

type EnemyType = CharacterType & {
    damage: number,
    targetX: number,
    targetY: number,
}

function Enemy.new(name: string, x: number, y: number, health: number, damage: number): EnemyType
    local base = Character.new(name, x, y, health)
    base.damage = damage
    base.speed = 50
    base.targetX = x
    base.targetY = y
    return setmetatable(base, Enemy) :: any :: EnemyType
end

function Enemy:setTarget(x: number, y: number)
    self.targetX = x
    self.targetY = y
end

function Enemy:update(seconds: number)
    self:moveTo(self.targetX, self.targetY, seconds)
end

-- Test
export type HierarchyDemo = {
    player: PlayerType,
    enemies: {EnemyType},
}

function init(self: HierarchyDemo): boolean
    self.player = Player.new("Hero", 100, 100)
    self.enemies = {
        Enemy.new("Goblin", 200, 100, 30, 5),
        Enemy.new("Orc", 300, 150, 50, 10),
    }

    self.player:addItem("Sword")
    self.player:addScore(50)

    print(`\nPlayer: {self.player.name} at ({self.player.x}, {self.player.y})`)

    for _, enemy in self.enemies do
        enemy:setTarget(self.player.x, self.player.y)
        print(`Enemy: {enemy.name} at ({enemy.x}, {enemy.y})`)
    end

    return true
end

function advance(self: HierarchyDemo, seconds: number): boolean
    -- Update enemies
    for _, enemy in self.enemies do
        enemy:update(seconds)
    end
    return true
end

return function(): Node<HierarchyDemo>
    return {
        init = init,
        advance = advance,
        player = late(),
        enemies = late(),
    }
end
```

---

## Comprehension Check

1. **How does Luau's prototype chain implement inheritance?**

2. **How do you call a parent's method from a child class?**

3. **What's the purpose of the Singleton pattern?**

4. **When would you use the Observer pattern?**

---

## Self-Assessment Checklist

- [ ] I can implement class inheritance with setmetatable
- [ ] I can use intersection types for typed inheritance
- [ ] I can call parent methods from child classes
- [ ] I can implement the Singleton pattern
- [ ] I can implement the Observer/Signal pattern
- [ ] I can build complete class hierarchies

---

## Common Mistakes

1. **Forgetting to link prototypes**: Both the instance AND class need metatable setup
2. **Wrong syntax for parent calls**: Use `Parent.method(self)` not `Parent:method()`
3. **Singleton returning new instances**: Check if instance exists first
4. **Memory leaks with signals**: Disconnect when objects are destroyed

---

## Next Module
**Module 4: Rive Integration** - Connect Luau to the Rive environment
