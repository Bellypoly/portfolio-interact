import React from "react";
import CaseStudyCaptionedFigure from "./case-study-captioned-figure";
import CaseStudyMediaSection from "./case-study-media-section";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";

/** Captioned figures; `columns={3}` wraps grid in `media-bleed` + `wide-inner`.
 *  Optional `fullRow: true` on a figure spans all grid columns so mixed layouts work
 *  (e.g. full-width rows then a two-up row). */
export default function CaseStudyFigures({
  title,
  intro,
  figures,
  columns = 2,
  baseUrl,
  /** When true, render only the grid (and optional intro) — nest inside CaseStudySection. */
  embedded = false,
  /** Appended to the `columns === 3` bleed wrapper (e.g. `project-case-study__section--embed`). */
  mediaBleedClassName,
}) {
  if (!figures?.length) return null;

  const gridClass =
    columns === 3
      ? "project-case-study__figure-grid project-case-study__figure-grid--3"
      : columns === 2
        ? "project-case-study__figure-grid project-case-study__figure-grid--2"
        : "project-case-study__figure-grid project-case-study__figure-grid--1";

  const gridInner = (
    <div className={gridClass}>
      {figures.map((f, i) => (
        <CaseStudyCaptionedFigure
          key={f.alt || f.caption || i}
          baseUrl={baseUrl}
          img={f.img}
          imgWebp={f.imgWebp}
          alt={f.alt || f.caption || "Case study figure"}
          caption={f.caption}
          className={
            f.fullRow
              ? "project-case-study__figure project-case-study__figure--full-row"
              : "project-case-study__figure"
          }
        />
      ))}
    </div>
  );

  const grid =
    columns === 3 ? (
      <div
        className={`project-case-study__media-bleed${mediaBleedClassName ? ` ${mediaBleedClassName}` : ""}`}
      >
        <div className="project-case-study__wide-inner">{gridInner}</div>
      </div>
    ) : (
      gridInner
    );

  if (embedded) {
    return (
      <>
        {intro ? (
          <p className="project-case-study__p">
            {typeof intro === "string"
              ? renderCaseStudyInlineRich(intro)
              : intro}
          </p>
        ) : null}
        {grid}
      </>
    );
  }

  return (
    <CaseStudyMediaSection title={title} intro={intro}>
      {grid}
    </CaseStudyMediaSection>
  );
}
