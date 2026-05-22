/**
 * MapMagic / THiNKNET Maps — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { mapMagicCaseStudyVariant } from "./variants.js";

const baseMapMagicCaseStudy = {};

export const mapMagicProject = {
  ...getMissionGalleryManifestRow("map-magic"),
  /* Export */
  caseStudy: { ...baseMapMagicCaseStudy, ...mapMagicCaseStudyVariant },
};
