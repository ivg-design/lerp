# Exercise Architecture Design

**Question:** Should exercises be separated from guide content into their own files/folder?

---

## Option A: Inline Exercises (Current Approach)

Exercises are embedded directly in the guide MDX files using the `<Exercise>` component.

```mdx
## Variables

Variables store values...

<Exercise
  title="Character Stats"
  difficulty={1}
  code={`local name = "Warrior"`}
  expectedAnswer="ANSWER: Warrior"
>
  Create a character with name, level, and health.
</Exercise>
```

**Pros:**
- Exercises appear in context with teaching material
- Single file to edit when updating a topic
- No import/loading complexity
- SEO: All content indexed together

**Cons:**
- Large MDX files mixing teaching + exercises
- Hard to get exercise-only view
- Can't reorder exercises without editing guide files
- No centralized exercise management

---

## Option B: Fully Separate Exercise Files

Exercises live in `/exercises/` as standalone MDX or JSON files. Guide uses `<ExerciseLoader id="..." />`.

```
/exercises/
  fundamentals/
    variables-1.json
    variables-2.json
    functions-1.json
```

**Pros:**
- Clean separation of concerns
- Easy to update exercises without touching guides
- Can build exercise-only pages/review modes
- Centralized exercise management
- Could support exercise versioning

**Cons:**
- Exercises lose context with teaching material
- Two places to look when editing a topic
- Complex loading mechanism needed
- Potential for broken references
- Additional build complexity

---

## Option C: Hybrid Approach (Recommended)

Keep exercises **inline** in guide MDX, but use a **structured JSON registry** for:
- Progress tracking
- Exercise metadata (expected answers, hints)
- Building exercise summary/review pages

### Structure

```
/src/exercises/
  registry.json         # All exercise metadata

/docs/fundamentals/
  variables.mdx         # Contains <Exercise> components inline
```

### registry.json

```json
{
  "exercises": [
    {
      "id": "fundamentals-variables-1",
      "title": "Character Stats",
      "difficulty": 1,
      "chapter": "fundamentals",
      "topic": "variables",
      "expectedAnswer": "ANSWER: Warrior, Lv.5, 1250.5xp, ult=true",
      "docPath": "/fundamentals/variables#exercise-1-character-stats",
      "hints": [
        "Check your variable names match exactly",
        "Strings need quotes, numbers don't"
      ]
    }
  ]
}
```

### Benefits

1. **Exercises stay in context** - Teaching material and exercises together
2. **Centralized metadata** - Single source of truth for validation
3. **Progress tracking** - Can show completion status across all exercises
4. **Review pages** - Can generate exercise-only views from registry
5. **Validation separate from content** - Update expected answers without editing MDX

### Components

1. **`<Exercise>`** - Display component (existing, enhanced)
   - Renders exercise UI inline in guide
   - Takes `exerciseId` to look up metadata from registry

2. **`<ExerciseValidator>`** - Validation component (created)
   - Validates ANSWER line against expected
   - Tracks completion in localStorage

3. **`<ExerciseProgress>`** - Progress display (new)
   - Shows completion status for a chapter/section
   - Links to incomplete exercises

4. **`/exercises` page** - Review page (new)
   - Lists all exercises grouped by chapter
   - Shows completion status
   - Links to exercise location in guide

---

## Recommended Implementation

### Phase 1: Registry + Validator (Now)
1. Create `/src/exercises/registry.json` with exercise metadata
2. `ExerciseValidator` reads expected answers from registry
3. Keep exercises inline in MDX files

### Phase 2: Enhanced Exercise Component (Next)
```tsx
<Exercise id="fundamentals-variables-1">
  {/* Description and setup inline */}
  Create a character with name, level, health, and special ability.
</Exercise>
```

The component:
- Looks up metadata from registry by `id`
- Auto-fills: title, difficulty, expectedAnswer, hints
- Renders inline content as description
- Includes `ExerciseValidator` automatically

### Phase 3: Progress Tracking (Later)
1. Create `ExerciseProgress` component
2. Add `/exercises` review page
3. Show completion badges in sidebar

---

## File Structure After Implementation

```
/src/
  exercises/
    registry.json           # All exercise metadata
    index.ts                # Export registry, helper functions
  components/
    Exercise.tsx            # Display component (enhanced)
    ExerciseValidator.tsx   # Validation component (created)
    ExerciseProgress.tsx    # Progress display (phase 3)

/docs/
  fundamentals/
    variables.mdx           # <Exercise id="..."> inline
    functions.mdx

/src/pages/
  exercises.tsx             # Review page (phase 3)
```

---

## Decision

**Recommendation: Option C (Hybrid)**

- Keeps exercises in context with teaching material
- Provides centralized management via registry
- Enables future progress tracking features
- Minimal refactoring of existing content
- Clear separation between display (MDX) and validation (registry)

---

## Next Steps

1. ~~Create ExerciseValidator component~~ (Done)
2. Create `/src/exercises/registry.json` with first few exercises
3. Update `Exercise.tsx` to accept `id` prop and integrate registry
4. Update template to use new component structure
5. Migrate existing exercises to use `id` prop
