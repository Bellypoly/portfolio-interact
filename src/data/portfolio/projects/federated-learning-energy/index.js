/**
 * Federated Learning energy (NOMA) — thesis portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { federatedLearningEnergyCaseStudyVariant } from "./variants.js";

const baseFederatedLearningEnergyCaseStudy = {
  /* Header / intro */
  eyebrow: "Research · Systems · Wireless",
  /* Media */
  featuredImg: "images/portfolio/federated-learning-energy/featured-image.jpg",
  featuredImgWebp:
    "images/portfolio/federated-learning-energy/featured-image.webp",
  featuredImageAlt:
    "Diagram — server aggregates local updates ΔW from devices with battery energy indicators; title: Simulating Energy Consumption in Federated Learning Systems",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  /* Project frame */
  task: "Quantify how federated learning burns energy at the edge when the radio channel is non-orthogonal multiple access (NOMA)—so training stories stay honest about compute and transmission cost.",
  focus: ["MATLAB simulation", "Federated learning", "Wireless modeling"],
  context: "Academic / systems research",
  /* Stack */
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
      label: "Federated learning",
      href: "https://en.wikipedia.org/wiki/Federated_learning",
    },
    {
      label: "NOMA (wireless)",
      href: "https://en.wikipedia.org/wiki/Non-orthogonal_multiple_access",
    },
  ],
  /* Overview */
  overview: [
    "Federated learning moves training closer to data, but the bill is never compute alone: every aggregation round pays radio energy too. With NOMA, who shares spectrum—and how—changes interference patterns, so you cannot reuse “plain OFDMA” energy arguments without lying to the reader.",
    "The thesis contribution is deliberately comparative: sweep operating regimes, separate uplink vs compute spend where the model allows, and publish assumptions so another lab can rerun the sweep or argue with the numbers.",
  ],
  /* What I focused on */
  strategyTitle: "What I did",
  strategyIntro:
    "My role: implement the MATLAB simulation and analysis for federated learning energy use under NOMA. I kept the model legible to wireless and ML readers—parameters with physical meanings, outputs that separate compute vs transmit costs.",
  pillars: [
    {
      title: "Faithful abstraction",
      body: "I encoded channel and scheduling assumptions without over-claiming full-stack fidelity.",
    },
    {
      title: "Sweep-ready",
      body: "I built parameter grids that highlight breakpoints—when FL round budgets dominate, when NOMA wins, and saturation regimes.",
    },
    {
      title: "Open artifacts",
      body: "I published scripts and figures so others could re-run and challenge the conclusions.",
    },
  ],
  /* How it shipped */
  approachTitle: "How I shipped it",
  approach: [
    "I wrote MATLAB modules for client sampling, aggregation rounds, and energy accounting tied to the RF model.",
    "I generated plots that isolate uplink vs downlink, per-device heterogeneity, and convergence milestones.",
  ],
  /* Impact */
  results: null,
};

export const federatedLearningEnergyProject = {
  ...getMissionGalleryManifestRow("federated-learning-energy"),
  /* Export */
  caseStudy: {
    ...baseFederatedLearningEnergyCaseStudy,
    ...federatedLearningEnergyCaseStudyVariant,
  },
};
