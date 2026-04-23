/**
 * True when the primary input supports real hover (e.g. mouse on desktop).
 * Touch-first devices report `(hover: none)` — use click/toggle for popovers there.
 * Caches the MediaQueryList so repeated checks do not allocate.
 */
let hoverMql = null;

export function prefersHoverPopover() {
  if (typeof window === "undefined") return false;
  if (!hoverMql) hoverMql = window.matchMedia("(hover: hover)");
  return hoverMql.matches;
}
