import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const jerdiKidsCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({}),
});

export const jerdiKidsCaseStudyVariant =
  jerdiKidsCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  jerdiKidsCaseStudyVariants.swe;
