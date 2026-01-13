# Project 7.2: Animated Data Visualization

## Project Overview

Build an animated bar chart that:
- Displays data from a ViewModel
- Animates smoothly when values change
- Shows labels and values
- Supports different color themes

**Concepts Used**: Drawing API, Data Binding, Animation, Types

---

## Requirements

### Core Features
1. Display 5 bars representing data values
2. Animate bar heights when data changes
3. Show value labels above each bar
4. Color bars based on value (low = red, high = green)

### Bonus Features
- Horizontal bar option
- Tooltip on hover
- Custom color themes

---

## Part 1: Data Structure ⭐

```lua
--!strict

-- Define the data structure
type BarData = {
    label: string,
    value: number,
    targetValue: number,  -- For animation
    color: Color,
}

export type BarChart = {
    -- Data
    bars: {BarData},
    maxValue: number,

    -- Display
    chartX: number,
    chartY: number,
    chartWidth: number,
    chartHeight: number,
    barSpacing: number,

    -- Graphics (created in init)
    barPath: Path,
    barPaint: Paint,
    labelPaint: Paint,
}

function init(self: BarChart): boolean
    -- Initialize display properties
    self.chartX = 50
    self.chartY = 50
    self.chartWidth = 400
    self.chartHeight = 250
    self.barSpacing = 10
    self.maxValue = 100

    -- Create graphics objects
    self.barPath = Path.new()
    self.barPaint = Paint.new()
    self.barPaint.style = "fill"

    self.labelPaint = Paint.new()
    -- Note: Text rendering would need Text Run binding in real Rive

    -- Initialize sample data
    self.bars = {
        { label = "Jan", value = 0, targetValue = 65, color = Color.rgb(100, 150, 255) },
        { label = "Feb", value = 0, targetValue = 45, color = Color.rgb(100, 150, 255) },
        { label = "Mar", value = 0, targetValue = 80, color = Color.rgb(100, 150, 255) },
        { label = "Apr", value = 0, targetValue = 55, color = Color.rgb(100, 150, 255) },
        { label = "May", value = 0, targetValue = 90, color = Color.rgb(100, 150, 255) },
    }

    return true
end

return function(): Node<BarChart>
    return {
        init = init,
        bars = late(),
        maxValue = late(),
        chartX = late(), chartY = late(),
        chartWidth = late(), chartHeight = late(),
        barSpacing = late(),
        barPath = late(), barPaint = late(), labelPaint = late(),
    }
end
```

---

## Part 2: Animation Logic ⭐⭐

```lua
function advance(self: BarChart, seconds: number): boolean
    local animSpeed = 5  -- Animation speed

    for _, bar in self.bars do
        -- Animate toward target value
        if bar.value ~= bar.targetValue then
            local diff = bar.targetValue - bar.value
            local delta = diff * animSpeed * seconds

            -- Clamp to prevent overshoot
            if math.abs(delta) > math.abs(diff) then
                bar.value = bar.targetValue
            else
                bar.value += delta
            end
        end

        -- Update color based on value
        local t = bar.value / self.maxValue
        bar.color = Color.lerp(
            Color.rgb(255, 100, 100),  -- Low (red)
            Color.rgb(100, 255, 100),  -- High (green)
            t
        )
    end

    return true
end
```

---

## Part 3: Drawing ⭐⭐

```lua
function draw(self: BarChart, renderer: Renderer)
    local barCount = #self.bars
    local totalSpacing = self.barSpacing * (barCount - 1)
    local barWidth = (self.chartWidth - totalSpacing) / barCount

    -- Draw axis
    drawAxis(self, renderer)

    -- Draw each bar
    for i, bar in self.bars do
        local barHeight = (bar.value / self.maxValue) * self.chartHeight
        local x = self.chartX + (i - 1) * (barWidth + self.barSpacing)
        local y = self.chartY + self.chartHeight - barHeight

        -- Build bar path
        self.barPath:reset()
        self.barPath:moveTo(Vector.xy(x, y))
        self.barPath:lineTo(Vector.xy(x + barWidth, y))
        self.barPath:lineTo(Vector.xy(x + barWidth, self.chartY + self.chartHeight))
        self.barPath:lineTo(Vector.xy(x, self.chartY + self.chartHeight))
        self.barPath:close()

        -- Draw bar with color
        self.barPaint.color = bar.color
        renderer:drawPath(self.barPath, self.barPaint)

        -- Draw value label (simplified - just a small rectangle as placeholder)
        drawValueIndicator(self, renderer, x + barWidth / 2, y - 10, bar.value)
    end
end

local function drawAxis(self: BarChart, renderer: Renderer)
    local axisPaint = Paint.with({
        style = "stroke",
        thickness = 2,
        color = Color.rgb(100, 100, 100),
    })

    local axisPath = Path.new()
    -- Y-axis
    axisPath:moveTo(Vector.xy(self.chartX, self.chartY))
    axisPath:lineTo(Vector.xy(self.chartX, self.chartY + self.chartHeight))
    -- X-axis
    axisPath:lineTo(Vector.xy(self.chartX + self.chartWidth, self.chartY + self.chartHeight))

    renderer:drawPath(axisPath, axisPaint)
end

local function drawValueIndicator(self: BarChart, renderer: Renderer, x: number, y: number, value: number)
    -- Draw a small indicator above the bar
    local indicatorPaint = Paint.with({
        style = "fill",
        color = Color.rgb(50, 50, 50),
    })

    local size = 5
    local indicator = Path.new()
    indicator:moveTo(Vector.xy(x - size, y - size))
    indicator:lineTo(Vector.xy(x + size, y - size))
    indicator:lineTo(Vector.xy(x + size, y + size))
    indicator:lineTo(Vector.xy(x - size, y + size))
    indicator:close()

    renderer:drawPath(indicator, indicatorPaint)
end
```

---

## Part 4: Interactivity ⭐⭐⭐

```lua
function onPointerDown(self: BarChart, event: PointerEvent)
    -- Find which bar was clicked
    local barCount = #self.bars
    local totalSpacing = self.barSpacing * (barCount - 1)
    local barWidth = (self.chartWidth - totalSpacing) / barCount

    for i, bar in self.bars do
        local x = self.chartX + (i - 1) * (barWidth + self.barSpacing)

        if event.position.x >= x and event.position.x <= x + barWidth then
            -- Randomize this bar's target value
            bar.targetValue = math.random(10, 100)
            print(`{bar.label}: {bar.targetValue}`)
            event:hit()
            return
        end
    end
end

-- Add to factory:
-- pointerDown = onPointerDown,
```

---

## Testing Checklist

- [ ] Bars animate smoothly on load
- [ ] Colors transition from red to green
- [ ] Clicking a bar changes its value
- [ ] Axes are drawn correctly
- [ ] Animation doesn't overshoot

---

## Bonus Challenges

1. **Pie Chart**: Convert to a pie chart
2. **Line Graph**: Draw connected points instead of bars
3. **ViewModel Binding**: Connect to real data
4. **Tooltips**: Show value on hover

---

## What You've Learned

- Animating values smoothly with lerp
- Drawing dynamic shapes
- Color interpolation based on data
- Hit testing for chart interaction
