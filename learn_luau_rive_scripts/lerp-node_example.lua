--[[
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║                    COMPLETE NODE SCRIPT EXAMPLE                           ║
  ╠═══════════════════════════════════════════════════════════════════════════╣
  ║  This is a fully working Node script that draws an animated circle.       ║
  ║  Study this to understand how all the pieces fit together!                ║
  ║                                                                           ║
  ║  To use: Drag this script onto any object in your Rive file               ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
]]

--[[
  STEP 1: Define helper functions
  --------------------------------
  These are reusable utilities for our Node.
]]

-- Helper function to create a circle path
local function createCirclePath(path: Path, center: Vector, radius: number)
    -- A circle is made of 4 cubic bezier curves
    -- The magic number 0.5519... creates a perfect circle approximation
    local c: number = 0.5519150244935105707435627 * radius
    
    path:reset()  -- Clear any existing path data
    
    -- Start at the right side of the circle
    path:moveTo(Vector.xy(center.x + radius, center.y))
    
    -- Draw 4 quarters of the circle
    path:cubicTo(
        Vector.xy(center.x + radius, center.y + c),
        Vector.xy(center.x + c, center.y + radius),
        Vector.xy(center.x, center.y + radius)
    )
    path:cubicTo(
        Vector.xy(center.x - c, center.y + radius),
        Vector.xy(center.x - radius, center.y + c),
        Vector.xy(center.x - radius, center.y)
    )
    path:cubicTo(
        Vector.xy(center.x - radius, center.y - c),
        Vector.xy(center.x - c, center.y - radius),
        Vector.xy(center.x, center.y - radius)
    )
    path:cubicTo(
        Vector.xy(center.x + c, center.y - radius),
        Vector.xy(center.x + radius, center.y - c),
        Vector.xy(center.x + radius, center.y)
    )
    
    path:close()
end


--[[
  STEP 2: Define the Node's state type
  -------------------------------------
  This type describes all the data our Node needs.
  
  - Input<T> means the property is exposed in Rive's UI for designers to configure
  - Regular properties are internal state
]]

type PulsingCircle = {
    -- INPUTS: Designers can configure these in Rive
    radius: Input<number>,           -- Base radius of the circle
    fillColor: Input<Color>,         -- Color of the circle
    pulseSpeed: Input<number>,       -- How fast it pulses (cycles per second)
    pulseAmount: Input<number>,      -- How much it grows/shrinks (0-1)
    
    -- INTERNAL STATE: Used by our code, not visible to designers
    path: Path,                       -- The circle's geometry
    paint: Paint,                     -- How to render it
    time: number,                     -- Accumulated time for animation
    currentRadius: number,            -- Current animated radius
}


--[[
  STEP 3: Implement the Node lifecycle functions
  -----------------------------------------------
]]

-- INIT: Called once when the Node is created
-- Return true to keep the node active, false to disable it
function init(self: PulsingCircle, context: Context): boolean
    print("PulsingCircle: Initializing!")
    
    -- Set up the paint (how to draw)
    self.paint = Paint.with({
        style = "fill",
        color = self.fillColor,
    })
    
    -- Initialize the path with current radius
    self.currentRadius = self.radius
    createCirclePath(self.path, Vector.origin(), self.currentRadius)
    
    print("PulsingCircle: radius =", self.radius, "color =", self.fillColor)
    
    return true  -- Keep the node active
end


-- ADVANCE: Called every frame with elapsed time
-- Return true to keep receiving advance calls
function advance(self: PulsingCircle, seconds: number): boolean
    -- Accumulate time
    self.time = self.time + seconds
    
    -- Calculate pulse using sine wave
    -- sin() returns -1 to 1, we map it to (1-pulseAmount) to (1+pulseAmount)
    local pulse = math.sin(self.time * self.pulseSpeed * math.pi * 2)
    local scale = 1 + (pulse * self.pulseAmount)
    
    -- Calculate new radius
    self.currentRadius = self.radius * scale
    
    -- Rebuild the path with the new radius
    createCirclePath(self.path, Vector.origin(), self.currentRadius)
    
    return true  -- Keep animating
end


-- UPDATE: Called when any input changes
-- Use this to respond to property changes from the Rive editor
function update(self: PulsingCircle)
    print("PulsingCircle: Input changed!")
    
    -- Update paint color in case it changed
    self.paint.color = self.fillColor
    
    -- Rebuild path in case radius changed
    createCirclePath(self.path, Vector.origin(), self.currentRadius)
end


-- DRAW: Called to render the node
-- The renderer draws in local coordinate space
function draw(self: PulsingCircle, renderer: Renderer)
    renderer:drawPath(self.path, self.paint)
end


--[[
  STEP 4: Export the factory function
  ------------------------------------
  This function creates new instances of our Node.
  It returns the initial state and all the lifecycle functions.
]]

return function(): Node<PulsingCircle>
    return {
        -- Default values for inputs (designers can override these)
        radius = 50,
        fillColor = Color.rgb(100, 150, 255),  -- Nice blue
        pulseSpeed = 1,                         -- 1 pulse per second
        pulseAmount = 0.2,                      -- 20% size change
        
        -- Initialize internal state
        path = Path.new(),
        paint = Paint.new(),
        time = 0,
        currentRadius = 50,
        
        -- Connect lifecycle functions
        init = init,
        advance = advance,
        update = update,
        draw = draw,
    }
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  TRY THESE EXPERIMENTS:
  ═══════════════════════════════════════════════════════════════════════════
  
  1. Change the default fillColor to red: Color.rgb(255, 0, 0)
  
  2. Add a stroke outline by creating a second paint:
     - Add a strokePaint property to the type
     - Initialize it with style = "stroke" in init()
     - Draw it in draw() after the fill
  
  3. Make the circle move! Add position animation:
     - Add positionX and positionY to the type
     - Update them in advance() using sin/cos
     - Use renderer:transform() before drawing
  
  4. Add pointer interaction:
     - Add a pointerDown function
     - Change color when clicked
]]