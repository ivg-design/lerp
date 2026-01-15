--[[
================================================================================
     _     _____ _    ____  _   _   _    _   _    _   _   
    | |   | ____/ \  |  _ \| \ | | | |  | | | |  / \ | |  
    | |   |  _|/ _ \ | |_) |  \| | | |  | | | | / _ \| |  
    | |___| |_/ ___ \|  _ <| |\  | | |__| |_| |/ ___ \ |  
    |_____|_/_/   \_\_| \_\_| \_| |_____\___//_/   \_\_|  
                                                         
    FOR RIVE - COMPREHENSIVE LEARNING GUIDE
================================================================================

This is a complete learning framework for mastering Luau scripting in Rive.
Below you'll find instructions, curriculum overview, and tips for success.

================================================================================
TABLE OF CONTENTS
================================================================================

1. GETTING STARTED
2. LEARNING PATH
3. SCRIPT DESCRIPTIONS
4. HOW TO USE EACH FEATURE
5. TROUBLESHOOTING
6. KEYBOARD SHORTCUTS
7. TIPS FOR SUCCESS
8. VIEWMODEL INTEGRATION - ACCESSING DATA FROM SCRIPTS

================================================================================
1. GETTING STARTED
================================================================================

PREREQUISITES:
- Basic understanding of any programming language (helpful but not required)
- Rive Editor installed and open
- This learning framework loaded

YOUR WORKSPACE CONTAINS:
┌─────────────────────────────────────────────────────────────────────────────┐
│ FUNDAMENTALS (Code-Only Exercises)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Learn Luau - Exercises    → Your main workbook with 10 exercises          │
│ • Learn Luau - Tests        → Automated tests to check your answers         │
│ • Learn Luau - Node Example → A complete working example to study           │
├─────────────────────────────────────────────────────────────────────────────┤
│ VISUAL EXERCISES (Drag onto Stage)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Visual Exercise 1         → Drawing shapes with Path and Paint            │
│ • Visual Exercise 2         → Animation with advance()                      │
│ • Visual Exercise 3         → Pointer interactions (click, drag, hover)     │
├─────────────────────────────────────────────────────────────────────────────┤
│ DOCUMENTATION                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ • README - Learning Guide   → This file! Your comprehensive guide           │
└─────────────────────────────────────────────────────────────────────────────┘

================================================================================
2. LEARNING PATH
================================================================================

RECOMMENDED ORDER:

PHASE 1: FUNDAMENTALS (Learn Luau - Exercises)
──────────────────────────────────────────────
Start here! Complete these exercises in order:

  Exercise 1  │ Variables & Types      │ local, number, string, boolean
  Exercise 2  │ Operators              │ +, -, *, /, %, .., math
  Exercise 3  │ Functions              │ Parameters, return types
  Exercise 4  │ Conditionals           │ if/elseif/else, comparisons
  Exercise 5  │ Arrays                 │ Tables as lists, indexing
  Exercise 6  │ Loops                  │ for, ipairs, iteration
  Exercise 7  │ Dictionaries           │ Custom types, key-value tables
  Exercise 8  │ Vectors                │ Rive's Vector type for 2D math
  Exercise 9  │ Colors                 │ Rive's Color type
  Exercise 10 │ Node Types             │ Defining Input<T> properties


PHASE 2: VISUAL EXERCISES (On the Stage)
────────────────────────────────────────
Apply what you learned with visual feedback:

  Visual 1    │ Drawing Shapes         │ Path, Paint, Renderer
  Visual 2    │ Animation              │ advance(), time-based animation
  Visual 3    │ Interactions           │ Pointer events, hit testing


PHASE 3: CHALLENGES
───────────────────
Each visual exercise has challenge sections at the bottom.
Try them to deepen your understanding!

================================================================================
3. SCRIPT DESCRIPTIONS
================================================================================

LEARN LUAU - EXERCISES (Type: utility)
──────────────────────────────────────
Your main workbook. Contains 10 progressive exercises covering all Luau basics.
Each exercise includes:
  • Explanation of the concept
  • Working examples
  • TODO sections for you to complete
  • Exports for automated testing

HOW TO USE:
  1. Read the explanation and examples
  2. Uncomment the TODO lines
  3. Replace ??? with your code
  4. Update the Exercises.xxx = nil line with your variable/function
  5. Save and compile to see results in console


LEARN LUAU - TESTS (Type: tests)
────────────────────────────────
Automated test suite that validates your exercise solutions.

HOW TO USE:
  1. Complete exercises in "Learn Luau - Exercises"
  2. Compile both scripts
  3. Run tests on this script
  4. Check results:
     ✅ Passed  = Correct!
     ❌ Failed  = Check the error message
     ⚪ Unknown = Not attempted yet


LEARN LUAU - NODE EXAMPLE (Type: node)
──────────────────────────────────────
A complete, working Node script showing all concepts together.
Study this to understand how production code looks.

Contains:
  • Type definition with Input<T> properties
  • init() for setup
  • advance() for animation
  • update() for responding to changes
  • draw() for rendering


VISUAL EXERCISE 1 - DRAWING SHAPES (Type: node)
───────────────────────────────────────────────
Learn to draw custom shapes on the Rive stage.

Concepts:
  • Building paths with moveTo, lineTo, cubicTo, close
  • Using Paint for fill and stroke styles
  • The draw() lifecycle function

TO USE:
  1. Drag this script onto any shape in your artboard
  2. Adjust the Input properties in the properties panel
  3. Complete the TODO to draw a triangle


VISUAL EXERCISE 2 - ANIMATION (Type: node)
──────────────────────────────────────────
Create smooth, time-based animations.

Concepts:
  • The advance(seconds) function
  • Accumulating time
  • Using math.sin/cos for oscillation
  • Animating size, color, and position

TO USE:
  1. Drag this script onto any shape
  2. Watch the animation!
  3. Adjust speed, colors, orbit radius
  4. Try the challenges


VISUAL EXERCISE 3 - INTERACTIONS (Type: node)
─────────────────────────────────────────────
Handle mouse and touch input.

Concepts:
  • pointerDown, pointerUp, pointerMove, pointerExit
  • Hit testing with event:hit()
  • Hover and pressed states
  • Building interactive UI elements

TO USE:
  1. Drag this script onto any shape
  2. Click/hover over the button
  3. Watch the console for event logs
  4. Try the challenges

================================================================================
4. HOW TO USE EACH FEATURE
================================================================================

THE CONSOLE
───────────
See print() output from your scripts.

  • Compile a script to run its top-level code
  • print("message") outputs to console
  • Useful for debugging and understanding flow
  • Clear frequently to avoid confusion


THE PROBLEMS PANEL
──────────────────
Shows errors and warnings in real-time.

  • Type errors appear as you type
  • Red = Error (must fix)
  • Yellow = Warning (should fix)
  • Click an error to jump to that line


THE TEST RUNNER
───────────────
Validates your code automatically.

  • Select a Tests script
  • Run tests from the menu/toolbar
  • Results show pass/fail for each case
  • Failed tests show expected vs actual values


COMPILING SCRIPTS
─────────────────
Commits your changes to the Rive runtime.

  • Save (Ctrl/Cmd+S) to update diagnostics
  • Compile to run the script
  • Visual scripts need to be attached to objects


ATTACHING NODE SCRIPTS
──────────────────────
Node scripts must be attached to objects to run.

  1. Select an object on the artboard (shape, group, etc.)
  2. Find the script in the Scripts panel
  3. Drag it onto the object (or use the + button)
  4. The script's Input properties appear in the properties panel

================================================================================
5. TROUBLESHOOTING
================================================================================

COMMON ERRORS AND SOLUTIONS:

"Cannot find variable 'xxx'"
  → Make sure you declared the variable with 'local'
  → Check spelling (Luau is case-sensitive!)

"Type 'nil' could not be converted into 'number'"
  → You're using a nil value where a number is expected
  → Initialize your variables properly

"Expected 'end' to close 'function'"
  → You're missing an 'end' statement
  → Every function, if, for, while needs a matching 'end'

"Variable 'xxx' is never used"
  → This is a warning, not an error
  → Prefix unused variables with underscore: local _unused = 5

"Script doesn't do anything when I compile"
  → Node scripts need to be attached to objects
  → Utility scripts only run their top-level code once

"I don't see my shape on screen"
  → Check that you're calling renderer:drawPath() in draw()
  → Make sure init() returns true
  → Verify the object with the script is visible

"Animation isn't smooth"
  → Use time-based animation (seconds), not frame counting
  → Make sure advance() returns true

================================================================================
6. KEYBOARD SHORTCUTS
================================================================================

  Ctrl/Cmd + S     │ Save file (updates diagnostics)
  Ctrl/Cmd + /     │ Comment/uncomment line
  Ctrl/Cmd + D     │ Duplicate line
  Ctrl/Cmd + Z     │ Undo
  Ctrl/Cmd + Shift + Z │ Redo
  Tab              │ Indent
  Shift + Tab      │ Unindent

================================================================================
7. TIPS FOR SUCCESS
================================================================================

1. READ THE EXAMPLES FIRST
   Every exercise has working examples. Study them before attempting the TODOs.

2. USE PRINT() LIBERALLY
   When something doesn't work, add print() statements to understand what's happening.

3. CHECK THE PROBLEMS PANEL
   Rive's type system catches most errors. Read the error messages carefully.

4. COMPILE OFTEN
   Small changes + frequent compiles = easier debugging.

5. RUN TESTS FREQUENTLY
   The test suite gives you immediate feedback on your solutions.

6. EXPERIMENT!
   Change values, break things, see what happens. That's how you learn!

7. STUDY THE NODE EXAMPLE
   "Learn Luau - Node Example" shows how all the pieces fit together.

8. USE THE CHALLENGES
   Each visual exercise has challenges at the bottom. They reinforce learning.

================================================================================
8. VIEWMODEL INTEGRATION - ACCESSING DATA FROM SCRIPTS
================================================================================

ViewModels in Rive allow you to bind data to your artboards. Scripts can
access and modify ViewModel properties to create dynamic, data-driven graphics.

GETTING THE VIEWMODEL
─────────────────────
In a Node script, access the ViewModel through the Context:

  function init(self: MyNode, context: Context): boolean
      local vm = context:viewModel()
      -- Now you can access properties on vm
      return true
  end

PROPERTY TYPES AND HOW TO ACCESS THEM
─────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────┐
│ NUMBER PROPERTIES                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   -- Get a number property                                                  │
│   local scoreProp = vm:getNumber("score")                                   │
│   if scoreProp then                                                         │
│       -- READ the value                                                     │
│       local currentScore: number = scoreProp.value                          │
│       print("Current score:", currentScore)                                 │
│                                                                             │
│       -- WRITE a new value                                                  │
│       scoreProp.value = 100                                                 │
│                                                                             │
│       -- LISTEN for changes                                                 │
│       scoreProp:addListener(function()                                      │
│           print("Score changed to:", scoreProp.value)                       │
│       end)                                                                  │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ STRING PROPERTIES                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   -- Get a string property                                                  │
│   local nameProp = vm:getString("playerName")                               │
│   if nameProp then                                                          │
│       -- READ the value                                                     │
│       local name: string = nameProp.value                                   │
│       print("Player name:", name)                                           │
│                                                                             │
│       -- WRITE a new value                                                  │
│       nameProp.value = "New Player"                                         │
│                                                                             │
│       -- LISTEN for changes                                                 │
│       nameProp:addListener(function()                                       │
│           print("Name changed to:", nameProp.value)                         │
│       end)                                                                  │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ BOOLEAN PROPERTIES                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   -- Get a boolean property                                                 │
│   local isActiveProp = vm:getBoolean("isActive")                            │
│   if isActiveProp then                                                      │
│       -- READ the value                                                     │
│       local active: boolean = isActiveProp.value                            │
│       print("Is active:", active)                                           │
│                                                                             │
│       -- WRITE a new value                                                  │
│       isActiveProp.value = true                                             │
│                                                                             │
│       -- TOGGLE the value                                                   │
│       isActiveProp.value = not isActiveProp.value                           │
│                                                                             │
│       -- LISTEN for changes                                                 │
│       isActiveProp:addListener(function()                                   │
│           print("Active state changed to:", isActiveProp.value)             │
│       end)                                                                  │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ COLOR PROPERTIES                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   -- Get a color property                                                   │
│   local bgColorProp = vm:getColor("backgroundColor")                        │
│   if bgColorProp then                                                       │
│       -- READ the value (returns a Color)                                   │
│       local color: Color = bgColorProp.value                                │
│       print("Background color red:", Color.red(color))                      │
│                                                                             │
│       -- WRITE a new color                                                  │
│       bgColorProp.value = Color.rgb(255, 0, 0)  -- Set to red               │
│                                                                             │
│       -- WRITE with alpha                                                   │
│       bgColorProp.value = Color.rgba(0, 128, 255, 200)                      │
│                                                                             │
│       -- LISTEN for changes                                                 │
│       bgColorProp:addListener(function()                                    │
│           print("Color changed!")                                           │
│       end)                                                                  │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ TRIGGER PROPERTIES                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Triggers are special - they don't hold a value, they fire events.         │
│                                                                             │
│   -- Get a trigger property                                                 │
│   local resetTrigger = vm:getTrigger("onReset")                             │
│   if resetTrigger then                                                      │
│       -- FIRE the trigger (from script)                                     │
│       resetTrigger:fire()                                                   │
│                                                                             │
│       -- LISTEN for when the trigger fires                                  │
│       resetTrigger:addListener(function()                                   │
│           print("Reset was triggered!")                                     │
│           -- Do reset logic here                                            │
│       end)                                                                  │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ ENUM PROPERTIES                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Enums let you select from predefined string options.                      │
│                                                                             │
│   -- Get an enum property                                                   │
│   local stateProp = vm:getEnum("gameState")                                 │
│   if stateProp then                                                         │
│       -- READ the current value (string)                                    │
│       local currentState: string = stateProp.value                          │
│       print("Current state:", currentState)                                 │
│                                                                             │
│       -- GET all possible values                                            │
│       local possibleValues = stateProp:values()                             │
│       for i = 1, #possibleValues do                                         │
│           print("Option", i, ":", possibleValues[i])                        │
│       end                                                                   │
│                                                                             │
│       -- WRITE a new value (must be one of the enum values)                 │
│       stateProp.value = "playing"                                           │
│                                                                             │
│       -- LISTEN for changes                                                 │
│       stateProp:addListener(function()                                      │
│           print("Game state changed to:", stateProp.value)                  │
│       end)                                                                  │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ LIST PROPERTIES                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Lists contain multiple ViewModel instances (like an array of objects).    │
│                                                                             │
│   -- Get a list property                                                    │
│   local itemsList = vm:getList("items")                                     │
│   if itemsList then                                                         │
│       -- Get the number of items                                            │
│       local count = itemsList.length                                        │
│       print("Number of items:", count)                                      │
│                                                                             │
│       -- Access items by index (1-based!)                                   │
│       local firstItem: ViewModel = itemsList[1]                             │
│       local itemName = firstItem:getString("name")                          │
│       if itemName then                                                      │
│           print("First item name:", itemName.value)                         │
│       end                                                                   │
│                                                                             │
│       -- Iterate over all items                                             │
│       for i = 1, itemsList.length do                                        │
│           local item: ViewModel = itemsList[i]                              │
│           local nameProp = item:getString("name")                           │
│           if nameProp then                                                  │
│               print("Item", i, ":", nameProp.value)                         │
│           end                                                               │
│       end                                                                   │
│                                                                             │
│       -- ADD a new item (from a ViewModel template)                         │
│       local template: ViewModel = firstItem:instance()                      │
│       itemsList:push(template)  -- Add to end                               │
│       itemsList:insert(template, 2)  -- Insert at position 2                │
│                                                                             │
│       -- REMOVE items                                                       │
│       local lastItem = itemsList:pop()  -- Remove and return last           │
│       local firstRemoved = itemsList:shift()  -- Remove and return first    │
│                                                                             │
│       -- REORDER items                                                      │
│       itemsList:swap(1, 3)  -- Swap items at index 1 and 3                  │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ NESTED VIEWMODEL PROPERTIES                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ViewModels can contain other ViewModels as properties.                    │
│                                                                             │
│   -- Get a nested ViewModel property                                        │
│   local playerProp = vm:getViewModel("player")                              │
│   if playerProp then                                                        │
│       -- Access the nested ViewModel                                        │
│       local playerVM: ViewModel = playerProp.value                          │
│                                                                             │
│       -- Now access properties on the nested ViewModel                      │
│       local healthProp = playerVM:getNumber("health")                       │
│       if healthProp then                                                    │
│           print("Player health:", healthProp.value)                         │
│           healthProp.value = healthProp.value - 10  -- Take damage          │
│       end                                                                   │
│                                                                             │
│       local nameProp = playerVM:getString("name")                           │
│       if nameProp then                                                      │
│           print("Player name:", nameProp.value)                             │
│       end                                                                   │
│   end                                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


COMPLETE EXAMPLE: SCORE COUNTER NODE
────────────────────────────────────

Here's a full example of a Node that uses ViewModel properties:

  type ScoreDisplay = {
      -- Internal state
      context: Context?,
      scoreProp: Property<number>?,
      labelProp: Property<string>?,
      path: Path,
      paint: Paint,
  }

  function init(self: ScoreDisplay, context: Context): boolean
      self.context = context
      local vm = context:viewModel()
      
      -- Store references to properties for later use
      self.scoreProp = vm:getNumber("score")
      self.labelProp = vm:getString("label")
      
      -- Set up listener to react to score changes
      if self.scoreProp then
          self.scoreProp:addListener(function()
              print("Score updated to:", self.scoreProp.value)
              -- Request a redraw
              if self.context then
                  self.context:markNeedsUpdate()
              end
          end)
      end
      
      -- Set up paint
      self.paint = Paint.with({
          style = "fill",
          color = Color.rgb(255, 255, 255),
      })
      
      return true
  end

  function update(self: ScoreDisplay)
      -- This is called when inputs change
      -- Update display based on current score
      if self.scoreProp then
          local score = self.scoreProp.value
          -- Could change color based on score, etc.
          if score >= 100 then
              self.paint.color = Color.rgb(0, 255, 0)  -- Green for high score
          else
              self.paint.color = Color.rgb(255, 255, 255)  -- White normally
          end
      end
  end

  -- Handle pointer to increment score
  function pointerDown(self: ScoreDisplay, event: PointerEvent)
      if self.scoreProp then
          self.scoreProp.value = self.scoreProp.value + 10
      end
      event:hit()
  end

  return function(): Node<ScoreDisplay>
      return {
          context = nil,
          scoreProp = nil,
          labelProp = nil,
          path = Path.new(),
          paint = Paint.new(),
          init = init,
          update = update,
          pointerDown = pointerDown,
      }
  end


LISTENER PATTERNS
─────────────────

There are two ways to add listeners:

  -- Pattern 1: Simple callback
  prop:addListener(function()
      print("Value changed to:", prop.value)
  end)

  -- Pattern 2: With object context (for removing later)
  prop:addListener(self, function(selfRef)
      print("Value changed, self is:", selfRef)
  end)

To remove a listener:

  local function myCallback()
      print("Changed!")
  end
  
  -- Add it
  prop:addListener(myCallback)
  
  -- Remove it later
  prop:removeListener(myCallback)


BEST PRACTICES
──────────────

1. ALWAYS CHECK FOR NIL
   Properties may not exist, always use 'if prop then'

2. STORE PROPERTY REFERENCES
   Get properties once in init() and store them in self

3. USE LISTENERS FOR REACTIVITY
   Instead of polling values, listen for changes

4. CALL markNeedsUpdate() WHEN NEEDED
   After changing values that affect rendering, call context:markNeedsUpdate()

5. USE MEANINGFUL PROPERTY NAMES
   In your ViewModel, use clear names like "playerScore" not "num1"


VIEWMODEL API QUICK REFERENCE
─────────────────────────────

  ┌──────────────────────────────────────────────────────────────────────────┐
  │ Get Properties from ViewModel                                            │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ vm:getNumber("name")     → Property<number>?                             │
  │ vm:getString("name")     → Property<string>?                             │
  │ vm:getBoolean("name")    → Property<boolean>?                            │
  │ vm:getColor("name")      → Property<Color>?                              │
  │ vm:getTrigger("name")    → PropertyTrigger?                              │
  │ vm:getEnum("name")       → PropertyEnum?                                 │
  │ vm:getList("name")       → PropertyList?                                 │
  │ vm:getViewModel("name")  → PropertyViewModel?                            │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ Property<T> Members                                                      │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ prop.value               → Get/set the value                             │
  │ prop:addListener(fn)     → Add change callback                           │
  │ prop:removeListener(fn)  → Remove change callback                        │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ PropertyTrigger Members                                                  │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ trigger:fire()           → Fire the trigger                              │
  │ trigger:addListener(fn)  → Listen for trigger events                     │
  │ trigger:removeListener(fn) → Remove listener                             │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ PropertyEnum Members                                                     │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ enum.value               → Get/set current value (string)                │
  │ enum:values()            → Get all possible values                       │
  │ enum:addListener(fn)     → Add change callback                           │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ PropertyList Members                                                     │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ list.length              → Number of items                               │
  │ list[index]              → Get ViewModel at index (1-based)              │
  │ list:push(vm)            → Add to end                                    │
  │ list:insert(vm, index)   → Insert at position                            │
  │ list:pop()               → Remove and return last                        │
  │ list:shift()             → Remove and return first                       │
  │ list:swap(i1, i2)        → Swap two items                                │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ PropertyViewModel Members                                                │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ vmProp.value             → Get the nested ViewModel                      │
  └──────────────────────────────────────────────────────────────────────────┘


================================================================================
NEXT STEPS
================================================================================

Ready to start? Open "Learn Luau - Exercises" and begin with Exercise 1!

When you complete all exercises:
  • You'll understand Luau fundamentals
  • You'll be able to create custom interactive graphics
  • You'll be ready to build real Rive scripts

Good luck and have fun! 🚀

================================================================================
]]

-- This script is documentation only - it doesn't export anything
return nil