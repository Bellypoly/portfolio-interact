import React, { useState, memo } from "react";
import { createPortal } from "react-dom";
import { useModalPortalLock } from "../../hooks/use-modal-portal-lock";
import "./case-study-lightbox-image.css";

function CaseStudyLightboxModal({
  baseUrl,
  imgWebp,
  fullSrc,
  alt,
  width,
  height,
  modalSizes,
  onClose,
}) {
  const modalImgProps = {
    src: fullSrc,
    alt,
    className: "cs-lightbox__img",
    width,
    height,
    sizes: modalSizes,
    decoding: "async",
    fetchPriority: "high",
  };

  return (
    <div
      className="cs-lightbox__backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      onClick={onClose}
    >
      <button
        type="button"
        className="cs-lightbox__close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close enlarged image"
      >
        <span
          className="material-symbols-rounded cs-lightbox__icon--close"
          aria-hidden="true"
        >
          close
        </span>
      </button>
      <div
        className="cs-lightbox__frame"
        onClick={(e) => e.stopPropagation()}
      >
        {imgWebp ? (
          <picture>
            <source srcSet={`${baseUrl}${imgWebp}`} type="image/webp" />
            <img {...modalImgProps} />
          </picture>
        ) : (
          <img {...modalImgProps} />
        )}
      </div>
    </div>
  );
}

/**
 * Wraps a case-study image in a button; opens a full-size overlay on click.
 * Uses Material Symbols Rounded `open_in_full` (see index.html font link).
 *
 * `project-case-study__lightbox-trigger` (+ `--featured`) are layout hooks for
 * `.project-case-study__featured-wrap` rules in project-case-study.css.
 *
 * Pass `width` / `height` / `sizes` (and optional `modalSizes`) when the asset
 * is not ~16:9 so intrinsic hints match the file and limit layout shift.
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
  /**
   * Intrinsic size hints for the asset (aspect ratio / decode). Override per image when
   * the file is not ~16:9. Thumbnail `sizes` follows article width (`max-w-[90ch]`).
   */
  width = 1600,
  height = 900,
  sizes = "(max-width: 768px) 100vw, min(90ch, 92vw)",
  /** `sizes` for the full-screen lightbox (wide); thumbnail uses `sizes` above. */
  modalSizes = "min(1400px, 96vw)",
}) {
  const [open, setOpen] = useState(false);
  const fullSrc = `${baseUrl}${img}`;

  useModalPortalLock(open, () => setOpen(false));

  const triggerClasses = [
    "project-case-study__lightbox-trigger",
    "cs-lightbox__trigger",
    fillFeatured && "project-case-study__lightbox-trigger--featured h-full",
    triggerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const thumbImgProps = {
    src: fullSrc,
    alt: "",
    role: "presentation",
    className: imgClassName,
    width,
    height,
    sizes,
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
      <CaseStudyLightboxModal
        baseUrl={baseUrl}
        imgWebp={imgWebp}
        fullSrc={fullSrc}
        alt={alt}
        width={width}
        height={height}
        modalSizes={modalSizes}
        onClose={() => setOpen(false)}
      />,
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
        <span className="cs-lightbox__open-badge" aria-hidden="true">
          <span className="material-symbols-rounded cs-lightbox__icon--body">
            open_in_full
          </span>
        </span>
      </button>
      {modal}
    </>
  );
}

export default memo(CaseStudyLightboxImage);
