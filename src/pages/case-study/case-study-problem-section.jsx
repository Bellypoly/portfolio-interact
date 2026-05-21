import React from "react";
import CaseStudySection from "./case-study-section";
import CaseStudySystemDesign from "./case-study-system-design";
import CaseStudyFigures from "./case-study-figures";
import CaseStudyBeforeAfterCompare from "./case-study-before-after-compare";
import { CaseStudyDashBulletList } from "./case-study-dash-bullet-list";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";
import { renderReferenceFigureCaption } from "./case-study-renderers";

export default function CaseStudyProblemSection({
  section,
  baseUrl,
  sectionId,
}) {
  if (!section) return null;

  const {
    title,
    paragraphs,
    listGroups,
    figures,
    figureColumns,
    figureCaption,
    beforeAfterCompare,
    diagram,
  } = section;

  return (
    <>
      <CaseStudySection title={title} sectionId={sectionId}>
        {paragraphs?.map((p, i) => (
          <p key={i} className="project-case-study__p">
            {typeof p === "string" ? renderCaseStudyInlineRich(p) : p}
          </p>
        ))}
        {listGroups?.map((g) => (
          <div key={g.title} className="project-case-study__problem-group">
            <h3 className="project-case-study__h3">{g.title}</h3>
            <CaseStudyDashBulletList
              items={g.items}
              tight
              renderBullet={(item) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <>
                    {item.text}
                    {item.anchor ? (
                      <a
                        href={`#${item.anchor.id}`}
                        className="project-case-study__inline-link"
                      >
                        {item.anchor.label}
                      </a>
                    ) : null}
                    {item.after}
                  </>
                )
              }
            />
          </div>
        ))}
        {(beforeAfterCompare?.rows?.length || figures?.length) &&
        figureCaption ? (
          <p className="project-case-study__p project-case-study__p--figure-intro">
            {renderReferenceFigureCaption(figureCaption)}
          </p>
        ) : null}
        {beforeAfterCompare?.rows?.length ? (
          <CaseStudyBeforeAfterCompare
            block={beforeAfterCompare}
            baseUrl={baseUrl}
          />
        ) : figures?.length ? (
          <div
            id="before-screenshots"
            className="project-case-study__no-shadow"
          >
            <CaseStudyFigures
              figures={figures}
              columns={figureColumns ?? 2}
              baseUrl={baseUrl}
              embedded
            />
          </div>
        ) : null}
      </CaseStudySection>
      {diagram ? (
        <CaseStudySystemDesign systemDesign={diagram} baseUrl={baseUrl} />
      ) : null}
    </>
  );
}
