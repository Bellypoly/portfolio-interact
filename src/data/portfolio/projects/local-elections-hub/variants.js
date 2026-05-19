import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const localElectionsHubCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Election systems · Data UI · Newsroom engineering",
    task: "Build data-driven election hubs for civic platforms — integrate real-time results, visualizations, and analytics for newsroom reporting and public access.",
  }),
});

export const localElectionsHubCaseStudyVariant =
  localElectionsHubCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  localElectionsHubCaseStudyVariants.swe;
