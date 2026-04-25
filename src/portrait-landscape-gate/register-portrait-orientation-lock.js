import { isPhoneViewportForPortraitLock } from "../phone-viewport-for-portrait-lock.js";

/**
 * Screen Orientation API: lock to portrait after the first pointer gesture — **phones only**.
 * Same viewport rule as `PortraitLandscapeGate` / `usePortraitLandscapeVisible`.
 */
export function registerPortraitOrientationLock() {
  function tryLock() {
    if (!isPhoneViewportForPortraitLock()) return;
    try {
      const { orientation } = screen;
      if (orientation && typeof orientation.lock === "function") {
        orientation.lock("portrait").catch(() => {});
      }
    } catch {
      // Unsupported or rejected
    }
  }
  window.addEventListener("pointerdown", tryLock, {
    once: true,
    capture: true,
  });
}
