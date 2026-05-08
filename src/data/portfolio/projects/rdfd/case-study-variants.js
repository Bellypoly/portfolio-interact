import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const rdfdCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · Machine learning",
    task:
      "Develop ML models for detecting fake data in civic systems — analyze patterns in transportation data to identify fraudulent activities and inform public reporting.",
  }),
});

export const rdfdCaseStudyVariant =
  rdfdCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  rdfdCaseStudyVariants.swe;