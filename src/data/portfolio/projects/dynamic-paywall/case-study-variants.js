import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const dynamicPaywallCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · Monetization · AI",
    task:
      "Integrate ML paywall into civic platforms to optimize reader engagement and subscription data for newsroom analytics and open data reports.",
  }),
});

export const dynamicPaywallCaseStudyVariant =
  dynamicPaywallCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  dynamicPaywallCaseStudyVariants.swe;