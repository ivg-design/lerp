import registryData from './registry.json';

export interface ReviewLink {
  label: string;
  href: string;
}

export interface ExerciseMetadata {
  id: string;
  title: string;
  difficulty: 1 | 2 | 3;
  chapter: string;
  topic: string;
  expectedAnswer: string;
  docPath: string;
  hints?: string[];
  explanation?: string;
  reviewLinks?: ReviewLink[];
  tags?: string[];
}

export interface ChapterMetadata {
  title: string;
  order: number;
}

export interface ExerciseRegistry {
  version: string;
  exercises: ExerciseMetadata[];
  chapters: Record<string, ChapterMetadata>;
}

// Type assertion for imported JSON
export const registry = registryData as ExerciseRegistry;

/**
 * Get exercise metadata by ID
 */
export function getExercise(id: string): ExerciseMetadata | undefined {
  return registry.exercises.find(ex => ex.id === id);
}

/**
 * Get all exercises for a chapter
 */
export function getExercisesByChapter(chapter: string): ExerciseMetadata[] {
  return registry.exercises.filter(ex => ex.chapter === chapter);
}

/**
 * Get all exercises for a topic
 */
export function getExercisesByTopic(topic: string): ExerciseMetadata[] {
  return registry.exercises.filter(ex => ex.topic === topic);
}

/**
 * Get exercise count by chapter
 */
export function getExerciseCountByChapter(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const ex of registry.exercises) {
    counts[ex.chapter] = (counts[ex.chapter] || 0) + 1;
  }
  return counts;
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const ex of registry.exercises) {
    if (ex.tags) {
      for (const tag of ex.tags) {
        tags.add(tag);
      }
    }
  }
  return Array.from(tags).sort();
}

/**
 * Search exercises by tag
 */
export function getExercisesByTag(tag: string): ExerciseMetadata[] {
  return registry.exercises.filter(ex => ex.tags?.includes(tag));
}

/**
 * Get completion status from localStorage
 */
export function getCompletionStatus(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};

  const status: Record<string, boolean> = {};
  for (const ex of registry.exercises) {
    const key = `lerp-exercise-${ex.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        status[ex.id] = data.completed || false;
      } catch {
        status[ex.id] = false;
      }
    } else {
      status[ex.id] = false;
    }
  }
  return status;
}

/**
 * Get completion percentage for a chapter
 */
export function getChapterProgress(chapter: string): { completed: number; total: number; percentage: number } {
  const exercises = getExercisesByChapter(chapter);
  const status = getCompletionStatus();

  const completed = exercises.filter(ex => status[ex.id]).length;
  const total = exercises.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}

/**
 * Get overall progress
 */
export function getOverallProgress(): { completed: number; total: number; percentage: number } {
  const status = getCompletionStatus();

  const completed = Object.values(status).filter(Boolean).length;
  const total = registry.exercises.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}
