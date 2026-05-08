/** Must run ≥ `.project-card--mission-flash` animation duration (see portfolio-section.css). */
const FLASH_CLASS = "project-card--mission-flash";
const CLEAR_MS = 2600;
const RETRY_MS = 90;
const MAX_ATTEMPTS = 28;

/** @param {string | string[] | null | undefined} anchorIdOrIds */
function normalizePortfolioAnchors(anchorIdOrIds) {
  if (anchorIdOrIds == null) return [];
  const raw = Array.isArray(anchorIdOrIds)
    ? anchorIdOrIds
    : [anchorIdOrIds];
  return [...new Set(raw.filter((id) => id != null && String(id).trim() !== ""))];
}

/**
 * First hash fragment for `<a href="#…">` when `portfolioAnchor` may be a list.
 * @param {string | string[] | null | undefined} anchorIdOrIds
 */
export function firstPortfolioHashFragment(anchorIdOrIds) {
  const ids = normalizePortfolioAnchors(anchorIdOrIds);
  return ids[0] ?? "";
}

/**
 * One-shot highlight on Mission Gallery `.project-card`s inside each `#anchorId`.
 * Pass several ids to flash every related tile (each id must be unique in the document).
 * Retries briefly so lazy-loaded gallery can mount.
 */
export function flashPortfolioAnchor(anchorIdOrIds, attempt = 0) {
  const ids = normalizePortfolioAnchors(anchorIdOrIds);
  if (ids.length === 0) return;

  const cards = [];
  for (const id of ids) {
    const wrap = document.getElementById(id);
    const card = wrap?.querySelector(".project-card") ?? null;
    if (!wrap || !card) {
      if (attempt < MAX_ATTEMPTS) {
        window.setTimeout(
          () => flashPortfolioAnchor(anchorIdOrIds, attempt + 1),
          RETRY_MS,
        );
      }
      return;
    }
    cards.push(card);
  }

  for (const card of cards) {
    card.classList.remove(FLASH_CLASS);
  }
  void cards[0]?.offsetWidth;
  for (const card of cards) {
    card.classList.add(FLASH_CLASS);
  }
  window.setTimeout(() => {
    for (const card of cards) {
      card.classList.remove(FLASH_CLASS);
    }
  }, CLEAR_MS);
}

/**
 * Smooth-scroll to the topmost matching gallery anchor (or `#portfolio`), set hash to the first id, then flash all listed cards.
 * @param {string | string[]} anchorIdOrIds
 */
export function scrollToPortfolioAnchor(anchorIdOrIds) {
  const ids = normalizePortfolioAnchors(anchorIdOrIds);
  if (ids.length === 0) return;

  const wraps = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const portfolioSection = document.getElementById("portfolio");

  const scrollTarget =
    wraps.length > 0
      ? wraps.reduce((top, el) => {
          const yTop =
            top.getBoundingClientRect().top + window.scrollY;
          const yEl = el.getBoundingClientRect().top + window.scrollY;
          return yTop <= yEl ? top : el;
        })
      : portfolioSection;

  scrollTarget?.scrollIntoView({ behavior: "smooth" });
  window.location.hash = ids[0];
  window.setTimeout(() => flashPortfolioAnchor(anchorIdOrIds), 380);
}
