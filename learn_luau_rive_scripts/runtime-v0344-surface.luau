-- Direct Web 2.41.1 / runtime-v0.1.344 target-surface fixture.
-- Static analysis complements, but does not replace, an exported runtime test.

export type RuntimeV0316Probe = {
    globalNames: { string },
    theme: ViewModel?,
    documentText: string,
}

function init(self: RuntimeV0316Probe, context: Context): boolean
    self.globalNames = context:globalViewModelNames()
    self.theme = context:globalViewModel("Theme")

    local document = context:blob("ReleaseNotes")
    if document and document.size > 0 then
        local data = document.data
        if data then
            self.documentText = buffer.tostring(data)
        end
    end

    return true
end

function draw(_self: RuntimeV0316Probe, _renderer: Renderer)
    -- drawCanvas remains retired at this target. Canvas/GPUCanvas work and normal
    -- compositing belong in draw when the selected lane exposes those APIs.
end

return function(): Node<RuntimeV0316Probe>
    return {
        init = init,
        draw = draw,
        globalNames = {},
        theme = nil,
        documentText = "",
    }
end
