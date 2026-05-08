import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const mapMagicCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Data journalism · Geospatial",
    task:
      "Build geospatial platforms for civic data visualization — integrate proprietary maps, POI, and routing for newsroom analytics and public access to location-based information.",
  }),
});

export const mapMagicCaseStudyVariant =
  mapMagicCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  mapMagicCaseStudyVariants.swe;