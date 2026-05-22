/**
 * Industrial Logistic Performance Evaluation (IEOM 2016) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { industrialLogisticsEvaluationCaseStudyVariant } from "./variants.js";

const baseIndustrialLogisticsEvaluationCaseStudy = {
  eyebrow: "Research · Logistics · IEOM 2016",

  featuredImg:
    "images/portfolio/industrial-logistics-evaluation/featured-image.jpg",

  featuredImgWebp:
    "images/portfolio/industrial-logistics-evaluation/featured-image.webp",

  featuredImageAlt:
    "LPI radar chart comparing Thailand, Singapore, and Malaysia across timeliness, customs, international shipments, and logistics competence; Thailand map and forklift illustration",

  featuredImageCompact: true,

  featuredImageObjectPosition: "center center",

  task: "Evaluate how logistics friction actually appears inside a Thai printing and packaging operation — where warehouse flow, outbound shipping, tracking, and infrastructure constraints stop matching the clean assumptions inside national logistics rankings.",

  focus: ["Operations research", "LPI benchmarking", "Case study methodology"],

  context: "IEOM 2016 · Academic research (Thailand)",

  techStack: [
    {
      label: "MATLAB",
      href: "https://www.mathworks.com/products/matlab.html",
    },
    {
      label: "C",
      href: "https://en.wikipedia.org/wiki/C_(programming_language)",
    },
    {
      label: "World Bank LPI",
      href: "https://lpi.worldbank.org/",
    },
    {
      label: "Thailand ILPI (DOL handbook)",
      href: "https://dol.dip.go.th/uploadcontent/DOL/Pert/ILPI_Handbook_2560.pdf",
    },
    {
      label: "IEOM proceedings",
      href: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
    },
  ],

  results: [
    {
      value: "Shop-floor lens",
      label:
        "National LPI dimensions translated into receiving, warehousing, scheduling, and outbound-shipping processes.",
    },
    {
      value: "Regional benchmark",
      label:
        "Thailand’s 2014 logistics profile compared against Singapore and Malaysia to surface operational gaps.",
    },
    {
      value: "Improvement paths",
      label:
        "Recommendations separated warehouse-level fixes from infrastructure and policy constraints.",
    },
  ],
  resultsLabelCase: "sentence",

  overviewTitle: "Overview",

  overview: [
    "National logistics scores flatten reality. A warehouse floor does not. Printing and packaging sits where make-to-order pressure, material handling, and outbound distribution meet.",

    "“Logistics performance” is never one headline number—it depends which LPI dimensions you measure and whether you stay at national averages or walk the shop floor.",

    "This study applies the World Bank Logistics Performance Index (LPI) framework to one Thai printing and packaging operation and asks: which dimensions actually constrain the business, and what does the gap between Thailand’s national LPI score and shop-floor reality look like?",

    {
      text: "Full paper (IEOM 2016 proceedings): ",
      externalLink: {
        href: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
        label:
          "Industrial Logistic Performance Evaluation | A Case of Printing and Packaging Company in Thailand (PDF)",
      },
      after: "",
    },
  ],

  strategyTitle: "What I evaluated",

  pillars: [
    {
      title: "Operational mapping",

      body: "Mapped the six World Bank LPI dimensions to specific operational touch-points inside the company — receiving, warehousing, production scheduling, and outbound shipping — so each score connects to an observable process, not an abstract national average.",
    },

    {
      title: "Constraint analysis",

      body: "Compared the company’s performance against Thailand’s 2014 LPI scores and regional peers such as Singapore and Malaysia to identify where domestic infrastructure, customs friction, and internal process gaps compound.",
    },

    {
      title: "Improvement leverage",

      body: "Closed with concrete recommendations: which dimensions the company could influence directly, such as warehouse throughput and tracking, which required policy or infrastructure change, and where the biggest cost-to-improvement leverage sat.",
    },
  ],

  approachTitle: "How I approached it",

  approach: [
    "Used a structured case-study methodology: site observation, operational data, and stakeholder interviews to ground LPI scores in what actually happens on the warehouse floor and the loading dock.",

    "Kept the paper readable across audiences — operations managers, logistics academics, and Thai industrial SME stakeholders — with explicit assumptions and data tables rather than opaque scoring.",
  ],

  outcome:
    "IEOM 2016 — logistics performance at a Thai printing and packaging firm via the World Bank LPI: tie national scores to warehouse flow, loading-dock reality, regional benchmarks, and improvement leverage.",

  projectUrl: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
};

export const industrialLogisticsEvaluationProject = {
  ...getMissionGalleryManifestRow("industrial-logistics-evaluation"),
  caseStudy: {
    ...baseIndustrialLogisticsEvaluationCaseStudy,
    ...industrialLogisticsEvaluationCaseStudyVariant,
  },
};
