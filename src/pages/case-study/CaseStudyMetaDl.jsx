import React from "react";

/** Focus + Context definition list (shared by Task section and standalone layout). */
export default function CaseStudyMetaDl({ disciplines, context }) {
  return (
    <dl className="project-case-study__meta">
      <div className="project-case-study__meta-row">
        <dt className="project-case-study__meta-term">Focus</dt>
        <dd className="project-case-study__meta-def">{disciplines.join(" · ")}</dd>
      </div>
      <div className="project-case-study__meta-row">
        <dt className="project-case-study__meta-term">Context</dt>
        <dd className="project-case-study__meta-def">{context}</dd>
      </div>
    </dl>
  );
}
