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


