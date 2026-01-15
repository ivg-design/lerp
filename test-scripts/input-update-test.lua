--!strict
--[[
  INPUT UPDATE TEST
  =================
  Verifies that update() fires when inputs change externally.

  HOW TO TEST:
  1. Attach this script to a node
  2. Watch the console
  3. Change 'testSpeed' value in the Properties panel
  4. Verify "UPDATE FIRED" appears in console
]]

export type InputUpdateTest = {
    testSpeed: Input<number>,
    lastSpeed: number,
    updateCount: number,
}

function init(self: InputUpdateTest, context: Context): boolean
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║              INPUT UPDATE TEST                                ║")
    print("╚═══════════════════════════════════════════════════════════════╝")
    print("")
    print("📋 INSTRUCTIONS:")
    print("   1. Change 'testSpeed' in the Properties panel")
    print("   2. Watch for 'UPDATE FIRED' messages below")
    print("")
    print("Initial testSpeed = " .. tostring(self.testSpeed))
    print("")
    print("Waiting for input changes...")
    print("─────────────────────────────────────────────────────────────────")

    self.lastSpeed = self.testSpeed
    self.updateCount = 0

    return true
end

function update(self: InputUpdateTest)
    self.updateCount = self.updateCount + 1
    print("")
    print("🔔 UPDATE FIRED! (#" .. self.updateCount .. ")")
    print("   Previous speed: " .. tostring(self.lastSpeed))
    print("   New speed: " .. tostring(self.testSpeed))

    if self.testSpeed ~= self.lastSpeed then
        print("   ✅ Value actually changed!")
    else
        print("   ⚠️  Value unchanged (update fired for other reason)")
    end

    self.lastSpeed = self.testSpeed
end

function draw(self: InputUpdateTest, renderer: Renderer)
end

return function(): Node<InputUpdateTest>
    return {
        testSpeed = 50,
        lastSpeed = 0,
        updateCount = 0,
        init = init,
        update = update,
        draw = draw,
    }
end
