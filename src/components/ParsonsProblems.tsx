import React, { useState, useEffect } from 'react';
import styles from './ParsonsProblems.module.css';

interface ParsonsProblemProps {
  id?: string;
  title?: string;
  description?: string;
  blocks: string[]; // Code blocks in CORRECT order
  explanation?: string;
  hint?: string;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ParsonsProblem({
  id,
  title = "Arrange the Code",
  description,
  blocks,
  explanation,
  hint,
}: ParsonsProblemProps) {
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  const storageKey = id ? `lerp-parsons-${id}` : null;

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.items) {
          setItems(data.items);
          setSubmitted(data.submitted || false);
          setIsCorrect(data.isCorrect || false);
          return;
        }
      }
    }
    // Initialize with shuffled blocks
    const shuffled = shuffleArray(blocks.map((text, id) => ({ id, text })));
    setItems(shuffled);
  }, [storageKey, blocks]);

  const saveState = (items: { id: number; text: string }[], submitted: boolean, isCorrect: boolean) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ items, submitted, isCorrect }));
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverItem(index);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newItems = [...items];
    const [draggedElement] = newItems.splice(draggedItem, 1);
    newItems.splice(dropIndex, 0, draggedElement);

    setItems(newItems);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Move item up/down (for mobile/keyboard)
  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (submitted && isCorrect) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
  };

  const handleSubmit = () => {
    const correct = items.every((item, index) => item.id === index);
    setIsCorrect(correct);
    setSubmitted(true);
    saveState(items, true, correct);
  };

  const handleReset = () => {
    const shuffled = shuffleArray(blocks.map((text, id) => ({ id, text })));
    setItems(shuffled);
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>🧩</span>
        <span className={styles.title}>{title}</span>
      </div>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.instructions}>
        Drag and drop to arrange the code blocks in the correct order:
      </div>

      <div className={styles.blocksContainer}>
        {items.map((item, index) => {
          const isCorrectPosition = submitted && item.id === index;
          const isWrongPosition = submitted && item.id !== index;

          return (
            <div
              key={`${item.id}-${item.text}`}
              className={`${styles.block} ${draggedItem === index ? styles.dragging : ''} ${dragOverItem === index ? styles.dragOver : ''} ${isCorrectPosition ? styles.correct : ''} ${isWrongPosition ? styles.incorrect : ''}`}
              draggable={!submitted || !isCorrect}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <span className={styles.dragHandle}>⋮⋮</span>
              <code className={styles.blockCode}>{item.text}</code>
              <div className={styles.moveButtons}>
                <button
                  className={styles.moveBtn}
                  onClick={() => moveItem(index, 'up')}
                  disabled={(submitted && isCorrect) || index === 0}
                  aria-label="Move up"
                >
                  ▲
                </button>
                <button
                  className={styles.moveBtn}
                  onClick={() => moveItem(index, 'down')}
                  disabled={(submitted && isCorrect) || index === items.length - 1}
                  aria-label="Move down"
                >
                  ▼
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        {!submitted || !isCorrect ? (
          <>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Check Order
            </button>
            {hint && !showHint && (
              <button className={styles.hintBtn} onClick={() => setShowHint(true)}>
                Show Hint
              </button>
            )}
            {submitted && (
              <button className={styles.resetBtn} onClick={handleReset}>
                Shuffle & Retry
              </button>
            )}
          </>
        ) : (
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      {showHint && hint && !submitted && (
        <div className={styles.hintBox}>
          <strong>Hint:</strong> {hint}
        </div>
      )}

      {submitted && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {isCorrect ? (
            <>
              <div>
                <strong>Correct</strong>
                {explanation && <p className={styles.explanation}>{explanation}</p>}
              </div>
            </>
          ) : (
            <>
              <span>Not quite right. The highlighted blocks are in the wrong position.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
