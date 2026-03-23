/**
 * Scroll metrics for section-based active index (used by SpaceResume).
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

/**
 * Normalized top positions of each section (0–1 of document scroll range).
 */
export function buildSectionThresholds(sectionRefs, maxScroll, y, count) {
  const thresholds = [];
  for (let i = 0; i < count; i++) {
    const ref = sectionRefs.current[i];
    if (ref?.current && maxScroll > 0) {
      const top = ref.current.getBoundingClientRect().top + y;
      thresholds.push(top / maxScroll);
    } else {
      thresholds.push(i / count);
    }
  }
  return thresholds;
}

/** Largest section index whose threshold is not ahead of current scroll progress. */
export function resolveActiveIndex(progress, thresholds, tolerance) {
  let idx = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (progress >= thresholds[i] - tolerance) idx = i;
  }
  return idx;
}
