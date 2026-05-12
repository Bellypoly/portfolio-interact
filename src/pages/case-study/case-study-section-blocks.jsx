import React from "react";
import { CaseStudyDashBulletList } from "./case-study-dash-bullet-list";
import { CaseStudyResultsList } from "./case-study-renderers";

/** Stat grid used by checkout / clarity `sectionResults` (and similar). */
export function CaseStudySectionStatRows({ rows }) {
  return (
    <CaseStudyResultsList
      rows={rows}
      className="project-case-study__results mt-6"
    />
  );
}

export function CaseStudySectionBulletList({ items }) {
  return (
    <CaseStudyDashBulletList items={items} renderBullet={(b) => b} />
  );
}

export function CaseStudySectionLead({ lead }) {
  if (!lead) return null;
  return <p className="project-case-study__p">{lead}</p>;
}
