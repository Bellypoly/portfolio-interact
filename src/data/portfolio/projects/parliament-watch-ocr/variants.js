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
    title: "When parliamentary records exist only as PDFs",
    paragraphs: Object.freeze([
      "Thailand’s Secretariat of the House of Representatives publishes parliamentary voting records primarily as fixed-layout PDFs rather than structured datasets. While publicly accessible, the records were still hard to search, compare, and analyze at scale.",
      "The documents contain Thai script, mixed numerals, parliamentary formatting conventions, and semi-structured multi-line layouts that are not easily transformed into reliable ==machine-readable== voting data.",
      "Turning those PDFs into structured voting records made large-scale review more accessible for analysts, journalists, researchers, and the public. It also made comparisons across parliamentary motions and sessions easier to reproduce.",
    ]),
    figures: Object.freeze([
      Object.freeze({
        img: "images/portfolio/parliament-watch-ocr/voting-records-pdf-example.png",
        imgWebp:
          "images/portfolio/parliament-watch-ocr/voting-records-pdf-example.webp",
        alt: "Three pages of Thai House of Representatives voting records as official PDFs: Thai script and Thai numerals in aligned, table-like layouts without a formal grid.",
        caption:
          "Examples of parliamentary [[https://msbis.parliament.go.th/ewtadmin/ewt/parliament_report/main_warehouse_dll_x.php?aid=11753&mid=4617|voting records]] and [[https://msbis.parliament.go.th/ewtadmin/ewt/parliament_report/main_warehouse_dll_x.php?aid=11489&mid=4617|summary reports]], published as PDFs rather than ready-to-query tables — see **Why it matters** below.",
      }),
    ]),
    figureColumns: 1,
  }),

  /* Why it matters */
  overviewTitle: "Why it matters",
  overview: Object.freeze([
    "Legislative voting records published by government institutions are foundational ==public-interest data==. When those records exist only as PDFs and semi-structured documents, meaningful analysis becomes difficult not only for journalists and researchers, but also for the public trying to understand how elected representatives actually vote.",
    "Converting parliamentary voting records into reusable data opened up questions such as:",
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
    "The cleaned records also supported public charts that made complex voting behavior easier for broader audiences to explore.",
    Object.freeze({
      baPanel: Object.freeze({
        variant: "after",
        title: "What structured parliamentary records enabled",
        paragraphs: Object.freeze([
          "Once reconstructed into structured datasets, parliamentary records could finally be compared across motions, parties, and legislative sessions without manually rebuilding vote tables from government PDFs.",
          "The records supported:",
          Object.freeze({
            bulletListPlain: true,
            bulletList: Object.freeze([
              "coalition and voting-alignment analysis",
              "attendance and abstention tracking",
              "cross-party comparison",
              "longitudinal parliamentary review",
              "public-interest visualization and reporting",
            ]),
          }),
        ]),
      }),
    }),
  ]),

  /* Contribution */
  strategyTitle: "Contribution",
  strategyIntro: Object.freeze([
    "I turned parliamentary voting PDFs into analysis-ready records and public visualization inputs. This work included OCR-assisted extraction, semi-structured document parsing, Thai script and numeral normalization, data validation workflows, and open-data exports.",
    "The outputs helped examine voting alignment, coalition behavior, and parliamentary trends without forcing every analyst to start from raw documents.",
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
      "Seven-step pipeline from parliamentary PDFs through OCR, Thai numeral handling, normalization, validation, open data, and public visualizations.",
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
      body: "I extracted parliamentary voting records and normalized the results into formats that could support comparison, reporting, and interactive charts.",
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
    "Legislative records are public-interest data. Small extraction errors can silently change the interpretation of parliamentary behavior if validation failures are not surfaced early.",
    "I treated reconciliation, MP roster checks, and vote-total mismatches as first-class outputs rather than allowing questionable records to disappear into a “clean” dataset export.",
  ]),

  /* Data limitations */
  ambiguitySection: Object.freeze({
    title: "Data limitations",
    body: Object.freeze([
      "The source dataset did not contain every parliamentary vote from Thailand's 26th House of Representatives. Only parliamentary motions with publicly available per-member voting records were included, and some records required additional normalization because formatting conventions varied across parliamentary documents.",
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

  /* Public visualization */
  approachSecondaryTitle: "Public visualization",
  approachSecondaryIntro:
    "Public parliamentary voting view built from government-published PDFs that had been extracted, cleaned, and checked.",
  approachSecondaryIframeEmbed: Object.freeze({
    src: "https://docs.google.com/spreadsheets/d/1y4avcF8i29Gt_TdY7FR63NOvq-_2f5gl05AEr4VqUIc/preview?gid=72713396",
    title: "Voting sheet preview",
    minHeight: "510px",
  }),

  /* Public dataset */
  publicDatasetSectionTitle: "Public dataset",
  publicDatasetSectionIntro:
    "Parliamentary voting dataset reconstructed from Thai House PDFs and prepared for transparency reporting, civic-data work, and reproducible vote comparisons. The dataset is publicly available in [[https://docs.google.com/spreadsheets/d/1HxHsCAc_2j-nHvmLx_XF5Je49gidRRoRtJ7NwCNURpA/edit?gid=706401250#gid=706401250|Google Sheets]] format.",

  /* Broader impact */
  deferredImpactTitle: "Impact",
  deferredImpactLead: Object.freeze([
    "The extraction pipeline made previously difficult-to-search parliamentary records usable for:",
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
        text: "This pipeline supported charts, spreadsheets, and vote analysis, and records from the same transparency ecosystem also contributed to broader civic-data projects. One example ",
        externalLink: Object.freeze({
          href: "https://parliamentwatch.wevis.info/#voting",
          label: "Parliament Watch",
        }),
        after:
          ": a public-facing platform for exploring representatives, parliamentary votes, legislation, and related government records without starting from raw PDF documents.",
      }),
      "Other civic-data teams and interfaces can build on similar open records for different forms of public-interest reporting and visualization.",
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
