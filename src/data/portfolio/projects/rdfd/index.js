/**
 * Discovering Fake Drivers Based on Temporal Driving Behaviors — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { rdfdCaseStudyVariant } from "./variants.js";

const baseRdfdCaseStudy = {
  /* Header / intro */
  eyebrow: "Research · Machine learning",
  /* Media */
  featuredImg: "images/portfolio/rdfd/featured-image.jpg",
  featuredImgWebp: "images/portfolio/rdfd/featured-image.webp",
  featuredImageAlt:
    "Illustration — driver at the wheel with phone and watch maps, dashboard trend lines under a magnifying glass, and alert monitoring",
  featuredImageCompact: true,
  /* Project frame */
  task: "Research and develop machine learning models to detect fake drivers in ride-sharing data — analyze patterns in GPS, timing, and behavioral data to identify fraudulent accounts.",
  focus: ["Machine learning", "Data analysis", "Pattern recognition"],
  context: "Academic research · Ride-sharing industry",
  /* Stack */
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
  /* Impact */
  results: [
    {
      value: "Effective",
      label: "Detection of fake drivers",
    },
  ],
  /* Overview */
  overview: [
    "Developed ML models to detect fake driver accounts in ride-sharing platforms by analyzing GPS traces, trip patterns, and behavioral anomalies.",
  ],
  /* What I did */
  /* What I focused on */
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
  /* How I approached it */
  /* How it shipped */
  approachTitle: "How I approached it",
  approach: [
    "Collected and preprocessed data, engineered features, trained models, and evaluated performance.",
  ],
};

export const rdfdProject = {
  ...getMissionGalleryManifestRow("rdfd"),
  /* Export */
  caseStudy: { ...baseRdfdCaseStudy, ...rdfdCaseStudyVariant },
};
