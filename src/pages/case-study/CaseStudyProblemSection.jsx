import React from "react";
import CaseStudySection from "./CaseStudySection";
import CaseStudySystemDesign from "./CaseStudySystemDesign";
import CaseStudyFigures from "./CaseStudyFigures";
import CaseStudyBeforeAfterCompare from "./CaseStudyBeforeAfterCompare";

/** `figureCaption`: plain string or `{ text, externalLink?, after? }` (same shape as reference figure captions). */
function renderProblemFigureCaption(caption) {
  if (caption == null) return null;
  if (typeof caption === "string") return caption;
  if (caption.externalLink) {
    return (
      <>
        {caption.text}
        <a
          href={caption.externalLink.href}
          className="project-case-study__inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {caption.externalLink.label}
        </a>
        {caption.after}
      </>
    );
  }
  return caption.text ?? null;
}

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
            {p}
          </p>
        ))}
        {listGroups?.map((g) => (
          <div key={g.title} className="project-case-study__problem-group">
            <h3 className="project-case-study__h3">{g.title}</h3>
            <ul className="project-case-study__bullet-list project-case-study__bullet-list--tight">
              {g.items.map((item, i) =>
                typeof item === "string" ? (
                  <li key={i} className="project-case-study__bullet-item">
                    {item}
                  </li>
                ) : (
                  <li key={i} className="project-case-study__bullet-item">
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
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
        {(beforeAfterCompare?.rows?.length || figures?.length) &&
        figureCaption ? (
          <p className="project-case-study__p project-case-study__p--figure-intro">
            {renderProblemFigureCaption(figureCaption)}
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
