import React from "react";

function getNextInlineDelimiter(text, cursor) {
  const boldOpen = text.indexOf("**", cursor);
  const markOpen = text.indexOf("==", cursor);

  if (boldOpen === -1 && markOpen === -1) return null;
  if (boldOpen === -1) return { type: "mark", open: markOpen, delimiter: "==" };
  if (markOpen === -1) {
    return { type: "strong", open: boldOpen, delimiter: "**" };
  }

  return boldOpen < markOpen
    ? { type: "strong", open: boldOpen, delimiter: "**" }
    : { type: "mark", open: markOpen, delimiter: "==" };
}

function parseInlineRich(text) {
  const segments = [];
  let cursor = 0;

  while (cursor < text.length) {
    const next = getNextInlineDelimiter(text, cursor);
    if (!next) {
      segments.push({ type: "plain", value: text.slice(cursor) });
      break;
    }

    if (next.open > cursor) {
      segments.push({ type: "plain", value: text.slice(cursor, next.open) });
    }

    const close = text.indexOf(next.delimiter, next.open + 2);
    if (close === -1) {
      segments.push({ type: "plain", value: text.slice(next.open) });
      break;
    }

    segments.push({
      type: next.type,
      value: text.slice(next.open + 2, close),
    });
    cursor = close + 2;
  }

  return segments;
}

/**
 * Inline prose for case-study copy:
 * - `==phrase==` -> editorial highlight (`<mark>`)
 * - `**text**` -> bold emphasis (`<strong>`)
 */
export function renderCaseStudyInlineRich(text) {
  if (typeof text !== "string") return text;
  if (!text.includes("==") && !text.includes("**")) {
    return text;
  }

  const segments = parseInlineRich(text);
  return segments.map((seg, si) => {
    if (seg.type === "mark") {
      return (
        <mark key={`m-${si}`} className="project-case-study__hl">
          {renderCaseStudyInlineRich(seg.value)}
        </mark>
      );
    }
    if (seg.type === "strong") {
      return (
        <strong key={`s-${si}`} className="project-case-study__strong">
          {renderCaseStudyInlineRich(seg.value)}
        </strong>
      );
    }
    return <React.Fragment key={`p-${si}`}>{seg.value}</React.Fragment>;
  });
}
