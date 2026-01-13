<!--
author:   IVG Design
email:    contact@mograph.life
version:  2.0.0
language: en

comment:  Complete API reference for Rive Luau scripting - all types, methods, and properties.

link:     https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css
script:   https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js

-->

# Rive Scripting API Reference v2

> A comprehensive reference for the Rive Luau API. Organized by object type with consistent documentation patterns.

---

**Navigation:** [← Back to Course](https://forge.mograph.life/apps/lerp/) | [Full Guide](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/luau-guide.md) | [Quick Reference](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/quick-reference.md)

---

## Table of Contents

### Core Types
- [Vector](#vector) - 2D vectors (alias: Vec2D)
- [Color](#color) - RGBA colors
- [Mat2D](#mat2d) - 2D transformation matrices

### Drawing API
- [Path](#path) - Vector paths
- [PathMeasure](#pathmeasure) - Path measurement
- [ContourMeasure](#contourmeasure) - Contour iteration
- [Paint](#paint) - Fill and stroke styling
- [Gradient](#gradient) - Color gradients
- [Renderer](#renderer) - Drawing commands

### Scene Objects
- [Artboard](#artboard) - Artboard instances
- [Node](#node-object) - Scene nodes
- [Animation](#animation) - Timeline animations

### Data & Input
- [Input](#input) - Script inputs
- [Property](#property) - Mutable properties
- [Context](#context) - Runtime context
- [ViewModel](#viewmodel) - Data binding

### Events
- [PointerEvent](#pointerevent) - Pointer interactions
- [Trigger](#trigger) - Action triggers

### Assets
- [Image](#image) - Image assets
- [ImageFilter](#imagefilter) - Image filtering modes
- [ImageSampler](#imagesampler) - Image sampling parameters
- [ImageWrap](#imagewrap) - Texture wrapping modes

### Path Commands & Effects
- [PathCommand](#pathcommand) - Path drawing command
- [PathData](#pathdata) - Path command collection
- [PathEffect](#patheffect) - Scripted path effects
- [CommandType](#commandtype) - Path command types

### Data & Values
- [DataValue](#datavalue) - Typed data container
- [DataValueNumber](#datavaluenumber) - Numeric data value
- [DataValueString](#datavaluestring) - String data value
- [DataValueBoolean](#datavalueboolean) - Boolean data value
- [DataValueColor](#datavaluecolor) - Color data value
- [Converter](#converter) - Value transformation
- [PropertyList](#propertylist) - List property
- [PropertyEnum](#propertyenum) - Enum property
- [PropertyTrigger](#propertytrigger) - Trigger property
- [PropertyViewModel](#propertyviewmodel) - ViewModel property

### Paint & Styling
- [PaintDefinition](#paintdefinition) - Paint configuration object
- [PaintStyle](#paintstyle) - Fill or stroke mode
- [BlendMode](#blendmode) - Compositing modes
- [StrokeCap](#strokecap) - Line ending styles
- [StrokeJoin](#strokejoin) - Corner styles
- [GradientStop](#gradientstop) - Gradient color stop

### Node Hierarchy
- [NodeData](#nodedata) - Writable node data
- [NodeReadData](#nodereaddata) - Read-only node data
- [Layout](#layout) - Layout scripting

### System
- [Listener](#listener) - Change listener
- [Output](#output) - Script output
- [EnumValues](#enumvalues) - Enum value collection

---

## Vector

2D vector type for positions, directions, and sizes. Vectors are **immutable** - all operations return new vectors.

> **Note:** Some examples may show `Vec2D` which is an alias for `Vector`.

### Constructors

#### `Vector.xy(x, y)`

Creates a new 2D vector.

```lua
Vector.xy(x: number, y: number): Vector
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | number | X component |
| y | number | Y component |

**Returns:** `Vector`

**Example:**
```lua
local position = Vector.xy(100, 50)
local direction = Vector.xy(1, 0)  -- Unit vector pointing right
```

#### `Vector.origin()`

Returns the zero vector (0, 0).

```lua
Vector.origin(): Vector
```

### Attributes

#### `vec.x`
The X component. **Type:** `number` (read-only)

#### `vec.y`
The Y component. **Type:** `number` (read-only)

### Indexing

Vectors support indexed access:

```lua
local v = Vector.xy(10, 20)
print(v[1])  -- 10 (x component)
print(v[2])  -- 20 (y component)
```

### Methods

#### `vec:length()`

Returns the magnitude (length) of the vector.

```lua
vec:length(): number
```

**Returns:** The length as a number.

**Example:**
```lua
local v = Vector.xy(3, 4)
print(v:length())  -- 5 (3-4-5 triangle)
```

#### `vec:lengthSquared()`

Returns the squared length. Faster than `length()` when you only need to compare magnitudes.

```lua
vec:lengthSquared(): number
```

#### `vec:normalized()`

Returns a unit vector (length 1) pointing in the same direction. Returns zero vector if length is zero.

```lua
vec:normalized(): Vector
```

**Example:**
```lua
local velocity = Vector.xy(10, 0)
local direction = velocity:normalized()  -- Vector(1, 0)
```

#### `vec:distance(other)`

Returns the distance to another vector.

```lua
vec:distance(other: Vector): number
```

#### `vec:distanceSquared(other)`

Returns the squared distance. Faster for comparisons.

```lua
vec:distanceSquared(other: Vector): number
```

#### `vec:dot(other)`

Returns the dot product. Useful for angle calculations and projections.

```lua
vec:dot(other: Vector): number
```

**Example:**
```lua
local a = Vector.xy(1, 0)
local b = Vector.xy(0, 1)
print(a:dot(b))  -- 0 (perpendicular vectors)
```

#### `vec:lerp(other, t)`

Linear interpolation between this vector and another.

```lua
vec:lerp(other: Vector, t: number): Vector
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| other | Vector | Target vector |
| t | number | Interpolation factor (0 = self, 1 = other) |

**Example:**
```lua
local start = Vector.xy(0, 0)
local target = Vector.xy(100, 100)
local midpoint = start:lerp(target, 0.5)  -- Vector(50, 50)
```

### Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `vec1 + vec2` |
| `-` | Subtraction | `vec1 - vec2` |
| `*` | Scalar multiplication | `vec * 2` |
| `/` | Scalar division | `vec / 2` |
| `-` (unary) | Negation | `-vec` |
| `==` | Equality | `vec1 == vec2` |

**Example:**
```lua
local a = Vector.xy(10, 20)
local b = Vector.xy(5, 10)

local sum = a + b        -- Vector(15, 30)
local diff = a - b       -- Vector(5, 10)
local scaled = a * 2     -- Vector(20, 40)
local divided = a / 2    -- Vector(5, 10)
local negated = -a       -- Vector(-10, -20)
```

**See Also:** [Mat2D](#mat2d), [Color](#color)

---

## Color

RGBA color with 0-255 channel values. Colors are accessed and modified via **static functions**, not properties.

### Constructors

#### `Color.rgba(r, g, b, a)`

Creates a color with alpha.

```lua
Color.rgba(r: number, g: number, b: number, a: number): Color
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| r | number | Red (0-255) |
| g | number | Green (0-255) |
| b | number | Blue (0-255) |
| a | number | Alpha (0-255, 255 = opaque) |

**Example:**
```lua
local red = Color.rgba(255, 0, 0, 255)
local semiTransparent = Color.rgba(0, 0, 255, 128)
```

#### `Color.rgb(r, g, b)`

Creates an opaque color (alpha = 255).

```lua
Color.rgb(r: number, g: number, b: number): Color
```

### Static Channel Accessors

> **Important:** Color channels are accessed via static functions, not properties. Use `Color.red(c)` not `c.r`.

#### `Color.red(color [, value])`

Gets the red channel, or returns a new color with the red channel updated.

```lua
Color.red(color: Color): number                    -- Get red
Color.red(color: Color, value: number): Color      -- Set red (returns new color)
```

#### `Color.green(color [, value])`

Gets the green channel, or returns a new color with the green channel updated.

```lua
Color.green(color: Color): number
Color.green(color: Color, value: number): Color
```

#### `Color.blue(color [, value])`

Gets the blue channel, or returns a new color with the blue channel updated.

```lua
Color.blue(color: Color): number
Color.blue(color: Color, value: number): Color
```

#### `Color.alpha(color [, value])`

Gets the alpha channel (0-255), or returns a new color with the alpha channel updated.

```lua
Color.alpha(color: Color): number
Color.alpha(color: Color, value: number): Color
```

#### `Color.opacity(color [, value])`

Gets the opacity as normalized value (0.0-1.0), or returns a new color with opacity set.

```lua
Color.opacity(color: Color): number
Color.opacity(color: Color, value: number): Color
```

**Example:**
```lua
local c = Color.rgb(255, 128, 0)

-- Get channels
local r = Color.red(c)      -- 255
local g = Color.green(c)    -- 128
local op = Color.opacity(c) -- 1.0

-- Create modified copies (colors are immutable)
local darker = Color.red(c, 128)           -- Returns new color with red=128
local faded = Color.opacity(c, 0.5)        -- Returns new color with 50% opacity
```

### Static Methods

#### `Color.lerp(from, to, t)`

Interpolates between two colors.

```lua
Color.lerp(from: Color, to: Color, t: number): Color
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| from | Color | Start color (t=0) |
| to | Color | End color (t=1) |
| t | number | Interpolation factor (0-1) |

**Example:**
```lua
local startColor = Color.rgb(255, 0, 0)  -- Red
local endColor = Color.rgb(0, 0, 255)    -- Blue
local purple = Color.lerp(startColor, endColor, 0.5)
```

**See Also:** [Paint](#paint), [Gradient](#gradient), [GradientStop](#gradientstop)

---

## Mat2D

2D affine transformation matrix for translation, rotation, and scale.

### Constructors

#### `Mat2D.identity()`

Creates an identity matrix (no transformation).

```lua
Mat2D.identity(): Mat2D
```

#### `Mat2D.withTranslation(x, y)`

Creates a translation matrix.

```lua
Mat2D.withTranslation(x: number, y: number): Mat2D
```

**Example:**
```lua
local moveRight = Mat2D.withTranslation(100, 0)
```

#### `Mat2D.withRotation(radians)`

Creates a rotation matrix.

```lua
Mat2D.withRotation(radians: number): Mat2D
```

**Example:**
```lua
local rotate90 = Mat2D.withRotation(math.rad(90))
local rotate45 = Mat2D.withRotation(math.pi / 4)
```

#### `Mat2D.withScale(sx, sy)`

Creates a scale matrix.

```lua
Mat2D.withScale(sx: number, sy: number): Mat2D
```

### Methods

#### `mat:invert()`

Returns the inverse matrix. Useful for converting between coordinate spaces.

```lua
mat:invert(): Mat2D
```

### Operators

#### Matrix Multiplication (`*`)

Combines transformations. **Order matters!**

```lua
local combined = mat1 * mat2  -- Apply mat2 first, then mat1
```

**Example:**
```lua
-- Rotate around a point (translate to origin, rotate, translate back)
local toOrigin = Mat2D.withTranslation(-50, -50)
local rotate = Mat2D.withRotation(math.rad(45))
local fromOrigin = Mat2D.withTranslation(50, 50)
local combined = fromOrigin * rotate * toOrigin
```

**See Also:** [Renderer.transform](#renderertransformmat)

---

## Path

Vector path for custom geometry.

### Constructors

#### `Path.new()`

Creates an empty path.

```lua
Path.new(): Path
```

### Methods

#### `path:moveTo(point)`

Moves the pen to a new position, starting a new subpath.

```lua
path:moveTo(point: Vector)
```

#### `path:lineTo(point)`

Draws a straight line from the current position.

```lua
path:lineTo(point: Vector)
```

#### `path:quadTo(control, end)`

Draws a quadratic Bézier curve.

```lua
path:quadTo(control: Vector, endPoint: Vector)
```

#### `path:cubicTo(c1, c2, end)`

Draws a cubic Bézier curve.

```lua
path:cubicTo(controlOut: Vector, controlIn: Vector, endPoint: Vector)
```

#### `path:close()`

Closes the current subpath with a line to the start.

```lua
path:close()
```

#### `path:reset()`

Clears all path data. **Warning:** Don't call while rendering.

```lua
path:reset()
```

#### `path:add(other, transform?)`

Merges another path into this one.

```lua
path:add(other: Path, transform?: Mat2D)
```

#### `path:measure()`

Returns a PathMeasure for the entire path.

```lua
path:measure(): PathMeasure
```

#### `path:contours()`

Returns a ContourMeasure for the first contour.

```lua
path:contours(): ContourMeasure?
```

### Operators

#### Length (`#`)

Returns the number of path commands.

```lua
local commandCount = #path
```

### Example: Drawing a Triangle

```lua
local path = Path.new()
path:moveTo(Vec2D.xy(50, 0))
path:lineTo(Vec2D.xy(100, 100))
path:lineTo(Vec2D.xy(0, 100))
path:close()
```

**See Also:** [PathMeasure](#pathmeasure), [Renderer.drawPath](#rendererdrawpathpath-paint)

---

## PathMeasure

Measures and manipulates paths.

### Attributes

#### `measure.length`

Total length of the path across all contours. **Type:** `number` (read-only)

#### `measure.isClosed`

True only if the path has exactly one closed contour. **Type:** `boolean` (read-only)

### Methods

#### `measure:positionAndTangent(distance)`

Returns the position and tangent at a distance along the path.

```lua
measure:positionAndTangent(distance: number): Vector, Vector
```

**Returns:** position, tangent (both Vector)

**Example:**
```lua
local measure = path:measure()
local pos, tan = measure:positionAndTangent(measure.length / 2)
```

#### `measure:warp(point)`

Warps a point onto the path. X = distance along path, Y = perpendicular offset.

```lua
measure:warp(point: Vector): Vector
```

#### `measure:extract(start, end, dest, startWithMove?)`

Extracts a segment into a destination path.

```lua
measure:extract(startDist: number, endDist: number, dest: Path, startWithMove?: boolean)
```

**Example: Animated Line Drawing**
```lua
local displayPath = Path.new()
measure:extract(0, measure.length * progress, displayPath, true)
```

**See Also:** [ContourMeasure](#contourmeasure), [Path.measure](#pathmeasure-1)

---

## ContourMeasure

Iterator for individual contours within a path. Use with `path:contours()` to iterate through multi-contour paths.

### Attributes

#### `contour.next`

Next contour, or nil if this is the last. **Type:** `ContourMeasure?` (read-only)

> **Note:** ContourMeasure provides iteration only. For length measurement and path manipulation, use [PathMeasure](#pathmeasure) instead.

### Example: Iterating Contours

```lua
local contour = path:contours()
local count = 0
while contour do
    count += 1
    contour = contour.next
end
print("Path has", count, "contours")
```

**See Also:** [PathMeasure](#pathmeasure)

---

## Paint

Defines how paths are rendered (fill/stroke, color, etc.).

### Constructors

#### `Paint.new()`

Creates a paint with default settings.

```lua
Paint.new(): Paint
```

#### `Paint.with(definition)`

Creates a paint with multiple properties at once.

```lua
Paint.with(definition: PaintDefinition): Paint
```

**Example:**
```lua
local stroke = Paint.with({
    style = "stroke",
    thickness = 3,
    color = Color.hex("#FF0066"),
    cap = "round",
    join = "round"
})
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `style` | `"fill"` or `"stroke"` | Rendering style |
| `color` | Color | Fill or stroke color |
| `thickness` | number | Stroke width (stroke only) |
| `cap` | `"round"`, `"butt"`, `"square"` | Line endings (stroke only) |
| `join` | `"round"`, `"bevel"`, `"miter"` | Corner style (stroke only) |
| `blendMode` | BlendMode | Compositing mode |
| `feather` | number | Feathering amount |
| `gradient` | Gradient? | Applied gradient |

### Methods

#### `paint:copy(overrides?)`

Creates a copy with optional property overrides.

```lua
paint:copy(overrides?: PaintDefinition): Paint
```

**Example:**
```lua
local highlight = basePaint:copy({ color = Color.rgb(255, 255, 0) })
```

**See Also:** [Gradient](#gradient), [Renderer.drawPath](#rendererdrawpathpath-paint)

---

## Gradient

Color gradients for fills.

### Constructors

#### `Gradient.linear(from, to, stops)`

Creates a linear gradient.

```lua
Gradient.linear(from: Vector, to: Vector, stops: {GradientStop}): Gradient
```

**Example:**
```lua
local gradient = Gradient.linear(
    Vec2D.xy(0, 0),
    Vec2D.xy(100, 0),
    {
        { position = 0, color = Color.rgb(255, 0, 0) },
        { position = 1, color = Color.rgb(0, 0, 255) }
    }
)
```

#### `Gradient.radial(center, radius, stops)`

Creates a radial gradient.

```lua
Gradient.radial(center: Vector, radius: number, stops: {GradientStop}): Gradient
```

### GradientStop Type

```lua
type GradientStop = {
    position: number,  -- 0.0 to 1.0
    color: Color
}
```

**See Also:** [Paint.gradient](#paintgradient)

---

## Renderer

Drawing commands and state management. Passed to `draw()` functions.

### Methods

#### `renderer:drawPath(path, paint)`

Draws a path with the specified paint.

```lua
renderer:drawPath(path: Path, paint: Paint)
```

#### `renderer:drawImage(image, sampler, blendMode, opacity)`

Draws an image.

```lua
renderer:drawImage(image: Image, sampler: ImageSampler, blend: BlendMode, opacity: number)
```

#### `renderer:save()`

Pushes the current state (transform, clip) onto the stack.

```lua
renderer:save()
```

#### `renderer:restore()`

Pops the last saved state. **Always pair with `save()`!**

```lua
renderer:restore()
```

#### `renderer:transform(mat)`

Applies a transformation to subsequent drawing.

```lua
renderer:transform(mat: Mat2D)
```

#### `renderer:clipPath(path)`

Restricts drawing to the path region until `restore()`.

```lua
renderer:clipPath(path: Path)
```

### Example: Drawing a Rotated Object

```lua
function draw(self, renderer)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(self.x, self.y))
    renderer:transform(Mat2D.withRotation(self.angle))
    renderer:drawPath(self.path, self.paint)
    renderer:restore()
end
```

**Warning:** Unbalanced `save()`/`restore()` calls cause rendering bugs in later frames.

**See Also:** [Mat2D](#mat2d), [Path](#path), [Paint](#paint)

---

## Artboard

Represents a Rive artboard instance.

### Attributes

| Attribute | Type | Access | Description |
|-----------|------|--------|-------------|
| `width` | number | read/write | Artboard width |
| `height` | number | read/write | Artboard height |
| `frameOrigin` | boolean | read/write | Origin is frame origin |
| `data` | typed | read-only | Associated ViewModel data |

### Methods

#### `artboard:draw(renderer)`

Renders the artboard.

```lua
artboard:draw(renderer: Renderer)
```

#### `artboard:advance(deltaTime)`

Advances animations. Returns false when done (non-looping).

```lua
artboard:advance(deltaTime: number): boolean
```

#### `artboard:instance()`

Creates an independent copy.

```lua
artboard:instance(): Artboard
```

#### `artboard:animation(name)`

Gets an animation by name.

```lua
artboard:animation(name: string): Animation?
```

#### `artboard:bounds()`

Gets the bounding box.

```lua
artboard:bounds(): Vector, Vector  -- min, max
```

#### `artboard:node(name)`

Gets a node by name.

```lua
artboard:node(name: string): Node?
```

#### Pointer Methods (Event Forwarding)

Used to forward pointer events to nested/instantiated artboards. Returns hit-test result (0 = miss, non-zero = hit).

```lua
artboard:pointerDown(x: number, y: number): number
artboard:pointerUp(x: number, y: number): number
artboard:pointerMove(x: number, y: number): number
artboard:pointerExit(x: number, y: number): number
```

> **Note:** These methods take raw coordinates for event forwarding. Node script handlers receive `PointerEvent` objects instead. See [PointerEvent](#pointerevent).

**See Also:** [Animation](#animation), [PointerEvent](#pointerevent)

---

## Node {#node-object}

A scripted node that can be attached to any Node in Rive. Renders in the local transform space of the hosting Node.

### Protocol Methods

#### `init(self): boolean`

Called once when the node is created. Return `true` to keep the script active.

```lua
function init(self: MyNode): boolean
    self.counter = 0
    print("Node initialized")
    return true
end
```

#### `advance(self, seconds): boolean`

Optional per-frame update. Return `true` to continue receiving calls.

```lua
function advance(self: MyNode, seconds: number): boolean
    self.counter += seconds
    return true  -- Keep running
end
```

#### `update(self)`

Called when an input value changes.

```lua
function update(self: MyNode)
    print("Input changed!")
end
```

#### `draw(self, renderer)`

Called to render the node.

```lua
function draw(self: MyNode, renderer: Renderer)
    renderer:drawPath(self.path, self.paint)
end
```

### Pointer Event Handlers

#### `pointerDown(self, event)`

Triggered when pointer presses down.

```lua
function pointerDown(self: MyNode, event: PointerEvent)
    print(`Pressed at ({event.position.x}, {event.position.y})`)
    event:hit()  -- Consume the event
end
```

#### `pointerMove(self, event)`

Triggered when pointer moves.

#### `pointerUp(self, event)`

Triggered when pointer releases.

#### `pointerExit(self, event)`

Triggered when pointer leaves the node area.

### Factory Pattern

Node scripts return a factory function:

```lua
return function(): Node<MyNode>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerDown = pointerDown,
        myProperty = late(),  -- Deferred initialization
    }
end
```

**See Also:** [PointerEvent](#pointerevent), [Renderer](#renderer), [NodeData](#nodedata)

---

## Animation

Controls animation playback.

### Attributes

#### `animation.duration`

Total animation length in seconds. **Type:** `number` (read-only)

### Methods

#### `animation:advance(deltaTime)`

Advances the animation. Returns false when complete (non-looping).

```lua
animation:advance(deltaTime: number): boolean
```

#### `animation:setTime(seconds)`

Jumps to a specific time.

```lua
animation:setTime(seconds: number)
```

#### `animation:setTimeFrames(frames)`

Jumps to a specific frame.

```lua
animation:setTimeFrames(frames: number)
```

#### `animation:setTimePercentage(percent)`

Jumps to a percentage (0.0-1.0) of duration.

```lua
animation:setTimePercentage(percent: number)
```

**Example: Animation Scrubber**
```lua
function update(self)
    local anim = self.artboard:animation("Idle")
    anim:setTimePercentage(self.progress.value)
end
```

**See Also:** [Artboard.animation](#artboardanimationname)

---

## Input

Generic script input exposed to the editor. `Input<T>` wraps a value of type `T`.

### Supported Types

```lua
Input<number>
Input<boolean>
Input<string>
Input<Color>
Input<Data.ViewModelName>
Input<Artboard<Data.ViewModelName>>
```

### Attributes

#### `input.value`

The wrapped value. **Type:** `T` (read-only from script)

### Methods

#### `input:addListener(callback)`

Registers a callback for value changes.

```lua
input:addListener(current: T, callback: (T) -> ())
```

**Note:** Scripts cannot modify input values directly. Use ViewModel properties for two-way binding.

**See Also:** [Property](#property), [ViewModel](#viewmodel)

---

## Property

Mutable property with change notification.

### Attributes

#### `property.value`

The property value. **Type:** `T` (read/write)

### Methods

#### `property:addListener(callback)`

Registers a change callback.

```lua
property:addListener(callback: (T) -> ())
```

#### `property:removeListener(callback)`

Removes a callback.

```lua
property:removeListener(callback: (T) -> ())
```

**See Also:** [Input](#input), [ViewModel](#viewmodel)

---

## Context

Runtime context available in lifecycle functions.

### Methods

#### `context:viewModel()`

Gets the main artboard's ViewModel.

```lua
context:viewModel(): ViewModel
```

#### `context:markNeedsUpdate()`

Requests an update on the next frame.

```lua
context:markNeedsUpdate()
```

**See Also:** [ViewModel](#viewmodel)

---

## PointerEvent

Pointer interaction event data.

### Constructor

#### `PointerEvent.new(id, position)`

Creates a new PointerEvent. Used for forwarding events to nested artboards.

```lua
PointerEvent.new(id: number, position: Vector): PointerEvent
```

**Example:**
```lua
-- Forward event to nested artboard
local childPos = transformToChildSpace(event.position)
local childEvent = PointerEvent.new(event.id, childPos)
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `position` | Vector | Local coordinates |
| `id` | number | Pointer ID (for multitouch) |

### Methods

#### `event:hit(isTranslucent?)`

Marks the event as handled. If `isTranslucent` is true, the event may continue to propagate through translucent hit targets.

```lua
event:hit()              -- Standard: stops propagation
event:hit(true)          -- Translucent: may continue through
```

**Example:**
```lua
function pointerDown(self, event: PointerEvent)
    if isInBounds(event.position) then
        self.pressed = true
        event:hit()
    end
end
```

---

## Trigger

Fires actions in the runtime.

### Methods

#### `trigger:fire()`

Invokes the trigger.

```lua
trigger:fire()
```

#### `trigger:addListener(callback)`

Listens for trigger activation.

```lua
trigger:addListener(callback: () -> ())
```

---

## Image

Drawable image asset.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `width` | number | Width in pixels (read-only) |
| `height` | number | Height in pixels (read-only) |

**See Also:** [Renderer.drawImage](#rendererdrawimageimage-sampler-blendmode-opacity)

---

## Enums

### BlendMode

```lua
BlendMode.srcOver    -- Default (normal)
BlendMode.multiply
BlendMode.screen
BlendMode.overlay
```

### PaintStyle

```lua
"fill"
"stroke"
```

### StrokeCap

```lua
"round"
"butt"
"square"
```

### StrokeJoin

```lua
"round"
"bevel"
"miter"
```

### ImageSampler

```lua
ImageSampler.linear
ImageSampler.nearest
```

---

## Sandbox Limitations

**Not available in Rive's Luau environment:**

| Library | Status |
|---------|--------|
| `io` | Not available |
| `os` | Partial (`os.clock()`, `os.time()`, `os.difftime()` only) |
| `debug` | Not available |
| `package` | Not available |
| `loadfile`, `dofile`, `loadstring` | Not available |

The `__gc` metamethod is also disabled.

---

## PathCommand

A single drawing instruction inside a Path.

### Attributes

#### `command.type`

The command type. **Type:** `CommandType` (read-only)

### Methods

#### Length (`#`)

Returns the number of points in the command.

```lua
local pointCount = #command
```

**Point counts by type:**
| Type | Points |
|------|--------|
| `moveTo` | 2 |
| `lineTo` | 2 |
| `quadTo` | 4 |
| `cubicTo` | 6 |
| `close` | 0 |

**See Also:** [CommandType](#commandtype), [PathData](#pathdata)

---

## PathData

Indexed collection of PathCommand objects. Behaves like an array and supports `ipairs` iteration.

### Methods

#### Length (`#`)

Returns the number of commands in the path.

```lua
local count = #pathData
```

#### `pathData:contours()`

Returns a ContourMeasure for the first contour. Returns nil if no contours exist.

```lua
pathData:contours(): ContourMeasure?
```

#### `pathData:measure()`

Returns a PathMeasure for the entire path.

```lua
pathData:measure(): PathMeasure
```

**Example: Iterating Commands**
```lua
for i, command in ipairs(pathData) do
    print(command.type, #command, "points")
end
```

**See Also:** [PathCommand](#pathcommand), [ContourMeasure](#contourmeasure)

---

## PathEffect

Scripted effect applied to a path. Use for custom path transformations.

### Protocol Methods

#### `init(self): boolean`

Called once when the effect is created.

```lua
function init(self: MyEffect): boolean
    -- Setup logic
    return true  -- Return true to keep effect active
end
```

#### `update(self, pathData): PathData`

Called when inputs change. Must return modified path data.

```lua
function update(self: MyEffect, pathData: PathData): PathData
    -- Transform the path
    return modifiedPathData
end
```

#### `advance(self, seconds): boolean`

Optional per-frame update.

```lua
function advance(self: MyEffect, seconds: number): boolean
    -- Animation logic
    return true  -- Continue receiving advance calls
end
```

**See Also:** [PathData](#pathdata), [PathMeasure](#pathmeasure)

---

## CommandType

Enum describing path drawing command types.

### Values

| Value | Description |
|-------|-------------|
| `none` | Placeholder (not normally encountered) |
| `moveTo` | Move to a point without drawing |
| `lineTo` | Draw a straight line |
| `quadTo` | Quadratic Bézier curve |
| `cubicTo` | Cubic Bézier curve |
| `close` | Close the path |

**See Also:** [PathCommand](#pathcommand)

---

## DataValue

Type-safe wrapper for storing typed values in inputs.

### Static Constructors

#### `DataValue.number()`

Creates a numeric data value container.

```lua
DataValue.number(): DataValueNumber
```

#### `DataValue.string()`

Creates a string data value container.

```lua
DataValue.string(): DataValueString
```

#### `DataValue.boolean()`

Creates a boolean data value container.

```lua
DataValue.boolean(): DataValueBoolean
```

#### `DataValue.color()`

Creates a color data value container.

```lua
DataValue.color(): DataValueColor
```

### Type Checking Methods

| Method | Returns true when... |
|--------|---------------------|
| `isNumber` | Container holds a number |
| `isString` | Container holds a string |
| `isBoolean` | Container holds a boolean |
| `isColor` | Container holds a Color |

**Example:**
```lua
local val = DataValue.number()
print(val.isNumber)   -- true
print(val.isString)   -- false
```

**See Also:** [Converter](#converter), [DataValueNumber](#datavaluenumber)

---

## DataValueNumber

A DataValue that stores a numeric value.

### Attributes

#### `value`

The numeric value. **Type:** `number` (read/write)

### Example

```lua
local dv: DataValueNumber = DataValue.number()
dv.value = 200
```

**See Also:** [DataValue](#datavalue)

---

## DataValueString

A DataValue that stores a string value.

### Attributes

#### `value`

The string value. **Type:** `string` (read/write)

### Example

```lua
local dv: DataValueString = DataValue.string()
dv.value = "Hello Rive"
```

**See Also:** [DataValue](#datavalue)

---

## DataValueBoolean

A DataValue that stores a boolean value.

### Attributes

#### `value`

The boolean value. **Type:** `boolean` (read/write)

### Example

```lua
local dv: DataValueBoolean = DataValue.boolean()
dv.value = true
```

**See Also:** [DataValue](#datavalue)

---

## DataValueColor

A DataValue that stores a color value with RGBA components.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `value` | number | Full encoded color value |
| `red` | number | Red component (0-255) |
| `green` | number | Green component (0-255) |
| `blue` | number | Blue component (0-255) |
| `alpha` | number | Alpha component (0-255) |

### Example

```lua
local dv: DataValueColor = DataValue.color()
dv.value = Color.rgba(255, 0, 0, 255)
-- Or access individual components:
dv.red = 255
dv.green = 128
dv.blue = 0
dv.alpha = 255
```

**See Also:** [DataValue](#datavalue), [Color](#color)

---

## Converter

Transforms values between ViewModel data bindings and Rive properties.

### Type Parameters

- `T`: The converter type
- `I`: Input type (DataValue variant)
- `O`: Output type (DataValue variant)

### Protocol Methods

#### `init(self): boolean`

Called once when converter is created.

```lua
function init(self: MyConverter): boolean
    return true
end
```

#### `convert(self, input): O`

Transforms input to output.

```lua
function convert(self: MyConverter, input: DataValueNumber): DataValueString
    return DataValue.string()  -- Return converted value
end
```

#### `reverseConvert(self, output): I`

Inverse transformation.

```lua
function reverseConvert(self: MyConverter, output: DataValueString): DataValueNumber
    return DataValue.number()
end
```

#### `advance(self, seconds): boolean`

Optional per-frame update.

**See Also:** [DataValue](#datavalue)

---

## PropertyList

Dynamic list property with array-like operations.

### Attributes

#### `list.length`

Number of items in the list. **Type:** `number` (read-only)

### Methods

#### `list:push(item)`

Adds item to end of list.

#### `list:pop()`

Removes and returns last item.

#### `list:shift()`

Removes and returns first item.

#### `list:insert(index, item)`

Inserts item at specific position.

#### `list:swap(indexA, indexB)`

Exchanges two items' positions.

---

## PropertyEnum

Represents an enum property in a ViewModel.

### Methods

#### `enum:values()`

Returns the available enum values.

```lua
enum:values(): EnumValues
```

**See Also:** [EnumValues](#enumvalues)

---

## PropertyTrigger

Trigger property that fires events and notifies listeners.

### Methods

#### `trigger:fire()`

Invokes the trigger, notifying all listeners.

```lua
trigger:fire()
```

#### `trigger:addListener(callback)`

Registers a callback for trigger events.

```lua
trigger:addListener(callback: () -> ())
```

#### `trigger:removeListener(callback)`

Removes a previously registered callback.

```lua
trigger:removeListener(callback: () -> ())
```

**See Also:** [Trigger](#trigger)

---

## PropertyViewModel

ViewModel property reference.

### Attributes

#### `property.value`

The property value. **Type:** varies by ViewModel definition

**See Also:** [ViewModel](#viewmodel), [Property](#property)

---

## ViewModel

Connects editor elements to data and code. Provides access to bound properties by type.

### Attributes

#### `viewModel.name`

The name of the ViewModel. **Type:** `string` (read-only)

### Methods

#### `viewModel:getNumber(name)`

Gets a numeric property by name.

```lua
viewModel:getNumber(name: string): Property<number>?
```

#### `viewModel:getString(name)`

Gets a string property by name.

```lua
viewModel:getString(name: string): Property<string>?
```

#### `viewModel:getBoolean(name)`

Gets a boolean property by name.

```lua
viewModel:getBoolean(name: string): Property<boolean>?
```

#### `viewModel:getColor(name)`

Gets a color property by name.

```lua
viewModel:getColor(name: string): Property<Color>?
```

#### `viewModel:getTrigger(name)`

Gets a trigger property by name.

```lua
viewModel:getTrigger(name: string): PropertyTrigger?
```

#### `viewModel:getList(name)`

Gets a list property by name.

```lua
viewModel:getList(name: string): PropertyList?
```

#### `viewModel:getViewModel(name)`

Gets a nested ViewModel property by name.

```lua
viewModel:getViewModel(name: string): PropertyViewModel?
```

#### `viewModel:getEnum(name)`

Gets an enum property by name.

```lua
viewModel:getEnum(name: string): PropertyEnum?
```

#### `viewModel:instance()`

Creates an independent instance of the ViewModel.

```lua
viewModel:instance(): ViewModel
```

### Example

```lua
function init(self: MyScript): boolean
    local vm = context:viewModel()

    -- Get typed properties
    local score = vm:getNumber("score")
    local playerName = vm:getString("playerName")
    local isActive = vm:getBoolean("isActive")

    -- Read values
    if score then
        print(`Score: {score.value}`)
    end

    -- Listen for changes
    if playerName then
        playerName:addListener(function(newName)
            print(`Name changed to: {newName}`)
        end)
    end

    return true
end
```

**See Also:** [Property](#property), [Context](#context), [PropertyTrigger](#propertytrigger)

---

## NodeData

Writable node data with transform properties and hierarchy access.

### Attributes

#### `node.children`

Child nodes. **Type:** table of NodeData (read-only)

#### `node.parent`

Parent node, or nil if root. **Type:** `NodeData?` (read-only)

### Methods

#### `node:decompose(worldTransform)`

Updates position, rotation, and scale from a world transform matrix.

```lua
node:decompose(worldTransform: Mat2D)
```

**See Also:** [NodeReadData](#nodereaddata)

---

## NodeReadData

Read-only node data providing transform properties.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `position` | Vector | Local position |
| `rotation` | number | Local rotation in radians |
| `scale` | Vector | Local scale |
| `worldTransform` | Mat2D | World transform matrix |
| `x` | number | Local position X |
| `y` | number | Local position Y |
| `scaleX` | number | Local scale X |
| `scaleY` | number | Local scale Y |
| `paint` | Paint? | Paint data (if Path node) |

**See Also:** [NodeData](#nodedata), [Mat2D](#mat2d)

---

## Layout

Scripted layout that fits into layout boxes.

### Protocol Methods

#### `measure(self)`

Optional. Enables intrinsic sizing. After measurement, `resize()` is called with granted dimensions.

```lua
function measure(self: MyLayout)
    -- Request specific size (may be constrained by min/max)
end
```

#### `resize(self, width, height)`

Required. Called on initial size and whenever size changes.

```lua
function resize(self: MyLayout, width: number, height: number)
    self.width = width
    self.height = height
end
```

**Note:** Layout scripts function like Node scripts but respond to layout box sizing.

---

## Listener

Callback that observes changes on an object.

### Usage

Listeners are registered via `addListener` methods on various objects:

```lua
property:addListener(function(newValue)
    print("Value changed to", newValue)
end)
```

**See Also:** [Property](#property), [Input](#input)

---

## Output

Represents a typed output value from a script.

### Usage

Outputs allow scripts to expose values to other parts of the system:

```lua
export type MyScript = {
    result: Output<number>,
}
```

---

## EnumValues

Collection of enum values.

### Methods

#### Length (`#`)

Returns the number of enum values.

```lua
local count = #enumValues
```

**See Also:** [PropertyEnum](#propertyenum)

---

## ImageFilter

Defines image sampling behavior during scaling or transformation.

### Values

| Value | Description |
|-------|-------------|
| `trilinear` | Smooth filtering (default) |
| `nearest` | Pixel-perfect, no interpolation |

**Example:**
```lua
-- Use nearest for pixel art
renderer:drawImage(image, ImageSampler.nearest, BlendMode.srcOver, 1)
```

**See Also:** [Image](#image), [ImageSampler](#imagesampler)

---

## ImageSampler

Sampling parameters applied when drawing an image, including wrapping and filtering behavior.

### Usage

ImageSampler is passed to `renderer:drawImage()` to control how images are rendered:

```lua
renderer:drawImage(image, ImageSampler.linear, BlendMode.srcOver, 1.0)
```

### Values

| Value | Description |
|-------|-------------|
| `linear` | Smooth bilinear filtering |
| `nearest` | Nearest-neighbor (pixel-perfect) |

**See Also:** [ImageFilter](#imagefilter), [ImageWrap](#imagewrap)

---

## ImageWrap

Defines how texture coordinates outside the [0, 1] range are handled.

### Values

| Value | Description |
|-------|-------------|
| `clamp` | Clamps coordinates to [0, 1] range |
| `repeat` | Tiles the texture by repeating |
| `mirror` | Mirrors the texture at boundaries |

**See Also:** [ImageSampler](#imagesampler), [Image](#image)

---

## PaintDefinition

Partial set of paint properties for initializing or updating a Paint. All fields are optional.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `style` | PaintStyle | Fill or stroke mode |
| `color` | Color | Paint color |
| `thickness` | number | Stroke width |
| `cap` | StrokeCap | Line ending style |
| `join` | StrokeJoin | Corner style |
| `blendMode` | BlendMode | Compositing mode |
| `feather` | number | Feathering amount |
| `gradient` | Gradient? | Gradient fill (false to remove) |

### Example

```lua
local paint = Paint.with({
    style = "fill",
    color = Color.rgb(255, 0, 0),
    blendMode = BlendMode.multiply,
})

-- Update with copy
local highlight = paint:copy({
    color = Color.rgb(255, 255, 0)
})
```

**See Also:** [Paint](#paint), [PaintStyle](#paintstyle)

---

## PaintStyle

Specifies how shapes are painted.

### Values

| Value | Description |
|-------|-------------|
| `fill` | Paints the interior of the shape |
| `stroke` | Paints the outline of the shape |

### Example

```lua
local fillPaint = Paint.with({ style = "fill" })
local strokePaint = Paint.with({ style = "stroke", thickness = 2 })
```

**See Also:** [Paint](#paint), [PaintDefinition](#paintdefinition)

---

## BlendMode

Defines how paint color is composited with content behind it.

### Values

| Value | Description |
|-------|-------------|
| `srcOver` | Normal blending (default) |
| `multiply` | Darkens by multiplying colors |
| `screen` | Lightens by screening colors |
| `overlay` | Combines multiply and screen |
| `darken` | Keeps darker color |
| `lighten` | Keeps lighter color |
| `colorDodge` | Brightens to reflect source |
| `colorBurn` | Darkens to reflect source |
| `hardLight` | Hard spotlight effect |
| `softLight` | Soft spotlight effect |
| `difference` | Subtracts colors |
| `exclusion` | Similar to difference, lower contrast |
| `hue` | Applies source hue |
| `saturation` | Applies source saturation |
| `color` | Applies source hue and saturation |
| `luminosity` | Applies source luminosity |

### Example

```lua
local paint = Paint.with({
    style = "fill",
    color = Color.rgba(255, 0, 0, 128),
    blendMode = BlendMode.multiply,
})
```

**See Also:** [Paint](#paint), [PaintDefinition](#paintdefinition)

---

## StrokeCap

Defines the shape at the ends of open stroke segments.

### Values

| Value | Description |
|-------|-------------|
| `butt` | Squared end, no extension |
| `round` | Semicircular cap |
| `square` | Squared end, extends past endpoint |

### Example

```lua
local paint = Paint.with({
    style = "stroke",
    thickness = 4,
    cap = "round",
})
```

**See Also:** [StrokeJoin](#strokejoin), [Paint](#paint)

---

## StrokeJoin

Defines how two stroke segments connect at a corner.

### Values

| Value | Description |
|-------|-------------|
| `miter` | Sharp corner |
| `round` | Rounded corner |
| `bevel` | Flattened corner |

### Example

```lua
local paint = Paint.with({
    style = "stroke",
    thickness = 4,
    join = "round",
})
```

**See Also:** [StrokeCap](#strokecap), [Paint](#paint)

---

## GradientStop

A color stop in a Gradient, defined by position and color.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `position` | number | Position along gradient (0.0 - 1.0) |
| `color` | Color | Color at this position |

### Example

```lua
local gradient = Gradient.linear(
    Vec2D.xy(0, 0),
    Vec2D.xy(100, 0),
    {
        { position = 0, color = Color.rgb(255, 0, 0) },
        { position = 0.5, color = Color.rgb(255, 255, 0) },
        { position = 1, color = Color.rgb(0, 255, 0) },
    }
)
```

**See Also:** [Gradient](#gradient), [Color](#color)
