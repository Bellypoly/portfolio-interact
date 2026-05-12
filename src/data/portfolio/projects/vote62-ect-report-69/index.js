/**
 * VOTE62 — ECT Report 69 OCR/ETL pipeline — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import {
  vote62EctReport69CaseStudyBase,
  vote62EctReport69CaseStudyVariant,
} from "./variants.js";

export const vote62EctReport69Project = {
  ...getMissionGalleryManifestRow("vote62-ect-report-69"),
  caseStudy: {
    ...vote62EctReport69CaseStudyBase,
    ...vote62EctReport69CaseStudyVariant,
  },
};
