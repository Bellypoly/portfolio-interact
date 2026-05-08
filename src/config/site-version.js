/**
 * Global runtime version flag for cross-section content/ordering variants.
 *
 * Priority:
 * 1) `VITE_SITE_VERSION` (new canonical env var)
 * 2) `VITE_MISSION_GALLERY_VERSION` (legacy fallback, kept for compatibility)
 * 3) `DEFAULT_SITE_VERSION`
 *
 * Legacy aliases are supported:
 * - `0` -> `swe`
 * - `1` -> `data-reporter`
 */
const DEFAULT_SITE_VERSION = "swe";
const VALID_SITE_VERSIONS = new Set(["swe", "data-reporter"]);
const LEGACY_SITE_VERSION_ALIASES = Object.freeze({
  0: "swe",
  1: "data-reporter",
});

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeVersion(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/**
 * Convert legacy short codes to canonical site versions.
 * @param {string} version
 * @returns {string}
 */
function canonicalizeVersion(version) {
  return LEGACY_SITE_VERSION_ALIASES[version] ?? version;
}

/**
 * Resolve the effective site version from env-style values.
 * Extracted for unit tests and to keep module-level work trivial.
 *
 * @param {{ VITE_SITE_VERSION?: unknown, VITE_MISSION_GALLERY_VERSION?: unknown }} env
 * @returns {string}
 */
export function resolveActiveSiteVersion(env) {
  const siteVersion = canonicalizeVersion(
    normalizeVersion(env?.VITE_SITE_VERSION),
  );
  const legacyVersion = canonicalizeVersion(
    normalizeVersion(env?.VITE_MISSION_GALLERY_VERSION),
  );

  if (siteVersion !== "") {
    return VALID_SITE_VERSIONS.has(siteVersion)
      ? siteVersion
      : DEFAULT_SITE_VERSION;
  }

  if (legacyVersion !== "" && VALID_SITE_VERSIONS.has(legacyVersion)) {
    return legacyVersion;
  }

  return DEFAULT_SITE_VERSION;
}

export const ACTIVE_SITE_VERSION = resolveActiveSiteVersion(import.meta.env);
