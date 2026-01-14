import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './CourseProgress.module.css';
import {
  registry,
  getExercisesByChapter,
  getCompletionStatus,
  getChapterProgress,
  getOverallProgress,
  getQuizzesByChapter,
  getQuizCompletionStatus,
  getChapterQuizProgress,
  getOverallQuizProgress,
  getAllQuizIds,
  type ExerciseMetadata,
} from '../exercises';

interface ChapterProgressData {
  chapter: string;
  title: string;
  exerciseCompleted: number;
  exerciseTotal: number;
  exercisePercentage: number;
  quizCompleted: number;
  quizTotal: number;
  quizPercentage: number;
  exercises: ExerciseMetadata[];
  quizzes: string[];
}

export default function CourseProgress() {
  const [completionStatus, setCompletionStatus] = useState<Record<string, boolean>>({});
  const [quizStatus, setQuizStatus] = useState<Record<string, boolean>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, { exercises: boolean; quizzes: boolean }>>({});

  useEffect(() => {
    setCompletionStatus(getCompletionStatus());
    setQuizStatus(getQuizCompletionStatus());
  }, [refreshKey]);

  const overallExercises = getOverallProgress();
  const overallQuizzes = getOverallQuizProgress();

  // Get chapter data
  const chapters = Object.entries(registry.chapters)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key, meta]): ChapterProgressData => {
      const exerciseProgress = getChapterProgress(key);
      const quizProgress = getChapterQuizProgress(key);
      return {
        chapter: key,
        title: meta.title,
        exerciseCompleted: exerciseProgress.completed,
        exerciseTotal: exerciseProgress.total,
        exercisePercentage: exerciseProgress.percentage,
        quizCompleted: quizProgress.completed,
        quizTotal: quizProgress.total,
        quizPercentage: quizProgress.percentage,
        exercises: getExercisesByChapter(key),
        quizzes: getQuizzesByChapter(key),
      };
    })
    .filter(ch => ch.exerciseTotal > 0 || ch.quizTotal > 0);

  const clearChapterProgress = (chapter: string) => {
    if (typeof window === 'undefined') return;

    const exercises = getExercisesByChapter(chapter);
    exercises.forEach(ex => {
      localStorage.removeItem(`lerp-exercise-${ex.id}`);
    });

    const quizzes = getQuizzesByChapter(chapter);
    quizzes.forEach(quizId => {
      localStorage.removeItem(`lerp-quiz-${quizId}`);
    });

    setRefreshKey(k => k + 1);
  };

  const clearAllProgress = () => {
    if (typeof window === 'undefined') return;

    registry.exercises.forEach(ex => {
      localStorage.removeItem(`lerp-exercise-${ex.id}`);
    });

    getAllQuizIds().forEach(quizId => {
      localStorage.removeItem(`lerp-quiz-${quizId}`);
    });

    setRefreshKey(k => k + 1);
  };

  const [showClearConfirm, setShowClearConfirm] = useState<string | null>(null);

  const toggleSection = (chapter: string, section: 'exercises' | 'quizzes') => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapter]: {
        ...prev[chapter],
        [section]: !prev[chapter]?.[section],
      },
    }));
  };

  const totalCompleted = overallExercises.completed + overallQuizzes.completed;
  const totalItems = overallExercises.total + overallQuizzes.total;
  const totalPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return (
    <div className={styles.container}>
      {/* Overall Progress */}
      <div className={styles.overallSection}>
        <h2 className={styles.sectionTitle}>Course Progress</h2>
        <div className={styles.overallStats}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{totalCompleted}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{totalItems}</span>
            <span className={styles.statLabel}>Total Items</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{totalPercentage}%</span>
            <span className={styles.statLabel}>Complete</span>
          </div>
        </div>
        <div className={styles.overallBar}>
          <div
            className={styles.overallBarFill}
            style={{ width: `${totalPercentage}%` }}
          />
        </div>

        {/* Breakdown */}
        <div className={styles.breakdown}>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Exercises:</span>
            <span className={styles.breakdownValue}>
              {overallExercises.completed} / {overallExercises.total} ({overallExercises.percentage}%)
            </span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Quizzes:</span>
            <span className={styles.breakdownValue}>
              {overallQuizzes.completed} / {overallQuizzes.total} ({overallQuizzes.percentage}%)
            </span>
          </div>
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
              disabled={totalCompleted === 0}
            >
              Clear All Progress
            </button>
          )}
        </div>
      </div>

      {/* Chapter Progress */}
      <div className={styles.chaptersSection}>
        <h2 className={styles.sectionTitle}>Progress by Chapter</h2>
        {chapters.map(ch => {
          const chapterTotal = ch.exerciseTotal + ch.quizTotal;
          const chapterCompleted = ch.exerciseCompleted + ch.quizCompleted;
          const chapterPercentage = chapterTotal > 0 ? Math.round((chapterCompleted / chapterTotal) * 100) : 0;
          const isExercisesExpanded = expandedChapters[ch.chapter]?.exercises;
          const isQuizzesExpanded = expandedChapters[ch.chapter]?.quizzes;

          return (
            <div key={ch.chapter} className={styles.chapterCard}>
              <div className={styles.chapterHeader}>
                <h3 className={styles.chapterTitle}>{ch.title}</h3>
                <span className={styles.chapterStats}>
                  {chapterCompleted} / {chapterTotal}
                </span>
              </div>
              <div className={styles.chapterBar}>
                <div
                  className={styles.chapterBarFill}
                  style={{ width: `${chapterPercentage}%` }}
                />
              </div>

              {/* Chapter breakdown */}
              <div className={styles.chapterBreakdown}>
                {ch.exerciseTotal > 0 && (
                  <span className={styles.chapterBreakdownItem}>
                    Exercises: {ch.exerciseCompleted}/{ch.exerciseTotal}
                  </span>
                )}
                {ch.quizTotal > 0 && (
                  <span className={styles.chapterBreakdownItem}>
                    Quizzes: {ch.quizCompleted}/{ch.quizTotal}
                  </span>
                )}
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
                    disabled={chapterCompleted === 0}
                  >
                    Clear Chapter Progress
                  </button>
                )}
              </div>

              {/* Collapsible Exercise list */}
              {ch.exercises.length > 0 && (
                <details className={styles.collapsibleSection}>
                  <summary className={styles.collapsibleHeader}>
                    <span>Exercises ({ch.exerciseCompleted}/{ch.exerciseTotal})</span>
                  </summary>
                  <div className={styles.exerciseList}>
                    {ch.exercises.map(ex => {
                      const isCompleted = completionStatus[ex.id];
                      return (
                        <Link
                          key={ex.id}
                          to={ex.docPath}
                          className={`${styles.exerciseItem} ${isCompleted ? styles.completed : ''}`}
                        >
                          <span className={styles.exerciseStatus}>
                            {isCompleted ? '[x]' : '[ ]'}
                          </span>
                          <span className={styles.exerciseTitle}>{ex.title}</span>
                          <span className={styles.exerciseDifficulty}>
                            {'*'.repeat(ex.difficulty)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </details>
              )}

              {/* Collapsible Quiz list */}
              {ch.quizzes.length > 0 && (
                <details className={styles.collapsibleSection}>
                  <summary className={styles.collapsibleHeader}>
                    <span>Quizzes ({ch.quizCompleted}/{ch.quizTotal})</span>
                  </summary>
                  <div className={styles.quizList}>
                    {ch.quizzes.map(quizId => {
                      const isCompleted = quizStatus[quizId];
                      return (
                        <div
                          key={quizId}
                          className={`${styles.quizItem} ${isCompleted ? styles.completed : ''}`}
                        >
                          <span className={styles.quizStatus}>
                            {isCompleted ? '[x]' : '[ ]'}
                          </span>
                          <span className={styles.quizTitle}>{quizId}</span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
