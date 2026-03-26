import React from "react";
import CaseStudyLightboxImage from "./CaseStudyLightboxImage";

/** Case-study featured image: optional WebP + compact-height + object-position (optional md+ override). */
export default function CaseStudyFeaturedImage({
  baseUrl,
  img,
  imgWebp,
  alt,
  title,
  compactHeight,
  objectPosition,
  objectPositionMd,
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
  );
}
