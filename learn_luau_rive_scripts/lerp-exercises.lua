--[[
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║                    LEARN LUAU FOR RIVE - EXERCISES                        ║
  ╠═══════════════════════════════════════════════════════════════════════════╣
  ║  Welcome! This script contains progressive exercises to teach you Luau.   ║
  ║                                                                           ║
  ║  HOW TO USE:                                                              ║
  ║  1. Read each exercise carefully                                          ║
  ║  2. Uncomment and complete the TODO sections                              ║
  ║  3. Save the file (Ctrl/Cmd + S) to see diagnostics (errors/warnings)     ║
  ║  4. Compile the script to run it and see console output                   ║
  ║  5. Run the tests in "Learn Luau - Tests" to check your answers           ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
]]

-- We'll export your solutions so the test file can check them
local Exercises = {}

--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 1: Variables and Types
  ═══════════════════════════════════════════════════════════════════════════
  
  In Luau (Rive's scripting language), variables have TYPES.
  Rive uses STRICT mode, meaning you should declare types explicitly.
  
  Basic types:
    - number    (integers and decimals: 42, 3.14)
    - string    (text: "hello", 'world')
    - boolean   (true or false)
    - nil       (absence of value)
  
  Syntax: local variableName: type = value
]]

-- EXAMPLE (already done for you):
local myNumber: number = 42
local myString: string = "Hello, Rive!"
local myBoolean: boolean = true

print("=== EXERCISE 1: Variables ===")
print("myNumber:", myNumber)
print("myString:", myString)
print("myBoolean:", myBoolean)

-- TODO 1a: Create a variable called 'myAge' of type 'number' with your age
-- local myAge: number = ???
Exercises.myAge = nil  -- Replace nil with: myAge (after you create it)

-- TODO 1b: Create a variable called 'myName' of type 'string' with your name
-- local myName: string = ???
Exercises.myName = nil  -- Replace nil with: myName (after you create it)

-- TODO 1c: Create a variable called 'isLearning' of type 'boolean' set to true
-- local isLearning: boolean = ???
Exercises.isLearning = nil  -- Replace nil with: isLearning (after you create it)


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 2: Basic Operators and Math
  ═══════════════════════════════════════════════════════════════════════════
  
  Arithmetic operators:
    +   addition
    -   subtraction
    *   multiplication
    /   division
    %   modulo (remainder)
    ^   exponentiation (power)
  
  String concatenation uses: ..
]]

print("\n=== EXERCISE 2: Operators ===")

-- EXAMPLE:
local sum: number = 10 + 5
local product: number = 4 * 3
local greeting: string = "Hello" .. " " .. "World"
print("sum:", sum)
print("product:", product)
print("greeting:", greeting)

-- TODO 2a: Calculate the area of a rectangle (width=8, height=5)
local _width: number = 8  -- underscore prefix suppresses "unused" warnings
local _height: number = 5
-- local area: number = _width * _height
Exercises.area = nil  -- Replace nil with: area

-- TODO 2b: Calculate the remainder when 17 is divided by 5
-- local remainder: number = ???
Exercises.remainder = nil  -- Replace nil with: remainder

-- TODO 2c: Concatenate "Luau" and "Rocks!" with a space between them
-- local phrase: string = ???
Exercises.phrase = nil  -- Replace nil with: phrase


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 3: Functions
  ═══════════════════════════════════════════════════════════════════════════
  
  Functions are reusable blocks of code. In Rive's strict mode, you must
  declare parameter types and return types.
  
  Syntax:
    function name(param1: type1, param2: type2): returnType
      -- code here
      return value
    end
]]

print("\n=== EXERCISE 3: Functions ===")

-- EXAMPLE: A function that adds two numbers
function addNumbers(a: number, b: number): number
    return a + b
end

print("addNumbers(3, 7):", addNumbers(3, 7))

-- TODO 3a: Create a function 'multiply' that takes two numbers and returns their product
-- function multiply(a: number, b: number): number
--     ???
-- end
Exercises.multiply = nil  -- Replace nil with: multiply

-- TODO 3b: Create a function 'greet' that takes a name (string) and returns "Hello, [name]!"
-- function greet(name: string): string
--     ???
-- end
Exercises.greet = nil  -- Replace nil with: greet

-- TODO 3c: Create a function 'isEven' that takes a number and returns true if it's even
-- Hint: Use the modulo operator (%)
-- function isEven(n: number): boolean
--     ???
-- end
Exercises.isEven = nil  -- Replace nil with: isEven


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 4: Conditionals (if/then/else)
  ═══════════════════════════════════════════════════════════════════════════
  
  Control flow with conditions:
  
    if condition then
      -- runs if condition is true
    elseif otherCondition then
      -- runs if otherCondition is true
    else
      -- runs if no conditions are true
    end
  
  Comparison operators:
    ==   equal to
    ~=   not equal to
    <    less than
    >    greater than
    <=   less than or equal
    >=   greater than or equal
  
  Logical operators:
    and, or, not
]]

print("\n=== EXERCISE 4: Conditionals ===")

-- EXAMPLE:
function describeNumber(n: number): string
    if n > 0 then
        return "positive"
    elseif n < 0 then
        return "negative"
    else
        return "zero"
    end
end

print("describeNumber(5):", describeNumber(5))
print("describeNumber(-3):", describeNumber(-3))
print("describeNumber(0):", describeNumber(0))

-- TODO 4a: Create a function 'getGrade' that takes a score (0-100) and returns:
--   "A" for 90-100, "B" for 80-89, "C" for 70-79, "D" for 60-69, "F" below 60
-- function getGrade(score: number): string
--     ???
-- end
Exercises.getGrade = nil  -- Replace nil with: getGrade

-- TODO 4b: Create a function 'canVote' that takes an age and returns true if >= 18
-- function canVote(age: number): boolean
--     ???
-- end
Exercises.canVote = nil  -- Replace nil with: canVote


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 5: Tables (Arrays)
  ═══════════════════════════════════════════════════════════════════════════
  
  Tables are Luau's only data structure. They can be used as arrays (lists).
  
  IMPORTANT: Luau arrays are 1-indexed (first element is at index 1, not 0!)
  
  Syntax:
    local myArray: {number} = {1, 2, 3}     -- array of numbers
    local names: {string} = {"a", "b"}      -- array of strings
    
  Access elements with: myArray[1], myArray[2], etc.
  Get length with: #myArray
]]

print("\n=== EXERCISE 5: Tables (Arrays) ===")

-- EXAMPLE:
local numbers: {number} = {10, 20, 30, 40, 50}
print("First element:", numbers[1])
print("Array length:", #numbers)

-- Modifying arrays
local fruits: {string} = {"apple", "banana"}
table.insert(fruits, "orange")  -- adds to end
print("Fruits:", fruits[1], fruits[2], fruits[3])

-- TODO 5a: Create an array called 'colors' with 3 color names (strings)
-- local colors: {string} = ???
Exercises.colors = nil  -- Replace nil with: colors

-- TODO 5b: Create a function 'getFirst' that takes an array of numbers and returns the first element
-- function getFirst(arr: {number}): number
--     ???
-- end
Exercises.getFirst = nil  -- Replace nil with: getFirst

-- TODO 5c: Create a function 'getLength' that takes an array of strings and returns its length
-- function getLength(arr: {string}): number
--     ???
-- end
Exercises.getLength = nil  -- Replace nil with: getLength


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 6: Loops
  ═══════════════════════════════════════════════════════════════════════════
  
  For loops:
    for i = start, stop, step do
      -- code
    end
  
  Iterating arrays with ipairs:
    for index, value in ipairs(array) do
      -- code  
    end
  
  While loops:
    while condition do
      -- code
    end
]]

print("\n=== EXERCISE 6: Loops ===")

-- EXAMPLE: Print numbers 1 to 5
print("Counting 1 to 5:")
for i = 1, 5 do
    print("  ", i)
end

-- EXAMPLE: Iterate over an array
local animals: {string} = {"cat", "dog", "bird"}
print("Animals:")
for index, animal in ipairs(animals) do
    print("  ", index, animal)
end

-- TODO 6a: Create a function 'sumArray' that takes an array of numbers and returns their sum
-- Hint: Use a for loop with ipairs
-- function sumArray(arr: {number}): number
--     local total: number = 0
--     ???
--     return total
-- end
Exercises.sumArray = nil  -- Replace nil with: sumArray

-- TODO 6b: Create a function 'countDown' that takes a number n and returns a string
-- like "5 4 3 2 1 Blast off!" (numbers separated by spaces)
-- Hint: Use a for loop counting DOWN: for i = n, 1, -1 do
-- function countDown(n: number): string
--     ???
-- end
Exercises.countDown = nil  -- Replace nil with: countDown


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 7: Tables (Dictionaries/Objects)
  ═══════════════════════════════════════════════════════════════════════════
  
  Tables can also be key-value stores (like dictionaries or objects).
  
  Type definition syntax:
    type Person = {
      name: string,
      age: number,
    }
  
  Creating:
    local person: Person = { name = "Alice", age = 30 }
  
  Accessing:
    person.name or person["name"]
]]

print("\n=== EXERCISE 7: Tables (Dictionaries) ===")

-- EXAMPLE:
type Pet = {
    name: string,
    species: string,
    age: number,
}

local myPet: Pet = {
    name = "Fluffy",
    species = "cat",
    age = 3,
}
print("Pet name:", myPet.name)
print("Pet species:", myPet.species)

-- TODO 7a: Define a type 'Book' with properties: title (string), author (string), pages (number)
-- type Book = ???

-- TODO 7b: Create a variable 'myBook' of type Book with your favorite book's info
-- local myBook: Book = ???
Exercises.myBook = nil  -- Replace nil with: myBook

-- TODO 7c: Create a function 'getBookInfo' that takes a Book and returns 
-- "[title] by [author]" as a string
-- function getBookInfo(book: Book): string
--     ???
-- end
Exercises.getBookInfo = nil  -- Replace nil with: getBookInfo


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 8: Rive-Specific - Vectors
  ═══════════════════════════════════════════════════════════════════════════
  
  Rive provides a Vector type for 2D coordinates and math.
  
  Creating vectors:
    Vector.xy(x, y)     -- from x and y
    Vector.origin()     -- (0, 0)
  
  Properties (read-only):
    v.x, v.y
  
  Operations:
    v1 + v2, v1 - v2    -- add/subtract
    v * scalar          -- scale
    v:length()          -- magnitude
    v:normalized()      -- unit vector
    v:distance(other)   -- distance to other vector
]]

print("\n=== EXERCISE 8: Vectors ===")

-- EXAMPLE:
local pointA: Vector = Vector.xy(3, 4)
local pointB: Vector = Vector.xy(6, 8)
print("Point A:", pointA.x, pointA.y)
print("Length of A:", pointA:length())
print("Distance A to B:", pointA:distance(pointB))

local moved: Vector = pointA + Vector.xy(10, 0)
print("Moved point:", moved.x, moved.y)

-- TODO 8a: Create a vector 'position' at coordinates (100, 50)
-- local position: Vector = ???
Exercises.position = nil  -- Replace nil with: position

-- TODO 8b: Create a function 'midpoint' that takes two Vectors and returns the midpoint
-- Hint: Add the vectors together and divide by 2
-- function midpoint(a: Vector, b: Vector): Vector
--     ???
-- end
Exercises.midpoint = nil  -- Replace nil with: midpoint


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 9: Rive-Specific - Colors
  ═══════════════════════════════════════════════════════════════════════════
  
  Rive uses Color for... colors! Colors are actually numbers with helper functions.
  
  Creating colors:
    Color.rgb(r, g, b)         -- values 0-255
    Color.rgba(r, g, b, a)     -- with alpha (opacity)
  
  Getting/setting components:
    Color.red(color)           -- get red (0-255)
    Color.red(color, 128)      -- set red, returns new color
    Color.opacity(color)       -- get opacity (0.0-1.0)
  
  Interpolation:
    Color.lerp(from, to, t)    -- blend between colors (t: 0-1)
]]

print("\n=== EXERCISE 9: Colors ===")

-- EXAMPLE:
local red: Color = Color.rgb(255, 0, 0)
local blue: Color = Color.rgb(0, 0, 255)
local purple: Color = Color.lerp(red, blue, 0.5)
print("Red value of red:", Color.red(red))
print("Red value of purple:", Color.red(purple))

-- TODO 9a: Create a color 'green' using Color.rgb
-- local green: Color = ???
Exercises.green = nil  -- Replace nil with: green

-- TODO 9b: Create a color 'semiTransparentWhite' that is white (255,255,255) with 50% opacity (alpha=128)
-- local semiTransparentWhite: Color = ???
Exercises.semiTransparentWhite = nil  -- Replace nil with: semiTransparentWhite


--[[
  ═══════════════════════════════════════════════════════════════════════════
  EXERCISE 10: Putting It Together - A Simple Node Script
  ═══════════════════════════════════════════════════════════════════════════
  
  In Rive, a Node script creates visual elements. The pattern is:
  
  1. Define a type for your node's state
  2. Implement init, update, advance, and/or draw functions
  3. Return a factory function that creates the Node
  
  This exercise is a preview - we'll just practice the TYPE definition part.
]]

print("\n=== EXERCISE 10: Node Type Definition ===")

-- EXAMPLE: A counter node type
type Counter = {
    count: Input<number>,      -- An input the designer can set in Rive
    label: string,             -- Internal state
}

-- TODO 10a: Define a type 'Circle' with:
--   - radius: Input<number>     (designer can configure)
--   - color: Input<Color>       (designer can configure)  
--   - position: Vector          (internal state)
--   - path: Path                (for drawing)

-- type Circle = {
--     ???
-- }

-- Uncomment when you've defined the Circle type:
-- Exercises.CircleTypeDefined = true
Exercises.CircleTypeDefined = false


--[[
  ═══════════════════════════════════════════════════════════════════════════
  CONGRATULATIONS! 
  ═══════════════════════════════════════════════════════════════════════════
  
  You've completed the basic exercises! Next steps:
  
  1. Run the test file "Learn Luau - Tests" to check your answers
  2. Check "Learn Luau - Node Example" for a complete working Node script
  3. Experiment! Modify the exercises and see what happens
  
  Tips:
  - Watch the Problems panel for type errors
  - Use print() liberally to debug
  - Hover over variables in the editor to see their types
]]

print("\n=== EXERCISES COMPLETE ===")
print("Now run 'Learn Luau - Tests' to check your answers!")

return Exercises