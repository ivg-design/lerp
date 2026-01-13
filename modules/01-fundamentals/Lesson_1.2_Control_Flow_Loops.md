# Lesson 1.2: Control Flow & Loops

## Learning Objectives
- Write conditional logic with if/then/elseif/else
- Use if-then-else expressions (Luau's ternary operator)
- Implement while, for, and repeat/until loops
- Use break and continue effectively

---

## Quick Concept Review

### Conditionals
```lua
if condition then
    -- code
elseif otherCondition then
    -- code
else
    -- code
end
```

### If-Then-Else Expressions (No 'end' needed!)
```lua
local result = if x > 0 then "positive" else "non-positive"
```

### Loops
```lua
-- Numeric for
for i = 1, 10 do ... end
for i = 10, 1, -1 do ... end  -- countdown

-- While
while condition do ... end

-- Repeat (runs at least once)
repeat ... until condition
```

---

## Exercise 1: Basic Conditionals ⭐

**Task**: Create a health status system.

```lua
--!strict
export type Exercise1 = {}

function init(self: Exercise1): boolean
    local health = 45  -- Try changing this to test different outputs
    
    -- Write an if/elseif/else chain that prints:
    -- "CRITICAL" if health <= 20
    -- "Low" if health <= 40
    -- "Medium" if health <= 70
    -- "High" if health <= 90
    -- "Full" if health > 90
    
    -- YOUR CODE HERE
    
    return true
end

return function(): Node<Exercise1>
    return { init = init }
end
```

**Test with these values**: 15, 35, 55, 85, 100
**Expected outputs**: CRITICAL, Low, Medium, High, Full

---

## Exercise 2: If-Then-Else Expressions ⭐

**Task**: Use Luau's expression syntax for concise conditionals.

```lua
function init(self: Exercise2): boolean
    local score = 75
    local isPremium = true
    local level = 5
    
    -- Convert these to if-then-else EXPRESSIONS (single line each, no 'end'):
    
    -- 1. grade: "A" if score >= 90, "B" if score >= 80, "C" if score >= 70, else "F"
    local grade = -- YOUR CODE (use chained elseif in expression form)
    
    -- 2. discount: 20 if isPremium, else 0
    local discount = -- YOUR CODE
    
    -- 3. title: "Master" if level >= 10, "Expert" if level >= 5, else "Novice"
    local title = -- YOUR CODE
    
    print(`Grade: {grade}`)
    print(`Discount: {discount}%`)
    print(`Title: {title}`)
    
    return true
end
```

**Expected Output:**
```
Grade: C
Discount: 20%
Title: Expert
```

---

## Exercise 3: Numeric For Loops ⭐

**Task**: Generate sequences with for loops.

```lua
function init(self: Exercise3): boolean
    -- Part A: Print numbers 1 to 5
    print("Part A: Count up")
    -- YOUR CODE
    
    -- Part B: Print countdown from 5 to 1
    print("Part B: Countdown")
    -- YOUR CODE
    
    -- Part C: Print even numbers from 2 to 10
    print("Part C: Even numbers")
    -- Hint: for i = start, stop, step do
    -- YOUR CODE
    
    -- Part D: Calculate sum of 1 to 100
    print("Part D: Sum 1-100")
    local sum = 0
    -- YOUR CODE (use a for loop to add to sum)
    print(`Sum: {sum}`)
    
    return true
end
```

**Expected Output:**
```
Part A: Count up
1
2
3
4
5
Part B: Countdown
5
4
3
2
1
Part C: Even numbers
2
4
6
8
10
Part D: Sum 1-100
Sum: 5050
```

---

## Exercise 4: While and Repeat Loops ⭐⭐

**Task**: Simulate game scenarios with different loop types.

```lua
function init(self: Exercise4): boolean
    -- Part A: While loop - Reduce health until dead
    print("Part A: Combat simulation")
    local health = 100
    local damagePerHit = 23
    local hits = 0
    
    while health > 0 do
        -- Reduce health by damagePerHit
        -- Increment hits counter
        -- Print current health
        -- YOUR CODE
    end
    print(`Defeated in {hits} hits`)
    
    -- Part B: Repeat loop - Level up until max
    print("\nPart B: Leveling simulation")
    local level = 1
    local maxLevel = 5
    local expNeeded = 100
    local currentExp = 450  -- We have this much exp to spend
    
    repeat
        -- If currentExp >= expNeeded: level up, subtract exp, print level
        -- Increase expNeeded by 50 for next level
        -- YOUR CODE
    until level >= maxLevel or currentExp < expNeeded
    
    print(`Final level: {level}, Remaining exp: {currentExp}`)
    
    return true
end
```

**Expected Output (approximately):**
```
Part A: Combat simulation
Health: 77
Health: 54
Health: 31
Health: 8
Health: -15
Defeated in 5 hits

Part B: Leveling simulation
Level up! Now level 2
Level up! Now level 3
Level up! Now level 4
Final level: 4, Remaining exp: 0
```

---

## Exercise 5: Break and Continue ⭐⭐

**Task**: Control loop execution flow.

```lua
function init(self: Exercise5): boolean
    -- Part A: Find first number divisible by 7 between 50-100
    print("Part A: Find first divisible by 7")
    for i = 50, 100 do
        if i % 7 == 0 then
            print(`Found: {i}`)
            -- Stop searching (use break)
            -- YOUR CODE
        end
    end
    
    -- Part B: Print numbers 1-10, but skip multiples of 3
    print("\nPart B: Skip multiples of 3")
    for i = 1, 10 do
        if i % 3 == 0 then
            -- Skip this iteration (use continue)
            -- YOUR CODE
        end
        print(i)
    end
    
    -- Part C: Find the first 3 prime numbers after 20
    print("\nPart C: First 3 primes after 20")
    local found = 0
    local num = 21
    
    while found < 3 do
        -- Check if num is prime (only divisible by 1 and itself)
        local isPrime = true
        for i = 2, num - 1 do
            if num % i == 0 then
                isPrime = false
                break  -- No need to check further
            end
        end
        
        if isPrime then
            print(`Prime: {num}`)
            found += 1
        end
        num += 1
    end
    
    return true
end
```

**Expected Output:**
```
Part A: Find first divisible by 7
Found: 56

Part B: Skip multiples of 3
1
2
4
5
7
8
10

Part C: First 3 primes after 20
Prime: 23
Prime: 29
Prime: 31
```

---

## Challenge Exercise: FizzBuzz ⭐⭐⭐

**Task**: Classic programming challenge!

Print numbers 1 to 30, but:
- Print "Fizz" for multiples of 3
- Print "Buzz" for multiples of 5
- Print "FizzBuzz" for multiples of both 3 and 5
- Print the number otherwise

```lua
function init(self: Challenge): boolean
    for i = 1, 30 do
        -- YOUR CODE
        -- Hint: Check "both" condition first!
    end
    return true
end
```

**Expected Output (partial):**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
...
```

---

## Self-Assessment Checklist

- [ ] I can write multi-branch if/elseif/else statements
- [ ] I can use if-then-else expressions without 'end'
- [ ] I understand numeric for loop syntax: `for i = start, stop, step do`
- [ ] I know when to use while vs repeat/until
- [ ] I can use break to exit a loop early
- [ ] I can use continue to skip iterations

---

## Common Mistakes

1. **Forgetting `then`**: `if x > 5 then` (not just `if x > 5`)
2. **Missing `do` in loops**: `for i = 1, 10 do` (not just `for i = 1, 10`)
3. **Wrong operator precedence**: Use parentheses when unsure
4. **Infinite loops**: Always ensure loop conditions will eventually be false

---

## Submit Your Results

Share your console outputs, especially for:
- Exercise 4 (different health values create different results)
- The FizzBuzz challenge

I'll review and provide feedback!

---

## Next Lesson
**Lesson 1.3: Functions & Closures** - Create reusable code blocks

