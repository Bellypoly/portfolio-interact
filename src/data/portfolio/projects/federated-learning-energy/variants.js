import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const federatedLearningEnergyCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    // eyebrow: "Data journalism · Systems · Wireless",
    task: "Analyze energy consumption data from federated learning systems in wireless networks to inform civic platforms and newsroom reports on technology costs and efficiency.",
  }),
});

export const federatedLearningEnergyCaseStudyVariant =
  federatedLearningEnergyCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  federatedLearningEnergyCaseStudyVariants.swe;
