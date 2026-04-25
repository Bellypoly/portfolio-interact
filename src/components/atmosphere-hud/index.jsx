import React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import "./atmosphere-hud.css";
import {
  HUD_BLACK,
  HUD_CYAN,
  HUD_LABEL_THRESHOLDS,
  HUD_LABEL_TRANSITION,
  HUD_LABELS,
  LINE_PROGRESS_COMPLETE,
  LINE_TOP_END_PCT,
  LINE_TOP_START_PCT,
} from "./atmosphere-hud-constants";

const AtmosphereHudRow = React.memo(function AtmosphereHudRow({
  label,
  threshold,
  progress,
}) {
  const color = useTransform(
    progress,
    [Math.max(0, threshold - HUD_LABEL_TRANSITION), threshold],
    [HUD_CYAN, HUD_BLACK],
  );

  return (
    <motion.div className="atmosphere-hud__item" style={{ color }}>
      <span className="atmosphere-hud__line" aria-hidden="true" />
      <span className="atmosphere-hud__label">{label}</span>
    </motion.div>
  );
});

export default React.memo(function AtmosphereHud({
  educationProgress,
  educationLineProgress,
  showScrollLine = false,
}) {
  const fallback = useMotionValue(0);
  const progress = educationProgress ?? fallback;
  const lineMotion = educationLineProgress ?? progress;

  const scrollLineTop = useTransform(
    lineMotion,
    [0, LINE_PROGRESS_COMPLETE, 1],
    [
      `${LINE_TOP_START_PCT}%`,
      `${LINE_TOP_END_PCT}%`,
      `${LINE_TOP_END_PCT}%`,
    ],
  );

  return (
    <div className="atmosphere-hud atmosphere-hud--scroll" aria-hidden="true">
      {showScrollLine ? (
        <motion.div
          className="atmosphere-hud__scroll-line"
          style={{ top: scrollLineTop, opacity: 1 }}
        />
      ) : null}
      {HUD_LABELS.map((label, i) => (
        <AtmosphereHudRow
          key={label}
          label={label}
          threshold={HUD_LABEL_THRESHOLDS[i]}
          progress={progress}
        />
      ))}
    </div>
  );
});
