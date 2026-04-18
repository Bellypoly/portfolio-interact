import React, { useEffect, useState, memo } from "react";
import { createPortal } from "react-dom";

/**
 * Wraps a case-study image in a button; opens a full-size overlay on click.
 * Uses Material Symbols Rounded `open_in_full` (see index.html font link).
 *
 * `project-case-study__lightbox-trigger` (+ `--featured`) are layout hooks for
 * `.project-case-study__featured-wrap` rules in project-case-study.css.
 */
function CaseStudyLightboxImage({
  baseUrl,
  img,
  imgWebp,
  alt,
  imgClassName = "project-case-study__figure-img",
  loading = "lazy",
  decoding = "async",
  /** `"high"` for above-the-fold hero (LCP); omit for lazy figures. */
  fetchPriority,
  triggerClassName,
  /** Inline styles for the thumbnail img (e.g. object-position). */
  imgStyle,
  /** When true, trigger fills `.project-case-study__featured-wrap--compact` height. */
  fillFeatured = false,
  /** Optional shorter label for the lightbox button (`View larger: …`). Modal still uses `alt`. */
  lightboxAriaLabel,
}) {
  const [open, setOpen] = useState(false);
  const fullSrc = `${baseUrl}${img}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerClasses = [
    "project-case-study__lightbox-trigger",
    "relative m-0 block w-full cursor-pointer border-0 bg-transparent p-0 text-left font-[inherit] text-inherit",
    "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800/45",
    "[&_picture]:block",
    fillFeatured && "project-case-study__lightbox-trigger--featured h-full",
    triggerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const modalImgClass =
    "mx-auto block h-auto max-h-[92vh] w-auto max-w-full rounded object-contain shadow-[0_12px_48px_rgb(0_0_0/0.35)]";

  const thumbImgProps = {
    src: fullSrc,
    alt: "",
    role: "presentation",
    className: imgClassName,
    loading,
    decoding,
    style: imgStyle,
    ...(fetchPriority ? { fetchPriority } : {}),
  };

  const thumbImg = imgWebp ? (
    <picture>
      <source srcSet={`${baseUrl}${imgWebp}`} type="image/webp" />
      <img {...thumbImgProps} />
    </picture>
  ) : (
    <img {...thumbImgProps} />
  );

  const modal =
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-[400] flex items-center justify-center bg-[rgb(28_25_23/0.88)] p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged image"
        onClick={() => setOpen(false)}
      >
        <button
          type="button"
          className="fixed right-6 top-6 z-[401] m-0 flex size-9 cursor-pointer items-center justify-center rounded-full border-0 bg-[rgb(255_255_255/0.95)] p-0 text-stone-800 shadow-[0_2px_12px_rgb(0_0_0/0.2)] hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          aria-label="Close enlarged image"
        >
          <span
            className="material-symbols-rounded text-xl text-stone-800 [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_24]"
            aria-hidden="true"
          >
            close
          </span>
        </button>
        <div
          className="max-h-[92vh] max-w-[min(96vw,1400px)] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {imgWebp ? (
            <picture>
              <source srcSet={`${baseUrl}${imgWebp}`} type="image/webp" />
              <img
                src={fullSrc}
                alt={alt}
                className={modalImgClass}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          ) : (
            <img
              src={fullSrc}
              alt={alt}
              className={modalImgClass}
              decoding="async"
              fetchPriority="high"
            />
          )}
        </div>
      </div>,
      document.body,
    );

  const triggerAria =
    lightboxAriaLabel != null && lightboxAriaLabel !== ""
      ? `View larger: ${lightboxAriaLabel}`
      : `View larger: ${alt || "image"}`;

  return (
    <>
      <button
        type="button"
        className={triggerClasses}
        onClick={() => setOpen(true)}
        aria-label={triggerAria}
      >
        {thumbImg}
        <span
          className="pointer-events-none absolute bottom-2.5 right-2.5 z-[1] flex size-7 items-center justify-center rounded-full bg-[rgb(255_255_255/0.94)] shadow-[0_1px_4px_rgb(0_0_0/0.12)]"
          aria-hidden="true"
        >
          <span className="material-symbols-rounded text-base text-stone-800 [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_24]">
            open_in_full
          </span>
        </span>
      </button>
      {modal}
    </>
  );
}

export default memo(CaseStudyLightboxImage);
