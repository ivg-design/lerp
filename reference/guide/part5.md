<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en

comment:  Part 5: Rive Scripting Integration - Part of the LERP Luau Guide

-->

# Part 5: Rive Scripting Integration

---

**Navigation:** [← Course](https://forge.mograph.life/apps/lerp/) | [Guide Index](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/index.md) | [API Ref](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/api-reference.md)

**Parts:** [1](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part1.md) | [2](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part2.md) | [3](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part3.md) | [4](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part4.md) | [5](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part5.md) | [6](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part6.md) | [7](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part7.md)

---

This section bridges the gap between the Luau language and the Rive environment. We will explore how Luau integrates into the Rive Editor, the structural patterns Rive enforces (Protocols), and a detailed analysis of each script type.

### 28. The Rive Scripting Environment and Debugging Workflow

Rive integrates a sophisticated code editor directly into the design environment. This integration is tightly coupled with the Luau engine and its type system, providing a development experience similar to modern IDEs.

#### Leveraging Luau for Tooling

When you write scripts in Rive, the environment is constantly performing **Static Analysis** using the Luau type checker.

- **Autocomplete (IntelliSense)**: Because Rive generates type definitions for its entire API (e.g., `Renderer`, `Vector`, `Input<T>`) and because Luau in `--!strict` mode understands the structure of your code, the editor can provide highly accurate suggestions. If you type `renderer:`, the editor immediately suggests all available methods like `drawPath`, `transform`, `save`, `restore`, etc., along with their expected parameters.

- **Real-time Error Checking (Linting)**: The editor flags type mismatches and syntax errors as you type, visualized by red underlines in the code.

#### The Debugging Workflow

Debugging Rive scripts involves two main approaches: Static Analysis (compile-time) and Runtime Logging.

**1. The Problems Tab (Static Analysis)**

This tab displays issues detected by the Luau type checker. It is your first line of defense.

- **Syntax Errors**: Basic mistakes like missing `end` keywords.
- **Type Errors**: Mismatches, such as passing a `number` to a function expecting a `string`, or attempting to access a property that doesn't exist on a type (common when misspelling properties in `--!strict` mode).

**Best Practice**: When using `--!strict` mode, your goal should be to keep the Problems tab empty. Address these issues before you try to run the animation.

**2. The Console Tab (Runtime Logging)**

This tab captures the output of the standard Luau `print()` function. This output is only visible when playing the animation within the Rive Editor.

```lua
function advance(self: MyNode, seconds: number): boolean
    -- Basic logging
    print("Frame advanced. Delta time: " .. seconds)

    -- Inspecting object state using string interpolation
    print(`Current position X: {self.position.x}`)

    -- Printing Rive types (Vec2D and Color have helpful default printing)
    print(self.position) -- Output: Vec2D(10.0, 20.0)

    return true
end
```

**Debugging Tip**: If you are using custom OOP classes ([Part 4](#part-4-object-oriented-programming-oop-in-luau-deep-dive)), implementing the `__tostring` metamethod on your classes significantly improves the usefulness of `print()` output in the console.

### 29. Protocols and the Rive Factory Function Pattern

When you create a new script in Rive, you must select a **Protocol**.

#### What are Protocols?

In the context of Rive scripting, a Protocol is a predefined contract or interface. It defines:

1. **The Purpose**: What the script is intended to do.
2. **The Execution Context**: When the script runs.
3. **The Lifecycle Functions**: The specific functions the script must implement for the Rive engine to interact with it (e.g., `init`, `advance`, `convert`).

#### Table 3: Rive Scripting Protocols Summary

| Protocol | Role | Key Interface Functions | Structure |
|---|---|---|---|
| Node | Logic & Drawing | `init`, `advance`, `draw`, `update` | Factory Function |
| Util | Reusable Code | (None required) | Module (Returns a table) |
| Converter | Data Transformation | `convert`, `reverseConvert` | Factory Function |
| Layout | Custom Positioning | `measure`, `resize` | Factory Function |
| Path Effect | Path Geometry | `update`, `init`, `advance` | Factory Function |
| Test | Unit Testing | `setup` | Factory Function |

#### The Factory Function Pattern

Every Rive script template (except Util scripts) ends with a specific structure:

```lua
--!strict

-- Define the type for the script instance
export type MyScript = { ... }

-- Define lifecycle functions (init, advance, etc.)
-- ...

-- The Factory Function
return function(): Node<MyScript> -- Specifies the Protocol and the custom type
    return {
        -- 1. Bind lifecycle functions
        init = init,
        advance = advance,
        -- 2. Initialize properties and input defaults
        speed = 1.0,
        counter = late()
    }
end
```

This structure is known as the **Factory Function Pattern**.

1. **Script Definition**: The main body of the Luau file defines the behavior (lifecycle functions) and the structure (the Type definition).
2. **Instantiation**: When the Rive engine needs to create an instance of this script (e.g., when the Artboard loads), it calls the anonymous function returned at the end (the Factory).
3. **The Factory's Role**: The Factory function creates the actual script instance table. This table binds the behavior and initializes the default state.
4. **Engine Integration**: Rive takes the table returned by the Factory and integrates it into the engine's update loop.

This pattern ensures that every script instance is self-contained, managing its own state independent of other instances of the same script.

#### Path Effect Protocol (Overview)

Path Effects let you modify `PathData` in real time and are attached to strokes. The required method is `update(self, inPath: PathData): PathData`, with optional `init(self, context: Context)` and `advance(self, seconds)`.

```lua
function update(self: MyPathEffect, inPath: PathData): PathData
    local outPath = Path.new()
    -- Transform or rebuild path commands here
    return outPath
end
```

### 30. Deep Dive: Inputs and Data Binding (Input<T>)

Inputs are the mechanism for exposing configuration from your Luau script to the Rive Editor interface. This allows designers to configure script instances without modifying the code, and it enables scripts to connect to the Data Binding system.

#### The Anatomy of Input<T>

`Input<T>` is a generic type provided by the Rive API. It acts as a wrapper around an underlying value.

```lua
--!strict
type MyNode = {
    -- Exposes a numeric field named "Speed" in the Editor
    speed: Input<number>,
    -- Exposes a color picker
    accentColor: Input<Color>,
}
```

**Key Concept**: `Input<T>` values are **read-only** inside scripts. You can set defaults in the factory function, but runtime values are supplied by the editor or data binding.

#### Accessing Values and Methods

For simple value inputs (number, boolean, color, string), use `.value` for clarity. For structured inputs (like Artboards), the input may expose methods (e.g., `:instance()`).

```lua
function advance(self: MyNode, seconds: number)
    local currentSpeed = self.speed.value
    local movement = currentSpeed * seconds
end
```

#### Setting Defaults vs. late() Initialization

Defaults are set in the factory function.

**Where Inputs Appear**: Node/Layout script inputs show in the right sidebar when the script node is selected. Converter inputs appear in the Data panel.

**1. Static Configuration (Defaults)**

If the input is meant to be configured statically by the designer, you provide a default value.

```lua
return function(): Node<MyNode>
    return {
        -- ...
        speed = 50.0, -- Default value
        accentColor = Color.rgba(255, 0, 0, 255) -- Default color
    }
end
```

**2. Dynamic Configuration (Data Binding and late())**

If the input is intended to be bound to a ViewModel or another Artboard asset, the value is provided externally after the script is initialized. In this case, we use the `late()` initializer.

```lua
--!strict
type MyNode = {
    gameState: Input<Data.GameState> -- Reference to a ViewModel
}

return function(): Node<MyNode>
    return {
        -- ...
        -- We cannot provide a default GameState here.
        -- late() tells the type checker this will be assigned later by the engine.
        gameState = late()
    }
end
```

`late()` satisfies the `--!strict` requirement that all fields must be initialized, acting as a placeholder until the Rive engine injects the actual bound value.

#### Listening for Input Changes

Inputs can notify you when they change. Use `update(self)` for any input change, or attach listeners for specific inputs.

```lua
function onSpeedChanged(value: number)
    print("Speed changed:", value)
end

function init(self: MyNode): boolean
    self.speed:addListener(self.speed.value, onSpeedChanged)
    return true
end
```

#### Data Binding Integration

The true power of Inputs lies in **Data Binding**. Instead of setting a static value, you can bind the input to a property in a ViewModel.

- When the ViewModel property changes, the input updates in your script.
- If the script has an `update(self)` lifecycle function, it will be called immediately after the value changes.
 
**Important**: Scripts cannot mutate regular inputs at runtime. To write values back, use a ViewModel input and set the nested property’s `.value`.

### 31. Deep Dive: The Node Protocol (Logic and Drawing)

The Node protocol is the workhorse of Rive scripting. It is used for frame-by-frame logic, procedural animation, interactivity, and custom rendering. Node scripts are attached directly to nodes (shapes, groups, etc.) in the Rive hierarchy.

#### The Node Lifecycle and Execution Order

The Rive engine calls specific functions on the Node script instance in a precise order during the animation loop.

```
sequenceDiagram
    participant E as Engine
    participant S as Node Script
    participant R as Renderer

    E->>S: 1. init() (Once at start)

    loop Every Frame
        E->>E: Calculate Delta Time (seconds)

        Note over E,S: Data Binding Phase
        alt Input Data Changed
            E->>S: 2. update()
        end

        Note over E,S: Logic Phase
        E->>S: 3. advance(seconds)

        Note over S,R: Rendering Phase
        E->>R: Begin Frame
        E->>S: 4. draw(renderer)
        S->>R: renderer:drawPath(...)
        E->>R: End Frame
    end
```

#### Detailed Lifecycle Analysis

**1. init(self): boolean**

- **When**: Called exactly once when the script instance is initialized.
- **Purpose**: Setup and initialization.
- **Best Practices**:
  - Initialize state variables (e.g., `self.elapsedTime = 0`).
  - **Performance Optimization**: Create reusable graphics objects (`Path` and `Paint`) here and store them in `self`. Avoid creating them every frame in `draw`.
- **Return Value**: Return `true` if initialization succeeded. If `false`, the script will not execute further.

**2. update(self)**

- **When**: Called when an input connected via Data Binding changes its value. This happens *before* `advance`.
- **Purpose**: React immediately to data changes.
- **Use Cases**: Recalculating parameters based on new input data, updating visual appearance (e.g., changing a Paint color based on a new Input color, or regenerating a Path if its dimensions change).

**3. advance(self, seconds): boolean**

- **When**: Called every frame, before rendering.
- **Purpose**: The core logic update. This is where state changes, physics calculations, and procedural animation logic occur.
- **The `seconds` Parameter (Delta Time)**: This is the elapsed time since the last frame. It is crucial for frame-rate independent motion.
  - Correct: `self.x += self.speed * seconds`
- **Return Value**: Return `true` to keep the script active. Return `false` to stop further updates (useful for one-shot behaviors).

**4. draw(self, renderer: Renderer)**

- **When**: Called every frame, after `advance`.
- **Purpose**: Custom rendering.
- **The `renderer` Parameter**: An object providing the API for issuing drawing commands (See [Part 6, Section 37](#37-the-drawing-api-path-paint-renderer)).

#### Node Protocol Example: Coordinating the Lifecycle

This example demonstrates how `init`, `update`, `advance`, and `draw` work together. We create a rectangle where the width can be changed dynamically via an Input.

```lua
--!strict
-- Node Script: DynamicRectangle.luau

export type DynamicRectangle = {
    position: Vec2D,
    width: Input<number>,
    height: number,
    rectPath: Path,
    rectPaint: Paint,
}

function init(self: DynamicRectangle): boolean
    -- Initialize graphics objects (Performance optimization)
    self.rectPaint = Paint.new()
    self.rectPaint.color = Color.rgba(255, 0, 0, 255) -- Red
    self.rectPath = Path.new()

    -- Call update manually to generate the path based on the *initial* width input value
    update(self)
    return true
end

function update(self: DynamicRectangle)
    -- This is called automatically if the 'width' input changes (e.g., via Data Binding).
    -- We must regenerate the Path geometry.
    self.rectPath:reset() -- Clear the old path

    local halfWidth = self.width.value / 2
    local halfHeight = self.height / 2

    self.rectPath:moveTo(Vec2D.xy(-halfWidth, -halfHeight))
    self.rectPath:lineTo(Vec2D.xy(halfWidth, -halfHeight))
    self.rectPath:lineTo(Vec2D.xy(halfWidth, halfHeight))
    self.rectPath:lineTo(Vec2D.xy(-halfWidth, halfHeight))
    self.rectPath:close()
end

function advance(self: DynamicRectangle, seconds: number): boolean
    -- Logic updates (e.g., moving the rectangle)
    self.position.x += 50 * seconds
    return true
end

function draw(self: DynamicRectangle, renderer: Renderer)
    renderer:save()
    -- Move the coordinate system to the calculated position
    renderer:transform(Mat2D.withTranslation(self.position.x, self.position.y))
    -- Draw the path (which is already updated with the correct width)
    renderer:drawPath(self.rectPath, self.rectPaint)
    renderer:restore()
end

return function(): Node<DynamicRectangle>
    return {
        init = init, advance = advance, draw = draw, update = update,
        position = Vec2D.xy(100, 100),
        width = 80.0,       -- Default width
        height = 40.0,      -- Static height
        rectPath = late(),
        rectPaint = late(),
    }
end
```

#### Pointer Events

Node and Layout scripts can implement `pointerDown`, `pointerMove`, `pointerUp`, or `pointerExit`. Handlers receive a `PointerEvent` with local coordinates and an id. Call `event:hit()` to stop propagation, or `event:hit(true)` to allow translucent pass-through.

```lua
function onPointerDown(self: MyNode, event: PointerEvent)
    print(event.position.x, event.position.y)
    print(event.id)
    event:hit()
end

return function(): Node<MyNode>
    return {
        init = init,
        draw = draw,
        pointerDown = onPointerDown,
    }
end
```

For instantiated artboards, pointer events must be forwarded manually to the instance.

### 32. Deep Dive: The Util Protocol (Modules and Reusability)

Util (Utility) scripts are the foundation of organized, scalable Rive projects. They do not execute on their own and cannot be attached to nodes. They function as Luau modules.

#### The Module Pattern

A Util script defines a scope for reusable code and must return a value, typically a table. This returned table is the public API of the module.

```lua
--!strict
-- File: utils/MathLib.luau

-- Define the module table
local MathLib = {}

-- Exported Type Definition
export type Vector3 = {x: number, y: number, z: number}

-- Private function (local to the file scope, not accessible outside)
local function internalHelper(v)
    return math.sqrt(v)
end

-- Public function (attached to the module table)
function MathLib.clamp(value: number, minVal: number, maxVal: number): number
    return math.max(minVal, math.min(maxVal, value))
end

-- Public constant
MathLib.PI = 3.14159

-- Return the public API
return MathLib
```

#### Importing Modules with require

Other scripts import Util scripts using the `require` function, passing the path (relative or absolute within the Rive project structure) without the `.luau` extension.

```lua
--!strict
-- File: Main.luau (Node Script)

-- Import the module. The variable 'ML' now holds the table returned by MathLib.luau
local ML = require("utils/MathLib")

-- Usage
local result = ML.clamp(150, 0, 100)
```

#### Accessing Exported Types (Namespacing)

When a Util script exports types using `export type`, Rive makes those types available to the parent script. You can still use the module namespace for clarity if you prefer.

```lua
--!strict
local ML = require("utils/MathLib")

-- Accessing the type using the module namespace
local v: ML.Vector3 = {x=1, y=2, z=3}
```

#### Key Concept: Module Caching and State

A crucial aspect of `require` is caching. A Util script is executed only the first time it is required. The returned value (the module table) is cached. Subsequent calls to `require` with the same path return the cached table without re-executing the script.

This behavior allows Util scripts to maintain state, effectively making them **Singletons** (See [Part 4, Section 27](#27-common-oop-patterns-in-rive)).

```lua
--!strict
-- utils/Counter.luau
print("Counter module loading...") -- This will print only once!
local count = 0
return {
    increment = function() count += 1 end,
    getCount = function() return count end
}
```

Any script requiring `utils/Counter` will interact with the same shared state.

### 33. Deep Dive: The Converter Protocol (Data Transformation)

Converters are specialized scripts used within Rive's Data Binding system. They act as intermediaries in the data pipeline, transforming data as it flows between the source (usually a ViewModel) and the target (a design property, like Text content or Shape fill color).

#### The Data Binding Pipeline

```
graph LR
    VM[ViewModel Property (Source Data)] --> C{Converter Script};
    C --> T[Target Property (e.g., Text Run)];

    subgraph Converter Logic
        direction TB
        C_IN(Input Data 'I') --> C_FUNC(convert()) --> C_OUT(Output Data 'O');
    end

    VM -- Data Type I --> C_IN;
    C_OUT -- Data Type O --> T;
```

#### The Template Structure: DataValue Types

Converters operate on `DataValue` wrappers provided by the data-binding system (e.g., `DataValueNumber`, `DataValueString`, `DataValueColor`). You create output values with constructors like `DataValue.number()` or `DataValue.color()`.

#### Lifecycle Functions

**1. convert(self: MyConverter, input: DataValueNumber): DataValueNumber**

- **Direction**: Source -> Target (e.g., ViewModel -> UI).
- **Purpose**: Transforms the input data (`I`) into the output format (`O`).

Example (Number to Number):

```lua
function convert(self: MyConverter, input: DataValueNumber): DataValueNumber
    local dv: DataValueNumber = DataValue.number()
    if input:isNumber() then
        dv.value = (input :: DataValueNumber).value + 1
    end
    return dv
end
```

**2. reverseConvert(self: MyConverter, input: DataValueNumber): DataValueNumber (Optional)**

- **Direction**: Target -> Source (e.g., UI Input Field -> ViewModel).
- **Purpose**: Transforms the data back. This is required for **two-way data binding**.

```lua
function reverseConvert(self: MyConverter, input: DataValueNumber): DataValueNumber
    local dv: DataValueNumber = DataValue.number()
    if input:isNumber() then
        dv.value = (input :: DataValueNumber).value - 1
    end
    return dv
end
```

#### Practical Example: Boolean to Color Converter

A common use case is changing the color of a UI element based on a boolean state.

```lua
--!strict
-- Converter: BooleanToColor.luau

export type BooleanToColor = {
    colorWhenTrue: Input<Color>,
    colorWhenFalse: Input<Color>,
}

function convert(self: BooleanToColor, input: DataValueBoolean): DataValueColor
    local dv: DataValueColor = DataValue.color()
    if input:isBoolean() then
        local flag = (input :: DataValueBoolean).value
        dv.value = flag and self.colorWhenTrue.value or self.colorWhenFalse.value
    end
    return dv
end

-- reverseConvert is generally not applicable here.

return function(): Converter<BooleanToColor, DataValueBoolean, DataValueColor>
    return {
        convert = convert,
        -- Defaults
        colorWhenTrue = Color.rgba(0, 255, 0, 255), -- Green
        colorWhenFalse = Color.rgba(128, 128, 128, 255), -- Gray
    }
end
```

### 34. Deep Dive: The Layout Protocol (Custom Positioning)

The Layout protocol allows developers to implement custom layout algorithms, overriding Rive's standard layout system. This is an advanced protocol used for creating complex, dynamic arrangements of elements such as flow layouts or dynamic grids.

#### The Two-Pass Layout System

Rive uses a standard two-pass system to determine the size and position of elements: The **Measure Pass** and the **Resize (or Arrange) Pass**.

#### The Layout Lifecycle

Layout scripts add two lifecycle functions:

- `measure(self): Vec2D` — optional; returns the layout’s preferred size.
- `resize(self, size: Vec2D)` — required; apply the final size and position children.

Measure only affects layouts with a Fit type of **Hug**.

```lua
--!strict
export type MyCustomLayout = { ... }

function measure(self: MyCustomLayout): Vec2D
    return Vec2D.xy(100, 100)
end

function resize(self: MyCustomLayout, size: Vec2D)
    print("New size:", size.x, size.y)
end

return function(): Layout<MyCustomLayout>
    return {
        measure = measure,
        resize = resize,
    }
end
```

**Complexity Note**: Implementing Layout scripts requires interaction with the Rive node hierarchy (accessing children, manipulating their transforms) and a solid understanding of layout algorithms.

### 35. Deep Dive: The Test Protocol (Unit Testing)

The Test protocol lets you run unit tests directly in the Rive editor, primarily for Util scripts and other pure logic.

#### The Testing Framework: Tester, Case, and expect

The protocol provides a `setup(test: Tester)` entry point and typically does **not** return a factory function. Use:

- `test.case(name, fn)` to define tests.
- `test.group(name, fn)` to group cases.
- `expect(value)` to assert on values with matchers.

#### The Test Template and Lifecycle

```lua
--!strict
-- File: test/MathLib.test.luau

local MathLib = require("utils/MathLib")

function setup(test: Tester)
    local case = test.case
    local group = test.group

    case("MathLib.clamp functionality", function(expect)
        local minValue, maxValue = 0, 100
        local result1 = MathLib.clamp(50, minValue, maxValue)
        local result2 = MathLib.clamp(150, minValue, maxValue)

        expect(result1).is(50)
        expect(result2).is(100)
    end)

    group("Math", function()
        case("Addition", function(expect)
            expect(MathLib.add(2, 3)).is(5)
        end)
    end)
end
```

Run tests by right-clicking the Test script in the Assets panel and selecting **Run Tests**. Results appear in the Assets panel and the editor.

---

