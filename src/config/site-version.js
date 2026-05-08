/**
 * Global runtime version flag for cross-section content/ordering variants.
 *
 * Priority:
 * 1) `VITE_SITE_VERSION` (new canonical env var)
 * 2) `VITE_MISSION_GALLERY_VERSION` (legacy fallback, kept for compatibility)
 * 3) `DEFAULT_SITE_VERSION`
 */
const DEFAULT_SITE_VERSION = "swe";
const VALID_SITE_VERSIONS = new Set(["swe", "data-reporter"]);

const envSiteVersion = import.meta.env.VITE_SITE_VERSION;
const envLegacyMissionVersion = import.meta.env.VITE_MISSION_GALLERY_VERSION;

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeVersion(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

const normalizedEnvSiteVersion = normalizeVersion(envSiteVersion);
const normalizedLegacyVersion = normalizeVersion(envLegacyMissionVersion);

const resolvedVersion =
  normalizedEnvSiteVersion !== ""
    ? VALID_SITE_VERSIONS.has(normalizedEnvSiteVersion)
      ? normalizedEnvSiteVersion
      : DEFAULT_SITE_VERSION
    : normalizedLegacyVersion !== "" &&
        VALID_SITE_VERSIONS.has(normalizedLegacyVersion)
      ? normalizedLegacyVersion
      : DEFAULT_SITE_VERSION;

export const ACTIVE_SITE_VERSION = resolvedVersion;
