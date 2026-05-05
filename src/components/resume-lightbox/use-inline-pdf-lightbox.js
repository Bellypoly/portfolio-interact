import { useEffect, useState } from "react";
import {
  LEGACY_INLINE_PDF_FALLBACK_MQ,
  canUseInlinePdfLightbox,
} from "./inline-pdf-lightbox-capability";

/** Re-evaluates when viewport / pointer hints change (legacy path) or on mount. */
export function useInlinePdfLightbox() {
  const [allowed, setAllowed] = useState(() =>
    typeof window !== "undefined" ? canUseInlinePdfLightbox() : false,
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const sync = () => setAllowed(canUseInlinePdfLightbox());
    sync();

    const mq = window.matchMedia(LEGACY_INLINE_PDF_FALLBACK_MQ);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return allowed;
}
