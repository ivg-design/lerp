--!strict
-- LAYOUT PROBE: Tests which callbacks exist in Layout protocol
-- Official docs show only measure(self) and resize(self, size)
-- Course claims init/update also exist

export type LayoutProbe = {}

function init(self: LayoutProbe): boolean
    print("=== LAYOUT PROBE ===")
    print("init called - this means init IS part of Layout protocol")
    print("====================")
    return true
end

function update(self: LayoutProbe)
    print("update called - this means update IS part of Layout protocol")
end

function measure(self: LayoutProbe): Vector
    print("measure called")
    return Vector.xy(100, 50)
end

function resize(self: LayoutProbe, size: Vector)
    print("resize called: " .. tostring(size.x) .. "x" .. tostring(size.y))
end

return function(): Layout<LayoutProbe>
    return {
        init = init,
        update = update,
        measure = measure,
        resize = resize,
    }
end
