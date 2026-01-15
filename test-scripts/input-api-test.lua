--!strict
--[[
  INPUT API TEST
  ==============
  Tests Input<T> behavior and methods.

  Key claim to verify:
  - Inputs are READ-ONLY from scripts
  - Input:addListener(value, callback) pattern
]]

export type InputTest = {
    testSpeed: Input<number>,
    testName: Input<string>,
    testEnabled: Input<boolean>,
    testColor: Input<Color>,
}

function init(self: InputTest, context: Context): boolean
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║                    INPUT API TEST                             ║")
    print("╚═══════════════════════════════════════════════════════════════╝\n")

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 1: Reading Input values
    -- ═══════════════════════════════════════════════════════════════
    print("── 1. READING INPUT VALUES ────────────────────────────────────")
    print("   testSpeed = " .. tostring(self.testSpeed))
    print("   testName = " .. tostring(self.testName))
    print("   testEnabled = " .. tostring(self.testEnabled))
    print("   testColor = " .. tostring(self.testColor))

    -- Check if .value exists on Input
    print("\n── 2. CHECKING .value ON INPUTS ───────────────────────────────")
    local hasValue = pcall(function()
        return (self.testSpeed :: any).value
    end)
    print("   Input has .value: " .. tostring(hasValue))
    if hasValue then
        local val = (self.testSpeed :: any).value
        print("   testSpeed.value = " .. tostring(val))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 3: Trying to WRITE to Input (should fail or be ignored)
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 3. TRYING TO WRITE TO INPUT ────────────────────────────────")
    local originalValue = self.testSpeed
    print("   Original testSpeed = " .. tostring(originalValue))

    local writeOk = pcall(function()
        (self :: any).testSpeed = 999
    end)
    print("   Write attempt succeeded: " .. tostring(writeOk))
    print("   After write attempt: testSpeed = " .. tostring(self.testSpeed))

    if self.testSpeed == 999 then
        print("   ⚠️  INPUT WAS MODIFIED! (unexpected)")
    else
        print("   ✅ Input remained unchanged (read-only confirmed)")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 4: Input addListener pattern
    -- Official docs show: myNumber:addListener(myNumber.value, callback)
    -- Note: Type checker sees Input<number> as just 'number', so we cast to any
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 4. INPUT addListener PATTERNS ──────────────────────────────")

    local inputAny = self.testSpeed :: any

    -- Pattern A: addListener(value, callback) - from official docs
    local patternA = pcall(function()
        inputAny:addListener(inputAny, function()
            print("   📢 Pattern A listener fired!")
        end)
    end)
    print("   :addListener(value, callback): " .. tostring(patternA))

    -- Pattern B: addListener(callback) - simpler pattern
    local patternB = pcall(function()
        inputAny:addListener(function()
            print("   📢 Pattern B listener fired!")
        end)
    end)
    print("   :addListener(callback): " .. tostring(patternB))

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 5: Check what methods exist on Input
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 5. INPUT METHODS ───────────────────────────────────────────")
    local methods = {"addListener", "value", "removeListener", "getValue"}
    for _, m in methods do
        local exists = (self.testSpeed :: any)[m] ~= nil
        if exists then
            print("   ." .. m .. ": " .. type((self.testSpeed :: any)[m]))
        end
    end

    print("\n═══════════════════════════════════════════════════════════════")
    print("TEST COMPLETE")
    print("═══════════════════════════════════════════════════════════════")

    return true
end

function update(self: InputTest)
    -- This fires when any Input changes
    print("UPDATE: An input changed!")
    print("   testSpeed = " .. tostring(self.testSpeed))
end

function draw(self: InputTest, renderer: Renderer)
end

return function(): Node<InputTest>
    return {
        testSpeed = 10,
        testName = "default",
        testEnabled = true,
        testColor = Color.rgb(255, 0, 0),
        init = init,
        update = update,
        draw = draw,
    }
end
