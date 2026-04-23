import { seededRandom } from "./random";

export const STAR_COUNT = 200;
/** Fewer SVG nodes + no twinkle on touch / reduced-motion (Safari GPU). */
export const STAR_COUNT_SIMPLE = 64;

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
    x: Math.random() * w,
    y: Math.random() * h,
    size,
    o: baseOpacity + Math.random() * 0.3,
    twinkle: enableTwinkle ? makeTwinkle(i, layerIndex) : null,
  }));
}
