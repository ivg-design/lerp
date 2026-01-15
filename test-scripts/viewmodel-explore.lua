--!strict
-- VIEWMODEL EXPLORER
-- What IS the ViewModel and how do we access it?

export type VMExplore = {
    context: Context,
}

function init(self: VMExplore, context: Context): boolean
    self.context = context
    local vm = context:viewModel()

    print("=== VIEWMODEL EXPLORER ===")
    print("vm exists: " .. tostring(vm ~= nil))
    print("vm type: " .. type(vm))

    if vm then
        -- Try to see what type it is
        print("")
        print("-- Checking typeof --")
        local ok, typeofResult = pcall(function()
            return typeof(vm)
        end)
        if ok then
            print("typeof(vm): " .. tostring(typeofResult))
        end

        -- Try to iterate over it
        print("")
        print("-- Trying pairs iteration --")
        local pairsOk = pcall(function()
            for k, v in pairs(vm :: any) do
                print("  " .. tostring(k) .. " = " .. tostring(v))
            end
        end)
        print("pairs worked: " .. tostring(pairsOk))

        -- Try direct property access (if you have a ViewModel property named "test")
        print("")
        print("-- Trying direct property access --")
        local directOk, directVal = pcall(function()
            return (vm :: any).test
        end)
        print("direct access .test: " .. tostring(directOk) .. " val=" .. tostring(directVal))

        -- Try bracket access
        local bracketOk, bracketVal = pcall(function()
            return (vm :: any)["test"]
        end)
        print("bracket access ['test']: " .. tostring(bracketOk) .. " val=" .. tostring(bracketVal))

        -- Try calling it as a function
        print("")
        print("-- Trying function call --")
        local callOk = pcall(function()
            return (vm :: any)()
        end)
        print("vm() callable: " .. tostring(callOk))

        -- Check metatable
        print("")
        print("-- Checking metatable --")
        local mt = getmetatable(vm :: any)
        print("has metatable: " .. tostring(mt ~= nil))
        if mt then
            for k, v in pairs(mt) do
                print("  mt." .. tostring(k) .. " = " .. tostring(v))
            end
        end

        -- Try tostring
        print("")
        print("tostring(vm): " .. tostring(vm))
    end

    print("===========================")
    return true
end

function draw(self: VMExplore, renderer: Renderer)
end

return function(): Node<VMExplore>
    return {
        init = init,
        draw = draw,
        context = late(),
    }
end
