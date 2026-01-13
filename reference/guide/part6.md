<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en

comment:  Part 6: Rive API and Advanced Techniques - Part of the LERP Luau Guide

-->

# Part 6: Rive API and Advanced Techniques

---

**Navigation:** [← Course](https://forge.mograph.life/apps/lerp/) | [Guide Index](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/index.md) | [API Ref](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/api-reference.md)

**Parts:** [1](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part1.md) | [2](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part2.md) | [3](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part3.md) | [4](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part4.md) | [5](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part5.md) | [6](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part6.md) | [7](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part7.md)

---

To move beyond basic scripting, you must master the Rive Luau API. This API provides the types and functions necessary to interact with the Rive engine, manipulate geometry, perform rendering, and manage dynamic components.

### 36. Rive Luau API Overview: Core Types

Rive provides several fundamental types essential for 2D graphics programming. These are implemented as optimized types in Luau, often with overloaded operators for convenience.

#### Vec2D / Vector (2D Vector)

Rive’s scripting docs commonly use `Vec2D.xy`, while the API reference lists a `Vector` type with the same operations. In practice, both show up in the editor’s autocomplete depending on context. Treat them as equivalent 2D vector types.

**Creation and Access:**

```lua
--!strict
local position = Vec2D.xy(100, 50)
print(position.x, position.y)
```

**Operator Overloading**: Vectors support standard arithmetic operators, making vector math intuitive.

```lua
--!strict
local v1 = Vec2D.xy(10, 10)
local v2 = Vec2D.xy(5, 0)

local result_add = v1 + v2      -- (15, 10)
local result_sub = v1 - v2      -- (5, 10)
local result_mul_scalar = v1 * 2 -- (20, 20)
```

**Mutability Note**: Some vector types expose read-only `x`/`y`. If assignment fails, construct a new vector (e.g., `position = position + velocity * seconds`) instead of mutating components.

**Key Methods and Concepts:**

- `length()` / `lengthSquared()` for magnitude checks.
- `normalized()` for unit vectors.
- `distance()` / `distanceSquared()` for point-to-point distance.
- `dot()` for angle/relationship tests.
- `lerp()` for interpolation.

**Example: moveTowards Helper**

A common use case is moving an object towards a target at a fixed speed without overshooting.

```lua
--!strict
local function moveTowards(current: Vec2D, target: Vec2D, maxDistanceDelta: number): Vec2D
    local displacement = target - current
    local distance = displacement:length()

    if distance <= maxDistanceDelta or distance == 0 then
        return target
    end

    -- Normalize the displacement and scale by the movement amount
    return current + displacement / distance * maxDistanceDelta
end

-- Usage in advance():
-- self.position = moveTowards(self.position, self.target, self.speed * seconds)
```

#### Color

Represents an RGBA color.

**Channel Range (0 to 255)**: Rive color components use 8-bit channels in the range `0..255`. For normalized values, use `Color.opacity()` or convert manually.

```lua
--!strict
-- Creation: Color.rgba(r, g, b, a)
local brightRed = Color.rgba(255, 0, 0, 255)
local semiTransparentBlue = Color.rgba(0, 0, 255, 128)
```

**Key Methods:**

- `Color.lerp(a, b, t)`: Linear interpolation between two colors. This smoothly transitions the R, G, B, and A components simultaneously.
- `Color.opacity(color)`: Returns opacity as a normalized `0.0..1.0` value.

#### Mat2D (2D Transformation Matrix)

`Mat2D` represents a 2D affine transformation matrix. This single structure can encode translation (movement), rotation, scale, and skew. Matrices are fundamental to how the Rive engine manipulates the coordinate system.

**Creation:**

```lua
--!strict
-- Identity Matrix (No transformation)
local identity = Mat2D.identity()

-- Specific Transformations
local translation = Mat2D.withTranslation(10, 5)
local rotation = Mat2D.withRotation(math.rad(45)) -- Takes radians
```

**Combining Transformations (Matrix Multiplication):**

Transformations are combined using multiplication (`*`). The order is crucial (non-commutative).

```lua
--!strict
local T = Mat2D.withTranslation(100, 0)
local R = Mat2D.withRotation(math.rad(90))

-- Rotate first, then Translate
-- The object rotates around the origin (0,0), then moves along the world X-axis.
local TR = T * R

-- Translate first, then Rotate
-- The object moves to (100,0), then the entire coordinate system rotates around the origin.
local RT = R * T
```

**Key Methods:**

- `invert()`: Calculates the inverse matrix. Useful for converting coordinates from world space back to local space (e.g., converting a mouse click position into the local space of a rotated object).

### 37. The Drawing API (Path, Paint, Renderer)

Custom rendering is performed within the `draw(self, renderer)` function of a Node script. The process follows a standard 3-step pipeline: **Define Geometry (Path)**, **Define Appearance (Paint)**, and **Execute Command (Renderer)**.

**Performance Best Practice**: `Paint` and `Path` objects are expensive to create. **Never** create them inside the `draw` function every frame. Create them once in the `init` function, store them in `self`, and modify their properties as needed.

#### 1. Path (Geometry)

A `Path` object defines the shape or geometry you want to draw using a "pen" metaphor.

**Construction Methods (Path Verbs):**

- `Path.new()`: Creates a new, empty path.
- `moveTo(Vec2D.xy(x, y))`: Moves the pen to a new starting point.
- `lineTo(Vec2D.xy(x, y))`: Draws a straight line.
- `quadTo(control, end)` / `cubicTo(controlOut, controlIn, end)`: Draws Bézier curves.
- `close()`: Draws a line back to the last `moveTo` position.

```lua
-- Example: Drawing a Triangle
local path = Path.new()
path:moveTo(Vec2D.xy(50, 0))
path:lineTo(Vec2D.xy(100, 100))
path:lineTo(Vec2D.xy(0, 100))
path:close()
```

**Note**: Avoid calling `path:reset()` while the path is in flight for rendering; reset on subsequent frames.

**Additional Path Methods:**

- `add(path: Path, transform?: Mat2D)`: Merges another path into the current path with optional transformation.
- `#path` (length operator): Returns the number of PathCommand entries in the path.

#### Path Measurement (PathMeasure and ContourMeasure)

Rive provides powerful tools for measuring and manipulating paths. This is essential for effects like drawing along a path, extracting path segments, or placing objects at specific positions along a curve.

**PathMeasure - Measuring the Entire Path:**

```lua
--!strict
local path = Path.new()
path:moveTo(Vec2D.xy(0, 0))
path:lineTo(Vec2D.xy(100, 0))
path:lineTo(Vec2D.xy(100, 100))

local measure = path:measure()
print("Total path length:", measure.length)
print("Is path closed?", measure.isClosed)
```

**PathMeasure Properties:**

- `length`: The total length of the path across all contours.
- `isClosed`: Returns `true` only if the path has exactly one contour and that contour is closed.

**PathMeasure Methods:**

- `positionAndTangent(distance)`: Returns the position and tangent vector at a distance along the path. The distance is clamped to `[0, length]`.

```lua
local pos, tangent = measure:positionAndTangent(measure.length / 2)
print("Midpoint position:", pos.x, pos.y)
print("Tangent direction:", tangent.x, tangent.y)
```

- `warp(point)`: Transforms a point onto the path surface. The point's x-coordinate represents distance along the path, and y represents perpendicular offset.

```lua
-- Place a point 50 units along the path, 10 units offset perpendicular
local warpedPoint = measure:warp(Vec2D.xy(50, 10))
```

- `extract(startDistance, endDistance, destinationPath, startWithMove?)`: Extracts a segment of the path between two distances into a destination path.

```lua
local segment = Path.new()
measure:extract(20, 80, segment, true)  -- Extract from distance 20 to 80
renderer:drawPath(segment, paint)
```

**ContourMeasure - Measuring Individual Contours:**

A contour is a continuous sequence of path segments between `moveTo` operations. Use `ContourMeasure` to iterate through and measure individual contours.

```lua
--!strict
local path = Path.new()
-- First contour (a square)
path:moveTo(Vec2D.xy(0, 0))
path:lineTo(Vec2D.xy(50, 0))
path:lineTo(Vec2D.xy(50, 50))
path:lineTo(Vec2D.xy(0, 50))
path:close()

-- Second contour (a triangle)
path:moveTo(Vec2D.xy(100, 0))
path:lineTo(Vec2D.xy(150, 50))
path:lineTo(Vec2D.xy(100, 50))
path:close()

-- Iterate through contours
local contour = path:contours()
while contour do
    print("Contour length:", contour.length)
    contour = contour.next  -- Move to next contour
end
```

**Practical Example - Animated Path Drawing:**

```lua
--!strict
export type PathAnimator = {
    sourcePath: Path,
    displayPath: Path,
    paint: Paint,
    progress: number,  -- 0 to 1
}

function advance(self: PathAnimator, seconds: number): boolean
    self.progress += seconds * 0.5  -- Complete in 2 seconds
    if self.progress > 1 then self.progress = 1 end

    local measure = self.sourcePath:measure()
    local currentLength = measure.length * self.progress

    self.displayPath:reset()
    measure:extract(0, currentLength, self.displayPath, true)

    return true
end

function draw(self: PathAnimator, renderer: Renderer)
    renderer:drawPath(self.displayPath, self.paint)
end
```

#### 2. Paint (Appearance)

A `Paint` object defines how the geometry should be rendered.

**Key Properties:**

- `color: Color`: The RGBA color.
- `style: PaintStyle`: `'fill'` or `'stroke'`.
- `thickness: number`: (Stroke only) The width of the line.
- `join: StrokeJoin` / `cap: StrokeCap`: (Stroke only) Defines the appearance of corners and endpoints.
- `blendMode: BlendMode`: Defines how the paint interacts with colors already on the canvas (e.g., `BlendMode.srcOver` (default), `BlendMode.multiply`, `BlendMode.screen`).

```lua
local fillPaint = Paint.new()
fillPaint.color = Color.rgba(0, 255, 0, 255) -- Green
fillPaint.style = 'fill'
fillPaint.blendMode = BlendMode.multiply
```

**Alternative Constructor - `Paint.with()`:**

You can also create a Paint with multiple properties at once:

```lua
local strokePaint = Paint.with({
    style = 'stroke',
    thickness = 3,
    color = Color.hex('#FF0066'),
    join = 'round',
    cap = 'round'
})
```

**Copy with Overrides:**

```lua
-- Create a variation of an existing paint
local highlightPaint = basePaint:copy({ color = Color.rgba(255, 255, 0, 255) })
```

#### Gradients

Gradients allow smooth color transitions. Rive supports both **linear** and **radial** gradients. Apply them to Paint objects via the `gradient` property.

**Linear Gradient:**

A linear gradient transitions colors along a line between two points.

```lua
--!strict
local gradient = Gradient.linear(
    Vec2D.xy(0, 0),      -- Start point
    Vec2D.xy(100, 0),    -- End point
    {
        { position = 0, color = Color.rgba(255, 0, 0, 255) },   -- Red at start
        { position = 0.5, color = Color.rgba(255, 255, 0, 255) }, -- Yellow at middle
        { position = 1, color = Color.rgba(0, 0, 255, 255) }    -- Blue at end
    }
)

local paint = Paint.new()
paint.style = 'fill'
paint.gradient = gradient
```

**Radial Gradient:**

A radial gradient emanates outward from a center point.

```lua
--!strict
local gradient = Gradient.radial(
    Vec2D.xy(50, 50),  -- Center point
    40,                 -- Radius
    {
        { position = 0, color = Color.rgba(255, 255, 255, 255) }, -- White at center
        { position = 1, color = Color.rgba(0, 0, 0, 255) }        -- Black at edge
    }
)

local paint = Paint.new()
paint.style = 'fill'
paint.gradient = gradient
```

**GradientStop Properties:**

Each color stop requires:
- `position`: A value from 0 to 1 indicating where the color appears along the gradient
- `color`: The Color at that position

**Practical Example - Sunset Button:**

```lua
function init(self: SunsetButton): boolean
    self.path = Path.new()
    -- Build rounded rectangle path...

    self.paint = Paint.new()
    self.paint.style = 'fill'
    self.paint.gradient = Gradient.linear(
        Vec2D.xy(0, 0),
        Vec2D.xy(0, 50),  -- Vertical gradient
        {
            { position = 0, color = Color.rgba(255, 100, 50, 255) },  -- Orange top
            { position = 1, color = Color.rgba(200, 50, 100, 255) }   -- Pink bottom
        }
    )
    return true
end
```

#### 3. Renderer (Execution and Transformation)

The `Renderer` object is the interface for issuing drawing commands and managing the **transformation stack** (the Current Transformation Matrix or CTM).

**Drawing Command:**

- `drawPath(path: Path, paint: Paint)`: Executes the rendering.
- `drawImage(image, sampler, blendMode, opacity)`: Draws an image.
- `drawImageMesh(image, vertices, uvs, indices)`: Draws an image mesh.

**The Transformation Stack (save/restore)**

The `Renderer` provides methods to manipulate the CTM. It is crucial to manage this using a stack discipline.

- Always pair `save()` with `restore()` in the same function. Unbalanced stacks can leak transforms and clip states into later draws.


- `renderer:save()`: Pushes the current CTM onto the stack.
- `renderer:restore()`: Pops the last saved CTM, reverting the transformation state.
- `renderer:transform(mat: Mat2D)`: Applies a transform to the CTM.

**Walkthrough: Drawing a Rotated Object**

```lua
function draw(self, renderer)
    -- 1. Save the current state
    renderer:save()

    -- 2. Move the origin to the object's position
    renderer:transform(Mat2D.withTranslation(self.position.x, self.position.y))

    -- 3. Rotate the coordinate system around the new origin
    renderer:transform(Mat2D.withRotation(self.angle))

    -- 4. Draw the path (defined relative to (0,0)).
    renderer:drawPath(self.localPath, self.paint)

    -- 5. Restore the state
    renderer:restore()
end
```

**Clipping:**

The `Renderer` also allows you to restrict drawing to a specific region using `clipPath`.

```lua
function draw(self, renderer: Renderer)
    renderer:save()
    -- Define the clipping region
    renderer:clipPath(self.clippingMaskPath)

    -- Draw something complex. Only parts inside the clipping mask will be visible.
    renderer:drawPath(self.complexPatternPath, self.paint)

    renderer:restore() -- Clipping state is also restored
end
```

### 38. Interacting with ViewModels (Deep Dive)

ViewModels (Data Models) are the central nervous system for state management in Rive. They decouple the data from the presentation and logic.

#### Binding Scripts to ViewModels

To access a ViewModel, a script must declare an input typed specifically for that ViewModel. Rive automatically generates types under the `Data.` namespace.

```lua
--!strict
-- Assuming a ViewModel named 'PlayerStats' with properties 'health' (number) and 'isAlive' (boolean).

type HealthController = {
    stats: Input<Data.PlayerStats>
}

return function(): Node<HealthController>
    return {
        -- ...
        -- Initialized with late() as the binding is provided by the Rive editor environment.
        stats = late()
    }
end
```

**Note**: Scripts can only bind to **nested** ViewModel properties (e.g., `Main.character`) rather than the top-level ViewModel itself.

#### The Reactive Data Flow

The connection is reactive.

**1. Reading Data**: Access the ViewModel properties via the input, using `.value`.

```lua
function advance(self: HealthController, seconds: number)
    -- Access path: self.inputName.propertyName.value
    if self.stats.isAlive.value then
        local currentHealth = self.stats.health.value
        -- ...
    end
end
```

**2. Writing Data (Triggering Reactivity)**: Modify the ViewModel by assigning a new value to the `.value` property.

```lua
function takeDamage(self: HealthController, amount: number)
    local newHealth = self.stats.health.value - amount
    self.stats.health.value = newHealth -- Write the new value

    if newHealth <= 0 then
        self.stats.isAlive.value = false
    end
end
```

When a script modifies a ViewModel property, the change propagates instantly to all bound elements (Text Runs, Shape properties, State Machine inputs).

### 38.5 The Animation API (Timeline Control)

The Animation API provides programmatic control over Rive animations, allowing you to play, pause, scrub, and query animation state directly from scripts.

#### Accessing Animations

Animations are accessed through the Artboard. In most cases, you'll work with animations on instantiated artboards or the main artboard via context.

```lua
--!strict
-- Get an animation by name
local anim = artboard:animation("WalkCycle")
```

#### Animation Properties

- `duration`: The total length of the animation in seconds (read-only).

```lua
local totalTime = anim.duration
print(`Animation is {totalTime} seconds long`)
```

#### Animation Methods

**`advance(deltaTime: number): boolean`**

Progresses the animation forward by the specified time. Returns `true` if the animation is still playing, `false` if it reached the end (for non-looping animations).

```lua
function advance(self: MyNode, seconds: number): boolean
    local stillPlaying = self.animation:advance(seconds)
    if not stillPlaying then
        print("Animation completed!")
    end
    return true
end
```

**Note**: If the animation is set to loop or ping-pong, `advance()` always returns `true`.

**`setTime(seconds: number)`**

Jumps the animation to a specific time position in seconds.

```lua
-- Jump to 1.5 seconds into the animation
self.animation:setTime(1.5)

-- Jump to the end
self.animation:setTime(self.animation.duration)
```

**`setTimeFrames(frames: number)`**

Sets the animation position using frame numbers instead of seconds. Useful when working with frame-accurate timing.

```lua
-- Jump to frame 30
self.animation:setTimeFrames(30)
```

**`setTimePercentage(percentage: number)`**

Sets the animation position as a percentage (0.0 to 1.0) of the total duration.

```lua
-- Jump to 50% through the animation
self.animation:setTimePercentage(0.5)

-- Jump to the end
self.animation:setTimePercentage(1.0)
```

#### Practical Example: Animation Scrubber

Create a script that controls animation playback via a slider input:

```lua
--!strict
export type AnimationScrubber = {
    artboard: Input<Artboard<Data.Character>>,
    progress: Input<number>,  -- 0 to 1 from a slider
    animationName: string,
}

function init(self: AnimationScrubber): boolean
    self.animationName = "Idle"
    return true
end

function update(self: AnimationScrubber)
    -- Called when progress input changes
    local instance = self.artboard:instance()
    local anim = instance:animation(self.animationName)
    if anim then
        anim:setTimePercentage(self.progress.value)
    end
end

return function(): Node<AnimationScrubber>
    return {
        init = init,
        update = update,
        artboard = late(),
        progress = 0,
        animationName = "Idle",
    }
end
```

#### Practical Example: Sequential Animation Playback

Play multiple animations in sequence:

```lua
--!strict
type AnimationState = "intro" | "loop" | "outro"

export type SequentialAnimations = {
    artboard: Artboard<Data.MyArtboard>,
    currentAnim: Animation?,
    state: AnimationState,
}

function init(self: SequentialAnimations): boolean
    self.state = "intro"
    self.currentAnim = self.artboard:animation("Intro")
    return true
end

function advance(self: SequentialAnimations, seconds: number): boolean
    if self.currentAnim then
        local stillPlaying = self.currentAnim:advance(seconds)

        if not stillPlaying then
            -- Animation finished, move to next state
            if self.state == "intro" then
                self.state = "loop"
                self.currentAnim = self.artboard:animation("Loop")
            elseif self.state == "loop" then
                -- Loop plays indefinitely until triggered
            elseif self.state == "outro" then
                self.currentAnim = nil  -- Done
            end
        end
    end
    return true
end

function triggerOutro(self: SequentialAnimations)
    self.state = "outro"
    self.currentAnim = self.artboard:animation("Outro")
end
```

### 39. Advanced Technique: Fixed-Step Updates (Game Logic and Physics)

The standard `advance(self, seconds)` function uses a variable delta time based on the current frame rate. While correct for smooth animation, this is problematic for physics simulations or game logic that requires deterministic behavior.

#### The Solution: The Accumulator Pattern

The Fixed-Step Update pattern decouples the game logic updates from the rendering frame rate. We use an "accumulator" to track the passage of real time and consume it in fixed chunks (`DT`).

In Frame 2 (if a lag spike occurs), the simulation runs twice to catch up with the elapsed time.

#### Robust Implementation (Handling the "Spiral of Death")

If the device lags significantly, the accumulator can grow very large, potentially causing the simulation loop to run too many times in a single frame (the "spiral of death"). We must cap the maximum number of steps.

```lua
--!strict
export type PhysicsNode = {
    accumulator: number,
    positionY: number,
}

-- The fixed time step
local DT = 1 / 60 -- 60 updates per second
-- Cap the maximum steps per frame
local MAX_STEPS_PER_FRAME = 5

function physicsStep(self: PhysicsNode)
    -- All calculations here use the fixed DT
    self.positionY += 100 * DT -- Move 100 units per second
end

function advance(self: PhysicsNode, seconds: number): boolean
    -- 1. Accumulate real elapsed time
    self.accumulator += seconds
    local steps = 0

    -- 2. Consume time in fixed chunks, respecting the cap
    while self.accumulator >= DT and steps < MAX_STEPS_PER_FRAME do
        physicsStep(self)
        self.accumulator -= DT
        steps += 1
    end

    -- If we hit the max steps, we might discard the remaining time to prevent the spiral.
    if self.accumulator >= DT then
        self.accumulator = self.accumulator % DT
    end

    return true
end
-- ... Factory initialization ...
```

### 40. Advanced Technique: Dynamic Component Instantiation

Rive allows you to dynamically create (instantiate or spawn) instances of other Artboards (Components) at runtime.

#### The Instantiation Process

**1. Define the Template Input**: Define an input typed as `Input<Artboard<Data.ComponentName>>`.

```lua
--!strict
-- Assuming an Artboard component named "Projectile" exists.
export type SpawnerNode = {
    projectileTemplate: Input<Artboard<Data.Projectile>>,
    activeProjectiles: {Artboard<Data.Projectile>},
}
```

**2. Bind the Template**: In the Rive Editor, bind this input to the actual "Projectile" Artboard asset.

**3. Instantiate**: Use the `:instance()` method on the input.

```lua
function spawn(self: SpawnerNode)
    local newProjectile = self.projectileTemplate:instance()
    table.insert(self.activeProjectiles, newProjectile)
end
```

#### Crucial Concept: Manual Lifecycle Management

Dynamically instantiated components are **not** automatically updated. The script that created them is responsible for calling their `advance` and `draw` methods.

```lua
function advance(self: SpawnerNode, seconds: number): boolean
    -- Manually advance all instances
    for _, projectile in ipairs(self.activeProjectiles) do
        projectile:advance(seconds)
    end
    return true
end

function draw(self: SpawnerNode, renderer: Renderer)
    -- Manually draw all instances
    for _, projectile in ipairs(self.activeProjectiles) do
        renderer:save()
        -- Apply transformations (Position/Rotation) as needed
        -- ...
        projectile:draw(renderer)
        renderer:restore()
    end
end
```

#### Memory Management and Removal

You must remove instances when they are no longer needed. Iterate backward when removing items during iteration.

```lua
function advance(self: SpawnerNode, seconds: number): boolean
    -- Iterate backwards
    for i = #self.activeProjectiles, 1, -1 do
        local projectile = self.activeProjectiles[i]
        projectile:advance(seconds)

        -- Check removal condition (e.g., assuming a property 'isDead' exists)
        if isProjectileDead(projectile) then
            -- Remove from the management table
            table.remove(self.activeProjectiles, i)
        end
    end
    return true
end
```

#### Optimization: Object Pooling

For high-frequency spawning (like particles), constantly creating and destroying instances is inefficient. **Object Pooling** is an advanced pattern where you create a pool of instances upfront and reuse them by activating/deactivating them, rather than creating new ones.

### 41. Advanced Technique: Procedural Geometry Generation

While Rive is primarily a design tool, scripting allows you to generate geometry dynamically at runtime using the Path API.

#### Dynamic Path Modification

The key is to modify the path definition within the `advance` or `update` functions. Always call `path:reset()` before redefining the geometry.

#### Example: Dynamic Bar Chart

This example generates a bar chart based on an input value, utilizing the `update` lifecycle function to regenerate the path only when the input changes.

```lua
--!strict
export type BarChart = {
    value: Input<number>, -- Input value (e.g., 0 to 100)
    maxWidth: Input<number>,
    height: Input<number>,
    barPath: Path,
    paint: Paint,
}

function init(self: BarChart): boolean
    -- Initialize graphics objects once
    self.barPath = Path.new()
    self.paint = Paint.new()
    self.paint.color = Color.rgba(0, 255, 0, 255)
    update(self) -- Initial generation based on defaults
    return true
end

function update(self: BarChart)
    -- Called automatically when 'value', 'maxWidth', or 'height' changes (if bound).

    -- Calculate the actual width
    local normalizedValue = math.max(0, math.min(100, self.value.value)) / 100
    local width = normalizedValue * self.maxWidth.value
    local height = self.height.value

    -- Regenerate the geometry
    self.barPath:reset()

    -- Define the rectangle with path commands
    self.barPath:moveTo(Vec2D.xy(0, 0))
    self.barPath:lineTo(Vec2D.xy(width, 0))
    self.barPath:lineTo(Vec2D.xy(width, height))
    self.barPath:lineTo(Vec2D.xy(0, height))
    self.barPath:close()
end

function draw(self: BarChart, renderer: Renderer)
    -- Drawing is simple, as the geometry is already prepared in update()
    renderer:drawPath(self.barPath, self.paint)
end

-- ... Factory function initialization ...
```

---

