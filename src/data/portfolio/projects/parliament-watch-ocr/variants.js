import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const parliamentWatchOcrCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Civic data journalism · OCR · Open parliament records",
    task:
      "Extract structured parliamentary vote data from Thai PDF records so civic platforms and newsroom charts can run on open, machine-readable government evidence.",
  }),
});

export const parliamentWatchOcrCaseStudyVariant =
  parliamentWatchOcrCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  parliamentWatchOcrCaseStudyVariants.swe;