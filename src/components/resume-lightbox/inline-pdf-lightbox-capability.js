/**
 * Browsers without `pdfViewerEnabled`: guess from coarse desktop signals (Tailwind lg + mouse).
 */
export const LEGACY_INLINE_PDF_FALLBACK_MQ =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

/** iOS / iPadOS WebKit: `pdfViewerEnabled` can be true while iframe PDF is still not a proper multi-page viewer. */
export function isAppleTouchDocument() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent ?? "";
  const iPadOsDesktopUa =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/.test(ua) || iPadOsDesktopUa;
}

/**
 * True when the browser is likely to render a real inline PDF viewer in an iframe
 * (not a download, not iOS-style broken embed).
 */
export function canUseInlinePdfLightbox() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  if (isAppleTouchDocument()) return false;

  if (typeof navigator.pdfViewerEnabled === "boolean") {
    return navigator.pdfViewerEnabled;
  }
  return window.matchMedia(LEGACY_INLINE_PDF_FALLBACK_MQ).matches;
}
