# Lesson 1.1: Variables, Types & Operators

## Learning Objectives
By the end of this lesson, you will be able to:
- Declare local variables correctly
- Understand Luau's basic data types
- Use arithmetic, comparison, and logical operators
- Apply string interpolation and compound assignments

---

## Quick Concept Review

### Variables
```lua
-- Always use local (global variables are discouraged)
local playerName = "Hero"
local health = 100
local isAlive = true
```

### Basic Types
- `nil` - absence of value
- `boolean` - true/false
- `number` - all numbers (integers and floats)
- `string` - text

### Key Operators
- Arithmetic: `+`, `-`, `*`, `/`, `//` (floor div), `%`, `^`
- Compound: `+=`, `-=`, `*=`, `/=`
- Comparison: `==`, `~=` (not equal), `<`, `>`, `<=`, `>=`
- Logical: `and`, `or`, `not`
- String concat: `..`
- String interpolation: backticks with `{expression}`

---

## Setup Instructions

1. Open Rive Editor
2. Create a new file called "Lesson_1_1_Exercises"
3. Create a **Node Script** named "Exercise1"
4. Use the `init` function to run code and `print()` to see output
5. Press Play in State Machine to see console output

---

## Exercise 1: Variable Declaration ⭐

**Task**: Declare variables for a game character and print them.

**Create a Node Script with this structure:**
```lua
--!strict

export type Exercise1 = {}

function init(self: Exercise1): boolean
    -- YOUR CODE HERE
    -- Declare these variables:
    -- 1. characterName (string) = "Warrior"
    -- 2. level (number) = 5
    -- 3. experience (number) = 1250.5
    -- 4. hasShield (boolean) = true
    
    -- Print all variables
    
    return true
end

return function(): Node<Exercise1>
    return {
        init = init,
    }
end
```

**Expected Console Output:**
```
Warrior
5
1250.5
true
```

**Your Task**: Fill in the code and run it. Report back what you see in the console.

---

## Exercise 2: Arithmetic Operations ⭐

**Task**: Calculate damage with various modifiers.

```lua
function init(self: Exercise2): boolean
    local baseDamage = 50
    local critMultiplier = 2.5
    local armorReduction = 15
    
    -- Calculate: (baseDamage * critMultiplier) - armorReduction
    -- Store in variable: finalDamage
    -- YOUR CODE HERE
    
    -- Calculate the percentage of damage blocked
    -- Formula: armorReduction / (baseDamage * critMultiplier) * 100
    -- Store in variable: percentBlocked
    -- YOUR CODE HERE
    
    print(`Final damage: {finalDamage}`)
    print(`Percent blocked: {percentBlocked}%`)
    
    return true
end
```

**Expected Output:**
```
Final damage: 110
Percent blocked: 12%
```

**Hint**: The percent will be 12.0 or similar - that's fine!

---

## Exercise 3: Compound Assignments ⭐

**Task**: Use compound operators to modify a score.

```lua
function init(self: Exercise3): boolean
    local score = 100
    
    -- Use compound assignments to:
    -- 1. Add 50 to score (use +=)
    -- 2. Multiply score by 2 (use *=)
    -- 3. Subtract 75 from score (use -=)
    -- 4. Floor divide score by 3 (use //=)
    
    -- Print the score after EACH operation
    -- YOUR CODE HERE
    
    return true
end
```

**Expected Output:**
```
After +50: 150
After *2: 300
After -75: 225
After //3: 75
```

---

## Exercise 4: String Interpolation ⭐⭐

**Task**: Build formatted game messages using string interpolation.

```lua
function init(self: Exercise4): boolean
    local playerName = "Shadowblade"
    local goldCollected = 250
    local enemiesDefeated = 12
    local timePlayed = 45.7 -- minutes
    
    -- Create and print these messages using string interpolation (backticks):
    
    -- Message 1: "Player: Shadowblade"
    -- Message 2: "Gold: 250 | Enemies: 12"
    -- Message 3: "Time: 45.7 minutes (0.76 hours)"
    --            ^ Calculate hours from minutes!
    
    -- YOUR CODE HERE
    
    return true
end
```

**Challenge**: Can you format the hours to only show 2 decimal places?
(Hint: Research `string.format` or just show the raw calculation)

---

## Exercise 5: Logical Operators & Conditions ⭐⭐

**Task**: Determine game states using logical operators.

```lua
function init(self: Exercise5): boolean
    local health = 25
    local maxHealth = 100
    local hasPotion = true
    local inCombat = false
    local level = 10
    
    -- Evaluate these conditions and print the results (true/false):
    
    -- 1. Is the player low on health? (health < 30)
    local isLowHealth = -- YOUR CODE
    
    -- 2. Can the player heal? (low health AND has potion AND NOT in combat)
    local canHeal = -- YOUR CODE
    
    -- 3. Is the player a veteran? (level >= 10 OR enemiesDefeated > 100)
    --    Note: We don't have enemiesDefeated, so just use level >= 10
    local isVeteran = -- YOUR CODE
    
    -- 4. Should show health warning? (low health AND (in combat OR NOT has potion))
    local showWarning = -- YOUR CODE
    
    print(`Low health: {isLowHealth}`)
    print(`Can heal: {canHeal}`)
    print(`Is veteran: {isVeteran}`)
    print(`Show warning: {showWarning}`)
    
    return true
end
```

**Expected Output:**
```
Low health: true
Can heal: true
Is veteran: true
Show warning: false
```

---

## Self-Assessment Checklist

After completing all exercises, you should be able to answer YES to:

- [ ] I can declare local variables with explicit types
- [ ] I understand the difference between `=` and `==`
- [ ] I can use `~=` for "not equal" (not `!=`)
- [ ] I can use compound assignments like `+=` and `*=`
- [ ] I can use string interpolation with backticks
- [ ] I understand `and`, `or`, `not` logical operators

---

## Common Mistakes to Avoid

1. **Forgetting `local`**: Always declare with `local`
2. **Using `!=`**: Luau uses `~=` for not-equal
3. **String concat in interpolation**: Inside `{}` you don't need `..`
4. **Division precision**: `/` gives float, `//` gives floor integer

---

## Submit Your Results

When you've completed the exercises, share:
1. Your console output for each exercise
2. Any errors you encountered
3. Questions about unexpected behavior

I'll provide feedback and we can discuss any concepts that need clarification!

---

## Next Lesson
**Lesson 1.2: Control Flow & Loops** - Learn `if/then/else`, `while`, `for`, and `repeat/until`

