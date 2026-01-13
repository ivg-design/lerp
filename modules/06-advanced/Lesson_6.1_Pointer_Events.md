# Lesson 6.1: Pointer Events & Interactivity

## Learning Objectives
- Handle pointer down, move, up, and exit events
- Use hit testing to detect clicks on shapes
- Implement drag and drop behavior
- Create interactive buttons and controls

---

## Pointer Event System

Node scripts can respond to pointer (mouse/touch) events:

| Event | When Called |
|-------|-------------|
| `pointerDown` | Pointer pressed |
| `pointerMove` | Pointer moved |
| `pointerUp` | Pointer released |
| `pointerExit` | Pointer left the node area |

---

## Exercise 1: Basic Click Detection ⭐

```lua
--!strict

export type ClickDetection = {
    clickCount: number,
    lastPosition: Vector?,
}

function onPointerDown(self: ClickDetection, event: PointerEvent)
    self.clickCount += 1
    self.lastPosition = event.position
    print(`Click #{self.clickCount} at ({event.position.x:.0f}, {event.position.y:.0f})`)
    event:hit()  -- Consume the event
end

function onPointerUp(self: ClickDetection, event: PointerEvent)
    print(`Released at ({event.position.x:.0f}, {event.position.y:.0f})`)
end

function init(self: ClickDetection): boolean
    self.clickCount = 0
    print("Click anywhere to test pointer events!")
    return true
end

return function(): Node<ClickDetection>
    return {
        init = init,
        pointerDown = onPointerDown,
        pointerUp = onPointerUp,
        clickCount = late(),
        lastPosition = late(),
    }
end
```

---

## Exercise 2: Shape Hit Testing ⭐⭐

```lua
--!strict

export type HitTesting = {
    buttonX: number,
    buttonY: number,
    buttonWidth: number,
    buttonHeight: number,
    isHovered: boolean,
    isPressed: boolean,
    buttonPath: Path,
    normalPaint: Paint,
    hoverPaint: Paint,
    pressedPaint: Paint,
}

local function isInButton(self: HitTesting, x: number, y: number): boolean
    return x >= self.buttonX and x <= self.buttonX + self.buttonWidth
       and y >= self.buttonY and y <= self.buttonY + self.buttonHeight
end

function onPointerDown(self: HitTesting, event: PointerEvent)
    if isInButton(self, event.position.x, event.position.y) then
        self.isPressed = true
        print("Button pressed!")
        event:hit()
    end
end

function onPointerUp(self: HitTesting, event: PointerEvent)
    if self.isPressed then
        if isInButton(self, event.position.x, event.position.y) then
            print("Button clicked!")
        end
        self.isPressed = false
        event:hit()
    end
end

function onPointerMove(self: HitTesting, event: PointerEvent)
    local wasHovered = self.isHovered
    self.isHovered = isInButton(self, event.position.x, event.position.y)

    if self.isHovered and not wasHovered then
        print("Entered button")
    elseif not self.isHovered and wasHovered then
        print("Left button")
    end
end

function init(self: HitTesting): boolean
    self.buttonX = 100
    self.buttonY = 100
    self.buttonWidth = 150
    self.buttonHeight = 50
    self.isHovered = false
    self.isPressed = false

    self.buttonPath = Path.new()
    self.buttonPath:moveTo(Vector.xy(0, 0))
    self.buttonPath:lineTo(Vector.xy(self.buttonWidth, 0))
    self.buttonPath:lineTo(Vector.xy(self.buttonWidth, self.buttonHeight))
    self.buttonPath:lineTo(Vector.xy(0, self.buttonHeight))
    self.buttonPath:close()

    self.normalPaint = Paint.with({ style = "fill", color = Color.rgb(100, 150, 255) })
    self.hoverPaint = Paint.with({ style = "fill", color = Color.rgb(130, 180, 255) })
    self.pressedPaint = Paint.with({ style = "fill", color = Color.rgb(70, 120, 200) })

    return true
end

function draw(self: HitTesting, renderer: Renderer)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(self.buttonX, self.buttonY))

    local paint = if self.isPressed then self.pressedPaint
                  elseif self.isHovered then self.hoverPaint
                  else self.normalPaint

    renderer:drawPath(self.buttonPath, paint)
    renderer:restore()
end

return function(): Node<HitTesting>
    return {
        init = init,
        draw = draw,
        pointerDown = onPointerDown,
        pointerUp = onPointerUp,
        pointerMove = onPointerMove,
        buttonX = late(), buttonY = late(),
        buttonWidth = late(), buttonHeight = late(),
        isHovered = late(), isPressed = late(),
        buttonPath = late(),
        normalPaint = late(), hoverPaint = late(), pressedPaint = late(),
    }
end
```

---

## Exercise 3: Dragging ⭐⭐⭐

```lua
--!strict

export type Draggable = {
    boxX: number,
    boxY: number,
    boxSize: number,
    isDragging: boolean,
    dragOffsetX: number,
    dragOffsetY: number,
    boxPath: Path,
    paint: Paint,
}

local function isInBox(self: Draggable, x: number, y: number): boolean
    return x >= self.boxX and x <= self.boxX + self.boxSize
       and y >= self.boxY and y <= self.boxY + self.boxSize
end

function onPointerDown(self: Draggable, event: PointerEvent)
    if isInBox(self, event.position.x, event.position.y) then
        self.isDragging = true
        self.dragOffsetX = event.position.x - self.boxX
        self.dragOffsetY = event.position.y - self.boxY
        event:hit()
    end
end

function onPointerMove(self: Draggable, event: PointerEvent)
    if self.isDragging then
        self.boxX = event.position.x - self.dragOffsetX
        self.boxY = event.position.y - self.dragOffsetY
        event:hit()
    end
end

function onPointerUp(self: Draggable, event: PointerEvent)
    if self.isDragging then
        self.isDragging = false
        print(`Dropped at ({self.boxX:.0f}, {self.boxY:.0f})`)
        event:hit()
    end
end

function init(self: Draggable): boolean
    self.boxX = 150
    self.boxY = 150
    self.boxSize = 80
    self.isDragging = false
    self.dragOffsetX = 0
    self.dragOffsetY = 0

    self.boxPath = Path.new()
    self.boxPath:moveTo(Vector.xy(0, 0))
    self.boxPath:lineTo(Vector.xy(self.boxSize, 0))
    self.boxPath:lineTo(Vector.xy(self.boxSize, self.boxSize))
    self.boxPath:lineTo(Vector.xy(0, self.boxSize))
    self.boxPath:close()

    self.paint = Paint.with({ style = "fill", color = Color.rgb(255, 150, 100) })
    print("Drag the orange box!")
    return true
end

function draw(self: Draggable, renderer: Renderer)
    renderer:save()
    renderer:transform(Mat2D.withTranslation(self.boxX, self.boxY))

    if self.isDragging then
        self.paint.color = Color.rgb(255, 200, 150)
    else
        self.paint.color = Color.rgb(255, 150, 100)
    end

    renderer:drawPath(self.boxPath, self.paint)
    renderer:restore()
end

return function(): Node<Draggable>
    return {
        init = init,
        draw = draw,
        pointerDown = onPointerDown,
        pointerMove = onPointerMove,
        pointerUp = onPointerUp,
        boxX = late(), boxY = late(), boxSize = late(),
        isDragging = late(), dragOffsetX = late(), dragOffsetY = late(),
        boxPath = late(), paint = late(),
    }
end
```

---

## Advanced: Creating and Forwarding Pointer Events

### PointerEvent Properties

| Property | Type | Description |
|----------|------|-------------|
| `position` | Vector | Pointer position in local coordinates |
| `id` | number | Unique pointer identifier (for multi-touch) |

### PointerEvent.new

Create pointer events programmatically:

```lua
local newEvent = PointerEvent.new(id, position)
```

### Forwarding Events to Nested Artboards

When you have instantiated artboards, Rive doesn't automatically propagate events. You must forward them manually:

```lua
function pointerDown(self: MyScript, event: PointerEvent)
    -- Transform position to child's coordinate space
    local childPos = transformToChild(event.position)

    -- Create new event for child
    local childEvent = PointerEvent.new(event.id, childPos)

    -- Forward to nested artboard
    local hitResult = self.childArtboard:pointerDown(childPos.x, childPos.y)

    if hitResult > 0 then
        event:hit()  -- Child handled it
    end
end
```

### hit() with Translucency

The `hit()` method accepts an optional parameter for translucent hit areas:

```lua
event:hit()           -- Standard: stops propagation
event:hit(true)       -- Translucent: may continue through semi-transparent elements
```

---

## Self-Assessment Checklist

- [ ] I can handle pointerDown, pointerMove, pointerUp events
- [ ] I can implement hit testing for shapes
- [ ] I can create hover states
- [ ] I can implement drag and drop
- [ ] I understand when to call event:hit()
- [ ] I can forward events to nested artboards

---

## Next Lesson
**Lesson 6.2: Dynamic Instantiation** - Create and manage runtime objects
