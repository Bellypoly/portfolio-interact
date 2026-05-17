import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

/** Mission-gallery version overlays merged in `index.js` over the default case study. */
export const vote62CaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow:
      "Civic data · Election transparency · OCR · Open government records",
    task: "Transform government-published ECT election PDFs into structured datasets for civic-data platforms, public-interest analysis, and newsroom reporting.",
    focus: [
      "Election records",
      "OCR",
      "Document parsing",
      "Data validation",
      "Public-interest analysis",
    ],
    context:
      "Collaborative civic-data initiative supporting public-interest election reporting and open election data workflows in Thailand.",
  }),
  
});

export const vote62EctReport69CaseStudyVariant =
  vote62CaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  vote62CaseStudyVariants.swe;
