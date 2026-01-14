import React, { useState, useEffect, useCallback } from 'react';
import styles from './ExerciseValidator.module.css';

interface ExerciseValidatorProps {
  exerciseId: string;           // "fundamentals-variables-1"
  expectedAnswer: string;       // "ANSWER: Warrior, Lv.5, 1250.5xp, ult=true"
  hints?: string[];             // Optional hints shown progressively on failures
  explanation?: string;         // Why this is the correct answer
  reviewLinks?: { label: string; href: string }[];  // Links to guide sections for review
  caseSensitive?: boolean;      // Default: true
  trimWhitespace?: boolean;     // Default: true
}

export default function ExerciseValidator({
  exerciseId,
  expectedAnswer,
  hints = [],
  explanation,
  reviewLinks = [],
  caseSensitive = true,
  trimWhitespace = true,
}: ExerciseValidatorProps) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const storageKey = `lerp-exercise-${exerciseId}`;

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setAttempts(data.attempts || 0);
        setCompleted(data.completed || false);
        setAnswerRevealed(data.answerRevealed || false);
        if (data.completed) {
          setSubmitted(true);
          setIsCorrect(true);
          setUserAnswer(data.userAnswer || expectedAnswer);
        }
      } catch (e) {
        // Invalid saved data, ignore
      }
    }
  }, [storageKey, expectedAnswer]);

  // Save state
  const saveState = useCallback((newAttempts: number, newCompleted: boolean, newRevealed: boolean, answer?: string) => {
    localStorage.setItem(storageKey, JSON.stringify({
      attempts: newAttempts,
      completed: newCompleted,
      answerRevealed: newRevealed,
      userAnswer: answer,
      timestamp: Date.now(),
    }));
  }, [storageKey]);

  // Extract ANSWER line from input
  const extractAnswer = (text: string): string | null => {
    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('ANSWER:')) {
        return trimmed;
      }
    }
    return null;
  };

  // Normalize answer for comparison
  const normalize = (answer: string): string => {
    let normalized = answer;
    if (trimWhitespace) {
      normalized = normalized.trim();
    }
    if (!caseSensitive) {
      normalized = normalized.toLowerCase();
    }
    return normalized;
  };

  const handleSubmit = () => {
    const extracted = extractAnswer(input);

    if (!extracted) {
      setUserAnswer('(No ANSWER: line found)');
      setIsCorrect(false);
      setSubmitted(true);
      return;
    }

    const normalizedUser = normalize(extracted);
    const normalizedExpected = normalize(expectedAnswer);
    const correct = normalizedUser === normalizedExpected;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setUserAnswer(extracted);
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      setCompleted(true);
      saveState(newAttempts, true, answerRevealed, extracted);
    } else {
      saveState(newAttempts, false, answerRevealed);
    }
  };

  const handleReset = () => {
    setInput('');
    setSubmitted(false);
    setIsCorrect(false);
    setUserAnswer('');
  };

  const handleClear = () => {
    setInput('');
    setSubmitted(false);
    setIsCorrect(false);
    setUserAnswer('');
    setAttempts(0);
    setCompleted(false);
    setAnswerRevealed(false);
    localStorage.removeItem(storageKey);
  };

  const handleRevealAnswer = () => {
    setAnswerRevealed(true);
    saveState(attempts, completed, true);
  };

  // Get hint based on attempt count
  const getCurrentHint = (): string | null => {
    if (hints.length === 0) return null;
    const hintIndex = Math.min(attempts - 1, hints.length - 1);
    return hintIndex >= 0 ? hints[hintIndex] : null;
  };

  if (completed && !submitted) {
    // Show completed state on page load
    return (
      <div className={styles.validator}>
        <div className={styles.completedBanner}>
          <span className={styles.completedText}>Exercise completed</span>
          <button className={styles.clearBtn} onClick={handleClear} title="Reset progress">
            Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.validator}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Verify Your Answer</span>
        {attempts > 0 && !completed && (
          <span className={styles.attemptCount}>Attempts: {attempts}</span>
        )}
      </div>

      {!submitted ? (
        <>
          <div className={styles.inputSection}>
            <label className={styles.inputLabel}>
              Paste your console output (must include the <code>ANSWER:</code> line):
            </label>
            <textarea
              className={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ANSWER: your output here..."
              rows={3}
            />
          </div>

          <div className={styles.actions}>
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={!input.trim()}
            >
              Check Answer
            </button>
          </div>
        </>
      ) : (
        <>
          {isCorrect ? (
            <div className={styles.successBox}>
              <div className={styles.successHeader}>
                <span className={styles.successTitle}>Correct</span>
              </div>
              <p className={styles.successMessage}>
                Exercise completed successfully.
              </p>
              <code className={styles.answerCode}>{userAnswer}</code>

              {explanation && (
                <div className={styles.explanationBox}>
                  <strong>Why this works:</strong>
                  <p>{explanation}</p>
                </div>
              )}

              {reviewLinks.length > 0 && (
                <div className={styles.reviewLinks}>
                  <span>Review:</span>
                  {reviewLinks.map((link, i) => (
                    <a key={i} href={link.href} className={styles.reviewLink}>
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.errorBox}>
              <div className={styles.errorHeader}>
                <span className={styles.errorTitle}>Not quite right</span>
              </div>

              {userAnswer === '(No ANSWER: line found)' ? (
                <p className={styles.errorMessage}>
                  Could not find an <code>ANSWER:</code> line in your input.
                  Make sure to copy the full console output including the line that starts with <code>ANSWER:</code>
                </p>
              ) : (
                <>
                  <p className={styles.errorMessage}>
                    Your answer doesn't match the expected output. Check your code and try again.
                  </p>

                  <div className={styles.yourAnswer}>
                    <span className={styles.yourAnswerLabel}>Your answer:</span>
                    <code className={styles.answerCode}>{userAnswer}</code>
                  </div>

                  {getCurrentHint() && (
                    <div className={styles.hintBox}>
                      <strong>Hint:</strong> {getCurrentHint()}
                    </div>
                  )}

                  {reviewLinks.length > 0 && (
                    <div className={styles.reviewLinks}>
                      <span>Need help? Review:</span>
                      {reviewLinks.map((link, i) => (
                        <a key={i} href={link.href} className={styles.reviewLink}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className={styles.actions}>
                <button className={styles.tryAgainBtn} onClick={handleReset}>
                  Try Again
                </button>
                {!answerRevealed && userAnswer !== '(No ANSWER: line found)' && (
                  <button className={styles.revealBtn} onClick={handleRevealAnswer}>
                    Reveal Answer
                  </button>
                )}
              </div>

              {answerRevealed && (
                <div className={styles.revealedAnswer}>
                  <strong>Expected answer:</strong>
                  <code className={styles.answerCode}>{expectedAnswer}</code>
                  {explanation && (
                    <div className={styles.explanationBox}>
                      <strong>Why:</strong>
                      <p>{explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {completed && submitted && (
        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleClear}>
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
}
