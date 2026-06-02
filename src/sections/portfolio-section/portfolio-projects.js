/**
 * Mission Gallery: display order + gallery filters.
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
import { PORTFOLIO_FILTER } from "../../constants/portfolio-filter.js";

/** Slug -> gallery browsing category. Slugs not listed are visible in All only. */
const MISSION_GALLERY_FILTER_BY_SLUG = {
  "dynamic-paywall": PORTFOLIO_FILTER.product,
  "subscription-checkout-activation": PORTFOLIO_FILTER.product,
  "article-page-redesign": PORTFOLIO_FILTER.product,
  "local-elections-hub": PORTFOLIO_FILTER.product,
  "map-magic": PORTFOLIO_FILTER.product,
  jobthai: PORTFOLIO_FILTER.product,

  "industrial-logistics-evaluation": PORTFOLIO_FILTER.research,
  rdfd: PORTFOLIO_FILTER.research,
  "federated-learning-energy": PORTFOLIO_FILTER.research,

  vote62: PORTFOLIO_FILTER.civicData,
  "parliament-watch-ocr": PORTFOLIO_FILTER.civicData,
  "electricity-bill-breakdown": PORTFOLIO_FILTER.civicData,
  "what-cooking-th": PORTFOLIO_FILTER.civicData,
  "outage-management-system": PORTFOLIO_FILTER.civicData,
  "pea-e-service": PORTFOLIO_FILTER.civicData,

  "jerdi-kids": PORTFOLIO_FILTER.awards,
  "photo-competition-my-hometown": PORTFOLIO_FILTER.awards,
};

function missionGalleryFilterForProject(project) {
  return MISSION_GALLERY_FILTER_BY_SLUG[project.slug ?? ""] ?? null;
}

/** Built once: manifest is static for the lifetime of the app shell. */
const MISSION_GALLERY_ORDERED_ALL = MISSION_GALLERY_MANIFEST.map((project) => ({
  ...project,
  portfolioFilter: missionGalleryFilterForProject(project),
}));

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

function filterMissionGalleryProjects(filter) {
  return MISSION_GALLERY_ORDERED_ALL.filter(
    (p) => p.portfolioFilter === filter,
  );
}

const MISSION_GALLERY_PROJECTS_BY_FILTER = Object.freeze({
  [PORTFOLIO_FILTER.all]: MISSION_GALLERY_ORDERED_ALL,
  [PORTFOLIO_FILTER.product]: filterMissionGalleryProjects(
    PORTFOLIO_FILTER.product,
  ),
  [PORTFOLIO_FILTER.research]: filterMissionGalleryProjects(
    PORTFOLIO_FILTER.research,
  ),
  [PORTFOLIO_FILTER.civicData]: filterMissionGalleryProjects(
    PORTFOLIO_FILTER.civicData,
  ),
  [PORTFOLIO_FILTER.awards]: filterMissionGalleryProjects(
    PORTFOLIO_FILTER.awards,
  ),
});

/** @param {string} [timelineFilter] Values from `PORTFOLIO_FILTER`. */
export function getMissionGalleryProjects(
  timelineFilter = PORTFOLIO_FILTER.all,
) {
  if (timelineFilter == null) return MISSION_GALLERY_ORDERED_ALL;

  const orderedProjects = MISSION_GALLERY_PROJECTS_BY_FILTER[timelineFilter];
  if (orderedProjects) return orderedProjects;

  return MISSION_GALLERY_ORDERED_ALL.filter(
    (p) => p.portfolioFilter === timelineFilter,
  );
}
