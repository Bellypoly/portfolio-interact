import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const dynamicPaywallCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Newsroom · Monetization · Machine learning",
    task: "Integrate ML paywall into civic platforms to optimize reader engagement and subscription data for newsroom analytics and open data reports.",
    /* Outcome / result */ businessOutcome:
      "The rollout showed that paywall performance depended heavily on reader intent and content type—not just traffic volume. The +22% conversion lift and +15% increase in subscription starts came from aligning paywall timing and messaging more closely with how different readers actually behaved across the site.",
  }),
});

export const dynamicPaywallCaseStudyVariant =
  dynamicPaywallCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  dynamicPaywallCaseStudyVariants.swe;
