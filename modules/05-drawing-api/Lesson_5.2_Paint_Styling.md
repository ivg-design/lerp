# Lesson 5.2: Paint & Styling

## Learning Objectives
- Master all Paint properties
- Create fills, strokes, and gradients
- Use blend modes for effects
- Apply feathering for soft edges
- Build complex visual styles

---

## The Paint Object

Paint defines HOW your paths look. It controls:
- **Color** - Solid color or gradient
- **Style** - Fill or stroke
- **Stroke properties** - Width, caps, joins
- **Blending** - How colors combine
- **Effects** - Feathering

---

## Exercise 1: Fill vs. Stroke ⭐

**Task**: Create the same path with different paint styles:

```lua
--!strict

export type FillStroke = {
    starPath: Path,
    fillPaint: Paint,
    strokePaint: Paint,
    bothPaint: Paint,
}

local function createStar(cx: number, cy: number, outerR: number, innerR: number, points: number): Path
    local path = Path.new()
    local angleStep = math.pi / points

    for i = 0, points * 2 - 1 do
        local r = if i % 2 == 0 then outerR else innerR
        local angle = i * angleStep - math.pi / 2

        local x = cx + r * math.cos(angle)
        local y = cy + r * math.sin(angle)

        if i == 0 then
            path:moveTo(Vector.xy(x, y))
        else
            path:lineTo(Vector.xy(x, y))
        end
    end
    path:close()
    return path
end

function init(self: FillStroke): boolean
    -- Create star path
    self.starPath = createStar(0, 0, 50, 25, 5)

    -- Fill paint - solid interior
    self.fillPaint = Paint.new()
    self.fillPaint.style = "fill"
    self.fillPaint.color = Color.rgba(255, 200, 50, 255)

    -- Stroke paint - outline only
    self.strokePaint = Paint.new()
    self.strokePaint.style = "stroke"
    self.strokePaint.color = Color.rgba(200, 100, 0, 255)
    self.strokePaint.thickness = 4
    self.strokePaint.join = "round"  -- Round corners

    -- Paint for fill AND stroke (draw twice)
    self.bothPaint = Paint.new()

    return true
end

function draw(self: FillStroke, renderer: Renderer)
    -- Star 1: Fill only
    renderer:save()
    renderer:transform(Mat2D.withTranslation(100, 100))
    renderer:drawPath(self.starPath, self.fillPaint)
    renderer:restore()

    -- Star 2: Stroke only
    renderer:save()
    renderer:transform(Mat2D.withTranslation(250, 100))
    renderer:drawPath(self.starPath, self.strokePaint)
    renderer:restore()

    -- Star 3: Both (fill first, then stroke on top)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(400, 100))
    renderer:drawPath(self.starPath, self.fillPaint)
    renderer:drawPath(self.starPath, self.strokePaint)
    renderer:restore()
end

return function(): Node<FillStroke>
    return {
        init = init,
        draw = draw,
        starPath = late(),
        fillPaint = late(),
        strokePaint = late(),
        bothPaint = late(),
    }
end
```

---

## Exercise 2: Stroke Properties ⭐⭐

**Task**: Explore stroke caps and joins:

```lua
--!strict

export type StrokeProps = {
    linePath: Path,
    cornerPath: Path,
}

function init(self: StrokeProps): boolean
    -- Line for caps demo
    self.linePath = Path.new()
    self.linePath:moveTo(Vector.xy(0, 0))
    self.linePath:lineTo(Vector.xy(100, 0))

    -- Corner for joins demo
    self.cornerPath = Path.new()
    self.cornerPath:moveTo(Vector.xy(0, 0))
    self.cornerPath:lineTo(Vector.xy(50, 50))
    self.cornerPath:lineTo(Vector.xy(100, 0))

    return true
end

function draw(self: StrokeProps, renderer: Renderer)
    local caps = {"butt", "round", "square"}
    local joins = {"miter", "round", "bevel"}

    -- Draw cap examples
    for i, cap in caps do
        local paint = Paint.with({
            style = "stroke",
            thickness = 20,
            cap = cap,
            color = Color.rgba(100, 150, 255, 255)
        })

        renderer:save()
        renderer:transform(Mat2D.withTranslation(50, 50 + (i - 1) * 60))

        -- Draw the line
        renderer:drawPath(self.linePath, paint)

        -- Draw endpoints for reference
        local dotPaint = Paint.with({
            style = "fill",
            color = Color.rgba(255, 0, 0, 255)
        })
        local dot = Path.new()
        dot:moveTo(Vector.xy(-3, -3))
        dot:lineTo(Vector.xy(3, -3))
        dot:lineTo(Vector.xy(3, 3))
        dot:lineTo(Vector.xy(-3, 3))
        dot:close()

        renderer:drawPath(dot, dotPaint)
        renderer:transform(Mat2D.withTranslation(100, 0))
        renderer:drawPath(dot, dotPaint)

        renderer:restore()
    end

    -- Draw join examples
    for i, join in joins do
        local paint = Paint.with({
            style = "stroke",
            thickness = 20,
            join = join,
            color = Color.rgba(255, 150, 100, 255)
        })

        renderer:save()
        renderer:transform(Mat2D.withTranslation(250, 50 + (i - 1) * 80))
        renderer:drawPath(self.cornerPath, paint)
        renderer:restore()
    end
end

return function(): Node<StrokeProps>
    return {
        init = init,
        draw = draw,
        linePath = late(),
        cornerPath = late(),
    }
end
```

**Stroke Caps**:
- `butt` - Flat end at the exact endpoint
- `round` - Semicircle end
- `square` - Flat end extended by half thickness

**Stroke Joins**:
- `miter` - Sharp corner (may be clipped at extreme angles)
- `round` - Rounded corner
- `bevel` - Flat corner

---

## Exercise 3: Gradients ⭐⭐

**Task**: Create linear and radial gradients:

```lua
--!strict

export type GradientDemo = {
    rectPath: Path,
    circlePath: Path,
}

function init(self: GradientDemo): boolean
    -- Rectangle for linear gradient
    self.rectPath = Path.new()
    self.rectPath:moveTo(Vector.xy(0, 0))
    self.rectPath:lineTo(Vector.xy(150, 0))
    self.rectPath:lineTo(Vector.xy(150, 100))
    self.rectPath:lineTo(Vector.xy(0, 100))
    self.rectPath:close()

    -- Circle for radial gradient
    local r = 60
    local k = r * 0.5522847498
    self.circlePath = Path.new()
    self.circlePath:moveTo(Vector.xy(r, 0))
    self.circlePath:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.circlePath:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.circlePath:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.circlePath:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))

    return true
end

function draw(self: GradientDemo, renderer: Renderer)
    -- Linear gradient: left to right
    local linearPaint = Paint.new()
    linearPaint.style = "fill"
    linearPaint.gradient = Gradient.linear(
        Vector.xy(0, 0),
        Vector.xy(150, 0),
        {
            { position = 0, color = Color.rgba(255, 0, 0, 255) },
            { position = 0.5, color = Color.rgba(255, 255, 0, 255) },
            { position = 1, color = Color.rgba(0, 255, 0, 255) },
        }
    )

    renderer:save()
    renderer:transform(Mat2D.withTranslation(50, 50))
    renderer:drawPath(self.rectPath, linearPaint)
    renderer:restore()

    -- Linear gradient: diagonal
    local diagonalPaint = Paint.new()
    diagonalPaint.style = "fill"
    diagonalPaint.gradient = Gradient.linear(
        Vector.xy(0, 0),
        Vector.xy(150, 100),
        {
            { position = 0, color = Color.rgba(100, 0, 200, 255) },
            { position = 1, color = Color.rgba(0, 200, 255, 255) },
        }
    )

    renderer:save()
    renderer:transform(Mat2D.withTranslation(50, 170))
    renderer:drawPath(self.rectPath, diagonalPaint)
    renderer:restore()

    -- Radial gradient: center to edge
    local radialPaint = Paint.new()
    radialPaint.style = "fill"
    radialPaint.gradient = Gradient.radial(
        Vector.xy(0, 0),
        60,
        {
            { position = 0, color = Color.rgba(255, 255, 255, 255) },
            { position = 0.7, color = Color.rgba(255, 200, 100, 255) },
            { position = 1, color = Color.rgba(200, 50, 0, 255) },
        }
    )

    renderer:save()
    renderer:transform(Mat2D.withTranslation(320, 130))
    renderer:drawPath(self.circlePath, radialPaint)
    renderer:restore()

    -- Radial with offset center (spotlight effect)
    local spotlightPaint = Paint.new()
    spotlightPaint.style = "fill"
    spotlightPaint.gradient = Gradient.radial(
        Vector.xy(-20, -20),  -- Offset center
        80,
        {
            { position = 0, color = Color.rgba(255, 255, 255, 255) },
            { position = 1, color = Color.rgba(50, 50, 100, 255) },
        }
    )

    renderer:save()
    renderer:transform(Mat2D.withTranslation(480, 130))
    renderer:drawPath(self.circlePath, spotlightPaint)
    renderer:restore()
end

return function(): Node<GradientDemo>
    return {
        init = init,
        draw = draw,
        rectPath = late(),
        circlePath = late(),
    }
end
```

---

## Exercise 4: Blend Modes ⭐⭐⭐

**Task**: Explore how colors combine:

```lua
--!strict

export type BlendModes = {
    basePath: Path,
    overlayPath: Path,
}

function init(self: BlendModes): boolean
    -- Base rectangle
    self.basePath = Path.new()
    self.basePath:moveTo(Vector.xy(0, 0))
    self.basePath:lineTo(Vector.xy(80, 0))
    self.basePath:lineTo(Vector.xy(80, 80))
    self.basePath:lineTo(Vector.xy(0, 80))
    self.basePath:close()

    -- Overlay circle
    local r = 30
    local k = r * 0.5522847498
    self.overlayPath = Path.new()
    self.overlayPath:moveTo(Vector.xy(r, 0))
    self.overlayPath:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.overlayPath:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.overlayPath:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.overlayPath:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))

    return true
end

function draw(self: BlendModes, renderer: Renderer)
    local blendModes = {
        "srcOver",   -- Default
        "multiply",  -- Darken
        "screen",    -- Lighten
        "overlay",   -- Contrast
    }

    local basePaint = Paint.with({
        style = "fill",
        color = Color.rgba(255, 100, 100, 255),
    })

    for i, mode in blendModes do
        local col = (i - 1) % 2
        local row = math.floor((i - 1) / 2)
        local x = 50 + col * 120
        local y = 50 + row * 120

        renderer:save()
        renderer:transform(Mat2D.withTranslation(x, y))

        -- Draw base rectangle
        renderer:drawPath(self.basePath, basePaint)

        -- Draw overlay with blend mode
        local overlayPaint = Paint.new()
        overlayPaint.style = "fill"
        overlayPaint.color = Color.rgba(100, 100, 255, 200)
        overlayPaint.blendMode = mode

        renderer:transform(Mat2D.withTranslation(40, 40))
        renderer:drawPath(self.overlayPath, overlayPaint)

        renderer:restore()
    end
end

return function(): Node<BlendModes>
    return {
        init = init,
        draw = draw,
        basePath = late(),
        overlayPath = late(),
    }
end
```

---

## Exercise 5: Feathering (Soft Edges) ⭐⭐

**Task**: Create soft-edged shapes:

```lua
--!strict

export type FeatherDemo = {
    circlePath: Path,
}

function init(self: FeatherDemo): boolean
    local r = 40
    local k = r * 0.5522847498
    self.circlePath = Path.new()
    self.circlePath:moveTo(Vector.xy(r, 0))
    self.circlePath:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.circlePath:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.circlePath:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.circlePath:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))

    return true
end

function draw(self: FeatherDemo, renderer: Renderer)
    local featherAmounts = {0, 5, 10, 20, 40}

    for i, feather in featherAmounts do
        local paint = Paint.new()
        paint.style = "fill"
        paint.color = Color.rgba(100, 150, 255, 255)
        paint.feather = feather

        renderer:save()
        renderer:transform(Mat2D.withTranslation(80 + (i - 1) * 100, 100))
        renderer:drawPath(self.circlePath, paint)
        renderer:restore()
    end

    -- Feathered glow effect
    local glowPaint = Paint.new()
    glowPaint.style = "fill"
    glowPaint.color = Color.rgba(255, 200, 50, 100)
    glowPaint.feather = 30

    renderer:save()
    renderer:transform(Mat2D.withTranslation(250, 250))
    -- Draw glow first (larger, feathered)
    renderer:transform(Mat2D.withScale(1.5, 1.5))
    renderer:drawPath(self.circlePath, glowPaint)
    renderer:restore()

    -- Draw solid circle on top
    local solidPaint = Paint.with({
        style = "fill",
        color = Color.rgba(255, 200, 50, 255),
    })
    renderer:save()
    renderer:transform(Mat2D.withTranslation(250, 250))
    renderer:drawPath(self.circlePath, solidPaint)
    renderer:restore()
end

return function(): Node<FeatherDemo>
    return {
        init = init,
        draw = draw,
        circlePath = late(),
    }
end
```

---

## Comprehension Check

1. **What's the difference between `fill` and `stroke` styles?**
2. **How do stroke `cap` and `join` properties differ?**
3. **What are the two types of gradients?**
4. **What does `feather` do?**

---

## Self-Assessment Checklist

- [ ] I can create fill and stroke paints
- [ ] I understand stroke caps (butt, round, square)
- [ ] I understand stroke joins (miter, round, bevel)
- [ ] I can create linear and radial gradients
- [ ] I can use blend modes for effects
- [ ] I can apply feathering for soft edges

---

## Next Lesson
**Lesson 5.3: Transforms & Renderer** - Master coordinate transformations
