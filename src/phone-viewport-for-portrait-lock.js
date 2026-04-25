/**
 * Portrait lock / “rotate to portrait” overlay: **phones only** (narrow short edge).
 * Tablets and larger touch devices exceed this and may rotate freely.
 */
export const PORTRAIT_LOCK_MAX_SHORT_EDGE_PX = 560;

export function isPhoneViewportForPortraitLock() {
  if (typeof window === "undefined") return false;
  return (
    Math.min(window.innerWidth, window.innerHeight) <=
    PORTRAIT_LOCK_MAX_SHORT_EDGE_PX
  );
}
