import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export { vote62EctReport69CaseStudyBase } from "../vote62-ect-report-69-project.js";

/** Mission-gallery version overlays merged in `index.js` over the default case study. */
export const vote62EctReport69CaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow:
      "Data journalism · OCR · ETL · Data Engineering · Data Storytelling",
    task: "Build OCR and ETL pipelines for election data — extract structured voting information from Thai reports for civic platforms and newsroom data storytelling.",
  }),
});

export const vote62EctReport69CaseStudyVariant =
  vote62EctReport69CaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  vote62EctReport69CaseStudyVariants.swe;
