import React, { memo, useCallback, useEffect, useState } from "react";
import cc from "classcat";
import { useModalPortalLock } from "../../hooks/use-modal-portal-lock";
import { assetUrl } from "../../utils/asset-url";
import { externalLinkProps } from "../../utils/external-link-props";
import ResumePdfModal from "./resume-pdf-modal";
import { useInlinePdfLightbox } from "./use-inline-pdf-lightbox";
import "./resume-lightbox.css";

function modalTriggerProps(props) {
  const { target, rel, ...rest } = props;
  void target;
  void rel;
  return rest;
}

function isModifiedClick(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

/**
 * Résumé link: opens in a new tab when inline PDF in an iframe is unlikely to work
 * (`navigator.pdfViewerEnabled`, with iOS iframe limitations excluded). Otherwise
 * uses a centered modal with the browser's built-in PDF iframe viewer.
 */
const ResumeLightboxLink = memo(function ResumeLightboxLink({
  pdfPath = "resume-suwaphit.pdf",
  className,
  children = "Resume",
  anchorProps = {},
}) {
  const [open, setOpen] = useState(false);
  const pdfHref = assetUrl(pdfPath);
  const useLightbox = useInlinePdfLightbox();
  const linkProps = useLightbox
    ? modalTriggerProps(anchorProps)
    : externalLinkProps(anchorProps);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!useLightbox) setOpen(false);
  }, [useLightbox]);

  useModalPortalLock(useLightbox && open, close);

  const onAnchorClick = useCallback(
    (e) => {
      if (!useLightbox || isModifiedClick(e)) return;
      e.preventDefault();
      setOpen(true);
    },
    [useLightbox],
  );

  return (
    <>
      <a
        href={pdfHref}
        className={cc([className])}
        {...linkProps}
        onClick={onAnchorClick}
      >
        {children}
      </a>
      {useLightbox && open ? (
        <ResumePdfModal pdfHref={pdfHref} onClose={close} />
      ) : null}
    </>
  );
});

export default ResumeLightboxLink;
