# Lesson 3.1: Metatables & __index

## Learning Objectives
- Understand what metatables are and how they work
- Use `setmetatable()` to attach behavior to tables
- Master the `__index` metamethod for property lookup
- Implement basic object-like behavior

---

## Why Metatables?

Luau doesn't have built-in classes like Java or C#. Instead, it uses **metatables** - special tables that define custom behavior for other tables.

Think of a metatable as a "behavior manual" for a table. When Luau doesn't know how to perform an operation on a table, it consults the metatable for instructions.

**Real-world analogy**: If you find a device you've never seen before, you'd look for an instruction manual. The metatable is that manual.

---

## Quick Concept Review

```lua
-- Metatable basics
local metatable = { ... }       -- A table with special keys
setmetatable(target, metatable) -- Attach the "manual"

-- The __index metamethod: "What to do when a key isn't found"
local meta = {
    __index = fallbackTable  -- Look in this table
}

-- Or use a function for computed values
local meta = {
    __index = function(self, key)
        return "default value for " .. key
    end
}
```

---

## Exercise 1: Your First Metatable ⭐

**Context**: Let's see how `setmetatable` changes table behavior.

**Task**: Observe how metatables intercept operations:

```lua
--!strict

export type MetatableBasics = {}

function init(self: MetatableBasics): boolean
    -- A regular table
    local person = { name = "Alice" }

    -- Accessing existing key works
    print(`Name: {person.name}`)

    -- Accessing missing key returns nil
    print(`Age: {person.age}`)  -- nil

    -- Now let's add a metatable
    local meta = {
        __index = function(tbl, key)
            print(`Looking up missing key: {key}`)
            return "unknown"
        end
    }

    setmetatable(person, meta)

    -- Now missing keys trigger the __index function
    print(`Age (with metatable): {person.age}`)
    print(`City (with metatable): {person.city}`)

    -- Existing keys STILL work directly (no __index called)
    print(`Name (still direct): {person.name}`)

    return true
end

return function(): Node<MetatableBasics>
    return { init = init }
end
```

**Expected Output**:
```
Name: Alice
Age: nil
Looking up missing key: age
Age (with metatable): unknown
Looking up missing key: city
City (with metatable): unknown
Name (still direct): Alice
```

**Key Insight**: `__index` is ONLY called when the key doesn't exist in the table itself.

---

## Exercise 2: __index with a Fallback Table ⭐

**Context**: The most common use of `__index` is to point to another table containing shared properties or methods.

**Task**: Create a prototype pattern:

```lua
--!strict

export type FallbackDemo = {}

function init(self: FallbackDemo): boolean
    -- The "Prototype" - contains shared default values
    local CharacterDefaults = {
        health = 100,
        damage = 10,
        speed = 5,

        attack = function(selfChar)
            print(`Attacking for {selfChar.damage} damage!`)
        end
    }

    -- Create an "instance" that uses the defaults
    local warrior = {
        name = "Warrior",
        damage = 25  -- Override the default
    }

    -- Link the instance to the defaults via __index
    setmetatable(warrior, { __index = CharacterDefaults })

    -- Now warrior can access CharacterDefaults properties
    print(`{warrior.name}:`)
    print(`  Health: {warrior.health}`)  -- From CharacterDefaults
    print(`  Damage: {warrior.damage}`)  -- From warrior (overridden)
    print(`  Speed: {warrior.speed}`)    -- From CharacterDefaults

    -- Methods work too!
    warrior.attack(warrior)

    -- Create another instance with different overrides
    local mage = {
        name = "Mage",
        health = 60,  -- Lower health
        damage = 40   -- Higher damage
    }
    setmetatable(mage, { __index = CharacterDefaults })

    print(`\n{mage.name}:`)
    print(`  Health: {mage.health}`)  -- Overridden
    print(`  Damage: {mage.damage}`)  -- Overridden
    print(`  Speed: {mage.speed}`)    -- From defaults

    return true
end

return function(): Node<FallbackDemo>
    return { init = init }
end
```

**Questions**:
1. If you change `CharacterDefaults.health = 200`, what happens to `warrior.health`?
2. If you do `warrior.health = 50`, does it change `CharacterDefaults.health`?

---

## Exercise 3: The Lookup Chain Visualized ⭐⭐

**Context**: Understanding the exact sequence of how Luau finds values is crucial.

**Task**: Trace the lookup process:

```lua
--!strict

export type LookupChain = {}

-- Helper to track lookups
local lookupLog: {string} = {}

local function log(msg: string)
    table.insert(lookupLog, msg)
end

function init(self: LookupChain): boolean
    -- Level 1: Grandparent (base defaults)
    local Grandparent = {
        a = "grandparent-a",
        b = "grandparent-b",
        c = "grandparent-c",
    }

    -- Level 2: Parent (overrides some)
    local Parent = {
        b = "parent-b",  -- Override grandparent
    }
    setmetatable(Parent, {
        __index = function(t, k)
            log(`Parent.__index looking for '{k}'`)
            return Grandparent[k]
        end
    })

    -- Level 3: Child (overrides more)
    local Child = {
        c = "child-c",  -- Override parent (and grandparent)
    }
    setmetatable(Child, {
        __index = function(t, k)
            log(`Child.__index looking for '{k}'`)
            return Parent[k]
        end
    })

    -- Clear log and trace each lookup
    lookupLog = {}

    -- Access 'a' - not in Child or Parent, found in Grandparent
    log("=== Looking up 'a' ===")
    local a = Child.a
    log(`Result: {a}`)

    -- Access 'b' - not in Child, found in Parent
    log("\n=== Looking up 'b' ===")
    local b = Child.b
    log(`Result: {b}`)

    -- Access 'c' - found directly in Child
    log("\n=== Looking up 'c' ===")
    local c = Child.c
    log(`Result: {c}`)

    -- Print the full log
    for _, entry in lookupLog do
        print(entry)
    end

    return true
end

return function(): Node<LookupChain>
    return { init = init }
end
```

**Expected Output**:
```
=== Looking up 'a' ===
Child.__index looking for 'a'
Parent.__index looking for 'a'
Result: grandparent-a

=== Looking up 'b' ===
Child.__index looking for 'b'
Result: parent-b

=== Looking up 'c' ===
Result: child-c
```

**Key Insight**: The chain stops as soon as a value is found!

---

## Exercise 4: The Self-Referential Pattern ⭐⭐

**Context**: A common pattern makes a table its own metatable's __index, enabling method inheritance.

**Task**: Implement the canonical OOP pattern:

```lua
--!strict

export type SelfReferential = {}

function init(self: SelfReferential): boolean
    -- The "Class" table
    local Enemy = {}
    Enemy.__index = Enemy  -- Key pattern! Point __index to itself

    -- "Constructor" function
    function Enemy.new(name: string, health: number)
        local instance = {
            name = name,
            health = health,
        }
        setmetatable(instance, Enemy)  -- Instance uses Enemy as metatable
        return instance
    end

    -- Methods defined on Enemy are shared by all instances
    function Enemy:takeDamage(amount: number)
        self.health -= amount
        print(`{self.name} takes {amount} damage! HP: {self.health}`)
    end

    function Enemy:isAlive(): boolean
        return self.health > 0
    end

    function Enemy:describe()
        local status = if self:isAlive() then "alive" else "dead"
        print(`{self.name}: {self.health} HP ({status})`)
    end

    -- Create instances
    local goblin = Enemy.new("Goblin", 30)
    local orc = Enemy.new("Orc", 100)

    -- Both share the same methods
    goblin:describe()
    orc:describe()

    goblin:takeDamage(15)
    orc:takeDamage(30)

    goblin:takeDamage(20)  -- Fatal!
    goblin:describe()

    -- Verify they're separate instances
    print(`\nGoblin health: {goblin.health}`)
    print(`Orc health: {orc.health}`)

    return true
end

return function(): Node<SelfReferential>
    return { init = init }
end
```

**Trace the lookup for `goblin:takeDamage(15)`**:
1. `goblin.takeDamage` - not in goblin table
2. Check metatable - it's `Enemy`
3. Check `Enemy.__index` - it's `Enemy` itself
4. Check `Enemy.takeDamage` - found!
5. Call with `goblin` as `self`

---

## Exercise 5: Other Metamethods ⭐⭐

**Context**: `__index` is just one metamethod. There are many others!

**Task**: Explore other common metamethods:

```lua
--!strict

export type OtherMetamethods = {}

function init(self: OtherMetamethods): boolean
    -- __tostring: Custom print representation
    local Vector = {
        __tostring = function(v)
            return `Vector({v.x}, {v.y})`
        end,
        __add = function(a, b)
            return setmetatable({x = a.x + b.x, y = a.y + b.y}, Vector)
        end,
        __mul = function(v, scalar)
            if type(scalar) == "number" then
                return setmetatable({x = v.x * scalar, y = v.y * scalar}, Vector)
            end
            error("Can only multiply Vector by number")
        end,
        __eq = function(a, b)
            return a.x == b.x and a.y == b.y
        end,
        __len = function(v)
            return math.sqrt(v.x * v.x + v.y * v.y)
        end,
    }
    Vector.__index = Vector

    local function newVector(x: number, y: number)
        return setmetatable({x = x, y = y}, Vector)
    end

    -- Test __tostring
    local v1 = newVector(3, 4)
    print(`v1 = {v1}`)  -- Uses __tostring

    -- Test __add
    local v2 = newVector(1, 2)
    local v3 = v1 + v2
    print(`v1 + v2 = {v3}`)

    -- Test __mul
    local v4 = v1 * 2
    print(`v1 * 2 = {v4}`)

    -- Test __eq
    local v5 = newVector(3, 4)
    print(`v1 == v5? {v1 == v5}`)

    -- Test __len
    print(`Length of v1: {#v1}`)  -- 5 (3-4-5 triangle)

    return true
end

return function(): Node<OtherMetamethods>
    return { init = init }
end
```

**Common Metamethods**:
| Metamethod | Triggered By | Example |
|------------|--------------|---------|
| `__index` | Missing key lookup | `t.missingKey` |
| `__newindex` | Assignment to missing key | `t.newKey = value` |
| `__tostring` | `tostring()` or `print()` | `print(t)` |
| `__add` | Addition operator | `t1 + t2` |
| `__sub` | Subtraction operator | `t1 - t2` |
| `__mul` | Multiplication operator | `t * n` |
| `__eq` | Equality check | `t1 == t2` |
| `__len` | Length operator | `#t` |
| `__call` | Function call | `t()` |
| `__iter` | For-loop iteration | `for k, v in t` |

---

## Exercise 6: Debugging with __tostring ⭐⭐

**Context**: In Rive, `print()` goes to the console. Custom `__tostring` makes debugging much easier.

**Task**: Create debuggable game objects:

```lua
--!strict

export type DebuggableObjects = {}

function init(self: DebuggableObjects): boolean
    -- Without __tostring, printing tables is useless
    local badObject = { name = "Player", x = 100, y = 50 }
    print("Without __tostring:", badObject)  -- "table: 0x..."

    -- With __tostring, printing is informative
    local GameObject = {}
    GameObject.__index = GameObject
    GameObject.__tostring = function(obj)
        return `{obj.type}("{obj.name}" at {obj.x},{obj.y})`
    end

    local function createGameObject(objType: string, name: string, x: number, y: number)
        return setmetatable({
            type = objType,
            name = name,
            x = x,
            y = y
        }, GameObject)
    end

    local player = createGameObject("Player", "Hero", 100, 50)
    local enemy = createGameObject("Enemy", "Goblin", 200, 100)

    print("With __tostring:")
    print(player)
    print(enemy)

    -- Works great in string interpolation too
    print(`Debug: {player} is near {enemy}`)

    -- YOUR TASK: Create an Item class with __tostring that shows:
    -- Item("Sword" x5 worth 100g)
    local Item = {}
    Item.__index = Item
    Item.__tostring = function(item)
        -- YOUR CODE HERE
    end

    local function createItem(name: string, quantity: number, value: number)
        return setmetatable({
            name = name,
            quantity = quantity,
            value = value
        }, Item)
    end

    local sword = createItem("Sword", 1, 100)
    local potions = createItem("Health Potion", 5, 25)

    print("\nYour Item class:")
    print(sword)
    print(potions)

    return true
end

return function(): Node<DebuggableObjects>
    return { init = init }
end
```

---

## Comprehension Check

1. **When is `__index` consulted?**

2. **What happens if `__index` is a table vs. a function?**

3. **Why do we write `MyClass.__index = MyClass`?**

4. **How does Luau's lookup chain work through multiple metatables?**

---

## Self-Assessment Checklist

- [ ] I can create a metatable and attach it with `setmetatable()`
- [ ] I understand when `__index` is triggered
- [ ] I can use `__index` with both tables and functions
- [ ] I can trace the lookup chain through multiple levels
- [ ] I can implement `__tostring` for better debugging
- [ ] I understand the self-referential pattern (`T.__index = T`)

---

## Common Mistakes

1. **Forgetting `setmetatable()`**: Creating a metatable but not attaching it
2. **Wrong `__index` direction**: Remember, child uses parent as `__index`, not vice versa
3. **Expecting `__index` for existing keys**: It ONLY fires for missing keys
4. **Not setting `__index` to self**: `MyClass.__index = MyClass` is essential for methods

---

## Next Lesson
**Lesson 3.2: Building Classes** - Create full class constructors with proper typing
