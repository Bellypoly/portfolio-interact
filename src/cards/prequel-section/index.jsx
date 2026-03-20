import React, { useState } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import {
  useTypingWords,
  TYPING_WORD_INTERVAL,
  TYPING_INITIAL_DELAY,
} from "../../hooks/useTypingWords";
import "./prequel-section.css";

const PREQUEL_BODY =
  "The story so far — East to West. From Phuket to Bangkok, then across the Pacific to Lubbock, and Dallas. Different places, the same thread: good people building great things, and wherever else that takes me.";

const TYPING_START_THRESHOLD = 0.15;
const PREQUEL_FADE_THRESHOLD = 0.2;

export default React.memo(function PrequelSection({ sectionProgress }) {
  const [show, setShow] = useState(false);
  const [showPrequelFade, setShowPrequelFade] = useState(false);
  const { words, visibleWordCount } = useTypingWords([PREQUEL_BODY], {
    enabled: show,
    wordInterval: TYPING_WORD_INTERVAL,
    initialDelay: TYPING_INITIAL_DELAY,
  });

  useMotionValueEvent(sectionProgress, "change", (v) => {
    if (!show && v >= TYPING_START_THRESHOLD) setShow(true);
    if (!showPrequelFade && v >= PREQUEL_FADE_THRESHOLD)
      setShowPrequelFade(true);
  });

  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3],
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
            {" prequel "}
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
