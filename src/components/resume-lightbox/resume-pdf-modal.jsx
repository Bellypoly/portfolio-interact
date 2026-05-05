import React, { memo } from "react";
import { createPortal } from "react-dom";

const ResumePdfModal = memo(function ResumePdfModal({ pdfHref, onClose }) {
  return createPortal(
    <div
      className="resume-lightbox__backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Résumé PDF"
      onClick={onClose}
    >
      <button
        type="button"
        className="resume-lightbox__close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
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
});

export default ResumePdfModal;
