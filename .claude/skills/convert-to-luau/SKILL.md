---
name: convert-to-luau
description: Convert JavaScript, TypeScript, or After Effects expressions to Rive Luau
user-invocable: true
---

# /convert-to-luau

Converts code from JavaScript, TypeScript, or After Effects expressions to Rive Luau.

## Usage

```
/convert-to-luau [paste code]    # Convert pasted code
/convert-to-luau js              # Show JS→Luau conversion guide
/convert-to-luau ae              # Show AE→Luau conversion guide
```

## JavaScript/TypeScript → Luau

### Variables

| JavaScript | Luau |
|------------|------|
| `let x = 10` | `local x = 10` |
| `const x = 10` | `local x = 10` |
| `var x = 10` | `local x = 10` |
| `let x: number = 10` | `local x: number = 10` |

### Strings

| JavaScript | Luau |
|------------|------|
| `` `Value: ${x}` `` | `` `Value: {x}` `` |
| `"hello" + "world"` | `"hello" .. "world"` |
| `str.length` | `#str` or `string.len(str)` |

### Arrays/Tables

| JavaScript | Luau |
|------------|------|
| `[1, 2, 3]` | `{1, 2, 3}` |
| `{key: "value"}` | `{key = "value"}` |
| `arr.length` | `#arr` |
| `arr.push(x)` | `table.insert(arr, x)` |
| `arr.pop()` | `table.remove(arr)` |
| `arr[0]` | `arr[1]` (1-indexed!) |

### Conditionals

| JavaScript | Luau |
|------------|------|
| `if (x) { }` | `if x then end` |
| `if (x) { } else { }` | `if x then else end` |
| `x ? a : b` | `if x then a else b` |
| `x === y` | `x == y` |
| `x !== y` | `x ~= y` |
| `!x` | `not x` |
| `x && y` | `x and y` |
| `x \|\| y` | `x or y` |

### Loops

| JavaScript | Luau |
|------------|------|
| `for (let i = 0; i < 10; i++)` | `for i = 1, 10 do end` |
| `for (const x of arr)` | `for _, x in ipairs(arr) do end` |
| `for (const k in obj)` | `for k, v in pairs(obj) do end` |
| `while (cond) { }` | `while cond do end` |

### Functions

| JavaScript | Luau |
|------------|------|
| `function add(a, b) { return a + b }` | `function add(a, b) return a + b end` |
| `const add = (a, b) => a + b` | `local add = function(a, b) return a + b end` |
| `function add(a: number): number` | `function add(a: number): number` |

### Classes

```javascript
// JavaScript
class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
    }
    damage(amount) {
        this.health -= amount;
    }
}
```

```lua
-- Luau
local Player = {}
Player.__index = Player

function Player.new(name)
    local self = setmetatable({}, Player)
    self.name = name
    self.health = 100
    return self
end

function Player:damage(amount)
    self.health = self.health - amount
end
```

### Math

| JavaScript | Luau |
|------------|------|
| `Math.sin(x)` | `math.sin(x)` |
| `Math.cos(x)` | `math.cos(x)` |
| `Math.floor(x)` | `math.floor(x)` |
| `Math.ceil(x)` | `math.ceil(x)` |
| `Math.round(x)` | `math.round(x)` |
| `Math.abs(x)` | `math.abs(x)` |
| `Math.min(a, b)` | `math.min(a, b)` |
| `Math.max(a, b)` | `math.max(a, b)` |
| `Math.random()` | `math.random()` |
| `Math.PI` | `math.pi` |

---

## After Effects → Luau

### Time

| After Effects | Luau (Rive) |
|---------------|-------------|
| `time` | Use `advance(self, seconds)` to track time |
| `thisLayer.time` | Store elapsed time in self |
| `framesToTime(f)` | `f / 60` (assuming 60fps) |

```lua
-- Track time in Rive
export type MyNode = {
    elapsedTime: number,
}

function advance(self: MyNode, seconds: number): boolean
    self.elapsedTime = self.elapsedTime + seconds
    return true
end
```

### Properties

| After Effects | Luau (Rive) |
|---------------|-------------|
| `effect("Slider")("Slider")` | `self.slider` (Input<number>) |
| `thisLayer.transform.position` | Use ViewModel or inputs |
| `thisComp.layer("Name")` | Not available (sandboxed) |

### Value Access

| After Effects | Luau (Rive) |
|---------------|-------------|
| Effect controls | `Input<T>` in script type |
| Layer properties | ViewModel properties |
| Composition data | ViewModel or external API |

### Example Conversion

```javascript
// After Effects expression
wiggle(5, 50);
```

```lua
-- Luau equivalent
local function wiggle(freq: number, amp: number, time: number): number
    return math.sin(time * freq * math.pi * 2) * amp
end

function advance(self: MyNode, seconds: number): boolean
    self.time = self.time + seconds
    local offset = wiggle(5, 50, self.time)
    -- Apply offset...
    return true
end
```

```javascript
// After Effects - linear interpolation
linear(time, 0, 1, 0, 100);
```

```lua
-- Luau equivalent
local function lerp(t: number, a: number, b: number): number
    return a + (b - a) * t
end

local function linearMap(t: number, tMin: number, tMax: number, vMin: number, vMax: number): number
    local normalized = (t - tMin) / (tMax - tMin)
    normalized = math.clamp(normalized, 0, 1)
    return lerp(normalized, vMin, vMax)
end
```

---

## Complete Conversion Example

### JavaScript Component → Rive Script

```typescript
// TypeScript
interface Props {
    size: number;
    color: string;
}

class Square {
    props: Props;

    constructor(props: Props) {
        this.props = props;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.props.color;
        ctx.fillRect(-this.props.size/2, -this.props.size/2,
                     this.props.size, this.props.size);
    }
}
```

```lua
-- Luau (Rive)
--!strict

export type Square = {
    size: Input<number>,
    color: Input<Color>,
    path: Path,
    paint: Paint,
}

local function buildPath(self: Square)
    local half = self.size / 2
    self.path:reset()
    self.path:moveTo(Vector.xy(-half, -half))
    self.path:lineTo(Vector.xy(half, -half))
    self.path:lineTo(Vector.xy(half, half))
    self.path:lineTo(Vector.xy(-half, half))
    self.path:close()
end

function init(self: Square, context: Context): boolean
    self.path = Path.new()
    self.paint = Paint.with({ style = "fill", color = self.color })
    buildPath(self)
    return true
end

function update(self: Square)
    buildPath(self)
    self.paint = Paint.with({ style = "fill", color = self.color })
end

function draw(self: Square, renderer: Renderer)
    renderer:drawPath(self.path, self.paint)
end

return function(): Node<Square>
    return {
        size = 100,
        color = Color.rgb(255, 0, 0),
        path = nil,
        paint = nil,
        init = init,
        update = update,
        draw = draw,
    }
end
```

## Key Differences to Remember

1. **1-indexed arrays** - Luau arrays start at 1, not 0
2. **No semicolons** - Not required in Luau
3. **end keyword** - All blocks end with `end`
4. **String concatenation** - Use `..` not `+`
5. **Not equal** - Use `~=` not `!=`
6. **Type annotations** - Optional but recommended with `--!strict`
7. **Self parameter** - Methods use `self:method()` syntax
