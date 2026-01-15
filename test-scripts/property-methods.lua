--!strict
-- PROPERTY METHODS EXPLORER
-- What methods/properties actually exist on Property objects?

export type PropExplore = {}

function init(self: PropExplore, context: Context): boolean
    local vm = context:viewModel()
    if not vm then
        print("No ViewModel found")
        return false
    end

    print("=== PROPERTY METHODS EXPLORER ===\n")

    local numProp = vm:getNumber("testNumber")
    if numProp then
        print("── Number Property ──")
        print("type: " .. type(numProp))
        print("typeof: " .. typeof(numProp))
        print("tostring: " .. tostring(numProp))

        -- Try to iterate/explore
        print("\nChecking common method names:")
        local methods = {
            "value", "addListener", "removeListener", "onChange",
            "subscribe", "listen", "bind", "get", "set",
            "getValue", "setValue", "name", "type"
        }
        for _, m in methods do
            local exists = (numProp :: any)[m] ~= nil
            local mtype = type((numProp :: any)[m])
            if exists then
                print("  " .. m .. ": " .. mtype)
            end
        end

        -- Try metatable
        print("\nMetatable:")
        local mt = getmetatable(numProp :: any)
        if mt then
            print("  Has metatable: true")
            for k, v in pairs(mt) do
                print("    " .. tostring(k) .. " = " .. type(v))
            end
        else
            print("  Has metatable: false (or protected)")
        end
    end

    print("\n── Trigger Property ──")
    local trigProp = vm:getTrigger("testTrigger")
    if trigProp then
        print("type: " .. type(trigProp))
        print("typeof: " .. typeof(trigProp))

        local trigMethods = {
            "fire", "trigger", "emit", "invoke", "call",
            "addListener", "listen", "value"
        }
        print("\nChecking trigger methods:")
        for _, m in trigMethods do
            local exists = pcall(function()
                return (trigProp :: any)[m]
            end)
            if exists then
                local val = (trigProp :: any)[m]
                print("  " .. m .. ": " .. type(val) .. " = " .. tostring(val))
            end
        end
    end

    print("\n=================================")
    return true
end

function draw(self: PropExplore, renderer: Renderer)
end

return function(): Node<PropExplore>
    return {
        init = init,
        draw = draw,
    }
end
