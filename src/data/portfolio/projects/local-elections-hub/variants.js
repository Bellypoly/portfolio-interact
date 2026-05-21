import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const localElectionsHubCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({}),
});

export const localElectionsHubCaseStudyVariant =
  localElectionsHubCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  localElectionsHubCaseStudyVariants.swe;
