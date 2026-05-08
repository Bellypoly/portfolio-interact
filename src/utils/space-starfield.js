import { seededRandom } from "./random.js";

/**
 * Coarse viewport buckets so resize does not rebuild all SVG stars on every 1px change.
 * viewBox + star positions use the bucketed size (SVG scales to the real window).
 */
export const STARFIELD_VIEWPORT_BUCKET_PX = 240;

export function bucketViewportForStarfield(width, height) {
  const w = Math.max(
    320,
    Math.ceil(width / STARFIELD_VIEWPORT_BUCKET_PX) *
      STARFIELD_VIEWPORT_BUCKET_PX,
  );
  const h = Math.max(
    480,
    Math.ceil(height / STARFIELD_VIEWPORT_BUCKET_PX) *
      STARFIELD_VIEWPORT_BUCKET_PX,
  );
  return { width: w, height: h };
}

/** Reduced-motion / touch: fewer nodes, no twinkle. */
export const STAR_COUNT_SIMPLE = 48;

/** Full-motion counts scale with width (stars per layer × 3 layers in `space-resume`). */
export function resolveStarCount(viewportWidth, preferSimpleMotion) {
  if (preferSimpleMotion) return STAR_COUNT_SIMPLE;
  if (viewportWidth < 640) return 72;
  if (viewportWidth < 1024) return 96;
  return 120;
}

export const STAR_LAYER_DEFS = [
  {
    key: "far",
    size: 0.39,
    baseOpacity: 0.3,
    parallax: 12,
    scrollEnd: "-30vh",
  },
  {
    key: "mid",
    size: 0.42,
    baseOpacity: 0.4,
    parallax: 24,
    scrollEnd: "-60vh",
  },
  {
    key: "near",
    size: 0.45,
    baseOpacity: 0.5,
    parallax: 40,
    scrollEnd: "-100vh",
  },
];

export function makeTwinkle(i, layer) {
  if (seededRandom(i + 42 + layer * 1000) >= 0.15) return null;
  return {
    phase: seededRandom(i + 99 + layer * 1000) * 2 * Math.PI,
    duration: 2.5 + seededRandom(i + 123 + layer * 1000) * 1.5,
  };
}

export function generateStarLayer(
  count,
  layerIndex,
  size,
  baseOpacity,
  w,
  h,
  enableTwinkle,
) {
  return Array.from({ length: count }, (_, i) => ({
    x: seededRandom(i + layerIndex * 2000) * w,
    y: seededRandom(i + 17 + layerIndex * 2000) * h,
    size,
    o: baseOpacity + seededRandom(i + 31 + layerIndex * 2000) * 0.3,
    twinkle: enableTwinkle ? makeTwinkle(i, layerIndex) : null,
  }));
}
