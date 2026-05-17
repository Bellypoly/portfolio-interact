import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const subscriptionCheckoutActivationCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    task: "Rebuild a fragmented newsroom subscription funnel into a single evidence-driven checkout system—reducing reader drop-off, resolving identity-state failures, and using production analytics to guide iterative UX decisions.",
  }),
});

export const subscriptionCheckoutActivationCaseStudyVariant =
  subscriptionCheckoutActivationCaseStudyVariants[
    ACTIVE_MISSION_GALLERY_VERSION
  ] ?? subscriptionCheckoutActivationCaseStudyVariants.swe;
