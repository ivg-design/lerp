--!strict
-- UPDATE CONTEXT TEST: Does update() receive a context parameter?
-- ANSWER: NO - the type checker rejected update(self, context)
-- Correct signature is update(self) only

export type UpdateTest = {
    context: Context,  -- Must capture in init if needed later
    counter: number,
}

function init(self: UpdateTest, context: Context): boolean
    -- Capture context here if you need it in update
    self.context = context
    self.counter = 0
    print("=== UPDATE CONTEXT TEST ===")
    print("Context captured in init()")
    print("Change an input to trigger update()")
    return true
end

-- CORRECT signature: update(self) - NO context parameter
function update(self: UpdateTest)
    self.counter = self.counter + 1
    print("update() called #" .. tostring(self.counter))
    print("Using captured context: " .. tostring(self.context ~= nil))

    -- Can still use context via self.context
    local vm = self.context:viewModel()
    print("ViewModel accessible via self.context: " .. tostring(vm ~= nil))
end

function draw(self: UpdateTest, renderer: Renderer)
end

return function(): Node<UpdateTest>
    return {
        init = init,
        update = update,
        draw = draw,
        context = late(),
        counter = 0,
    }
end
