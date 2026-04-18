import React from "react";

/**
 * Optional iframe embed for published Google Sheets, Observable, etc.
 * Sheet must be shared so visitors can view (or published to web); otherwise
 * the iframe may show a sign-in wall.
 */
export default function CaseStudyIframeEmbed({ iframeEmbed }) {
  if (!iframeEmbed?.src) return null;

  const {
    src,
    title = "Embedded document",
    caption,
    minHeight,
  } = iframeEmbed;

  const embedStyle = minHeight ? { minHeight } : undefined;

  return (
    <section className="project-case-study__section project-case-study__section--embed">
      {caption ? (
        <p className="project-case-study__p mx-auto max-w-none">{caption}</p>
      ) : null}
      <div className="project-case-study__embed-wrap">
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
  );
}
