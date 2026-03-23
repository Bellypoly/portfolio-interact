import React from "react";

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

  const src = `${baseUrl}${img}`;
  const imgClassName = [
    "project-case-study__featured-img",
    useResponsivePos && "project-case-study__featured-img--responsive-pos",
  ]
    .filter(Boolean)
    .join(" ");

  const imgProps = {
    alt: alt || title,
    className: imgClassName,
    loading: "eager",
    decoding: "async",
    src,
    ...(!useResponsivePos && objectPosition ? { style: { objectPosition } } : {}),
  };

  return (
    <div className={wrapClass} style={wrapStyle}>
      {imgWebp ? (
        <picture>
          <source srcSet={`${baseUrl}${imgWebp}`} type="image/webp" />
          <img {...imgProps} />
        </picture>
      ) : (
        <img {...imgProps} />
      )}
    </div>
  );
}
