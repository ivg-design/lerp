--[[
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║            VISUAL EXERCISE 1: Drawing Shapes on the Stage                 ║
  ╠═══════════════════════════════════════════════════════════════════════════╣
  ║  This is a NODE script - drag it onto any object in your Rive file!       ║
  ║                                                                           ║
  ║  WHAT YOU'LL LEARN:                                                       ║
  ║  - How Node scripts work (init, update, draw)                             ║
  ║  - Drawing paths (shapes) with the Renderer                               ║
  ║  - Using Paint for colors and styles                                      ║
  ║                                                                           ║
  ║  TO USE: Drag this script onto the Rectangle on "Exercise Stage"          ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
]]

--[[
  ═══════════════════════════════════════════════════════════════════════════
  STEP 1: Define the Node's state type
  ═══════════════════════════════════════════════════════════════════════════
  
  Every Node script needs a type that describes:
  - Input<T> properties: Exposed in Rive's UI for designers to configure
  - Internal properties: Used only by your code
]]

type DrawingNode = {
    -- INPUTS: These appear in Rive's properties panel!
    shapeSize: Input<number>,
    fillColor: Input<Color>,
    strokeColor: Input<Color>,
    strokeWidth: Input<number>,
    
    -- INTERNAL STATE: Not visible to designers
    path: Path,
    fillPaint: Paint,
    strokePaint: Paint,
}


--[[
  ═══════════════════════════════════════════════════════════════════════════
  STEP 2: Helper function to build a shape
  ═══════════════════════════════════════════════════════════════════════════
  
  Paths are built using commands:
  - moveTo(point)           - Start a new contour
  - lineTo(point)           - Draw a line
  - cubicTo(c1, c2, end)    - Draw a bezier curve
  - close()                 - Close the path
]]

local function buildSquare(path: Path, size: number)
    local half = size / 2
    path:reset()
    path:moveTo(Vector.xy(-half, -half))
    path:lineTo(Vector.xy(half, -half))
    path:lineTo(Vector.xy(half, half))
    path:lineTo(Vector.xy(-half, half))
    path:close()
end

-- TODO: Create a function that builds a triangle!
-- Hint: A triangle has 3 points. Use moveTo for the first, lineTo for the others.
local function _buildTriangle(path: Path, size: number)
    local _half = size / 2
    path:reset()
    -- Your code here:
    -- path:moveTo(Vector.xy(0, -half))       -- top point
    -- path:lineTo(Vector.xy(half, half))     -- bottom right
    -- path:lineTo(Vector.xy(-half, half))    -- bottom left
    -- path:close()
    
    -- For now, just draw a square (replace this!)
    buildSquare(path, size)
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  STEP 3: Lifecycle functions
  ═══════════════════════════════════════════════════════════════════════════
]]

-- INIT: Called once when the node is created
function init(self: DrawingNode, context: Context): boolean
    print("Visual Exercise 1: Node initialized!")
    print("  Shape size:", self.shapeSize)
    print("  Fill color:", self.fillColor)
    
    -- Set up paints
    self.fillPaint = Paint.with({
        style = "fill",
        color = self.fillColor,
    })
    
    self.strokePaint = Paint.with({
        style = "stroke",
        color = self.strokeColor,
        thickness = self.strokeWidth,
    })
    
    -- Build the initial shape
    buildSquare(self.path, self.shapeSize)
    
    return true  -- Return true to keep the node active
end


-- UPDATE: Called when any Input property changes
function update(self: DrawingNode)
    print("Visual Exercise 1: Input changed!")
    
    -- Update paints with new colors
    self.fillPaint.color = self.fillColor
    self.strokePaint.color = self.strokeColor
    self.strokePaint.thickness = self.strokeWidth
    
    -- Rebuild shape with new size
    -- TODO: Change this to buildTriangle to see your triangle!
    buildSquare(self.path, self.shapeSize)
end


-- DRAW: Called every frame to render the node
function draw(self: DrawingNode, renderer: Renderer)
    -- Draw the fill first, then the stroke on top
    renderer:drawPath(self.path, self.fillPaint)
    renderer:drawPath(self.path, self.strokePaint)
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  STEP 4: Export the factory function
  ═══════════════════════════════════════════════════════════════════════════
  
  This function creates new instances of our Node with default values.
]]

return function(): Node<DrawingNode>
    return {
        -- Default input values (designers can change these!)
        shapeSize = 100,
        fillColor = Color.rgb(100, 200, 255),   -- Light blue
        strokeColor = Color.rgb(0, 50, 100),    -- Dark blue
        strokeWidth = 4,
        
        -- Initialize internal state
        path = Path.new(),
        fillPaint = Paint.new(),
        strokePaint = Paint.new(),
        
        -- Connect lifecycle functions
        init = init,
        update = update,
        draw = draw,
    }
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  CHALLENGES:
  ═══════════════════════════════════════════════════════════════════════════
  
  1. Complete the buildTriangle function and change update() to use it
  
  2. Create a buildCircle function using cubic bezier curves:
     - A circle needs 4 cubic curves
     - The "magic number" for circle approximation is: 0.5519150244935105707435627
     - Multiply this by the radius for the control point distance
  
  3. Add a new Input property 'shapeType: Input<number>' and draw different
     shapes based on its value (0=square, 1=triangle, 2=circle)
  
  4. Add a gradient fill instead of a solid color
     - Use Gradient.linear() or Gradient.radial()
     - Assign it to self.fillPaint.gradient
]]