import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const peaEServiceCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    // eyebrow: "Data journalism · Engineering & user experience (UX)",
    task: "Build public sector portals for civic data access — design user experiences for electricity and water services, integrating data flows for transparent government interactions.",
    /* Impact */
    results: [
      // {
      //   value: "Accessible",
      //   label: "WCAG-compliant portal",
      // },
      // {
      //   value: "User-friendly",
      //   label: "Simplified application processes",
      // },
    ],
    /* Overview */
    overview: [
      "Public utilities already had the data. The harder problem was making fragmented electricity, water, land, energy, and GIS-linked workflows feel understandable as one public-facing journey.",

      "PEA E-Service acted as a shared entry point where citizens could apply for electricity and water services, register requests, and track project status through one authenticated portal shared across PEA (Provincial Electricity Authority) and PWA (Provincial Waterworks Authority).",

      "Some workflows remained partially decentralized underneath. Solar and producer-related programs, including PPIM (Power Producer Information Management System), still depended on approvals handled inside legacy ministry and agency systems. Land and highway agencies supplied project and GIS-linked validation data, while clerks continued approval workflows in their own operational systems before synchronized status updates surfaced back to the public portal.",

      "I worked across frontend UX, responsive public-service interfaces, accessibility requirements, and workflow coordination so fragmented infrastructure systems remained understandable from the citizen side even when backend ownership stayed distributed.",
    ],
    /* System goals */
    strategyTitle: "System goals",
    pillars: [
      {
        title: "Unified service journey",
        body: "Designed authenticated public workflows so electricity, water, and related government-service requests could behave like one connected process instead of separate agency handoffs.",
      },
      {
        title: "Workflow visibility",
        body: "Built request-tracking interfaces and synchronized status surfaces so applicants could follow service progress across utility and GIS-linked systems.",
      },
      {
        title: "Public-service accessibility",
        body: "Implemented responsive WCAG-aligned interfaces for public-sector accessibility requirements across desktop and mobile environments.",
      },
      {
        title: "Cross-agency coordination",
        body: "Worked with utility, GIS, registry, land, and energy-related teams to keep case data and service flows aligned under one operational portal.",
      },
    ],
  }),
});

export const peaEServiceCaseStudyVariant =
  peaEServiceCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  peaEServiceCaseStudyVariants.swe;
