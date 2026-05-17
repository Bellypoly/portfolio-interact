import React from "react";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";
import CaseStudyIframe from "./case-study-iframe";

/**
 * Flourish story / iframe embeds share the same layout shell.
 * Pass either `flourishEmbed` (string URL) or `iframeEmbed` ({
 *   src, title?, caption?, minHeight?,
 *   intro? — optional body copy above the iframe (normal `.project-case-study__p`, not caption tone).
 * }).
 */
export default function CaseStudyEmbedSection({
  flourishEmbed,
  flourishCaption,
  iframeEmbed,
}) {
  const hasFlourish = Boolean(flourishEmbed);
  const hasIframe = Boolean(iframeEmbed?.src);
  if (!hasFlourish && !hasIframe) return null;

  const { intro, caption } = iframeEmbed ?? {};
  const hasIntro = typeof intro === "string" && intro.trim() !== "";
  const hasCaption = typeof caption === "string" && caption.trim() !== "";

  return (
    <>
      {hasFlourish ? (
        <section className="project-case-study__section project-case-study__section--embed">
          {flourishCaption ? (
            <p className="project-case-study__p mx-auto max-w-none">
              {flourishCaption}
            </p>
          ) : null}
          <div className="project-case-study__embed-wrap">
            <iframe
              src={flourishEmbed}
              className="project-case-study__embed"
              title="Interactive data visualization"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      ) : null}
      {hasIframe ? (
        <section className="project-case-study__section">
          {hasIntro ? (
            <p className="project-case-study__p mx-auto max-w-none">
              {renderCaseStudyInlineRich(intro.trim())}
            </p>
          ) : null}
          <CaseStudyIframe
            iframeEmbed={iframeEmbed}
            className={`project-case-study__section--embed${hasIntro ? " mt-6 md:mt-7" : ""}`}
          />
          {hasCaption ? (
            <p className="project-case-study__caption max-w-none mt-3 md:mt-4">
              {renderCaseStudyInlineRich(caption.trim())}
            </p>
          ) : null}
        </section>
      ) : null}
    </>
  );
}
