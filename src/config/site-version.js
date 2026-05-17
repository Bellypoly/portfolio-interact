/**
 * Global runtime version flag for cross-section content/ordering variants.
 *
 * Priority:
 * 1) URL query (browser only): `v` only — same values as env
 *    (e.g. `?v=data-reporter`, `?v=1`). If `v` is missing or not a valid version,
 *    resolution continues with env (`.env` / `import.meta.env`) as below.
 * 2) `VITE_SITE_VERSION` (new canonical env var)
 * 3) `VITE_MISSION_GALLERY_VERSION` (legacy fallback, kept for compatibility)
 * 4) `DEFAULT_SITE_VERSION`
 *
 * Optional numeric shorthand for `.env` and URL (letters like `a`/`b` are not supported):
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
 * Map `0` / `1` shorthand to canonical site versions; otherwise return as-is.
 * @param {string} version
 * @returns {string}
 */
function canonicalizeVersion(version) {
  return LEGACY_SITE_VERSION_ALIASES[version] ?? version;
}

/**
 * Read a site-version override from a query string (for tests and tooling).
 * Only the `v` query parameter is read.
 *
 * @param {string} search - `window.location.search` (with or without leading `?`)
 * @returns {string | null} canonical version if present and valid, otherwise `null`
 */
export function parseSiteVersionFromSearch(search) {
  if (typeof search !== "string" || search === "") return null;
  const params = new URLSearchParams(
    search.startsWith("?") ? search : `?${search}`,
  );
  const raw = params.get("v");
  const version = canonicalizeVersion(normalizeVersion(raw));
  return VALID_SITE_VERSIONS.has(version) ? version : null;
}

/**
 * Resolve site version: a valid `v` query wins; if `v` is absent or invalid, uses `env`
 * (same rules as {@link resolveActiveSiteVersion}).
 *
 * @param {{ VITE_SITE_VERSION?: unknown, VITE_MISSION_GALLERY_VERSION?: unknown }} env
 * @param {string | undefined} [search] - `window.location.search`; non-string / empty skips URL
 * @returns {string}
 */
export function resolveActiveSiteVersionFromUrlAndEnv(env, search) {
  const fromUrl =
    typeof search === "string" && search !== ""
      ? parseSiteVersionFromSearch(search)
      : null;
  return fromUrl ?? resolveActiveSiteVersion(env);
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

const browserSearch =
  typeof window !== "undefined" && typeof window.location?.search === "string"
    ? window.location.search
    : undefined;

export const ACTIVE_SITE_VERSION = resolveActiveSiteVersionFromUrlAndEnv(
  import.meta.env,
  browserSearch,
);
