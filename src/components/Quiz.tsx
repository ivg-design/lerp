import React, { useState, useEffect } from 'react';
import styles from './Quiz.module.css';

interface QuizOption {
  text: string;
  correct?: boolean;
}

interface QuizProps {
  question: string;
  options?: QuizOption[];
  type?: 'multiple' | 'text' | 'code';
  answer?: string;
  explanation?: string;
  hint?: string;
  reviewLink?: string;
  reviewText?: string;
  id?: string;
}

export default function Quiz({
  question,
  options,
  type = 'multiple',
  answer,
  explanation,
  hint,
  reviewLink,
  reviewText = 'Review this section',
  id
}: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const storageKey = id ? `lerp-quiz-${id}` : null;

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setSubmitted(data.submitted);
        setIsCorrect(data.isCorrect);
        setAttempts(data.attempts || 0);
        if (data.selected !== undefined) setSelected(data.selected);
        if (data.textAnswer) setTextAnswer(data.textAnswer);
      }
    }
  }, [storageKey]);

  const saveState = (submitted: boolean, isCorrect: boolean, attempts: number, selected?: number, textAnswer?: string) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ submitted, isCorrect, attempts, selected, textAnswer }));
    }
  };

  const handleSubmit = () => {
    let correct = false;

    if (type === 'multiple' && options) {
      correct = selected !== null && options[selected]?.correct === true;
    } else if ((type === 'text' || type === 'code') && answer) {
      correct = textAnswer.trim().toLowerCase() === answer.trim().toLowerCase();
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setIsCorrect(correct);
    setSubmitted(true);
    saveState(true, correct, newAttempts, selected ?? undefined, textAnswer);
  };

  const handleReset = () => {
    setSelected(null);
    setTextAnswer('');
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    // Don't reset attempts - we want to track total tries
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  return (
    <div className={styles.quiz}>
      <div className={styles.question}>
        <span className={styles.questionIcon}>Q:</span>
        <span>{question}</span>
      </div>

      {type === 'multiple' && options && (
        <div className={styles.options}>
          {options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${selected === index ? styles.selected : ''} ${
                submitted && isCorrect && option.correct ? styles.correct : ''
              } ${
                submitted && !isCorrect && selected === index ? styles.incorrect : ''
              }`}
              onClick={() => !submitted && setSelected(index)}
              disabled={submitted}
            >
              <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      )}

      {(type === 'text' || type === 'code') && (
        <div className={styles.textInput}>
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder={type === 'code' ? 'Type your code answer...' : 'Your answer...'}
            className={`${styles.input} ${type === 'code' ? styles.codeInput : ''} ${
              submitted ? (isCorrect ? styles.correct : styles.incorrect) : ''
            }`}
            disabled={submitted}
            onKeyDown={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
          />
        </div>
      )}

      <div className={styles.actions}>
        {!submitted ? (
          <>
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={type === 'multiple' ? selected === null : !textAnswer.trim()}
            >
              Check Answer
            </button>
            {hint && !showHint && (
              <button className={styles.hintBtn} onClick={handleShowHint}>
                Show Hint
              </button>
            )}
          </>
        ) : (
          <button className={styles.resetBtn} onClick={handleReset}>
            Try Again
          </button>
        )}
      </div>

      {showHint && hint && !submitted && (
        <div className={styles.hintBox}>
          <span className={styles.hintIcon}>Hint:</span>
          <span>{hint}</span>
        </div>
      )}

      {submitted && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          <div className={styles.feedbackHeader}>
            {isCorrect ? (
              <>
                <span className={styles.feedbackTitle}>Correct</span>
              </>
            ) : (
              <>
                <span className={styles.feedbackTitle}>Not quite right</span>
              </>
            )}
          </div>

          {isCorrect && explanation && (
            <p className={styles.explanation}>{explanation}</p>
          )}

          {!isCorrect && (
            <div className={styles.wrongAnswerHelp}>
              {attempts >= 2 && hint && (
                <p className={styles.hintText}>
                  <strong>Hint:</strong> {hint}
                </p>
              )}
              {reviewLink && (
                <a href={reviewLink} className={styles.reviewLink}>
                  {reviewText}
                </a>
              )}
              {!reviewLink && (
                <p className={styles.tryAgainText}>
                  Review the material above and try again.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper component for cleaner MDX usage
export function Choice({ children, correct = false }: { children: React.ReactNode; correct?: boolean }) {
  return { text: children as string, correct };
}
