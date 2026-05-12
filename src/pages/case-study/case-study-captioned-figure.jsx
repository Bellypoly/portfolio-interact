import React from "react";
import CaseStudyLightboxImage from "./case-study-lightbox-image";

function captionPresent(caption) {
  if (caption == null || caption === false) return false;
  if (typeof caption === "string") return caption.length > 0;
  return true;
}

/**
 * One lightbox image plus optional `figcaption` — shared pattern for impact blocks,
 * overview `figureBlock` / `mediaBlock` images, figure grids, checkout flow, showcase, reference.
 */
export default function CaseStudyCaptionedFigure({
  baseUrl,
  img,
  imgWebp,
  alt = "",
  caption,
  className = "project-case-study__figure",
  imgClassName,
  captionClassName = "project-case-study__caption",
}) {
  const hasImg = Boolean(img);
  const showCaption = captionPresent(caption);
  if (!hasImg && !showCaption) return null;

  return (
    <figure className={className}>
      {hasImg ? (
        <CaseStudyLightboxImage
          baseUrl={baseUrl}
          img={img}
          imgWebp={imgWebp}
          alt={alt}
          {...(imgClassName != null ? { imgClassName } : {})}
        />
      ) : null}
      {showCaption ? (
        <figcaption className={captionClassName}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
