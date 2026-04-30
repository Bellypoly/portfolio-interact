import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import {
  useTypingWords,
  TYPING_WORD_INTERVAL,
  TYPING_INITIAL_DELAY,
} from "../../hooks/use-typing-words";
import "./prequel-section.css";

/** Stable ref for `useTypingWords` (avoids new array literal every render). */
const PREQUEL_PARAGRAPHS = [
  "From Phuket to Bangkok, and across the Pacific to Texas, her journey spans diverse systems, cultures, and challenges.",
  "Along the way, one constant stands out: the brilliant people behind the work—collaborating to turn complex ideas into real-world solutions.",
  "With more ahead, she moves forward—ready for what comes next.",
];

const TYPING_START_THRESHOLD = 0.15;
const PREQUEL_FADE_THRESHOLD = 0.2;

export default React.memo(function PrequelSection({ sectionProgress }) {
  const [show, setShow] = useState(false);
  const [showPrequelFade, setShowPrequelFade] = useState(false);
  const { words, paraEnds, visibleWordCount } = useTypingWords(
    PREQUEL_PARAGRAPHS,
    {
      enabled: show,
      wordInterval: TYPING_WORD_INTERVAL,
      initialDelay: TYPING_INITIAL_DELAY,
    },
  );

  useMotionValueEvent(sectionProgress, "change", (v) => {
    if (!show && v >= TYPING_START_THRESHOLD) setShow(true);
    if (!showPrequelFade && v >= PREQUEL_FADE_THRESHOLD)
      setShowPrequelFade(true);
  });

  // scrollYProgress same as prequelScroll — exit fade over a moderate band.
  const opacity = useTransform(
    sectionProgress,
    [0, 0.15, 0.52, 0.8, 1],
    [0, 1, 1, 0, 0],
  );

  return (
    <motion.div className="prequel-section" style={{ opacity }}>
      <p className="prequel-section__label">[THE JOURNEY]</p>
      <h2 className="prequel-section__title">
        <span className="prequel-section__title-line">
          <span className="prequel-section__title-bold">THE</span>
          <motion.span
            className="prequel-section__title-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: showPrequelFade ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {" "}
            <span className="prequel-letter-p">p</span>
            <span className="prequel-middle">reque</span>
            <span className="prequel-letter-l">l</span>{" "}
          </motion.span>
        </span>
        <span className="prequel-section__title-line">
          <span className="prequel-section__title-bold">TO TODAY</span>
        </span>
      </h2>
      <div className="prequel-section__body">
        {paraEnds.map((end, i) => {
          const start = i === 0 ? 0 : paraEnds[i - 1];
          const visibleEnd = Math.min(visibleWordCount, end);
          const visibleWords = words.slice(start, visibleEnd);
          const text = visibleWords.join(" ");
          const isCursorPara =
            (visibleWordCount === 0 && i === 0) ||
            (visibleWordCount > start && visibleWordCount <= end);
          const hasContent =
            visibleEnd > start || (visibleWordCount === 0 && i === 0);

          if (!hasContent) return null;
          return (
            <p key={i} className="prequel-section__body-para">
              {text}
              {isCursorPara && (
                <>
                  {"\u2060"}
                  <span className="cursor-blink" aria-hidden="true">
                    _
                  </span>
                </>
              )}
            </p>
          );
        })}
      </div>
    </motion.div>
  );
});
