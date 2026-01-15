--[[
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║            VISUAL EXERCISE 2: Animation with advance()                    ║
  ╠═══════════════════════════════════════════════════════════════════════════╣
  ║  Learn how to create smooth animations using the advance() function!      ║
  ║                                                                           ║
  ║  WHAT YOU'LL LEARN:                                                       ║
  ║  - Using advance() for frame-by-frame updates                             ║
  ║  - Time-based animation (not frame-based)                                 ║
  ║  - Trigonometric functions for smooth motion                              ║
  ║  - Animating color, position, and scale                                   ║
  ║                                                                           ║
  ║  TO USE: Drag this script onto an object on "Exercise Stage"              ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
]]

--[[
  ═══════════════════════════════════════════════════════════════════════════
  KEY CONCEPT: Time-Based Animation
  ═══════════════════════════════════════════════════════════════════════════
  
  The advance() function receives 'seconds' - the time since the last frame.
  This is typically around 0.016 seconds (60 FPS) but can vary.
  
  ALWAYS use time for animations, never frame counts!
  
  Common patterns:
    self.time = self.time + seconds              -- Accumulate total time
    math.sin(self.time * speed)                  -- Oscillate between -1 and 1
    math.cos(self.time * speed)                  -- Same, but offset by 90°
    (math.sin(self.time) + 1) / 2                -- Oscillate between 0 and 1
]]

type AnimatedShape = {
    -- INPUTS
    baseRadius: Input<number>,       -- Starting radius
    pulseAmount: Input<number>,      -- How much to grow/shrink (0-1)
    speed: Input<number>,            -- Animation speed (cycles per second)
    colorA: Input<Color>,            -- First color
    colorB: Input<Color>,            -- Second color
    orbitRadius: Input<number>,      -- Radius of circular motion
    
    -- INTERNAL STATE
    time: number,                    -- Accumulated time
    currentRadius: number,           -- Current animated radius
    currentColor: Color,             -- Current interpolated color
    offsetX: number,                 -- Position offset X
    offsetY: number,                 -- Position offset Y
    path: Path,
    paint: Paint,
}

-- Helper: Build a circle path
local function buildCircle(path: Path, centerX: number, centerY: number, radius: number)
    local c = 0.5519150244935105707435627 * radius
    path:reset()
    path:moveTo(Vector.xy(centerX + radius, centerY))
    path:cubicTo(
        Vector.xy(centerX + radius, centerY + c),
        Vector.xy(centerX + c, centerY + radius),
        Vector.xy(centerX, centerY + radius)
    )
    path:cubicTo(
        Vector.xy(centerX - c, centerY + radius),
        Vector.xy(centerX - radius, centerY + c),
        Vector.xy(centerX - radius, centerY)
    )
    path:cubicTo(
        Vector.xy(centerX - radius, centerY - c),
        Vector.xy(centerX - c, centerY - radius),
        Vector.xy(centerX, centerY - radius)
    )
    path:cubicTo(
        Vector.xy(centerX + c, centerY - radius),
        Vector.xy(centerX + radius, centerY - c),
        Vector.xy(centerX + radius, centerY)
    )
    path:close()
end


function init(self: AnimatedShape, context: Context): boolean
    print("Visual Exercise 2: Animation initialized!")
    print("  Speed:", self.speed, "cycles/second")
    
    self.paint = Paint.with({
        style = "fill",
        color = self.colorA,
    })
    
    self.currentRadius = self.baseRadius
    self.currentColor = self.colorA
    buildCircle(self.path, 0, 0, self.currentRadius)
    
    return true
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  THE ADVANCE FUNCTION - Heart of Animation
  ═══════════════════════════════════════════════════════════════════════════
  
  This is called every frame. Return true to keep animating!
]]

function advance(self: AnimatedShape, seconds: number): boolean
    -- Accumulate time
    self.time = self.time + seconds
    
    -- Calculate animation phase (0 to 2π per cycle)
    local phase = self.time * self.speed * math.pi * 2
    
    -- ANIMATION 1: Pulsing size
    -- sin() returns -1 to 1, we map to (1-pulseAmount) to (1+pulseAmount)
    local pulse = math.sin(phase)
    local scale = 1 + (pulse * self.pulseAmount)
    self.currentRadius = self.baseRadius * scale
    
    -- ANIMATION 2: Color interpolation
    -- Map sin to 0-1 range for lerp
    local colorT = (math.sin(phase) + 1) / 2
    self.currentColor = Color.lerp(self.colorA, self.colorB, colorT)
    self.paint.color = self.currentColor
    
    -- ANIMATION 3: Circular orbit motion
    -- sin/cos together create circular motion!
    self.offsetX = math.cos(phase) * self.orbitRadius
    self.offsetY = math.sin(phase) * self.orbitRadius
    
    -- Rebuild the circle at the new position with new size
    buildCircle(self.path, self.offsetX, self.offsetY, self.currentRadius)
    
    -- Return true to keep animating
    return true
end


function update(self: AnimatedShape)
    -- Respond to input changes
    self.paint.color = self.colorA
    buildCircle(self.path, self.offsetX, self.offsetY, self.currentRadius)
end


function draw(self: AnimatedShape, renderer: Renderer)
    renderer:drawPath(self.path, self.paint)
end


return function(): Node<AnimatedShape>
    return {
        -- Inputs with defaults
        baseRadius = 40,
        pulseAmount = 0.3,        -- 30% size change
        speed = 0.5,              -- Half cycle per second (slow)
        colorA = Color.rgb(255, 100, 100),  -- Red
        colorB = Color.rgb(100, 100, 255),  -- Blue
        orbitRadius = 50,         -- Orbit radius
        
        -- Internal state
        time = 0,
        currentRadius = 40,
        currentColor = Color.rgb(255, 100, 100),
        offsetX = 0,
        offsetY = 0,
        path = Path.new(),
        paint = Paint.new(),
        
        -- Lifecycle
        init = init,
        advance = advance,
        update = update,
        draw = draw,
    }
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  CHALLENGES:
  ═══════════════════════════════════════════════════════════════════════════
  
  1. BOUNCE ANIMATION: Make the shape bounce up and down
     Hint: Use math.abs(math.sin(phase)) for a bounce effect
  
  2. FIGURE-8 MOTION: Create a figure-8 (lemniscate) path
     Hint: x = cos(phase), y = sin(phase) * cos(phase)
  
  3. EASING: Add smooth acceleration/deceleration
     Hint: Use math.sin(phase)^2 for "ease in out"
  
  4. ROTATION: Add a rotating element
     Hint: Use renderer:transform(Mat2D.withRotation(angle)) before drawing
  
  5. TRAIL EFFECT: Draw multiple circles at previous positions
     Hint: Store an array of past positions and draw them with fading opacity
]]