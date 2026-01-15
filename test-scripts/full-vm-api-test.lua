--!strict
--[[
  FULL VIEWMODEL API TEST
  =======================
  Tests ALL ViewModel property types and methods.

  SETUP REQUIRED - Create a ViewModel with:
    - testNumber (number) = 100
    - testString (string) = "hello"
    - testBoolean (boolean) = true
    - testColor (color) = any color
    - testTrigger (trigger)
    - testEnum (enum) = create an enum with values
    - testList (list) = create a list
    - testNested (viewmodel) = nested viewmodel reference
]]

export type FullVMTest = {}

-- Helper functions removed (not needed)

function init(self: FullVMTest, context: Context): boolean
    local vm = context:viewModel()
    if not vm then
        print("❌ No ViewModel found")
        return false
    end

    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║              FULL VIEWMODEL API TEST                          ║")
    print("╚═══════════════════════════════════════════════════════════════╝\n")

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 1: Number Property
    -- ═══════════════════════════════════════════════════════════════
    print("── 1. NUMBER (testNumber) ─────────────────────────────────────")
    local numProp = vm:getNumber("testNumber")
    if numProp then
        print("✅ getNumber returned property")
        print("   .value = " .. tostring(numProp.value))

        -- Test write
        numProp.value = 999
        print("   After write: .value = " .. tostring(numProp.value))

        -- Test addListener as METHOD call
        local listenerOk = pcall(function()
            numProp:addListener(function()
                print("   📢 Number listener fired!")
            end)
        end)
        print("   :addListener() works: " .. tostring(listenerOk))
    else
        print("❌ Not found - add 'testNumber' to ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 2: String Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 2. STRING (testString) ─────────────────────────────────────")
    local strProp = vm:getString("testString")
    if strProp then
        print("✅ getString returned property")
        print("   .value = '" .. tostring(strProp.value) .. "'")
        strProp.value = "MODIFIED"
        print("   After write: .value = '" .. tostring(strProp.value) .. "'")
    else
        print("❌ Not found - add 'testString' to ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 3: Boolean Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 3. BOOLEAN (testBoolean) ───────────────────────────────────")
    local boolProp = vm:getBoolean("testBoolean")
    if boolProp then
        print("✅ getBoolean returned property")
        print("   .value = " .. tostring(boolProp.value))
        boolProp.value = not boolProp.value
        print("   After toggle: .value = " .. tostring(boolProp.value))
    else
        print("❌ Not found - add 'testBoolean' to ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 4: Color Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 4. COLOR (testColor) ───────────────────────────────────────")
    local colorProp = vm:getColor("testColor")
    if colorProp then
        print("✅ getColor returned property")
        local c = colorProp.value
        print("   .value RGB = " .. Color.red(c) .. "," .. Color.green(c) .. "," .. Color.blue(c))
        colorProp.value = Color.rgb(255, 0, 255)
        local c2 = colorProp.value
        print("   After write: RGB = " .. Color.red(c2) .. "," .. Color.green(c2) .. "," .. Color.blue(c2))
    else
        print("❌ Not found - add 'testColor' to ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 5: Trigger Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 5. TRIGGER (testTrigger) ───────────────────────────────────")
    local trigProp = vm:getTrigger("testTrigger")
    if trigProp then
        print("✅ getTrigger returned property")
        print("   type: " .. typeof(trigProp))

        -- Test addListener as method
        local addListenerOk = pcall(function()
            trigProp:addListener(function()
                print("   📢 Trigger listener fired!")
            end)
        end)
        print("   :addListener() works: " .. tostring(addListenerOk))

        -- Test fire as method
        local fireOk = pcall(function()
            trigProp:fire()
        end)
        print("   :fire() works: " .. tostring(fireOk))
    else
        print("❌ Not found - add 'testTrigger' to ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 6: Enum Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 6. ENUM (testEnum) ─────────────────────────────────────────")
    local enumOk, enumProp = pcall(function()
        return vm:getEnum("testEnum")
    end)
    if enumOk and enumProp then
        print("✅ getEnum returned property")
        local _, val = pcall(function() return (enumProp :: any).value end)
        print("   .value = " .. tostring(val))
    elseif enumOk then
        print("⚠️  getEnum returned nil - add 'testEnum' to ViewModel")
    else
        print("❌ getEnum method doesn't exist or error: " .. tostring(enumProp))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 7: List Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 7. LIST (testList) ─────────────────────────────────────────")
    local listOk, listProp = pcall(function()
        return vm:getList("testList")
    end)
    if listOk and listProp then
        print("✅ getList returned property")
        -- Check for length
        local lenOk, len = pcall(function() return (listProp :: any).length end)
        if lenOk then print("   .length = " .. tostring(len)) end
        -- Check for count
        local countOk, count = pcall(function() return (listProp :: any).count end)
        if countOk then print("   .count = " .. tostring(count)) end
    elseif listOk then
        print("⚠️  getList returned nil - add 'testList' to ViewModel")
    else
        print("❌ getList method doesn't exist or error: " .. tostring(listProp))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 8: Nested ViewModel
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 8. NESTED VIEWMODEL (nestedVM) ─────────────────────────────")
    local nestedOk, nestedProp = pcall(function()
        return vm:getViewModel("nestedVM")
    end)
    if nestedOk and nestedProp then
        print("✅ getViewModel returned property")
    elseif nestedOk then
        print("⚠️  getViewModel returned nil")
    else
        print("❌ getViewModel error: " .. tostring(nestedProp))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 9: Image Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 9. IMAGE (testImage) ───────────────────────────────────────")
    local imageOk, imageProp = pcall(function()
        return (vm :: any):getImage("testImage")
    end)
    if imageOk and imageProp then
        print("✅ getImage returned property")
        local _, val = pcall(function() return (imageProp :: any).value end)
        print("   .value = " .. tostring(val))
    elseif imageOk then
        print("⚠️  getImage returned nil")
    else
        print("❌ getImage error: " .. tostring(imageProp))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 10: Artboard Property
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 10. ARTBOARD (testArtboard) ────────────────────────────────")
    local artOk, artProp = pcall(function()
        return (vm :: any):getArtboard("testArtboard")
    end)
    if artOk and artProp then
        print("✅ getArtboard returned property")
        local _, val = pcall(function() return (artProp :: any).value end)
        print("   .value = " .. tostring(val))
    elseif artOk then
        print("⚠️  getArtboard returned nil")
    else
        print("❌ getArtboard error: " .. tostring(artProp))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 11: Index Property (listIndex)
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 11. INDEX (listIndex) ──────────────────────────────────────")
    local idxOk, idxProp = pcall(function()
        return (vm :: any):getIndex("listIndex")
    end)
    if idxOk and idxProp then
        print("✅ getIndex returned property")
        local _, val = pcall(function() return (idxProp :: any).value end)
        print("   .value = " .. tostring(val))
    elseif idxOk then
        print("⚠️  getIndex returned nil")
    else
        print("❌ getIndex error: " .. tostring(idxProp))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- BONUS: List all available getter methods on vm
    -- ═══════════════════════════════════════════════════════════════
    print("\n── AVAILABLE VM METHODS ───────────────────────────────────────")
    local possibleMethods = {
        "getNumber", "getString", "getBoolean", "getColor", "getTrigger",
        "getEnum", "getList", "getViewModel", "getImage", "getArtboard",
        "getIndex", "getProperty", "get"
    }
    for _, m in possibleMethods do
        local exists = (vm :: any)[m] ~= nil
        if exists then
            print("   vm:" .. m .. "() ✅")
        end
    end

    -- ═══════════════════════════════════════════════════════════════
    -- SUMMARY
    -- ═══════════════════════════════════════════════════════════════
    print("\n═══════════════════════════════════════════════════════════════")
    print("TEST COMPLETE - Check results above")
    print("═══════════════════════════════════════════════════════════════")

    return true
end

function draw(self: FullVMTest, renderer: Renderer)
end

return function(): Node<FullVMTest>
    return {
        init = init,
        draw = draw,
    }
end
