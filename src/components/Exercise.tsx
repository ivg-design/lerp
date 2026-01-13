import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './Exercise.module.css';

interface ExerciseProps {
  title: string;
  children: React.ReactNode;
  code?: string;
  language?: string;
  task?: string;
  hint?: string;
  solution?: string;
}

export default function Exercise({
  title,
  children,
  code,
  language = 'lua',
  task,
  hint,
  solution
}: ExerciseProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className={styles.exercise}>
      <div className={styles.header}>
        <span className={styles.icon}>💻</span>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.description}>
        {children}
      </div>

      {code && (
        <div className={styles.codeBlock}>
          <CodeBlock language={language} title="Copy to Rive Editor">
            {code}
          </CodeBlock>
        </div>
      )}

      {task && (
        <div className={styles.task}>
          <strong>📝 Task:</strong> {task}
        </div>
      )}

      <div className={styles.actions}>
        {hint && (
          <button
            className={styles.hintBtn}
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? '🙈 Hide Hint' : '💡 Show Hint'}
          </button>
        )}
        {solution && (
          <button
            className={styles.solutionBtn}
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? '🙈 Hide Solution' : '✨ Show Solution'}
          </button>
        )}
      </div>

      {showHint && hint && (
        <div className={styles.hintBox}>
          <strong>💡 Hint:</strong> {hint}
        </div>
      )}

      {showSolution && solution && (
        <div className={styles.solutionBox}>
          <strong>✨ Solution:</strong>
          <CodeBlock language={language}>
            {solution}
          </CodeBlock>
        </div>
      )}
    </div>
  );
}
