import { useCallback, useEffect, useMemo, useState } from "react";
import { useMotionValueEvent } from "framer-motion";
import {
  BREAKPOINT_STOPS,
  MOBILE_SCROLL_HINT_MAX_PROGRESS,
  breakpointForWidth,
} from "./opening-crawl-config.js";
import { scrollDocumentToY } from "../../utils/space-resume-scroll";

export function useBreakpointStops() {
  const [breakpoint, setBreakpoint] = useState("lg");
  useEffect(() => {
    function handleResize() {
      const next = breakpointForWidth(window.innerWidth);
      setBreakpoint((prev) => (prev === next ? prev : next));
    }
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(
    () => ({
      breakpoint,
      stops1: BREAKPOINT_STOPS.para1[breakpoint],
      stops2: BREAKPOINT_STOPS.para2[breakpoint],
      stops3: BREAKPOINT_STOPS.para3[breakpoint],
      stops4: BREAKPOINT_STOPS.para4[breakpoint],
    }),
    [breakpoint],
  );
}

export function useMobileScrollBeginHint(crawlProgress) {
  const onMobileScrollToBegin = useCallback(() => {
    const max = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delta = window.innerHeight * (reduced ? 0.22 : 0.18);
    const next = Math.min(max, window.scrollY + delta);
    scrollDocumentToY(next, reduced ? "auto" : "smooth");
  }, []);

  const [mobileHintInteractive, setMobileHintInteractive] = useState(true);
  useEffect(() => {
    setMobileHintInteractive(
      crawlProgress.get() < MOBILE_SCROLL_HINT_MAX_PROGRESS,
    );
  }, [crawlProgress]);

  useMotionValueEvent(crawlProgress, "change", (p) => {
    setMobileHintInteractive(p < MOBILE_SCROLL_HINT_MAX_PROGRESS);
  });

  return { onMobileScrollToBegin, mobileHintInteractive };
}
