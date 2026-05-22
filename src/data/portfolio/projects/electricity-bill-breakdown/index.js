/**
 * Where Does Your Electricity Bill Go? (JustPow) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { electricityBillBreakdownCaseStudyVariant } from "./variants.js";

const baseElectricityBillBreakdownCaseStudy = {
  /* Header / intro */
  eyebrow:
    "Civic explainer · Energy systems · Public-interest information design",
  /* Media */
  featuredImg: "images/portfolio/electricity-bill-breakdown/featured-image.jpg",
  featuredImgWebp:
    "images/portfolio/electricity-bill-breakdown/featured-image.webp",
  featuredImageAlt:
    "JustPow — Electricity BiLL BREAKDOWN on light textured paper: yellow lightning bolt and BiLL accent, English subtitle on where your monthly bill goes and who gets paid, ring of gray energy lifecycle line icons",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  /* Project frame */
  task: "Design a public-facing explainer that translates Thai electricity billing structures, tariffs, and fuel-adjustment charges into accessible civic information—helping readers without a utility background understand how regulatory decisions and infrastructure costs shape the final bill they receive each month.",
  focus: [
    "User-flow design",
    "Information architecture",
    "Domain translation (energy → plain language)",
  ],
  context: "JustPow (Thailand)",
  /* Overview */
  overviewTitle: "Overview",
  overview: [
    "Most Thai consumers see a single total on their electricity bill. Behind it sits a layered structure — base energy charges, a variable fuel tariff (Ft), regulatory surcharges, VAT — that few people can parse without domain knowledge. This tool unpacks that structure and asks an uncomfortable civic question: is the price fair?",
    "My role was flow design and information support. I mapped the reader journey from casual curiosity through progressive disclosure of each charge component, making sure every screen earns the next rather than dumping definitions upfront. I also grounded the copy in how Thai billing and tariff mechanisms actually work, so the tool educates without hand-waving.",
    "I brought firsthand utility-system context from my time at PEA (Provincial Electricity Authority of Thailand) — outage management, billing integrations, real-time consumption dashboards — which gave me the mental model to connect what appears on a PDF bill to the engineering and regulatory reality underneath.",
  ],
  /* What I shaped */
  /* What I focused on */
  strategyTitle: "What I shaped",
  strategyIntro:
    "My lane: flow architecture and domain-grounded information design. Engineering (WordPress / Elementor) was handled by the team; I owned how users move through the content and whether the explanations hold up technically.",
  pillars: [
    {
      title: "Progressive disclosure flow",
      body: "Mapped the journey from a single question (\u201cwhat am I paying for?\u201d) through energy charges, Ft, fixed costs, and taxes — each screen resolves one layer before introducing the next, so complexity builds gradually rather than all at once.",
    },
    {
      title: "Domain-accurate language",
      body: "Wrote and reviewed explanations against real Thai tariff structures and PEA billing logic, replacing vague or outdated folklore with grounded, plain-language descriptions that a non-engineer can follow.",
    },
    {
      title: "Fairness as reader judgment",
      body: "Framed the closing question (\u201cis it fair?\u201d) as an informed conclusion the reader reaches on their own — evidence in the flow, opinion left to the user. The tool is civic, not a campaign.",
    },
  ],
  /* Reflection */
  /* How it shipped */
  approachTitle: "How [[/#work-pea|PEA]] experience shaped my contribution",
  approach: [
    "At [[/#work-pea|PEA]] I worked on the systems that generate bills — outage tracking, consumption data pipelines, customer-facing dashboards. That gave me a practical sense of what the numbers on a bill actually represent and where the gaps between engineering data and consumer-facing language create confusion.",
    "I used that context to keep terminology consistent with what Thai consumers see on real bills while explaining the engineering levers (variable fuel components, demand charges, cross-subsidy structures) in language that doesn't require a utility background.",
  ],
  /* Impact */
  results: null,
  /* Footer */
  footerTagline:
    "Civic explainer for Thai electricity bills—progressive flow from one honest question (\u201cwhat am I paying for?\u201d) to tariffs, Ft, and fairness.",
};

export const electricityBillBreakdownProject = {
  ...getMissionGalleryManifestRow("electricity-bill-breakdown"),
  /* Export */
  caseStudy: {
    ...baseElectricityBillBreakdownCaseStudy,
    ...electricityBillBreakdownCaseStudyVariant,
  },
};
