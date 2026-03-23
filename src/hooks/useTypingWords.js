/**
 * Shared hook for word-by-word typing reveal.
 * Used by astronaut-id-card and prequel-section.
 */
import { useState, useEffect, useMemo } from "react";

export const TYPING_WORD_INTERVAL = 80;
export const TYPING_INITIAL_DELAY = 400;

export function parseParagraphs(paragraphs) {
  const words = [];
  const paraEnds = [];
  for (const p of paragraphs) {
    const w = p.split(/\s+/).filter(Boolean);
    words.push(...w);
    paraEnds.push(words.length);
  }
  return { words, paraEnds };
}

/**
 * @param {string[]} paragraphs - Array of paragraph strings
 * @param {{ enabled?: boolean; wordInterval?: number; initialDelay?: number; skipCompleted?: boolean }} options
 * @returns {{ words: string[]; paraEnds: number[]; visibleWordCount: number }}
 */
export function useTypingWords(paragraphs, options = {}) {
  const {
    enabled = true,
    wordInterval = TYPING_WORD_INTERVAL,
    initialDelay = TYPING_INITIAL_DELAY,
    skipCompleted = false,
  } = options;

  const paragraphsKey = paragraphs.join("\0");
  const { words, paraEnds } = useMemo(
    () => parseParagraphs(paragraphs),
    [paragraphsKey, paragraphs],
  );
  const totalWords = words.length;

  const [visibleWordCount, setVisibleWordCount] = useState(() =>
    skipCompleted ? totalWords : 0,
  );

  useEffect(() => {
    if (!enabled || totalWords === 0 || skipCompleted) return;
    const timers = [];
    for (let i = 0; i < totalWords; i++) {
      timers.push(
        setTimeout(
          () => setVisibleWordCount((n) => n + 1),
          initialDelay + i * wordInterval,
        ),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [enabled, totalWords, wordInterval, initialDelay, skipCompleted]);

  return { words, paraEnds, visibleWordCount };
}
