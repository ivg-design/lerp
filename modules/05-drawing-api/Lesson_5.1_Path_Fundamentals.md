# Lesson 5.1: Path Fundamentals

## Learning Objectives
- Create paths using Path commands
- Draw basic shapes: lines, rectangles, circles
- Understand the path "pen" metaphor
- Use the draw lifecycle function

---

## The Drawing Pipeline

In Rive scripting, custom drawing follows three steps:

1. **Path** - Define the geometry (WHAT to draw)
2. **Paint** - Define the appearance (HOW it looks)
3. **Renderer** - Execute the drawing (WHERE to draw)

```lua
-- In init: Create reusable objects
self.path = Path.new()
self.paint = Paint.new()

-- In draw: Use them
renderer:drawPath(self.path, self.paint)
```

---

## Exercise 1: Draw a Line ⭐

**Task**: Draw a simple diagonal line.

```lua
--!strict

export type DrawLine = {
    linePath: Path,
    linePaint: Paint,
}

function init(self: DrawLine): boolean
    -- Create the path
    self.linePath = Path.new()
    self.linePath:moveTo(Vector.xy(50, 50))   -- Start point
    self.linePath:lineTo(Vector.xy(200, 150)) -- End point
    
    -- Create the paint
    self.linePaint = Paint.new()
    self.linePaint.style = "stroke"
    self.linePaint.color = Color.rgba(255, 0, 0, 255)  -- Red
    self.linePaint.thickness = 3
    
    print("Line path created!")
    return true
end

function draw(self: DrawLine, renderer: Renderer)
    renderer:drawPath(self.linePath, self.linePaint)
end

return function(): Node<DrawLine>
    return {
        init = init,
        draw = draw,
        linePath = late(),
        linePaint = late(),
    }
end
```

**Test it:**
1. Create this script
2. Attach to an empty group or shape
3. Press Play - you should see a red diagonal line!

**Modify:**
- Change the start and end points
- Change the color to blue (0, 0, 255)
- Change thickness to 10

---

## Exercise 2: Draw a Rectangle ⭐

**Task**: Draw a filled rectangle using path commands.

```lua
--!strict

export type DrawRect = {
    rectPath: Path,
    rectPaint: Paint,
}

function init(self: DrawRect): boolean
    local x = 50
    local y = 50
    local width = 150
    local height = 100
    
    self.rectPath = Path.new()
    -- A rectangle is 4 lines + close
    self.rectPath:moveTo(Vector.xy(x, y))
    self.rectPath:lineTo(Vector.xy(x + width, y))
    self.rectPath:lineTo(Vector.xy(x + width, y + height))
    self.rectPath:lineTo(Vector.xy(x, y + height))
    self.rectPath:close()  -- Connect back to start
    
    self.rectPaint = Paint.new()
    self.rectPaint.style = "fill"  -- Filled, not stroked
    self.rectPaint.color = Color.rgba(0, 150, 255, 255)  -- Blue
    
    return true
end

function draw(self: DrawRect, renderer: Renderer)
    renderer:drawPath(self.rectPath, self.rectPaint)
end

return function(): Node<DrawRect>
    return {
        init = init,
        draw = draw,
        rectPath = late(),
        rectPaint = late(),
    }
end
```

**Now add a stroke outline:**
Create a second paint for the stroke and draw the path twice!

```lua
-- In init:
self.strokePaint = Paint.new()
self.strokePaint.style = "stroke"
self.strokePaint.color = Color.rgba(0, 50, 100, 255)
self.strokePaint.thickness = 4

-- In draw:
renderer:drawPath(self.rectPath, self.rectPaint)   -- Fill first
renderer:drawPath(self.rectPath, self.strokePaint) -- Then stroke
```

---

## Exercise 3: Create a Helper Function ⭐⭐

**Task**: Create reusable shape-building functions.

```lua
--!strict

-- Helper function to build a rectangle path
local function buildRectPath(path: Path, x: number, y: number, w: number, h: number)
    path:reset()  -- Clear any existing path data
    path:moveTo(Vector.xy(x, y))
    path:lineTo(Vector.xy(x + w, y))
    path:lineTo(Vector.xy(x + w, y + h))
    path:lineTo(Vector.xy(x, y + h))
    path:close()
end

-- YOUR TASK: Create a buildCirclePath function
-- Hint: A circle is approximated with many line segments
-- Use math.cos and math.sin
local function buildCirclePath(path: Path, cx: number, cy: number, radius: number, segments: number)
    path:reset()
    -- YOUR CODE HERE
    -- For i = 0 to segments:
    --   angle = (i / segments) * 2 * math.pi
    --   x = cx + radius * math.cos(angle)
    --   y = cy + radius * math.sin(angle)
    --   if i == 0 then moveTo else lineTo
    -- close()
end

export type ShapeHelper = {
    rectPath: Path,
    circlePath: Path,
    fillPaint: Paint,
    strokePaint: Paint,
}

function init(self: ShapeHelper): boolean
    self.rectPath = Path.new()
    self.circlePath = Path.new()
    
    -- Build shapes using helpers
    buildRectPath(self.rectPath, 50, 50, 100, 80)
    buildCirclePath(self.circlePath, 250, 100, 50, 32)  -- 32 segments
    
    self.fillPaint = Paint.new()
    self.fillPaint.style = "fill"
    self.fillPaint.color = Color.rgba(100, 200, 100, 255)  -- Green
    
    self.strokePaint = Paint.new()
    self.strokePaint.style = "stroke"
    self.strokePaint.color = Color.rgba(0, 100, 0, 255)
    self.strokePaint.thickness = 3
    
    return true
end

function draw(self: ShapeHelper, renderer: Renderer)
    -- Draw rectangle
    renderer:drawPath(self.rectPath, self.fillPaint)
    renderer:drawPath(self.rectPath, self.strokePaint)
    
    -- Draw circle
    renderer:drawPath(self.circlePath, self.fillPaint)
    renderer:drawPath(self.circlePath, self.strokePaint)
end

return function(): Node<ShapeHelper>
    return {
        init = init,
        draw = draw,
        rectPath = late(),
        circlePath = late(),
        fillPaint = late(),
        strokePaint = late(),
    }
end
```

---

## Exercise 4: Animated Shape ⭐⭐

**Task**: Make a shape that changes over time.

```lua
--!strict

export type AnimatedRect = {
    path: Path,
    paint: Paint,
    time: number,
    baseWidth: number,
    baseHeight: number,
}

function init(self: AnimatedRect): boolean
    self.path = Path.new()
    self.paint = Paint.new()
    self.paint.style = "fill"
    self.paint.color = Color.rgba(255, 100, 50, 255)
    
    self.time = 0
    self.baseWidth = 100
    self.baseHeight = 60
    
    return true
end

function advance(self: AnimatedRect, seconds: number): boolean
    self.time += seconds
    
    -- Animate width using sine wave
    local widthScale = 1 + 0.3 * math.sin(self.time * 2)
    local heightScale = 1 + 0.3 * math.cos(self.time * 2)
    
    local w = self.baseWidth * widthScale
    local h = self.baseHeight * heightScale
    
    -- Rebuild path with new dimensions
    -- Center the rect at (150, 100)
    local cx, cy = 150, 100
    
    self.path:reset()
    self.path:moveTo(Vector.xy(cx - w/2, cy - h/2))
    self.path:lineTo(Vector.xy(cx + w/2, cy - h/2))
    self.path:lineTo(Vector.xy(cx + w/2, cy + h/2))
    self.path:lineTo(Vector.xy(cx - w/2, cy + h/2))
    self.path:close()
    
    return true
end

function draw(self: AnimatedRect, renderer: Renderer)
    renderer:drawPath(self.path, self.paint)
end

return function(): Node<AnimatedRect>
    return {
        init = init,
        advance = advance,
        draw = draw,
        path = late(),
        paint = late(),
        time = 0,
        baseWidth = 100,
        baseHeight = 60,
    }
end
```

**Observe**: The rectangle should "breathe" - pulsing in and out!

---

## Exercise 5: Draw Multiple Shapes ⭐⭐

**Task**: Draw a simple scene with multiple elements.

```lua
--!strict

export type Scene = {
    groundPath: Path,
    housePath: Path,
    roofPath: Path,
    sunPath: Path,
    groundPaint: Paint,
    housePaint: Paint,
    roofPaint: Paint,
    sunPaint: Paint,
}

function init(self: Scene): boolean
    -- Ground (green rectangle at bottom)
    self.groundPath = Path.new()
    -- YOUR CODE: Rectangle from (0, 180) to (400, 220)
    
    -- House body (blue rectangle)
    self.housePath = Path.new()
    -- YOUR CODE: Rectangle at (100, 100) size 80x80
    
    -- Roof (red triangle)
    self.roofPath = Path.new()
    -- YOUR CODE: Triangle with points at (90, 100), (190, 100), (140, 50)
    
    -- Sun (yellow circle in top right)
    self.sunPath = Path.new()
    -- YOUR CODE: Circle centered at (320, 50) radius 30
    
    -- Create paints
    self.groundPaint = Paint.new()
    self.groundPaint.style = "fill"
    self.groundPaint.color = Color.rgba(50, 180, 50, 255)
    
    self.housePaint = Paint.new()
    self.housePaint.style = "fill"
    self.housePaint.color = Color.rgba(100, 150, 200, 255)
    
    self.roofPaint = Paint.new()
    self.roofPaint.style = "fill"
    self.roofPaint.color = Color.rgba(180, 50, 50, 255)
    
    self.sunPaint = Paint.new()
    self.sunPaint.style = "fill"
    self.sunPaint.color = Color.rgba(255, 220, 50, 255)
    
    return true
end

function draw(self: Scene, renderer: Renderer)
    -- Draw in order: back to front
    renderer:drawPath(self.sunPath, self.sunPaint)
    renderer:drawPath(self.groundPath, self.groundPaint)
    renderer:drawPath(self.housePath, self.housePaint)
    renderer:drawPath(self.roofPath, self.roofPaint)
end

return function(): Node<Scene>
    return {
        init = init,
        draw = draw,
        groundPath = late(),
        housePath = late(),
        roofPath = late(),
        sunPath = late(),
        groundPaint = late(),
        housePaint = late(),
        roofPaint = late(),
        sunPaint = late(),
    }
end
```

---

## Challenge: Procedural Star ⭐⭐⭐

**Task**: Create a function that draws a star with any number of points.

```lua
--!strict

-- Create a star path with N points
-- outerRadius: distance to star points
-- innerRadius: distance to inner corners
local function buildStarPath(
    path: Path, 
    cx: number, 
    cy: number, 
    points: number, 
    outerRadius: number, 
    innerRadius: number
)
    path:reset()
    
    -- A star alternates between outer and inner points
    -- Total vertices = points * 2
    -- Each vertex is at angle: (i / (points * 2)) * 2 * pi - pi/2 (start at top)
    
    -- YOUR CODE HERE
    
end

export type StarDemo = {
    star5: Path,
    star8: Path,
    paint: Paint,
}

function init(self: StarDemo): boolean
    self.star5 = Path.new()
    self.star8 = Path.new()
    
    -- 5-pointed star
    buildStarPath(self.star5, 100, 100, 5, 50, 20)
    
    -- 8-pointed star
    buildStarPath(self.star8, 250, 100, 8, 50, 30)
    
    self.paint = Paint.new()
    self.paint.style = "fill"
    self.paint.color = Color.rgba(255, 200, 0, 255)  -- Gold
    
    return true
end

function draw(self: StarDemo, renderer: Renderer)
    renderer:drawPath(self.star5, self.paint)
    renderer:drawPath(self.star8, self.paint)
end

return function(): Node<StarDemo>
    return {
        init = init,
        draw = draw,
        star5 = late(),
        star8 = late(),
        paint = late(),
    }
end
```

**Hint for star algorithm:**
```
for i = 0 to (points * 2):
    angle = (i / (points * 2)) * 2 * pi - pi/2
    radius = if i is even then outerRadius else innerRadius
    x = cx + radius * cos(angle)
    y = cy + radius * sin(angle)
```

---

## Key Path Commands Reference

| Command | Description |
|---------|-------------|
| `moveTo(Vector)` | Start new subpath at point |
| `lineTo(Vector)` | Draw line to point |
| `close()` | Close path to start |
| `reset()` | Clear all path data |

---

## Self-Assessment

- [ ] I can create a Path and Paint in init
- [ ] I understand moveTo vs lineTo
- [ ] I know to use close() for closed shapes
- [ ] I can use reset() to rebuild paths
- [ ] I understand draw order (back to front)

---

## Submit Your Results

Share screenshots of:
1. Your line drawing
2. Your rectangle with stroke
3. Your house scene
4. Your procedural stars (if completed)

I'll provide feedback on your drawing code!

---

## Next Lesson
**Lesson 5.2: Paint & Styling** - Colors, strokes, and gradients

