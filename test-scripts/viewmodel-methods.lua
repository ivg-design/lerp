--!strict
-- VIEWMODEL METHODS TEST
-- What methods actually exist on ViewModel?

export type VMTest = {
    context: Context,
}

function init(self: VMTest, context: Context): boolean
    self.context = context
    local vm = context:viewModel()

    print("=== VIEWMODEL METHODS TEST ===")
    print("viewModel exists: " .. tostring(vm ~= nil))

    if vm then
        -- Check what methods/properties exist
        local methods = {
            "getNumber", "getString", "getBoolean", "getColor", "getEnum",
            "setNumber", "setString", "setBoolean", "setColor", "setEnum",
            "property", "value", "properties", "name", "id"
        }

        for _, method in methods do
            local exists = (vm :: any)[method] ~= nil
            print(method .. ": " .. tostring(exists))
        end
    end

    print("==============================")
    return true
end

function draw(self: VMTest, renderer: Renderer)
end

return function(): Node<VMTest>
    return {
        init = init,
        draw = draw,
        context = late(),
    }
end
