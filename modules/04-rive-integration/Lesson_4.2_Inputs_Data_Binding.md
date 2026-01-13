# Lesson 4.2: Inputs & Data Binding

## Learning Objectives
- Understand how Script Inputs work
- Expose inputs to the Rive Editor
- Use `Input<T>` for different data types
- Connect inputs to ViewModels
- React to input changes with listeners

---

## What Are Script Inputs?

Script Inputs are the bridge between your Luau code and the Rive Editor. They allow:

1. **Designer configuration**: Change values without editing code
2. **Data binding**: Connect to ViewModel properties
3. **Dynamic behavior**: React to changes at runtime

Think of inputs as "configurable dials" that appear in the Editor when you select a script node.

---

## Quick Concept Review

```lua
--!strict

type MyScript = {
    speed: Input<number>,         -- Number input
    playerName: Input<string>,    -- String input
    isActive: Input<boolean>,     -- Boolean input
    tintColor: Input<Color>,      -- Color picker
    character: Input<Data.Character>,  -- ViewModel
}

-- Accessing input values
local currentSpeed = self.speed.value
local name = self.playerName.value

-- Default values in factory
return function(): Node<MyScript>
    return {
        speed = 100,
        playerName = "Hero",
        isActive = true,
        tintColor = Color.rgb(255, 255, 255),
        character = late(),  -- Bound via Editor
    }
end
```

---

## Exercise 1: Basic Inputs ⭐

**Context**: Create a configurable script with different input types.

**Task**: Add inputs and observe them in the Editor:

```lua
--!strict

export type BasicInputs = {
    -- Numeric input for movement speed
    moveSpeed: Input<number>,
    -- Boolean to enable/disable
    enabled: Input<boolean>,
    -- String for display
    displayText: Input<string>,
    -- Color for visual
    baseColor: Input<Color>,

    -- Internal state
    position: number,
}

function init(self: BasicInputs): boolean
    self.position = 0
    print("=== Initial Input Values ===")
    print(`Move Speed: {self.moveSpeed.value}`)
    print(`Enabled: {self.enabled.value}`)
    print(`Display Text: {self.displayText.value}`)
    print(`Color R: {Color.red(self.baseColor.value)}`)
    return true
end

function advance(self: BasicInputs, seconds: number): boolean
    if self.enabled.value then
        self.position += self.moveSpeed.value * seconds
        -- Wrap position
        if self.position > 500 then
            self.position = 0
        end
    end
    return true
end

return function(): Node<BasicInputs>
    return {
        init = init,
        advance = advance,
        -- Default values shown in Editor
        moveSpeed = 100,           -- Shows as number field
        enabled = true,            -- Shows as checkbox
        displayText = "Hello!",    -- Shows as text field
        baseColor = Color.rgba(255, 100, 50, 255),  -- Shows as color picker
        position = late(),
    }
end
```

**After creating this script**:
1. Attach it to a Node in your Rive file
2. Select the Node
3. Look in the right sidebar - you should see the inputs!
4. Try changing values and see them reflected

---

## Exercise 2: Input vs. Direct Properties ⭐

**Context**: Understanding when to use `Input<T>` vs. plain properties.

**Task**: Compare the two approaches:

```lua
--!strict

export type InputComparison = {
    -- Input<number> - Exposed to Editor, read-only in script
    configSpeed: Input<number>,

    -- Plain number - Internal state, read/write in script
    currentPosition: number,

    -- Path and Paint - Internal, not exposed
    myPath: Path,
    myPaint: Paint,
}

function init(self: InputComparison): boolean
    self.currentPosition = 0
    self.myPath = Path.new()
    self.myPaint = Paint.new()

    print("=== Input vs Property ===")

    -- Input: Access with .value
    local speed = self.configSpeed.value
    print(`Config speed (Input): {speed}`)

    -- Direct property: Access directly
    local pos = self.currentPosition
    print(`Current position (Property): {pos}`)

    -- Can modify direct properties
    self.currentPosition = 100
    print(`After modification: {self.currentPosition}`)

    -- CANNOT modify inputs from script!
    -- self.configSpeed.value = 200  -- This won't work as expected

    return true
end

function advance(self: InputComparison, seconds: number): boolean
    -- Use input value (read)
    local speed = self.configSpeed.value

    -- Modify internal state (read/write)
    self.currentPosition += speed * seconds

    return true
end

return function(): Node<InputComparison>
    return {
        init = init,
        advance = advance,
        configSpeed = 50,           -- Input (exposed)
        currentPosition = late(),   -- Property (internal)
        myPath = late(),
        myPaint = late(),
    }
end
```

**Key Distinction**:
| Aspect | `Input<T>` | Plain Property |
|--------|------------|----------------|
| Visible in Editor | Yes | No |
| Modifiable by Script | No (read-only) | Yes |
| Data Bindable | Yes | No |
| Access Syntax | `.value` | Direct |

---

## Exercise 3: Reacting to Input Changes ⭐⭐

**Context**: The `update()` lifecycle function fires when any input changes.

**Task**: React to input changes:

```lua
--!strict

export type InputReactive = {
    width: Input<number>,
    height: Input<number>,
    fillColor: Input<Color>,

    rectPath: Path,
    rectPaint: Paint,
}

function init(self: InputReactive): boolean
    self.rectPath = Path.new()
    self.rectPaint = Paint.new()
    self.rectPaint.style = "fill"

    -- Build initial path
    rebuildPath(self)
    updatePaint(self)

    print("Initialized! Try changing inputs in the Editor.")
    return true
end

-- This is called AUTOMATICALLY when any input changes
function update(self: InputReactive)
    print("=== Input Changed! ===")
    print(`New size: {self.width.value} x {self.height.value}`)

    rebuildPath(self)
    updatePaint(self)
end

-- Helper functions
local function rebuildPath(self: InputReactive)
    local w = self.width.value
    local h = self.height.value

    self.rectPath:reset()
    self.rectPath:moveTo(Vector.xy(0, 0))
    self.rectPath:lineTo(Vector.xy(w, 0))
    self.rectPath:lineTo(Vector.xy(w, h))
    self.rectPath:lineTo(Vector.xy(0, h))
    self.rectPath:close()
end

local function updatePaint(self: InputReactive)
    self.rectPaint.color = self.fillColor.value
end

function draw(self: InputReactive, renderer: Renderer)
    renderer:drawPath(self.rectPath, self.rectPaint)
end

return function(): Node<InputReactive>
    return {
        init = init,
        update = update,
        draw = draw,
        width = 100,
        height = 50,
        fillColor = Color.rgba(100, 150, 255, 255),
        rectPath = late(),
        rectPaint = late(),
    }
end
```

---

## Exercise 4: Specific Input Listeners ⭐⭐

**Context**: Listen to specific inputs instead of reacting to any change.

**Task**: Add targeted listeners:

```lua
--!strict

export type SpecificListeners = {
    health: Input<number>,
    level: Input<number>,
    playerName: Input<string>,
}

-- Callback functions
local function onHealthChanged(newHealth: number)
    print(`Health changed to: {newHealth}`)
    if newHealth <= 20 then
        print("WARNING: Low health!")
    end
end

local function onLevelChanged(newLevel: number)
    print(`Level up! Now level {newLevel}`)
end

local function onNameChanged(newName: string)
    print(`Player renamed to: {newName}`)
end

function init(self: SpecificListeners): boolean
    -- Add listeners for specific inputs
    self.health:addListener(self.health.value, onHealthChanged)
    self.level:addListener(self.level.value, onLevelChanged)
    self.playerName:addListener(self.playerName.value, onNameChanged)

    print("Listeners attached! Change inputs to see callbacks.")
    return true
end

return function(): Node<SpecificListeners>
    return {
        init = init,
        health = 100,
        level = 1,
        playerName = "Hero",
    }
end
```

---

## Exercise 5: ViewModel Inputs ⭐⭐⭐

**Context**: Connecting scripts to ViewModels enables powerful data binding.

**Note**: This requires a ViewModel to be set up in your Rive file first.

**Task**: Bind to and interact with ViewModels:

```lua
--!strict

-- Assume we have a ViewModel named "PlayerStats" with:
-- - health: number
-- - score: number
-- - name: string

export type ViewModelDemo = {
    -- This input will be bound to a ViewModel in the Editor
    stats: Input<Data.PlayerStats>,

    -- Display elements
    displayPath: Path,
    displayPaint: Paint,
}

function init(self: ViewModelDemo): boolean
    self.displayPath = Path.new()
    self.displayPaint = Paint.new()
    self.displayPaint.style = "fill"

    -- Read initial ViewModel values
    print("=== Initial ViewModel State ===")
    print(`Name: {self.stats.name.value}`)
    print(`Health: {self.stats.health.value}`)
    print(`Score: {self.stats.score.value}`)

    -- Listen for changes
    self.stats.health:addListener(function(newHealth: number)
        print(`Health updated: {newHealth}`)
        updateHealthDisplay(self, newHealth)
    end)

    return true
end

local function updateHealthDisplay(self: ViewModelDemo, health: number)
    -- Change color based on health
    local r = math.floor(255 * (1 - health / 100))
    local g = math.floor(255 * (health / 100))
    self.displayPaint.color = Color.rgba(r, g, 0, 255)
end

-- ViewModel properties are writable!
local function damagePlayer(self: ViewModelDemo, amount: number)
    local currentHealth = self.stats.health.value
    self.stats.health.value = math.max(0, currentHealth - amount)
end

local function addScore(self: ViewModelDemo, points: number)
    self.stats.score.value += points
end

function advance(self: ViewModelDemo, seconds: number): boolean
    -- Example: Regenerate health slowly
    local health = self.stats.health.value
    if health < 100 then
        self.stats.health.value = math.min(100, health + 5 * seconds)
    end
    return true
end

return function(): Node<ViewModelDemo>
    return {
        init = init,
        advance = advance,
        stats = late(),  -- Bound via Editor to the ViewModel
        displayPath = late(),
        displayPaint = late(),
    }
end
```

**Key Difference**: ViewModel properties (accessed via `.value`) ARE writable, unlike regular inputs!

---

## Exercise 6: Context ViewModel Access ⭐⭐⭐

**Context**: Access the main artboard's ViewModel via `context`.

**Task**: Use context to access global state:

```lua
--!strict

export type ContextDemo = {}

-- The init function receives context as a second parameter
function init(self: ContextDemo, context: Context): boolean
    -- Get the main ViewModel
    local vm = context:viewModel()

    if vm then
        -- Read values
        local score = vm:getNumber("score")
        if score then
            print(`Current score: {score.value}`)
        end

        -- Get nested ViewModel
        local playerVM = vm:getViewModel("player")
        if playerVM then
            local name = playerVM:getString("name")
            if name then
                print(`Player name: {name.value}`)
            end
        end

        -- Listen for changes
        local health = vm:getNumber("health")
        if health then
            health:addListener(function(newVal: number)
                print(`Health changed: {newVal}`)
            end)
        end
    end

    return true
end

return function(): Node<ContextDemo>
    return {
        init = init,
    }
end
```

---

## Comprehension Check

1. **What's the difference between `Input<number>` and a regular `number` property?**

2. **When is the `update()` function called?**

3. **Can you modify `self.speed.value` where `speed: Input<number>`?**

4. **How do you write values back to a ViewModel?**

---

## Advanced Property Types

ViewModels can expose specialized property types beyond simple values:

### PropertyList

Dynamic arrays with list operations:

```lua
local vm = context:viewModel()
local itemList = vm:getList("items")

if itemList then
    -- Read length
    print(`Items: {itemList.length}`)

    -- Modify list
    itemList:push(newItem)      -- Add to end
    itemList:pop()              -- Remove from end
    itemList:shift()            -- Remove from start
    itemList:insert(2, item)    -- Insert at index
    itemList:swap(1, 3)         -- Swap positions
end
```

### PropertyEnum

Enumerated values with predefined options:

```lua
local difficulty = vm:getEnum("difficulty")

if difficulty then
    -- Get available values
    local options = difficulty:values()
    print(`Options available: {#options}`)

    -- Current value is accessed via .value
    print(`Current: {difficulty.value}`)
end
```

### PropertyTrigger

Fire events and listen for triggers:

```lua
local onDamage = vm:getTrigger("onDamage")

if onDamage then
    -- Listen for trigger events
    onDamage:addListener(function()
        print("Damage triggered!")
        playHitAnimation()
    end)

    -- Fire the trigger from code
    onDamage:fire()
end
```

---

## Self-Assessment Checklist

- [ ] I can create inputs that appear in the Rive Editor
- [ ] I understand the difference between inputs and properties
- [ ] I can react to input changes with `update()`
- [ ] I can add specific listeners to individual inputs
- [ ] I can bind to and modify ViewModel properties
- [ ] I understand when to use `late()` vs. default values
- [ ] I know how to use PropertyList, PropertyEnum, and PropertyTrigger

---

## Common Mistakes

1. **Forgetting `.value`**: `self.speed` is the Input wrapper, `self.speed.value` is the actual number
2. **Trying to write to inputs**: Regular inputs are read-only from scripts
3. **Missing `late()`**: ViewModel inputs need `late()` since they're bound via Editor
4. **Not handling nil**: ViewModel lookups might return nil

---

## Next Lesson
**Lesson 4.3: The Lifecycle (init/advance/draw)** - Master the Node protocol timing
