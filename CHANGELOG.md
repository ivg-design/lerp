# Changelog

All notable changes to the LERP (Luau Education for Rive Professionals) course are documented in this file.

---

## [1.2.9] — 2026-06-04

### Added
- **Script save/recompile onboarding note** — added an early first-script warning with the save-state indicator screenshot so learners know the blue tab dot means unsaved changes and saving recompiles the script. Reported by Rive Community user [Avo](https://community.rive.app/u/7a2efe62).
- **Avo-reported errata tracker entries** — added resolved errata entries for script save/recompile workflow, Node script placement/code-access wording, and exercise validator whitespace feedback.

### Changed
- **Runtime compatibility baseline revalidated** — updated the current public runtime package line from `2.37.6` to `2.37.8`, pinned npm `gitHead` `bc560112ab2ee7d0afd3418bd97970c2fcb36532`, revalidated source-level API rows against `runtime-v0.1.106` (`5360c834eac2adbdfc49c808d1b2a8c61b014bbf`), and clarified that shader/GPU lessons remain Rive Early Access editor-only.
- **Node script placement language clarified** — reworded setup steps across lessons, exercises, project pages, API references, and the exercise registry from "attach to a shape" toward "add to the artboard, position or nest the script node." Reported by Rive Community user [Avo](https://community.rive.app/u/7a2efe62).

### Fixed
- **Node placement code-access gap (LERP-GAP-008)** — clarified that nesting a Node script under a shape/group affects normal hierarchy behavior, but does not pass parent `NodeData` or existing shape `PathData` into Node callbacks. Reported by Rive Community user [Avo](https://community.rive.app/u/7a2efe62).
- **Exercise validator whitespace feedback (LERP-ERR-010)** — failed-answer displays now preserve exact spaces/tabs and call out whitespace-only mismatches, so copying a displayed failed answer cannot silently normalize spacing. Reported by Rive Community user [Avo](https://community.rive.app/u/7a2efe62).

---

## [1.2.8] — 2026-06-04

### Added
- **ScriptedInterpolator protocol coverage** — added `docs/rive/protocols/scripted-interpolator-protocol.mdx` with runtime-backed behavior, fallback semantics, exercise, and quiz.
- **Interpolation API page** — added `docs/api/interpolation.mdx` and linked it in API Reference navigation so ScriptedInterpolator has a direct API location.
- **Mat4 API coverage** — expanded `docs/api/core-types.mdx` with full Mat4 constructors, static helpers, transforms, buffer write, and operator semantics.
- **Promise/async/await reference** — added Promise runtime coverage to `docs/api/system.mdx` and quick-reference usage snippets for async image decode workflows.
- **Context advanced rendering coverage** — added `context:canvas`, `context:gpuCanvas`, `context:features`, `context:preferredCanvasFormat`, `context:loadShader`, and `context:decodeImage` to `docs/api/data-input.mdx`.
- **GPU Shaders and 3D Rendering course chapter** — added `docs/advanced/gpu-shaders.mdx` with early-access shader workflow guidance, `drawCanvas` lifecycle positioning, WGSL/Luau examples, exercises, and quizzes.
- **GPU Shaders API reference** — added `docs/api/gpu-shaders.mdx` covering `GPUCanvas`, `Shader`, `GPURenderPass`, `GPUPipeline`, `GPUBuffer`, `GPUTexture`, `GPUSampler`, bind groups, descriptor types, string literal types, `GPUFeatures`, `Image:view()`, and shader troubleshooting.
- **GPU Shader Example Labs project** — added `docs/projects/gpu-shader-labs.mdx` as a guided 10-lab path based on the corrected local Rive shader example pack.
- **Shader lab exercises and quizzes** — added validator-backed project exercises and quizzes focused on typed descriptors, guarded shader/image setup, `UBOEntry.size`, and explicit render-to-texture source strategies.
- **Release and deployment workflow** — added `docs/release-workflow.mdx` as the canonical maintainer protocol for drafting, local review, commit/tag release, Vercel production deploys, verification, and rollback.

### Changed
- **Runtime compatibility baseline updated** — refreshed `docs/rive/runtime-compatibility.mdx` to the May 12, 2026 course-wide audit with upstream runtime snapshot `runtime-v0.1.64` (`b25a32218c6308ac8dc4b1cb69df62de84d78ba4`) and npm C++ WASM runtime line `2.37.6` (`gitHead` `2833de372c0d22596494c89c328008ce5b1106d7`, published May 8, 2026 UTC).
- **Release-tier alignment for advanced rendering APIs** — reclassified GPU/shader object families as `Preview / rollout-dependent` while keeping `Canvas` + `decodeImage/DecodedImage` as officially released advanced surfaces; updated `docs/api/data-input.mdx`, `docs/api/assets.mdx`, and `docs/rive/runtime-compatibility.mdx`.
- **Listener payload coverage expanded** — updated Events and ListenerAction docs with gamepad payload guards/accessors and explicit invocation field mapping.
- **Node lifecycle coverage expanded** — added keyboard/text callback handling guidance and propagation semantics (`return true` stops propagation).
- **Artboard input typing guidance improved** — updated Input docs to include `Input<Artboard<Data.X>>` and `Input<Artboard<nil>>` patterns, plus `instance(viewModel)` guidance.
- **Shader lesson updated for type-safe runtime-v0.1.106 patterns** — rewrote the minimal triangle and supporting snippets to use non-null local GPU resources, typed descriptor helpers, local optional-field guards in `drawCanvas`, and byte-accurate uniform binding sizes.
- **GPU API reference tightened** — documented descriptor-local construction, `getBindGroupLayout` auto-layout caveats, optional `context:shader(name)` failure causes, image asset requirements, sampler blur checks, WGSL swizzle assignment limits, and explicit source-texture requirements for glass effects.
- **Runtime compatibility shader baseline clarified** — updated `docs/rive/runtime-compatibility.mdx` to label the runtime-v0.1.106 shader baseline as Rive Early Access only, while preserving the May 12, 2026 course-wide runtime audit as the main baseline.
- **External editor tooling documented** — added Rive Luau LSP / VS Code extension recommendations for writing `.luau` scripts in VS Code, Cursor, Windsurf, and other LSP-capable editors, including shader-specific syntax and descriptor-checking guidance.
- **Course metadata refreshed** — updated sidebar review date, site map, progress registry, quiz tracking, discoverability artifacts, and course counts for the roll-up release.

### Fixed
- **PropertyList inconsistency (LERP-ERR-006)** — replaced stale `list.count` / `list:item(index)` usage with `list.length` / `list[index]` and documented `clear`, `removeAt`, and `removeAllOf` in API and advanced lessons.
- **Version alignment drift** — synchronized runtime-version references across API, protocol, matrix, and compatibility pages to a single May 12, 2026 audit baseline.

---

## [1.2.7] — 2026-04-27

### Added
- **Runtime compatibility baseline page** — added `docs/rive/runtime-compatibility.mdx` with both a pinned runtime source snapshot (`npm gitHead@5581955` for runtime line `2.37.4`, published April 24, 2026 UTC) and the current C++ WASM npm runtime release line (`2.37.4` across `@rive-app/canvas`, `@rive-app/canvas-lite`, `@rive-app/webgl2`, `@rive-app/canvas-advanced`), plus a live/partial/not-exposed matrix for docs-labeled "Coming soon" surfaces.

### Changed
- **API references refreshed against runtime baseline** — expanded Events docs from pointer-only coverage to ListenerContext payload kinds; added AudioSource `duration`; added explicit runtime-status notes for NodeReadData paint/path surfaces.
- **System/Glossary runtime status wording** — reclassified `Output<T>` as not currently exposed in baseline C++ Luau bindings and adjusted examples accordingly.
- **Lesson and quiz updates** — updated ListenerAction and Listener lessons/quizzes to use `listenerContext:is...()` + `as...()` payload-guard pattern as the primary event-handling approach.
- **Course metadata sync** — intro snapshot, sidebar "Last reviewed", quick-reference links, and site-map entries now point to the runtime compatibility baseline for future tracking.
- **Audit protocol documentation** — runtime baseline page now records how verification was executed (npm release checks, runtime commit pin, docs `(Coming soon)` diffing, and binding-level confirmation) and defines required fields for all future changelog runtime-audit entries.

---

## [1.2.6] — 2026-04-26

### Fixed
- **OOP Exercise 6 (Read-Only Table)** — corrected the lesson to use a proxy-table pattern (`source` + `proxy`) so writes to existing keys are properly blocked via `__newindex` on the proxy. Reported in GitHub issue [#1](https://github.com/ivg-design/lerp/issues/1).
- **Exercise metadata alignment** — updated `oop-indexmeta-6` hints/explanation to match actual Luau metamethod semantics from issue [#1](https://github.com/ivg-design/lerp/issues/1).

---

## [1.2.5] — 2026-04-26

### Added
- **Rive errata tracker** — reviewed and integrated `docs/rive/rive-doc-errata.mdx` findings, and marked the current batch as resolved in LERP.

### Fixed
- **ListenerAction callback guidance** — updated docs to use `performAction(self, listenerContext)` as the preferred callback, with `perform(self, pointerEvent)` marked legacy.
- **Path Effect command checks** — replaced `CommandType.*` runtime examples with editor-validated string comparisons (`cmd.type == "moveTo"` etc.) and added explicit non-global note.
- **ViewModel context wording** — corrected `context:viewModel()` semantics to immediate data-context scope and clarified `context:rootViewModel()` for root/artboard state.
- **Listener lifetime guidance** — added warnings to keep VM/property handles alive (or use anchored listener overloads) for long-lived listeners.
- **Pointer-event consumption docs** — replaced boolean consume/propagate wording with `event:hit()` / `event:hit(true)` guidance in Node lifecycle materials.

### Changed
- **Course metadata refresh** — updated Intro snapshot date/counts and sidebar "Last reviewed" date for this errata pass.

---

## [1.2.3] — 2026-03-14

### Added
- **Complete Input type reference** — every `Input<T>` type now has its own section in the API reference with when-to-use explanation, factory default, how-to-read, complete code example, and editor setup steps (for types that need it)
- **`Input<Trigger>` documentation** — new "Trigger Inputs" section in Inputs guide, empirically validated in the Rive editor with 5 test scripts
- **Trigger execution order** — documented the ground-truth frame order: trigger fn → advance → update (trigger function is called directly, not through update)
- **Changelog page** — new sidebar entry after Trust & Transparency linking to rendered changelog

### Changed
- **Input API reference rewritten** — replaced bare code-block type list with per-type sections: `Input<number>`, `Input<boolean>`, `Input<string>`, `Input<Color>`, `Input<Data.X>`, `Input<Artboard>`, `Input<Trigger>`, and Change Handling — all written for non-programmers
- **Trigger moved from Events to Data & Input** — `Trigger` is a data input type, not a pointer event; Events page now redirects to the correct location
- **Events page** — simplified to PointerEvent only, with redirect link for Trigger
- **Sidebar author metadata** — "Last reviewed" updated to March 14, 2026

### Fixed
- **Trigger factory default** — documented that `late()` causes runtime error "expected trigger X to be a function"; must use `function() end`
- **Removed incorrect claims** — `Input<Trigger>?` does NOT hide triggers from the UI; you CAN assign to trigger inputs in init (and it sticks)

---

## [1.2.2] — 2026-03-04

### Added
- **Path winding troubleshooting guidance** — added a dedicated section in Procedural Geometry covering even-odd fill behavior, contour winding conflicts, cross-product detection, and strategy tradeoffs for multi-contour paths
- **New advanced procedural exercise** — added `Exercise 8: Fix Conflicting Winding in a Spike Burst` with validator ID `advanced-procedural-8`
- **Debugging cross-reference** — added a new common error pattern for "shapes disappear with no runtime error" linking to the winding guidance

### Changed
- **Course snapshot metadata** — refreshed intro page "Course at a Glance" counts and update date
- **Trust sidebar metadata** — updated "Last reviewed" date in the sidebar author meta block

---

## [1.2.1] — 2026-02-27

### Added
- **Script capability matrix** — new cross-protocol reference page summarizing supported callbacks and APIs by script type
- **AI agent protocol guidance** — added internal protocol notes (32-bit numeric bounds, pure Luau runtime rules, `none` utility semantics, and component-list generation rules)

### Fixed
- **Exercise expected outputs** — replaced 76 `ANSWER: <your result>` placeholders with exact validator answers across 20 docs pages
- **ViewModels context API references** — removed invalid `context:artboard()`/`context:node()` calls and aligned examples with supported context methods
- **Exercise and quiz tracking maps** — synchronized docs and local registry/index so all exercise and quiz IDs are mapped correctly

### Changed
- **Course consistency pass** — resolved cross-page wording and metadata drift discovered during final v1.2 review

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
- Added `.vercel` to `.gitignore`

---

## [1.1.1] — 2026-01-24

### Fixed
- Major audit fixes across documentation based on runtime testing
- Navigation routing improvements for experience-based paths
- Untracked `.claude` folders from the repository
- Strict mode optionality wording clarified in docs

---

## [1.1.0] — 2026-01-15

### Added
- Rive Luau expert agent with skills integration
- Beginner-friendly "Your First Script" page
- Beginner exercise with proper template format
- Test scripts support added to gitignore

### Fixed
- Categorical claims corrected based on runtime testing

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
- Exercise expected-output blocks switched from literal answers to guidance placeholders (later reverted in 1.2.1)
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
