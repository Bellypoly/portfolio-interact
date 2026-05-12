/**
 * Mission Gallery: display order + Education & Achievements timeline filter.
 *
 * Data: `src/data/portfolio/mission-gallery-manifest.js` (canonical gallery fields; case studies spread the same row).
 * Case study bodies load on `/mission/:slug` via `src/data/portfolio/load-portfolio-project.js`. Archived `squeeze-it` is
 * commented at the end of the manifest file.
 *
 * Display order: `MISSION_GALLERY_MANIFEST` array order (so work and research can interleave).
 *
 * `portfolioLabel` is the small gallery tag; stick to this set: Product, Competition, Thesis,
 * Paper, Academic, Marketplace, Platform, Civic tech, Public sector.
 */

import { MISSION_GALLERY_MANIFEST } from "../../data/portfolio/mission-gallery-manifest.js";
import { EDU_TIMELINE_FILTER } from "../../constants/edu-timeline-filter.js";

/** Slug -> education | achievement. Slugs not listed are work-only tiles (visible when timeline filter is All). */
const MISSION_GALLERY_EDU_ACH_TAG_BY_SLUG = {
  "federated-learning-energy": EDU_TIMELINE_FILTER.education,
  rdfd: EDU_TIMELINE_FILTER.education,
  "industrial-logistics-evaluation": EDU_TIMELINE_FILTER.education,
  "dynamic-paywall": EDU_TIMELINE_FILTER.achievement,
  "subscription-checkout-activation": EDU_TIMELINE_FILTER.achievement,
  "jerdi-kids": EDU_TIMELINE_FILTER.achievement,
  "photo-competition-my-hometown": EDU_TIMELINE_FILTER.achievement,
};

/** Built once: manifest is static for the lifetime of the app shell. */
const MISSION_GALLERY_ORDERED_ALL = MISSION_GALLERY_MANIFEST;

if (import.meta.env.DEV) {
  import("../../data/portfolio/load-portfolio-project.js").then(
    ({ hasPortfolioProjectSlug }) => {
      const missingRouteSlugs = MISSION_GALLERY_ORDERED_ALL.filter(
        (p) => p.slug && !hasPortfolioProjectSlug(p.slug),
      ).map((p) => p.slug);

      if (missingRouteSlugs.length > 0) {
        console.warn(
          "Mission Gallery entries without case-study route loaders:",
          missingRouteSlugs,
        );
      }
    },
  );
}

const MISSION_GALLERY_ORDERED_EDUCATION = MISSION_GALLERY_ORDERED_ALL.filter(
  (p) =>
    MISSION_GALLERY_EDU_ACH_TAG_BY_SLUG[p.slug ?? ""] ===
    EDU_TIMELINE_FILTER.education,
);

const MISSION_GALLERY_ORDERED_ACHIEVEMENT = MISSION_GALLERY_ORDERED_ALL.filter(
  (p) =>
    MISSION_GALLERY_EDU_ACH_TAG_BY_SLUG[p.slug ?? ""] ===
    EDU_TIMELINE_FILTER.achievement,
);

/** @param {string} [timelineFilter] Values from `EDU_TIMELINE_FILTER` / edu timeline legend. */
export function getMissionGalleryProjects(
  timelineFilter = EDU_TIMELINE_FILTER.all,
) {
  if (
    timelineFilter == null ||
    timelineFilter === EDU_TIMELINE_FILTER.all
  ) {
    return MISSION_GALLERY_ORDERED_ALL;
  }
  if (timelineFilter === EDU_TIMELINE_FILTER.education) {
    return MISSION_GALLERY_ORDERED_EDUCATION;
  }
  if (timelineFilter === EDU_TIMELINE_FILTER.achievement) {
    return MISSION_GALLERY_ORDERED_ACHIEVEMENT;
  }
  return MISSION_GALLERY_ORDERED_ALL.filter(
    (p) =>
      MISSION_GALLERY_EDU_ACH_TAG_BY_SLUG[p.slug ?? ""] === timelineFilter,
  );
}
