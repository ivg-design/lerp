# Missing Script Protocols Research Report

**Research Date:** 2026-01-14
**Researcher:** Claude Opus 4.5
**Purpose:** Document the 4 missing Rive script protocols for LERP curriculum

---

## Executive Summary

Rive supports **7 script types**. LERP currently documents 3 (Node, Util, Listener). This report provides comprehensive documentation of the 4 missing protocols:

| Protocol | Purpose | Complexity |
|----------|---------|------------|
| **Layout Script** | Programmatic control over Layout components | Medium |
| **Converter Script** | Bidirectional data transformation for bindings | Medium |
| **Test Script** | Unit testing for Util Scripts | Low |
| **Path Effect Script** | Real-time path geometry manipulation | High |

---

# 1. Layout Script Protocol

## Overview

Layout Scripts extend Node Scripts to give programmatic control over **Layout components**. They enable custom layout behaviors like masonry grids, carousels, and dynamic spacing logic.

## When to Use

- Custom responsive layouts (masonry, carousel)
- Dynamic spacing/positioning logic
- Programmatic child arrangement
- Data-driven layout systems

## Protocol Template

```lua
--!strict

type MyLayout = {
    -- Your layout state here
}

-- Called once when the script initializes
function init(self: MyLayout, context: Context): boolean
    return true
end

-- Called every frame to advance the simulation
function advance(self: MyLayout, seconds: number): boolean
    return true
end

-- Called when any input value changes
function update(self: MyLayout) end

-- Called every frame (after advance) to render content
function draw(self: MyLayout, renderer: Renderer) end

-- Propose an ideal size for the layout (optional)
-- Only has effect on layouts with Fit type of "Hug"
function measure(self: MyLayout): Vector
    return Vector.xy(100, 100)
end

-- Called when the layout resizes based on content
-- This is REQUIRED and called on initial size and any size changes
function resize(self: MyLayout, size: Vector)
    -- Position children, recalculate flow, react to container changes
end

-- Factory function
return function(): Layout<MyLayout>
    return {
        init = init,
        advance = advance,
        update = update,
        draw = draw,
        measure = measure,
        resize = resize,
    }
end
```

## Key Lifecycle Functions

| Function | Required | Purpose |
|----------|----------|---------|
| `init` | Optional | Initialize state, returns success boolean |
| `advance` | Optional | Frame-by-frame updates with delta time |
| `update` | Optional | Called when inputs change |
| `draw` | Optional | Custom rendering |
| `measure` | Optional | Propose ideal size (only for "Hug" fit type) |
| `resize` | **Required** | React to size changes, position children |

## Fit Types Context

Layout Scripts interact with Rive's Fit system:

| Fit Type | Behavior | `measure()` Effect |
|----------|----------|-------------------|
| **Hug** | Parent sizes to children | `measure()` proposes size |
| **Fill** | Child sizes to parent | `measure()` ignored |
| **Fixed** | Explicit dimensions | `measure()` ignored |

## Usage Pattern

1. Add a Layout to the scene
2. Create a new script, select **Layout** as the type
3. Add the script as a child of the Layout

## Important Notes

- `measure()` only affects layouts with Fit type "Hug"
- `resize()` is guaranteed to be called for initial size and all changes
- Layouts may have min/max constraints that override `measure()` requests
- Layout Scripts can use all Node Script lifecycle functions

---

# 2. Converter Script Protocol

## Overview

Converter Scripts enable custom data transformations within Rive's data binding system. They act as a bridge between source and target data with **bidirectional conversion**.

## When to Use

- Transform data between incompatible types
- Format/parse values (e.g., number to formatted string)
- Apply mathematical transformations to bound values
- Create reusable data transformations

## Protocol Template

```lua
--!strict

type MyConverter = {
    -- Converter state (rarely needed)
}

-- Types of inputs this converter accepts
type DataInputs = DataValueNumber

-- Data type this converter outputs
type DataOutput = DataValueNumber

-- Called once when the script initializes
function init(self: MyConverter, context: Context): boolean
    return true
end

-- Converts value when binding from SOURCE to TARGET
function convert(self: MyConverter, input: DataInputs): DataOutput
    local dv: DataValueNumber = DataValue.number()
    if input:isNumber() then
        -- Example: Add 1 to the incoming number
        dv.value = (input :: DataValueNumber).value + 1
    end
    return dv
end

-- Converts value when binding from TARGET to SOURCE (for two-way binding)
function reverseConvert(self: MyConverter, input: DataOutput): DataInputs
    local dv: DataValueNumber = DataValue.number()
    if input:isNumber() then
        -- Example: Subtract 1 (inverse operation)
        dv.value = (input :: DataValueNumber).value - 1
    end
    return dv
end

-- Factory function
return function(): Converter<MyConverter, DataInputs, DataOutput>
    return {
        init = init,
        convert = convert,
        reverseConvert = reverseConvert,
    }
end
```

## DataValue Types

| Type | Constructor | Check Method | `.value` Type |
|------|-------------|--------------|---------------|
| `DataValueNumber` | `DataValue.number()` | `isNumber()` | `number` |
| `DataValueString` | `DataValue.string()` | `isString()` | `string` |
| `DataValueBoolean` | `DataValue.boolean()` | `isBoolean()` | `boolean` |
| `DataValueColor` | `DataValue.color()` | `isColor()` | `Color` |

## DataValue API

```lua
-- Static constructors
DataValue.number()    -- Creates DataValueNumber
DataValue.string()    -- Creates DataValueString
DataValue.boolean()   -- Creates DataValueBoolean
DataValue.color()     -- Creates DataValueColor

-- Type checking methods (on any DataValue)
dv:isNumber()         -- Returns true if number
dv:isString()         -- Returns true if string
dv:isBoolean()        -- Returns true if boolean
dv:isColor()          -- Returns true if color

-- Access the actual value (after type check)
(input :: DataValueNumber).value    -- Cast and access
```

## Key Functions

| Function | Required | Purpose |
|----------|----------|---------|
| `init` | Optional | Initialize converter state |
| `convert` | **Required** | Transform source → target |
| `reverseConvert` | **Required** | Transform target → source (inverse) |

## Usage Pattern

1. Create new script, select **Converter** type
2. In Data panel, click "+" button
3. Choose **Converters → Script → [YourScript]**
4. Apply to bindings

## Example: Celsius to Fahrenheit Converter

```lua
--!strict

type TempConverter = {}
type DataInputs = DataValueNumber
type DataOutput = DataValueNumber

function convert(self: TempConverter, input: DataInputs): DataOutput
    local dv = DataValue.number()
    if input:isNumber() then
        -- Celsius to Fahrenheit: F = C * 9/5 + 32
        local celsius = (input :: DataValueNumber).value
        dv.value = celsius * 9 / 5 + 32
    end
    return dv
end

function reverseConvert(self: TempConverter, input: DataOutput): DataInputs
    local dv = DataValue.number()
    if input:isNumber() then
        -- Fahrenheit to Celsius: C = (F - 32) * 5/9
        local fahrenheit = (input :: DataValueNumber).value
        dv.value = (fahrenheit - 32) * 5 / 9
    end
    return dv
end

return function(): Converter<TempConverter, DataInputs, DataOutput>
    return {
        convert = convert,
        reverseConvert = reverseConvert,
    }
end
```

---

# 3. Test Script Protocol

## Overview

Test Scripts enable **unit testing for Util Scripts** directly in the Rive editor. They provide a simple testing framework with assertions.

## When to Use

- Verify Util Script logic works correctly
- Test edge cases and error conditions
- Regression testing after changes
- Document expected behavior

## Protocol Template

```lua
--!strict

-- Load the Util(s) you want to test
local MyUtil = require('MyUtil')

function setup(test: Tester)
    local case = test.case
    local group = test.group

    -- Single test case
    case('Addition works', function(expect)
        local result = MyUtil.add(2, 3)
        expect(result).is(5)
    end)

    -- Group related tests
    group('Math operations', function()
        case('Multiplication', function(expect)
            expect(MyUtil.multiply(3, 4)).is(12)
        end)

        case('Division', function(expect)
            expect(MyUtil.divide(10, 2)).is(5)
        end)
    end)
end

return function(): Tests
    return setup
end
```

## Tester API

| Method | Purpose |
|--------|---------|
| `test.case(name, fn)` | Define a single test case |
| `test.group(name, fn)` | Group related tests (supports nesting) |

## Expect Matchers

```lua
-- Equality
expect(value).is(expected)              -- value == expected

-- Numeric comparisons
expect(value).greaterThan(n)            -- value > n
expect(value).greaterThanOrEqual(n)     -- value >= n
expect(value).lessThan(n)               -- value < n
expect(value).lessThanOrEqual(n)        -- value <= n

-- Invert any matcher with .never
expect(value).never.is(wrong)           -- value ~= wrong
expect(value).never.greaterThan(10)     -- value <= 10
```

## Running Tests

1. Right-click your Test script in the Assets panel
2. Select **"Run Tests"**
3. Results display:
   - Passing and failing cases listed
   - Cases highlighted in the script editor

## Example: Testing a MathUtils Script

```lua
--!strict

local MathUtils = require('MathUtils')

function setup(test: Tester)
    local case = test.case
    local group = test.group

    group('clamp function', function()
        case('clamps to minimum', function(expect)
            expect(MathUtils.clamp(-5, 0, 10)).is(0)
        end)

        case('clamps to maximum', function(expect)
            expect(MathUtils.clamp(15, 0, 10)).is(10)
        end)

        case('returns value when in range', function(expect)
            expect(MathUtils.clamp(5, 0, 10)).is(5)
        end)
    end)

    group('lerp function', function()
        case('returns start at t=0', function(expect)
            expect(MathUtils.lerp(0, 100, 0)).is(0)
        end)

        case('returns end at t=1', function(expect)
            expect(MathUtils.lerp(0, 100, 1)).is(100)
        end)

        case('returns midpoint at t=0.5', function(expect)
            expect(MathUtils.lerp(0, 100, 0.5)).is(50)
        end)
    end)

    case('negative values handled', function(expect)
        expect(MathUtils.clamp(-50, -100, 0)).is(-50)
        expect(MathUtils.lerp(-10, 10, 0.5)).is(0)
    end)
end

return function(): Tests
    return setup
end
```

## Best Practices

- Use descriptive names for groups and cases
- Test edge cases (zero, negative, large numbers)
- Keep tests focused on single behaviors
- Group related tests logically

---

# 4. Path Effect Script Protocol

## Overview

Path Effect Scripts enable **real-time manipulation of path geometry**. They give programmatic control over shape and structure of paths for effects like warping, distortion, animation, and procedural modifications.

## When to Use

- Custom stroke effects (dashes, waves, distortions)
- Procedural path generation
- Animated path modifications
- Geometric transformations on existing paths

## Protocol Template

```lua
--!strict

type MyPathEffect = {
    context: Context,
    -- Effect state (time, parameters, etc.)
}

-- Called once when the effect initializes
function init(self: MyPathEffect, context: Context): boolean
    self.context = context
    return true
end

-- Core transformation function - receives original path, returns modified path
function update(self: MyPathEffect, inPath: PathData): PathData
    local path = Path.new()

    -- Process inPath commands and build new path
    for _, cmd in ipairs(inPath) do
        -- Transform each command
    end

    return path
end

-- Called each frame for animated effects
function advance(self: MyPathEffect, seconds: number): boolean
    -- Update animation state
    return true  -- Return true to keep receiving advance calls
end

-- Factory function
return function(): PathEffect<MyPathEffect>
    return {
        init = init,
        update = update,
        advance = advance,
        context = late(),
    }
end
```

## Key Functions

| Function | Required | Purpose |
|----------|----------|---------|
| `init` | Optional | Initialize effect, store context |
| `update` | **Required** | Transform PathData → PathData |
| `advance` | Optional | Time-based animation updates |

## PathData API

PathData is an indexed collection of PathCommand objects:

```lua
-- Get number of commands
local count = #inPath

-- Iterate through commands
for i, cmd in ipairs(inPath) do
    local cmdType = cmd.type        -- CommandType enum
    local pointCount = #cmd         -- Number of points

    -- Access points (varies by command type)
    -- moveTo/lineTo: 2 points (x, y)
    -- quadTo: 4 points (cx, cy, ex, ey)
    -- cubicTo: 6 points (c1x, c1y, c2x, c2y, ex, ey)
    -- close: 0 points
end

-- Measurement tools
local contour = inPath:contours()   -- First ContourMeasure
local pathMeasure = inPath:measure() -- Total path measurement
```

## CommandType Enum

| Value | Points | Description |
|-------|--------|-------------|
| `CommandType.none` | 0 | Placeholder (should not appear) |
| `CommandType.moveTo` | 2 | Move cursor to position |
| `CommandType.lineTo` | 2 | Draw line to position |
| `CommandType.quadTo` | 4 | Quadratic bezier curve |
| `CommandType.cubicTo` | 6 | Cubic bezier curve |
| `CommandType.close` | 0 | Close path to start |

## ContourMeasure API

```lua
local contour = pathData:contours()  -- Get first contour

while contour do
    -- Work with contour
    local nextContour = contour.next  -- Get next, or nil
    contour = nextContour
end
```

## Usage Pattern

1. Create a Path Effect Script
2. In Editor: Select a stroke → Effects Tab
3. Add **Script Effect** → Choose your script
4. Configure any custom inputs

## Example: Wave Distortion Effect

```lua
--!strict

type WaveEffect = {
    context: Context,
    time: number,
    amplitude: Input<number>,
    frequency: Input<number>,
}

function init(self: WaveEffect, context: Context): boolean
    self.context = context
    self.time = 0
    return true
end

function advance(self: WaveEffect, seconds: number): boolean
    self.time += seconds
    return true
end

function update(self: WaveEffect, inPath: PathData): PathData
    local path = Path.new()
    local amp = self.amplitude or 5
    local freq = self.frequency or 0.1

    for _, cmd in ipairs(inPath) do
        if cmd.type == CommandType.moveTo then
            local x, y = cmd[1], cmd[2]
            local offset = math.sin(y * freq + self.time * 3) * amp
            path:moveTo(Vector.xy(x + offset, y))

        elseif cmd.type == CommandType.lineTo then
            local x, y = cmd[1], cmd[2]
            local offset = math.sin(y * freq + self.time * 3) * amp
            path:lineTo(Vector.xy(x + offset, y))

        elseif cmd.type == CommandType.cubicTo then
            local c1x, c1y = cmd[1], cmd[2]
            local c2x, c2y = cmd[3], cmd[4]
            local ex, ey = cmd[5], cmd[6]

            local o1 = math.sin(c1y * freq + self.time * 3) * amp
            local o2 = math.sin(c2y * freq + self.time * 3) * amp
            local o3 = math.sin(ey * freq + self.time * 3) * amp

            path:cubicTo(
                Vector.xy(c1x + o1, c1y),
                Vector.xy(c2x + o2, c2y),
                Vector.xy(ex + o3, ey)
            )

        elseif cmd.type == CommandType.close then
            path:close()
        end
    end

    return path
end

return function(): PathEffect<WaveEffect>
    return {
        init = init,
        update = update,
        advance = advance,
        context = late(),
        time = 0,
        amplitude = late(),
        frequency = late(),
    }
end
```

## Important Notes

- `update()` is the core function - receives original path, returns modified path
- Return `true` from `advance()` to continue receiving frame updates
- Path effects can have custom inputs just like Node Scripts
- Effects are applied in real-time during playback

---

# Summary: Protocol Comparison

| Protocol | Factory Return | Key Functions | Primary Use |
|----------|---------------|---------------|-------------|
| **Node** | `Node<T>` | `init`, `advance`, `draw`, `update` | Animation logic |
| **Layout** | `Layout<T>` | `init`, `advance`, `draw`, `measure`, `resize` | Custom layouts |
| **Converter** | `Converter<T, In, Out>` | `init`, `convert`, `reverseConvert` | Data transformation |
| **Test** | `Tests` (function) | `setup(test: Tester)` | Unit testing Utils |
| **Path Effect** | `PathEffect<T>` | `init`, `update`, `advance` | Path manipulation |
| **Util** | Module table | Any exported functions | Shared utilities |
| **Listener** | `Listener<T>` | Event handlers | Event handling |

---

# Recommended LERP Curriculum Additions

## Priority Order

1. **Test Script** (Low complexity, high value)
   - Teaches testing mindset
   - Simple API
   - Reinforces Util Scripts

2. **Converter Script** (Medium complexity)
   - Important for data binding
   - Introduces DataValue types
   - Practical for ViewModel work

3. **Layout Script** (Medium complexity)
   - Builds on Node Scripts
   - Practical use cases
   - Responsive design concepts

4. **Path Effect Script** (High complexity)
   - Advanced topic
   - Requires PathData understanding
   - Complex iteration patterns

## Suggested Placement

- **Test Script**: After Util Script chapter
- **Converter Script**: After ViewModel chapter
- **Layout Script**: In Advanced section
- **Path Effect Script**: In Advanced section (final)

---

**End of Research Report**
