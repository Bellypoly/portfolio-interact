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
  featuredImg: "images/portfolio/vote62/featured-image.png",
  featuredImgWebp: "images/portfolio/vote62/featured-image.webp",
  featuredImageAlt:
    "Stacks of Thai election tally forms with handwritten edits \u2014 the paper truth voters see before it becomes rows in an open dataset.",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  featuredImageCaption:
    "==Thailand’s Election Commission publishes authoritative election returns primarily as fixed-layout PDFs rather than structured datasets. VOTE62 focused on reconstructing those records into validated, analysis-ready election data suitable for public-interest reporting, verification, and civic-data workflows.==",
  task: "ECT Report 69 is where the public sees the count—but not in a form spreadsheets or databases can ingest. I owned the pipeline that turns those official returns into structured, auditable datasets: layout-aware OCR, Thai/Arabic numeral normalization, hard checks on totals, and a release path where humans only touch rows that validation actually flags.",
  focus: [
    "OCR & document parsing",
    "Data engineering & ETL",
    "Data validation",
    "Data storytelling",
  ],
  context: "VOTE62 — OpenDream × iLaw × Rocket Media Lab",
  techStack: [
    { label: "Python", href: "" },
    {
      label: "OCR",
      href: "https://en.wikipedia.org/wiki/Optical_character_recognition",
    },
    {
      label: "ECT Report 69",
      href: "https://ectreport69.ect.go.th/",
    },
    {
      label: "Rocket Media Lab",
      href: "https://rocketmedialab.co/tag/vote62/",
    },
  ],

  /* Impact */
  results: [
    { value: "400", label: "Constituencies processed end-to-end" },
    {
      value: "No wholesale retyping",
      label:
        "reviewers intervene only where validation flags a suspect cell before publication.",
    },
    {
      value: "Validated",
      label: "Hard checks run before anything is published as open data",
    },
  ],

  /* Overview */
  overviewTitle: "When the official release is only paper on a screen",
  overview: [
    "Thailand\u2019s Election Commission (ECT) publishes returns you can read on paper or on screen—but those releases are fixed-layout PDFs. They are authoritative, yet they are not a database: there are no companion tables, no stable schema, no API for the same numbers living inside the scan.",
    "That split creates real pressure. Newsrooms and the public all need trustworthy structured data under deadline. But until someone reconstructs the grids, workflows depend heavily on manual retyping or fragile copy-paste extraction. VOTE62 existed to help close that gap through a collaborative civic-data effort.",
    ">>The goal was never pretend-perfect OCR. It was to make uncertainty legible—so a chart or open dataset does not silently inherit a number that never matched the official scan.<<",
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
    "Across 400 constituencies I built the reconstruction path: detect layout first, OCR cells in context (never a single naive text dump), then validation aggressive enough that bad numbers surface before they become someone else\u2019s \u201cground truth.\u201d",
    "The gallery further down compresses that arc—paper chaos, extractor logs with warnings, reviewer-ready tables—in three lightbox panels.",
  ],

  /* What the pipeline had to get right */
  strategyTitle: "What the pipeline had to get right",
  strategyIntro:
    "VOTE62 is bigger than one pipeline: partners shape how the story is told and how data reaches people. My contribution sat in the ingestion layer—Python, OCR, table reconstruction, validation, and rerunnable jobs—so the coalition could trust the rows underneath the headlines and spreadsheets.",
  pillars: [
    {
      title: "Layout-aware extraction",
      body: "Government templates repeat, but scans do not: stamps, handwriting, and crooked grids punish document-level OCR.",
      afterBlocks: [
        "I segmented regions and read cells in context so numbers stayed tied to the headers they belonged to.",
      ],
    },
    {
      title: "Numeral normalization",
      body: "Official rows mix Thai (๐–๙) and Arabic (0–9) digits in the same table. I mapped both to one canonical representation for arithmetic and joins—while still preserving ambiguity when the read was not safe to force.",
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
      body: "I treated totals, cross-checks, and low-confidence reads as first-class outputs: mismatches and suspicious tokens surface upstream instead of vanishing into a \u201cclean\u201d CSV export.",
    },
    {
      title: "Re-runnable architecture",
      body: "Returns trickle out and PDFs get revised. I designed the job to rerun incrementally so refreshed official pages did not mean rebuilding every constituency from scratch.",
    },
  ],

  /* Validation / approach */
  approachTitle: "Trust beats a clean-looking lie",
  approach: [
    "I insisted validation be allowed to say \u201cno\u201d: totals that do not reconcile, candidate rows that disagree with ballot counts, and tokens that are not plausible digits stay visible as warnings—not auto-smoothed into a tidy fiction.",
    "_I wired provenance so every structured value retained a path back to the PDF region it came from—so a skeptic with the official scan and the spreadsheet could answer the same question: where did this number appear?_",
    "That is the contribution I cared about shipping: transparency over vanity metrics—a dataset that shows where the machine is confident, where it is guessing, and where a human still has to intervene after validation.",
  ],

  /* Supporting media and open data */
  mediaBlock: {
    type: "ascii",
    lines: ["PDF ingest → OCR → table rebuild → validate → structured dataset"],
  },
  galleryBlock: {
    title: "Messy human input → OCR output → validated output",
    figureColumns: 3,
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
      "Same story in three frames: what officials and voters put on paper, what the extractor prints before anyone trusts it, and what validation clears for downstream open data.",
  },
  iframeEmbed: {
    src: "https://docs.google.com/spreadsheets/d/1KqmtYX6Iz0ODJpLj2cB7eW1WuoP4aL8gsj9XKV6-YQo/preview?gid=780194054",
    title: "VOTE62 — structured election dataset",
    intro:
      "Live structured turnout and election tallies derived from official ECT PDFs—updated when revised records became available so downstream analysis remained tied to the official source of truth.",
    caption:
      "Structured election datasets normalized from ECT PDFs and prepared for downstream analysis, verification, and public-interest reporting.",
    minHeight: "580px",
  },
  /* Narrative after live sheet embed (see project-case-study-page order) */
  whyStructuredElectionDataSection: {
    title: "Why Structured Election Data Matters",
    intro: "Transforming ECT PDFs into structured datasets enabled:",
    bulletListPlain: true,
    bulletList: [
      "constituency-level election analysis",
      "reproducible verification workflows",
      "public-facing reporting",
      "civic-data publication",
      "downstream audits and analysis",
    ],
    outro:
      "without requiring manual extraction from thousands of government-published documents.",
  },
  businessOutcomeSectionTitle: "Outcome",
  businessOutcome:
    "My contribution was not a prettier spreadsheet—it was shifting labor from wholesale retyping to a pipeline where machines do the bulk extraction, validation decides what is safe to publish, and humans spend their time only on rows that checks actually flag.",

  /* Final sections */
  futureBlock: {
    title: "Next steps",
    body: "Where I would push next: stronger ML table detection, richer per-cell confidence, and a review surface purpose-built for post-validation fixes—so the same transparency scales when the document mix gets harder.",
  },
  referenceSection: {
    title: "Raw sources",
    intro:
      "Official ECT return PDFs for the ส.ส. 69 count—fixed-layout scans grouped by constituency in the same structure used by the Election Commission when publishing official releases.",
    paragraphs: [
      {
        text: "",
        externalLink: {
          href: "https://drive.google.com/drive/folders/1MApGQ8YpAG1hVMOWqfKdfag3KLWYYWY5?usp=drive_link",
          label: "Raw PDFs by constituency",
        },
        after:
          " (~2,902 files) used for reruns, validation, provenance checks, and downstream structured extraction workflows.",
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
  caseStudy: { ...vote62CaseStudyBase, ...vote62EctReport69CaseStudyVariant },
};
