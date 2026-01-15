--[[
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║            VISUAL EXERCISE 3: Pointer Interactions                        ║
  ╠═══════════════════════════════════════════════════════════════════════════╣
  ║  Learn how to handle mouse/touch interactions in Rive scripts!            ║
  ║                                                                           ║
  ║  WHAT YOU'LL LEARN:                                                       ║
  ║  - Handling pointerDown, pointerMove, pointerUp events                    ║
  ║  - Hit testing with event:hit()                                           ║
  ║  - Tracking pointer position                                              ║
  ║  - Creating interactive buttons and draggable elements                    ║
  ║                                                                           ║
  ║  TO USE: Drag this script onto an object on "Exercise Stage"              ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
]]

--[[
  ═══════════════════════════════════════════════════════════════════════════
  KEY CONCEPT: Pointer Events
  ═══════════════════════════════════════════════════════════════════════════
  
  Rive provides these pointer event handlers:
  
    pointerDown(self, event)  -- Mouse/touch press
    pointerMove(self, event)  -- Mouse/touch move
    pointerUp(self, event)    -- Mouse/touch release  
    pointerExit(self, event)  -- Pointer left the area
  
  The event object contains:
    event.position   -- Vector with x,y in LOCAL coordinates
    event.id         -- Pointer ID (for multi-touch)
    event:hit()      -- Call this to "consume" the event (stop propagation)
]]

type InteractiveButton = {
    -- INPUTS
    normalColor: Input<Color>,
    hoverColor: Input<Color>,
    pressedColor: Input<Color>,
    size: Input<number>,
    
    -- INTERNAL STATE
    isHovered: boolean,
    isPressed: boolean,
    clickCount: number,
    currentColor: Color,
    pointerPosition: Vector,    -- Track where pointer is
    path: Path,
    paint: Paint,
}

-- Helper: Build a rounded rectangle
local function buildRoundedRect(path: Path, width: number, height: number, radius: number)
    local hw = width / 2
    local hh = height / 2
    local r = math.min(radius, math.min(hw, hh))
    local c = 0.5519150244935105707435627 * r
    
    path:reset()
    
    -- Start at top-left, after the corner
    path:moveTo(Vector.xy(-hw + r, -hh))
    
    -- Top edge and top-right corner
    path:lineTo(Vector.xy(hw - r, -hh))
    path:cubicTo(
        Vector.xy(hw - r + c, -hh),
        Vector.xy(hw, -hh + r - c),
        Vector.xy(hw, -hh + r)
    )
    
    -- Right edge and bottom-right corner
    path:lineTo(Vector.xy(hw, hh - r))
    path:cubicTo(
        Vector.xy(hw, hh - r + c),
        Vector.xy(hw - r + c, hh),
        Vector.xy(hw - r, hh)
    )
    
    -- Bottom edge and bottom-left corner
    path:lineTo(Vector.xy(-hw + r, hh))
    path:cubicTo(
        Vector.xy(-hw + r - c, hh),
        Vector.xy(-hw, hh - r + c),
        Vector.xy(-hw, hh - r)
    )
    
    -- Left edge and top-left corner
    path:lineTo(Vector.xy(-hw, -hh + r))
    path:cubicTo(
        Vector.xy(-hw, -hh + r - c),
        Vector.xy(-hw + r - c, -hh),
        Vector.xy(-hw + r, -hh)
    )
    
    path:close()
end

-- Helper: Check if a point is inside the button
local function isPointInside(point: Vector, size: number): boolean
    local half = size / 2
    return point.x >= -half and point.x <= half 
       and point.y >= -half and point.y <= half
end


function init(self: InteractiveButton, context: Context): boolean
    print("Visual Exercise 3: Interactive button ready!")
    print("  Click on me to see interactions!")
    
    self.paint = Paint.with({
        style = "fill",
        color = self.normalColor,
    })
    
    self.currentColor = self.normalColor
    buildRoundedRect(self.path, self.size, self.size * 0.6, 15)
    
    return true
end


-- Update visual state based on interaction
local function updateVisualState(self: InteractiveButton)
    if self.isPressed then
        self.currentColor = self.pressedColor
    elseif self.isHovered then
        self.currentColor = self.hoverColor
    else
        self.currentColor = self.normalColor
    end
    self.paint.color = self.currentColor
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  POINTER EVENT HANDLERS
  ═══════════════════════════════════════════════════════════════════════════
]]

function pointerDown(self: InteractiveButton, event: PointerEvent)
    -- Check if pointer is inside our button
    if isPointInside(event.position, self.size) then
        self.isPressed = true
        self.clickCount = self.clickCount + 1
        
        print("Button pressed! Click count:", self.clickCount)
        print("  Pointer position:", event.position.x, event.position.y)
        
        -- IMPORTANT: Call hit() to consume the event
        -- This prevents the event from propagating to objects behind us
        event:hit()
        
        updateVisualState(self)
    end
end


function pointerUp(self: InteractiveButton, event: PointerEvent)
    if self.isPressed then
        self.isPressed = false
        print("Button released!")
        
        -- Check if pointer is still inside (completed click vs drag away)
        if isPointInside(event.position, self.size) then
            print("  Valid click completed!")
        else
            print("  Click cancelled (dragged away)")
        end
        
        event:hit()
        updateVisualState(self)
    end
end


function pointerMove(self: InteractiveButton, event: PointerEvent)
    -- Track pointer position
    self.pointerPosition = event.position
    
    -- Update hover state
    local wasHovered = self.isHovered
    self.isHovered = isPointInside(event.position, self.size)
    
    -- Log state changes
    if self.isHovered and not wasHovered then
        print("Pointer entered button")
        event:hit()
    elseif not self.isHovered and wasHovered then
        print("Pointer left button")
    end
    
    updateVisualState(self)
end


function pointerExit(self: InteractiveButton, event: PointerEvent)
    -- Pointer left the entire node area
    self.isHovered = false
    self.isPressed = false
    print("Pointer exited")
    updateVisualState(self)
end


function update(self: InteractiveButton)
    buildRoundedRect(self.path, self.size, self.size * 0.6, 15)
    updateVisualState(self)
end


function draw(self: InteractiveButton, renderer: Renderer)
    renderer:drawPath(self.path, self.paint)
end


return function(): Node<InteractiveButton>
    return {
        -- Inputs
        normalColor = Color.rgb(80, 120, 200),     -- Blue
        hoverColor = Color.rgb(100, 150, 230),     -- Lighter blue
        pressedColor = Color.rgb(60, 90, 150),     -- Darker blue
        size = 150,
        
        -- Internal state
        isHovered = false,
        isPressed = false,
        clickCount = 0,
        currentColor = Color.rgb(80, 120, 200),
        pointerPosition = Vector.origin(),
        path = Path.new(),
        paint = Paint.new(),
        
        -- Lifecycle
        init = init,
        update = update,
        draw = draw,
        
        -- Pointer events
        pointerDown = pointerDown,
        pointerUp = pointerUp,
        pointerMove = pointerMove,
        pointerExit = pointerExit,
    }
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  CHALLENGES:
  ═══════════════════════════════════════════════════════════════════════════
  
  1. DRAGGABLE OBJECT: Make the shape follow the pointer when dragged
     Hint: Store the offset between pointer and shape center on pointerDown,
           then update position on pointerMove
  
  2. DOUBLE-CLICK DETECTION: Detect double-clicks
     Hint: Track the time of the last click, check if the new click
           is within 0.3 seconds
  
  3. TOGGLE BUTTON: Create a button that stays pressed until clicked again
     Hint: Add an 'isToggled' boolean state
  
  4. RIPPLE EFFECT: Create a Material Design-style ripple animation on click
     Hint: Store click position, animate an expanding circle with fading opacity
  
  5. SLIDER CONTROL: Create a draggable slider
     Hint: Constrain the dragged position to a horizontal line,
           output a value from 0-1 based on position
]]