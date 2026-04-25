/** Session key: window.scrollY on mission page right before opening a project. */
export const SPACE_RESUME_SCROLL_KEY = "spaceResume:missionScrollY";

/** Set on router state when opening a case study from a mission gallery card. */
export const SPACE_RESUME_FROM_MISSION = "spaceResumeFromMission";

export function rememberMissionScrollBeforeProject() {
  try {
    sessionStorage.setItem(SPACE_RESUME_SCROLL_KEY, String(window.scrollY));
  } catch {
    /* ignore quota / private mode */
  }
}

/** @returns {number | null} */
export function consumeMissionScrollRestore() {
  try {
    const raw = sessionStorage.getItem(SPACE_RESUME_SCROLL_KEY);
    sessionStorage.removeItem(SPACE_RESUME_SCROLL_KEY);
    if (raw == null) return null;
    const y = Number(raw);
    return Number.isFinite(y) && y >= 0 ? y : null;
  } catch {
    return null;
  }
}
