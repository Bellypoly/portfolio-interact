/**
 * PEA E-Service (Thailand public-sector portal) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { peaEServiceCaseStudyVariant } from "./variants.js";

const basePeaEServiceCaseStudy = {
  /* Header / intro */
  eyebrow: "Public sector · Engineering & user experience (UX)",
  featuredImg: "images/portfolio/pea-e-service/featured-image.png",
  featuredImgWebp: "images/portfolio/pea-e-service/featured-image.webp",
  featuredImageAlt:
    "PEA E\u2011Service banner — purple E\u2011SERVICE branding; apply for electricity and water; three service paths (individual, organization, check request status); laptop and phone mockups; footer with eservice.pea.co.th and 1129 PEA Contact Center",
  featuredImageCompact: true,
  task: "Design and build the user experience for PEA's public e-service portal: application flows for electricity and water connections, status tracking, and service requests — with accessibility, mobile-first design, and integration with PEA's backend systems.",
  disciplines: [
    "UX design",
    "Frontend development",
    "Accessibility",
    "Public sector integration",
  ],
  context: "Provincial Electricity Authority of Thailand (PEA)",
  techStack: [
    {
      label: "PEA",
      href: "https://www.pea.co.th/",
    },
    {
      label: "HTML/CSS/JavaScript",
      href: "https://developer.mozilla.org/en-US/docs/Web",
    },
    {
      label: "Responsive design",
      href: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/responsive_web_design_basics",
    },
    {
      label: "Accessibility (WCAG)",
      href: "https://www.w3.org/WAI/WCAG21/quickref/",
    },
  ],
  /* Impact */
  results: [
    {
      value: "Accessible",
      label: "WCAG-compliant portal",
    },
    {
      value: "User-friendly",
      label: "Simplified application processes",
    },
  ],
  /* Overview */
  overview: [
    "PEA E-Service is the public portal for electricity and water connection applications, status tracking, and service requests. I designed the user flows, built the frontend, and ensured accessibility and mobile compatibility.",
  ],
  /* What I did */
  strategyTitle: "What I did",
  pillars: [
    {
      title: "User flow design",
      body: "Mapped out application processes for individuals and organizations, including status tracking and request submission.",
    },
    {
      title: "Frontend development",
      body: "Built responsive, accessible web interfaces integrated with PEA's backend systems.",
    },
    {
      title: "Accessibility",
      body: "Ensured WCAG compliance for public sector accessibility requirements.",
    },
  ],
  /* How I shipped it */
  approachTitle: "How I shipped it",
  approach: [
    "Collaborated with PEA teams on requirements, designed wireframes and prototypes, developed the frontend, and tested for accessibility and usability.",
  ],
};

export const peaEServiceProject = {
  ...getMissionGalleryManifestRow("pea-e-service"),
  caseStudy: { ...basePeaEServiceCaseStudy, ...peaEServiceCaseStudyVariant },
};