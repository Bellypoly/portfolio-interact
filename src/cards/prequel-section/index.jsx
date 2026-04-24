import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import {
  useTypingWords,
  TYPING_WORD_INTERVAL,
  TYPING_INITIAL_DELAY,
} from "../../hooks/useTypingWords";
import "./prequel-section.css";

const PREQUEL_BODY =
  "Embarking on a cosmic journey—from the tropical shores of Phuket through the bustling chaos of Bangkok, then soaring across the Pacific to the rugged terrains of Lubbock and the electric vibes of Dallas. Along this stellar path, one constant shines: the brilliance of good people crafting wonders. Now, with galaxies ahead and stars guiding the way, she's poised for the next chapter of adventure.";

/** Stable ref for `useTypingWords` (avoids new array literal every render). */
const PREQUEL_PARAGRAPHS = [PREQUEL_BODY];

const TYPING_START_THRESHOLD = 0.15;
const PREQUEL_FADE_THRESHOLD = 0.2;

export default React.memo(function PrequelSection({ sectionProgress }) {
  const [show, setShow] = useState(false);
  const [showPrequelFade, setShowPrequelFade] = useState(false);
  const { words, visibleWordCount } = useTypingWords(PREQUEL_PARAGRAPHS, {
    enabled: show,
    wordInterval: TYPING_WORD_INTERVAL,
    initialDelay: TYPING_INITIAL_DELAY,
  });

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

  const visibleWords = words.slice(0, visibleWordCount);
  const text = visibleWords.join(" ");

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
            <span className="prequel-letter-l">l</span>
            {" "}
          </motion.span>
        </span>
        <span className="prequel-section__title-line">
          <span className="prequel-section__title-bold">TO TODAY</span>
        </span>
      </h2>
      <p className="prequel-section__body">
        {text}
        {"\u2060"}
        <span className="cursor-blink" aria-hidden="true">
          _
        </span>
      </p>
    </motion.div>
  );
});
