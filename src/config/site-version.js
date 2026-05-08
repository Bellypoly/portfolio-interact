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

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeVersion(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/**
 * Resolve the effective site version from env-style values.
 * Extracted for unit tests and to keep module-level work trivial.
 *
 * @param {{ VITE_SITE_VERSION?: unknown, VITE_MISSION_GALLERY_VERSION?: unknown }} env
 * @returns {string}
 */
export function resolveActiveSiteVersion(env) {
  const normalizedEnvSiteVersion = normalizeVersion(env?.VITE_SITE_VERSION);
  const normalizedLegacyVersion = normalizeVersion(
    env?.VITE_MISSION_GALLERY_VERSION,
  );

  if (normalizedEnvSiteVersion !== "") {
    return VALID_SITE_VERSIONS.has(normalizedEnvSiteVersion)
      ? normalizedEnvSiteVersion
      : DEFAULT_SITE_VERSION;
  }

  if (
    normalizedLegacyVersion !== "" &&
    VALID_SITE_VERSIONS.has(normalizedLegacyVersion)
  ) {
    return normalizedLegacyVersion;
  }

  return DEFAULT_SITE_VERSION;
}

export const ACTIVE_SITE_VERSION = resolveActiveSiteVersion(import.meta.env);
