import React, { useState, useEffect } from 'react';
import styles from './CourseProgress.module.css';
import {
  registry,
  getExercisesByChapter,
  getCompletionStatus,
  getChapterProgress,
  getOverallProgress,
  type ExerciseMetadata,
} from '../exercises';

interface ChapterProgressData {
  chapter: string;
  title: string;
  completed: number;
  total: number;
  percentage: number;
  exercises: ExerciseMetadata[];
}

export default function CourseProgress() {
  const [completionStatus, setCompletionStatus] = useState<Record<string, boolean>>({});
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setCompletionStatus(getCompletionStatus());
  }, [refreshKey]);

  const overallProgress = getOverallProgress();

  // Get chapter data
  const chapters = Object.entries(registry.chapters)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key, meta]): ChapterProgressData => {
      const progress = getChapterProgress(key);
      return {
        chapter: key,
        title: meta.title,
        completed: progress.completed,
        total: progress.total,
        percentage: progress.percentage,
        exercises: getExercisesByChapter(key),
      };
    })
    .filter(ch => ch.total > 0);

  const clearChapterProgress = (chapter: string) => {
    if (typeof window === 'undefined') return;

    const exercises = getExercisesByChapter(chapter);
    exercises.forEach(ex => {
      localStorage.removeItem(`lerp-exercise-${ex.id}`);
    });

    setRefreshKey(k => k + 1);
  };

  const clearAllProgress = () => {
    if (typeof window === 'undefined') return;

    registry.exercises.forEach(ex => {
      localStorage.removeItem(`lerp-exercise-${ex.id}`);
    });

    // Also clear any quiz data
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('lerp-quiz-')) {
        localStorage.removeItem(key);
      }
    });

    setRefreshKey(k => k + 1);
  };

  const [showClearConfirm, setShowClearConfirm] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {/* Overall Progress */}
      <div className={styles.overallSection}>
        <h2 className={styles.sectionTitle}>Course Progress</h2>
        <div className={styles.overallStats}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{overallProgress.completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{overallProgress.total}</span>
            <span className={styles.statLabel}>Total Exercises</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{overallProgress.percentage}%</span>
            <span className={styles.statLabel}>Complete</span>
          </div>
        </div>
        <div className={styles.overallBar}>
          <div
            className={styles.overallBarFill}
            style={{ width: `${overallProgress.percentage}%` }}
          />
        </div>
        <div className={styles.clearAllSection}>
          {showClearConfirm === 'all' ? (
            <div className={styles.confirmBox}>
              <span>Clear all progress? This cannot be undone.</span>
              <button
                className={styles.confirmBtn}
                onClick={() => {
                  clearAllProgress();
                  setShowClearConfirm(null);
                }}
              >
                Yes, Clear All
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowClearConfirm(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className={styles.clearAllBtn}
              onClick={() => setShowClearConfirm('all')}
              disabled={overallProgress.completed === 0}
            >
              Clear All Progress
            </button>
          )}
        </div>
      </div>

      {/* Chapter Progress */}
      <div className={styles.chaptersSection}>
        <h2 className={styles.sectionTitle}>Progress by Chapter</h2>
        {chapters.map(ch => (
          <div key={ch.chapter} className={styles.chapterCard}>
            <div className={styles.chapterHeader}>
              <h3 className={styles.chapterTitle}>{ch.title}</h3>
              <span className={styles.chapterStats}>
                {ch.completed} / {ch.total}
              </span>
            </div>
            <div className={styles.chapterBar}>
              <div
                className={styles.chapterBarFill}
                style={{ width: `${ch.percentage}%` }}
              />
            </div>
            <div className={styles.chapterActions}>
              {showClearConfirm === ch.chapter ? (
                <div className={styles.confirmBox}>
                  <span>Clear {ch.title} progress?</span>
                  <button
                    className={styles.confirmBtn}
                    onClick={() => {
                      clearChapterProgress(ch.chapter);
                      setShowClearConfirm(null);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setShowClearConfirm(null)}
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  className={styles.clearChapterBtn}
                  onClick={() => setShowClearConfirm(ch.chapter)}
                  disabled={ch.completed === 0}
                >
                  Clear Chapter Progress
                </button>
              )}
            </div>

            {/* Exercise list */}
            <div className={styles.exerciseList}>
              {ch.exercises.map(ex => {
                const isCompleted = completionStatus[ex.id];
                return (
                  <a
                    key={ex.id}
                    href={ex.docPath}
                    className={`${styles.exerciseItem} ${isCompleted ? styles.completed : ''}`}
                  >
                    <span className={styles.exerciseStatus}>
                      {isCompleted ? '[x]' : '[ ]'}
                    </span>
                    <span className={styles.exerciseTitle}>{ex.title}</span>
                    <span className={styles.exerciseDifficulty}>
                      {'*'.repeat(ex.difficulty)}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
