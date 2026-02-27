# Changelog

All notable changes to the LERP (Learn Rive Luau) course are documented in this file.

---

## [1.2.0] — 2026-02-23

### Added
- **Rive AI Agent guide** — comprehensive documentation of all 14 tools available to the Rive AI coding assistant, including workflow examples and tips
- **ListenerAction protocol** — new script protocol page for state machine listener action scripts
- **TransitionCondition protocol** — new script protocol page for custom state machine transition conditions
- **Audio system documentation** — AudioSource, AudioSound, and the Audio global API added to API reference
- **Blob type documentation** — binary data assets in API reference
- **DataContext type** — hierarchy traversal for data binding contexts
- **Vector static methods** — `Vector.cross`, `Vector.scaleAndAdd`, `Vector.scaleAndSub` and other previously undocumented static methods
- **ImageSampler constructor** — proper function constructor documentation replacing placeholder
- **CHANGELOG.md** — this file, with reconstituted version history

### Fixed
- **Path Effect scope wording** — clarified that path effects apply to both strokes and fills (not strokes-only)
- **Vector deprecated methods** — instance methods (`vec:length()`, `vec:dot()`, etc.) now marked as deprecated with static alternatives shown
- **ImageFilter values** — corrected `trilinear` to `bilinear` (trilinear does not exist in Rive)
- **ImageSampler API** — documented as function constructor `ImageSampler(wrapX, wrapY, filter)` instead of opaque object
- **Context methods** — added missing `rootViewModel()`, `dataContext()`, `image()`, `blob()`, `audio()`
- **BlendMode usage** — corrected from namespace access (`BlendMode.multiply`) to string literals (`"multiply"`)
- **PathEffect.update() signature** — added missing `node: NodeReadData` parameter
- **PathCommand point counts** — corrected to reflect Vector objects (1, 1, 2, 3) not raw number pairs (2, 2, 4, 6)
- **DataValue type-check methods** — corrected from property access to method calls (`dv:isNumber()` not `dv.isNumber`)
- **PropertyList:insert parameter order** — corrected to `insert(vm, index)` per API
- **viewModel:getViewModel() return type** — corrected to `PropertyViewModel?`
- **artboard:instance() signature** — added optional `viewModel` parameter
- **artboard:node() return type** — corrected to `NodeData?`
- **Scene Node init() signature** — added missing `context: Context` parameter
- **renderer:drawImageMesh signature** — added full parameter list
- **ContourMeasure documentation** — expanded to show it has full PathMeasure capabilities, not just iteration
- **NodeReadData missing methods** — added `asPath()` and `asPaint()`
- **PropertyList missing listeners** — added `addListener()` and `removeListener()`

### Changed
- **Script types count** — updated from 6 to 8 to include ListenerAction and TransitionCondition
- **Quick Decision Guide** — expanded mermaid chart with new script types
- **Factory Functions table** — added ListenerAction and TransitionCondition, removed Listener (not a script type)
- **Glossary** — added 8+ new terms (ListenerAction, TransitionCondition, AudioSource, AudioSound, Blob, DataContext, ImageSampler, Output)
- **Strict-mode guidance** — removed blanket `--!strict` assumptions in docs where runtime behavior makes strict mode optional

---

## [1.1.2] — 2026-02-17

### Fixed
- `.vercel` added to `.gitignore`

---

## [1.1.1] — 2026-01-24

### Fixed
- Major audit fixes across documentation based on runtime testing
- Navigation routing improvements for experience-based paths
- `.claude` folders untracked from repository
- Strict mode optionality wording clarified in docs

---

## [1.1.0] — 2026-01-15

### Added
- Rive Luau expert agent with skills integration
- Beginner-friendly "Your First Script" page
- Beginner exercise with proper template format
- Categorical claims corrected based on runtime testing
- Test scripts support added to gitignore

---

## [1.0.1] — 2026-01-15

### Added
- Glossary expanded with 25+ new terms
- Mat2D wrapped in Term component for consistent linking

### Fixed
- API claims corrected and missing documentation added (#87)
- Angle bracket escaped in MDX to fix compilation error

---

## [1.0.0] — 2026-01-14

### Added
- Complete exercise system with progress tracking
- Comprehensive lesson improvements with AE/JS comparisons
- All lessons migrated to Rive-first format with dark mode fixes
- Comprehensive lessons for Fundamentals, Types, and OOP modules
- Complete API reference and quick-reference content
- CI/CD deployment pipeline
- LERP brand assets

### Fixed
- Literal answers in Expected Output replaced with guidance text
- Build warnings resolved across all exercises

---

## [0.8.0] — 2026-01-13

### Added
- Migrated to Docusaurus with interactive quizzes
- Loading indicator and fallback links
- Code exercises and quiz reset functionality

---

## [0.5.0] — 2026-01-13

### Added
- Split guide into loadable parts
- Navigation links to reference docs
- Improved layout and reference documentation

---

## [0.1.0] — 2026-01-13

### Added
- Initial LERP course added to forge platform
