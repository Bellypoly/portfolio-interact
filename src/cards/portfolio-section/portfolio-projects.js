/**
 * Mission Gallery: sort order + Education & Achievements timeline filter.
 *
 * Data: `src/data/portfolio/mission-gallery-manifest.js` (gallery fields only). Case studies load on
 * `/mission/:slug` via `src/data/portfolio/load-portfolio-project.js`. Archived `squeeze-it` is
 * commented at the end of the manifest file.
 *
 * Sort: non-research tiles use `PROFESSIONAL_MISSION_GALLERY_ORDER`, then year desc, then slug.
 * Research tiles use year desc, then slug only.
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

const PROFESSIONAL_MISSION_GALLERY_ORDER = [
  "dynamic-paywall",
  "subscription-checkout-activation",
  "article-page-redesign",
  "local-elections-hub",
  "electricity-bill-breakdown",
  "parliament-watch-ocr",
  "vote62-ect-report-69",
  "jobthai",
  "map-magic",
  "pea-e-service",
  "outage-management-system",
  "jerdi-kids",
  "photo-competition-my-hometown",
];

const PROFESSIONAL_ORDER_INDEX = new Map(
  PROFESSIONAL_MISSION_GALLERY_ORDER.map((slug, i) => [slug, i]),
);

function compareMissionGalleryOrder(a, b) {
  const y = (b.portfolioYear ?? 0) - (a.portfolioYear ?? 0);
  if (y !== 0) return y;
  return (a.slug ?? "").localeCompare(b.slug ?? "");
}

function compareProfessionalMissionGallery(a, b) {
  const ia = PROFESSIONAL_ORDER_INDEX.get(a.slug ?? "") ?? -1;
  const ib = PROFESSIONAL_ORDER_INDEX.get(b.slug ?? "") ?? -1;
  const aKnown = ia !== -1;
  const bKnown = ib !== -1;
  if (aKnown && bKnown) return ia - ib;
  if (aKnown !== bKnown) return aKnown ? -1 : 1;
  return compareMissionGalleryOrder(a, b);
}

function buildMissionGalleryProjectsOrdered() {
  const professional = MISSION_GALLERY_MANIFEST.filter(
    (p) => p.portfolioGroup !== "research",
  );
  const research = MISSION_GALLERY_MANIFEST.filter(
    (p) => p.portfolioGroup === "research",
  );
  return [
    ...[...professional].sort(compareProfessionalMissionGallery),
    ...[...research].sort(compareMissionGalleryOrder),
  ];
}

/** Built once: manifest is static for the lifetime of the app shell. */
const MISSION_GALLERY_ORDERED_ALL = buildMissionGalleryProjectsOrdered();

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
