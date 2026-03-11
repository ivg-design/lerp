"use client";

import { useEffect, useState } from "react";

/**
 * Checks if the user has existing course progress in localStorage.
 * The Docusaurus course stores quiz/exercise data with keys:
 *   lerp-quiz-{id}
 *   lerp-exercise-{id}
 *
 * If any exist, the user has started the course.
 */
function hasProgress(): boolean {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith("lerp-quiz-") || key.startsWith("lerp-exercise-"))) {
        return true;
      }
    }
  } catch {
    // localStorage unavailable (SSR, privacy mode, etc.)
  }
  return false;
}

export function useHasCourseProgress() {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setHasStarted(hasProgress());
  }, []);

  return hasStarted;
}

export default function CourseCtaText({
  startText = "start learning",
  continueText = "continue your course",
}: {
  startText?: string;
  continueText?: string;
}) {
  const hasStarted = useHasCourseProgress();
  return <>{hasStarted ? continueText : startText}</>;
}
