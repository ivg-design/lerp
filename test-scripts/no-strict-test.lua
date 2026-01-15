-- NO --!strict directive here!
-- If this script runs, strict mode is NOT required

export type NoStrict = {}

function init(self: NoStrict): boolean
    print("=== NO-STRICT TEST ===")
    print("Script ran WITHOUT --!strict")
    print("This proves strict is NOT required")
    print("======================")
    return true
end

function draw(self: NoStrict, renderer: Renderer)
end

return function(): Node<NoStrict>
    return {
        init = init,
        draw = draw,
    }
end
