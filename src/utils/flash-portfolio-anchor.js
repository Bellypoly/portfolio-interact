/** Must run ≥ `.project-card--mission-flash` animation duration (see portfolio-section.css). */
const FLASH_CLASS = "project-card--mission-flash";
const CLEAR_MS = 2600;
const RETRY_MS = 90;
const MAX_ATTEMPTS = 28;

/**
 * One-shot highlight on the Mission Gallery `.project-card` inside `#anchorId`.
 * Retries briefly so lazy-loaded gallery can mount.
 */
export function flashPortfolioAnchor(anchorId, attempt = 0) {
  const wrap = document.getElementById(anchorId);
  const card = wrap?.querySelector(".project-card") ?? null;
  if (!wrap || !card) {
    if (attempt < MAX_ATTEMPTS) {
      window.setTimeout(
        () => flashPortfolioAnchor(anchorId, attempt + 1),
        RETRY_MS,
      );
    }
    return;
  }
  card.classList.remove(FLASH_CLASS);
  void card.offsetWidth;
  card.classList.add(FLASH_CLASS);
  window.setTimeout(() => card.classList.remove(FLASH_CLASS), CLEAR_MS);
}
