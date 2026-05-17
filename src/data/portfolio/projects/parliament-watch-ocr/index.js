/**
 * Parliament Watch — Structured parliamentary records from Thai voting PDFs (WeVis) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { parliamentWatchOcrCaseStudyVariant } from "./variants.js";

const baseParliamentWatchOcrCaseStudy = {
  /* Header / intro */
  eyebrow: "Civic Tech · OCR · Open Government Records",
  featuredImg: "images/portfolio/parliament-watch-ocr/featured-image.png",
  featuredImgWebp: "images/portfolio/parliament-watch-ocr/featured-image.webp",
  featuredImageAlt:
    "Parliament Watch — eight Thai party-style logos in two rows, linked by thin white network lines, on a soft blurred bookshelf background; includes Move Forward, Pheu Thai, and related civic-party marks",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  task: "Build an OCR pipeline to extract structured voting data from Thai parliament PDF documents — scanned government templates with Thai numerals, handwriting, mixed table layouts, and embedded images — so downstream visualizations and analysis could run on clean, machine-readable records.",
  focus: ["Document OCR", "Data engineering", "Civic technology"],
  context: "Parliament Watch (open-source civic tech, Thailand)",
  techStack: [
    {
      label: "Python",
      href: "https://www.python.org/",
    },
    {
      label: "OCR",
      href: "https://en.wikipedia.org/wiki/Optical_character_recognition",
    },
    {
      label: "Parliament Watch",
      href: "https://parliamentwatch.wevis.info",
    },
    {
      label: "Open Data",
      href: "",
    },
  ],
  /* Overview */
  overviewTitle: "Overview",
  overview: [
    "Thailand’s House of Representatives publishes voting records as PDFs on msbis.parliament.go.th—not spreadsheets. They are scans: government templates, Thai text and numerals, handwriting, photos, stamps, and tables that shift shape between sessions.",
    "Parliament Watch needed those pages as rows—fuel for charts like Party Unity, mapping seven major parties across 108 motions in the 26th House. I owned extraction: from PDF pixels to validated tables analysts and front-end engineers could trust.",
    {
      text: "Live visualization: ",
      externalLink: {
        href: "https://wevis.info/partyunityvisual/",
        label: "Party Unity Visual",
      },
      after: "",
    },
    {
      text: "Structured output (open data): ",
      externalLink: {
        href: "https://docs.google.com/spreadsheets/d/1HxHsCAc_2j-nHvmLx_XF5Je49gidRRoRtJ7NwCNURpA/edit?gid=706401250#gid=706401250",
        label: "Vote26 Data — per-party voting records (Google Sheets)",
      },
      after:
        " — the tabular dataset my OCR pipeline produced from scanned parliament PDFs, used directly by the visualization and analysis teams.",
    },
  ],
  /* What I built */
  strategyTitle: "What I built",
  pillars: [
    {
      title: "Thai-language OCR pipeline",
      body: "Handled Thai script, Thai numerals (๐–๙), and mixed Thai/Arabic number formats that standard OCR engines misclassify or skip entirely.",
    },
    {
      title: "Layout-aware extraction",
      body: "Parsed scanned government templates where table structures, column alignment, and cell boundaries vary across sessions — some pages include handwritten marks, stamps, or embedded photographs that break naive grid detection.",
    },
    {
      title: "Validation and downstream handoff",
      body: "Output clean, structured records (per-MP vote, per-motion) that Parliament Watch consumed directly for front-end rendering and open data export — no manual correction step.",
    },
  ],
  /* How I approached it */
  approachTitle: "How I approached it",
  approach: [
    "I treated each PDF page as an image-first problem: detect table regions, segment cells, then run OCR per cell rather than full-page text extraction. This handled the inconsistent layouts and inline noise (stamps, handwriting) much better than document-level OCR.",
    "I built validation checks against known MP rosters and motion counts so extraction errors surfaced immediately rather than propagating silently into the visualization layer.",
  ],
  results: null,
  /* Final related surface */
  relatedProject: {
    slug: "vote62",
    label:
      "Related civic work — VOTE62: ECT Report 69 OCR, validation & open election data →",
  },
};

export const parliamentWatchOcrProject = {
  ...getMissionGalleryManifestRow("parliament-watch-ocr"),
  caseStudy: {
    ...baseParliamentWatchOcrCaseStudy,
    ...parliamentWatchOcrCaseStudyVariant,
  },
};
