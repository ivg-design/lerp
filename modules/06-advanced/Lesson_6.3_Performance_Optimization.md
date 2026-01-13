# Lesson 6.3: Performance & Optimization

## Learning Objectives
- Identify common performance pitfalls
- Cache graphics objects properly
- Minimize per-frame allocations
- Use object pooling effectively
- Profile and measure performance

---

## Performance Principles

1. **Create once, reuse often** - Path/Paint in init, not draw
2. **Minimize allocations** - Avoid creating tables/objects per frame
3. **Pool objects** - Reuse instances instead of creating/destroying
4. **Batch operations** - Reduce draw calls when possible

---

## Exercise 1: Object Creation Anti-Patterns ⭐

```lua
--!strict

export type AntiPatterns = {
    -- GOOD: Created once
    cachedPath: Path,
    cachedPaint: Paint,
}

function init(self: AntiPatterns): boolean
    -- ✅ GOOD: Create expensive objects once
    self.cachedPath = Path.new()
    self.cachedPath:moveTo(Vector.xy(0, 0))
    self.cachedPath:lineTo(Vector.xy(50, 0))
    self.cachedPath:lineTo(Vector.xy(50, 50))
    self.cachedPath:lineTo(Vector.xy(0, 50))
    self.cachedPath:close()

    self.cachedPaint = Paint.new()
    self.cachedPaint.style = "fill"
    self.cachedPaint.color = Color.rgb(100, 150, 255)

    return true
end

function draw(self: AntiPatterns, renderer: Renderer)
    -- ❌ BAD: Creating objects every frame!
    -- local badPath = Path.new()  -- Allocation every frame
    -- local badPaint = Paint.new()  -- Allocation every frame

    -- ✅ GOOD: Reuse cached objects
    renderer:save()
    renderer:transform(Mat2D.withTranslation(100, 100))
    renderer:drawPath(self.cachedPath, self.cachedPaint)
    renderer:restore()

    -- ✅ OK: Modify cached paint properties (no allocation)
    self.cachedPaint.color = Color.rgb(255, 100, 100)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(200, 100))
    renderer:drawPath(self.cachedPath, self.cachedPaint)
    renderer:restore()
end

return function(): Node<AntiPatterns>
    return {
        init = init,
        draw = draw,
        cachedPath = late(),
        cachedPaint = late(),
    }
end
```

---

## Exercise 2: Avoiding Per-Frame Allocations ⭐⭐

```lua
--!strict

export type AllocationAware = {
    -- Pre-allocated vectors for calculations
    tempVec: Vector,
    positions: {Vector},
    count: number,
}

function init(self: AllocationAware): boolean
    -- Pre-allocate storage
    self.count = 10
    self.positions = table.create(self.count)

    for i = 1, self.count do
        self.positions[i] = Vector.xy(i * 40, 100)
    end

    return true
end

function advance(self: AllocationAware, seconds: number): boolean
    -- ❌ BAD: Creating new Vector every frame
    -- for i, pos in self.positions do
    --     local newPos = Vector.xy(pos.x, pos.y + math.sin(os.clock()) * 10)
    --     self.positions[i] = newPos  -- New allocation!
    -- end

    -- ✅ GOOD: Modify in place when possible
    for i, pos in self.positions do
        -- If Vector allows modification:
        -- pos.y = 100 + math.sin(os.clock() + i) * 20

        -- If immutable, at least minimize allocations:
        local newY = 100 + math.sin(os.clock() + i) * 20
        if math.abs(pos.y - newY) > 0.1 then  -- Only update if changed
            self.positions[i] = Vector.xy(pos.x, newY)
        end
    end

    return true
end

return function(): Node<AllocationAware>
    return {
        init = init,
        advance = advance,
        tempVec = late(),
        positions = late(),
        count = late(),
    }
end
```

---

## Exercise 3: Conditional Updates ⭐⭐

```lua
--!strict

export type ConditionalUpdate = {
    path: Path,
    paint: Paint,
    lastWidth: number,
    width: Input<number>,
}

function init(self: ConditionalUpdate): boolean
    self.path = Path.new()
    self.paint = Paint.with({ style = "fill", color = Color.rgb(100, 200, 150) })
    self.lastWidth = -1  -- Force initial build
    return true
end

function update(self: ConditionalUpdate)
    -- Only rebuild when input actually changes
    local currentWidth = self.width.value

    if currentWidth ~= self.lastWidth then
        self.lastWidth = currentWidth
        rebuildPath(self, currentWidth)
        print(`Rebuilt path with width: {currentWidth}`)
    end
end

local function rebuildPath(self: ConditionalUpdate, w: number)
    self.path:reset()
    self.path:moveTo(Vector.xy(0, 0))
    self.path:lineTo(Vector.xy(w, 0))
    self.path:lineTo(Vector.xy(w, 50))
    self.path:lineTo(Vector.xy(0, 50))
    self.path:close()
end

function draw(self: ConditionalUpdate, renderer: Renderer)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(100, 100))
    renderer:drawPath(self.path, self.paint)
    renderer:restore()
end

return function(): Node<ConditionalUpdate>
    return {
        init = init,
        update = update,
        draw = draw,
        path = late(),
        paint = late(),
        lastWidth = late(),
        width = 100,
    }
end
```

---

## Exercise 4: Performance Measurement ⭐⭐⭐

```lua
--!strict

export type PerfMeasure = {
    frameTimes: {number},
    frameIndex: number,
    maxFrames: number,
}

function init(self: PerfMeasure): boolean
    self.maxFrames = 60
    self.frameTimes = table.create(self.maxFrames, 0)
    self.frameIndex = 1
    return true
end

function advance(self: PerfMeasure, seconds: number): boolean
    local startTime = os.clock()

    -- Your expensive logic here
    local sum = 0
    for i = 1, 1000 do
        sum += math.sin(i * 0.01)
    end

    local endTime = os.clock()
    local elapsed = (endTime - startTime) * 1000  -- ms

    -- Track frame time
    self.frameTimes[self.frameIndex] = elapsed
    self.frameIndex = (self.frameIndex % self.maxFrames) + 1

    -- Calculate average every second
    if self.frameIndex == 1 then
        local total = 0
        for _, t in self.frameTimes do
            total += t
        end
        local avg = total / self.maxFrames
        print(`Avg advance time: {avg:.3f}ms`)

        if avg > 16 then
            print("WARNING: Exceeding 60fps budget!")
        end
    end

    return true
end

return function(): Node<PerfMeasure>
    return {
        init = init,
        advance = advance,
        frameTimes = late(),
        frameIndex = late(),
        maxFrames = late(),
    }
end
```

---

## Performance Checklist

**Object Creation:**
- [ ] Path/Paint created in `init`, not `draw`
- [ ] No `Path.new()` or `Paint.new()` in frame loop
- [ ] Tables pre-allocated with `table.create()`

**Memory:**
- [ ] Object pooling for frequently created/destroyed items
- [ ] Backward iteration when removing from arrays
- [ ] Minimize temporary table creation

**Logic:**
- [ ] Only update when values change
- [ ] Use squared distance instead of distance (avoid sqrt)
- [ ] Cache expensive calculations

**Rendering:**
- [ ] Minimize draw calls
- [ ] Cull off-screen objects
- [ ] Use simpler paths when far away

---

## Next Module
**Module 7: Projects** - Put it all together!
