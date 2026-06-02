import React from "react";
import cc from "classcat";

export default function CaseStudyIframe({ iframeEmbed, className = "" }) {
  if (!iframeEmbed?.src) return null;

  const { src, title = "Embedded document", minHeight } = iframeEmbed;
  const embedStyle = minHeight ? { minHeight } : undefined;
  const wrapClassName = cc(["project-case-study__embed-wrap", className]);

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
