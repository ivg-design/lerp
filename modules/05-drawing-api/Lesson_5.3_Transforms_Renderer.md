# Lesson 5.3: Transforms & Renderer

## Learning Objectives
- Understand the coordinate system and transformation matrix
- Use save/restore for state management
- Apply translation, rotation, and scale transforms
- Combine transforms correctly (order matters!)
- Use clipping for masking effects

---

## The Coordinate System

Rive uses a standard 2D coordinate system:
- **Origin (0, 0)** - Top-left corner
- **X-axis** - Positive to the right
- **Y-axis** - Positive downward
- **Angles** - Measured in radians, clockwise from positive X

---

## Exercise 1: Save and Restore ⭐

**Critical Pattern**: Always pair `save()` with `restore()`.

```lua
--!strict

export type SaveRestore = {
    squarePath: Path,
    paint: Paint,
}

function init(self: SaveRestore): boolean
    self.squarePath = Path.new()
    self.squarePath:moveTo(Vector.xy(0, 0))
    self.squarePath:lineTo(Vector.xy(40, 0))
    self.squarePath:lineTo(Vector.xy(40, 40))
    self.squarePath:lineTo(Vector.xy(0, 40))
    self.squarePath:close()

    self.paint = Paint.with({ style = "fill", color = Color.rgb(100, 150, 255) })
    return true
end

function draw(self: SaveRestore, renderer: Renderer)
    -- WITHOUT save/restore - transforms accumulate (BAD!)
    -- renderer:transform(Mat2D.withTranslation(50, 50))
    -- renderer:drawPath(self.squarePath, self.paint)
    -- renderer:transform(Mat2D.withTranslation(100, 0))  -- Now at 150, 50
    -- renderer:drawPath(self.squarePath, self.paint)

    -- WITH save/restore - transforms are isolated (GOOD!)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(50, 50))
    renderer:drawPath(self.squarePath, self.paint)
    renderer:restore()

    renderer:save()
    renderer:transform(Mat2D.withTranslation(150, 50))  -- Independent
    renderer:drawPath(self.squarePath, self.paint)
    renderer:restore()

    -- Nested saves work like a stack
    renderer:save()  -- Push level 1
    renderer:transform(Mat2D.withTranslation(50, 150))

        renderer:save()  -- Push level 2
        renderer:transform(Mat2D.withTranslation(30, 30))
        self.paint.color = Color.rgb(255, 100, 100)
        renderer:drawPath(self.squarePath, self.paint)
        renderer:restore()  -- Back to level 1

    self.paint.color = Color.rgb(100, 255, 100)
    renderer:drawPath(self.squarePath, self.paint)
    renderer:restore()  -- Back to original
end

return function(): Node<SaveRestore>
    return {
        init = init,
        draw = draw,
        squarePath = late(),
        paint = late(),
    }
end
```

---

## Exercise 2: Translation ⭐

```lua
--!strict

export type Translation = {
    arrowPath: Path,
    paint: Paint,
    offset: number,
}

function init(self: Translation): boolean
    -- Arrow pointing right
    self.arrowPath = Path.new()
    self.arrowPath:moveTo(Vector.xy(0, 10))
    self.arrowPath:lineTo(Vector.xy(30, 10))
    self.arrowPath:lineTo(Vector.xy(30, 0))
    self.arrowPath:lineTo(Vector.xy(50, 15))
    self.arrowPath:lineTo(Vector.xy(30, 30))
    self.arrowPath:lineTo(Vector.xy(30, 20))
    self.arrowPath:lineTo(Vector.xy(0, 20))
    self.arrowPath:close()

    self.paint = Paint.with({ style = "fill", color = Color.rgb(255, 150, 50) })
    self.offset = 0
    return true
end

function advance(self: Translation, seconds: number): boolean
    self.offset += 100 * seconds
    if self.offset > 300 then self.offset = 0 end
    return true
end

function draw(self: Translation, renderer: Renderer)
    -- Static arrow
    renderer:save()
    renderer:transform(Mat2D.withTranslation(50, 50))
    renderer:drawPath(self.arrowPath, self.paint)
    renderer:restore()

    -- Animated horizontal translation
    renderer:save()
    renderer:transform(Mat2D.withTranslation(50 + self.offset, 120))
    self.paint.color = Color.rgb(50, 150, 255)
    renderer:drawPath(self.arrowPath, self.paint)
    renderer:restore()

    -- Animated diagonal translation
    renderer:save()
    renderer:transform(Mat2D.withTranslation(50 + self.offset, 190 + self.offset / 3))
    self.paint.color = Color.rgb(150, 255, 50)
    renderer:drawPath(self.arrowPath, self.paint)
    renderer:restore()
end

return function(): Node<Translation>
    return {
        init = init,
        advance = advance,
        draw = draw,
        arrowPath = late(),
        paint = late(),
        offset = late(),
    }
end
```

---

## Exercise 3: Rotation ⭐⭐

```lua
--!strict

export type Rotation = {
    rectPath: Path,
    paint: Paint,
    angle: number,
}

function init(self: Rotation): boolean
    -- Rectangle centered on origin
    self.rectPath = Path.new()
    self.rectPath:moveTo(Vector.xy(-30, -15))
    self.rectPath:lineTo(Vector.xy(30, -15))
    self.rectPath:lineTo(Vector.xy(30, 15))
    self.rectPath:lineTo(Vector.xy(-30, 15))
    self.rectPath:close()

    self.paint = Paint.with({ style = "fill", color = Color.rgb(100, 200, 255) })
    self.angle = 0
    return true
end

function advance(self: Rotation, seconds: number): boolean
    self.angle += 2 * seconds  -- 2 radians per second
    return true
end

function draw(self: Rotation, renderer: Renderer)
    -- Rotate around center (translate first, then rotate)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(150, 150))  -- Move origin
    renderer:transform(Mat2D.withRotation(self.angle))   -- Rotate around new origin
    renderer:drawPath(self.rectPath, self.paint)
    renderer:restore()

    -- Rotate around corner (different effect!)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(350, 150))
    renderer:transform(Mat2D.withRotation(self.angle))
    renderer:transform(Mat2D.withTranslation(30, 0))  -- Offset from center
    renderer:drawPath(self.rectPath, self.paint)
    renderer:restore()
end

return function(): Node<Rotation>
    return {
        init = init,
        advance = advance,
        draw = draw,
        rectPath = late(),
        paint = late(),
        angle = late(),
    }
end
```

---

## Exercise 4: Scale ⭐⭐

```lua
--!strict

export type Scale = {
    circlePath: Path,
    paint: Paint,
    scale: number,
    growing: boolean,
}

function init(self: Scale): boolean
    local r = 30
    local k = r * 0.5522847498
    self.circlePath = Path.new()
    self.circlePath:moveTo(Vector.xy(r, 0))
    self.circlePath:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.circlePath:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.circlePath:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.circlePath:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))

    self.paint = Paint.with({ style = "fill", color = Color.rgb(255, 100, 150) })
    self.scale = 1
    self.growing = true
    return true
end

function advance(self: Scale, seconds: number): boolean
    local speed = 0.5
    if self.growing then
        self.scale += speed * seconds
        if self.scale > 2 then self.growing = false end
    else
        self.scale -= speed * seconds
        if self.scale < 0.5 then self.growing = true end
    end
    return true
end

function draw(self: Scale, renderer: Renderer)
    -- Uniform scale
    renderer:save()
    renderer:transform(Mat2D.withTranslation(100, 150))
    renderer:transform(Mat2D.withScale(self.scale, self.scale))
    renderer:drawPath(self.circlePath, self.paint)
    renderer:restore()

    -- Non-uniform scale (stretch)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(250, 150))
    renderer:transform(Mat2D.withScale(self.scale, 1))  -- Only X
    self.paint.color = Color.rgb(100, 255, 150)
    renderer:drawPath(self.circlePath, self.paint)
    renderer:restore()

    -- Flip (negative scale)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(400, 150))
    renderer:transform(Mat2D.withScale(-1, 1))  -- Mirror horizontally
    self.paint.color = Color.rgb(150, 100, 255)
    renderer:drawPath(self.circlePath, self.paint)
    renderer:restore()
end

return function(): Node<Scale>
    return {
        init = init,
        advance = advance,
        draw = draw,
        circlePath = late(),
        paint = late(),
        scale = late(),
        growing = late(),
    }
end
```

---

## Exercise 5: Transform Order ⭐⭐⭐

**Critical**: Transform order matters! Transforms are applied right-to-left.

```lua
--!strict

export type TransformOrder = {
    rectPath: Path,
    paint1: Paint,
    paint2: Paint,
    angle: number,
}

function init(self: TransformOrder): boolean
    self.rectPath = Path.new()
    self.rectPath:moveTo(Vector.xy(0, 0))
    self.rectPath:lineTo(Vector.xy(60, 0))
    self.rectPath:lineTo(Vector.xy(60, 30))
    self.rectPath:lineTo(Vector.xy(0, 30))
    self.rectPath:close()

    self.paint1 = Paint.with({ style = "fill", color = Color.rgba(255, 100, 100, 200) })
    self.paint2 = Paint.with({ style = "fill", color = Color.rgba(100, 100, 255, 200) })
    self.angle = 0
    return true
end

function advance(self: TransformOrder, seconds: number): boolean
    self.angle += 1.5 * seconds
    return true
end

function draw(self: TransformOrder, renderer: Renderer)
    -- Order 1: Translate THEN Rotate
    -- Object moves to position, then rotates in place
    renderer:save()
    renderer:transform(Mat2D.withTranslation(150, 150))
    renderer:transform(Mat2D.withRotation(self.angle))
    renderer:drawPath(self.rectPath, self.paint1)
    renderer:restore()

    -- Order 2: Rotate THEN Translate
    -- Object rotates around origin, then translated position also rotates!
    renderer:save()
    renderer:transform(Mat2D.withRotation(self.angle))
    renderer:transform(Mat2D.withTranslation(150, 150))
    renderer:drawPath(self.rectPath, self.paint2)
    renderer:restore()

    -- Draw origin marker
    local originPaint = Paint.with({ style = "fill", color = Color.rgb(0, 0, 0) })
    local originPath = Path.new()
    originPath:moveTo(Vector.xy(-5, -5))
    originPath:lineTo(Vector.xy(5, -5))
    originPath:lineTo(Vector.xy(5, 5))
    originPath:lineTo(Vector.xy(-5, 5))
    originPath:close()
    renderer:drawPath(originPath, originPaint)
end

return function(): Node<TransformOrder>
    return {
        init = init,
        advance = advance,
        draw = draw,
        rectPath = late(),
        paint1 = late(),
        paint2 = late(),
        angle = late(),
    }
end
```

---

## Exercise 6: Clipping ⭐⭐⭐

```lua
--!strict

export type Clipping = {
    clipPath: Path,
    contentPath: Path,
    clipAngle: number,
}

function init(self: Clipping): boolean
    -- Circular clip region
    local r = 60
    local k = r * 0.5522847498
    self.clipPath = Path.new()
    self.clipPath:moveTo(Vector.xy(r, 0))
    self.clipPath:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.clipPath:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.clipPath:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.clipPath:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))

    -- Large content that will be clipped
    self.contentPath = Path.new()
    self.contentPath:moveTo(Vector.xy(-100, -100))
    self.contentPath:lineTo(Vector.xy(100, -100))
    self.contentPath:lineTo(Vector.xy(100, 100))
    self.contentPath:lineTo(Vector.xy(-100, 100))
    self.contentPath:close()

    self.clipAngle = 0
    return true
end

function advance(self: Clipping, seconds: number): boolean
    self.clipAngle += seconds
    return true
end

function draw(self: Clipping, renderer: Renderer)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(200, 150))

    -- Apply rotating clip
    renderer:save()
    renderer:transform(Mat2D.withRotation(self.clipAngle))
    renderer:clipPath(self.clipPath)

    -- Draw content (will be clipped)
    local paint = Paint.new()
    paint.style = "fill"
    paint.gradient = Gradient.linear(
        Vector.xy(-100, -100),
        Vector.xy(100, 100),
        {
            { position = 0, color = Color.rgb(255, 0, 0) },
            { position = 0.5, color = Color.rgb(0, 255, 0) },
            { position = 1, color = Color.rgb(0, 0, 255) },
        }
    )
    renderer:drawPath(self.contentPath, paint)

    renderer:restore()  -- Removes clip

    -- Draw clip outline (for reference)
    local outlinePaint = Paint.with({
        style = "stroke",
        thickness = 2,
        color = Color.rgb(0, 0, 0),
    })
    renderer:transform(Mat2D.withRotation(self.clipAngle))
    renderer:drawPath(self.clipPath, outlinePaint)

    renderer:restore()
end

return function(): Node<Clipping>
    return {
        init = init,
        advance = advance,
        draw = draw,
        clipPath = late(),
        contentPath = late(),
        clipAngle = late(),
    }
end
```

---

## Self-Assessment Checklist

- [ ] I always pair save() with restore()
- [ ] I understand transform order matters
- [ ] I can translate, rotate, and scale objects
- [ ] I can use clipping for masking effects
- [ ] I center objects before rotating for proper rotation

---

## Next Module
**Module 6: Advanced Patterns** - Pointer events, instantiation, and optimization
