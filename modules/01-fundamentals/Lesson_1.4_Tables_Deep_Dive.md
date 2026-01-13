# Lesson 1.4: Tables Deep Dive

## Learning Objectives
- Use tables as arrays and dictionaries
- Master iteration with pairs, ipairs, and generalized iteration
- Apply table library functions (create, insert, remove, find, etc.)
- Understand table references and shallow copying

---

## Quick Concept Review

```lua
-- Array (sequential integer keys starting at 1)
local items = {"sword", "shield", "potion"}
print(items[1])  -- "sword"
print(#items)    -- 3

-- Dictionary (string keys)
local player = {name = "Hero", health = 100}
print(player.name)      -- "Hero"
print(player["health"]) -- 100

-- Iteration
for i, v in items do print(i, v) end      -- Generalized
for i, v in ipairs(items) do end           -- Array only
for k, v in pairs(player) do end           -- All keys
```

---

## Exercise 1: Array Operations ⭐

**Task**: Work with arrays using table functions.

```lua
--!strict
export type Exercise1 = {}

function init(self: Exercise1): boolean
    -- Create an inventory array
    local inventory = {"sword", "shield", "potion", "key"}
    
    -- Part A: Print all items with their indices
    print("Initial inventory:")
    -- YOUR CODE (use a for loop)
    
    -- Part B: Add "helmet" to the end
    -- Use: table.insert(t, value)
    -- YOUR CODE
    
    -- Part C: Add "boots" at position 2
    -- Use: table.insert(t, index, value)
    -- YOUR CODE
    
    -- Part D: Remove the item at position 4
    -- Use: table.remove(t, index) - returns removed item
    local removed = -- YOUR CODE
    print(`Removed: {removed}`)
    
    -- Part E: Find the index of "key"
    -- Use: table.find(t, value)
    local keyIndex = -- YOUR CODE
    print(`Key is at index: {keyIndex}`)
    
    -- Part F: Print final inventory
    print("\nFinal inventory:")
    -- YOUR CODE
    
    print(`Total items: {#inventory}`)
    
    return true
end

return function(): Node<Exercise1>
    return { init = init }
end
```

**Expected Output (approximately):**
```
Initial inventory:
1: sword
2: shield
3: potion
4: key
Removed: shield
Key is at index: 4
Final inventory:
1: sword
2: boots
3: potion
4: key
5: helmet
Total items: 5
```

---

## Exercise 2: Dictionary Operations ⭐

**Task**: Work with dictionaries (key-value tables).

```lua
--!strict
export type Exercise2 = {}

function init(self: Exercise2): boolean
    -- Create a character stats dictionary
    local stats = {
        strength = 10,
        agility = 15,
        intelligence = 12,
        luck = 8
    }
    
    -- Part A: Print all stats
    print("Character stats:")
    for stat, value in stats do
        print(`  {stat}: {value}`)
    end
    
    -- Part B: Calculate total stat points
    local total = 0
    -- YOUR CODE
    print(`Total points: {total}`)
    
    -- Part C: Add a new stat "endurance" = 11
    -- YOUR CODE
    
    -- Part D: Increase all stats by 5
    -- YOUR CODE
    
    -- Part E: Remove the "luck" stat
    -- Set it to nil
    -- YOUR CODE
    
    -- Part F: Print updated stats
    print("\nUpdated stats:")
    -- YOUR CODE
    
    -- Part G: Count remaining stats
    local count = 0
    -- YOUR CODE (note: # doesn't work for dictionaries!)
    print(`Number of stats: {count}`)
    
    return true
end

return function(): Node<Exercise2>
    return { init = init }
end
```

---

## Exercise 3: Mixed Tables & Nested Data ⭐⭐

**Task**: Work with complex data structures.

```lua
--!strict
export type Exercise3 = {}

function init(self: Exercise3): boolean
    -- A game world with multiple characters
    local world = {
        name = "Fantasy Realm",
        level = 1,
        characters = {
            {
                name = "Warrior",
                class = "Fighter",
                hp = 100,
                skills = {"Slash", "Block", "Charge"}
            },
            {
                name = "Mage",
                class = "Wizard",
                hp = 60,
                skills = {"Fireball", "Ice Shard", "Teleport", "Shield"}
            },
            {
                name = "Rogue",
                class = "Thief",
                hp = 75,
                skills = {"Backstab", "Stealth"}
            }
        }
    }
    
    -- Part A: Print world name and level
    print(`World: {world.name} (Level {world.level})`)
    
    -- Part B: Print each character's name and HP
    print("\nCharacters:")
    -- YOUR CODE
    
    -- Part C: Find the character with the most skills
    -- Print their name and skill count
    -- YOUR CODE
    
    -- Part D: Calculate total HP of all characters
    local totalHP = 0
    -- YOUR CODE
    print(`\nTotal party HP: {totalHP}`)
    
    -- Part E: Print all unique skills across all characters
    print("\nAll skills:")
    -- YOUR CODE (hint: iterate nested arrays)
    
    return true
end

return function(): Node<Exercise3>
    return { init = init }
end
```

---

## Exercise 4: Table Library Functions ⭐⭐

**Task**: Use advanced table library functions.

```lua
--!strict
export type Exercise4 = {}

function init(self: Exercise4): boolean
    -- Part A: table.create - preallocate
    print("Part A: Preallocated array")
    local scores = table.create(5, 0)  -- 5 zeros
    for i, v in scores do
        print(`{i}: {v}`)
    end
    
    -- Part B: table.clone - shallow copy
    print("\nPart B: Cloning")
    local original = {a = 1, b = 2, c = 3}
    local copy = table.clone(original)
    copy.a = 100
    print(`Original a: {original.a}`)  -- Should still be 1
    print(`Copy a: {copy.a}`)          -- Should be 100
    
    -- Part C: table.freeze - make read-only
    print("\nPart C: Freezing")
    local config = {maxPlayers = 4, difficulty = "hard"}
    table.freeze(config)
    print(`Is frozen: {table.isfrozen(config)}`)
    -- Try uncommenting: config.maxPlayers = 8  -- Would error!
    
    -- Part D: YOUR TASK
    -- Create a function 'removeDuplicates' that takes an array
    -- and returns a new array with duplicates removed
    -- Use table.find to check if item already exists
    
    print("\nPart D: Remove duplicates")
    local withDupes = {"a", "b", "a", "c", "b", "d", "a"}
    local unique = removeDuplicates(withDupes)
    
    for i, v in unique do
        print(`{i}: {v}`)
    end
    -- Expected: a, b, c, d
    
    return true
end

-- YOUR removeDuplicates function HERE

return function(): Node<Exercise4>
    return { init = init }
end
```

---

## Exercise 5: Reference Semantics ⭐⭐

**Task**: Understand that tables are references.

```lua
--!strict
export type Exercise5 = {}

function init(self: Exercise5): boolean
    -- Part A: Reference behavior
    print("Part A: Same reference")
    local original = {value = 10}
    local reference = original  -- NOT a copy!
    reference.value = 99
    print(`Original value: {original.value}`)  -- What will this be?
    
    -- Part B: Nested references with clone
    print("\nPart B: Shallow clone problem")
    local player = {
        name = "Hero",
        stats = {hp = 100, mp = 50}
    }
    local playerCopy = table.clone(player)
    playerCopy.name = "Villain"
    playerCopy.stats.hp = 1  -- Modifying nested table!
    
    print(`Original name: {player.name}`)
    print(`Original HP: {player.stats.hp}`)  -- What will this be?
    
    -- Part C: YOUR TASK
    -- Create a 'deepClone' function that clones nested tables too
    
    print("\nPart C: Deep clone")
    local data = {
        level = 1,
        inventory = {"sword", "shield"},
        stats = {str = 10, dex = 15}
    }
    
    local deepCopy = deepClone(data)
    deepCopy.level = 99
    deepCopy.inventory[1] = "axe"
    deepCopy.stats.str = 100
    
    -- Original should be unchanged:
    print(`Original level: {data.level}`)           -- Expected: 1
    print(`Original weapon: {data.inventory[1]}`)   -- Expected: sword
    print(`Original str: {data.stats.str}`)         -- Expected: 10
    
    return true
end

-- YOUR deepClone function HERE
-- Hint: Check if a value is a table with type(v) == "table"
-- If it is, recursively clone it

return function(): Node<Exercise5>
    return { init = init }
end
```

---

## Exercise 6: Practical Table Patterns ⭐⭐

**Task**: Common patterns you'll use in Rive.

```lua
--!strict
export type Exercise6 = {}

function init(self: Exercise6): boolean
    -- Pattern 1: Configuration objects
    local config = {
        speed = 100,
        gravity = 9.8,
        maxJump = 2,
        debug = false
    }
    
    -- Pattern 2: Entity list management
    local entities = {}
    
    -- Add entities
    table.insert(entities, {id = 1, x = 0, y = 0, active = true})
    table.insert(entities, {id = 2, x = 10, y = 5, active = true})
    table.insert(entities, {id = 3, x = 20, y = 10, active = false})
    
    -- YOUR TASK A: Filter active entities
    print("Active entities:")
    -- Print only entities where active == true
    -- YOUR CODE
    
    -- YOUR TASK B: Remove inactive entities
    -- Iterate BACKWARDS when removing!
    for i = #entities, 1, -1 do
        -- YOUR CODE
    end
    print(`Entities remaining: {#entities}`)
    
    -- Pattern 3: Lookup table (dictionary as set)
    local validCommands = {
        jump = true,
        attack = true,
        defend = true,
        heal = true
    }
    
    -- YOUR TASK C: Check if commands are valid
    local commands = {"jump", "fly", "attack", "explode"}
    for _, cmd in commands do
        local isValid = validCommands[cmd] or false
        print(`Command '{cmd}': {if isValid then "VALID" else "INVALID"}`)
    end
    
    return true
end

return function(): Node<Exercise6>
    return { init = init }
end
```

---

## Challenge: Build a Simple Database ⭐⭐⭐

**Task**: Create a mini in-memory database.

```lua
--!strict

-- Create a 'Database' table with these methods:
-- Database:insert(record) - adds record, auto-assigns id
-- Database:findById(id) - returns record or nil
-- Database:findWhere(field, value) - returns array of matching records
-- Database:update(id, updates) - merges updates into record
-- Database:delete(id) - removes record
-- Database:count() - returns number of records

export type Challenge = {}

function init(self: Challenge): boolean
    local db = Database.new()
    
    -- Insert records
    db:insert({name = "Alice", age = 25, role = "developer"})
    db:insert({name = "Bob", age = 30, role = "designer"})
    db:insert({name = "Charlie", age = 25, role = "developer"})
    
    print(`Total records: {db:count()}`)  -- Expected: 3
    
    -- Find by ID
    local record = db:findById(2)
    print(`Record 2: {record.name}`)  -- Expected: Bob
    
    -- Find where
    local developers = db:findWhere("role", "developer")
    print(`Developers: {#developers}`)  -- Expected: 2
    
    -- Update
    db:update(1, {age = 26, title = "Senior"})
    local updated = db:findById(1)
    print(`Alice's new age: {updated.age}`)  -- Expected: 26
    
    -- Delete
    db:delete(2)
    print(`After delete: {db:count()}`)  -- Expected: 2
    
    return true
end

-- YOUR Database implementation HERE

return function(): Node<Challenge>
    return { init = init }
end
```

---

## Self-Assessment Checklist

- [ ] I can create and manipulate arrays with table.insert/remove
- [ ] I can use table.find to search arrays
- [ ] I can iterate dictionaries with for k, v in table do
- [ ] I understand that # only works reliably for arrays
- [ ] I know the difference between shallow and deep cloning
- [ ] I understand table reference semantics

---

## Key Takeaways

1. **Arrays start at index 1** in Lua/Luau
2. **#table** only counts consecutive integer keys
3. **Tables are references** - assignment doesn't copy
4. **table.clone** is shallow - nested tables are still shared
5. **Remove while iterating** - go backwards!

---

## Submit Your Results

Share your outputs, especially:
- Exercise 5 (reference behavior - were you surprised?)
- Your deepClone implementation
- The database challenge

I'll review your table manipulation skills!

---

## Module 1 Complete! 🎉

You've finished the Fundamentals module! Before moving to Module 2 (Type System), make sure you're comfortable with all the concepts.

**Next: Module 2, Lesson 2.1: Type Annotations & Inference**

