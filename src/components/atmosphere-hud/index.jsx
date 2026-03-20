import React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import "./atmosphere-hud.css";

const LABELS = ["2020", "2018", "2016", "2014", "2012", "2010"];
const ATMOSPHERE_LABELS = [
  "EXOSPHERE",
  "THERMOSPHERE",
  "MESOSPHERE",
  "STRATOSPHERE",
  "TROPOPSHERE",
  "EARTH",
];
const CYAN = "rgb(34, 211, 238)";
const BLACK = "rgb(0, 0, 0)";

/* Each label turns black when it reaches the education section (bottom to top) */
const LABEL_THRESHOLDS = [0.34, 0.28, 0.21, 0.16, 0.07, 0.02];
const TRANSITION_SPAN = 0.03;

export default React.memo(function AtmosphereHud({ educationProgress }) {
  const fallback = useMotionValue(0);
  const progress = educationProgress ?? fallback;

  return (
    <div className="atmosphere-hud atmosphere-hud--scroll" aria-hidden="true">
      {LABELS.map((label, i) => {
        const threshold = LABEL_THRESHOLDS[i];
        const color = useTransform(
          progress,
          [Math.max(0, threshold - TRANSITION_SPAN), threshold],
          [CYAN, BLACK],
        );
        return (
          <motion.div
            key={label}
            className="atmosphere-hud__item"
            style={{ color }}
          >
            <motion.span
              className="atmosphere-hud__line"
              style={{ backgroundColor: color }}
            />
            <span className="atmosphere-hud__label">{label}</span>
          </motion.div>
        );
      })}
    </div>
  );
});
