# LERP Content Audit Report

**Audit Date:** 2026-01-14
**Auditor:** Claude Opus 4.5
**Focus:** Rive-Specific Luau API Accuracy
**Reference:** Official Rive Documentation at rive.app/docs/scripting

---

## Executive Summary

**Total Files Audited:** 15+ of 58
**Critical Issues Found:** 3 (all being fixed in lerp-work)
**Major Issues Found:** 2 (1 resolved, 1 NEW - missing script protocols)
**Minor Issues Found:** 2

### Critical Issues Requiring Immediate Fix:
1. `path:circle()` - Used 7 times, method does NOT exist
2. `renderer:scale()` - Used 3 times, method does NOT exist
3. `Color.hex()` - Used 6 times, method does NOT exist

### NEW Major Issue:
4. **Missing Script Protocols** - 4 of 7 Rive script types undocumented (Layout, Converter, Test, Path Effect)

### Resolved:
5. ~~Input<T> access pattern~~ - **VERIFIED CORRECT** (direct access works)

---

## Audit Status

- [x] Part 1: Getting Started (**ISSUES FOUND**)
- [ ] Part 2: Luau Fundamentals (generic Luau - low risk)
- [ ] Part 3: Type System (generic Luau - low risk)
- [ ] Part 4: OOP Deep Dive (generic Luau - low risk)
- [x] Part 5: Rive Integration (**ISSUES FOUND**)
- [x] Part 6: Advanced Techniques (PARTIAL - issues found)
- [ ] Part 7: Best Practices
- [x] Part 8: Projects (**VERIFIED CORRECT**)
- [x] API Reference (**MOSTLY CORRECT**)
- [ ] Quick Reference

---

## Critical Issues (MUST FIX)

### CRIT-001: Non-existent `path:circle()` method

**Severity:** CRITICAL - Code will fail at runtime

**Files Affected (7 occurrences):**
| File | Line |
|------|------|
| `protocols.mdx` | 698 |
| `protocols.mdx` | 705 |
| `how-rive-scripts-work.mdx` | 407 |
| `types/late-initializer.mdx` | 182 |
| `types/late-initializer.mdx` | 472 |
| `types/late-initializer.mdx` | 751 |
| `types/annotations.mdx` | 572 |

**Problem:** Uses `self.path:circle(Vector.xy(100, 100), 50)` but **Path has NO `circle()` method**.

**Official Path API Methods:**
- `moveTo(point)`, `lineTo(point)`, `quadTo(c, end)`, `cubicTo(c1, c2, end)`
- `close()`, `reset()`, `add(other, transform?)`
- `measure()`, `contours()`

**Fix Required:** Replace with manual circle approximation using cubic bezier curves:
```lua
-- Circle approximation using 4 cubic beziers
local function addCircle(path: Path, center: Vector, radius: number)
    local k = 0.5522847498  -- Magic number for circle approximation
    local ox, oy = center.x, center.y
    local r = radius

    path:moveTo(Vector.xy(ox, oy - r))
    path:cubicTo(
        Vector.xy(ox + r * k, oy - r),
        Vector.xy(ox + r, oy - r * k),
        Vector.xy(ox + r, oy)
    )
    path:cubicTo(
        Vector.xy(ox + r, oy + r * k),
        Vector.xy(ox + r * k, oy + r),
        Vector.xy(ox, oy + r)
    )
    path:cubicTo(
        Vector.xy(ox - r * k, oy + r),
        Vector.xy(ox - r, oy + r * k),
        Vector.xy(ox - r, oy)
    )
    path:cubicTo(
        Vector.xy(ox - r, oy - r * k),
        Vector.xy(ox - r * k, oy - r),
        Vector.xy(ox, oy - r)
    )
    path:close()
end
```

---

### CRIT-002: Non-existent `renderer:scale()` method

**Severity:** CRITICAL - Code will fail at runtime

**Files Affected (3 occurrences):**
| File | Line |
|------|------|
| `rive/protocols.mdx` | 580 |
| `rive/other-protocols.mdx` | 436 |
| `rive/other-protocols.mdx` | 972 |

**Problem:** Uses `renderer:scale(Vector.xy(self.displayScale, self.displayScale))` but **Renderer has NO `scale()` method**.

**Official Renderer API Methods:**
- `drawPath(path, paint)`, `drawImage(...)`, `drawImageMesh(...)`
- `clipPath(path)`, `save()`, `restore()`, `transform(mat)`

**Fix Required:** Replace with Mat2D transform:
```lua
-- WRONG:
renderer:scale(Vector.xy(self.displayScale, self.displayScale))

-- CORRECT:
renderer:transform(Mat2D.withScale(self.displayScale, self.displayScale))
```

---

### CRIT-003: Non-existent `Color.hex()` constructor

**Severity:** CRITICAL - Code will fail at runtime

**Files Affected (6 occurrences in `glossary.mdx`):**
| Line | Usage |
|------|-------|
| 76 | `Color.hex("#0000FF")` |
| 221 | `Color.hex("#FF0000")` |
| 222 | `Color.hex("#0000FF")` |
| 240 | `Color.hex("#FF0000")` |
| 467 | `Color.hex("#FF0000")` |
| 474 | `Color.hex("#0000FF")` |

**Problem:** Uses `Color.hex("#FF0000")` but **Color has NO `hex()` method**.

**Official Color API Constructors:**
- `Color.rgb(r, g, b)` - Creates opaque color
- `Color.rgba(r, g, b, a)` - Creates color with alpha
- `Color.lerp(from, to, t)` - Interpolates between colors

**Fix Required:** Replace with `Color.rgb()`:
```lua
-- WRONG:
Color.hex("#FF0000")

-- CORRECT:
Color.rgb(255, 0, 0)
```

Or create a helper function if hex is desired:
```lua
local function hexToColor(hex: string): Color
    local r = tonumber(hex:sub(2, 3), 16) or 0
    local g = tonumber(hex:sub(4, 5), 16) or 0
    local b = tonumber(hex:sub(6, 7), 16) or 0
    return Color.rgb(r, g, b)
end
```

---

### ~~CRIT-004: Input<T> Access Pattern Contradiction~~ **RESOLVED - LERP IS CORRECT**

**Status:** VERIFIED CORRECT on 2026-01-14

**Test Result:**
```
=== INPUT ACCESS TEST ===
Direct access: self.testNumber = 42
Direct access: self.testString = hello
```

**Conclusion:** `Input<T>` values ARE accessed directly without `.value`:
```lua
self.testNumber  -- Returns 42 directly (CORRECT)
self.testString  -- Returns "hello" directly (CORRECT)
```

**The distinction is:**
- `Input<T>` = Direct access, read-only (script inputs from editor)
- `Property<T>` = `.value` access, read/write (ViewModel properties)

LERP documentation is accurate. The official Rive web docs may be outdated or referring to a different API pattern.

---

## Major Issues (SHOULD FIX)

### ~~MAJ-001: Context Parameter in Lifecycle Functions~~ **RESOLVED - LERP IS CORRECT**

**Status:** VERIFIED CORRECT on 2026-01-14

**Test Result:**
```
=== CONTEXT TEST ===
context exists: true
viewModel: userdata: 0x000000084925bed0
```

**Conclusion:** Context parameter IS available in lifecycle functions:
- `init(self, context)` - WORKS
- `context:viewModel()` - WORKS (returns nil if no ViewModel, otherwise the ViewModel)

---

### MAJ-002: Mention of Non-existent `path:roundedRect()`

**File:** `projects/interactive-button.mdx` line 153

**Problem:** Extension idea mentions `path:roundedRect()` which doesn't exist.

**Fix:** Remove or note as "manual implementation required"

---

## Minor Issues (NICE TO FIX)

### MIN-001: Loop Syntax Preference
**Issue:** Mix of `for _, x in items do` and `for _, x in ipairs(items) do`
**Status:** Both work in Luau. Codex standardized to `ipairs()`/`pairs()` for clarity.
**Recommendation:** Stick with explicit `ipairs()`/`pairs()` for educational purposes.

### MIN-002: Missing :::note Rive Result blocks
**Issue:** Some exercises lack expected output notes
**Status:** Codex added these in lerp-work

---

## Verified Correct

### VC-001: PointerEvent API
**Status:** CORRECT
- `function pointerDown(self: MyNode, event: PointerEvent)`
- `event.position` (Vec2D with x, y)
- `event:hit()` to consume events
- `event.id` for multi-touch

### VC-002: Path API (except circle)
**Status:** CORRECT
- `Path.new()`, `moveTo`, `lineTo`, `quadTo`, `cubicTo`, `close`, `reset`, `add`
- `measure()`, `contours()`

### VC-003: Paint API
**Status:** CORRECT
- `Paint.new()`, `Paint.with({...})`
- Properties: `style`, `color`, `thickness`, `cap`, `join`, `blendMode`, `feather`, `gradient`
- Method: `copy(overrides?)`

### VC-004: Renderer API (except scale)
**Status:** CORRECT
- `drawPath`, `drawImage`, `drawImageMesh`, `clipPath`, `save`, `restore`, `transform`

### VC-005: Vector API
**Status:** CORRECT
- `Vector.xy(x, y)`, `Vector.origin()`
- Properties: `x`, `y` (read-only)
- Methods: `length()`, `lengthSquared()`, `normalized()`, `distance()`, `distanceSquared()`, `dot()`, `lerp()`
- Operators: `+`, `-`, `*`, `/`, `-` (unary), `==`

### VC-006: Color API (except hex)
**Status:** CORRECT
- `Color.rgb(r, g, b)`, `Color.rgba(r, g, b, a)`, `Color.lerp(from, to, t)`
- Static accessors: `Color.red()`, `Color.green()`, `Color.blue()`, `Color.alpha()`, `Color.opacity()`

### VC-007: Mat2D API
**Status:** CORRECT
- `Mat2D.identity()`, `Mat2D.values(...)`
- `Mat2D.withTranslation()`, `Mat2D.withRotation()`, `Mat2D.withScale()`
- `Mat2D.withScaleAndTranslation()`
- Methods: `invert()`, `isIdentity()`

### VC-008: Project Files (catch-the-stars, interactive-button)
**Status:** CORRECT
- Proper PointerEvent usage
- Proper Renderer transform pattern
- Proper Property<T> .value usage for ViewModels

---

## Codex's Changes Analysis

Codex (working in lerp-work) made the following changes:

### CORRECT Changes:
1. **PointerEvent API** - Changed from `position: Vector` + `return true/false` to `event: PointerEvent` + `event:hit()`
2. **Loop syntax** - Standardized to `ipairs()`/`pairs()`
3. **Added :::note Rive Result** blocks for expected output

### Changes Needing Review:
1. **Removed Input<T> .value** - Claims direct access, but official docs show `.value`
2. **Context parameter** - Needs verification with actual Rive runtime

---

## Recommended Actions

### Immediate (Before Publication):
1. [ ] Remove ALL `path:circle()` - Replace with cubic bezier approximation
2. [ ] Remove ALL `renderer:scale()` - Replace with `Mat2D.withScale()` + `transform()`
3. [ ] Remove ALL `Color.hex()` - Replace with `Color.rgb()`
4. [ ] Verify Input<T> access pattern with actual Rive editor

### Before Publication (High Priority):
5. [ ] Verify Context parameter availability in lifecycle functions
6. [ ] Remove `path:roundedRect()` mention or note as manual implementation

### Nice to Have:
7. [ ] Add :::note Rive Result to all exercises
8. [ ] Standardize loop syntax to `ipairs()`/`pairs()`

---

## Files Summary

| Category | Files | Issues |
|----------|-------|--------|
| Getting Started | 3 | `path:circle()` in how-rive-scripts-work |
| Rive Integration | 6 | `path:circle()`, `renderer:scale()` |
| Types | 7 | `path:circle()` in late-initializer, annotations |
| API Reference | 11 | `Color.hex()` in glossary |
| Projects | 3 | CLEAN (except roundedRect mention) |
| Advanced | 6 | Needs full audit |
| OOP | 8 | Generic Luau - low risk |
| Fundamentals | 7 | Generic Luau - low risk |
| Best Practices | 4 | Needs full audit |

---

## Missing Script Protocol Documentation

**Severity:** MAJOR - Incomplete coverage of Rive script types

**Discovery Date:** 2026-01-14

Rive Editor supports **7 script types** but LERP only documents 3:

| Script Type | LERP Coverage | Notes |
|-------------|---------------|-------|
| Blank Script | N/A | Empty template, no docs needed |
| Node Script | ✅ `protocols.mdx` | Comprehensive |
| Layout Script | ❌ **MISSING** | Needs documentation |
| Converter Script | ❌ **MISSING** | Needs documentation |
| Test Script | ❌ **MISSING** | Needs documentation |
| Path Effect Script | ❌ **MISSING** | Needs documentation |
| Util Script | ✅ `util-protocol.mdx` | Comprehensive |
| Listener Script | ✅ `other-protocols.mdx` | Covered |

### Recommended Action:
Research and document the 4 missing script types:
1. **Layout Script** - Likely for artboard/component layout logic
2. **Converter Script** - Likely for data type conversions
3. **Test Script** - Likely for testing/debugging
4. **Path Effect Script** - Likely for custom path modifications

These may require official Rive documentation research or experimentation in the editor
