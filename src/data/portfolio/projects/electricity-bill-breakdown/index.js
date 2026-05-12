/**
 * Where Does Your Electricity Bill Go? (JustPow) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { electricityBillBreakdownCaseStudyVariant } from "./variants.js";

const baseElectricityBillBreakdownCaseStudy = {
  /* Header / intro */
  eyebrow: "Civic Tech · Flow Design · Energy Literacy",
  featuredImg:
    "images/portfolio/electricity-bill-breakdown/featured-image.jpg",
  featuredImgWebp:
    "images/portfolio/electricity-bill-breakdown/featured-image.webp",
  featuredImageAlt:
    "JustPow — Electricity BiLL BREAKDOWN on light textured paper: yellow lightning bolt and BiLL accent, English subtitle on where your monthly bill goes and who gets paid, ring of gray energy lifecycle line icons",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  task: "Design the user flow and information structure for a civic tool that explains Thai electricity bills — what each charge means, where the money goes, and whether the pricing is fair — so readers without a utility background can follow a complex regulatory topic one step at a time.",
  disciplines: [
    "User-flow design",
    "Information architecture",
    "Domain translation (energy → plain language)",
  ],
  context: "JustPow (Thailand)",
  techStack: [
    {
      label: "FigJam",
      href: "https://www.figma.com/figjam/",
    },
    {
      label: "WordPress",
      href: "https://wordpress.org/",
    },
  ],
  /* Overview */
  overviewTitle: "Overview",
  overview: [
    "Most Thai consumers see a single total on their electricity bill. Behind it sits a layered structure — base energy charges, a variable fuel tariff (Ft), regulatory surcharges, VAT — that few people can parse without domain knowledge. This tool unpacks that structure and asks an uncomfortable civic question: is the price fair?",
    "My role was flow design and information support. I mapped the reader journey from casual curiosity through progressive disclosure of each charge component, making sure every screen earns the next rather than dumping definitions upfront. I also grounded the copy in how Thai billing and tariff mechanisms actually work, so the tool educates without hand-waving.",
    "I brought firsthand utility-system context from my time at PEA (Provincial Electricity Authority of Thailand) — outage management, billing integrations, real-time consumption dashboards — which gave me the mental model to connect what appears on a PDF bill to the engineering and regulatory reality underneath.",
  ],
  /* What I shaped */
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
  approachTitle: "How PEA experience shaped my contribution",
  approach: [
    "At PEA I worked on the systems that generate bills — outage tracking, consumption data pipelines, customer-facing dashboards. That gave me a practical sense of what the numbers on a bill actually represent and where the gaps between engineering data and consumer-facing language create confusion.",
    "I used that context to keep terminology consistent with what Thai consumers see on real bills while explaining the engineering levers (variable fuel components, demand charges, cross-subsidy structures) in language that doesn't require a utility background.",
  ],
  results: null,
};

export const electricityBillBreakdownProject = {
  ...getMissionGalleryManifestRow("electricity-bill-breakdown"),
  caseStudy: { ...baseElectricityBillBreakdownCaseStudy, ...electricityBillBreakdownCaseStudyVariant },
};