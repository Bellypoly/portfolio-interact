import React from "react";

export default function CaseStudyFlourishEmbed({ flourishEmbed, flourishCaption }) {
  if (!flourishEmbed) return null;

  return (
    <section className="project-case-study__section project-case-study__section--embed">
      {flourishCaption ? (
        <p className="project-case-study__p">{flourishCaption}</p>
      ) : null}
      <div className="project-case-study__embed-wrap">
        <iframe
          src={flourishEmbed}
          className="project-case-study__embed"
          title="Interactive data visualization"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        />
      </div>
    </section>
  );
}
