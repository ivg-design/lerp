---
name: rive-api
description: Quick reference for Rive Luau scripting API - ViewModel, Path, Paint, Renderer, and more
user-invocable: true
---

# /rive-api

Quick reference for Rive Luau scripting API.

## Usage

```
/rive-api                      # Show all available APIs
/rive-api viewmodel            # ViewModel methods
/rive-api path                 # Path commands
/rive-api paint                # Paint styles
/rive-api color                # Color constructors
/rive-api vector               # Vector operations
/rive-api renderer             # Renderer methods
/rive-api context              # Context methods
/rive-api input                # Input<T> usage
/rive-api lifecycle            # Lifecycle functions
```

## API Reference

### Context (VERIFIED)

Only 2 methods exist:

```lua
context:viewModel()        -- Returns ViewModel or nil
context:markNeedsUpdate()  -- Force redraw
```

**Does NOT exist:**
- `context:addEventListener()` ❌

---

### ViewModel (VERIFIED)

#### Getting Properties
```lua
local vm = context:viewModel()

vm:getNumber("name")      -- Property<number>?
vm:getString("name")      -- Property<string>?
vm:getBoolean("name")     -- Property<boolean>?
vm:getColor("name")       -- Property<Color>?
vm:getTrigger("name")     -- PropertyTrigger?
vm:getEnum("name")        -- PropertyEnum?
vm:getList("name")        -- PropertyList?
vm:getViewModel("name")   -- PropertyViewModel?
vm:instance()             -- Raw ViewModel instance (no methods)
```

**Does NOT exist:**
- `vm:setNumber()` ❌
- `vm:property()` ❌
- `vm:getImage()` ❌
- `vm:getArtboard()` ❌
- `vm:getIndex()` ❌

#### Property<T> Usage
```lua
local prop = vm:getNumber("value")
if prop then
    local value = prop.value      -- Read
    prop.value = 100              -- Write
    prop:addListener(function()   -- Listen
        print("Changed!")
    end)
end
```

#### PropertyViewModel (Nested)
```lua
local nestedProp = vm:getViewModel("child")
if nestedProp then
    local nestedVM = nestedProp.value  -- Use .value, NOT :instance()!
    local innerProp = nestedVM:getNumber("innerValue")
end
```

#### PropertyTrigger
```lua
local trigger = vm:getTrigger("onAction")
if trigger then
    trigger:addListener(function()
        print("Triggered!")
    end)
    trigger:fire()  -- Fire from script
end
```

---

### Input<T> (VERIFIED)

Inputs are READ-ONLY and accessed DIRECTLY (no .value):

```lua
export type MyNode = {
    speed: Input<number>,
    name: Input<string>,
    enabled: Input<boolean>,
    tint: Input<Color>,
}

function init(self: MyNode, context: Context): boolean
    local speed = self.speed     -- Direct access!
    -- NOT self.speed.value ❌
    return true
end

function update(self: MyNode)    -- NO context parameter!
    -- Called when any input changes
    print("Speed is now:", self.speed)
end
```

---

### Path

```lua
local path = Path.new()

-- Commands
path:moveTo(Vector.xy(x, y))
path:lineTo(Vector.xy(x, y))
path:cubicTo(cp1, cp2, end)    -- Cubic bezier
path:quadTo(cp, end)           -- Quadratic bezier
path:close()                   -- Close path
path:reset()                   -- Clear all commands

-- Does NOT exist:
-- path:clone() ❌
```

---

### Paint

```lua
-- Fill
local fill = Paint.with({
    style = "fill",
    color = Color.rgb(255, 0, 0)
})

-- Stroke
local stroke = Paint.with({
    style = "stroke",
    color = Color.rgb(0, 0, 255),
    thickness = 2
})
```

---

### Color

```lua
Color.rgb(r, g, b)             -- 0-255 values
Color.rgba(r, g, b, a)         -- With alpha
Color.hex(0xFF0000)            -- Hex value
Color.hsl(h, s, l)             -- HSL
Color.hsla(h, s, l, a)         -- HSL with alpha

-- Color components
Color.red(color)               -- Get red (0-255)
Color.green(color)             -- Get green
Color.blue(color)              -- Get blue
Color.alpha(color)             -- Get alpha
```

---

### Vector

```lua
Vector.xy(x, y)                -- Create vector
Vector.zero()                  -- (0, 0)

-- Access
local x = vec.x
local y = vec.y

-- Operations
local sum = v1 + v2
local diff = v1 - v2
local scaled = v1 * 2
local length = vec:magnitude()
local normalized = vec:normalize()
```

---

### Mat2D (Transforms)

```lua
Mat2D.identity()               -- Identity matrix
Mat2D.fromTranslation(x, y)    -- Translation
Mat2D.fromRotation(radians)    -- Rotation
Mat2D.fromScale(sx, sy)        -- Scale

-- Combine
local combined = mat1 * mat2

-- Transform point
local transformed = mat:transformPoint(Vector.xy(x, y))
```

---

### Renderer

```lua
function draw(self: MyNode, renderer: Renderer)
    renderer:drawPath(path, paint)

    renderer:save()            -- Save state
    renderer:transform(mat)    -- Apply transform
    renderer:restore()         -- Restore state

    renderer:clipPath(path)    -- Set clip region
end
```

---

### Lifecycle Functions

```lua
-- Required signature - returns boolean
function init(self: T, context: Context): boolean
    -- Setup, create objects
    return true  -- true = continue, false = stop
end

-- NO context parameter!
function update(self: T)
    -- Called when inputs change
end

-- Returns boolean
function advance(self: T, seconds: number): boolean
    -- Called every frame
    -- seconds = time since last frame
    return true  -- true = keep running
end

-- Required for Node scripts
function draw(self: T, renderer: Renderer)
    -- Render paths
end
```

---

### Factory Return

```lua
return function(): Node<MyNode>
    return {
        -- Input defaults
        speed = 50,
        name = "default",
        enabled = true,
        color = Color.rgb(255, 0, 0),

        -- Runtime properties (created in init)
        path = nil,
        paint = nil,

        -- Lifecycle functions
        init = init,
        update = update,
        advance = advance,
        draw = draw,
    }
end
```

## Online Documentation

For the latest API details, fetch from:
- https://rive.app/docs/scripting/
- https://rive.app/docs/scripting/script-inputs
- https://rive.app/docs/scripting/debugging/debug-panel
