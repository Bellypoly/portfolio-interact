import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const industrialLogisticsEvaluationCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({}),
});

export const industrialLogisticsEvaluationCaseStudyVariant =
  industrialLogisticsEvaluationCaseStudyVariants[
    ACTIVE_MISSION_GALLERY_VERSION
  ] ?? industrialLogisticsEvaluationCaseStudyVariants.swe;
