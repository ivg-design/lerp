import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './Exercise.module.css';
import ExerciseValidator from './ExerciseValidator';
import { getExercise, type ExerciseMetadata } from '../exercises';

interface RelatedLink {
  label: string;
  href: string;
}

interface ExerciseProps {
  // New: Registry-based props
  id?: string;                    // Exercise ID to look up from registry

  // Legacy: Inline props (used if id not provided)
  title?: string;
  children: React.ReactNode;
  code?: string;
  language?: string;
  task?: string;
  hint?: string;
  solution?: string;
  difficulty?: 1 | 2 | 3;
  expectedOutput?: string;
  expectedAnswer?: string;        // For validation
  explanation?: string;           // Why the answer is correct
  reviewLinks?: RelatedLink[];    // Links to guide sections
  prerequisites?: RelatedLink[];
  relatedConcepts?: RelatedLink[];

  // Display options
  showValidator?: boolean;        // Show validator component (default: true if id or expectedAnswer provided)
}

const difficultyLabels = {
  1: { label: 'Beginner', stars: '*', color: 'var(--ifm-color-success)' },
  2: { label: 'Intermediate', stars: '**', color: 'var(--ifm-color-warning)' },
  3: { label: 'Advanced', stars: '***', color: 'var(--ifm-color-danger)' },
};

export default function Exercise({
  id,
  title: propTitle,
  children,
  code,
  language = 'lua',
  task,
  hint: propHint,
  solution,
  difficulty: propDifficulty = 1,
  expectedOutput,
  expectedAnswer: propExpectedAnswer,
  explanation: propExplanation,
  reviewLinks: propReviewLinks,
  prerequisites,
  relatedConcepts,
  showValidator,
}: ExerciseProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showExpectedOutput, setShowExpectedOutput] = useState(false);

  // If id provided, look up from registry
  let registryData: ExerciseMetadata | undefined;
  if (id) {
    registryData = getExercise(id);
    if (!registryData) {
      console.warn(`Exercise not found in registry: ${id}`);
    }
  }

  // Merge registry data with props (props take precedence)
  const title = propTitle || registryData?.title || 'Exercise';
  const difficulty = propDifficulty || registryData?.difficulty || 1;
  const expectedAnswer = propExpectedAnswer || registryData?.expectedAnswer;
  const hints = registryData?.hints || (propHint ? [propHint] : []);
  const hint = propHint || hints[0];
  const explanation = propExplanation || registryData?.explanation;
  const reviewLinks = propReviewLinks || registryData?.reviewLinks || [];

  // Determine if validator should be shown
  const shouldShowValidator = showValidator !== undefined
    ? showValidator
    : Boolean(id || expectedAnswer);

  const diffInfo = difficultyLabels[difficulty];

  return (
    <div className={styles.exercise}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.difficulty} style={{ color: diffInfo.color }}>
          {diffInfo.stars}
        </span>
      </div>

      {(prerequisites && prerequisites.length > 0) && (
        <div className={styles.prerequisites}>
          <span className={styles.prereqLabel}>Prerequisites:</span>
          {prerequisites.map((link, i) => (
            <a key={i} href={link.href} className={styles.prereqLink}>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className={styles.description}>
        {children}
      </div>

      {code && (
        <div className={styles.codeBlock}>
          <CodeBlock language={language} title="Starter Code - Copy to Rive Editor">
            {code}
          </CodeBlock>
        </div>
      )}

      {task && (
        <div className={styles.task}>
          <strong>Your Task:</strong> {task}
        </div>
      )}

      <div className={styles.actions}>
        {hint && (
          <button
            className={styles.hintBtn}
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        {expectedOutput && (
          <button
            className={styles.outputBtn}
            onClick={() => setShowExpectedOutput(!showExpectedOutput)}
          >
            {showExpectedOutput ? 'Hide Output' : 'Expected Output'}
          </button>
        )}
        {solution && (
          <button
            className={styles.solutionBtn}
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        )}
      </div>

      {showHint && hint && (
        <div className={styles.hintBox}>
          <strong>Hint:</strong> {hint}
        </div>
      )}

      {showExpectedOutput && expectedOutput && (
        <div className={styles.outputBox}>
          <strong>Expected Console Output:</strong>
          <pre className={styles.outputPre}>{expectedOutput}</pre>
        </div>
      )}

      {showSolution && solution && (
        <div className={styles.solutionBox}>
          <strong>Solution:</strong>
          <CodeBlock language={language}>
            {solution}
          </CodeBlock>
        </div>
      )}

      {/* Validator section */}
      {shouldShowValidator && expectedAnswer && (
        <ExerciseValidator
          exerciseId={id || `inline-${title.toLowerCase().replace(/\s+/g, '-')}`}
          expectedAnswer={expectedAnswer}
          hints={hints}
          explanation={explanation}
          reviewLinks={reviewLinks}
        />
      )}

      {(relatedConcepts && relatedConcepts.length > 0) && (
        <div className={styles.related}>
          <span className={styles.relatedLabel}>Related:</span>
          {relatedConcepts.map((link, i) => (
            <a key={i} href={link.href} className={styles.relatedLink}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
