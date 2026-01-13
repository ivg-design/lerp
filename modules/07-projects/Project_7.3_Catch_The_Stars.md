# Project 7.3: Simple Game - Catch the Stars

## Project Overview

Build a complete mini-game where:
- Stars fall from the top of the screen
- Player moves a basket to catch them
- Score increases for each star caught
- Game ends after missing 3 stars

**Concepts Used**: All course concepts combined!

---

## Game Design

### Mechanics
- Stars spawn at random X positions at the top
- Stars fall at increasing speed
- Player controls a basket with pointer/touch
- Catching a star = +10 points
- Missing a star = -1 life
- Game over at 0 lives

### Visual Elements
- Falling stars (yellow circles)
- Player basket (rectangle)
- Score display
- Lives display

---

## Part 1: Game State ⭐

```lua
--!strict

type Star = {
    x: number,
    y: number,
    speed: number,
    active: boolean,
}

type GameState = "menu" | "playing" | "gameover"

export type CatchTheStars = {
    -- Game state
    state: GameState,
    score: number,
    lives: number,
    highScore: number,

    -- Player
    basketX: number,
    basketY: number,
    basketWidth: number,
    basketHeight: number,

    -- Stars
    stars: {Star},
    spawnTimer: number,
    spawnInterval: number,
    baseSpeed: number,

    -- Graphics
    starPath: Path,
    starPaint: Paint,
    basketPath: Path,
    basketPaint: Paint,
    bgPaint: Paint,
}

local SCREEN_WIDTH = 400
local SCREEN_HEIGHT = 500
local MAX_STARS = 20

function init(self: CatchTheStars): boolean
    -- Initialize game state
    self.state = "menu"
    self.score = 0
    self.lives = 3
    self.highScore = 0

    -- Player setup
    self.basketWidth = 80
    self.basketHeight = 30
    self.basketX = SCREEN_WIDTH / 2 - self.basketWidth / 2
    self.basketY = SCREEN_HEIGHT - 60

    -- Star spawning
    self.stars = table.create(MAX_STARS)
    self.spawnTimer = 0
    self.spawnInterval = 1.5
    self.baseSpeed = 100

    -- Create graphics
    createGraphics(self)

    print("Click to start!")
    return true
end

local function createGraphics(self: CatchTheStars)
    -- Star (circle)
    local r = 15
    local k = r * 0.5522847498
    self.starPath = Path.new()
    self.starPath:moveTo(Vector.xy(r, 0))
    self.starPath:cubicTo(Vector.xy(r, k), Vector.xy(k, r), Vector.xy(0, r))
    self.starPath:cubicTo(Vector.xy(-k, r), Vector.xy(-r, k), Vector.xy(-r, 0))
    self.starPath:cubicTo(Vector.xy(-r, -k), Vector.xy(-k, -r), Vector.xy(0, -r))
    self.starPath:cubicTo(Vector.xy(k, -r), Vector.xy(r, -k), Vector.xy(r, 0))

    self.starPaint = Paint.with({
        style = "fill",
        color = Color.rgb(255, 220, 50),
    })

    -- Basket
    self.basketPath = Path.new()
    self.basketPath:moveTo(Vector.xy(0, 0))
    self.basketPath:lineTo(Vector.xy(self.basketWidth, 0))
    self.basketPath:lineTo(Vector.xy(self.basketWidth - 10, self.basketHeight))
    self.basketPath:lineTo(Vector.xy(10, self.basketHeight))
    self.basketPath:close()

    self.basketPaint = Paint.with({
        style = "fill",
        color = Color.rgb(139, 90, 43),
    })

    self.bgPaint = Paint.with({
        style = "fill",
        color = Color.rgb(30, 30, 60),
    })
end

return function(): Node<CatchTheStars>
    return {
        init = init,
        state = late(), score = late(), lives = late(), highScore = late(),
        basketX = late(), basketY = late(), basketWidth = late(), basketHeight = late(),
        stars = late(), spawnTimer = late(), spawnInterval = late(), baseSpeed = late(),
        starPath = late(), starPaint = late(), basketPath = late(), basketPaint = late(), bgPaint = late(),
    }
end
```

---

## Part 2: Game Logic ⭐⭐

```lua
function advance(self: CatchTheStars, seconds: number): boolean
    if self.state ~= "playing" then
        return true
    end

    -- Spawn new stars
    self.spawnTimer += seconds
    if self.spawnTimer >= self.spawnInterval then
        self.spawnTimer = 0
        spawnStar(self)

        -- Increase difficulty over time
        self.spawnInterval = math.max(0.5, self.spawnInterval - 0.02)
        self.baseSpeed += 2
    end

    -- Update stars
    for i = #self.stars, 1, -1 do
        local star = self.stars[i]

        -- Move down
        star.y += star.speed * seconds

        -- Check collision with basket
        if checkCatch(self, star) then
            self.score += 10
            print(`Score: {self.score}`)
            table.remove(self.stars, i)
        -- Check if missed (fell off screen)
        elseif star.y > SCREEN_HEIGHT + 20 then
            self.lives -= 1
            print(`Lives: {self.lives}`)
            table.remove(self.stars, i)

            if self.lives <= 0 then
                gameOver(self)
            end
        end
    end

    return true
end

local function spawnStar(self: CatchTheStars)
    if #self.stars >= MAX_STARS then return end

    local star: Star = {
        x = math.random(30, SCREEN_WIDTH - 30),
        y = -20,
        speed = self.baseSpeed + math.random(-20, 20),
        active = true,
    }
    table.insert(self.stars, star)
end

local function checkCatch(self: CatchTheStars, star: Star): boolean
    local starBottom = star.y + 15
    local basketTop = self.basketY

    -- Check if star is at basket level
    if starBottom >= basketTop and star.y <= basketTop + 20 then
        -- Check horizontal overlap
        if star.x >= self.basketX and star.x <= self.basketX + self.basketWidth then
            return true
        end
    end
    return false
end

local function gameOver(self: CatchTheStars)
    self.state = "gameover"
    if self.score > self.highScore then
        self.highScore = self.score
    end
    print(`Game Over! Score: {self.score}, High Score: {self.highScore}`)
end

local function startGame(self: CatchTheStars)
    self.state = "playing"
    self.score = 0
    self.lives = 3
    self.stars = {}
    self.spawnTimer = 0
    self.spawnInterval = 1.5
    self.baseSpeed = 100
    print("Game started!")
end
```

---

## Part 3: Input Handling ⭐⭐

```lua
function onPointerMove(self: CatchTheStars, event: PointerEvent)
    if self.state == "playing" then
        -- Move basket to follow pointer
        self.basketX = event.position.x - self.basketWidth / 2

        -- Clamp to screen bounds
        self.basketX = math.max(0, math.min(SCREEN_WIDTH - self.basketWidth, self.basketX))
    end
end

function onPointerDown(self: CatchTheStars, event: PointerEvent)
    if self.state == "menu" or self.state == "gameover" then
        startGame(self)
    end
    event:hit()
end
```

---

## Part 4: Rendering ⭐⭐

```lua
function draw(self: CatchTheStars, renderer: Renderer)
    -- Background
    local bgPath = Path.new()
    bgPath:moveTo(Vector.xy(0, 0))
    bgPath:lineTo(Vector.xy(SCREEN_WIDTH, 0))
    bgPath:lineTo(Vector.xy(SCREEN_WIDTH, SCREEN_HEIGHT))
    bgPath:lineTo(Vector.xy(0, SCREEN_HEIGHT))
    bgPath:close()
    renderer:drawPath(bgPath, self.bgPaint)

    if self.state == "menu" then
        drawMenu(self, renderer)
    elseif self.state == "playing" then
        drawGame(self, renderer)
    elseif self.state == "gameover" then
        drawGameOver(self, renderer)
    end
end

local function drawGame(self: CatchTheStars, renderer: Renderer)
    -- Draw stars
    for _, star in self.stars do
        renderer:save()
        renderer:transform(Mat2D.withTranslation(star.x, star.y))
        renderer:drawPath(self.starPath, self.starPaint)
        renderer:restore()
    end

    -- Draw basket
    renderer:save()
    renderer:transform(Mat2D.withTranslation(self.basketX, self.basketY))
    renderer:drawPath(self.basketPath, self.basketPaint)
    renderer:restore()

    -- Draw UI (score, lives)
    drawUI(self, renderer)
end

local function drawUI(self: CatchTheStars, renderer: Renderer)
    -- Score indicator (stars at top left)
    local scorePaint = Paint.with({ style = "fill", color = Color.rgb(255, 255, 255) })
    local scorePath = Path.new()
    scorePath:moveTo(Vector.xy(10, 10))
    scorePath:lineTo(Vector.xy(10 + self.score / 2, 10))
    scorePath:lineTo(Vector.xy(10 + self.score / 2, 20))
    scorePath:lineTo(Vector.xy(10, 20))
    scorePath:close()
    renderer:drawPath(scorePath, scorePaint)

    -- Lives (hearts at top right)
    local heartPaint = Paint.with({ style = "fill", color = Color.rgb(255, 100, 100) })
    for i = 1, self.lives do
        renderer:save()
        renderer:transform(Mat2D.withTranslation(SCREEN_WIDTH - 30 * i, 15))
        renderer:transform(Mat2D.withScale(0.5, 0.5))
        renderer:drawPath(self.starPath, heartPaint)
        renderer:restore()
    end
end

local function drawMenu(self: CatchTheStars, renderer: Renderer)
    local textPaint = Paint.with({ style = "fill", color = Color.rgb(255, 255, 255) })

    -- Draw "Click to Start" indicator
    local indicator = Path.new()
    indicator:moveTo(Vector.xy(SCREEN_WIDTH/2 - 50, SCREEN_HEIGHT/2 - 20))
    indicator:lineTo(Vector.xy(SCREEN_WIDTH/2 + 50, SCREEN_HEIGHT/2 - 20))
    indicator:lineTo(Vector.xy(SCREEN_WIDTH/2 + 50, SCREEN_HEIGHT/2 + 20))
    indicator:lineTo(Vector.xy(SCREEN_WIDTH/2 - 50, SCREEN_HEIGHT/2 + 20))
    indicator:close()
    renderer:drawPath(indicator, textPaint)
end

local function drawGameOver(self: CatchTheStars, renderer: Renderer)
    local textPaint = Paint.with({ style = "fill", color = Color.rgb(255, 100, 100) })

    -- Game Over indicator
    local indicator = Path.new()
    indicator:moveTo(Vector.xy(SCREEN_WIDTH/2 - 80, SCREEN_HEIGHT/2 - 30))
    indicator:lineTo(Vector.xy(SCREEN_WIDTH/2 + 80, SCREEN_HEIGHT/2 - 30))
    indicator:lineTo(Vector.xy(SCREEN_WIDTH/2 + 80, SCREEN_HEIGHT/2 + 30))
    indicator:lineTo(Vector.xy(SCREEN_WIDTH/2 - 80, SCREEN_HEIGHT/2 + 30))
    indicator:close()
    renderer:drawPath(indicator, textPaint)
end
```

---

## Complete Factory Function

```lua
return function(): Node<CatchTheStars>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerMove = onPointerMove,
        pointerDown = onPointerDown,
        -- All properties...
        state = late(), score = late(), lives = late(), highScore = late(),
        basketX = late(), basketY = late(), basketWidth = late(), basketHeight = late(),
        stars = late(), spawnTimer = late(), spawnInterval = late(), baseSpeed = late(),
        starPath = late(), starPaint = late(), basketPath = late(), basketPaint = late(), bgPaint = late(),
    }
end
```

---

## Testing Checklist

- [ ] Game starts on click
- [ ] Stars fall from top
- [ ] Basket follows pointer
- [ ] Catching stars adds score
- [ ] Missing stars removes lives
- [ ] Game over triggers at 0 lives
- [ ] Can restart after game over

---

## Bonus Challenges

1. **Power-ups**: Add special stars worth more points
2. **Difficulty Levels**: Easy/Medium/Hard
3. **Sound Effects**: Print events for sound triggers
4. **Combo System**: Bonus for catching multiple stars quickly
5. **ViewModel Integration**: Connect score to UI elements

---

## Congratulations!

You've completed the Luau Rive Course! You now know:

- Luau syntax and type system
- Object-oriented programming in Luau
- Rive scripting protocols and lifecycle
- Custom drawing with Path and Paint
- Coordinate transforms
- Pointer event handling
- Dynamic instantiation
- Performance optimization

**Keep building!**
