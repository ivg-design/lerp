--!strict
--[[
  VIEWMODEL instance() TEST
  =========================
  Tests the ViewModel instance() method.

  SETUP:
  1. Create ViewModel "TestVM" with: testNumber (number=42)
  2. Optionally add nested ViewModel property "nestedVM"
  3. Bind TestVM to artboard, attach script, run
]]

export type VMInstanceTest = {}

function init(self: VMInstanceTest, context: Context): boolean
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║              VIEWMODEL instance() TEST                        ║")
    print("╚═══════════════════════════════════════════════════════════════╝\n")

    local vm = context:viewModel()
    if not vm then
        print("❌ No ViewModel bound - attach one to artboard!")
        return false
    end

    print("✅ Got ViewModel")
    print("   vm.name = " .. tostring(vm.name))

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 1: Check if instance() method exists
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 1. CHECKING instance() METHOD ──────────────────────────────")
    local vmAny = vm :: any
    local hasInstance = vmAny.instance ~= nil
    print("   vm.instance exists: " .. tostring(hasInstance))

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 2: Call instance()
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 2. CALLING vm:instance() ───────────────────────────────────")

    local ok, result = pcall(function()
        return vm:instance()
    end)

    if ok and result then
        print("✅ vm:instance() returned something")
        print("   type: " .. type(result))
        print("   typeof: " .. typeof(result))

        local resultAny = result :: any
        local hasGetNumber = resultAny.getNumber ~= nil
        print("   has getNumber: " .. tostring(hasGetNumber))
    elseif ok then
        print("⚠️  vm:instance() returned nil")
    else
        print("❌ vm:instance() error: " .. tostring(result))
    end

    -- ═══════════════════════════════════════════════════════════════
    -- TEST 3: Nested ViewModel
    -- ═══════════════════════════════════════════════════════════════
    print("\n── 3. NESTED VIEWMODEL instance() ─────────────────────────────")

    local nestedProp = vm:getViewModel("nestedVM")
    if nestedProp then
        print("✅ Got nested ViewModel property")

        local nestedOk, nestedResult = pcall(function()
            return (nestedProp :: any):instance()
        end)

        if nestedOk and nestedResult then
            print("   Nested :instance() returned: " .. typeof(nestedResult))
        else
            print("   Nested :instance() works: false")
        end
    else
        print("⚠️  No nested ViewModel (add 'nestedVM' property to test)")
    end

    print("\n═══════════════════════════════════════════════════════════════")
    print("TEST COMPLETE")
    print("═══════════════════════════════════════════════════════════════")

    return true
end

function draw(self: VMInstanceTest, renderer: Renderer)
end

return function(): Node<VMInstanceTest>
    return {
        init = init,
        draw = draw,
    }
end
