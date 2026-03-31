import React from "react";
import CaseStudySection from "./CaseStudySection";
import CaseStudyLightboxImage from "./CaseStudyLightboxImage";

/**
 * One or more captioned figures (WebP optional). Use columns=2 for side-by-side on md+.
 */
export default function CaseStudyFigures({
  title,
  intro,
  figures,
  columns = 2,
  baseUrl,
  /** When true, render only the grid (and optional intro) — nest inside CaseStudySection. */
  embedded = false,
}) {
  if (!figures?.length) return null;

  const gridClass =
    columns === 3
      ? "project-case-study__figure-grid project-case-study__figure-grid--3"
      : columns === 2
        ? "project-case-study__figure-grid project-case-study__figure-grid--2"
        : "project-case-study__figure-grid project-case-study__figure-grid--1";

  const grid = (
    <div className={gridClass}>
      {figures.map((f) => (
        <figure key={f.alt || f.caption} className="project-case-study__figure">
          {f.img ? (
            <CaseStudyLightboxImage
              baseUrl={baseUrl}
              img={f.img}
              imgWebp={f.imgWebp}
              alt={f.alt || f.caption || "Case study figure"}
            />
          ) : null}
          {f.caption ? (
            <figcaption className="project-case-study__caption">
              {f.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );

  const inner = (
    <>
      {intro ? <p className="project-case-study__p">{intro}</p> : null}
      {grid}
    </>
  );

  if (embedded) return inner;

  return <CaseStudySection title={title}>{inner}</CaseStudySection>;
}
