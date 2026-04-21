import { useState, useEffect } from "react";
import { NARROW_VIEWPORT_QUERY } from "./constants";

/**
 * Dock stays visible on narrow viewports; on md+ it hides when `scrollDirection === "down"`.
 */
export function useMarkerDockVisible(scrollDirection) {
  const [narrowViewport, setNarrowViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(NARROW_VIEWPORT_QUERY);
    const sync = () => setNarrowViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return narrowViewport || scrollDirection === "up";
}
