import { useEffect, useRef } from "react";

/**
 * While `open`, locks `document.body` overflow and calls `onClose` on Escape.
 * `onClose` is read from a ref so the effect does not re-subscribe every render.
 */
export function useModalPortalLock(open, onClose) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
}
