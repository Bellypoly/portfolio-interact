import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const photoCompetitionMyHometownCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({}),
});

export const photoCompetitionMyHometownCaseStudyVariant =
  photoCompetitionMyHometownCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  photoCompetitionMyHometownCaseStudyVariants.swe;
