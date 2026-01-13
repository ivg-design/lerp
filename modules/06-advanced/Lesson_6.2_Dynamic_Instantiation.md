# Lesson 6.2: Dynamic Instantiation

## Learning Objectives
- Create artboard instances at runtime
- Manage instance lifecycle (advance, draw)
- Implement object pooling for performance
- Handle instance removal safely

---

## Dynamic Instantiation

Rive lets you spawn new artboard instances from scripts. This is essential for:
- Particle systems
- Projectiles and bullets
- Spawning enemies
- Dynamic UI elements

---

## Exercise 1: Basic Instantiation ⭐⭐

```lua
--!strict

export type BasicInstance = {
    template: Input<Artboard<Data.Projectile>>,
    instances: {Artboard<Data.Projectile>},
}

function init(self: BasicInstance): boolean
    self.instances = {}
    print("Press to spawn projectiles!")
    return true
end

function onPointerDown(self: BasicInstance, event: PointerEvent)
    -- Create a new instance from the template
    local newInstance = self.template:instance()
    table.insert(self.instances, newInstance)
    print(`Spawned! Total: {#self.instances}`)
    event:hit()
end

function advance(self: BasicInstance, seconds: number): boolean
    -- CRITICAL: You must manually advance all instances
    for _, instance in self.instances do
        instance:advance(seconds)
    end
    return true
end

function draw(self: BasicInstance, renderer: Renderer)
    -- CRITICAL: You must manually draw all instances
    for i, instance in self.instances do
        renderer:save()
        renderer:transform(Mat2D.withTranslation(50 + i * 60, 100))
        instance:draw(renderer)
        renderer:restore()
    end
end

return function(): Node<BasicInstance>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerDown = onPointerDown,
        template = late(),  -- Bind in editor
        instances = late(),
    }
end
```

---

## Exercise 2: Instance with Movement ⭐⭐

```lua
--!strict

type ProjectileData = {
    instance: Artboard<Data.Projectile>,
    x: number,
    y: number,
    vx: number,
    vy: number,
    alive: boolean,
}

export type Projectiles = {
    template: Input<Artboard<Data.Projectile>>,
    projectiles: {ProjectileData},
}

local function spawnProjectile(self: Projectiles, x: number, y: number, angle: number)
    local speed = 200
    local proj: ProjectileData = {
        instance = self.template:instance(),
        x = x,
        y = y,
        vx = math.cos(angle) * speed,
        vy = math.sin(angle) * speed,
        alive = true,
    }
    table.insert(self.projectiles, proj)
end

function init(self: Projectiles): boolean
    self.projectiles = {}
    return true
end

function onPointerDown(self: Projectiles, event: PointerEvent)
    -- Spawn toward click position
    local startX, startY = 200, 200
    local angle = math.atan2(event.position.y - startY, event.position.x - startX)
    spawnProjectile(self, startX, startY, angle)
    event:hit()
end

function advance(self: Projectiles, seconds: number): boolean
    -- Update and remove dead projectiles (iterate backwards!)
    for i = #self.projectiles, 1, -1 do
        local proj = self.projectiles[i]

        -- Update position
        proj.x += proj.vx * seconds
        proj.y += proj.vy * seconds

        -- Advance the artboard animation
        proj.instance:advance(seconds)

        -- Check bounds
        if proj.x < -50 or proj.x > 500 or proj.y < -50 or proj.y > 500 then
            table.remove(self.projectiles, i)
        end
    end
    return true
end

function draw(self: Projectiles, renderer: Renderer)
    for _, proj in self.projectiles do
        renderer:save()
        renderer:transform(Mat2D.withTranslation(proj.x, proj.y))
        proj.instance:draw(renderer)
        renderer:restore()
    end
end

return function(): Node<Projectiles>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerDown = onPointerDown,
        template = late(),
        projectiles = late(),
    }
end
```

---

## Exercise 3: Object Pooling ⭐⭐⭐

```lua
--!strict

type PooledObject = {
    instance: Artboard<Data.Particle>,
    x: number,
    y: number,
    life: number,
    active: boolean,
}

export type ObjectPool = {
    template: Input<Artboard<Data.Particle>>,
    pool: {PooledObject},
    active: {PooledObject},
    spawnTimer: number,
}

local POOL_SIZE = 50

function init(self: ObjectPool): boolean
    self.pool = {}
    self.active = {}
    self.spawnTimer = 0

    -- Pre-allocate pool
    for i = 1, POOL_SIZE do
        table.insert(self.pool, {
            instance = self.template:instance(),
            x = 0, y = 0, life = 0, active = false,
        })
    end

    print(`Pool initialized with {POOL_SIZE} objects`)
    return true
end

local function spawn(self: ObjectPool, x: number, y: number)
    if #self.pool > 0 then
        local obj = table.remove(self.pool, 1)
        obj.x = x
        obj.y = y
        obj.life = 2  -- 2 seconds
        obj.active = true
        table.insert(self.active, obj)
    else
        print("Pool exhausted!")
    end
end

local function recycle(self: ObjectPool, index: number)
    local obj = table.remove(self.active, index)
    obj.active = false
    table.insert(self.pool, obj)
end

function advance(self: ObjectPool, seconds: number): boolean
    -- Auto-spawn
    self.spawnTimer += seconds
    if self.spawnTimer > 0.1 then
        spawn(self, math.random(50, 350), math.random(50, 250))
        self.spawnTimer = 0
    end

    -- Update active objects
    for i = #self.active, 1, -1 do
        local obj = self.active[i]
        obj.life -= seconds
        obj.y -= 50 * seconds  -- Float up
        obj.instance:advance(seconds)

        if obj.life <= 0 then
            recycle(self, i)
        end
    end

    return true
end

function draw(self: ObjectPool, renderer: Renderer)
    for _, obj in self.active do
        renderer:save()
        renderer:transform(Mat2D.withTranslation(obj.x, obj.y))
        local alpha = math.min(1, obj.life)  -- Fade out
        -- obj.instance opacity would be set via ViewModel
        obj.instance:draw(renderer)
        renderer:restore()
    end
end

return function(): Node<ObjectPool>
    return {
        init = init,
        advance = advance,
        draw = draw,
        template = late(),
        pool = late(),
        active = late(),
        spawnTimer = late(),
    }
end
```

---

## Self-Assessment Checklist

- [ ] I can create instances with template:instance()
- [ ] I manually advance and draw instances
- [ ] I can remove instances safely (backwards iteration)
- [ ] I understand object pooling benefits

---

## Advanced: Node Hierarchy Access

When working with dynamic instances, you may need to access transform data through `NodeData` and `NodeReadData`.

### NodeReadData

Provides read-only access to node transform properties:

```lua
-- Access via context in lifecycle methods
function init(self: MyScript): boolean
    local nodeData = context:node()
    if nodeData then
        -- Read transform properties
        print(`Position: {nodeData.position.x}, {nodeData.position.y}`)
        print(`Rotation: {nodeData.rotation}`)
        print(`Scale: {nodeData.scale.x}, {nodeData.scale.y}`)

        -- World transform matrix
        local worldMat = nodeData.worldTransform
    end
    return true
end
```

**NodeReadData Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `position` | Vector | Local position |
| `rotation` | number | Local rotation (radians) |
| `scale` | Vector | Local scale |
| `x`, `y` | number | Position shortcuts |
| `scaleX`, `scaleY` | number | Scale shortcuts |
| `worldTransform` | Mat2D | World transform matrix |
| `paint` | Paint? | Paint data (if Path node) |

### NodeData (Writable)

Extends NodeReadData with hierarchy access and modification:

```lua
local nodeData = context:node()
if nodeData then
    -- Access parent/children
    local parent = nodeData.parent
    local children = nodeData.children

    -- Decompose world transform back to local properties
    local worldMat = Mat2D.identity() -- your computed matrix
    nodeData:decompose(worldMat)
end
```

---

## Next Lesson
**Lesson 6.3: Performance & Optimization** - Keep your animations smooth
