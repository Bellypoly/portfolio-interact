import React from "react";
import CaseStudySection from "./case-study-section";

/**
 * Optional draft area for media or copy you will add later.
 * Remove `placeholderBlock` from the project’s caseStudy when shipping.
 */
export default function CaseStudyPlaceholderBlock({ block }) {
  if (!block?.body) return null;

  return (
    <CaseStudySection title={block.title}>
      <div
        className="project-case-study__placeholder-box max-w-none"
        aria-label="Draft placeholder content"
      >
        <p className="project-case-study__p project-case-study__p--tight m-0 text-stone-600">
          {block.body}
        </p>
      </div>
    </CaseStudySection>
  );
}
