---
name: teach-luau
description: Interactive Luau lessons for Rive scripting with code-first approach and hands-on exercises
user-invocable: true
---

# /teach-luau

Teaches Luau programming for Rive scripting using the LERP curriculum.

## Usage

```
/teach-luau                    # Start from beginning or continue
/teach-luau basics             # Variables, types, operators
/teach-luau tables             # Tables and data structures
/teach-luau functions          # Functions and closures
/teach-luau oop                # Classes and metatables
/teach-luau rive-basics        # Path, Paint, Renderer
/teach-luau viewmodel          # ViewModel API and data binding
/teach-luau inputs             # Input<T> and update()
/teach-luau lifecycle          # init, update, advance, draw
/teach-luau exercises          # Practice exercises
```

## Teaching Methodology

### Code-First Approach

1. **Show working code** - Start with a complete, runnable example
2. **Explain the code** - Break down each part
3. **Hands-on exercise** - User modifies or creates code
4. **Review** - Check for common mistakes

### Lesson Structure

```
## Topic Name

### Working Example
[Complete runnable code]

### What's Happening
[Line-by-line explanation]

### Try It Yourself
[Exercise with clear goal]

### Common Mistakes
[What to watch out for]
```

## Curriculum Topics

### 1. Luau Basics (basics)
- Variables: `local x = 10`
- Types: number, string, boolean, nil
- Type annotations: `local x: number = 10`
- String interpolation: `` `Value is {x}` ``
- Operators: +, -, *, /, //, %, ^, ..

### 2. Tables (tables)
- Array-style: `{1, 2, 3}`
- Dictionary-style: `{name = "test", value = 10}`
- Mixed tables
- Iterating: `for i, v in ipairs()`, `for k, v in pairs()`
- Table methods: insert, remove, sort

### 3. Functions (functions)
- Basic: `function add(a, b) return a + b end`
- Type annotations: `function add(a: number, b: number): number`
- Multiple returns
- Closures and upvalues
- Anonymous functions

### 4. OOP Patterns (oop)
- Metatables and __index
- Creating "classes"
- Self parameter and colon syntax
- The `:: any` cast pattern for Rive

### 5. Rive Basics (rive-basics)
- Path creation and commands
- Paint styles and colors
- Renderer drawing
- Coordinate system

### 6. ViewModel (viewmodel)
- Getting ViewModel from context
- Property types: getNumber, getString, getBoolean, getColor
- Reading and writing values (.value)
- Listeners (addListener)
- Triggers (getTrigger, fire)
- Nested ViewModels (.value pattern)

### 7. Inputs (inputs)
- Input<T> declaration
- Direct access (no .value!)
- update() function for changes
- Factory return defaults vs init setup

### 8. Lifecycle (lifecycle)
- init(self, context): boolean
- update(self) - NO context!
- advance(self, seconds): boolean
- draw(self, renderer)
- When each is called

## Exercise Templates

### Basic Exercise
```lua
--!strict
-- EXERCISE: [Goal]
-- TODO: [What to implement]

export type Exercise = {
    -- Define your type here
}

function init(self: Exercise, context: Context): boolean
    -- Your code here
    return true
end

function draw(self: Exercise, renderer: Renderer)
    -- Your code here
end

return function(): Node<Exercise>
    return {
        init = init,
        draw = draw,
    }
end
```

### ViewModel Exercise
```lua
--!strict
-- EXERCISE: Read and display a ViewModel property

export type VMExercise = {
    label: Property<string>?,
}

function init(self: VMExercise, context: Context): boolean
    local vm = context:viewModel()
    if vm then
        self.label = vm:getString("label")
    end
    return true
end

-- TODO: Add update() to react to changes
-- TODO: Print the label value

function draw(self: VMExercise, renderer: Renderer)
end

return function(): Node<VMExercise>
    return {
        init = init,
        draw = draw,
    }
end
```

## Reference Materials

- LERP Docs: `/Users/ivg/github/forge/apps/lerp/docs/`
- Exercises: `/Users/ivg/github/forge/apps/lerp/learn_luau_rive_scripts/`
- Test Scripts: `/Users/ivg/github/forge/apps/lerp/test-scripts/`
- Rive Docs: https://rive.app/docs/scripting/
