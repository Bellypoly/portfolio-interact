/**
 * VOTE62 — ECT Report 69 OCR/ETL pipeline — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { vote62EctReport69CaseStudyVariant } from "./variants.js";

const baseVote62EctReport69CaseStudy = {
  eyebrow: "Civic Tech · OCR · ETL · Data Engineering · Data Storytelling",
  featuredImg: "images/portfolio/vote62-ect-report-69/featured-image.png",
  featuredImgWebp:
    "images/portfolio/vote62-ect-report-69/featured-image.webp",
  featuredImageAlt:
    "Stacks of Thai election tally forms with handwritten edits \u2014 the paper truth voters see before it becomes rows in an open dataset.",
  task: "Build an OCR and ETL pipeline to extract structured voting data from Thai ECT Report 69 forms — scanned government documents with Thai text, handwritten edits, and complex layouts — for open data and election analysis.",
  disciplines: [
    "OCR processing",
    "ETL pipelines",
    "Data engineering",
    "Election data",
  ],
  context: "VOTE62 · Thai Election Commission",
  techStack: [
    {
      label: "Python",
      href: "https://www.python.org/",
    },
    {
      label: "OCR libraries",
      href: "https://pypi.org/project/pytesseract/",
    },
    {
      label: "Data processing",
      href: "https://pandas.pydata.org/",
    },
    {
      label: "ETL tools",
      href: "https://airflow.apache.org/",
    },
  ],
  overview: [
    "Developed OCR and ETL systems to digitize Thai election tally forms, extracting structured data for transparency and analysis.",
  ],
  strategyTitle: "What I did",
  pillars: [
    {
      title: "OCR pipeline",
      body: "Built OCR systems to recognize Thai text and handwritten edits on scanned forms.",
    },
    {
      title: "Data extraction",
      body: "Created ETL processes to structure voting data from complex document layouts.",
    },
    {
      title: "Data validation",
      body: "Implemented validation and quality checks for accurate election data.",
    },
  ],
  approachTitle: "How I approached it",
  approach: [
    "Researched Thai OCR challenges, developed custom extraction logic, and validated against official sources.",
  ],
  results: [
    {
      value: "Structured",
      label: "Election data from scanned forms",
    },
  ],
};

export const vote62EctReport69Project = {
  ...getMissionGalleryManifestRow("vote62-ect-report-69"),
  caseStudy: { ...baseVote62EctReport69CaseStudy, ...vote62EctReport69CaseStudyVariant },
};