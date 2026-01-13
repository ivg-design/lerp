# Lesson 4.3: The Lifecycle (init/advance/draw)

## Learning Objectives
- Understand the exact order of lifecycle function calls
- Know what to do in each lifecycle phase
- Use delta time correctly for frame-rate independence
- Manage state across the lifecycle
- Handle initialization properly with `late()`

---

## The Node Lifecycle

When you create a Node script, Rive calls your functions in a specific order every frame:

```
┌─────────────────────────────────────────────────────┐
│  INITIALIZATION (once)                              │
│  ┌─────────────────────────────────────────────┐    │
│  │  init(self): boolean                        │    │
│  │  - Create Path, Paint objects               │    │
│  │  - Set initial state                        │    │
│  │  - Return true to continue, false to stop   │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│  FRAME LOOP (every frame)                          │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  update(self)  [OPTIONAL]                   │    │
│  │  - Called ONLY if inputs changed            │    │
│  │  - React to data binding changes            │    │
│  └─────────────────────────────────────────────┘    │
│                       ↓                             │
│  ┌─────────────────────────────────────────────┐    │
│  │  advance(self, seconds): boolean            │    │
│  │  - Game logic, physics, animation           │    │
│  │  - seconds = time since last frame          │    │
│  │  - Return true to continue, false to stop   │    │
│  └─────────────────────────────────────────────┘    │
│                       ↓                             │
│  ┌─────────────────────────────────────────────┐    │
│  │  draw(self, renderer)                       │    │
│  │  - Custom rendering                         │    │
│  │  - Called AFTER advance                     │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Exercise 1: Lifecycle Logging ⭐

**Context**: Observe the exact timing of lifecycle calls.

**Task**: Add logging to see the lifecycle in action:

```lua
--!strict

export type LifecycleLogger = {
    frameCount: number,
    testInput: Input<number>,
}

function init(self: LifecycleLogger): boolean
    print("[INIT] Called once at start")
    self.frameCount = 0
    return true
end

function update(self: LifecycleLogger)
    print(`[UPDATE] Input changed! New value: {self.testInput.value}`)
end

function advance(self: LifecycleLogger, seconds: number): boolean
    self.frameCount += 1

    -- Only log every 60 frames to avoid spam
    if self.frameCount % 60 == 0 then
        print(`[ADVANCE] Frame {self.frameCount}, delta: {seconds * 1000:.2f}ms`)
    end

    return true
end

function draw(self: LifecycleLogger, renderer: Renderer)
    -- Only log occasionally
    if self.frameCount % 60 == 0 then
        print(`[DRAW] Rendering frame {self.frameCount}`)
    end
end

return function(): Node<LifecycleLogger>
    return {
        init = init,
        update = update,
        advance = advance,
        draw = draw,
        frameCount = late(),
        testInput = 50,
    }
end
```

**What you should observe**:
1. `init` is called once
2. `advance` and `draw` are called every frame
3. `update` is ONLY called when you change the input value

---

## Exercise 2: Proper Initialization ⭐

**Context**: Creating objects in the right place is crucial for performance.

**Task**: Understand what belongs in `init` vs. elsewhere:

```lua
--!strict

export type ProperInit = {
    -- Graphics objects (create in init)
    circlePath: Path,
    fillPaint: Paint,
    strokePaint: Paint,

    -- State (initialize in init)
    elapsedTime: number,
    angle: number,

    -- Inputs (defaults in factory)
    radius: Input<number>,
    strokeWidth: Input<number>,
}

function init(self: ProperInit): boolean
    -- ✅ CORRECT: Create expensive objects once in init
    self.circlePath = Path.new()
    self.fillPaint = Paint.new()
    self.strokePaint = Paint.new()

    -- Configure paints
    self.fillPaint.style = "fill"
    self.fillPaint.color = Color.rgba(100, 150, 255, 128)

    self.strokePaint.style = "stroke"
    self.strokePaint.thickness = self.strokeWidth.value
    self.strokePaint.color = Color.rgba(50, 100, 200, 255)

    -- Initialize state
    self.elapsedTime = 0
    self.angle = 0

    -- Build initial path
    buildCirclePath(self)

    print("Initialization complete!")
    return true
end

-- ❌ WRONG: Don't create objects in advance or draw!
-- function advance(self: ProperInit, seconds: number): boolean
--     local tempPath = Path.new()  -- BAD! Creates garbage every frame
--     ...
-- end

function advance(self: ProperInit, seconds: number): boolean
    -- ✅ CORRECT: Only update state in advance
    self.elapsedTime += seconds
    self.angle = self.elapsedTime * 2  -- 2 radians per second

    return true
end

function update(self: ProperInit)
    -- ✅ CORRECT: Rebuild path when inputs change
    buildCirclePath(self)
    self.strokePaint.thickness = self.strokeWidth.value
end

local function buildCirclePath(self: ProperInit)
    local r = self.radius.value
    self.circlePath:reset()
    -- Approximate circle with bezier curves
    local kappa = 0.5522847498
    local k = r * kappa

    self.circlePath:moveTo(Vector.xy(r, 0))
    self.circlePath:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.circlePath:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.circlePath:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.circlePath:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))
end

function draw(self: ProperInit, renderer: Renderer)
    -- ✅ CORRECT: Only issue draw commands in draw
    renderer:save()
    renderer:transform(Mat2D.withTranslation(200, 200))
    renderer:transform(Mat2D.withRotation(self.angle))

    renderer:drawPath(self.circlePath, self.fillPaint)
    renderer:drawPath(self.circlePath, self.strokePaint)

    renderer:restore()
end

return function(): Node<ProperInit>
    return {
        init = init,
        update = update,
        advance = advance,
        draw = draw,
        circlePath = late(),
        fillPaint = late(),
        strokePaint = late(),
        elapsedTime = late(),
        angle = late(),
        radius = 50,
        strokeWidth = 3,
    }
end
```

---

## Exercise 3: Delta Time Mastery ⭐⭐

**Context**: Frame rates vary (30fps, 60fps, 144fps). Delta time ensures consistent behavior.

**Task**: Implement frame-rate independent motion:

```lua
--!strict

export type DeltaTimeDemo = {
    -- Position
    x: number,
    y: number,

    -- Movement properties
    speed: Input<number>,  -- pixels per SECOND

    -- For comparison
    wrongX: number,  -- Wrong: frame-rate dependent
}

function init(self: DeltaTimeDemo): boolean
    self.x = 0
    self.y = 100
    self.wrongX = 0
    print("Watch the two objects move...")
    return true
end

function advance(self: DeltaTimeDemo, seconds: number): boolean
    local speed = self.speed.value

    -- ✅ CORRECT: Multiply by seconds (delta time)
    -- This moves 'speed' pixels per SECOND, regardless of frame rate
    self.x += speed * seconds

    -- ❌ WRONG: Not using delta time
    -- This moves 'speed' pixels per FRAME
    -- At 60fps: moves 60*speed pixels/second
    -- At 30fps: moves 30*speed pixels/second
    self.wrongX += speed * 0.016  -- Assuming 60fps, but won't be correct at other rates

    -- Wrap around
    if self.x > 500 then self.x = 0 end
    if self.wrongX > 500 then self.wrongX = 0 end

    return true
end

function draw(self: DeltaTimeDemo, renderer: Renderer)
    local correctPaint = Paint.with({ style = "fill", color = Color.rgb(0, 255, 0) })
    local wrongPaint = Paint.with({ style = "fill", color = Color.rgb(255, 0, 0) })

    -- Draw correct (green) object
    local correctPath = Path.new()
    correctPath:moveTo(Vector.xy(self.x, self.y))
    correctPath:lineTo(Vector.xy(self.x + 30, self.y))
    correctPath:lineTo(Vector.xy(self.x + 30, self.y + 30))
    correctPath:lineTo(Vector.xy(self.x, self.y + 30))
    correctPath:close()
    renderer:drawPath(correctPath, correctPaint)

    -- Draw wrong (red) object
    local wrongPath = Path.new()
    wrongPath:moveTo(Vector.xy(self.wrongX, self.y + 50))
    wrongPath:lineTo(Vector.xy(self.wrongX + 30, self.y + 50))
    wrongPath:lineTo(Vector.xy(self.wrongX + 30, self.y + 80))
    wrongPath:lineTo(Vector.xy(self.wrongX, self.y + 80))
    wrongPath:close()
    renderer:drawPath(wrongPath, wrongPaint)
end

return function(): Node<DeltaTimeDemo>
    return {
        init = init,
        advance = advance,
        draw = draw,
        x = late(),
        y = late(),
        wrongX = late(),
        speed = 100,  -- 100 pixels per second
    }
end
```

**Formula**: `newPosition = oldPosition + velocity * deltaTime`

---

## Exercise 4: Stopping and Returning ⭐⭐

**Context**: `init` and `advance` return boolean values that control execution.

**Task**: Use return values to control lifecycle:

```lua
--!strict

export type ReturnValues = {
    countdown: number,
    finished: boolean,
}

function init(self: ReturnValues): boolean
    -- Return false to prevent the script from running at all
    local shouldRun = true  -- Change to false to test

    if not shouldRun then
        print("Init returned false - script won't run!")
        return false
    end

    self.countdown = 5
    self.finished = false
    print("Countdown starting...")
    return true
end

function advance(self: ReturnValues, seconds: number): boolean
    if self.finished then
        -- Script stopped, but this function still gets called if we return true
        return false  -- Stop receiving advance calls
    end

    self.countdown -= seconds

    if self.countdown <= 0 then
        print("Countdown complete!")
        self.finished = true
        -- Return false to stop further advance calls
        return false
    end

    -- Print countdown
    local remaining = math.ceil(self.countdown)
    print(`Time remaining: {remaining}`)

    return true  -- Continue receiving advance calls
end

function draw(self: ReturnValues, renderer: Renderer)
    -- draw is still called even after advance returns false!
    -- This lets you show a final state

    if self.finished then
        -- Draw "DONE" indicator
        local donePaint = Paint.with({
            style = "fill",
            color = Color.rgb(0, 255, 0)
        })
        -- ... draw something
    end
end

return function(): Node<ReturnValues>
    return {
        init = init,
        advance = advance,
        draw = draw,
        countdown = late(),
        finished = late(),
    }
end
```

---

## Exercise 5: Complete Lifecycle Example ⭐⭐⭐

**Context**: Build a pulsing circle that demonstrates all lifecycle phases.

**Task**: Implement a complete, well-structured script:

```lua
--!strict

export type PulsingCircle = {
    -- Configuration (inputs)
    baseRadius: Input<number>,
    pulseAmount: Input<number>,
    pulseSpeed: Input<number>,
    circleColor: Input<Color>,

    -- State (internal)
    time: number,
    currentRadius: number,

    -- Graphics (created in init)
    path: Path,
    paint: Paint,
}

-- PHASE 1: INITIALIZATION
function init(self: PulsingCircle): boolean
    print("[INIT] Creating graphics objects...")

    -- Create expensive objects ONCE
    self.path = Path.new()
    self.paint = Paint.new()
    self.paint.style = "fill"

    -- Initialize state
    self.time = 0
    self.currentRadius = self.baseRadius.value

    -- Initial setup
    updatePaint(self)
    buildPath(self)

    print("[INIT] Complete!")
    return true
end

-- PHASE 2: DATA BINDING RESPONSE
function update(self: PulsingCircle)
    print("[UPDATE] Input changed, updating...")
    updatePaint(self)
    -- Path will be rebuilt in advance based on new baseRadius
end

-- PHASE 3: LOGIC UPDATE
function advance(self: PulsingCircle, seconds: number): boolean
    -- Update time
    self.time += seconds

    -- Calculate pulsing radius
    local base = self.baseRadius.value
    local pulse = self.pulseAmount.value
    local speed = self.pulseSpeed.value

    -- Sine wave oscillation
    local oscillation = math.sin(self.time * speed) * pulse
    self.currentRadius = base + oscillation

    -- Rebuild path with new radius
    buildPath(self)

    return true
end

-- PHASE 4: RENDERING
function draw(self: PulsingCircle, renderer: Renderer)
    renderer:save()

    -- Center on screen
    renderer:transform(Mat2D.withTranslation(200, 200))

    -- Draw the circle
    renderer:drawPath(self.path, self.paint)

    renderer:restore()
end

-- Helper: Update paint from inputs
local function updatePaint(self: PulsingCircle)
    self.paint.color = self.circleColor.value
end

-- Helper: Build circle path with current radius
local function buildPath(self: PulsingCircle)
    local r = self.currentRadius
    local kappa = 0.5522847498
    local k = r * kappa

    self.path:reset()
    self.path:moveTo(Vector.xy(r, 0))
    self.path:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.path:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.path:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.path:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))
end

return function(): Node<PulsingCircle>
    return {
        init = init,
        update = update,
        advance = advance,
        draw = draw,
        -- Inputs with defaults
        baseRadius = 50,
        pulseAmount = 20,
        pulseSpeed = 3,
        circleColor = Color.rgba(100, 150, 255, 200),
        -- State (initialized in init)
        time = late(),
        currentRadius = late(),
        path = late(),
        paint = late(),
    }
end
```

---

## Comprehension Check

1. **What's the difference between `update` and `advance`?**

2. **Why should you NOT create Path/Paint objects in `draw`?**

3. **What happens if `init` returns `false`?**

4. **What happens if `advance` returns `false`?**

---

## Self-Assessment Checklist

- [ ] I understand the order: init → (update?) → advance → draw
- [ ] I know what code belongs in each lifecycle function
- [ ] I always multiply by `seconds` for movement
- [ ] I create Path/Paint objects in `init`, not every frame
- [ ] I understand the return values of `init` and `advance`

---

## Common Mistakes

1. **Creating objects in draw**: Creates garbage every frame, hurts performance
2. **Forgetting delta time**: Motion will vary with frame rate
3. **Logic in draw**: Draw should only render, not update state
4. **Expecting update every frame**: It's only called when inputs change

---

## Next Lesson
**Lesson 4.4: Util Scripts & Modules** - Create reusable code libraries
