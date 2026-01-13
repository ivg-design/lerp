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
  id?: string;
}

export default function Quiz({
  question,
  options,
  type = 'multiple',
  answer,
  explanation,
  id
}: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const storageKey = id ? `lerp-quiz-${id}` : null;

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setSubmitted(data.submitted);
        setIsCorrect(data.isCorrect);
        if (data.selected !== undefined) setSelected(data.selected);
        if (data.textAnswer) setTextAnswer(data.textAnswer);
      }
    }
  }, [storageKey]);

  const saveState = (submitted: boolean, isCorrect: boolean, selected?: number, textAnswer?: string) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ submitted, isCorrect, selected, textAnswer }));
    }
  };

  const handleSubmit = () => {
    let correct = false;

    if (type === 'multiple' && options) {
      correct = selected !== null && options[selected]?.correct === true;
    } else if ((type === 'text' || type === 'code') && answer) {
      correct = textAnswer.trim().toLowerCase() === answer.trim().toLowerCase();
    }

    setIsCorrect(correct);
    setSubmitted(true);
    saveState(true, correct, selected ?? undefined, textAnswer);
  };

  const handleReset = () => {
    setSelected(null);
    setTextAnswer('');
    setSubmitted(false);
    setIsCorrect(false);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className={styles.quiz}>
      <div className={styles.question}>
        <span className={styles.questionIcon}>❓</span>
        {question}
      </div>

      {type === 'multiple' && options && (
        <div className={styles.options}>
          {options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${selected === index ? styles.selected : ''} ${
                submitted ? (option.correct ? styles.correct : selected === index ? styles.incorrect : '') : ''
              }`}
              onClick={() => !submitted && setSelected(index)}
              disabled={submitted}
            >
              <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
              {option.text}
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
            placeholder={type === 'code' ? 'Type your answer...' : 'Your answer...'}
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
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={type === 'multiple' ? selected === null : !textAnswer.trim()}
          >
            Check Answer
          </button>
        ) : (
          <button className={styles.resetBtn} onClick={handleReset}>
            Try Again
          </button>
        )}
      </div>

      {submitted && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {isCorrect ? (
            <>
              <span className={styles.feedbackIcon}>✅</span>
              <span>Correct!</span>
            </>
          ) : (
            <>
              <span className={styles.feedbackIcon}>❌</span>
              <span>Not quite. {answer && type !== 'multiple' ? `The answer is: ${answer}` : 'Try again!'}</span>
            </>
          )}
          {explanation && <p className={styles.explanation}>{explanation}</p>}
        </div>
      )}
    </div>
  );
}

// Helper component for cleaner MDX usage
export function Choice({ children, correct = false }: { children: React.ReactNode; correct?: boolean }) {
  return { text: children as string, correct };
}
