import React from "react";

/**
 * Flourish story / iframe embeds share the same layout shell.
 * Pass either `flourishEmbed` (string URL) or `iframeEmbed` ({ src, title?, caption?, minHeight? }).
 */
export default function CaseStudyEmbed({
  flourishEmbed,
  flourishCaption,
  iframeEmbed,
}) {
  const hasFlourish = Boolean(flourishEmbed);
  const hasIframe = Boolean(iframeEmbed?.src);
  if (!hasFlourish && !hasIframe) return null;

  const {
    src,
    title = "Embedded document",
    caption,
    minHeight,
  } = iframeEmbed ?? {};
  const embedStyle = minHeight ? { minHeight } : undefined;

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
          {caption ? (
            <p className="project-case-study__p mx-auto max-w-none">{caption}</p>
          ) : null}
          <div className="project-case-study__embed-wrap project-case-study__section--embed">
            <iframe
              src={src}
              className="project-case-study__embed"
              style={embedStyle}
              title={title}
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
