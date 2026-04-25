/**
 * Dock is visible only while the user is scrolling toward the top of the page
 * (`scrollDirection === "up"` in SpaceResume — i.e. scrollY decreasing).
 * Same rule on all breakpoints so mobile matches desktop (no always-on rail).
 */
export function useMarkerDockVisible(scrollDirection) {
  return scrollDirection === "up";
}
