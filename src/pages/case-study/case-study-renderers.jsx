import React from "react";
import { Link } from "react-router-dom";
import CaseStudyAsciiDiagram from "./case-study-ascii-diagram";
import CaseStudyBeforeAfterCompare from "./case-study-before-after-compare";
import CaseStudyCaptionedFigure from "./case-study-captioned-figure";
import CaseStudyLightboxImage from "./case-study-lightbox-image";
import CaseStudySection from "./case-study-section";
import { CaseStudyDashBulletList } from "./case-study-dash-bullet-list";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";

/** Reusable value/label stat rows (`cs.results`, impact blocks, deferred impact). */
export function CaseStudyResultsList({
  rows,
  className,
  labelCase = "uppercase",
}) {
  if (!rows?.length) return null;
  const listClassName = [
    className ?? "project-case-study__results",
    labelCase === "sentence"
      ? "project-case-study__results--label-sentence"
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={listClassName} role="list">
      {rows.map((row, i) => (
        <li key={`${row.label}-${i}`} className="project-case-study__result">
          <span className="project-case-study__result-value">{row.value}</span>
          <span className="project-case-study__result-label">{row.label}</span>
        </li>
      ))}
    </ul>
  );
}

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
      <CaseStudyResultsList
        rows={block.rows}
        className="project-case-study__results mt-6 md:mt-8"
        labelCase={block.resultsLabelCase}
      />
      <CaseStudyCaptionedFigure
        baseUrl={baseUrl}
        img={fig?.img}
        imgWebp={fig?.imgWebp}
        alt={fig?.alt ?? ""}
        caption={caption}
        className="project-case-study__figure mt-6 md:mt-8"
      />
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
      <CaseStudyCaptionedFigure
        key={key}
        baseUrl={baseUrl}
        img={mediaBlock.src}
        imgWebp={mediaBlock.imgWebp}
        alt={mediaBlock.alt ?? mediaBlock.caption ?? ""}
        caption={mediaBlock.caption}
        className="project-case-study__figure project-case-study__figure--full mt-6 md:mt-7"
      />
    );
  }

  return null;
}

/**
 * Block callout (e.g. warning panel). Data: `{ variant?: "warning"|"info", title?, body?, paragraphs?, showAlertIcon? }`.
 * Use `paragraphs` for rich blocks (same shapes as overview), or a single `body` string.
 */
function renderCaseStudyCalloutBlock(callout, key, baseUrl, renderParagraph) {
  const variant = callout.variant ?? "warning";
  const inner =
    callout.paragraphs?.length > 0
      ? callout.paragraphs
      : callout.body != null && callout.body !== ""
        ? [callout.body]
        : [];
  const showIcon = callout.showAlertIcon !== false && variant === "warning";
  const hasHead = Boolean(callout.title || showIcon);
  if (!inner.length && !hasHead) return null;

  return (
    <aside
      key={key}
      role="note"
      className={`project-case-study__callout project-case-study__callout--${variant}`}
    >
      {hasHead ? (
        <div className="project-case-study__callout__head">
          {showIcon ? (
            <span className="project-case-study__callout__icon" aria-hidden>
              !
            </span>
          ) : null}
          {callout.title ? (
            <p className="project-case-study__callout__title">
              {renderCaseStudyInlineRich(callout.title)}
            </p>
          ) : null}
        </div>
      ) : null}
      {inner.length ? (
        <div className="project-case-study__callout__body">
          {inner.map((p, i) =>
            renderParagraph(p, `${key}-callout-${i}`, baseUrl),
          )}
        </div>
      ) : null}
    </aside>
  );
}

/** Rich overview-style paragraph: string, `{ baPanel: { variant?, title?, paragraphs } }` (BA panel shell), `{ baPanelTitle }`, `{ beforeAfterCompare }`, `{ referenceTable }`, `{ bulletList }` (optional `bulletListPlain`), `{ callout }`, etc. */
export function renderCaseStudyParagraph(paragraph, key, baseUrl) {
  const paragraphClass = [
    "project-case-study__p",
    typeof paragraph?.className === "string" && paragraph.className.trim()
      ? paragraph.className.trim()
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  if (typeof paragraph === "string") {
    return (
      <p key={key} className={paragraphClass}>
        {renderCaseStudyInlineRich(paragraph)}
      </p>
    );
  }
  if (paragraph?.baPanel?.paragraphs?.length > 0) {
    const bp = paragraph.baPanel;
    const variant = bp.variant ?? "after";
    const shellClass =
      variant === "before"
        ? "project-case-study__overview-ba-panel project-case-study__overview-ba-panel--before"
        : variant === "neutral"
          ? "project-case-study__overview-ba-panel project-case-study__overview-ba-panel--neutral"
          : "project-case-study__overview-ba-panel project-case-study__overview-ba-panel--after";
    return (
      <div key={key} className={`${shellClass} mt-6 md:mt-7`}>
        {typeof bp.title === "string" && bp.title !== "" ? (
          <h3 className="project-case-study__h2 project-case-study__overview-ba-panel__head">
            {renderCaseStudyInlineRich(bp.title)}
          </h3>
        ) : null}
        <div className="project-case-study__overview-ba-panel__body">
          {bp.paragraphs.map((p, i) =>
            renderCaseStudyParagraph(p, `${key}-bap-${i}`, baseUrl),
          )}
        </div>
      </div>
    );
  }
  if (typeof paragraph?.baPanelTitle === "string") {
    return (
      <h3
        key={key}
        className="project-case-study__ba-panel-title project-case-study__ba-panel-title--overview"
      >
        {renderCaseStudyInlineRich(paragraph.baPanelTitle)}
      </h3>
    );
  }
  if (Array.isArray(paragraph?.bulletList)) {
    return (
      <CaseStudyDashBulletList
        key={key}
        items={paragraph.bulletList}
        plain={paragraph.bulletListPlain === true}
        className="mt-4 md:mt-5"
        renderBullet={(item) =>
          typeof item === "string" ? renderCaseStudyInlineRich(item) : item
        }
      />
    );
  }
  if (paragraph?.pillar?.body) {
    const pillar = paragraph.pillar;
    const pillarClassName = [
      "project-case-study__pillars",
      typeof paragraph.className === "string" && paragraph.className.trim()
        ? paragraph.className.trim()
        : null,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <ul key={key} className={pillarClassName}>
        <li className="project-case-study__pillar">
          {typeof pillar.title === "string" && pillar.title.trim() ? (
            <h3 className="project-case-study__h3">
              {renderCaseStudyInlineRich(pillar.title)}
            </h3>
          ) : null}
          <p className="project-case-study__p project-case-study__p--tight">
            {renderCaseStudyInlineRich(pillar.body)}
          </p>
          {pillar.afterBlocks?.length ? (
            <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
              {pillar.afterBlocks.map((block, bi) =>
                renderCaseStudyParagraph(block, `${key}-pillar-after-${bi}`, baseUrl),
              )}
            </div>
          ) : null}
        </li>
      </ul>
    );
  }
  if (paragraph?.callout) {
    return renderCaseStudyCalloutBlock(
      paragraph.callout,
      key,
      baseUrl,
      renderCaseStudyParagraph,
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
      <CaseStudyCaptionedFigure
        key={key}
        baseUrl={baseUrl}
        img={fb.img}
        imgWebp={fb.imgWebp}
        alt={fb.alt ?? ""}
        caption={fb.caption}
        className="project-case-study__figure mt-6 md:mt-7"
      />
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
  if (paragraph?.beforeAfterCompare?.rows?.length) {
    return (
      <div key={key} className="mt-4 md:mt-5">
        <CaseStudyBeforeAfterCompare
          block={paragraph.beforeAfterCompare}
          baseUrl={baseUrl}
        />
      </div>
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
                        key={ci}
                        scope="row"
                        className="project-case-study__reference-table-rowhead"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={ci}>{cell}</td>
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
      <p key={key} className={paragraphClass}>
        {renderCaseStudyInlineRich(paragraph.text ?? "")}
        <a
          href={paragraph.externalLink.href}
          className="project-case-study__inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {paragraph.externalLink.label}
        </a>
        {typeof paragraph.after === "string" && paragraph.after !== ""
          ? renderCaseStudyInlineRich(paragraph.after)
          : paragraph.after}
      </p>
    );
  }
  if (paragraph.link) {
    return (
      <p key={key} className={paragraphClass}>
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
      <p key={key} className={paragraphClass}>
        {renderCaseStudyInlineRich(paragraph.text ?? "")}
        {renderCaseStudyInlineRich(paragraph.emphasis)}
      </p>
    );
  }
  return (
    <p key={key} className={paragraphClass}>
      {renderCaseStudyInlineRich(paragraph.text ?? "")}
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
    return renderCaseStudyParagraph(item, key, baseUrl);
  }
  if (item?.paragraph != null) {
    return renderCaseStudyParagraph(item.paragraph, key, baseUrl);
  }
  if (item?.baPanel?.paragraphs?.length > 0) {
    return renderCaseStudyParagraph(item, key, baseUrl);
  }
  if (Array.isArray(item?.bulletList)) {
    return renderCaseStudyParagraph(
      {
        bulletList: item.bulletList,
        ...(item.bulletListPlain === true ? { bulletListPlain: true } : {}),
      },
      key,
      baseUrl,
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
  if (item?.callout) {
    return renderCaseStudyParagraph({ callout: item.callout }, key, baseUrl);
  }
  return null;
}
