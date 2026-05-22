/**
 * JobThai (THiNKNET) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { jobthaiCaseStudyVariant } from "./variants.js";

const baseJobthaiCaseStudy = {
  /* Media */
  featuredImg: "images/portfolio/jobthai/featured-image.png",
  featuredImgWebp: "images/portfolio/jobthai/featured-image.webp",
  featuredImageAlt:
    "JobThai — job seeker and recruiter illustration with Resume branding and soft green workspace palette",
  /* Project frame */
  task: "Move seekers from skimming listings to confident applications: search that surfaces the right roles under real filters, and resume tooling that strengthens each profile instead of collapsing everything into the same template.",
  context: "JobThai — THiNKNET Co., Ltd. · national job marketplace (Thailand)",
  /* Stack */
  techStack: [
    {
      label: "THiNKNET",
      href: "https://www.thinknet.co.th/",
    },
    { label: "Laravel", href: "https://laravel.com/" },
    {
      label: "Elasticsearch",
      href: "https://www.elastic.co/elasticsearch",
    },
    {
      label: "JavaScript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { label: "MySQL", href: "https://www.mysql.com/" },
  ],
  /* What I focused on */
  strategyIntro:
    "Three product bets, expressed as journeys: make fit legible early, keep momentum from interest to an application-ready profile, and surface trust signals employers and seekers both lean on.",
  /* How it shipped */
  approachTitle: "How it went to production",
  approach: [
    "Search refinement shipped as explainable filters: seekers could tighten results without guessing what the backend was doing. Elasticsearch work sat behind that — tuning relevance and query behavior so the experience felt obvious on the surface even when the ranking logic underneath was opaque.",
    "Resume guidance shipped as progressive checkpoints rather than a single wall of fields—enough structure to increase completion, enough flexibility that profiles still sounded like people.",
    "Funnel instrumentation split mobile vs desktop and new vs returning cohorts; we chased the worst drop-offs first instead of polishing screens nobody reached.",
  ],
  /* Impact */
  results: null,
};

export const jobthaiProject = {
  ...getMissionGalleryManifestRow("jobthai"),
  /* Export */
  caseStudy: { ...baseJobthaiCaseStudy, ...jobthaiCaseStudyVariant },
};
