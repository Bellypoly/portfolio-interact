import React from "react";
import CaseStudyLightboxImage from "./CaseStudyLightboxImage";
import "./CaseStudyVersionCompareDiagram.css";
import "./CaseStudyBeforeAfterCompare.css";

/**
 * Before/after screenshot rows (BA chrome, same `--ba-*` as version compare).
 * `block.rows[]`: { rowTitle?, beforeTitle?, afterTitle?, before, after }
 * before/after: { img, imgWebp?, alt, caption? }
 */
export default function CaseStudyBeforeAfterCompare({ block, baseUrl }) {
  const rows = block?.rows;
  if (!rows?.length) return null;

  return (
    <div
      id={block.anchorId}
      className="project-case-study__diagram project-case-study__diagram--before-after project-case-study__media-bleed project-case-study__no-shadow"
    >
      {block.diagramAlt ? (
        <p className="sr-only">{block.diagramAlt}</p>
      ) : null}
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
                <figure className="project-case-study__ba-shot m-0">
                  <CaseStudyLightboxImage
                    baseUrl={baseUrl}
                    img={row.before.img}
                    imgWebp={row.before.imgWebp}
                    alt={row.before.alt ?? ""}
                    imgClassName="project-case-study__figure-img w-full rounded-sm"
                  />
                  {row.before.caption ? (
                    <figcaption className="project-case-study__caption mt-3 text-left">
                      {row.before.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </article>
              <article className="project-case-study__ba-panel project-case-study__ba-panel--after">
                <h3 className="project-case-study__ba-panel-title">
                  {row.afterTitle ?? "After"}
                </h3>
                <figure className="project-case-study__ba-shot m-0">
                  <CaseStudyLightboxImage
                    baseUrl={baseUrl}
                    img={row.after.img}
                    imgWebp={row.after.imgWebp}
                    alt={row.after.alt ?? ""}
                    imgClassName="project-case-study__figure-img w-full rounded-sm"
                  />
                  {row.after.caption ? (
                    <figcaption className="project-case-study__caption mt-3 text-left">
                      {row.after.caption}
                    </figcaption>
                  ) : null}
                </figure>
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
