import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const subscriptionCheckoutActivationCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · Subscriptions · Platform",
    task:
      "Build subscription platforms for civic data access — design end-to-end conversion systems for newsroom analytics and public engagement with subscription data.",
  }),
});

export const subscriptionCheckoutActivationCaseStudyVariant =
  subscriptionCheckoutActivationCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  subscriptionCheckoutActivationCaseStudyVariants.swe;