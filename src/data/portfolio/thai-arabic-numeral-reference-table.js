/**
 * Shared Western Arabic vs Thai numeral (๐–๙) reference for OCR case studies.
 * Renders as a transpose `referenceTable` paragraph (see `renderCaseStudyParagraph`).
 */

const DIGITS_ARABIC = Object.freeze([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);

const DIGITS_THAI = Object.freeze([
  "๐",
  "๑",
  "๒",
  "๓",
  "๔",
  "๕",
  "๖",
  "๗",
  "๘",
  "๙",
]);

/** Header row = Latin digits; second row = Thai numerals (same positions). */
export const THAI_ARABIC_NUMERAL_REFERENCE_ROWS_COMPACT = Object.freeze([
  DIGITS_ARABIC,
  DIGITS_THAI,
]);

/** First column labels each glyph row, then digits 0–9 / ๐–๙. */
export const THAI_ARABIC_NUMERAL_REFERENCE_ROWS_LABELED = Object.freeze([
  Object.freeze(["Western Arabic", ...DIGITS_ARABIC]),
  Object.freeze(["Thai numerals", ...DIGITS_THAI]),
]);

/**
 * @param {object} opts
 * @param {string} opts.caption — project-specific copy under the table.
 * @param {"compact" | "labeled"} [opts.rows="compact"] — `compact` matches VOTE62; `labeled` adds row headers.
 * @returns {Readonly<{ referenceTable: Readonly<object> }>}
 */
export function makeThaiArabicNumeralReferenceTableParagraph({
  caption,
  rows = "compact",
}) {
  const rowData =
    rows === "labeled"
      ? THAI_ARABIC_NUMERAL_REFERENCE_ROWS_LABELED
      : THAI_ARABIC_NUMERAL_REFERENCE_ROWS_COMPACT;
  return Object.freeze({
    referenceTable: Object.freeze({
      transpose: true,
      rows: rowData,
      caption,
    }),
  });
}
