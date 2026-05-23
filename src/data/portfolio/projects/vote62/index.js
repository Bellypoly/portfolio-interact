/**
 * VOTE62 — ECT Report 69 OCR/ETL pipeline — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { makeThaiArabicNumeralReferenceTableParagraph } from "../../thai-arabic-numeral-reference-table.js";
import { vote62EctReport69CaseStudyVariant } from "./variants.js";

/** Shared case study fields; mission-gallery variants overlay keys from `vote62/variants.js`. */
export const vote62CaseStudyBase = {
  /* Header / intro */
  eyebrow: "Civic Tech · OCR · ETL · Data Engineering · Data Storytelling",
  /* Media */
  featuredImg: "images/portfolio/vote62/featured-image.png",
  featuredImgWebp: "images/portfolio/vote62/featured-image.webp",
  featuredImageAlt:
    "Stacks of Thai election tally forms with handwritten edits \u2014 the paper truth voters see before it becomes rows in an open dataset.",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  featuredImageCaption:
    "==Thailand's Election Commission publishes election returns primarily as fixed-layout PDFs rather than structured datasets. VOTE62 (2026) reconstructed those fragmented records into validated election datasets for public-interest reporting, verification workflows, and civic-data analysis.==",
  /* Project frame */
  task: "ECT Report 69 is where the public sees the count—but not in a form spreadsheets or databases can ingest. I owned the pipeline that turns those official returns into structured, auditable datasets: layout-aware OCR, Thai/Arabic numeral normalization, hard checks on totals, and a release path where humans only touch rows that validation actually flags.",
  focus: [
    "OCR & document parsing",
    "Data engineering & ETL",
    "Data validation",
    "Data storytelling",
  ],
  context: "VOTE62 — OpenDream × iLaw × Rocket Media Lab",
  /* Stack */
  techStack: [
    { label: "Python", href: "" },
    {
      label: "OCR",
      href: "https://en.wikipedia.org/wiki/Optical_character_recognition",
    },
    {
      label: "Table reconstruction",
      href: "",
    },
    {
      label: "Validation workflows",
      href: "",
    },
    // { // label: "ECT Report 69", // href: "https://ectreport69.ect.go.th/", // },
    // { // label: "Rocket Media Lab", // href: "https://rocketmedialab.co/tag/vote62/", // },
  ],

  /* Impact */
  results: [
    { value: "400", label: "Constituencies processed end-to-end" },
    {
      value: "No wholesale retyping",
      label:
        "Reviewers intervened only where validation flagged ambiguous extraction",
    },
    {
      value: "Validated",
      label: "Hard checks run before anything is published as open data",
    },
  ],

  /* Overview */
  overviewTitle: "When the official release is only paper on a screen",
  overview: [
    "Thailand\u2019s Election Commission (ECT) publishes returns you can read on paper or on screen—but those releases are fixed-layout PDFs. They are authoritative, yet they are not a database: there are no companion tables, no stable schema, and no API for the same numbers living inside the scan.",
    "That gap creates real pressure. Journalists, researchers, and the public all need reliable election data under deadline—but critical records still arrive as scans meant for human reading, not verification at scale.",
    "When public understanding depends on numbers trapped inside thousands of PDF pages, small extraction mistakes can quietly become reporting mistakes, charts, or downstream datasets that no longer match the official record.",
    ">>The goal was never perfect OCR. It was making sure uncertainty stayed visible before numbers turned into charts and datasets that no longer matched the official scan.<<",
    {
      mediaBlock: {
        type: "image",
        src: "images/portfolio/vote62/problem-evidence.png",
        imgWebp: "images/portfolio/vote62/problem-evidence.webp",
        alt: "Side-by-side scans of two Thai election return forms (ส.ส. 5/18): same official layout, different handwriting styles in the vote columns — illustrating real-world variability for OCR.",
        caption:
          "Same official template, different handwriting and corrections in the wild—the kind of variability that breaks naïve extraction workflows.",
      },
    },
    "Across 400 constituencies, I reconstructed records through layout-aware extraction, contextual OCR, and validation workflows designed to surface suspicious numbers before they propagated downstream.",
    "The gallery below compresses that process into 3 stages: messy source records, OCR extraction with validation warnings, and reviewer-ready structured outputs.",
  ],

  /* Building reliable election data from PDFs */
  /* What I focused on */
  strategyTitle: "Building reliable election data from PDFs",
  strategyIntro:
    "VOTE62 was bigger than one extraction workflow: partners shaped how election records became usable election records. My contribution focused on the reconstruction layer—Python, OCR, table reconstruction, validation, and rerunnable processing workflows—so reconstructed records could still be traced back to the official PDFs they came from.",
  pillars: [
    {
      title: "Layout-aware extraction",
      body: "Government templates repeat, but scans do not: stamps, handwriting, corrections, and warped tables break naïve document-level OCR.",
      afterBlocks: [
        "I segmented regions and reconstructed rows in context so extracted values remained tied to the labels and vote structures they belonged to.",
      ],
    },
    {
      title: "Numeral normalization",
      body: "Official rows mix Thai (๐–๙) and Arabic (0–9) digits in the same table. I mapped both into canonical numeric representations for joins, aggregation, and arithmetic—while preserving ambiguity when extraction confidence was too low to safely force a value.",
      afterBlocks: [
        makeThaiArabicNumeralReferenceTableParagraph({
          rows: "compact",
          caption:
            "Same value, two glyph systems: Western Arabic (top row) and Thai numerals (bottom row). ECT scans mix them in one run; the pipeline normalizes for math and joins while validation still protects ambiguous reads from being overwritten quietly.",
        }),
      ],
    },
    {
      title: "Ambiguity detection",
      body: "I treated totals, cross-checks, and low-confidence reads as first-class outputs: mismatches and suspicious tokens surfaced upstream instead of vanishing into a “clean” CSV export.",
    },
    {
      title: "Re-runnable architecture",
      body: "Returns trickle out and PDFs get revised. We designed the workflow to rerun incrementally so refreshed official pages did not require rebuilding every constituency from scratch.",
    },
  ],

  /* Validation / approach */
  /* How it shipped */
  approachTitle: "Trust beats a clean-looking lie",
  approach: [
    "I insisted validation be allowed to say \u201cno\u201d: totals that do not reconcile, candidate rows that disagree with ballot counts, and tokens that are not plausible digits stay visible as warnings—not auto-smoothed into a tidy fiction.",
    "The goal was not a cleaner-looking spreadsheet. It was a workflow where uncertainty stayed visible—where the machine was confident, where validation failed, and where human review still mattered.",
  ],

  /* Supporting media and open data */
  mediaBlock: {
    type: "ascii",
    lines: ["PDF ingest → OCR → table rebuild → validate → structured dataset"],
  },
  galleryBlock: {
    title: "Messy human input → OCR output → validated output",
    figureColumns: 3,
    /* Media */
    images: [
      {
        img: "images/portfolio/vote62/ocr-failure-example.png",
        imgWebp: "images/portfolio/vote62/ocr-failure-example.webp",
        alt: "Messy human input: ECT return with handwritten ballot summaries and strike-through corrections (e.g. digits overwritten on printed totals) plus a candidate table filled in ink over dotted guides",
        caption:
          "Messy human input — ink corrections, thick digits, and cursive Thai tallies on the official grid.",
      },
      {
        img: "images/portfolio/vote62/raw-ocr-output.png",
        imgWebp: "images/portfolio/vote62/raw-ocr-output.webp",
        alt: "OCR output: terminal log from extract_ect_report.py—extracted turnout and candidate rows with mixed Thai/Arabic numerals, suspected bad tokens, and validation warnings",
        caption:
          "OCR output — structured logs containing mixed numerals, suspicious tokens, and validation warnings.",
      },
      {
        img: "images/portfolio/vote62/clean-structured-table.png",
        imgWebp: "images/portfolio/vote62/clean-structured-table.webp",
        alt: "Validated output: monospaced tables and checks—aligned fields with Arabic numerals and explicit warnings when totals disagree with valid ballots",
        caption:
          "Validated output — aligned structured tables with explicit checks before open-data publication.",
      },
    ],
    caption:
      "Same story in 3 frames: what officials and voters put on paper, what extraction produces before validation clears it for downstream use, and what validation clears for downstream open data.",
  },
  iframeEmbed: {
    src: "https://docs.google.com/spreadsheets/d/1KqmtYX6Iz0ODJpLj2cB7eW1WuoP4aL8gsj9XKV6-YQo/preview?gid=780194054",
    title: "VOTE62 — structured election dataset",
    intro:
      "Live structured turnout and election tallies reconstructed from official ECT PDFs and refreshed as revised records became available.",
    caption:
      "Structured election datasets normalized from ECT PDFs and prepared for downstream analysis, verification, and public-interest reporting.",
    minHeight: "580px",
  },
  /* Narrative after live sheet embed (see project-case-study-page order) */
  whyStructuredElectionDataSection: {
    title: "Why Structured Election Data Matters",
    intro:
      "Once reconstructed into structured datasets, the records could finally be compared, audited, and analyzed without manually rebuilding results from thousands of PDF pages.",
    bulletListPlain: true,
    bulletList: [
      "constituency-level election analysis",
      "reproducible verification workflows",
      "public-facing reporting",
      "civic-data publication",
      "downstream audits and analysis",
    ],
    outro:
      "without manual reconstruction from thousands of government-published documents.",
  },
  businessOutcome:
    "My contribution was not a prettier spreadsheet—it was shifting labor from wholesale retyping toward a workflow where machines handled bulk extraction, validation determined what was safe to publish, and humans intervened only where checks actually flagged uncertainty.",

  /* Final sections */
  referenceSection: {
    title: "Raw sources",
    intro: "",
    paragraphs: [
      {
        text: "[[https://ectreport69.ect.go.th/|Official ECT Report 69]] return PDFs—fixed-layout scans grouped by constituency in the same structure used by the Election Commission when publishing official releases.",
      },
      {
        text: "",
        externalLink: {
          href: "https://drive.google.com/drive/folders/1MApGQ8YpAG1hVMOWqfKdfag3KLWYYWY5?usp=drive_link",
          label: "Raw PDFs by constituency",
        },
        after:
          " (~2,902 files) were retained for reruns, provenance checks, and validation review throughout the reconstruction process. Structured outputs later supported civic-data reporting and analysis through [[https://rocketmedialab.co/database-vote62-report-69-1/|Rocket Media Lab]].",
      },
    ],
  },
  relatedProject: {
    slug: "parliament-watch-ocr",
    label:
      "Related civic work — Parliament Watch: Structured parliamentary records from Thai voting PDFs →",
  },
};

export const vote62EctReport69Project = {
  ...getMissionGalleryManifestRow("vote62"),
  /* Export */
  caseStudy: { ...vote62CaseStudyBase, ...vote62EctReport69CaseStudyVariant },
};
