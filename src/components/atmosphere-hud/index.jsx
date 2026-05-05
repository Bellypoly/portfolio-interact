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

// Map education scroll progress to the HUD color ramp.
function useHudTickColor(progress, threshold) {
  return useTransform(
    progress,
    [Math.max(0, threshold - HUD_LABEL_TRANSITION), threshold],
    [HUD_CYAN, HUD_BLACK],
  );
}

const AtmosphereHudRow = React.memo(function AtmosphereHudRow({
  label,
  threshold,
  progress,
}) {
  const color = useHudTickColor(progress, threshold);

  return (
    <motion.div className="atmosphere-hud__item" style={{ color }}>
      <span className="atmosphere-hud__line" aria-hidden="true" />
      <span className="atmosphere-hud__label">{label}</span>
    </motion.div>
  );
});

const AtmosphereHudBetween = React.memo(function AtmosphereHudBetween({
  threshold,
  progress,
}) {
  const color = useHudTickColor(progress, threshold);
  return (
    <motion.div
      className="atmosphere-hud__between"
      style={{ color }}
      aria-hidden="true"
    >
      <span className="atmosphere-hud__between-line" />
    </motion.div>
  );
});

export default React.memo(function AtmosphereHud({
  educationProgress,
  educationLineProgress,
  showEducationHudDecor = false,
}) {
  const fallback = useMotionValue(0);
  const progress = educationProgress ?? fallback;
  const lineMotion = educationLineProgress ?? progress;

  const scrollLineTop = useTransform(
    lineMotion,
    [0, LINE_PROGRESS_COMPLETE, 1],
    [`${LINE_TOP_START_PCT}%`, `${LINE_TOP_END_PCT}%`, `${LINE_TOP_END_PCT}%`],
  );

  return (
    <div
      className={`atmosphere-hud atmosphere-hud--scroll${
        showEducationHudDecor ? "" : " atmosphere-hud--year-compact"
      }`}
      aria-hidden="true"
    >
      {showEducationHudDecor ? (
        <motion.div
          className="atmosphere-hud__scroll-marker"
          style={{ top: scrollLineTop, opacity: 1 }}
        >
          <span className="atmosphere-hud__scroll-marker__triangle" />
        </motion.div>
      ) : null}
      {HUD_LABELS.map((label, i) => (
        <React.Fragment key={label}>
          <AtmosphereHudRow
            label={label}
            threshold={HUD_LABEL_THRESHOLDS[i]}
            progress={progress}
          />
          {i < HUD_LABELS.length - 1 ? (
            <AtmosphereHudBetween
              progress={progress}
              threshold={HUD_LABEL_THRESHOLDS[i]}
            />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
});
