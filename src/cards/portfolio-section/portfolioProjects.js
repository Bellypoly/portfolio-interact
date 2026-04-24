/**
 * Portfolio projects — one entry drives Mission Gallery cards and `/mission/:slug` case studies.
 * Optional `caseStudy.techStack`: `{ label, href }[]` (or legacy `string[]`) — Stack row in meta; links open in a new tab.
 *
 * Mission Gallery order: `getMissionGalleryProjects()` uses `PROFESSIONAL_MISSION_GALLERY_ORDER` for
 * professional entries (fallback: `portfolioYear` newest first, then slug). Research uses
 * `portfolioYear` + slug only.
 *
 * `portfolioLabel` — short Mission Gallery context tag (fixed vocabulary): Product, Competition,
 * Thesis, Paper, Academic, Marketplace, Platform, Civic tech, Public sector.
 *
 * Each project lives in its own file under `./projects/` and is re-exported from the barrel.
 * Adding a project: create `./projects/<slug>Project.js`, re-export it from `./projects/index.js`,
 * then add it to `PORTFOLIO_PROJECTS` below (order here is not authoritative—see gallery sort).
 */

import {
  articlePageRedesignProject,
  dynamicPaywallProject,
  electricityBillBreakdownProject,
  federatedLearningEnergyProject,
  industrialLogisticsEvaluationProject,
  jerdiKidsProject,
  jobthaiProject,
  localElectionsHubProject,
  mapMagicProject,
  outageManagementSystemProject,
  parliamentWatchOcrProject,
  peaEServiceProject,
  photographyCompetitionMyHometownProject,
  rdfdProject,
  subscriptionCheckoutActivationProject,
  vote62EctReport69Project,
} from "./projects/index.js";

export function getPortfolioProjectBySlug(slug) {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug) ?? null;
}

function compareMissionGalleryOrder(a, b) {
  const y = (b.portfolioYear ?? 0) - (a.portfolioYear ?? 0);
  if (y !== 0) return y;
  return (a.slug ?? "").localeCompare(b.slug ?? "");
}

/** Slug order for Mission Gallery — professional group only (overrides year + slug). */
const PROFESSIONAL_MISSION_GALLERY_ORDER = [
  "dynamic-paywall",
  "subscription-checkout-activation","article-page-redesign",
  "local-elections-hub",
  "electricity-bill-breakdown",
  "parliament-watch-ocr",
  "vote62-ect-report-69",
  "jobthai",
  "map-magic",
  "pea-e-service",
  "outage-management-system",
  "jerdi-kids",
  "photography-competition-my-hometown",
];

function compareProfessionalMissionGallery(a, b) {
  const ia = PROFESSIONAL_MISSION_GALLERY_ORDER.indexOf(a.slug ?? "");
  const ib = PROFESSIONAL_MISSION_GALLERY_ORDER.indexOf(b.slug ?? "");
  const aKnown = ia !== -1;
  const bKnown = ib !== -1;
  if (aKnown && bKnown) return ia - ib;
  if (aKnown !== bKnown) return aKnown ? -1 : 1;
  return compareMissionGalleryOrder(a, b);
}

/** Ordered list for the Mission Gallery section (group 1: work + competitions, group 2: research). */
export function getMissionGalleryProjects() {
  const professional = PORTFOLIO_PROJECTS.filter(
    (p) => p.portfolioGroup !== "research",
  );
  const research = PORTFOLIO_PROJECTS.filter(
    (p) => p.portfolioGroup === "research",
  );
  return [
    ...professional.sort(compareProfessionalMissionGallery),
    ...research.sort(compareMissionGalleryOrder),
  ];
}

export const PORTFOLIO_PROJECTS = [
  dynamicPaywallProject,
  jerdiKidsProject,
  photographyCompetitionMyHometownProject,
  federatedLearningEnergyProject,
  localElectionsHubProject,
  subscriptionCheckoutActivationProject,
  articlePageRedesignProject,
  jobthaiProject,
  mapMagicProject,
  industrialLogisticsEvaluationProject,
  // {
  //   slug: "squeeze-it",
  //   portfolioGroup: "research",
  //   portfolioYear: 2014,
  //   portfolioLabel: "Academic",
  //   name: "Squeeze It",
  //   desc: "Heuristic-search AI for a marble puzzle—D3 board you can read, agent whose reasoning stays visible.",
  //   img: "images/portfolio/squeeze-it.jpg",
  //   alt: "Squeeze It",
  //   link: "https://github.com/Bellypoly/AI-project1",
  //   caseStudy: {
  //     eyebrow: "AI · Visualization",
  //     task: "Ship a marble puzzle people can parse move-by-move, and an AI opponent steered by legible heuristics—not an opaque win/loss score.",
  //     disciplines: ["Heuristic search", "D3.js", "Game UX"],
  //     context: "Academic AI project",
  //     techStack: [
  //       {
  //         label: "JavaScript",
  //         href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  //       },
  //       { label: "D3.js", href: "https://d3js.org/" },
  //       {
  //         label: "Heuristic search",
  //         href: "https://en.wikipedia.org/wiki/Heuristic_search",
  //       },
  //     ],
  //     overview: [
  //       "Even a compact game board fails if motion is ambiguous: readers should see the last move, the next options, and why the bot leaned one way. I treated clarity as the product—not chrome around a solver.",
  //       "D3.js carried transitions and stable geometry so the puzzle felt like software someone would demo, not a Matlab plot with buttons.",
  //     ],
  //     strategyTitle: "What I did",
  //     strategyIntro:
  //       "My role: build the full-stack academic project—D3.js game UI plus a heuristic search agent with legible reasoning. I designed for two audiences: players who want a tight loop, and reviewers who need to see why the AI moved.",
  //     pillars: [
  //       {
  //         title: "Explainable play",
  //         body: "I surfaced heuristic cues that steer search—players can disagree, but they’re never mystified.",
  //       },
  //       {
  //         title: "Performance where it matters",
  //         body: "I tuned search depth against frame time so the UI stayed responsive.",
  //       },
  //       {
  //         title: "Joyful feedback",
  //         body: "I used motion and timing (color, transitions) to celebrate good moves without noise.",
  //       },
  //     ],
  //     approachTitle: "How I shipped it",
  //     approach: [
  //       "I implemented the heuristic search core with tunable weights and a replay timeline for interesting branches.",
  //       "I built D3-driven board updates with layout that stayed stable across viewport changes.",
  //     ],
  //     results: null,
  //   },
  // },
  rdfdProject,
  parliamentWatchOcrProject,
  vote62EctReport69Project,
  electricityBillBreakdownProject,
  peaEServiceProject,
  outageManagementSystemProject,
];
