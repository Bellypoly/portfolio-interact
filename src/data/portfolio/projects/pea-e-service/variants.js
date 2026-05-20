import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const peaEServiceCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    // eyebrow: "Data journalism · Engineering & user experience (UX)",
    task: "Build public sector portals for civic data access — design user experiences for electricity and water services, integrating data flows for transparent government interactions.",
  }),
});

export const peaEServiceCaseStudyVariant =
  peaEServiceCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  peaEServiceCaseStudyVariants.swe;
