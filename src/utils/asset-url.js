const DEFAULT_BASE_URL = import.meta.env?.BASE_URL ?? "/";

export function assetUrl(relativePath, baseUrl = DEFAULT_BASE_URL) {
  const path = String(relativePath ?? "")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "");
  const root = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${root}${path}`;
}
