--[[
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║            VISUAL EXERCISE 4: ViewModel Integration                       ║
  ╠═══════════════════════════════════════════════════════════════════════════╣
  ║  Learn how to access and manipulate ViewModel data from scripts!          ║
  ║                                                                           ║
  ║  WHAT YOU'LL LEARN:                                                       ║
  ║  - Getting the ViewModel from Context                                     ║
  ║  - Reading and writing number, string, boolean, and color properties      ║
  ║  - Listening for property changes with addListener                        ║
  ║  - Firing and responding to triggers                                      ║
  ║  - Working with lists and nested ViewModels                               ║
  ║                                                                           ║
  ║  SETUP REQUIRED:                                                          ║
  ║  1. Create a ViewModel with the properties listed in Exercise 1           ║
  ║  2. Assign the ViewModel instance to your Artboard                        ║
  ║  3. Drag this script onto an object on that Artboard                      ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
]]


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 1: Setup Your ViewModel
  ═══════════════════════════════════════════════════════════════════════════
  
  Before using this script, create a ViewModel with these properties:
  
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ REQUIRED VIEWMODEL PROPERTIES:                                          │
  ├─────────────────────────────────────────────────────────────────────────┤
  │ Name              │ Type      │ Initial Value                           │
  ├───────────────────┼───────────┼─────────────────────────────────────────┤
  │ score             │ number    │ 0                                       │
  │ playerName        │ string    │ "Player 1"                              │
  │ isActive          │ boolean   │ true                                    │
  │ themeColor        │ color     │ any color you like                      │
  │ onReset           │ trigger   │ (no value needed)                       │
  └─────────────────────────────────────────────────────────────────────────┘
  
  HOW TO CREATE:
  1. Open the Data panel (View → Data)
  2. Click "+" to create a new ViewModel
  3. Add each property with the correct type
  4. Create an Instance of the ViewModel
  5. Assign the instance to your Artboard
]]


--[[
  ═══════════════════════════════════════════════════════════════════════════
  KEY CONCEPT: The Property Pattern
  ═══════════════════════════════════════════════════════════════════════════
  
  ViewModel properties follow this pattern:
  
    1. GET the property (returns nil if it doesn't exist)
       local prop = vm:getNumber("propertyName")
    
    2. CHECK if it exists before using
       if prop then
           -- safe to use prop
       end
    
    3. READ with .value
       local currentValue = prop.value
    
    4. WRITE with .value =
       prop.value = newValue
    
    5. LISTEN with :addListener()
       prop:addListener(function()
           print("Value changed!")
       end)
  
  Property getters by type:
    vm:getNumber("name")    → Property<number>?
    vm:getString("name")    → Property<string>?
    vm:getBoolean("name")   → Property<boolean>?
    vm:getColor("name")     → Property<Color>?
    vm:getTrigger("name")   → PropertyTrigger?
    vm:getEnum("name")      → PropertyEnum?
    vm:getList("name")      → PropertyList?
    vm:getViewModel("name") → PropertyViewModel?
]]


-- Helper: Build a simple box path (defined early so it can be used in init)
local function buildBox(path: Path, size: number)
    local half = size / 2
    path:reset()
    path:moveTo(Vector.xy(-half, -half))
    path:lineTo(Vector.xy(half, -half))
    path:lineTo(Vector.xy(half, half))
    path:lineTo(Vector.xy(-half, half))
    path:close()
end


-- Define the Node state type
type ViewModelDemo = {
    -- INPUTS (visible in Rive UI)
    boxSize: Input<number>,
    
    -- Store context for later use
    context: Context?,
    
    -- Store property references (get once in init, use throughout)
    scoreProp: Property<number>?,
    playerNameProp: Property<string>?,
    isActiveProp: Property<boolean>?,
    themeColorProp: Property<Color>?,
    resetTrigger: PropertyTrigger?,
    
    -- Visual state
    displayScore: number,
    displayName: string,
    displayActive: boolean,
    displayColor: Color,
    
    -- Drawing
    path: Path,
    paint: Paint,
    textPaint: Paint,
}


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 2: Getting the ViewModel
  ═══════════════════════════════════════════════════════════════════════════
  
  The ViewModel is accessed through the Context parameter in init().
  
  EXAMPLE:
    function init(self: MyNode, context: Context): boolean
        local vm = context:viewModel()
        -- vm is now your ViewModel instance
        return true
    end
  
  IMPORTANT: 
  - Store the context if you need it later (e.g., for markNeedsUpdate)
  - Get and store property references in init() for better performance
]]

function init(self: ViewModelDemo, context: Context): boolean
    print("═══════════════════════════════════════════════════════════════")
    print("  Visual Exercise 4: ViewModel Integration")
    print("═══════════════════════════════════════════════════════════════")
    
    -- Store context for later use
    self.context = context
    
    -- Get the ViewModel from context
    local vm = context:viewModel()
    if not vm then
        print("❌ No ViewModel is bound to this node. Assign an instance before running the exercise.")
        return false
    end
    
    print("\n📊 EXERCISE 2: Getting Properties")
    print("─────────────────────────────────────")
    
    --[[
      ═════════════════════════════════════════════════════════════════════
      EXERCISE 3: Getting Number Properties
      ═════════════════════════════════════════════════════════════════════
      
      Use vm:getNumber("propertyName") to get a number property.
      Always check if the result is not nil before using it.
    ]]
    
    self.scoreProp = vm:getNumber("score")
    if self.scoreProp then
        self.displayScore = self.scoreProp.value
        print("✅ Found 'score' property, value:", self.displayScore)
        
        -- TODO 3a: Add a listener that prints when score changes
        -- Uncomment and complete:
        -- self.scoreProp:addListener(function()
        --     ???
        -- end)
        
    else
        print("❌ Property 'score' not found! Add a number property named 'score' to your ViewModel")
    end
    
    
    --[[
      ═════════════════════════════════════════════════════════════════════
      EXERCISE 4: Getting String Properties
      ═════════════════════════════════════════════════════════════════════
      
      Use vm:getString("propertyName") to get a string property.
    ]]
    
    self.playerNameProp = vm:getString("playerName")
    if self.playerNameProp then
        self.displayName = self.playerNameProp.value
        print("✅ Found 'playerName' property, value:", self.displayName)
        
        -- TODO 4a: Add a listener that updates self.displayName when it changes
        -- and prints "Player name changed to: [name]"
        
    else
        print("❌ Property 'playerName' not found! Add a string property named 'playerName'")
    end
    
    
    --[[
      ═════════════════════════════════════════════════════════════════════
      EXERCISE 5: Getting Boolean Properties
      ═════════════════════════════════════════════════════════════════════
      
      Use vm:getBoolean("propertyName") to get a boolean property.
    ]]
    
    self.isActiveProp = vm:getBoolean("isActive")
    if self.isActiveProp then
        self.displayActive = self.isActiveProp.value
        print("✅ Found 'isActive' property, value:", self.displayActive)
        
        -- TODO 5a: Add a listener that updates self.displayActive when it changes
        
    else
        print("❌ Property 'isActive' not found! Add a boolean property named 'isActive'")
    end
    
    
    --[[
      ═════════════════════════════════════════════════════════════════════
      EXERCISE 6: Getting Color Properties
      ═════════════════════════════════════════════════════════════════════
      
      Use vm:getColor("propertyName") to get a color property.
      The value is a Color type - use Color.red(), Color.green(), etc.
    ]]
    
    self.themeColorProp = vm:getColor("themeColor")
    if self.themeColorProp then
        self.displayColor = self.themeColorProp.value
        local r = Color.red(self.displayColor)
        local g = Color.green(self.displayColor)
        local b = Color.blue(self.displayColor)
        print("✅ Found 'themeColor' property, RGB:", r, g, b)
        
        -- Set up the paint to use the theme color
        self.paint.color = self.displayColor
        
        -- TODO 6a: Add a listener that updates self.displayColor and self.paint.color
        -- when the themeColor changes
        
    else
        print("❌ Property 'themeColor' not found! Add a color property named 'themeColor'")
        -- Use default color
        self.displayColor = Color.rgb(100, 150, 255)
        self.paint.color = self.displayColor
    end
    
    
    --[[
      ═════════════════════════════════════════════════════════════════════
      EXERCISE 7: Getting Trigger Properties
      ═════════════════════════════════════════════════════════════════════
      
      Triggers don't have values - they fire events!
      Use vm:getTrigger("name") to get a trigger.
      
      - Listen with :addListener() to respond when it fires
      - Fire from script with :fire()
    ]]
    
    self.resetTrigger = vm:getTrigger("onReset")
    if self.resetTrigger then
        print("✅ Found 'onReset' trigger")
        
        -- Listen for when the trigger fires (e.g., from a button in Rive)
        self.resetTrigger:addListener(function()
            print("🔄 Reset trigger fired! Resetting score to 0...")
            if self.scoreProp then
                self.scoreProp.value = 0
                self.displayScore = 0
            end
        end)
        
        -- TODO 7a: In pointerDown, fire this trigger when the user triple-clicks
        -- (clickCount reaches 3)
        
    else
        print("❌ Trigger 'onReset' not found! Add a trigger property named 'onReset'")
    end
    
    
    -- Set up drawing
    self.paint = Paint.with({
        style = "fill",
        color = self.displayColor,
    })
    
    buildBox(self.path, self.boxSize)
    
    print("\n─────────────────────────────────────")
    print("💡 Click the shape to increment score!")
    print("💡 Change ViewModel values in the Data panel to see updates")
    print("═══════════════════════════════════════════════════════════════\n")
    
    return true
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 8: Writing to Properties
  ═══════════════════════════════════════════════════════════════════════════
  
  To write a value, simply assign to .value:
  
    prop.value = newValue
  
  This automatically notifies all listeners and updates any bound UI!
]]

-- Track clicks for the exercises
local clickCount = 0
local lastClickTime = 0

function pointerDown(self: ViewModelDemo, event: PointerEvent)
    local currentTime = os.clock()
    
    -- Simple double/triple click detection
    if currentTime - lastClickTime < 0.4 then
        clickCount = clickCount + 1
    else
        clickCount = 1
    end
    lastClickTime = currentTime
    
    print("\n🖱️ Click #" .. clickCount)
    
    -- EXERCISE 8a: Increment the score on each click
    if self.scoreProp then
        -- Increment score by 10
        self.scoreProp.value = self.scoreProp.value + 10
        self.displayScore = self.scoreProp.value
        print("   Score is now:", self.displayScore)
    end
    
    -- TODO 8b: On double-click (clickCount == 2), toggle the isActive property
    -- Hint: self.isActiveProp.value = not self.isActiveProp.value
    if clickCount == 2 then
        print("   Double-click detected!")
        -- Uncomment and complete:
        -- if self.isActiveProp then
        --     ???
        -- end
    end
    
    -- TODO 8c: On triple-click (clickCount == 3), fire the reset trigger
    if clickCount == 3 then
        print("   Triple-click detected!")
        -- Uncomment and complete:
        -- if self.resetTrigger then
        --     ???
        -- end
    end
    
    event:hit()
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 9: Using markNeedsUpdate()
  ═══════════════════════════════════════════════════════════════════════════
  
  When you change values that affect how your node renders, call
  context:markNeedsUpdate() to request a redraw.
  
  This is especially useful inside listeners where you don't automatically
  get a redraw.
]]

function update(self: ViewModelDemo)
    -- This is called when Input properties change
    buildBox(self.path, self.boxSize)
    
    -- Update paint color from ViewModel
    if self.themeColorProp then
        self.paint.color = self.themeColorProp.value
    end
end


function draw(self: ViewModelDemo, renderer: Renderer)
    -- Only draw if active (based on ViewModel boolean)
    if self.displayActive then
        renderer:drawPath(self.path, self.paint)
    else
        -- Draw with reduced opacity when not active
        local fadedPaint = self.paint:copy({
            color = Color.opacity(self.displayColor, 0.3),
        })
        renderer:drawPath(self.path, fadedPaint)
    end
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  NODE FACTORY
  ═══════════════════════════════════════════════════════════════════════════
]]

return function(): Node<ViewModelDemo>
    return {
        -- Inputs
        boxSize = 120,
        
        -- Context (set in init)
        context = nil,
        
        -- Property references (set in init)
        scoreProp = nil,
        playerNameProp = nil,
        isActiveProp = nil,
        themeColorProp = nil,
        resetTrigger = nil,
        
        -- Display state
        displayScore = 0,
        displayName = "Unknown",
        displayActive = true,
        displayColor = Color.rgb(100, 150, 255),
        
        -- Drawing
        path = Path.new(),
        paint = Paint.new(),
        textPaint = Paint.new(),
        
        -- Lifecycle
        init = init,
        update = update,
        draw = draw,
        pointerDown = pointerDown,
    }
end


--[[
  ═══════════════════════════════════════════════════════════════════════════
  CHALLENGES:
  ═══════════════════════════════════════════════════════════════════════════
  
  CHALLENGE 1: Color Cycling
  ──────────────────────────
  Add a feature where each click cycles the themeColor through a preset
  list of colors (red → green → blue → red → ...).
  
  Hint:
    local colors = {
        Color.rgb(255, 100, 100),
        Color.rgb(100, 255, 100),
        Color.rgb(100, 100, 255),
    }
    local colorIndex = 1
    -- On click: colorIndex = (colorIndex % #colors) + 1
    -- Then: self.themeColorProp.value = colors[colorIndex]
  
  
  CHALLENGE 2: High Score Tracker
  ───────────────────────────────
  Add a "highScore" number property to your ViewModel.
  Update it whenever the current score exceeds the high score.
  
  Hint:
    local highScoreProp = vm:getNumber("highScore")
    -- In score listener:
    if scoreProp.value > highScoreProp.value then
        highScoreProp.value = scoreProp.value
    end
  
  
  CHALLENGE 3: Name Input
  ───────────────────────
  Each time the user clicks, append a letter to playerName.
  After 10 letters, reset to empty.
  
  Hint:
    local letters = "ABCDEFGHIJ"
    local index = (#self.playerNameProp.value % 10) + 1
    self.playerNameProp.value = self.playerNameProp.value .. letters:sub(index, index)
  
  
  CHALLENGE 4: Activity Timer
  ──────────────────────────
  Use the advance() function to automatically set isActive to false
  after 5 seconds of no clicks. Reset the timer on each click.
  
  Hint:
    - Add idleTime: number to the type
    - In advance: self.idleTime = self.idleTime + seconds
    - If idleTime > 5 and isActive, set isActive to false
    - In pointerDown: self.idleTime = 0
  
  
  CHALLENGE 5: List Items (Advanced)
  ──────────────────────────────────
  Create a ViewModel with a "scores" list property.
  Each click adds the current score to the list.
  Display how many scores are saved.
  
  ViewModel Setup:
    - Add a list property called "scores"
    - The list items should have a ViewModel with a "value" number property
  
  Code:
    local scoresList = vm:getList("scores")
    if scoresList then
        print("Saved scores:", scoresList.length)
        
        -- To add a new score:
        -- 1. Get a template from an existing item: scoresList[1]:instance()
        -- 2. Set its value
        -- 3. Push to list: scoresList:push(newItem)
    end
]]
