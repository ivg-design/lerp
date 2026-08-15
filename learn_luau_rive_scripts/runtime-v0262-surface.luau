-- Runtime v0.1.262 source-surface probe.
-- Static/LSP reconciliation fixture; runtime/editor behavior still requires
-- an exported .riv and a focused probe in the selected lane.

type RuntimeSurfaceProbe = {
    vm: ViewModel?,
    global: ViewModel?,
    names: { string },
    vectorBytes: buffer,
}

local function mathSurface(): buffer
    local a = Vector.xyz(1, 0, 0)
    local b = Vector.xyz(0, 1, 0)
    local normal = Vector.cross3(a, b)
    local view = Mat4.lookAt(Vector.xyz(0, 0, 4), Vector.xyz(0, 0, 0), Vector.xyz(0, 1, 0))
    local projection = Mat4.ortho(-2, 2, -2, 2, 0.1, 100)
    local bytes = buffer.create(32)
    normal:writeToBuffer(bytes, 0)
    normal:writeVec4(bytes, 16, view[1] + projection[1])
    return bytes
end

function init(self: RuntimeSurfaceProbe, context: Context): boolean
    self.names = context:globalViewModelNames()
    self.global = context:globalViewModel("Theme")
    self.vm = context:viewModel()
    self.vectorBytes = mathSurface()

    if self.vm then
        local blob = self.vm:getBlob("payload")
        if blob then
            local writable = blob :: any
            writable.value = "probe"
            writable.value = buffer.create(0)
            writable.value = nil
        end
    end

    return true
end

function draw(self: RuntimeSurfaceProbe, renderer: Renderer)
    -- drawCanvas is retired; Canvas/GPUCanvas work belongs here when the
    -- selected Early Access/editor lane exposes those APIs.
end

return function(): Node<RuntimeSurfaceProbe>
    return {
        init = init,
        draw = draw,
        vm = nil,
        global = nil,
        names = {},
        vectorBytes = buffer.create(32),
    }
end
