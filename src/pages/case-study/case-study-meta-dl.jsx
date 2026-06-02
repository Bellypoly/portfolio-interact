import React from "react";
import { EXTERNAL_LINK_PROPS } from "../../utils/external-link-props";

function normalizeStackItems(techStack) {
  if (!techStack) return [];
  const raw = Array.isArray(techStack) ? techStack : [techStack];
  return raw.filter(Boolean);
}

function StackEntry({ item, index }) {
  if (typeof item === "string") {
    return (
      <span key={`${item}-${index}`} className="project-case-study__stack-text">
        {item}
      </span>
    );
  }
  const { label, href } = item;
  if (!label) return null;
  if (!href) {
    return (
      <span
        key={`${label}-${index}`}
        className="project-case-study__stack-text"
      >
        {label}
      </span>
    );
  }
  return (
    <a
      key={href + label}
      href={href}
      className="project-case-study__stack-link"
      {...EXTERNAL_LINK_PROPS}
    >
      {label}
    </a>
  );
}

function renderContext(context) {
  if (context && typeof context === "object") {
    const summary = typeof context.summary === "string" ? context.summary : "";
    const detail = typeof context.detail === "string" ? context.detail : "";
    if (summary || detail) {
      return (
        <div className="project-case-study__meta-context">
          {summary ? (
            <p className="project-case-study__meta-context-summary">
              {summary}
            </p>
          ) : null}
          {detail ? (
            <p className="project-case-study__meta-context-detail">{detail}</p>
          ) : null}
        </div>
      );
    }
  }
  return context;
}

/** Focus + Context (+ optional Stack) definition list (Task section and standalone layout). */
export default function CaseStudyMetaDl({
  focus,
  /** `focus` may be an exact string line or an array. */
  context,
  techStack,
}) {
  const stackItems = normalizeStackItems(techStack);
  const focusText =
    typeof focus === "string" && focus.trim()
      ? focus.trim()
      : Array.isArray(focus)
        ? focus.filter(Boolean).join(" · ")
        : "";

  return (
    <dl className="project-case-study__meta">
      <div className="project-case-study__meta-row">
        <dt className="project-case-study__meta-term">Focus</dt>
        <dd className="project-case-study__meta-def">{focusText}</dd>
      </div>
      <div className="project-case-study__meta-row">
        <dt className="project-case-study__meta-term">Context</dt>
        <dd className="project-case-study__meta-def">
          {renderContext(context)}
        </dd>
      </div>
      {stackItems.length ? (
        <div className="project-case-study__meta-row">
          <dt className="project-case-study__meta-term">Stack</dt>
          <dd className="project-case-study__meta-def">
            {stackItems.map((item, i) => (
              <React.Fragment
                key={
                  typeof item === "string"
                    ? `${item}-${i}`
                    : (item.href ?? item.label) + i
                }
              >
                {i > 0 ? (
                  <span
                    className="project-case-study__stack-sep"
                    aria-hidden="true"
                  >
                    {" "}
                    ·{" "}
                  </span>
                ) : null}
                <StackEntry item={item} index={i} />
              </React.Fragment>
            ))}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
