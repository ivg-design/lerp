--!strict
--[[
  VIEWMODEL DEEP EXPLORATION
  ==========================
  Thoroughly explores what's actually on ViewModel objects.

  SETUP:
  1. Create ViewModel "TestVM" with: testNumber (number=42)
  2. Add nested ViewModel property "nestedVM" referencing another VM
  3. Bind TestVM to artboard, attach script, run
]]

export type VMExplore = {}

-- Helper to safely print all keys on an object
local function dumpKeys(obj: any, label: string)
    print("\n   [" .. label .. "] Dumping all keys:")

    if obj == nil then
        print("      (nil)")
        return
    end

    local objType = type(obj)
    print("      type: " .. objType)
    print("      typeof: " .. typeof(obj))
    print("      tostring: " .. tostring(obj))

    if objType == "table" or objType == "userdata" then
        -- Try to iterate (may not work on userdata)
        local success = pcall(function()
            for k, v in pairs(obj :: any) do
                print("      ." .. tostring(k) .. " = " .. type(v))
            end
        end)
        if not success then
            print("      (cannot iterate - likely userdata)")
        end

        -- Try common method names
        local methods = {
            "name", "value", "instance",
            "getNumber", "getString", "getBoolean", "getColor",
            "getTrigger", "getEnum", "getList", "getViewModel",
            "addListener", "fire", "reset"
        }
        print("      Checking known methods:")
        for _, m in methods do
            local val = (obj :: any)[m]
            if val ~= nil then
                print("         ." .. m .. " = " .. type(val) .. " -> " .. tostring(val))
            end
        end
    end
end

function init(self: VMExplore, context: Context): boolean
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║           VIEWMODEL DEEP EXPLORATION                         ║")
    print("╚═══════════════════════════════════════════════════════════════╝")

    -- ═══════════════════════════════════════════════════════════════
    -- STEP 1: Get the ViewModel from context
    -- ═══════════════════════════════════════════════════════════════
    print("\n══ STEP 1: context:viewModel() ══")

    local vm = context:viewModel()
    dumpKeys(vm, "vm from context:viewModel()")

    if not vm then
        print("\n❌ No ViewModel - bind one to the artboard!")
        return false
    end

    -- ═══════════════════════════════════════════════════════════════
    -- STEP 2: Try to get a number property
    -- ═══════════════════════════════════════════════════════════════
    print("\n══ STEP 2: vm:getNumber('testNumber') ══")

    local numProp = vm:getNumber("testNumber")
    dumpKeys(numProp, "numProp from getNumber")

    if numProp then
        print("\n   Reading .value:")
        local val = numProp.value
        print("      numProp.value = " .. tostring(val))

        print("\n   Writing .value = 999:")
        numProp.value = 999
        print("      After write: numProp.value = " .. tostring(numProp.value))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- STEP 3: Try vm:instance()
    -- ═══════════════════════════════════════════════════════════════
    print("\n══ STEP 3: vm:instance() ══")

    local instOk, inst = pcall(function()
        return vm:instance()
    end)

    if instOk then
        dumpKeys(inst, "inst from vm:instance()")
    else
        print("   ❌ vm:instance() error: " .. tostring(inst))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- STEP 4: Get nested ViewModel property
    -- ═══════════════════════════════════════════════════════════════
    print("\n══ STEP 4: vm:getViewModel('nestedVM') ══")

    local nestedProp = vm:getViewModel("nestedVM")
    dumpKeys(nestedProp, "nestedProp from getViewModel")

    if nestedProp then
        -- PropertyViewModel has .value to get the nested VM directly!
        print("\n   Trying nestedProp.value (the correct way)...")
        local nestedVM = (nestedProp :: any).value
        dumpKeys(nestedVM, "nestedVM from nestedProp.value")

        if nestedVM then
            print("\n   Trying nestedVM:getNumber('nestedValue')...")
            local nestedNumOk, nestedNum = pcall(function()
                return (nestedVM :: any):getNumber("nestedValue")
            end)
            if nestedNumOk and nestedNum then
                dumpKeys(nestedNum, "nested number property")
                print("\n   Reading nested value: " .. tostring((nestedNum :: any).value))
            elseif nestedNumOk then
                print("      nestedNum is nil - add 'nestedValue' to nested VM")
            else
                print("      ❌ Error: " .. tostring(nestedNum))
            end
        end

        -- Also show that instance() does NOT work
        print("\n   NOTE: nestedProp:instance() does NOT work!")
        print("   Use nestedProp.value instead to get nested ViewModel")
    end

    -- ═══════════════════════════════════════════════════════════════
    -- STEP 5: Check what methods context has
    -- ═══════════════════════════════════════════════════════════════
    print("\n══ STEP 5: Context methods ══")
    dumpKeys(context, "context")

    print("\n═══════════════════════════════════════════════════════════════")
    print("EXPLORATION COMPLETE")
    print("═══════════════════════════════════════════════════════════════")

    return true
end

function draw(self: VMExplore, renderer: Renderer)
end

return function(): Node<VMExplore>
    return {
        init = init,
        draw = draw,
    }
end
