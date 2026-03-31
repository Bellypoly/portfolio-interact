import React from "react";
import "./CaseStudyUxFrictionCompare.css";

/**
 * Before/after UX friction summary (replaces static annotated SVG in UX section).
 */
export default function CaseStudyUxFrictionCompare({
  before,
  after,
  caption,
}) {
  const beforeItems = before?.items?.filter(Boolean) ?? [];
  const afterItems = after?.items?.filter(Boolean) ?? [];
  if (!beforeItems.length && !afterItems.length) return null;

  const beforeLabel = before?.title ?? "Before";
  const afterLabel = after?.title ?? "After";

  return (
    <figure className="project-case-study__ux-compare">
      <div
        className="project-case-study__ux-compare-panels"
        role="group"
        aria-label={`${beforeLabel} and ${afterLabel}: UX friction`}
      >
        <div className="project-case-study__ux-compare-panel project-case-study__ux-compare-panel--before">
          <p className="project-case-study__ux-compare-title">{beforeLabel}</p>
          <ul className="project-case-study__ux-compare-list">
            {beforeItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="project-case-study__ux-compare-panel project-case-study__ux-compare-panel--after">
          <p className="project-case-study__ux-compare-title">{afterLabel}</p>
          <ul className="project-case-study__ux-compare-list">
            {afterItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {caption ? (
        <figcaption className="project-case-study__caption">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
