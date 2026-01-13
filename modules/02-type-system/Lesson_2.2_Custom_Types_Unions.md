# Lesson 2.2: Custom Types & Unions

## Learning Objectives
- Define custom type aliases with the `type` keyword
- Create table types (interfaces) for complex data
- Use union types for flexible values
- Understand and use optional types (`?`)
- Implement discriminated unions for state management

---

## Why Custom Types?

In Lesson 2.1, we used built-in types like `number` and `string`. But real applications need custom data structures:

- Player stats with multiple properties
- Configuration objects
- State machines with different states
- Data from ViewModels

Custom types give names to these structures, making code self-documenting and type-safe.

---

## Quick Concept Review

```lua
-- Type alias (gives a name to a type)
type Age = number

-- Table type (defines shape of data)
type Player = {
    name: string,
    health: number,
}

-- Union type (can be one of several types)
type StringOrNumber = string | number

-- Optional type (can be nil)
type MaybeString = string?
```

---

## Exercise 1: Basic Type Aliases ⭐

**Context**: Type aliases make code more readable by giving meaningful names to types.

**Task**: Create type aliases and use them in your code:

```lua
--!strict

-- Part A: Create these type aliases
-- Pixels should be a number
-- Percentage should be a number (0-100)
-- ColorHex should be a string
-- YOUR CODE HERE

export type TypeAliasDemo = {}

function init(self: TypeAliasDemo): boolean
    -- Part B: Use your type aliases
    local screenWidth: Pixels = 1920
    local completion: Percentage = 75
    local background: ColorHex = "#FF5500"

    print(`Screen: {screenWidth}px`)
    print(`Progress: {completion}%`)
    print(`Color: {background}`)

    -- Part C: Type aliases are just names - this still works
    local anotherWidth: Pixels = 100 + 200  -- Pixels is just number

    -- But this provides documentation value!

    return true
end

return function(): Node<TypeAliasDemo>
    return { init = init }
end
```

**Questions**:
1. Do type aliases create new types or just rename existing ones?
2. What happens if you assign a plain `number` to a `Pixels` variable?

---

## Exercise 2: Table Types (Interfaces) ⭐

**Context**: Table types define the "shape" of your data structures, like interfaces in other languages.

**Task**: Define and use table types:

```lua
--!strict

-- Part A: Define these types
-- Enemy: has name (string), health (number), damage (number)
-- Weapon: has name (string), power (number), range (number)
-- Position: has x (number), y (number)

type Enemy = {
    -- YOUR CODE HERE
}

type Weapon = {
    -- YOUR CODE HERE
}

type Position = {
    -- YOUR CODE HERE
}

export type TableTypesDemo = {}

function init(self: TableTypesDemo): boolean
    -- Part B: Create instances matching your types
    local goblin: Enemy = {
        name = "Goblin",
        health = 30,
        damage = 5
    }

    local sword: Weapon = {
        name = "Iron Sword",
        power = 15,
        range = 2
    }

    local spawn: Position = {
        x = 100,
        y = 200
    }

    -- Part C: Test that types prevent errors
    -- Uncomment and observe the error:
    -- local brokenEnemy: Enemy = { name = "Orc" }  -- Missing health and damage!

    print(`Enemy: {goblin.name} with {goblin.health} HP`)
    print(`Weapon: {sword.name} ({sword.power} damage)`)
    print(`Position: ({spawn.x}, {spawn.y})`)

    return true
end

return function(): Node<TableTypesDemo>
    return { init = init }
end
```

**Expected Output**:
```
Enemy: Goblin with 30 HP
Weapon: Iron Sword (15 damage)
Position: (100, 200)
```

---

## Exercise 3: Nested and Complex Types ⭐⭐

**Context**: Real applications have nested data structures.

**Task**: Build a character system with nested types:

```lua
--!strict

-- Define these types in order

-- Stats: strength, defense, speed (all numbers)
type Stats = {
    -- YOUR CODE HERE
}

-- Inventory: items (array of strings), gold (number)
type Inventory = {
    -- YOUR CODE HERE
}

-- Character: name (string), level (number), stats (Stats), inventory (Inventory), position (Position from before)
type Position = { x: number, y: number }

type Character = {
    -- YOUR CODE HERE
}

-- Function with typed parameter and return
local function createCharacter(name: string, level: number): Character
    return {
        name = name,
        level = level,
        stats = {
            strength = 10 + level * 2,
            defense = 5 + level,
            speed = 8 + level
        },
        inventory = {
            items = {"Starter Sword", "Health Potion"},
            gold = 100
        },
        position = {
            x = 0,
            y = 0
        }
    }
end

local function printCharacter(char: Character)
    print(`=== {char.name} (Level {char.level}) ===`)
    print(`STR: {char.stats.strength}, DEF: {char.stats.defense}, SPD: {char.stats.speed}`)
    print(`Gold: {char.inventory.gold}`)
    print(`Items: {#char.inventory.items}`)
    print(`Position: ({char.position.x}, {char.position.y})`)
end

export type NestedTypesDemo = {}

function init(self: NestedTypesDemo): boolean
    local hero = createCharacter("Aria", 5)
    printCharacter(hero)

    -- Modify nested properties
    hero.stats.strength += 5
    hero.inventory.gold -= 50
    table.insert(hero.inventory.items, "Magic Ring")

    print("\nAfter upgrades:")
    printCharacter(hero)

    return true
end

return function(): Node<NestedTypesDemo>
    return { init = init }
end
```

---

## Exercise 4: Union Types ⭐⭐

**Context**: Sometimes a value can legitimately be one of several types.

**Task**: Work with union types:

```lua
--!strict

-- A value that could be a number or a string
type ID = number | string

-- A result that could be success (string) or error code (number)
type Result = string | number

-- A value that could be a position OR a direction name
type Movement = {x: number, y: number} | "up" | "down" | "left" | "right"

export type UnionDemo = {}

-- This function accepts either type
local function printID(id: ID)
    -- We need to check which type it is before using type-specific operations
    if type(id) == "number" then
        print(`Numeric ID: {id}`)
    else
        print(`String ID: {id}`)
    end
end

-- YOUR TASK: Implement this function
-- If Movement is a string ("up", etc.), print the direction name
-- If Movement is a table with x,y, print the coordinates
local function processMovement(move: Movement)
    -- YOUR CODE HERE
    -- Hint: type(move) == "string" or type(move) == "table"
end

function init(self: UnionDemo): boolean
    printID(12345)
    printID("ABC-789")

    processMovement("up")
    processMovement("left")
    processMovement({x = 10, y = 20})

    return true
end

return function(): Node<UnionDemo>
    return { init = init }
end
```

**Expected Output**:
```
Numeric ID: 12345
String ID: ABC-789
Direction: up
Direction: left
Coordinates: (10, 20)
```

---

## Exercise 5: Optional Types ⭐⭐

**Context**: Optional types (`?`) indicate a value might be `nil`. This is crucial for safe code.

**Task**: Handle optional values safely:

```lua
--!strict

type UserProfile = {
    username: string,
    displayName: string?,      -- Optional: might not be set
    email: string?,            -- Optional
    age: number?,              -- Optional
    verified: boolean,
}

-- This function REQUIRES an email
local function sendEmail(email: string, message: string)
    print(`Sending "{message}" to {email}`)
end

-- YOUR TASK: Implement these functions

-- Function 1: Get display name, fallback to username if not set
local function getDisplayName(user: UserProfile): string
    -- YOUR CODE HERE
    -- If displayName exists, return it
    -- Otherwise, return username
end

-- Function 2: Safely send a welcome email (only if email exists)
local function sendWelcomeEmail(user: UserProfile)
    -- YOUR CODE HERE
    -- Only call sendEmail if user.email is not nil
    -- Otherwise print "No email on file for {username}"
end

-- Function 3: Get age category
-- Returns "minor" if age < 18, "adult" if >= 18, "unknown" if age is nil
local function getAgeCategory(user: UserProfile): string
    -- YOUR CODE HERE
end

export type OptionalDemo = {}

function init(self: OptionalDemo): boolean
    local user1: UserProfile = {
        username = "warrior42",
        displayName = "The Mighty Warrior",
        email = "warrior@example.com",
        age = 25,
        verified = true
    }

    local user2: UserProfile = {
        username = "newbie",
        verified = false
        -- No displayName, email, or age!
    }

    print(`User 1 display: {getDisplayName(user1)}`)
    print(`User 2 display: {getDisplayName(user2)}`)

    sendWelcomeEmail(user1)
    sendWelcomeEmail(user2)

    print(`User 1 category: {getAgeCategory(user1)}`)
    print(`User 2 category: {getAgeCategory(user2)}`)

    return true
end

return function(): Node<OptionalDemo>
    return { init = init }
end
```

**Expected Output**:
```
User 1 display: The Mighty Warrior
User 2 display: newbie
Sending "Welcome!" to warrior@example.com
No email on file for newbie
User 1 category: adult
User 2 category: unknown
```

---

## Exercise 6: Discriminated Unions (State Machines) ⭐⭐⭐

**Context**: A powerful pattern for state machines. Add a `kind` field to distinguish between states.

**Task**: Implement a loading state machine:

```lua
--!strict

-- Each state has a "kind" field that identifies it
type LoadingState = { kind: "idle" }
type FetchingState = { kind: "fetching", url: string, progress: number }
type SuccessState = { kind: "success", data: string }
type ErrorState = { kind: "error", message: string, code: number }

-- Union of all states
type AppState = LoadingState | FetchingState | SuccessState | ErrorState

local function renderState(state: AppState)
    -- Luau narrows the type based on the kind field
    if state.kind == "idle" then
        print("Ready to load...")
    elseif state.kind == "fetching" then
        -- Inside this block, state is known to be FetchingState
        print(`Loading {state.url}: {state.progress}%`)
    elseif state.kind == "success" then
        print(`Loaded: {state.data}`)
    elseif state.kind == "error" then
        print(`Error {state.code}: {state.message}`)
    end
end

export type StateDemo = {
    currentState: AppState,
}

-- YOUR TASK: Implement state transitions

-- Transition from idle to fetching
local function startLoading(url: string): FetchingState
    -- YOUR CODE HERE
end

-- Update progress (stays in fetching state)
local function updateProgress(state: FetchingState, newProgress: number): FetchingState
    -- YOUR CODE HERE
end

-- Transition to success
local function finishLoading(data: string): SuccessState
    -- YOUR CODE HERE
end

-- Transition to error
local function failLoading(message: string, code: number): ErrorState
    -- YOUR CODE HERE
end

function init(self: StateDemo): boolean
    -- Simulate a loading sequence
    self.currentState = { kind = "idle" }
    renderState(self.currentState)

    self.currentState = startLoading("https://api.example.com/data")
    renderState(self.currentState)

    -- Type guard: only update progress if we're in fetching state
    if self.currentState.kind == "fetching" then
        self.currentState = updateProgress(self.currentState, 50)
        renderState(self.currentState)

        self.currentState = updateProgress(self.currentState, 100)
        renderState(self.currentState)
    end

    -- Success path
    self.currentState = finishLoading("Player data loaded!")
    renderState(self.currentState)

    -- Alternative: Error path
    print("\n--- Simulating error ---")
    self.currentState = { kind = "idle" }
    self.currentState = startLoading("https://api.example.com/missing")
    self.currentState = failLoading("Resource not found", 404)
    renderState(self.currentState)

    return true
end

return function(): Node<StateDemo>
    return {
        init = init,
        currentState = { kind = "idle" }
    }
end
```

---

## Exercise 7: Read-Only Properties ⭐⭐⭐

**Context**: Sometimes you want to prevent modification of certain properties.

**Task**: Experiment with read-only types:

```lua
--!strict

-- Read-only properties use the 'read' modifier
type ImmutableConfig = {
    read version: string,
    read maxPlayers: number,
    read debug: boolean,
}

type MutableConfig = {
    currentPlayers: number,
    serverName: string,
}

type GameConfig = ImmutableConfig & MutableConfig

export type ReadOnlyDemo = {}

function init(self: ReadOnlyDemo): boolean
    local config: GameConfig = {
        version = "1.0.0",
        maxPlayers = 100,
        debug = false,
        currentPlayers = 0,
        serverName = "Main Server"
    }

    -- Reading is always OK
    print(`Version: {config.version}`)
    print(`Max Players: {config.maxPlayers}`)

    -- Mutable properties can be changed
    config.currentPlayers = 42
    config.serverName = "Updated Server"

    -- Try uncommenting these lines - they should error!
    -- config.version = "2.0.0"  -- Error: cannot write to read-only property
    -- config.maxPlayers = 200   -- Error: cannot write to read-only property

    print(`Current Players: {config.currentPlayers}`)
    print(`Server: {config.serverName}`)

    return true
end

return function(): Node<ReadOnlyDemo>
    return { init = init }
end
```

---

## Comprehension Check

1. **What's the difference between `type Point = {x: number, y: number}` and using a plain table?**

2. **When would you use a union type vs. optional type?**

3. **Why is the `kind` field pattern useful for state machines?**

4. **What happens if you try to access `.progress` on an `AppState` without checking `.kind` first?**

---

## Self-Assessment Checklist

- [ ] I can define custom type aliases
- [ ] I can create table types with multiple properties
- [ ] I can nest types inside other types
- [ ] I understand union types (`A | B`)
- [ ] I can handle optional types (`T?`) safely
- [ ] I can implement discriminated unions with `kind` fields
- [ ] I understand read-only properties

---

## Common Mistakes

1. **Forgetting required properties**: Table types require ALL properties
2. **Not checking optionals**: Always guard `string?` before use
3. **Accessing union properties without narrowing**: Check the type first
4. **Confusing `?` and `| nil`**: They're equivalent, but `?` is cleaner

---

## Next Lesson
**Lesson 2.3: Generics & Advanced Types** - Create flexible, reusable type definitions
