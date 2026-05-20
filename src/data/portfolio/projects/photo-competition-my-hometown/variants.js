import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const photoCompetitionMyHometownCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    // eyebrow: "Data journalism · Cultural Documentation · Competition Entry",
    task: "Document cultural heritage through photography for civic platforms — create visual data stories and exhibits for community engagement and historical preservation.",
  }),
});

export const photoCompetitionMyHometownCaseStudyVariant =
  photoCompetitionMyHometownCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  photoCompetitionMyHometownCaseStudyVariants.swe;
