// HUD year labels, top to bottom.
export const HUD_LABELS = [
  "2024",
  "'22",
  "'20",
  "'18",
  "'16",
  "'14",
  "'12",
  "2010",
];

// Progress points where each label finishes its cyan-to-black transition.
export const HUD_LABEL_THRESHOLDS = [
  0.29, 0.24, 0.21, 0.18, 0.15, 0.11, 0.07, 0.02,
];

export const HUD_LABEL_TRANSITION = 0.03;

export const HUD_CYAN = "rgb(34, 211, 238)";
export const HUD_BLACK = "rgb(0, 0, 0)";

// Scroll marker range inside the HUD, as percentages.
export const LINE_TOP_START_PCT = 12.3;
export const LINE_TOP_END_PCT = 98.8;

// Marker stops moving after this progress point.
export const LINE_PROGRESS_COMPLETE = 0.66;
