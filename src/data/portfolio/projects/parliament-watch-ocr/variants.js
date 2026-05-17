import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";
import { makeThaiArabicNumeralReferenceTableParagraph } from "../../thai-arabic-numeral-reference-table.js";

const THAI_NUMERAL_TABLE_PARAGRAPH =
  makeThaiArabicNumeralReferenceTableParagraph({
    rows: "compact",
    caption:
      "Same value, two glyph systems: Western Arabic (top row) and Thai numerals (bottom row). ECT scans mix them in one run; the pipeline normalizes for math and joins while validation still protects ambiguous reads from being overwritten quietly.",
  });

const PARLIAMENT_WATCH_CASE_STUDY = Object.freeze({
  /* Layout flags */
  liftProblemSectionAboveOverview: true,
  strategyPartSplit: true,
  invertDeferredImpactAndApproach: true,
  deferResults: true,
  /** After "Validation & data quality": limitations → viz → dataset stats → impact narrative → links. */
  afterApproachCluster: "parliament",

  /* Header / intro */
  eyebrow: "Civic data · Parliamentary transparency · Open government records",
  task: "",
  focus: [
    "Public-records normalization",
    "OCR-assisted extraction",
    "Validation methodology",
  ],
  context: "Parliamentary transparency and civic-data initiative, Thailand",
  techStack: Object.freeze([
    { label: "Python", href: "" },
    {
      label: "OCR",
      href: "https://en.wikipedia.org/wiki/Optical_character_recognition",
    },
    { label: "Semi-structured document parsing", href: "" },
    { label: "Validation workflows", href: "" },
  ]),

  /* Problem */
  problemSection: Object.freeze({
    title: "Problem",
    paragraphs: Object.freeze([
      "\u0022Thailand’s Secretariat of the House of Representatives\u0022 publishes parliamentary voting records primarily as fixed-layout PDFs rather than structured datasets. While publicly accessible, the records remained difficult to search, compare, and analyze at scale because they contained \u0022Thai script and numerals\u0022, parliamentary formatting conventions, and semi-structured multi-line layouts not easily transformed into reliable ==machine-readable== voting data.",
      "Transforming parliamentary voting records into structured datasets made large-scale legislative analysis more accessible for analysts, journalists, researchers, and the public. Converting those records into reusable data also improved the reproducibility of parliamentary analysis across legislative sessions and voting records.",
    ]),
    figures: Object.freeze([
      Object.freeze({
        img: "images/portfolio/parliament-watch-ocr/voting-records-pdf-example.png",
        imgWebp:
          "images/portfolio/parliament-watch-ocr/voting-records-pdf-example.webp",
        alt: "Three pages of Thai House of Representatives voting records as official PDFs: Thai script and Thai numerals in aligned, table-like layouts without a formal grid.",
        caption:
          "Examples of parliamentary [[https://msbis.parliament.go.th/ewtadmin/ewt/parliament_report/main_warehouse_dll_x.php?aid=11753&mid=4617|voting records]] and [[https://msbis.parliament.go.th/ewtadmin/ewt/parliament_report/main_warehouse_dll_x.php?aid=11489&mid=4617|summary reports]], published as PDFs rather than structured datasets — see **Why it matters** below.",
      }),
    ]),
    figureColumns: 1,
  }),

  /* Why it matters */
  overviewTitle: "Why it matters",
  overview: Object.freeze([
    "Legislative voting records published by government institutions are foundational ==public-interest data==. When those records exist only as PDFs and semi-structured documents, meaningful analysis becomes difficult not only for journalists and researchers, but also for the public trying to understand how elected representatives actually vote.",
    "Transforming parliamentary voting records into structured datasets enabled analysis of:",
    Object.freeze({
      bulletListPlain: true,
      bulletList: Object.freeze([
        "how political parties voted together or diverged",
        "which legislative issues produced visible inter-party conflict",
        "coalition behavior across parliamentary votes",
        "abstention and non-voting patterns",
        "attendance trends within and across political parties",
      ]),
    }),
    "The resulting datasets supported public-facing visualizations that made complex legislative behavior more understandable and explorable for broader public audiences.",
    Object.freeze({
      baPanel: Object.freeze({
        variant: "after",
        title: "Key findings",
        paragraphs: Object.freeze([
          "Analysis of the structured voting records showed that more than ==77% of parliamentary votes== received majority support across all 7 major political parties, while a smaller subset of highly publicized votes revealed clear inter-party conflict and internal voting divisions.",
          "The resulting datasets enabled downstream analysis of:",
          Object.freeze({
            bulletListPlain: true,
            bulletList: Object.freeze([
              "voting alignment across major political parties",
              "coalition behavior over time",
              "parliamentary attendance trends",
              "abstention and non-voting patterns",
              "intra-party voting conflicts across 108 parliamentary votes and legislative motions",
            ]),
          }),
        ]),
      }),
    }),
  ]),

  /* Contribution */
  strategyTitle: "Contribution",
  strategyIntro: Object.freeze([
    "I transformed parliamentary voting records into structured datasets suitable for downstream analysis and public-facing visualization. This work included OCR-assisted extraction, semi-structured document parsing, Thai script and numeral normalization, data validation workflows, and structured dataset exports.   ",
    "The resulting datasets enabled legislative analysis and public-facing visualizations examining voting alignment, coalition behavior, and parliamentary trends.",
  ]),
  strategyBulletsPlain: true,
  strategyBullets: Object.freeze([]),
  strategyOutro: "",

  /* Extraction workflow */
  overviewSystemDesign: Object.freeze({
    sectionTitle: "Extraction workflow",
    intro: "",
    diagramImage: "images/portfolio/parliament-watch-ocr/workflow.png",
    diagramImageWebp: "images/portfolio/parliament-watch-ocr/workflow.webp",
    diagramCompact: true,
    caption:
      "Seven-step pipeline from parliamentary PDFs through OCR, Thai numeral handling, normalization, validation, structured datasets, and public visualizations with open data.",
    diagramAlt:
      "Parliament Watch OCR workflow in seven steps: parliamentary records, record extraction, Thai numeral extraction, data normalization, validation checks, structured voting dataset, public visualizations and open data",
  }),

  /* Methodology — bordered pillars (same shell as Vote62 `project-case-study__pillars`) */
  methodologyTitle: "Methodology",
  pillars: Object.freeze([
    Object.freeze({
      title: "Structured document parsing",
      body: "Rather than relying on naïve full-document extraction, I developed parsing and normalization workflows that handled Thai script and numerals, indentation-based document structures, and inconsistent parliamentary formatting patterns across voting records.",
      afterBlocks: Object.freeze([
        "This improved extraction reliability across:",
        Object.freeze({
          bulletListPlain: true,
          bulletList: Object.freeze([
            "mixed Thai/Arabic numerals",
            "multi-line parliamentary vote records",
            "indentation-based formatting",
            "multi-motion parliamentary documents",
            "varying vote-result structures",
          ]),
        }),
      ]),
    }),
    Object.freeze({
      title: "Record extraction & normalization",
      body: "I transformed parliamentary voting records into structured datasets and normalized vote data into formats suitable for downstream analysis and public-facing visualization.",
      afterBlocks: Object.freeze([
        "This supported:",
        Object.freeze({
          bulletListPlain: true,
          bulletList: Object.freeze([
            "per-motion vote aggregation",
            "cross-party comparison",
            "longitudinal parliamentary analysis",
            "structured dataset exports",
          ]),
        }),
      ]),
    }),
    Object.freeze({
      title: "Thai-language numeral normalization",
      body: "I handled Thai numerals (๐–๙) and mixed Thai/Arabic number formats that standard extraction workflows frequently misclassified or skipped entirely.",
      afterBlocks: Object.freeze([THAI_NUMERAL_TABLE_PARAGRAPH]),
    }),
  ]),
  strategyAppend: Object.freeze([]),

  /* Validation & data quality */
  approachTitle: "Validation & data quality",
  approach: Object.freeze([
    "I developed validation checks against published lists of Members of Parliament (MPs), expected parliamentary vote counts, and published motion records so extraction failures surfaced immediately instead of silently propagating downstream into analysis and visualization workflows.",
    "This validation layer was important because extraction mistakes in public-records projects can unintentionally change the interpretation of legislative behavior if they are not identified early.",
  ]),

  /* Data limitations */
  ambiguitySection: Object.freeze({
    title: "Data limitations",
    body: Object.freeze([
      "The source dataset did not contain every parliamentary vote from Thailand’s 26th House of Representatives. Only parliamentary motions with publicly available per-member voting records were included, and some records required additional normalization because formatting conventions varied across parliamentary documents.",
      "The project also avoided overstating internal party conflict by not treating every non-vote or absence as political disagreement. Some missing votes may reflect technical issues or scheduling conflicts rather than intentional dissent.",
      Object.freeze({
        text: "Source records were published by the Secretariat of the House of Representatives of Thailand through parliamentary voting documents available on ",
        externalLink: Object.freeze({
          href: "https://msbis.parliament.go.th",
          label: "msbis.parliament.go.th",
        }),
        after: "",
      }),
    ]),
  }),

  /* Public-facing visualization */
  approachSecondaryTitle: "Public-facing visualization",
  approachSecondaryIntro:
    "Public-facing parliamentary voting visualization built from structured voting records normalized from government-published PDFs.",
  approachSecondaryIframeEmbed: Object.freeze({
    src: "https://docs.google.com/spreadsheets/d/1y4avcF8i29Gt_TdY7FR63NOvq-_2f5gl05AEr4VqUIc/preview?gid=72713396",
    title: "Public-facing visualization — sheet preview",
    minHeight: "510px",
  }),

  /* Public dataset */
  publicDatasetSectionTitle: "Public dataset",
  publicDatasetSectionIntro:
    "Structured parliamentary voting dataset reconstructed from Thai parliamentary PDFs and prepared for legislative analysis, transparency reporting, and civic-data visualization workflows. The dataset is publicly available in [[https://docs.google.com/spreadsheets/d/1HxHsCAc_2j-nHvmLx_XF5Je49gidRRoRtJ7NwCNURpA/edit?gid=706401250#gid=706401250|Google Sheets]] format.",

  /* Broader impact */
  deferredImpactTitle: "Impact",
  deferredImpactLead: Object.freeze([
    "The extraction pipeline transformed previously difficult-to-search parliamentary records into reusable structured public-interest data supporting:",
    Object.freeze({
      bulletListPlain: true,
      bulletList: Object.freeze([
        "accountability analysis",
        "legislative trend reporting",
        "civic-data visualization",
        "open-data publication",
        "newsroom-style analytical workflows",
      ]),
    }),
  ]),
  results: Object.freeze([
    Object.freeze({
      value: "108",
      label: "Parliamentary motions analyzed",
    }),
    Object.freeze({
      value: "7",
      label: "Major political parties compared",
    }),
    Object.freeze({
      value: "Structured voting dataset",
      label: "Output format",
    }),
  ]),

  /* Same open data, other civic surfaces */
  futureBlock: Object.freeze({
    title: "Broader Civic-Data Ecosystem",
    body: Object.freeze([
      Object.freeze({
        text: "This pipeline supported charts, spreadsheets, and downstream legislative analysis, but structured parliamentary records from the same transparency ecosystem also contributed to broader civic-data projects. One example ",
        externalLink: Object.freeze({
          href: "https://parliamentwatch.wevis.info/#voting",
          label: "Parliament Watch",
        }),
        after:
          ": a public-facing platform for exploring representatives, parliamentary votes, legislation, and related government records without starting from raw PDF documents.",
      }),
      "Other civic-data teams and interfaces can build on similar structured datasets for different forms of public-interest analysis and visualization.",
    ]),
  }),
});

export const parliamentWatchOcrCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": PARLIAMENT_WATCH_CASE_STUDY,
});

export const parliamentWatchOcrCaseStudyVariant =
  parliamentWatchOcrCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  parliamentWatchOcrCaseStudyVariants.swe;
