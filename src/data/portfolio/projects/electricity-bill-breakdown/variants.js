import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const electricityBillBreakdownCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Civic data journalism · Flow Design · Energy Literacy",
    task:
      "Design data flows and information structures for civic platforms that explain energy data — charges, tariffs, and fairness — so newsrooms and platforms can present complex regulatory topics accessibly.",
  }),
});

export const electricityBillBreakdownCaseStudyVariant =
  electricityBillBreakdownCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  electricityBillBreakdownCaseStudyVariants.swe;