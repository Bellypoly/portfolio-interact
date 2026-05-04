/** Year labels (bottom → top in layout). */
export const HUD_LABELS = [
  "2024",
  "2022",
  "2020",
  "2018",
  "2016",
  "2014",
  "2012",
  "2010",
];

/**
 * When each label’s color hits black vs education scroll progress (see AtmosphereHud).
 * Length must match `HUD_LABELS` (same index order: first row → last row).
 */
export const HUD_LABEL_THRESHOLDS = [
  0.41, 0.375, 0.34, 0.28, 0.21, 0.16, 0.07, 0.02,
];

export const HUD_LABEL_TRANSITION = 0.03;

export const HUD_CYAN = "rgb(34, 211, 238)";
export const HUD_BLACK = "rgb(0, 0, 0)";

/** Tick `top` % range inside `.atmosphere-hud`. */
export const LINE_TOP_START_PCT = 12.3;
export const LINE_TOP_END_PCT = 98.8;

/**
 * Education `lineMotion` (0→1) span mapped to full vertical travel; above this, tick stays at end.
 */
export const LINE_PROGRESS_COMPLETE = 0.66;
