--!strict
-- ARTBOARD CLONE TEST
-- Does artboard have clone()?

export type ArtboardTest = {
    context: Context,
}

function init(self: ArtboardTest, context: Context): boolean
    self.context = context

    print("=== ARTBOARD CLONE TEST ===")

    -- Check if context has artboard method
    local hasArtboard = (context :: any).artboard ~= nil
    print("context.artboard exists: " .. tostring(hasArtboard))

    if hasArtboard then
        local artboard = (context :: any):artboard()
        print("artboard retrieved: " .. tostring(artboard ~= nil))

        if artboard then
            local hasClone = (artboard :: any).clone ~= nil
            print("artboard.clone exists: " .. tostring(hasClone))
        end
    end

    print("===========================")
    return true
end

function draw(self: ArtboardTest, renderer: Renderer)
end

return function(): Node<ArtboardTest>
    return {
        init = init,
        draw = draw,
        context = late(),
    }
end
