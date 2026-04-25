import React from "react";
import { Link } from "react-router-dom";
import CaseStudyAsciiDiagram from "./case-study-ascii-diagram";
import CaseStudyLightboxImage from "./case-study-lightbox-image";
import CaseStudySection from "./case-study-section";

/** Optional `{ title, intro?, rows, figureCaption?, figure? }` — e.g. impactAfterV2 / impactAfterV3. */
export function CaseStudyImpactBlock({ block, baseUrl, sectionId }) {
  if (!block?.rows?.length) return null;
  const caption = block.figureCaption;
  const fig = block.figure;
  return (
    <CaseStudySection title={block.title || "Impact"} sectionId={sectionId}>
      {block.intro ? (
        <p className="project-case-study__p">{block.intro}</p>
      ) : null}
      <ul className="project-case-study__results mt-6 md:mt-8" role="list">
        {block.rows.map((row) => (
          <li key={row.label} className="project-case-study__result">
            <span className="project-case-study__result-value">
              {row.value}
            </span>
            <span className="project-case-study__result-label">
              {row.label}
            </span>
          </li>
        ))}
      </ul>
      {fig?.img ? (
        <figure className="project-case-study__figure mt-6 md:mt-8">
          <CaseStudyLightboxImage
            baseUrl={baseUrl}
            img={fig.img}
            imgWebp={fig.imgWebp}
            alt={fig.alt ?? ""}
          />
          {caption ? (
            <figcaption className="project-case-study__caption">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      ) : caption ? (
        <figure className="project-case-study__figure mt-6 md:mt-8">
          <figcaption className="project-case-study__caption">
            {caption}
          </figcaption>
        </figure>
      ) : null}
    </CaseStudySection>
  );
}

/** Overview / case study media: `type: "image"` + `src`, or `type: "ascii"` + `lines`. */
export function renderCaseStudyMediaBlock(mediaBlock, key, baseUrl) {
  if (!mediaBlock) return null;

  if (mediaBlock.type === "ascii" && mediaBlock.lines?.length) {
    const asciiFigureClass =
      mediaBlock.compact === false
        ? "project-case-study__figure project-case-study__figure--full mt-6 md:mt-7"
        : "project-case-study__figure project-case-study__figure--full project-case-study__figure--ascii-compact mt-6 md:mt-7";
    return (
      <figure key={key} className={asciiFigureClass}>
        <CaseStudyAsciiDiagram lines={mediaBlock.lines} caption={null} />
        {mediaBlock.caption ? (
          <figcaption className="project-case-study__caption">
            {mediaBlock.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (mediaBlock.type === "image" && mediaBlock.src) {
    return (
      <figure
        key={key}
        className="project-case-study__figure project-case-study__figure--full mt-6 md:mt-7"
      >
        <CaseStudyLightboxImage
          baseUrl={baseUrl}
          img={mediaBlock.src}
          imgWebp={mediaBlock.imgWebp}
          alt={mediaBlock.alt ?? mediaBlock.caption ?? ""}
        />
        {mediaBlock.caption ? (
          <figcaption className="project-case-study__caption">
            {mediaBlock.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return null;
}

/** Rich overview-style paragraph: string, or `{ text, externalLink?, link?, after?, emphasis? }`, or `{ referenceTable }`, or `{ figureBlock }`, or `{ compareFigures }`, or `{ mediaBlock }` (`type: "image"` | `type: "ascii"`). */
export function renderCaseStudyParagraph(paragraph, key, baseUrl) {
  if (typeof paragraph === "string") {
    return (
      <p key={key} className="project-case-study__p">
        {paragraph}
      </p>
    );
  }
  if (
    (paragraph.mediaBlock?.type === "image" && paragraph.mediaBlock?.src) ||
    (paragraph.mediaBlock?.type === "ascii" &&
      paragraph.mediaBlock?.lines?.length)
  ) {
    return renderCaseStudyMediaBlock(paragraph.mediaBlock, key, baseUrl);
  }
  if (paragraph.figureBlock?.img) {
    const fb = paragraph.figureBlock;
    return (
      <figure key={key} className="project-case-study__figure mt-6 md:mt-7">
        <CaseStudyLightboxImage
          baseUrl={baseUrl}
          img={fb.img}
          imgWebp={fb.imgWebp}
          alt={fb.alt ?? ""}
        />
        {fb.caption ? (
          <figcaption className="project-case-study__caption">
            {fb.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }
  if (
    paragraph.compareFigures?.left?.img &&
    paragraph.compareFigures?.right?.img
  ) {
    const cg = paragraph.compareFigures;
    return (
      <figure
        key={key}
        className="project-case-study__figure project-case-study__figure--compare project-case-study__media-bleed mt-6 md:mt-7"
      >
        <div className="project-case-study__compare-grid">
          <CaseStudyLightboxImage
            baseUrl={baseUrl}
            img={cg.left.img}
            imgWebp={cg.left.imgWebp}
            alt={cg.left.alt ?? ""}
          />
          <CaseStudyLightboxImage
            baseUrl={baseUrl}
            img={cg.right.img}
            imgWebp={cg.right.imgWebp}
            alt={cg.right.alt ?? ""}
          />
        </div>
        {cg.caption ? (
          <figcaption className="project-case-study__caption">
            {cg.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }
  if (paragraph.referenceTable?.rows?.length) {
    const rt = paragraph.referenceTable;
    const [rowA, rowB] = rt.rows;
    const transpose =
      rt.transpose === true &&
      rt.rows.length === 2 &&
      Array.isArray(rowA) &&
      Array.isArray(rowB) &&
      rowA.length === rowB.length &&
      rowA.length > 1;

    if (transpose) {
      return (
        <figure
          key={key}
          className="project-case-study__reference-table-figure"
        >
          <div className="project-case-study__reference-table-scroll">
            <table className="project-case-study__reference-table project-case-study__reference-table--transpose">
              <thead>
                <tr>
                  {rowA.map((cell, i) => (
                    <th
                      key={`h-${i}`}
                      scope="col"
                      className="project-case-study__reference-table-digit-col"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {rowB.map((cell, i) => (
                    <td
                      key={`d-${i}`}
                      className="project-case-study__reference-table-digit-col"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {rt.caption ? (
            <figcaption className="project-case-study__caption project-case-study__reference-table-caption">
              {rt.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    const columns = rt.columns ?? ["Thai", "Western"];
    return (
      <figure key={key} className="project-case-study__reference-table-figure">
        <div className="project-case-study__reference-table-scroll">
          <table className="project-case-study__reference-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rt.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th
                        scope="row"
                        className="project-case-study__reference-table-rowhead"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rt.caption ? (
          <figcaption className="project-case-study__caption project-case-study__reference-table-caption">
            {rt.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }
  if (paragraph.externalLink) {
    return (
      <p key={key} className="project-case-study__p">
        {paragraph.text}
        <a
          href={paragraph.externalLink.href}
          className="project-case-study__inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {paragraph.externalLink.label}
        </a>
        {paragraph.after}
      </p>
    );
  }
  if (paragraph.link) {
    return (
      <p key={key} className="project-case-study__p">
        {paragraph.text}
        <Link
          to={`/mission/${paragraph.link.slug}`}
          className="project-case-study__inline-link"
        >
          {paragraph.link.label}
        </Link>
        {paragraph.after}
      </p>
    );
  }
  if (paragraph.emphasis != null) {
    return (
      <p key={key} className="project-case-study__p">
        {paragraph.text}
        <strong className="font-bold text-stone-950">
          {paragraph.emphasis}
        </strong>
      </p>
    );
  }
  return (
    <p key={key} className="project-case-study__p">
      {paragraph.text}
    </p>
  );
}

/** Figure caption: plain string or `{ text, externalLink?, after? }` (overview / showcase / reference). */
export function renderReferenceFigureCaption(caption) {
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

export function renderApproachBlock(item, baseUrl, key) {
  if (typeof item === "string") {
    return (
      <p key={key} className="project-case-study__p">
        {item}
      </p>
    );
  }
  if (item?.paragraph != null) {
    return (
      <p key={key} className="project-case-study__p">
        {item.paragraph}
      </p>
    );
  }
  if (item?.figureBlock?.img) {
    return renderCaseStudyParagraph(
      { figureBlock: item.figureBlock },
      key,
      baseUrl,
    );
  }
  if (item?.compareFigures?.left?.img && item?.compareFigures?.right?.img) {
    return renderCaseStudyParagraph(
      { compareFigures: item.compareFigures },
      key,
      baseUrl,
    );
  }
  return null;
}
