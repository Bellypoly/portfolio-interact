/**
 * Scroll metrics for SpaceResume (debug HUD).
 */
export function getScrollMetrics() {
  const y = window.scrollY;
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const progress = maxScroll > 0 ? y / maxScroll : 0;
  const tolerance = maxScroll > 0 ? 2 / maxScroll : 0;
  return { y, maxScroll, progress, tolerance };
}

/** Horizontal line in the viewport used for scroll-spy (ratio of inner height). */
export const SCROLL_SPY_PROBE_RATIO = 0.32;

/**
 * Active section = the one whose layout box **contains** the probe line
 * (a band ~1/3 down the viewport). Stays stable through very tall blocks
 * (e.g. Mission Gallery) until that line leaves the section.
 *
 * If the probe falls in a gap (no hit), falls back to the last section whose
 * top edge is above the probe (same idea as a classic “past heading” stack).
 */
export function resolveActiveIndexFromViewportProbe(
  sectionRefs,
  count,
  probeRatio = SCROLL_SPY_PROBE_RATIO,
) {
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const probeY = vh * probeRatio;

  for (let i = 0; i < count; i++) {
    const el = sectionRefs.current[i]?.current;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= probeY && r.bottom >= probeY) return i;
  }

  let fallback = 0;
  for (let i = 0; i < count; i++) {
    const el = sectionRefs.current[i]?.current;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= probeY) fallback = i;
  }
  return fallback;
}

/**
 * Dev-only: per-section geometry vs probe line (for debugging marker timing).
 */
export function getSectionScrollSpyDebug(
  sectionRefs,
  count,
  probeRatio = SCROLL_SPY_PROBE_RATIO,
  sectionIds = [],
) {
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const probeY = vh * probeRatio;
  const rows = [];
  for (let i = 0; i < count; i++) {
    const el = sectionRefs.current[i]?.current;
    const id = sectionIds[i] ?? String(i);
    if (!el) {
      rows.push({
        index: i,
        id,
        top: null,
        bottom: null,
        height: null,
        throughPct: null,
        containsProbe: false,
      });
      continue;
    }
    const r = el.getBoundingClientRect();
    const top = Math.round(r.top);
    const bottom = Math.round(r.bottom);
    const h = r.height;
    /** 0–100: where the probe line sits within this section's box (0 = probe at top edge, 100 = at bottom). */
    let throughPct = null;
    if (h > 0) {
      const raw = ((probeY - r.top) / h) * 100;
      throughPct = Math.max(0, Math.min(100, raw));
    }
    rows.push({
      index: i,
      id,
      top,
      bottom,
      height: Math.round(h),
      throughPct,
      containsProbe: r.top <= probeY && r.bottom >= probeY,
    });
  }
  const active = resolveActiveIndexFromViewportProbe(
    sectionRefs,
    count,
    probeRatio,
  );
  return { probeY: Math.round(probeY), rows, active };
}

/** Format milliseconds for HUD (e.g. dwell time). */
export function formatDurationMs(ms) {
  if (ms == null || Number.isNaN(ms)) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  return `${m}m ${rs.toFixed(0)}s`;
}

/** Matches `.crawl-content` in `sections/opening-crawl-section/opening-crawl.css` (nested overflow-y scroll). */
const OPENING_CRAWL_SCROLLABLE_SELECTOR = ".crawl-content";

/**
 * Instant jump to the layout scroll origin. Uses `behavior: "auto"` so wheel/touch
 * cannot strand the page mid–smooth-scroll (Framer `scrollYProgress` would lag).
 */
export function scrollDocumentToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Clears OpeningCrawl's inner scroller so copy matches window progress at top.
 * Sync + next frame: one `querySelector`, same node reference after layout.
 */
export function resetOpeningCrawlScroller() {
  if (typeof document === "undefined") return;
  const el = document.querySelector(OPENING_CRAWL_SCROLLABLE_SELECTOR);
  if (!el) return;
  el.scrollTop = 0;
  requestAnimationFrame(() => {
    el.scrollTop = 0;
  });
}

/**
 * Set the URL hash without scrolling. Used for marker index 0: scroll is y=0,
 * not aligning the viewport to `#intro`'s element top.
 */
export function replaceHistoryHash(sectionId) {
  if (typeof window === "undefined" || !sectionId) return;
  let path = window.location.pathname;
  /* Prefer `/base/#hash` over `/base#hash` when the router omits a trailing slash. */
  if (path.length > 1 && !path.endsWith("/")) path = `${path}/`;
  const url = `${path}${window.location.search}#${sectionId}`;
  window.history.replaceState(null, "", url);
}

/** Scroll the document to an absolute Y (e.g. section offset). */
export function scrollDocumentToY(top, behavior = "smooth") {
  if (typeof window === "undefined") return;
  window.scrollTo({ top, left: 0, behavior });
}
