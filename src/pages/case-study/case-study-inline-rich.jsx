import React from "react";

/** `[[href|label]]` links: open obvious cross-origin URLs in a new tab. */
function isExternalDocumentHref(href) {
  const h = href.trim().toLowerCase();
  return (
    h.startsWith("http://") ||
    h.startsWith("https://") ||
    h.startsWith("//")
  );
}

function findItalicOpen(text, cursor) {
  for (let i = cursor; i < text.length; i += 1) {
    if (text[i] !== "_") continue;
    if (text[i + 1] === "_") continue;
    if (i > 0 && text[i - 1] === "_") continue;
    if (i + 1 >= text.length) continue;
    if (text[i + 1] === " ") continue;
    return i;
  }
  return -1;
}

function findItalicClose(text, open) {
  for (let i = open + 1; i < text.length; i += 1) {
    if (text[i] !== "_") continue;
    if (text[i + 1] === "_") continue;
    if (i > 0 && text[i - 1] === "_") continue;
    return i;
  }
  return -1;
}

function getNextInlineDelimiter(text, cursor) {
  const boldOpen = text.indexOf("**", cursor);
  const markOpen = text.indexOf("==", cursor);
  const pillarOpen = text.indexOf(">>", cursor);
  const emOpen = findItalicOpen(text, cursor);
  const linkOpen = text.indexOf("[[", cursor);
  let linkCandidate = null;
  if (linkOpen !== -1) {
    const linkClose = text.indexOf("]]", linkOpen + 2);
    if (linkClose !== -1) {
      const inner = text.slice(linkOpen + 2, linkClose);
      if (inner.includes("|")) {
        linkCandidate = {
          type: "link",
          open: linkOpen,
          openLen: 2,
          closeDelim: "]]",
          closeLen: 2,
        };
      }
    }
  }

  const candidates = [];
  if (boldOpen !== -1) {
    candidates.push({
      type: "strong",
      open: boldOpen,
      openLen: 2,
      closeDelim: "**",
      closeLen: 2,
    });
  }
  if (markOpen !== -1) {
    candidates.push({
      type: "mark",
      open: markOpen,
      openLen: 2,
      closeDelim: "==",
      closeLen: 2,
    });
  }
  if (pillarOpen !== -1) {
    candidates.push({
      type: "pillar",
      open: pillarOpen,
      openLen: 2,
      closeDelim: "<<",
      closeLen: 2,
    });
  }
  if (emOpen !== -1) {
    candidates.push({
      type: "em",
      open: emOpen,
      openLen: 1,
      closeLen: 1,
    });
  }
  if (linkCandidate) {
    candidates.push(linkCandidate);
  }

  if (!candidates.length) return null;
  return candidates.reduce((a, b) => (a.open <= b.open ? a : b));
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

    let close;
    if (next.type === "em") {
      close = findItalicClose(text, next.open);
    } else {
      close = text.indexOf(next.closeDelim, next.open + next.openLen);
    }

    if (close === -1) {
      if (next.type === "em") {
        segments.push({
          type: "plain",
          value: text.slice(next.open, next.open + next.openLen),
        });
        cursor = next.open + next.openLen;
        continue;
      }
      segments.push({ type: "plain", value: text.slice(next.open) });
      break;
    }

    const inner = text.slice(next.open + next.openLen, close);
    if (next.type === "em" && inner.trim() === "") {
      segments.push({
        type: "plain",
        value: text.slice(next.open, next.open + next.openLen),
      });
      cursor = next.open + next.openLen;
      continue;
    }

    if (next.type === "link") {
      const pipe = inner.indexOf("|");
      const href = inner.slice(0, pipe).trim();
      const label = inner.slice(pipe + 1);
      if (href === "") {
        segments.push({
          type: "plain",
          value: text.slice(next.open, next.open + next.openLen),
        });
        cursor = next.open + next.openLen;
        continue;
      }
      segments.push({ type: "link", href, label });
      cursor = close + next.closeLen;
      continue;
    }

    segments.push({
      type: next.type,
      value: inner,
    });
    cursor = close + next.closeLen;
  }

  return segments;
}

function shouldParseInlineRich(text) {
  return (
    typeof text === "string" &&
    (text.includes("**") ||
      text.includes("==") ||
      (text.includes(">>") && text.includes("<<")) ||
      text.includes("_") ||
      (text.includes("[[") && text.includes("]]") && text.includes("|")))
  );
}

/**
 * Inline prose for case-study copy:
 * - `==phrase==` -> editorial highlight (`<mark class="project-case-study__hl">`)
 * - `**text**` -> bold emphasis (`<strong>`)
 * - `_phrase_` -> italic (`<em class="project-case-study__em">`). Skips `__` pairs so double underscores stay literal.
 * - `>>text<<` -> inset left-rule “pillar” callout (same border as `.project-case-study__pillars`).
 *   Uses doubled `>>` / `<<` so a lone `>` (e.g. comparisons) does not trigger parsing.
 *   Renders as a block-level `span` so it stays valid inside `<p>` (no nested `<ul>`).
 * - `[[href|label]]` -> link (`<a class="project-case-study__inline-link">`). Label supports nested markers.
 *   `http://`, `https://`, and `//` hrefs use `target="_blank"` and `rel="noopener noreferrer"`; other hrefs stay same-tab.
 */
export function renderCaseStudyInlineRich(text) {
  if (typeof text !== "string") return text;
  if (!shouldParseInlineRich(text)) {
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
    if (seg.type === "em") {
      return (
        <em key={`e-${si}`} className="project-case-study__em">
          {renderCaseStudyInlineRich(seg.value)}
        </em>
      );
    }
    if (seg.type === "pillar") {
      return (
        <span
          key={`pl-${si}`}
          className="project-case-study__pillars project-case-study__pillars--inline"
          role="note"
        >
          <span className="project-case-study__inline-pillar-body">
            {renderCaseStudyInlineRich(seg.value)}
          </span>
        </span>
      );
    }
    if (seg.type === "link") {
      const openNewTab = isExternalDocumentHref(seg.href);
      return (
        <a
          key={`a-${si}`}
          href={seg.href}
          className="project-case-study__inline-link"
          target={openNewTab ? "_blank" : undefined}
          rel={openNewTab ? "noopener noreferrer" : undefined}
        >
          {renderCaseStudyInlineRich(seg.label)}
        </a>
      );
    }
    return <React.Fragment key={`p-${si}`}>{seg.value}</React.Fragment>;
  });
}
