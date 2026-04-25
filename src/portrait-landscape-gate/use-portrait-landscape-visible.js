import { useEffect, useState } from "react";
import { isPhoneViewportForPortraitLock } from "../phone-viewport-for-portrait-lock.js";

const SHOW_DEBOUNCE_MS = 480;

function wantsPortraitHint() {
  if (typeof window === "undefined") return false;
  if (!isPhoneViewportForPortraitLock()) return false;
  if (!window.matchMedia("(pointer: coarse)").matches) return false;
  if (!window.matchMedia("(hover: none)").matches) return false;
  if (!window.matchMedia("(orientation: landscape)").matches) return false;
  return window.innerWidth > window.innerHeight;
}

/**
 * Phones only: true after landscape + touch conditions hold for SHOW_DEBOUNCE_MS
 * (avoids refresh flash). False immediately when leaving landscape.
 */
export function usePortraitLandscapeVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer = 0;

    function clearShowTimer() {
      if (showTimer !== 0) {
        window.clearTimeout(showTimer);
        showTimer = 0;
      }
    }

    function schedule() {
      if (!wantsPortraitHint()) {
        clearShowTimer();
        setVisible(false);
        return;
      }
      clearShowTimer();
      showTimer = window.setTimeout(() => {
        showTimer = 0;
        if (wantsPortraitHint()) setVisible(true);
      }, SHOW_DEBOUNCE_MS);
    }

    window.addEventListener("orientationchange", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.visualViewport?.addEventListener?.("resize", schedule, {
      passive: true,
    });
    function onPageShow(e) {
      if (e.persisted) setVisible(false);
      schedule();
    }
    window.addEventListener("pageshow", onPageShow);

    schedule();

    return () => {
      clearShowTimer();
      window.removeEventListener("orientationchange", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener?.("resize", schedule);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return { visible };
}
