/**
 * Mission Gallery: display order + Mission Credentials timeline filter.
 *
 * Data: `src/data/portfolio/mission-gallery-manifest.js` (canonical gallery fields; case studies spread the same row).
 * Case study bodies load on `/mission/:slug` via `src/data/portfolio/load-portfolio-project.js`. Archived `squeeze-it` is
 * commented at the end of the manifest file.
 *
 * Display order: `MISSION_GALLERY_MANIFEST` array order (so work and research can interleave).
 *
 * `portfolioLabel` is the small gallery tag; stick to this set: Product, Competition, Thesis,
 * Paper, Academic, Marketplace, Platform, Civic tech, Public sector.
 * Optional `companyBadge` (manifest): short employer/org tag on the card (e.g. DMN, PEA, thnknet).
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

const MISSION_GALLERY_PROJECTS_BY_FILTER = Object.freeze({
  [EDU_TIMELINE_FILTER.all]: MISSION_GALLERY_ORDERED_ALL,
  [EDU_TIMELINE_FILTER.education]: MISSION_GALLERY_ORDERED_EDUCATION,
  [EDU_TIMELINE_FILTER.achievement]: MISSION_GALLERY_ORDERED_ACHIEVEMENT,
});

/** @param {string} [timelineFilter] Values from `EDU_TIMELINE_FILTER` / edu timeline legend. */
export function getMissionGalleryProjects(
  timelineFilter = EDU_TIMELINE_FILTER.all,
) {
  if (timelineFilter == null) return MISSION_GALLERY_ORDERED_ALL;

  const orderedProjects = MISSION_GALLERY_PROJECTS_BY_FILTER[timelineFilter];
  if (orderedProjects) return orderedProjects;

  return MISSION_GALLERY_ORDERED_ALL.filter(
    (p) =>
      MISSION_GALLERY_EDU_ACH_TAG_BY_SLUG[p.slug ?? ""] === timelineFilter,
  );
}
