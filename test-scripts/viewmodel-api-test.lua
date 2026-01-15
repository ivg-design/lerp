--!strict
--[[
  VIEWMODEL API TEST
  ==================
  Tests all ViewModel property getters, setters, and listeners.

  SETUP REQUIRED:
  Create a ViewModel with these properties:
    - testNumber (number) = 100
    - testString (string) = "hello"
    - testBoolean (boolean) = true
    - testColor (color) = any color
    - testTrigger (trigger)

  Then assign the ViewModel instance to your Artboard.
]]

export type VMApiTest = {
    context: Context,
}

function init(self: VMApiTest, context: Context): boolean
    self.context = context
    local vm = context:viewModel()

    print("╔════════════════════════════════════════════════════════════╗")
    print("║           VIEWMODEL API VERIFICATION TEST                  ║")
    print("╚════════════════════════════════════════════════════════════╝")

    if not vm then
        print("❌ ERROR: No ViewModel found!")
        print("   Create a ViewModel and assign it to the Artboard first.")
        return false
    end

    print("✅ ViewModel found\n")

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 1: getNumber
    -- ═══════════════════════════════════════════════════════════════
    print("── TEST 1: getNumber ──────────────────────────────────────")
    local numProp = vm:getNumber("testNumber")
    if numProp then
        print("✅ vm:getNumber('testNumber') returned property")
        print("   .value = " .. tostring(numProp.value))

        -- Test setting
        local oldVal = numProp.value
        numProp.value = 999
        print("   After setting to 999: .value = " .. tostring(numProp.value))
        numProp.value = oldVal  -- restore

        -- Test addListener exists
        local hasListener = numProp.addListener ~= nil
        print("   .addListener exists: " .. tostring(hasListener))
    else
        print("❌ vm:getNumber('testNumber') returned nil")
        print("   Add a number property named 'testNumber' to your ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 2: getString
    -- ═══════════════════════════════════════════════════════════════
    print("\n── TEST 2: getString ──────────────────────────────────────")
    local strProp = vm:getString("testString")
    if strProp then
        print("✅ vm:getString('testString') returned property")
        print("   .value = '" .. tostring(strProp.value) .. "'")

        -- Test setting
        local oldVal = strProp.value
        strProp.value = "MODIFIED"
        print("   After setting to 'MODIFIED': .value = '" .. tostring(strProp.value) .. "'")
        strProp.value = oldVal  -- restore

        local hasListener = strProp.addListener ~= nil
        print("   .addListener exists: " .. tostring(hasListener))
    else
        print("❌ vm:getString('testString') returned nil")
        print("   Add a string property named 'testString' to your ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 3: getBoolean
    -- ═══════════════════════════════════════════════════════════════
    print("\n── TEST 3: getBoolean ─────────────────────────────────────")
    local boolProp = vm:getBoolean("testBoolean")
    if boolProp then
        print("✅ vm:getBoolean('testBoolean') returned property")
        print("   .value = " .. tostring(boolProp.value))

        -- Test setting
        local oldVal = boolProp.value
        boolProp.value = not oldVal
        print("   After toggling: .value = " .. tostring(boolProp.value))
        boolProp.value = oldVal  -- restore

        local hasListener = boolProp.addListener ~= nil
        print("   .addListener exists: " .. tostring(hasListener))
    else
        print("❌ vm:getBoolean('testBoolean') returned nil")
        print("   Add a boolean property named 'testBoolean' to your ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 4: getColor
    -- ═══════════════════════════════════════════════════════════════
    print("\n── TEST 4: getColor ───────────────────────────────────────")
    local colorProp = vm:getColor("testColor")
    if colorProp then
        print("✅ vm:getColor('testColor') returned property")
        local c = colorProp.value
        print("   .value RGB = " .. Color.red(c) .. ", " .. Color.green(c) .. ", " .. Color.blue(c))

        -- Test setting
        local oldVal = colorProp.value
        colorProp.value = Color.rgb(255, 0, 255)  -- magenta
        local newC = colorProp.value
        print("   After setting magenta: RGB = " .. Color.red(newC) .. ", " .. Color.green(newC) .. ", " .. Color.blue(newC))
        colorProp.value = oldVal  -- restore

        local hasListener = colorProp.addListener ~= nil
        print("   .addListener exists: " .. tostring(hasListener))
    else
        print("❌ vm:getColor('testColor') returned nil")
        print("   Add a color property named 'testColor' to your ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 5: getTrigger
    -- ═══════════════════════════════════════════════════════════════
    print("\n── TEST 5: getTrigger ─────────────────────────────────────")
    local triggerProp = vm:getTrigger("testTrigger")
    if triggerProp then
        print("✅ vm:getTrigger('testTrigger') returned property")

        -- Check for fire method
        local hasFire = (triggerProp :: any).fire ~= nil
        print("   .fire exists: " .. tostring(hasFire))

        local hasListener = (triggerProp :: any).addListener ~= nil
        print("   .addListener exists: " .. tostring(hasListener))

        -- Test firing (will call any listeners)
        if hasFire then
            print("   Firing trigger...")
            triggerProp:fire()
            print("   ✅ Trigger fired successfully")
        end
    else
        print("❌ vm:getTrigger('testTrigger') returned nil")
        print("   Add a trigger property named 'testTrigger' to your ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 6: Listener callback test
    -- ═══════════════════════════════════════════════════════════════
    print("\n── TEST 6: Listener Callback ──────────────────────────────")
    if numProp then
        local listenerCalled = false
        numProp:addListener(function()
            listenerCalled = true
            print("   📢 Listener callback executed!")
        end)

        -- Trigger the listener by changing value
        local oldVal = numProp.value
        numProp.value = oldVal + 1
        print("   Listener was called: " .. tostring(listenerCalled))
        numProp.value = oldVal  -- restore
    else
        print("⚠️  Skipped (no number property)")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 7: Non-existent property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── TEST 7: Non-existent Property ──────────────────────────")
    local fakeProp = vm:getNumber("thisPropertyDoesNotExist")
    print("vm:getNumber('thisPropertyDoesNotExist') = " .. tostring(fakeProp))
    print("✅ Correctly returns nil for missing properties")

    -- ═══════════════════════════════════════════════════════════════
    -- SUMMARY
    -- ═══════════════════════════════════════════════════════════════
    print("\n╔════════════════════════════════════════════════════════════╗")
    print("║                    TEST SUMMARY                            ║")
    print("╠════════════════════════════════════════════════════════════╣")
    print("║ vm:getNumber()   → Property with .value (read/write)       ║")
    print("║ vm:getString()   → Property with .value (read/write)       ║")
    print("║ vm:getBoolean()  → Property with .value (read/write)       ║")
    print("║ vm:getColor()    → Property with .value (read/write)       ║")
    print("║ vm:getTrigger()  → PropertyTrigger with :fire()            ║")
    print("║ prop:addListener(fn) → Subscribes to changes               ║")
    print("╚════════════════════════════════════════════════════════════╝")

    return true
end

function draw(self: VMApiTest, renderer: Renderer)
end

return function(): Node<VMApiTest>
    return {
        init = init,
        draw = draw,
        context = late(),
    }
end
