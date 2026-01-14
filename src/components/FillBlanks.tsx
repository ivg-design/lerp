import React, { useState, useEffect } from 'react';
import styles from './FillBlanks.module.css';

interface FillBlanksProps {
  id?: string;
  code: string; // Use __BLANK__ or ___n___ for blanks (n = blank index)
  blanks: string[]; // Correct answers for each blank
  hints?: string[]; // Optional hints for each blank
  explanation?: string;
}

export default function FillBlanks({
  id,
  code,
  blanks,
  hints,
  explanation,
}: FillBlanksProps) {
  const [answers, setAnswers] = useState<string[]>(blanks.map(() => ''));
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [showHints, setShowHints] = useState(false);

  const storageKey = id ? `lerp-fillblanks-${id}` : null;

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setAnswers(data.answers || blanks.map(() => ''));
        setSubmitted(data.submitted || false);
        setResults(data.results || []);
      }
    }
  }, [storageKey]);

  const saveState = (answers: string[], submitted: boolean, results: boolean[]) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ answers, submitted, results }));
    }
  };

  // Parse code and split into parts with blanks
  const parseCode = () => {
    const parts: { type: 'text' | 'blank'; content: string; index?: number }[] = [];
    let remaining = code;
    let blankIndex = 0;

    // Match __BLANK__ or ___0___, ___1___, etc.
    const blankPattern = /(__BLANK__|___\d+___)/g;
    let lastIndex = 0;
    let match;

    while ((match = blankPattern.exec(code)) !== null) {
      // Add text before blank
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: code.slice(lastIndex, match.index) });
      }

      // Determine blank index
      let idx = blankIndex;
      if (match[0].startsWith('___') && match[0].endsWith('___')) {
        idx = parseInt(match[0].slice(3, -3));
      }

      parts.push({ type: 'blank', content: '', index: idx });
      blankIndex++;
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < code.length) {
      parts.push({ type: 'text', content: code.slice(lastIndex) });
    }

    return parts;
  };

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const newResults = blanks.map((correct, i) =>
      answers[i].trim().toLowerCase() === correct.trim().toLowerCase()
    );
    setResults(newResults);
    setSubmitted(true);
    saveState(answers, true, newResults);
  };

  const handleReset = () => {
    setAnswers(blanks.map(() => ''));
    setSubmitted(false);
    setResults([]);
    setShowHints(false);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  const allCorrect = results.length > 0 && results.every(r => r);
  const parts = parseCode();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>✏️</span>
        <span className={styles.title}>Fill in the Blanks</span>
      </div>

      <div className={styles.codeBlock}>
        <pre className={styles.code}>
          {parts.map((part, i) => {
            if (part.type === 'text') {
              return <span key={i}>{part.content}</span>;
            } else {
              const idx = part.index!;
              const isCorrect = submitted && results[idx];
              const isWrong = submitted && !results[idx];
              return (
                <input
                  key={i}
                  type="text"
                  value={answers[idx] || ''}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  disabled={submitted && allCorrect}
                  className={`${styles.blankInput} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.incorrect : ''}`}
                  style={{ width: `${Math.max(blanks[idx].length + 2, 8)}ch` }}
                  placeholder="..."
                />
              );
            }
          })}
        </pre>
      </div>

      <div className={styles.actions}>
        {!submitted || !allCorrect ? (
          <>
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={answers.some(a => !a.trim())}
            >
              Check Answers
            </button>
            {hints && !showHints && (
              <button className={styles.hintBtn} onClick={() => setShowHints(true)}>
                Show Hints
              </button>
            )}
            {submitted && (
              <button className={styles.resetBtn} onClick={handleReset}>
                Try Again
              </button>
            )}
          </>
        ) : (
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      {showHints && hints && !submitted && (
        <div className={styles.hintsBox}>
          <strong>Hints:</strong>
          <ul>
            {hints.map((hint, i) => (
              <li key={i}>Blank {i + 1}: {hint}</li>
            ))}
          </ul>
        </div>
      )}

      {submitted && (
        <div className={`${styles.feedback} ${allCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {allCorrect ? (
            <>
              <span>All correct!</span>
              {explanation && <p className={styles.explanation}>{explanation}</p>}
            </>
          ) : (
            <>
              <span>{results.filter(r => r).length} of {blanks.length} correct. Keep trying!</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
