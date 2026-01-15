--!strict
-- AUDIT PROBE: Tests API claims from LERP course
-- Attach to any node, check Console for results

export type AuditProbe = {
    speed: Input<number>,
    context: Context,
    path: Path,
}

function init(self: AuditProbe, context: Context): boolean
    self.context = context
    self.path = Path.new()

    -- Test 1: Does Path have clone()?
    local okClone = pcall(function()
        return (self.path :: any):clone()
    end)

    -- Test 2: Does context have addEventListener()?
    local addEventExists = ((context :: any).addEventListener ~= nil)

    -- Test 3: ViewModel method tests
    local vm = context:viewModel()
    local vmExists = vm ~= nil
    local okSetNumber = false
    local okProperty = false
    if vm then
        okSetNumber = pcall(function()
            return (vm :: any):setNumber("probe", 1)
        end)
        okProperty = pcall(function()
            return (vm :: any):property("probe")
        end)
    end

    -- Test 4: Does Input<T> have .value?
    local okInputValue = pcall(function()
        return (self.speed :: any).value
    end)

    -- Test 5: Does Input<T> have addListener?
    local okInputListener = pcall(function()
        return (self.speed :: any).addListener
    end)

    -- Print results
    print("=== AUDIT PROBE RESULTS ===")
    print("Path.clone() exists: " .. tostring(okClone))
    print("context.addEventListener exists: " .. tostring(addEventExists))
    print("viewModel exists: " .. tostring(vmExists))
    print("vm:setNumber() works: " .. tostring(okSetNumber))
    print("vm:property() works: " .. tostring(okProperty))
    print("Input.value exists: " .. tostring(okInputValue))
    print("Input.addListener exists: " .. tostring(okInputListener))
    print("===========================")

    return true
end

function update(self: AuditProbe)
    -- Test 6: Does update receive context parameter?
    -- If this function runs, update(self) signature works
    print("UPDATE: called (no context param in signature)")
end

function draw(self: AuditProbe, renderer: Renderer)
end

return function(): Node<AuditProbe>
    return {
        init = init,
        update = update,
        draw = draw,
        speed = 1,
        context = late(),
        path = late(),
    }
end
