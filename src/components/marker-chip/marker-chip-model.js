import { DEFAULT_HIDDEN_MARKER_IDS } from "./constants";

/**
 * @param {{ id: string }[]} sections
 * @param {string[]} hiddenIds
 * @returns {{ section: { id: string, title?: string }, index: number }[]}
 */
export function listMarkerSections(sections, hiddenIds = DEFAULT_HIDDEN_MARKER_IDS) {
  const hidden = new Set(hiddenIds);
  const out = [];
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (!hidden.has(section.id)) out.push({ section, index: i });
  }
  return out;
}
