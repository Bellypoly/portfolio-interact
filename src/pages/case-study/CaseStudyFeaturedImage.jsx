import React from "react";
import CaseStudyLightboxImage from "./CaseStudyLightboxImage";

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
  compactHeight,
  objectPosition,
  objectPositionMd,
  source,
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
          imgClassName={imgClassName}
          imgStyle={imgStyle}
          loading="eager"
          decoding="async"
          fillFeatured={Boolean(compactHeight)}
        />
      </div>
      {source?.href ? (
        <p className="project-case-study__caption max-w-[68ch]">
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
