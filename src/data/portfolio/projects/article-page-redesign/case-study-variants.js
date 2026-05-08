import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const articlePageRedesignCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · Reader Experience · Monetization · Performance",
    task:
      "Optimize article surfaces for data-driven storytelling: PageBuilder (React), analytics integration, Core Web Vitals, and reader engagement metrics for civic platforms and newsroom data reports.",
  }),
});

export const articlePageRedesignCaseStudyVariant =
  articlePageRedesignCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  articlePageRedesignCaseStudyVariants.swe;