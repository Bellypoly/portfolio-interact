import React from "react";

export default function CaseStudyIframe({ iframeEmbed, className = "" }) {
  if (!iframeEmbed?.src) return null;

  const { src, title = "Embedded document", minHeight } = iframeEmbed;
  const embedStyle = minHeight ? { minHeight } : undefined;
  const wrapClassName = ["project-case-study__embed-wrap", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapClassName}>
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
  );
}
