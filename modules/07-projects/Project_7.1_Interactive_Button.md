# Project 7.1: Interactive Button Component

## Project Overview

Build a fully interactive button that:
- Responds to hover (pointer enter/exit)
- Responds to click (pointer down/up)
- Shows visual feedback (color changes, scale)
- Triggers actions via callbacks

**Estimated Time**: 2-3 hours

---

## Requirements

### Visual States
1. **Normal**: Base appearance
2. **Hover**: Slightly lighter color, subtle scale up
3. **Pressed**: Darker color, slight scale down
4. **Disabled**: Grayed out, no interaction

### Functionality
- Smooth transitions between states
- Click callback when released over button
- Sound/haptic feedback hooks (via print for now)

---

## Part 1: Basic Button Structure ⭐

Create the foundation:

```lua
--!strict

type ButtonState = "normal" | "hover" | "pressed" | "disabled"

export type InteractiveButton = {
    -- Visual
    buttonPath: Path,
    buttonPaint: Paint,
    
    -- State
    currentState: ButtonState,
    isEnabled: boolean,
    
    -- Dimensions
    x: number,
    y: number,
    width: number,
    height: number,
    
    -- Colors for each state
    normalColor: Color,
    hoverColor: Color,
    pressedColor: Color,
    disabledColor: Color,
    
    -- Animation
    currentScale: number,
    targetScale: number,
    currentColor: Color,
}

function init(self: InteractiveButton): boolean
    -- Initialize path and paint
    self.buttonPath = Path.new()
    self.buttonPaint = Paint.new()
    self.buttonPaint.style = "fill"
    
    -- Set initial state
    self.currentState = "normal"
    self.isEnabled = true
    self.currentScale = 1.0
    self.targetScale = 1.0
    self.currentColor = self.normalColor
    
    -- Build the button path
    rebuildPath(self)
    
    print("Button initialized!")
    return true
end

-- Helper to rebuild the button path
local function rebuildPath(self: InteractiveButton)
    local halfW = self.width / 2 * self.currentScale
    local halfH = self.height / 2 * self.currentScale
    local cx = self.x + self.width / 2
    local cy = self.y + self.height / 2
    
    self.buttonPath:reset()
    self.buttonPath:moveTo(Vector.xy(cx - halfW, cy - halfH))
    self.buttonPath:lineTo(Vector.xy(cx + halfW, cy - halfH))
    self.buttonPath:lineTo(Vector.xy(cx + halfW, cy + halfH))
    self.buttonPath:lineTo(Vector.xy(cx - halfW, cy + halfH))
    self.buttonPath:close()
end

-- YOUR TASK: Implement the draw function
function draw(self: InteractiveButton, renderer: Renderer)
    -- Update paint color
    -- Draw the path
end

return function(): Node<InteractiveButton>
    return {
        init = init,
        draw = draw,
        buttonPath = late(),
        buttonPaint = late(),
        currentState = "normal",
        isEnabled = true,
        x = 100,
        y = 100,
        width = 150,
        height = 50,
        normalColor = Color.rgba(70, 130, 200, 255),
        hoverColor = Color.rgba(100, 160, 230, 255),
        pressedColor = Color.rgba(50, 100, 170, 255),
        disabledColor = Color.rgba(150, 150, 150, 255),
        currentScale = 1.0,
        targetScale = 1.0,
        currentColor = late(),
    }
end
```

---

## Part 2: Pointer Events ⭐⭐

Add interaction handling:

```lua
-- Add these functions to your script:

local function isPointInButton(self: InteractiveButton, px: number, py: number): boolean
    -- Check if point is within button bounds
    local left = self.x
    local right = self.x + self.width
    local top = self.y
    local bottom = self.y + self.height
    
    return px >= left and px <= right and py >= top and py <= bottom
end

function onPointerDown(self: InteractiveButton, event: PointerEvent)
    if not self.isEnabled then return end
    
    if isPointInButton(self, event.position.x, event.position.y) then
        self.currentState = "pressed"
        self.targetScale = 0.95
        event:hit()
        print("Button pressed!")
    end
end

function onPointerUp(self: InteractiveButton, event: PointerEvent)
    if not self.isEnabled then return end
    
    if self.currentState == "pressed" then
        if isPointInButton(self, event.position.x, event.position.y) then
            -- Button was clicked!
            print("Button CLICKED!")
            self.currentState = "hover"
            self.targetScale = 1.05
        else
            self.currentState = "normal"
            self.targetScale = 1.0
        end
        event:hit()
    end
end

function onPointerMove(self: InteractiveButton, event: PointerEvent)
    if not self.isEnabled then return end
    if self.currentState == "pressed" then return end  -- Don't change while pressed
    
    -- YOUR TASK: Implement hover detection
    -- If pointer is over button: state = "hover", targetScale = 1.05
    -- If pointer leaves button: state = "normal", targetScale = 1.0
end

function onPointerExit(self: InteractiveButton, event: PointerEvent)
    if not self.isEnabled then return end
    
    -- YOUR TASK: Handle pointer leaving the entire area
end

-- Update factory function to include pointer handlers:
return function(): Node<InteractiveButton>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerDown = onPointerDown,
        pointerUp = onPointerUp,
        pointerMove = onPointerMove,
        pointerExit = onPointerExit,
        -- ... other properties
    }
end
```

---

## Part 3: Smooth Animations ⭐⭐

Add smooth transitions:

```lua
function advance(self: InteractiveButton, seconds: number): boolean
    -- Smoothly interpolate scale
    local scaleLerpSpeed = 10  -- Adjust for faster/slower
    self.currentScale = lerp(self.currentScale, self.targetScale, scaleLerpSpeed * seconds)
    
    -- Smoothly interpolate color
    local targetColor = getColorForState(self)
    self.currentColor = Color.lerp(self.currentColor, targetColor, scaleLerpSpeed * seconds)
    
    -- Rebuild path if scale changed significantly
    if math.abs(self.currentScale - self.targetScale) > 0.001 then
        rebuildPath(self)
    end
    
    return true
end

-- Linear interpolation helper
local function lerp(a: number, b: number, t: number): number
    return a + (b - a) * math.min(1, t)
end

-- Get target color based on state
local function getColorForState(self: InteractiveButton): Color
    if not self.isEnabled then
        return self.disabledColor
    end
    
    if self.currentState == "hover" then
        return self.hoverColor
    elseif self.currentState == "pressed" then
        return self.pressedColor
    else
        return self.normalColor
    end
end
```

---

## Part 4: Add Label (Optional) ⭐⭐⭐

If you want text on your button, you'll need to coordinate with a Text Run in your artboard:

```lua
-- Add to type definition:
export type InteractiveButton = {
    -- ... existing properties
    labelText: Input<string>,
}

-- In factory:
return function(): Node<InteractiveButton>
    return {
        -- ...
        labelText = "Click Me",
    }
end
```

Then in Rive Editor:
1. Add a Text Run over your button
2. Bind the Text content to a ViewModel property
3. Have your script update the ViewModel

---

## Part 5: Callbacks ⭐⭐⭐

Make the button reusable with callbacks:

```lua
-- Create a Util script for the Button class

--!strict
-- File: utils/Button.luau

local Button = {}
Button.__index = Button

export type ButtonType = {
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: (() -> ())?,  -- Optional callback
    onHover: (() -> ())?,
    -- ... other properties
}

function Button.new(config: {
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: (() -> ())?,
}): ButtonType
    local self = setmetatable({}, Button)
    self.x = config.x
    self.y = config.y
    self.width = config.width
    self.height = config.height
    self.onClick = config.onClick
    -- ... initialize other properties
    return (self :: any) :: ButtonType
end

function Button:handleClick()
    if self.onClick then
        self.onClick()
    end
end

return Button
```

---

## Testing Checklist

Test each state thoroughly:

- [ ] Normal state renders correctly
- [ ] Hover changes color and scale
- [ ] Press changes color and scale down
- [ ] Release over button triggers click
- [ ] Release outside button cancels click
- [ ] Disabled state prevents all interaction
- [ ] Transitions are smooth, not instant

---

## Bonus Challenges

1. **Rounded Corners**: Modify the path to use curves
2. **Shadow**: Draw a darker offset path behind
3. **Icon Support**: Add an optional icon to the button
4. **Focus State**: Add keyboard accessibility
5. **Ripple Effect**: Material Design-style click ripple

---

## Submit Your Project

When complete, share:
1. A video or GIF of your button in action
2. Your complete code
3. Any challenges you faced
4. What bonus features you added

I'll review your button component and provide detailed feedback!

---

## What You've Learned

This project combined:
- Path drawing for custom shapes
- Paint for colors
- Pointer events for interaction
- State management
- Animation with lerp
- (Optional) OOP patterns for reusability

These skills form the foundation for any interactive Rive component!

