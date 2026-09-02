-- Direct Web 2.41.1 / runtime-v0.1.344 Layout callback fixture.
-- The third argument is device pixels per layout point. Existing callbacks
-- that declare only self and size remain compatible at runtime.

export type RuntimeV0344LayoutProbe = {
    logicalWidth: number,
    logicalHeight: number,
    pixelWidth: number,
    lastDisplayScale: number,
}

function resize(
    self: RuntimeV0344LayoutProbe,
    size: Vector,
    displayScale: number
)
    self.logicalWidth = size.x
    self.logicalHeight = size.y
    self.pixelWidth = size.x * displayScale
    self.lastDisplayScale = displayScale
end

return function(): Layout<RuntimeV0344LayoutProbe>
    return {
        resize = resize,
        logicalWidth = 0,
        logicalHeight = 0,
        pixelWidth = 0,
        lastDisplayScale = 1,
    }
end
