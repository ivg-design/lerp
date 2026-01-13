<!--
author:   IVG Design
email:    contact@mograph.life
version:  1.4.0
language: en

comment:  Part 7: Architecture and Optimization - Part of the LERP Luau Guide

-->

# Part 7: Architecture and Optimization

---

**Navigation:** [← Course](https://forge.mograph.life/apps/lerp/) | [Guide Index](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/index.md) | [API Ref](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/api-reference.md)

**Parts:** [1](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part1.md) | [2](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part2.md) | [3](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part3.md) | [4](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part4.md) | [5](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part5.md) | [6](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part6.md) | [7](https://liascript.github.io/course/?https://forge.mograph.life/apps/lerp/reference/guide/part7.md)

---

Mastering Rive scripting involves more than just knowing the Luau syntax or the Rive API. It requires adopting robust architectural patterns, understanding performance implications in a real-time graphics environment, and knowing how to write clean, maintainable code.

### 42. Architectural Best Practices (The Rive Philosophy)

Adopting these practices ensures your Rive projects remain scalable and maintainable as complexity grows.

#### 42.1. Embrace Strict Mode (--!strict) as Non-Negotiable

For any non-trivial project, `--!strict` mode is essential.

- **Why**: Dynamically typed languages are prone to runtime errors caused by typos or incorrect assumptions. Strict mode enforces type safety, catching these errors during development (static analysis).
- **Benefits**:
  - **Compile-time Safety**: Prevents runtime crashes due to type mismatches.
  - **Superior Tooling**: Enables accurate autocomplete (IntelliSense), crucial for discovering and using the Rive API correctly.
  - **Self-Documenting Code**: Type definitions clarify the expected data structures and function signatures.
- **Implementation**: Always add `--!strict` to the top of every script. Master the techniques for defining types ([Part 3](#part-3-the-strictly-typed-approach-the-hero-phase)) and the OOP casting pattern ([Part 4, Section 20](#20-the-anatomy-of-a-luau-class-the-strictly-typed-pattern)).

#### 42.2. Modularity and Separation of Concerns

A common mistake is packing too much logic into a single Node script.

- **The Principle**: Separate different concerns into different files using the appropriate Protocols.
- **Implementation Strategy**:
  - **Util Scripts (Logic/Data/Services)**: Define OOP classes, math libraries, complex algorithms, data structures, and shared constants here.
  - **Node Scripts (Presentation/Integration)**: Node scripts should be lightweight "Controllers." They focus on integrating the logic from Util scripts with the Rive environment—reading inputs, managing the lifecycle (`init`, `advance`, `draw`), and handling rendering.

#### 42.3. The MVVM Pattern in Rive (ViewModel as the Source of Truth)

Rive is heavily designed around the **Model-View-ViewModel (MVVM)** pattern. Understanding this is crucial for clean data flow.

- **Model**: The underlying data structures and business logic (often defined in Util scripts).
- **View**: The visual elements in the Rive Editor (Artboards, Shapes, Text Runs).
- **ViewModel (Rive Data Model)**: The central hub that holds the application state and mediates between the Model and the View.

**Best Practices for State Management:**

- **Centralize State**: Avoid storing important application state (like `score`, `health`) inside individual Node scripts. Store them in the ViewModel.
- **Decoupled Interaction**: Scripts should primarily interact by reading from and writing to the ViewModel, rather than directly referencing each other.

**Example:**

- **Bad Practice**: `NodeScriptA` calculates the score and somehow finds the UI Text Run to update its display.
- **Good Practice**: `NodeScriptA` updates `ViewModel.score.value`. The UI Text Run is bound directly to `ViewModel.score`. The components remain decoupled.

#### 42.4. Prefer Composition Over Deep Inheritance

While Luau supports inheritance, creating deep hierarchies (e.g., A inherits from B inherits from C) can lead to rigid code. Prefer **composition**: design objects based on what they *do* (their components) rather than what they *are*. A `Character` object might *contain* instances of `Mover` and `HealthComponent` classes, allowing for flexible combinations of behaviors.

### 43. Performance Optimization Strategies

Rive is a real-time graphics engine. Performance is paramount. Script execution time directly impacts the frame rate.

#### 43.1. The Cardinal Rule: Avoid Memory Allocation in Hot Paths

The "hot paths" are functions called every frame: `advance(self, seconds)` and `draw(self, renderer)`.

- **The Problem**: Creating new objects (tables, `Vec2D`, `Path`, `Paint`) allocates memory. Frequent allocation increases pressure on the Luau Garbage Collector (GC). When the GC runs, it can cause noticeable frame hitches.
- **The Solution**: **Caching and Reuse**.

#### 43.2. Caching Graphics Objects

**Do Not** create `Path` and `Paint` objects inside `draw`.

```lua
--!strict
-- BAD PRACTICE (Slow - Allocates every frame)
function draw(self, renderer)
    local paint = Paint.new() -- BAD!
    paint.color = Color.rgba(255, 0, 0, 255)
    local path = Path.new() -- BAD!
    path:moveTo(Vec2D.xy(-10, -10))
    path:lineTo(Vec2D.xy(10, -10))
    path:lineTo(Vec2D.xy(10, 10))
    path:lineTo(Vec2D.xy(-10, 10))
    path:close()
    renderer:drawPath(path, paint)
end

-- GOOD PRACTICE (Fast - Caching)
function init(self)
    -- Allocate memory once
    self.paint = Paint.new()
    self.paint.color = Color.rgba(255, 0, 0, 255)
    self.path = Path.new()
    self.path:moveTo(Vec2D.xy(-10, -10))
    self.path:lineTo(Vec2D.xy(10, -10))
    self.path:lineTo(Vec2D.xy(10, 10))
    self.path:lineTo(Vec2D.xy(-10, 10))
    self.path:close()
    return true
end

function draw(self, renderer)
    -- No memory allocation, just execution
    renderer:drawPath(self.path, self.paint)
end
```

If the geometry or color changes, modify the existing cached objects rather than creating new ones. Use `path:reset()` to clear the geometry efficiently before rebuilding it.

#### 43.3. Leverage the update() Lifecycle

If a calculation or path generation depends on inputs that change infrequently, perform the work in the `update(self)` function. `update` is only called when bound inputs change, whereas `advance` and `draw` are called every frame.

#### 43.4. Mathematical Efficiency

- **Square Roots**: Functions like `Vec2D.length()` use `math.sqrt`, which is relatively expensive. If you only need to *compare* distances (e.g., checking if an object is within a radius), compare the *squared* distances instead (if the API provides a `lengthSquared()` method or similar).
- **Local Variables**: Luau optimizes access to `local` variables significantly better than global variables.
- **Avoid Per-Frame Allocations**: Reuse tables and avoid creating new anonymous functions inside `advance`/`draw` when possible.

#### 43.5. Advanced Optimization: Object Pooling

For scenarios involving frequent creation and destruction of dynamic instances (e.g., particles, projectiles), the standard instantiation pattern (`template:instance()`) can cause GC pressure.

**Object Pooling** is a technique where a fixed number of instances are created upfront and reused.

**Object Pool Implementation Sketch:**

```lua
--!strict
export type Spawner = {
    template: Input<Artboard<Data.Particle>>,
    pool: {Artboard<Data.Particle>},
    active: {Artboard<Data.Particle>},
}

local POOL_SIZE = 100

function init(self: Spawner)
    -- Pre-allocate the pool
    for i = 1, POOL_SIZE do
        local instance = self.template:instance()
        table.insert(self.pool, instance)
    end
    return true
end

function spawnParticle(self: Spawner)
    if #self.pool > 0 then
        -- Take one from the pool and move it to the active list
        local particle = table.remove(self.pool, 1)
        table.insert(self.active, particle)
        -- Reset its state (position, timer, etc.)
        -- resetParticleState(particle) -- Helper function assumed
    end
end

function advance(self: Spawner, seconds: number)
    -- Iterate backwards over active particles (See [Pitfall 44.4](#444-pitfall-modifying-tables-during-forward-iteration))
    for i = #self.active, 1, -1 do
        local particle = self.active[i]
        particle:advance(seconds)

        -- Check if the particle should be recycled
        if isParticleDead(particle) then -- Helper function assumed
            -- Remove from active list
            table.remove(self.active, i)
            -- Return to the pool
            table.insert(self.pool, particle)
        end
    end
    return true
end

-- draw() function would only iterate over the 'active' table.
```

### 44. Common Pitfalls and Debugging Techniques

Recognizing common pitfalls helps avoid them and speeds up debugging.

#### 44.1. Pitfall: The Colon (:) vs. Dot (.) Mistake (OOP)

The most frequent error when using OOP in Luau.

```lua
-- Definition:
function MyClass:myMethod(value) ... end

-- Incorrect Call:
myInstance.myMethod(10) -- Uses dot instead of colon
```

- **Symptom**: Runtime error similar to "attempt to index number with '...'".
- **Cause**: When calling with a dot, `myInstance` is *not* passed as `self`. Inside the method, `self` becomes the first argument (`10`).
- **Solution**: Always use the colon syntax (`:`) when calling methods defined with a colon.

#### 44.2. Pitfall: Forgetting .value on Inputs

```lua
--!strict
type MyNode = { speed: Input<number> }

-- Incorrect Usage:
-- local movement = self.speed * seconds
```

- **Symptom**: Type error (strict mode) or runtime arithmetic error (non-strict mode).
- **Cause**: `self.speed` is the wrapper object (`Input<T>`), not the underlying number.
- **Solution**: Always access the underlying data using `self.speed.value`.

#### 44.3. Pitfall: Frame-Rate Dependent Motion

```lua
-- Incorrect Usage:
function advance(self, seconds)
    self.position.x += self.speed -- Missing * seconds
end
```

- **Symptom**: The animation plays faster on high-refresh-rate monitors.
- **Solution**: Always multiply speed by `seconds` (delta time) for continuous movement, or use the Fixed-Step Update pattern ([Part 6, Section 39](#39-advanced-technique-fixed-step-updates-game-logic-and-physics)).

#### 44.4. Pitfall: Modifying Tables During Forward Iteration

When managing lists of objects, you cannot safely remove an item from a table while iterating forward.

```lua
-- Unsafe removal during forward iteration
for i, projectile in ipairs(self.projectiles) do
    if projectile.isDead then
        -- This shifts the indices, causing the loop to skip the next item!
        table.remove(self.projectiles, i)
    end
end
```

**Solution**: Iterate backward when you need to remove items.

```lua
-- Safe removal during backward iteration
for i = #self.projectiles, 1, -1 do
    if self.projectiles[i].isDead then
        table.remove(self.projectiles, i)
    end
end
```

#### 44.5. Debugging Technique: Visual Debugging

Often, the hardest bugs involve complex math. Use the `draw` function to visualize the internal state.

- **Visualize Vectors**: Draw lines representing velocity or direction.
- **Visualize Bounding Boxes**: Draw the bounding rectangles used for calculations.
- **Visualize Points**: Draw small circles at target locations or intersection points.

#### 44.6. Debugging Technique: Profiling

Rive provides structural profiling that shows where your frame budget is being spent. This helps identify performance bottlenecks in:

- **Layout calculations**: Complex layouts or frequent resize calls
- **State Machine evaluation**: Transitions and condition checks
- **Script overhead**: Time spent in `advance`, `draw`, and `update` functions

To profile effectively:
1. Use the editor's built-in profiling tools when available
2. Measure time with `os.clock()` for specific code sections
3. Look for consistent frame time spikes rather than isolated outliers

```lua
function advance(self: MyNode, seconds: number): boolean
    local startTime = os.clock()

    -- Your expensive logic here

    local elapsed = os.clock() - startTime
    if elapsed > 0.001 then -- More than 1ms
        print(`Warning: advance took {elapsed * 1000:.2f}ms`)
    end
    return true
end
```

#### 44.7. Pitfall: Unbalanced Renderer State

Forgetting a `renderer:restore()` leaves the transformation or clipping state active for later draws. Symptoms include skewed or clipped rendering far from the source of the bug.

#### 44.8. Pitfall: Using late() Values Before Initialization

If a field is initialized with `late()`, it must be assigned a valid value before any read. Accessing it too early can cause runtime errors or invalid rendering.

### 45. Code Style and Readability

Adhering to consistent conventions improves collaboration and maintainability.

#### 45.1. Naming Conventions

- **Variables and Functions**: `camelCase` (e.g., `elapsedTime`, `calculateArea`).
- **Classes (Prototypes and Types)**: `PascalCase` (e.g., `Sprite`, `SpriteType`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_HEALTH`).
- **Private Members (OOP)**: Prefix with an underscore (`_`) by convention (e.g., `self._internalState`).

#### 45.2. Use Luau Enhancements

Leverage Luau features for cleaner code:

- **Compound Assignments**: `x += 1` instead of `x = x + 1`.
- **String Interpolation**: `` `Position: {x}` `` instead of `"Position: " .. x`.
- **Generalized Iteration**: `for k, v in myTable do` instead of `for k, v in pairs(myTable) do`.
- **If-Then-Else Expressions**: `local max = if a > b then a else b` instead of a multi-line conditional.
- **Number Separators**: `1_000_000` for readability in large numbers.

---

