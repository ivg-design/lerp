--[[
  ╔═══════════════════════════════════════════════════════════════════════════╗
  ║                    LEARN LUAU FOR RIVE - TEST SUITE                       ║
  ╠═══════════════════════════════════════════════════════════════════════════╣
  ║  This script tests your exercise solutions!                               ║
  ║                                                                           ║
  ║  HOW TO USE:                                                              ║
  ║  1. Complete exercises in "Learn Luau - Exercises"                        ║
  ║  2. Compile both scripts                                                  ║
  ║  3. Run this test script using the "Run Tests" command                    ║
  ║  4. Check the test output to see which exercises you've completed!        ║
  ╚═══════════════════════════════════════════════════════════════════════════╝
]]

local Exercises = require("Learn Luau - Exercises")

function setup(test: Tester)
    local group = test.group
    local case = test.case

    group("Exercise 1: Variables and Types", function()
        case("1a: myAge should be a number", function(expect)
            expect(Exercises.myAge).never.is(nil)
            expect(type(Exercises.myAge)).is("number")
        end)

        case("1b: myName should be a string", function(expect)
            expect(Exercises.myName).never.is(nil)
            expect(type(Exercises.myName)).is("string")
        end)

        case("1c: isLearning should be true", function(expect)
            expect(Exercises.isLearning).is(true)
        end)
    end)

    group("Exercise 2: Operators and Math", function()
        case("2a: area should be 40 (8 * 5)", function(expect)
            expect(Exercises.area).is(40)
        end)

        case("2b: remainder should be 2 (17 % 5)", function(expect)
            expect(Exercises.remainder).is(2)
        end)

        case("2c: phrase should be 'Luau Rocks!'", function(expect)
            expect(Exercises.phrase).is("Luau Rocks!")
        end)
    end)

    group("Exercise 3: Functions", function()
        case("3a: multiply function works", function(expect)
            expect(Exercises.multiply).never.is(nil)
            if Exercises.multiply then
                expect(Exercises.multiply(3, 4)).is(12)
                expect(Exercises.multiply(7, 8)).is(56)
                expect(Exercises.multiply(0, 100)).is(0)
            end
        end)

        case("3b: greet function works", function(expect)
            expect(Exercises.greet).never.is(nil)
            if Exercises.greet then
                expect(Exercises.greet("World")).is("Hello, World!")
                expect(Exercises.greet("Rive")).is("Hello, Rive!")
            end
        end)

        case("3c: isEven function works", function(expect)
            expect(Exercises.isEven).never.is(nil)
            if Exercises.isEven then
                expect(Exercises.isEven(4)).is(true)
                expect(Exercises.isEven(7)).is(false)
                expect(Exercises.isEven(0)).is(true)
            end
        end)
    end)

    group("Exercise 4: Conditionals", function()
        case("4a: getGrade function works", function(expect)
            expect(Exercises.getGrade).never.is(nil)
            if Exercises.getGrade then
                expect(Exercises.getGrade(95)).is("A")
                expect(Exercises.getGrade(85)).is("B")
                expect(Exercises.getGrade(75)).is("C")
                expect(Exercises.getGrade(65)).is("D")
                expect(Exercises.getGrade(55)).is("F")
                expect(Exercises.getGrade(90)).is("A")
                expect(Exercises.getGrade(80)).is("B")
            end
        end)

        case("4b: canVote function works", function(expect)
            expect(Exercises.canVote).never.is(nil)
            if Exercises.canVote then
                expect(Exercises.canVote(18)).is(true)
                expect(Exercises.canVote(21)).is(true)
                expect(Exercises.canVote(17)).is(false)
                expect(Exercises.canVote(5)).is(false)
            end
        end)
    end)

    group("Exercise 5: Tables (Arrays)", function()
        case("5a: colors should be an array with 3 strings", function(expect)
            expect(Exercises.colors).never.is(nil)
            if Exercises.colors then
                expect(#Exercises.colors).is(3)
                expect(type(Exercises.colors[1])).is("string")
            end
        end)

        case("5b: getFirst function works", function(expect)
            expect(Exercises.getFirst).never.is(nil)
            if Exercises.getFirst then
                expect(Exercises.getFirst({10, 20, 30})).is(10)
                expect(Exercises.getFirst({99})).is(99)
            end
        end)

        case("5c: getLength function works", function(expect)
            expect(Exercises.getLength).never.is(nil)
            if Exercises.getLength then
                expect(Exercises.getLength({"a", "b", "c"})).is(3)
                expect(Exercises.getLength({})).is(0)
            end
        end)
    end)

    group("Exercise 6: Loops", function()
        case("6a: sumArray function works", function(expect)
            expect(Exercises.sumArray).never.is(nil)
            if Exercises.sumArray then
                expect(Exercises.sumArray({1, 2, 3, 4, 5})).is(15)
                expect(Exercises.sumArray({10, 20})).is(30)
                expect(Exercises.sumArray({})).is(0)
            end
        end)

        case("6b: countDown function works", function(expect)
            expect(Exercises.countDown).never.is(nil)
            if Exercises.countDown then
                expect(Exercises.countDown(3)).is("3 2 1 Blast off!")
                expect(Exercises.countDown(5)).is("5 4 3 2 1 Blast off!")
            end
        end)
    end)

    group("Exercise 7: Tables (Dictionaries)", function()
        case("7b: myBook should have title, author, and pages", function(expect)
            expect(Exercises.myBook).never.is(nil)
            if Exercises.myBook then
                expect(Exercises.myBook.title).never.is(nil)
                expect(Exercises.myBook.author).never.is(nil)
                expect(Exercises.myBook.pages).never.is(nil)
                expect(type(Exercises.myBook.title)).is("string")
                expect(type(Exercises.myBook.author)).is("string")
                expect(type(Exercises.myBook.pages)).is("number")
            end
        end)

        case("7c: getBookInfo function works", function(expect)
            expect(Exercises.getBookInfo).never.is(nil)
            if Exercises.getBookInfo then
                local testBook = { title = "Test", author = "Author", pages = 100 }
                expect(Exercises.getBookInfo(testBook)).is("Test by Author")
            end
        end)
    end)

    group("Exercise 8: Vectors", function()
        case("8a: position should be Vector(100, 50)", function(expect)
            expect(Exercises.position).never.is(nil)
            if Exercises.position then
                expect(Exercises.position.x).is(100)
                expect(Exercises.position.y).is(50)
            end
        end)

        case("8b: midpoint function works", function(expect)
            expect(Exercises.midpoint).never.is(nil)
            if Exercises.midpoint then
                local a = Vector.xy(0, 0)
                local b = Vector.xy(10, 10)
                local mid = Exercises.midpoint(a, b)
                expect(mid.x).is(5)
                expect(mid.y).is(5)
                
                local c = Vector.xy(100, 0)
                local d = Vector.xy(0, 100)
                local mid2 = Exercises.midpoint(c, d)
                expect(mid2.x).is(50)
                expect(mid2.y).is(50)
            end
        end)
    end)

    group("Exercise 9: Colors", function()
        case("9a: green should be RGB(0, 255, 0)", function(expect)
            expect(Exercises.green).never.is(nil)
            if Exercises.green then
                expect(Color.red(Exercises.green)).is(0)
                expect(Color.green(Exercises.green)).is(255)
                expect(Color.blue(Exercises.green)).is(0)
            end
        end)

        case("9b: semiTransparentWhite should be RGBA(255,255,255,128)", function(expect)
            expect(Exercises.semiTransparentWhite).never.is(nil)
            if Exercises.semiTransparentWhite then
                expect(Color.red(Exercises.semiTransparentWhite)).is(255)
                expect(Color.green(Exercises.semiTransparentWhite)).is(255)
                expect(Color.blue(Exercises.semiTransparentWhite)).is(255)
                expect(Color.alpha(Exercises.semiTransparentWhite)).is(128)
            end
        end)
    end)

    group("Exercise 10: Node Type Definition", function()
        case("10a: Circle type should be defined", function(expect)
            expect(Exercises.CircleTypeDefined).is(true)
        end)
    end)
end

return function(): Tests
    return setup
end