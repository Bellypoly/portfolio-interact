/**
 * Mission Gallery versioning and project overrides.
 *
 * - Uses global `ACTIVE_SITE_VERSION` so other sections can branch by the
 *   same variant without duplicating config logic.
 * - `ACTIVE_MISSION_GALLERY_VERSION` controls both:
 *   1) gallery card ordering (see `mission-gallery-manifest.js`)
 *   2) `/mission/:slug` detail overrides (consumed by `load-portfolio-project.js`)
 * - Global env control lives in `src/config/site-version.js`:
 *   prefer `VITE_SITE_VERSION`; legacy `VITE_MISSION_GALLERY_VERSION` still works.
 */
import { ACTIVE_SITE_VERSION } from "../../config/site-version.js";

export const ACTIVE_MISSION_GALLERY_VERSION = ACTIVE_SITE_VERSION;

/**
 * Version-specific project overrides (for `/mission/:slug` detail content).
 *
 * Shape:
 * {
 *   swe: {
 *     "slug-name": { ... }
 *   },
 *   "data-reporter": {
 *     "slug-name": {
 *       // Any top-level project field
 *       // Optional nested `caseStudy` object
 *     }
 *   }
 * }
 */
const PROJECT_OVERRIDES_BY_VERSION = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({}),
});

/**
 * Return per-project override for the currently active version.
 * Keeping this lookup centralized prevents version drift across files.
 *
 * @param {string | undefined} slug
 * @param {string} [version]
 * @returns {Record<string, any> | null}
 */
export function getProjectVersionOverride(
  slug,
  version = ACTIVE_MISSION_GALLERY_VERSION,
) {
  if (!slug) return null;
  return PROJECT_OVERRIDES_BY_VERSION[version]?.[slug] ?? null;
}

