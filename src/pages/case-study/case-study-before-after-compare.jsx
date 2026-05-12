import React from "react";
import CaseStudyCaptionedFigure from "./case-study-captioned-figure";
import "./case-study-version-compare-diagram.css";
import "./case-study-before-after-compare.css";

/**
 * Before/after rows (BA chrome, same `--ba-*` as version compare).
 * `block.rows[]`: { rowTitle?, beforeTitle?, afterTitle?, before, after }
 * Each `before` / `after`: `{ img, imgWebp?, alt?, caption? }` **or** `{ text }` for prose-only panels.
 */
function renderBaSide(baseUrl, side) {
  if (!side) return null;
  if (side.img) {
    return (
      <CaseStudyCaptionedFigure
        baseUrl={baseUrl}
        img={side.img}
        imgWebp={side.imgWebp}
        alt={side.alt ?? ""}
        caption={side.caption}
        className="project-case-study__ba-shot m-0"
        imgClassName="project-case-study__figure-img w-full rounded-sm"
        captionClassName="project-case-study__caption mt-3 text-left"
      />
    );
  }
  if (side.text) {
    return (
      <p className="project-case-study__ba-panel-body">{side.text}</p>
    );
  }
  return null;
}

export default function CaseStudyBeforeAfterCompare({ block, baseUrl }) {
  const rows = block?.rows;
  if (!rows?.length) return null;

  return (
    <div
      id={block.anchorId}
      className="project-case-study__diagram project-case-study__diagram--before-after project-case-study__media-bleed project-case-study__no-shadow"
    >
      {block.diagramAlt ? <p className="sr-only">{block.diagramAlt}</p> : null}
      <div className="project-case-study__ba project-case-study__ba--article-compare">
        {rows.map((row, i) => (
          <div key={i} className="project-case-study__ba-compare-row">
            {row.rowTitle ? (
              <p className="project-case-study__ba-row-title">{row.rowTitle}</p>
            ) : null}
            <div className="project-case-study__ba-grid">
              <article className="project-case-study__ba-panel project-case-study__ba-panel--before">
                <h3 className="project-case-study__ba-panel-title">
                  {row.beforeTitle ?? "Before"}
                </h3>
                {renderBaSide(baseUrl, row.before)}
              </article>
              <article className="project-case-study__ba-panel project-case-study__ba-panel--after">
                <h3 className="project-case-study__ba-panel-title">
                  {row.afterTitle ?? "After"}
                </h3>
                {renderBaSide(baseUrl, row.after)}
              </article>
            </div>
          </div>
        ))}
      </div>
      {block.caption ? (
        <p className="project-case-study__caption mx-auto mt-6 max-w-none px-1">
          {block.caption}
        </p>
      ) : null}
    </div>
  );
}
