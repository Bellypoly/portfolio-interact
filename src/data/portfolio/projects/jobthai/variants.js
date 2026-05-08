import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const jobthaiCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · Marketplace",
    task:
      "Analyze job market trends from Thai marketplace data to inform civic platforms and newsroom reports on employment patterns.",
  }),
});

export const jobthaiCaseStudyVariant =
  jobthaiCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  jobthaiCaseStudyVariants.swe;