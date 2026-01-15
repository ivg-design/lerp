--!strict
-- CONTEXT METHODS TEST
-- What methods actually exist on Context?

export type ContextTest = {
    context: Context,
}

function init(self: ContextTest, context: Context): boolean
    self.context = context

    print("=== CONTEXT METHODS TEST ===")

    -- Check what methods/properties exist on context
    local methods = {
        "viewModel", "markNeedsUpdate", "artboard", "addEventListener",
        "node", "root", "time", "deltaTime"
    }

    for _, method in methods do
        local exists = (context :: any)[method] ~= nil
        print("context." .. method .. ": " .. tostring(exists))
    end

    print("==============================")
    return true
end

function draw(self: ContextTest, renderer: Renderer)
end

return function(): Node<ContextTest>
    return {
        init = init,
        draw = draw,
        context = late(),
    }
end
