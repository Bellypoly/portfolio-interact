import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const jerdiKidsCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    // eyebrow: "Data journalism · UI/UX · Development · QR & BLE · Social impact",
    task: "Design community safety platforms using QR and BLE for data collection and reporting — integrate with civic apps and newsroom tools for real-time alerts and analytics on missing persons.",
  }),
});

export const jerdiKidsCaseStudyVariant =
  jerdiKidsCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  jerdiKidsCaseStudyVariants.swe;
