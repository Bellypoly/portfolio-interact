import React from "react";
import { motion, useTransform } from "framer-motion";
import "./mission-gallery-pre-section.css";

/** Same stacking pattern as `WorkSectionTitle` / `.work-section-title-text`. */
const LABEL_CHARS = "﹁Mission Gallery﹂".split("");

export default React.memo(function MissionGalleryGateSection({
  sectionProgress,
}) {
  const opacity = useTransform(
    sectionProgress,
    [0, 0.12, 0.45, 0.88, 1],
    [0, 1, 1, 1, 0],
  );

  return (
    <motion.div className="mission-gallery-pre-section" style={{ opacity }}>
      <div className="mission-gallery-pre-section__glyph" aria-hidden="true">
        {LABEL_CHARS.map((c, i) => (
          <span key={i}>{c === " " ? "\u00a0" : c}</span>
        ))}
      </div>
      <div
        className="mission-gallery-pre-section__rule mission-gallery-pre-section__rule--below"
        aria-hidden="true"
      />
      <span className="sr-only">Mission Gallery</span>
    </motion.div>
  );
});
