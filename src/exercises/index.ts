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

// ============================================
// QUIZ TRACKING
// ============================================

export interface QuizMetadata {
  id: string;
  chapter: string;
  docPath: string;
}

// Quiz IDs grouped by chapter (extracted from MDX files)
const quizzesByChapter: Record<string, string[]> = {
  'intro': [
    'intro-q1', 'intro-q2', 'intro-q3',
  ],
  'getting-started': [
    'welcome-q1', 'welcome-q2',
    'why-luau-q1', 'why-luau-q2', 'why-luau-q3',
    'how-q1', 'how-q2', 'how-q3', 'how-q4',
    'beginner-q1', 'beginner-q2', 'beginner-q3', 'beginner-q4', 'beginner-q5', 'beginner-q6',
    'beginner-q8', 'beginner-q9', 'beginner-q10', 'beginner-q11', 'beginner-q12', 'beginner-q13',
  ],
  'fundamentals': [
    'vars-q1', 'vars-q2', 'vars-q3', 'vars-q4', 'vars-q5',
    'dt-q1', 'dt-q2', 'dt-q3', 'dt-q4', 'dt-q5', 'dt-q6',
    'fn-q1', 'fn-q2', 'fn-q3', 'fn-q4', 'fn-q5',
    'tbl-q1', 'tbl-q2', 'tbl-q3', 'tbl-q4', 'tbl-q5',
    'cf-q1', 'cf-q2', 'cf-q3', 'cf-q4', 'cf-q5',
    'iter-q1', 'iter-q2', 'iter-q3', 'iter-q4', 'iter-q5', 'iter-q6', 'iter-q7',
  ],
  'types': [
    'types-q2', 'types-q3', 'types-q4',
    'strict-q2', 'strict-q3', 'strict-q4',
    'anno-q1', 'anno-q2', 'anno-q3', 'anno-q4',
    'custom-q1', 'custom-q2', 'custom-q3', 'custom-q4',
    'gen-q1', 'gen-q2', 'gen-q3', 'gen-q4',
    'adv-q1', 'adv-q2', 'adv-q3', 'adv-q4',
    'late-q1', 'late-q2', 'late-q3', 'late-q4',
  ],
  'oop': [
    'meta-q1', 'meta-q2', 'meta-q3', 'meta-q4',
    'idx-q1', 'idx-q2', 'idx-q3', 'idx-q4',
    'class-q1', 'class-q2', 'class-q3', 'class-q4',
    'proto-q1', 'proto-q2', 'proto-q3',
    'self-q1', 'self-q2', 'self-q3', 'self-q4',
    'inherit-q1', 'inherit-q2', 'inherit-q3',
    'encap-q1', 'encap-q2', 'encap-q3',
    'patterns-q1', 'patterns-q2', 'patterns-q3', 'patterns-q4',
  ],
  'rive': [
    'env-q1', 'env-q2', 'env-q3', 'env-q4',
    'inputs-q1', 'inputs-q2', 'inputs-q3', 'inputs-q4',
    'lifecycle-q1', 'lifecycle-q2', 'lifecycle-q3', 'lifecycle-q4',
    'node-protocol-q1', 'node-protocol-q2', 'node-protocol-q3', 'node-protocol-q4',
    'converter-q1', 'converter-q2', 'converter-q3', 'converter-q4',
    'layout-q1', 'layout-q2', 'layout-q3', 'layout-q4',
    'listener-action-q1', 'listener-action-q2',
    'pathfx-q1', 'pathfx-q2', 'pathfx-q3', 'pathfx-q4',
    'test-q1', 'test-q2', 'test-q3', 'test-q4',
    'transition-condition-q1', 'transition-condition-q2',
    'other-q1', 'other-q2', 'other-q3', 'other-q4', 'other-q5',
    'util-q1', 'util-q2', 'util-q3', 'util-q4',
  ],
  'advanced': [
    'core-types-q1', 'core-types-q2', 'core-types-q3', 'core-types-q4',
    'drawing-api-q1', 'drawing-api-q2', 'drawing-api-q3', 'drawing-api-q4', 'drawing-api-q5',
    'instantiation-method',
    'game-logic-hit',
    'procedural-q1', 'procedural-q2', 'procedural-q3', 'procedural-q4', 'procedural-q5',
    'gpu-shaders-q1', 'gpu-shaders-q2', 'gpu-shaders-q3', 'gpu-shaders-q4', 'gpu-shaders-q5',
    'viewmodels-q1', 'viewmodels-q2', 'viewmodels-q3', 'viewmodels-q4', 'viewmodels-q5',
  ],
  'projects': [
    'gpu-labs-q1', 'gpu-labs-q2', 'gpu-labs-q3', 'gpu-labs-q4',
  ],
  'best-practices': [
    'architecture-q1', 'architecture-q2', 'architecture-q3', 'architecture-q4',
    'debugging-q1', 'debugging-q2', 'debugging-q3', 'debugging-q4',
    'performance-init',
    'resources-q1', 'resources-q2',
  ],
};

/**
 * Get all quiz IDs
 */
export function getAllQuizIds(): string[] {
  return Object.values(quizzesByChapter).flat();
}

/**
 * Get quizzes by chapter
 */
export function getQuizzesByChapter(chapter: string): string[] {
  return quizzesByChapter[chapter] || [];
}

/**
 * Get quiz completion status from localStorage
 */
export function getQuizCompletionStatus(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};

  const status: Record<string, boolean> = {};
  const allQuizzes = getAllQuizIds();

  for (const quizId of allQuizzes) {
    const key = `lerp-quiz-${quizId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        status[quizId] = data.isCorrect || false;
      } catch {
        status[quizId] = false;
      }
    } else {
      status[quizId] = false;
    }
  }
  return status;
}

/**
 * Get quiz progress for a chapter
 */
export function getChapterQuizProgress(chapter: string): { completed: number; total: number; percentage: number } {
  const quizzes = getQuizzesByChapter(chapter);
  const status = getQuizCompletionStatus();

  const completed = quizzes.filter(id => status[id]).length;
  const total = quizzes.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}

/**
 * Get overall quiz progress
 */
export function getOverallQuizProgress(): { completed: number; total: number; percentage: number } {
  const status = getQuizCompletionStatus();
  const allQuizzes = getAllQuizIds();

  const completed = allQuizzes.filter(id => status[id]).length;
  const total = allQuizzes.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}
