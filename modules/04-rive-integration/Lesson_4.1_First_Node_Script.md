# Lesson 4.1: Your First Node Script

## Learning Objectives
- Understand the Node Script structure and factory pattern
- Create a Node Script from scratch
- Use the init and advance lifecycle functions
- Print debug output to the console

---

## The Node Script Structure

Every Node Script follows this pattern:

```lua
--!strict

-- 1. Define your script's data type
export type MyScript = {
    someValue: number,
    someText: string,
}

-- 2. Define lifecycle functions
function init(self: MyScript): boolean
    -- Called once when script starts
    return true  -- Return true to keep running
end

function advance(self: MyScript, seconds: number): boolean
    -- Called every frame
    -- 'seconds' is delta time since last frame
    return true  -- Return true to continue, false to stop
end

-- 3. Factory function returns the script definition
return function(): Node<MyScript>
    return {
        init = init,
        advance = advance,
        someValue = 0,
        someText = "default",
    }
end
```

---

## Exercise 1: Hello Rive World ⭐

**Setup:**
1. Create a new Rive file
2. Right-click in the Assets panel → Create Script → Node Script
3. Name it "HelloWorld"

**Task**: Create a script that prints a message when it starts.

```lua
--!strict

export type HelloWorld = {}

function init(self: HelloWorld): boolean
    -- Print a welcome message
    print("Hello from Rive Scripting!")
    print("The script has initialized successfully.")
    return true
end

return function(): Node<HelloWorld>
    return {
        init = init,
    }
end
```

**To Test:**
1. Drag the script onto any shape in your artboard
2. Go to State Machine view
3. Press Play
4. Check the Console tab for output

**Expected Output:**
```
Hello from Rive Scripting!
The script has initialized successfully.
```

---

## Exercise 2: Frame Counter ⭐

**Task**: Count frames and print periodically.

```lua
--!strict

export type FrameCounter = {
    frameCount: number,
    totalTime: number,
}

function init(self: FrameCounter): boolean
    self.frameCount = 0
    self.totalTime = 0
    print("Frame counter started!")
    return true
end

function advance(self: FrameCounter, seconds: number): boolean
    self.frameCount += 1
    self.totalTime += seconds
    
    -- Print every 60 frames (approximately every second at 60fps)
    if self.frameCount % 60 == 0 then
        print(`Frame {self.frameCount} | Total time: {self.totalTime:.2f}s`)
    end
    
    return true
end

return function(): Node<FrameCounter>
    return {
        init = init,
        advance = advance,
        frameCount = 0,
        totalTime = 0,
    }
end
```

**Run for ~5 seconds and report:**
- How many frames did you count?
- What was your approximate framerate?

---

## Exercise 3: Movement Tracker ⭐⭐

**Task**: Simulate an object moving across the screen.

```lua
--!strict

export type MovementTracker = {
    positionX: number,
    positionY: number,
    speed: number,
}

function init(self: MovementTracker): boolean
    self.positionX = 0
    self.positionY = 0
    self.speed = 100  -- pixels per second
    print("Movement tracker initialized at (0, 0)")
    return true
end

function advance(self: MovementTracker, seconds: number): boolean
    -- Move right at constant speed
    -- IMPORTANT: Multiply by seconds for frame-rate independence!
    self.positionX += self.speed * seconds
    
    -- Also move down at half speed
    self.positionY += (self.speed / 2) * seconds
    
    -- Print position every ~30 frames
    -- YOUR CODE: Add a frame counter and print condition
    
    -- Stop after reaching x = 500
    if self.positionX >= 500 then
        print(`Reached destination at ({self.positionX:.1f}, {self.positionY:.1f})`)
        return false  -- Stop the script
    end
    
    return true
end

return function(): Node<MovementTracker>
    return {
        init = init,
        advance = advance,
        positionX = 0,
        positionY = 0,
        speed = 100,
    }
end
```

**Questions:**
1. How long did it take to reach x=500?
2. What was the final Y position?
3. What happens after returning false?

---

## Exercise 4: Timer Utility ⭐⭐

**Task**: Create a script with multiple independent timers.

```lua
--!strict

export type TimerDemo = {
    elapsed: number,
    oneSecondFired: boolean,
    threeSecondFired: boolean,
    fiveSecondFired: boolean,
}

function init(self: TimerDemo): boolean
    self.elapsed = 0
    self.oneSecondFired = false
    self.threeSecondFired = false
    self.fiveSecondFired = false
    
    print("Timer started! Watch for events at 1s, 3s, and 5s")
    return true
end

function advance(self: TimerDemo, seconds: number): boolean
    self.elapsed += seconds
    
    -- YOUR CODE: Check each timer and print when triggered
    -- Each should only fire ONCE
    
    -- At 1 second: print "1 second mark!"
    if self.elapsed >= 1 and not self.oneSecondFired then
        -- YOUR CODE
    end
    
    -- At 3 seconds: print "3 seconds elapsed!"
    -- YOUR CODE
    
    -- At 5 seconds: print "5 seconds - Demo complete!"
    -- and return false to stop
    -- YOUR CODE
    
    return true
end

return function(): Node<TimerDemo>
    return {
        init = init,
        advance = advance,
        elapsed = 0,
        oneSecondFired = false,
        threeSecondFired = false,
        fiveSecondFired = false,
    }
end
```

**Expected Timeline:**
```
Timer started! Watch for events at 1s, 3s, and 5s
[after ~1 second]
1 second mark!
[after ~3 seconds]
3 seconds elapsed!
[after ~5 seconds]
5 seconds - Demo complete!
[script stops]
```

---

## Exercise 5: Oscillating Value ⭐⭐

**Task**: Create a value that oscillates using sine wave.

```lua
--!strict

export type Oscillator = {
    time: number,
    frequency: number,
    amplitude: number,
}

function init(self: Oscillator): boolean
    self.time = 0
    self.frequency = 1  -- 1 cycle per second
    self.amplitude = 100
    print("Oscillator started")
    return true
end

function advance(self: Oscillator, seconds: number): boolean
    self.time += seconds
    
    -- Calculate oscillating value using sine
    -- Formula: amplitude * sin(time * frequency * 2 * pi)
    local value = self.amplitude * math.sin(self.time * self.frequency * 2 * math.pi)
    
    -- Print value 4 times per second (every 0.25s)
    -- YOUR CODE: Implement a print interval check
    
    -- Run for 3 complete cycles then stop
    if self.time >= 3 then
        print("3 cycles complete!")
        return false
    end
    
    return true
end

return function(): Node<Oscillator>
    return {
        init = init,
        advance = advance,
        time = 0,
        frequency = 1,
        amplitude = 100,
    }
end
```

**Observe:**
- The value should swing between -100 and +100
- It should complete a full cycle each second
- Watch how it approaches 0, hits 100, returns to 0, hits -100, etc.

---

## Challenge: State Machine in Code ⭐⭐⭐

**Task**: Implement a simple state machine with transitions.

```lua
--!strict

type State = "idle" | "walking" | "running" | "jumping"

export type StateMachine = {
    currentState: State,
    stateTime: number,
    totalTime: number,
}

function init(self: StateMachine): boolean
    self.currentState = "idle"
    self.stateTime = 0
    self.totalTime = 0
    print("State Machine initialized in 'idle' state")
    return true
end

function advance(self: StateMachine, seconds: number): boolean
    self.stateTime += seconds
    self.totalTime += seconds
    
    -- YOUR CODE: Implement state transitions based on time
    
    -- idle -> walking after 1 second
    -- walking -> running after 2 more seconds
    -- running -> jumping after 1.5 more seconds
    -- jumping -> idle after 0.5 seconds (loop!)
    
    -- When transitioning:
    -- 1. Print the new state
    -- 2. Reset stateTime to 0
    
    -- Stop after totalTime > 10 seconds
    if self.totalTime > 10 then
        print(`Final state: {self.currentState}`)
        return false
    end
    
    return true
end

return function(): Node<StateMachine>
    return {
        init = init,
        advance = advance,
        currentState = "idle",
        stateTime = 0,
        totalTime = 0,
    }
end
```

**Expected Output (timing may vary slightly):**
```
State Machine initialized in 'idle' state
Transitioning to: walking
Transitioning to: running
Transitioning to: jumping
Transitioning to: idle
Transitioning to: walking
... (loops continue)
Final state: [current state at 10s]
```

---

## Key Concepts Recap

### The Factory Pattern
```lua
return function(): Node<MyType>
    return {
        -- Bind lifecycle functions
        init = init,
        advance = advance,
        -- Initialize properties
        myProperty = defaultValue,
    }
end
```

### Delta Time
Always multiply movement/changes by `seconds`:
```lua
-- Correct (frame-rate independent)
self.position += self.speed * seconds

-- Wrong (frame-rate dependent)
self.position += self.speed
```

### Stopping a Script
Return `false` from `advance` to stop execution:
```lua
if done then
    return false  -- No more advance calls
end
return true  -- Keep running
```

---

## Self-Assessment

- [ ] I can create a Node Script from scratch
- [ ] I understand the factory function pattern
- [ ] I know when init vs advance is called
- [ ] I can use delta time correctly
- [ ] I can stop a script by returning false

---

## Submit Your Results

Run each exercise and share:
1. Console output
2. Any errors you encountered
3. Answers to the questions in each exercise

I'll provide feedback on your first Rive scripts!

---

## Next Lesson
**Lesson 4.2: Inputs & Data Binding** - Connect your scripts to the Rive Editor

