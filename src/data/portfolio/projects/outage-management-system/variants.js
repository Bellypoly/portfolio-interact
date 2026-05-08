import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const outageManagementSystemCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · OMS · Multi-system integration",
    task:
      "Integrate outage management systems for civic data platforms — build multi-system integrations for real-time outage reporting and analytics in public sector utilities.",
  }),
});

export const outageManagementSystemCaseStudyVariant =
  outageManagementSystemCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  outageManagementSystemCaseStudyVariants.swe;