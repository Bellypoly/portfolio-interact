import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const industrialLogisticsEvaluationCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · Logistics · IEOM 2016",
    task:
      "Evaluate logistics performance data for Thai industries — benchmark against global standards, quantify gaps, and inform civic platforms and newsroom reports on supply chain efficiency.",
  }),
});

export const industrialLogisticsEvaluationCaseStudyVariant =
  industrialLogisticsEvaluationCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  industrialLogisticsEvaluationCaseStudyVariants.swe;