/**
 * RDFD — Discovering Fake Drivers — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { rdfdCaseStudyVariant } from "./variants.js";

const baseRdfdCaseStudy = {
  eyebrow: "Research · Machine learning",
  featuredImg: "images/portfolio/rdfd/featured-image.jpg",
  featuredImgWebp: "images/portfolio/rdfd/featured-image.webp",
  featuredImageAlt:
    "Illustration — driver at the wheel with phone and watch maps, dashboard trend lines under a magnifying glass, and alert monitoring",
  featuredImageCompact: true,
  task: "Research and develop machine learning models to detect fake drivers in ride-sharing data — analyze patterns in GPS, timing, and behavioral data to identify fraudulent accounts.",
  disciplines: [
    "Machine learning",
    "Data analysis",
    "Pattern recognition",
  ],
  context: "Academic research · Ride-sharing industry",
  techStack: [
    {
      label: "Python",
      href: "https://www.python.org/",
    },
    {
      label: "Machine learning libraries",
      href: "https://scikit-learn.org/",
    },
    {
      label: "Data visualization",
      href: "https://matplotlib.org/",
    },
  ],
  overview: [
    "Developed ML models to detect fake driver accounts in ride-sharing platforms by analyzing GPS traces, trip patterns, and behavioral anomalies.",
  ],
  strategyTitle: "What I did",
  pillars: [
    {
      title: "Data analysis",
      body: "Analyzed large datasets of driver behavior to identify patterns distinguishing real from fake accounts.",
    },
    {
      title: "Model development",
      body: "Built and trained ML models for anomaly detection and classification.",
    },
  ],
  approachTitle: "How I approached it",
  approach: [
    "Collected and preprocessed data, engineered features, trained models, and evaluated performance.",
  ],
  results: [
    {
      value: "Effective",
      label: "Detection of fake drivers",
    },
  ],
};

export const rdfdProject = {
  ...getMissionGalleryManifestRow("rdfd"),
  caseStudy: { ...baseRdfdCaseStudy, ...rdfdCaseStudyVariant },
};