/**
 * VOTE62 — ECT Report 69 OCR/ETL pipeline — portfolio entry + case study.
 * Extracted from portfolio-projects.js for maintainability.
 */

export const vote62EctReport69Project = {
  slug: "vote62-ect-report-69",
  portfolioGroup: "professional",
  portfolioYear: 2026,
  portfolioLabel: "Civic tech",
  name: "VOTE62 — ECT Report 69: OCR, ETL & open election data",
  desc: "VOTE62 — 400 Thai constituencies rebuilt from ECT tally PDFs into validated tables so civic tech and newsrooms run on structure, not hand-typed cells.",
  img: "images/portfolio/vote62-ect-report-69/thumbnail.png",
  imgWebp: "images/portfolio/vote62-ect-report-69/thumbnail.webp",
  cardImagePosition: "center center",
  alt: "VOTE62 Mission Gallery thumbnail: stylized tally tables and constituency-style election graphics",
  link: "https://rocketmedialab.co/database-vote62-report-69-1/",
  caseStudy: {
    eyebrow: "Civic Tech · OCR · ETL · Data Engineering · Data Storytelling",
    featuredImg: "images/portfolio/vote62-ect-report-69/featured-image.png",
    featuredImgWebp:
      "images/portfolio/vote62-ect-report-69/featured-image.webp",
    featuredImageAlt:
      "Stacks of Thai election tally forms with handwritten edits \u2014 the paper truth voters see before it becomes rows in an open dataset.",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    task: "ECT Report 69 is where the public sees the count—but not in a form spreadsheets or databases can ingest. I owned the pipeline that turns those official returns into structured, auditable datasets: layout-aware OCR, Thai/Arabic numeral normalization, hard checks on totals, and a release path where humans only touch rows that validation actually flags.",
    disciplines: [
      "OCR & document parsing",
      "Data engineering & ETL",
      "Data validation",
      "Data storytelling",
    ],
    context: "VOTE62 — OpenDream × iLaw × Rocket Media Lab",
    techStack: [
      { label: "Python", href: "https://www.python.org/" },
      {
        label: "OCR",
        href: "https://en.wikipedia.org/wiki/Optical_character_recognition",
      },
      {
        label: "ECT Report 69",
        href: "https://ectreport69.ect.go.th/",
      },
      {
        label: "Rocket Media Lab — VOTE62",
        href: "https://rocketmedialab.co/tag/vote62/",
      },
    ],
    results: [
      { value: "400", label: "Constituencies processed end-to-end" },
      {
        value: "0 manual entry",
        label:
          "No wholesale retyping of the corpus—operators step in only where validation flags a suspect cell before publish",
      },
      {
        value: "Validated",
        label: "Hard checks run before anything is published as open data",
      },
    ],
    overviewTitle: "When the official release is only paper on a screen",
    overview: [
      "Thailand\u2019s Election Commission (ECT) publishes returns you can read on paper or on screen—but those releases are fixed-layout PDFs. They are authoritative, yet they are not a database: there are no companion tables, no stable schema, no API for the same numbers living inside the scan.",
      "That split creates real pressure. Newsrooms need trustworthy tables under deadline. Civic open-data projects need the same figures in a joinable format for charts, joins, and audits. Until someone reconstructs the grids, everyone is stuck retyping—or shipping charts built on fragile copy-paste. VOTE62 exists to close that gap as a coalition effort.",
      {
        mediaBlock: {
          type: "image",
          src: "images/portfolio/vote62-ect-report-69/problem-evidence.png",
          imgWebp:
            "images/portfolio/vote62-ect-report-69/problem-evidence.webp",
          alt: "Side-by-side scans of two Thai election return forms (ส.ส. 5/18): same official layout, different handwriting styles in the vote columns — illustrating real-world variability for OCR.",
          caption:
            "Same official template, different handwriting and corrections in the wild—the kind of noise that breaks naive extraction.",
        },
      },
      "Across 400 constituencies I built the reconstruction path: detect layout first, OCR cells in context (never a single naive text dump), then validation aggressive enough that bad numbers surface before they become someone else\u2019s \u201cground truth.\u201d The gallery further down compresses that arc—paper chaos, extractor logs with warnings, reviewer-ready tables—in three lightbox panels.",
      "The product goal I pushed for was never pretend-perfect OCR. It was to make uncertainty legible—so a chart or an open dataset does not silently inherit a cell that never matched the official scan.",
    ],
    strategyTitle: "What the pipeline had to get right",
    strategyIntro:
      "VOTE62 is bigger than one pipeline: partners shape how the story is told and how data reaches people. My contribution sat in the ingestion layer—Python, OCR, table reconstruction, validation, and rerunnable jobs—so the coalition could trust the rows underneath the headlines and spreadsheets.",
    pillars: [
      {
        title: "Layout-aware extraction",
        body: "Government templates repeat, but scans do not: stamps, handwriting, and crooked grids punish document-level OCR. I segmented regions and read cells in context so numbers stayed tied to the headers they belonged to.",
      },
      {
        title: "Numeral normalization",
        body: "Official rows mix Thai (๐–๙) and Arabic (0–9) digits in the same table. I mapped both to one canonical representation for arithmetic and joins—while still preserving ambiguity when the read was not safe to force.",
      },
      {
        title: "Ambiguity detection",
        body: "I treated totals, cross-checks, and low-confidence reads as first-class outputs: mismatches and suspicious tokens surface upstream instead of vanishing into a \u201cclean\u201d CSV.",
      },
      {
        title: "Re-runnable architecture",
        body: "Returns trickle out and PDFs get revised. I designed the job to rerun incrementally so refreshed official pages did not mean rebuilding every constituency from scratch.",
      },
    ],
    strategyAppend: [
      {
        referenceTable: {
          transpose: true,
          rows: [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"],
          ],
          caption:
            "Same value, two glyph systems: Western Arabic (top row) and Thai numerals (ตัวเลขไทย, bottom). ECT scans mix them in one run; the pipeline normalizes for math and joins while validation still protects ambiguous reads from being overwritten quietly.",
        },
      },
    ],
    approachTitle: "Trust beats a clean-looking lie",
    approach: [
      "I insisted validation be allowed to say \u201cno\u201d: totals that do not add up, candidate rows that disagree with ballot counts, and tokens that are not plausible digits stay visible as warnings—not auto-smoothed into a tidy fiction.",
      "I wired provenance so every structured value keeps a path back to the PDF region it came from—so a skeptic with the official scan and the spreadsheet can answer the same question: where did this number appear?",
      "That is the contribution I cared about shipping: transparency over vanity metrics—a dataset that shows where the machine is confident, where it is guessing, and where a human still has to intervene after validation.",
    ],
    mediaBlock: {
      type: "ascii",
      lines: [
        "PDF ingest → OCR → table rebuild → validate → structured dataset",
      ],
    },
    galleryBlock: {
      title: "Messy human input → OCR output → validated output",
      figureColumns: 3,
      images: [
        {
          img: "images/portfolio/vote62-ect-report-69/ocr-failure-example.png",
          imgWebp:
            "images/portfolio/vote62-ect-report-69/ocr-failure-example.webp",
          alt: "Messy human input: ECT return with handwritten ballot summaries and strike-through corrections (e.g. digits overwritten on printed totals) plus a candidate table filled in ink over dotted guides",
          caption:
            "Messy human input — ink corrections, thick digits, and cursive Thai tallies on the official grid.",
        },
        {
          img: "images/portfolio/vote62-ect-report-69/raw-ocr-output.png",
          imgWebp: "images/portfolio/vote62-ect-report-69/raw-ocr-output.webp",
          alt: "OCR output: terminal log from extract_ect_report.py—extracted turnout and candidate rows with mixed Thai/Arabic numerals, suspected bad tokens, and validation warnings",
          caption:
            "OCR output — structured logs with mixed numerals, bad tokens, and validation warnings.",
        },
        {
          img: "images/portfolio/vote62-ect-report-69/clean-structured-table.png",
          imgWebp:
            "images/portfolio/vote62-ect-report-69/clean-structured-table.webp",
          alt: "Validated output: monospaced tables and checks—aligned fields with Arabic numerals and explicit warnings when totals disagree with valid ballots",
          caption:
            "Validated output — aligned tables with explicit checks before open data.",
        },
      ],
      caption:
        "Same story in three frames: what officials and voters put on paper, what the extractor prints before anyone trusts it, and what validation clears for downstream open data.",
    },
    iframeEmbed: {
      src: "https://docs.google.com/spreadsheets/d/1KqmtYX6Iz0ODJpLj2cB7eW1WuoP4aL8gsj9XKV6-YQo/preview?gid=780194054",
      title: "VOTE62 — structured election dataset",
      caption:
        "Live structured turnout and tallies derived from the same official PDFs—updated when ECT publishes revisions, so downstream work stays tied to the source of truth.",
      minHeight: "580px",
    },
    businessOutcome:
      "My contribution was not a prettier spreadsheet—it was shifting labor from wholesale retyping to a pipeline where machines do the bulk extraction, validation decides what is safe to publish, and humans spend their time only on rows that checks actually flag.",
    futureBlock: {
      title: "Next steps",
      body: "Where I would push next: stronger ML table detection, richer per-cell confidence, and a review surface purpose-built for post-validation fixes—so the same transparency scales when the document mix gets harder.",
    },
    referenceSection: {
      title: "Raw sources",
      intro:
        "Official ECT return PDFs for the ส.ส. 69 count—fixed-layout scans, grouped by constituency (เขตเลือกตั้ง) in the same folder layout the commission uses when it bundles releases.",
      paragraphs: [
        {
          text: "Google Drive copy (รายงานผลการนับคะแนน สส.69): (~2,902 pdf files)",
          externalLink: {
            href: "https://drive.google.com/drive/folders/1MApGQ8YpAG1hVMOWqfKdfag3KLWYYWY5?usp=drive_link",
            label: "Raw PDFs by constituency",
          },
          after:
            " — useful for audit, reruns, and spot-checking against the live sheet.",
        },
      ],
    },
  },
};
