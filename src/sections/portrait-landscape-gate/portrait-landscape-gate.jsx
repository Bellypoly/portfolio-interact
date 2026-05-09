import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpaceVoidShell from "../../components/space-void-shell/space-void-shell.jsx";
import { registerPortraitOrientationLock } from "./register-portrait-orientation-lock.js";
import { usePortraitLandscapeVisible } from "./use-portrait-landscape-visible.js";
import "./portrait-landscape-gate.css";

/**
 * Phone landscape: same void background + mid star layer as 404 (`SpaceVoidShell`).
 * Orientation lock is registered once on mount (see `registerPortraitOrientationLock.js`).
 */
export default function PortraitLandscapeGate() {
  const location = useLocation();
  const isMissionPage = location.pathname.startsWith("/mission/");
  const { visible } = usePortraitLandscapeVisible();

  useEffect(() => {
    if (!isMissionPage) {
      registerPortraitOrientationLock();
    }
  }, [isMissionPage]);

  if (!visible || isMissionPage) return null;

  return (
    <SpaceVoidShell
      className="space-void-shell--fixed portrait-landscape-gate"
      contentClassName="portrait-landscape-gate__content"
      role="alert"
      aria-live="polite"
    >
      <span className="sr-only">Portrait orientation required.</span>
      <span className="portrait-landscape-gate__glyph" aria-hidden="true">
        ↻
      </span>
      <p className="portrait-landscape-gate__copy">
        This experience is designed for <strong>portrait</strong>. Please rotate
        your device upright to continue.
      </p>
    </SpaceVoidShell>
  );
}
