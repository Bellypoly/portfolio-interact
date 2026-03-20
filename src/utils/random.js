/**
 * Seeded pseudo-random number generator.
 * Same seed always returns the same value (0–1).
 */
export function seededRandom(seed) {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
}
