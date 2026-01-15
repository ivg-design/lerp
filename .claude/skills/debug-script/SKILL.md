---
name: debug-script
description: Debug and fix Rive Luau scripts with systematic error analysis
user-invocable: true
---

# /debug-script

Analyzes and fixes issues in Rive Luau scripts.

## Usage

```
/debug-script                  # Analyze script in current context
/debug-script [paste code]     # Analyze pasted code
/debug-script [file path]      # Analyze specific file
```

## Debugging Process

### Step 1: Check Common Gotchas First

| Error Pattern | Likely Cause | Fix |
|---------------|--------------|-----|
| `update(self, context)` | Wrong signature | Remove context parameter |
| `self.input.value` | Treating Input as Property | Use `self.input` directly |
| `vm:setNumber()` | Non-existent method | Use `vm:getNumber().value = x` |
| `vm:property()` | Non-existent method | Use `vm:getNumber/String/etc.` |
| `nestedProp:instance()` | Wrong access pattern | Use `nestedProp.value` |
| `context:addEventListener()` | Non-existent method | Use vm:getTrigger() |
| `path:clone()` | Non-existent method | Create new Path |

### Step 2: Analyze Error Messages

#### Type Errors (Problems Panel)

| Error | Meaning | Solution |
|-------|---------|----------|
| `Type 'number' does not have key 'value'` | Using .value on Input<T> | Remove .value |
| `Cannot call a value of type ~(false?)` | Luau unsure if callable | Use pcall or type check |
| `attempt to index nil` | Accessing property on nil | Add nil check |
| `Unknown global` | Undefined variable | Check spelling, add local |

#### Runtime Errors (Console)

| Error | Meaning | Solution |
|-------|---------|----------|
| `attempt to index nil with 'x'` | nil object access | Check if object exists |
| `attempt to call a nil value` | Missing function | Ensure function is returned from factory |
| `invalid argument` | Wrong type passed | Check parameter types |

### Step 3: Verify Structure

```lua
-- Required structure check
--!strict  -- Recommended

export type MyNode = {
    -- All properties declared here
}

function init(self: MyNode, context: Context): boolean
    -- Returns boolean
    return true
end

function update(self: MyNode)  -- NO context!
    -- Called on input change
end

function advance(self: MyNode, seconds: number): boolean
    -- Called every frame
    return true
end

function draw(self: MyNode, renderer: Renderer)
    -- Render here
end

return function(): Node<MyNode>
    return {
        -- All Input<T> defaults here
        -- All lifecycle functions here
        init = init,
        update = update,
        advance = advance,
        draw = draw,
    }
end
```

### Step 4: Check ViewModel Patterns

```lua
-- CORRECT ViewModel usage
local vm = context:viewModel()
if vm then
    -- Get property (returns Property<T> or nil)
    local prop = vm:getNumber("name")
    if prop then
        -- Read
        local value = prop.value
        -- Write
        prop.value = 100
        -- Listen
        prop:addListener(function()
            print("Changed!")
        end)
    end

    -- Nested ViewModel
    local nested = vm:getViewModel("child")
    if nested then
        local nestedVM = nested.value  -- .value, NOT :instance()
        local innerProp = nestedVM:getNumber("value")
    end

    -- Trigger
    local trigger = vm:getTrigger("onAction")
    if trigger then
        trigger:addListener(function() end)
        trigger:fire()
    end
end
```

### Step 5: Add Debug Prints

```lua
-- Strategic debug prints
function init(self: MyNode, context: Context): boolean
    print("=== INIT START ===")

    local vm = context:viewModel()
    print("ViewModel:", vm and "found" or "nil")

    if vm then
        local prop = vm:getNumber("test")
        print("Property:", prop and prop.value or "nil")
    end

    print("=== INIT END ===")
    return true
end
```

## Quick Fixes

### Input Not Updating
```lua
-- Add update() function
function update(self: MyNode)
    print("Input changed!")
    rebuild(self)  -- Rebuild geometry
end
```

### ViewModel Changes Not Reflected
```lua
-- Add listener in init()
prop:addListener(function()
    rebuild(self)
    context:markNeedsUpdate()
end)
```

### Path Not Drawing
```lua
-- Check paint style
self.paint = Paint.with({
    style = "fill",  -- or "stroke"
    color = Color.rgb(255, 0, 0)
})

-- Check path has geometry
self.path:moveTo(Vector.xy(0, 0))
self.path:lineTo(Vector.xy(100, 100))
```

## Output Format

When debugging, provide:

1. **Issue identified** - What's wrong
2. **Root cause** - Why it's happening
3. **Fix** - Corrected code
4. **Prevention** - How to avoid in future
