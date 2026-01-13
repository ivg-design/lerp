# Lesson 4.4: Util Scripts & Modules

## Learning Objectives
- Create reusable Util scripts
- Export types for use in other scripts
- Use `require()` to import modules
- Build utility libraries for math, colors, and more
- Share state across scripts with singletons

---

## What Are Util Scripts?

Util (Utility) scripts are different from Node scripts:

| Aspect | Node Scripts | Util Scripts |
|--------|--------------|--------------|
| Attached to | Scene nodes | Nothing |
| Has lifecycle | Yes (init, advance, draw) | No |
| Returns | Factory function | Module table |
| Purpose | Logic and rendering | Reusable code |

Util scripts are **libraries** - collections of functions, types, and shared state.

---

## Quick Concept Review

```lua
-- Util script structure
--!strict

local MyModule = {}

-- Export types for other scripts
export type MyType = { ... }

-- Public functions
function MyModule.myFunction()
    return "hello"
end

-- Private functions (local, not attached to module)
local function helper()
    return "internal"
end

-- Return the module table
return MyModule
```

Usage in a Node script:
```lua
local MyModule = require("utils/MyModule")
local result = MyModule.myFunction()
```

---

## Exercise 1: Your First Util Script ⭐

**Task**: Create a MathUtils module:

**File: utils/MathUtils.luau**
```lua
--!strict

local MathUtils = {}

-- Clamp a value to a range
function MathUtils.clamp(value: number, min: number, max: number): number
    return math.max(min, math.min(max, value))
end

-- Linear interpolation
function MathUtils.lerp(a: number, b: number, t: number): number
    return a + (b - a) * t
end

-- Inverse lerp (what t gives this value?)
function MathUtils.inverseLerp(a: number, b: number, value: number): number
    if a == b then return 0 end
    return (value - a) / (b - a)
end

-- Remap a value from one range to another
function MathUtils.remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number
    local t = MathUtils.inverseLerp(inMin, inMax, value)
    return MathUtils.lerp(outMin, outMax, t)
end

-- Smooth interpolation (ease in/out)
function MathUtils.smoothstep(a: number, b: number, t: number): number
    t = MathUtils.clamp(t, 0, 1)
    t = t * t * (3 - 2 * t)  -- Smooth curve
    return MathUtils.lerp(a, b, t)
end

-- Distance between two points
function MathUtils.distance(x1: number, y1: number, x2: number, y2: number): number
    local dx = x2 - x1
    local dy = y2 - y1
    return math.sqrt(dx * dx + dy * dy)
end

-- Angle from point 1 to point 2
function MathUtils.angleTo(x1: number, y1: number, x2: number, y2: number): number
    return math.atan2(y2 - y1, x2 - x1)
end

-- Degrees to radians
function MathUtils.degToRad(degrees: number): number
    return degrees * math.pi / 180
end

-- Radians to degrees
function MathUtils.radToDeg(radians: number): number
    return radians * 180 / math.pi
end

return MathUtils
```

**Using it in a Node script:**
```lua
--!strict

local MathUtils = require("utils/MathUtils")

export type MathDemo = {
    position: number,
    target: number,
}

function init(self: MathDemo): boolean
    self.position = 0
    self.target = 100

    -- Test the module
    print(`Clamp 150 to [0,100]: {MathUtils.clamp(150, 0, 100)}`)
    print(`Lerp 0 to 100 at 0.5: {MathUtils.lerp(0, 100, 0.5)}`)
    print(`Remap 5 from [0,10] to [0,100]: {MathUtils.remap(5, 0, 10, 0, 100)}`)

    return true
end

function advance(self: MathDemo, seconds: number): boolean
    -- Smooth movement to target
    self.position = MathUtils.smoothstep(self.position, self.target, seconds * 2)
    return true
end

return function(): Node<MathDemo>
    return {
        init = init,
        advance = advance,
        position = late(),
        target = late(),
    }
end
```

---

## Exercise 2: Exporting Types ⭐⭐

**Task**: Create a module with exported types:

**File: utils/GameTypes.luau**
```lua
--!strict

local GameTypes = {}

-- Export types that other scripts can use
export type Vector2 = {
    x: number,
    y: number,
}

export type Rectangle = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export type Entity = {
    id: number,
    name: string,
    position: Vector2,
    active: boolean,
}

-- Factory functions for creating typed objects
function GameTypes.createVector(x: number, y: number): Vector2
    return { x = x, y = y }
end

function GameTypes.createRectangle(x: number, y: number, w: number, h: number): Rectangle
    return { x = x, y = y, width = w, height = h }
end

-- Helper functions that work with these types
function GameTypes.vectorLength(v: Vector2): number
    return math.sqrt(v.x * v.x + v.y * v.y)
end

function GameTypes.vectorNormalize(v: Vector2): Vector2
    local len = GameTypes.vectorLength(v)
    if len == 0 then return { x = 0, y = 0 } end
    return { x = v.x / len, y = v.y / len }
end

function GameTypes.rectContains(rect: Rectangle, point: Vector2): boolean
    return point.x >= rect.x and point.x <= rect.x + rect.width
       and point.y >= rect.y and point.y <= rect.y + rect.height
end

function GameTypes.rectIntersects(a: Rectangle, b: Rectangle): boolean
    return a.x < b.x + b.width and a.x + a.width > b.x
       and a.y < b.y + b.height and a.y + a.height > b.y
end

return GameTypes
```

**Using exported types:**
```lua
--!strict

local GT = require("utils/GameTypes")

export type TypesDemo = {
    playerPos: GT.Vector2,
    playerBounds: GT.Rectangle,
}

function init(self: TypesDemo): boolean
    -- Use the exported types
    self.playerPos = GT.createVector(100, 100)
    self.playerBounds = GT.createRectangle(90, 90, 20, 30)

    -- Use helper functions
    local testPoint: GT.Vector2 = { x = 95, y = 100 }
    print(`Contains point? {GT.rectContains(self.playerBounds, testPoint)}`)

    return true
end

return function(): Node<TypesDemo>
    return {
        init = init,
        playerPos = late(),
        playerBounds = late(),
    }
end
```

---

## Exercise 3: Singleton State Manager ⭐⭐

**Task**: Create a shared state manager:

**File: utils/GameState.luau**
```lua
--!strict

local GameState = {}

-- Private state (module-level variables persist across requires)
local state = {
    score: number,
    level: number,
    lives: number,
    isPaused: boolean,
    playerName: string,
}

-- Initialize state
state.score = 0
state.level = 1
state.lives = 3
state.isPaused = false
state.playerName = "Player"

-- Getters
function GameState.getScore(): number
    return state.score
end

function GameState.getLevel(): number
    return state.level
end

function GameState.getLives(): number
    return state.lives
end

function GameState.isPaused(): boolean
    return state.isPaused
end

-- Setters / Actions
function GameState.addScore(points: number)
    state.score += points
    print(`Score: {state.score}`)
end

function GameState.nextLevel()
    state.level += 1
    print(`Level {state.level}!`)
end

function GameState.loseLife()
    state.lives -= 1
    print(`Lives: {state.lives}`)
    if state.lives <= 0 then
        print("Game Over!")
    end
end

function GameState.togglePause()
    state.isPaused = not state.isPaused
    print(if state.isPaused then "PAUSED" else "RESUMED")
end

function GameState.reset()
    state.score = 0
    state.level = 1
    state.lives = 3
    state.isPaused = false
    print("Game Reset!")
end

return GameState
```

**Using from multiple scripts:**
```lua
-- Script A: Player script
local GameState = require("utils/GameState")

function onEnemyKilled()
    GameState.addScore(100)
end

-- Script B: UI script (same file, different instance)
local GameState = require("utils/GameState")

function updateDisplay()
    local score = GameState.getScore()  -- Same state!
    -- Update UI...
end
```

---

## Exercise 4: Color Utilities ⭐⭐

**Task**: Create a color helper module:

**File: utils/ColorUtils.luau**
```lua
--!strict

local ColorUtils = {}

-- Predefined colors
ColorUtils.RED = Color.rgba(255, 0, 0, 255)
ColorUtils.GREEN = Color.rgba(0, 255, 0, 255)
ColorUtils.BLUE = Color.rgba(0, 0, 255, 255)
ColorUtils.WHITE = Color.rgba(255, 255, 255, 255)
ColorUtils.BLACK = Color.rgba(0, 0, 0, 255)
ColorUtils.TRANSPARENT = Color.rgba(0, 0, 0, 0)

-- Create color from HSV (hue 0-360, saturation 0-1, value 0-1)
function ColorUtils.fromHSV(h: number, s: number, v: number, a: number?): Color
    local alpha = a or 255

    h = h % 360
    local c = v * s
    local x = c * (1 - math.abs((h / 60) % 2 - 1))
    local m = v - c

    local r, g, b = 0, 0, 0

    if h < 60 then
        r, g, b = c, x, 0
    elseif h < 120 then
        r, g, b = x, c, 0
    elseif h < 180 then
        r, g, b = 0, c, x
    elseif h < 240 then
        r, g, b = 0, x, c
    elseif h < 300 then
        r, g, b = x, 0, c
    else
        r, g, b = c, 0, x
    end

    return Color.rgba(
        math.floor((r + m) * 255),
        math.floor((g + m) * 255),
        math.floor((b + m) * 255),
        alpha
    )
end

-- Lighten a color
function ColorUtils.lighten(color: Color, amount: number): Color
    local factor = 1 + amount
    return Color.rgba(
        math.min(255, math.floor(Color.red(color) * factor)),
        math.min(255, math.floor(Color.green(color) * factor)),
        math.min(255, math.floor(Color.blue(color) * factor)),
        Color.alpha(color)
    )
end

-- Darken a color
function ColorUtils.darken(color: Color, amount: number): Color
    local factor = 1 - amount
    return Color.rgba(
        math.floor(Color.red(color) * factor),
        math.floor(Color.green(color) * factor),
        math.floor(Color.blue(color) * factor),
        Color.alpha(color)
    )
end

-- Set alpha on existing color
function ColorUtils.withAlpha(color: Color, alpha: number): Color
    return Color.rgba(Color.red(color), Color.green(color), Color.blue(color), alpha)
end

-- Rainbow color based on position (0-1)
function ColorUtils.rainbow(t: number): Color
    return ColorUtils.fromHSV(t * 360, 1, 1, 255)
end

return ColorUtils
```

---

## Exercise 5: Class Library ⭐⭐⭐

**Task**: Create a reusable class in a Util script:

**File: utils/Timer.luau**
```lua
--!strict

local Timer = {}
Timer.__index = Timer

export type TimerType = {
    duration: number,
    elapsed: number,
    isRunning: boolean,
    loops: boolean,
    onComplete: (() -> ())?,
}

function Timer.new(duration: number, onComplete: (() -> ())?): TimerType
    local self = setmetatable({}, Timer)
    self.duration = duration
    self.elapsed = 0
    self.isRunning = false
    self.loops = false
    self.onComplete = onComplete
    return (self :: any) :: TimerType
end

function Timer:start()
    self.isRunning = true
    self.elapsed = 0
end

function Timer:stop()
    self.isRunning = false
end

function Timer:reset()
    self.elapsed = 0
end

function Timer:setLooping(loops: boolean)
    self.loops = loops
end

function Timer:update(seconds: number): boolean
    if not self.isRunning then
        return false
    end

    self.elapsed += seconds

    if self.elapsed >= self.duration then
        if self.onComplete then
            self.onComplete()
        end

        if self.loops then
            self.elapsed = self.elapsed % self.duration
            return true
        else
            self.isRunning = false
            return true  -- Just completed
        end
    end

    return false  -- Still running
end

function Timer:getProgress(): number
    if self.duration == 0 then return 1 end
    return math.min(1, self.elapsed / self.duration)
end

function Timer:getRemainingTime(): number
    return math.max(0, self.duration - self.elapsed)
end

return Timer
```

**Using the Timer:**
```lua
--!strict

local Timer = require("utils/Timer")

export type TimerDemo = {
    spawnTimer: Timer.TimerType,
    countdownTimer: Timer.TimerType,
    spawnCount: number,
}

function init(self: TimerDemo): boolean
    self.spawnCount = 0

    -- Create a looping spawn timer
    self.spawnTimer = Timer.new(2, function()
        self.spawnCount += 1
        print(`Spawned enemy #{self.spawnCount}`)
    end)
    self.spawnTimer:setLooping(true)
    self.spawnTimer:start()

    -- Create a countdown timer
    self.countdownTimer = Timer.new(10, function()
        print("Time's up!")
    end)
    self.countdownTimer:start()

    return true
end

function advance(self: TimerDemo, seconds: number): boolean
    self.spawnTimer:update(seconds)
    self.countdownTimer:update(seconds)

    -- Show countdown
    local remaining = self.countdownTimer:getRemainingTime()
    if remaining > 0 and math.floor(remaining) ~= math.floor(remaining + seconds) then
        print(`Countdown: {math.ceil(remaining)}`)
    end

    return true
end

return function(): Node<TimerDemo>
    return {
        init = init,
        advance = advance,
        spawnTimer = late(),
        countdownTimer = late(),
        spawnCount = late(),
    }
end
```

---

## Comprehension Check

1. **What does `require()` return?**

2. **Are Util scripts executed every time they're required?**

3. **How do you export a type from a Util script?**

4. **Why can Util scripts hold shared state (like Singletons)?**

---

## Self-Assessment Checklist

- [ ] I can create a Util script with functions
- [ ] I can export types with `export type`
- [ ] I can use `require()` to import modules
- [ ] I understand module caching (singletons)
- [ ] I can create class-like structures in Util scripts

---

## Common Mistakes

1. **Forgetting `return ModuleName`**: Module won't work without returning the table
2. **Expecting fresh state each require**: Module code runs once, state persists
3. **Circular dependencies**: Script A requires B which requires A - causes issues
4. **Wrong path in require**: Must match file location exactly

---

## Next Module
**Module 5: Drawing API** - Master paths, paints, and rendering
