import React from "react";
import CaseStudyLightboxImage from "./case-study-lightbox-image";
import { renderCaseStudyInlineRich } from "./case-study-inline-rich";

/**
 * Case-study featured image: optional WebP + compact-height + object-position
 * (optional md+ override). Optional `source: { href, label?, prefix? }` prints
 * a line under the hero (`prefix` defaults to “Image source”). Styled like
 * `.project-case-study__caption` (figure captions).
 */
export default function CaseStudyFeaturedImage({
  baseUrl,
  img,
  imgWebp,
  alt,
  title,
  caption,
  compactHeight,
  objectPosition,
  objectPositionMd,
  source,
  lightboxAriaLabel,
}) {
  const wrapClass = [
    "project-case-study__featured-wrap",
    compactHeight && "project-case-study__featured-wrap--compact",
  ]
    .filter(Boolean)
    .join(" ");

  const useResponsivePos = Boolean(objectPositionMd);

  const wrapStyle = useResponsivePos
    ? {
        "--cs-featured-obj": objectPosition ?? "center center",
        "--cs-featured-obj-md": objectPositionMd,
      }
    : undefined;

  const imgClassName = [
    "project-case-study__featured-img",
    useResponsivePos && "project-case-study__featured-img--responsive-pos",
  ]
    .filter(Boolean)
    .join(" ");

  const imgStyle =
    !useResponsivePos && objectPosition ? { objectPosition } : undefined;
  const label = alt || title;

  return (
    <>
      <div className={wrapClass} style={wrapStyle}>
        <CaseStudyLightboxImage
          baseUrl={baseUrl}
          img={img}
          imgWebp={imgWebp}
          alt={label}
          lightboxAriaLabel={lightboxAriaLabel}
          imgClassName={imgClassName}
          imgStyle={imgStyle}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          fillFeatured={Boolean(compactHeight)}
        />
      </div>
      {typeof caption === "string" && caption.trim() ? (
        <p className="project-case-study__caption max-w-none">
          {renderCaseStudyInlineRich(caption)}
        </p>
      ) : null}
      {source?.href ? (
        <p className="project-case-study__caption max-w-none">
          {source.prefix ?? "Image source"}:{" "}
          <a
            href={source.href}
            className="project-case-study__inline-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {source.label ?? source.href}
          </a>
        </p>
      ) : null}
    </>
  );
}
