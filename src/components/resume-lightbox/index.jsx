import React, { useState, memo } from "react";
import { createPortal } from "react-dom";
import cc from "classcat";
import { useModalPortalLock } from "../../hooks/use-modal-portal-lock";
import "./resume-lightbox.css";

const BASE = import.meta.env.BASE_URL ?? "/";

function assetUrl(relativePath) {
  const path = relativePath.replace(/^\.\//, "").replace(/^\/+/, "");
  const root = BASE.endsWith("/") ? BASE : `${BASE}/`;
  return `${root}${path}`;
}

/**
 * Résumé link → centered modal with PDF in `<iframe>` (native viewer).
 * Scroll lock / Escape: `useModalPortalLock` (shared with case-study lightbox).
 */
const ResumeLightboxLink = memo(function ResumeLightboxLink({
  pdfPath = "resume-suwaphit.pdf",
  className,
  children = "Resume",
  anchorProps = {},
}) {
  const [open, setOpen] = useState(false);
  const pdfHref = assetUrl(pdfPath);

  useModalPortalLock(open, () => setOpen(false));

  const modal =
    open &&
    createPortal(
      <div
        className="resume-lightbox__backdrop"
        role="dialog"
        aria-modal="true"
        aria-label="Résumé PDF"
        onClick={() => setOpen(false)}
      >
        <button
          type="button"
          className="resume-lightbox__close"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          aria-label="Close résumé"
        >
          <span
            className="material-symbols-rounded text-pf-icon text-stone-800 [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_24]"
            aria-hidden="true"
          >
            close
          </span>
        </button>
        <div
          className="resume-lightbox__panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="resume-lightbox__pdf-frame-wrap">
            <iframe
              src={pdfHref}
              title="Résumé PDF"
              className="resume-lightbox__pdf-iframe"
            />
            <p className="resume-lightbox__pdf-hint">
              PDF opens in your browser. Not loading?{" "}
              <a
                className="resume-lightbox__pdf-hint-link"
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Open in new tab
              </a>
              .
            </p>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <a
        href={pdfHref}
        className={cc([className])}
        {...anchorProps}
        onClick={(e) => {
          if (
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            e.button !== 0
          ) {
            return;
          }
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {modal}
    </>
  );
});

export default ResumeLightboxLink;
