/**
 * PEA outage management / OMS integration — portfolio entry + full case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { outageManagementSystemCaseStudyVariant } from "./variants.js";

const baseOutageManagementSystemCaseStudy = {
  /* Header / intro */
  eyebrow: "Public sector · OMS · Multi-system integration",
  /* Media */
  featuredImg: "images/portfolio/outage-management-system/featured-oms-hub.png",
  featuredImgWebp:
    "images/portfolio/outage-management-system/featured-oms-hub.webp",
  featuredImageAlt:
    "OMS at the center: inputs from grid telemetry, eRespond, GIS, and planning; outputs to ADMS, maps, SAP execution, and analytics\u2014utility truck and outage map in the background.",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  featuredImageObjectPositionMd: "center 35%",
  /* Project frame */
  task: "Make outage data one continuous story: a single outage id should travel from intake through the Outage Management System (OMS) into mapping, field and grid operations, and reporting\u2014including ETR (estimated time of restoration)\u2014and still join cleanly when storms, SAP backlog, or late GIS exports stress the pipe. I stayed on the integration layer: APIs between eRespond and OMS (the same class of work as GIS (geographic information system)\u2192OMS), scheduled GIS shapefile ingestion, warehouse fields, and reporting alignment\u2014not SCADA (supervisory control and data acquisition) acquisition or deep SAP ERP core work. That work sat at the intersection of Provincial Electricity Authority (PEA) engineering, reliability, and vendor-led programs, so clear contracts and calm cutovers mattered as much as code.",
  focus: [
    "API integration",
    "Data synchronization",
    "Distributed systems",
    "Reliability reporting",
  ],
  context: "Provincial Electricity Authority of Thailand (PEA)",
  /* Stack */
  techStack: [
    {
      label: "PEA",
      href: "https://www.pea.co.th/",
    },
    {
      label: "OMS (Outage Management System)",
      href: "https://en.wikipedia.org/wiki/Outage_management_system",
    },
    {
      label: "GIS (Geographic Information System)",
      href: "https://en.wikipedia.org/wiki/Geographic_information_system",
    },
    {
      label: "SAP",
      href: "https://www.sap.com/",
    },
    {
      label: "eRespond",
      href: "https://www.erespond.com/",
    },
    {
      label: "ADMS (Advanced Distribution Management System)",
      href: "https://en.wikipedia.org/wiki/Advanced_distribution_management_system",
    },
    {
      label: "SCADA",
      href: "https://en.wikipedia.org/wiki/SCADA",
    },
  ],
  /* Impact */
  results: [
    {
      value: "Integrated",
      label: "OMS with eRespond, GIS, SAP, and ADMS",
    },
    {
      value: "Consistent",
      label:
        "Outage records and restoration estimates stayed aligned across operational systems",
    },
    {
      value: "Operational",
      label: "Integrations held through high-volume monsoon outages",
    },
  ],
  /* Overview */
  overviewTitle: "Overview",
  overview: [
    "PEA\u2019s outage management is a distributed system: customer calls land in eRespond, grid telemetry feeds SCADA, GIS holds the network model, OMS orchestrates restoration, ADMS optimizes the grid, and SAP handles billing and work orders. The challenge is keeping one outage\u2019s data coherent across all those systems\u2014especially when storms spike volume or vendor schedules slip.",
    "My role was integration: APIs between eRespond and OMS, scheduled GIS shapefile ingestion, warehouse fields for reporting, and alignment so outage ids, ETRs, and status codes stayed consistent. I did not own SCADA acquisition or deep SAP core work; I owned the pipes between systems so data flowed reliably.",
    "This was PEA\u2019s first OMS deployment, so the work included vendor coordination, data migration, and training\u2014not just code. The result was a system that could handle Thailand\u2019s monsoon season outages without losing track of individual incidents.",
  ],
  /* What I did */
  /* What I focused on */
  strategyTitle: "What I did",
  strategyIntro:
    "Integration work is invisible until it breaks. I focused on contracts that held up under load, data flows that stayed clean, and monitoring that caught issues before they became outages.",
  pillars: [
    {
      title: "API contracts between systems",
      body: "Built and maintained APIs between eRespond (customer intake) and OMS (restoration orchestration), plus scheduled ingestion from GIS shapefiles. Ensured outage ids, timestamps, and status codes stayed consistent across systems.",
    },
    {
      title: "Data warehouse and reporting",
      body: "Designed warehouse schemas and ETL processes so outage data from OMS, GIS, and SAP could be joined for reliability reporting and analytics. Included ETR calculations and outage duration tracking.",
    },
    {
      title: "Vendor coordination and cutovers",
      body: "Worked with OMS vendor (Schneider Electric) and PEA teams on data migration, testing, and training. Managed cutovers so new integrations went live without disrupting existing operations.",
    },
  ],
  /* How I shipped it */
  /* How it shipped */
  approachTitle: "How I shipped it",
  approach: [
    "Started with outage lifecycle mapping and API contracts, then built ETL pipelines, monitoring, and validation around the integrations before production cutovers. Load testing mattered because the hard part was not moving one outage record—it was keeping the same outage coherent as systems updated at different speeds.",
    "Documented contracts and operational flows so future changes could be made without rediscovering the system.",
  ],
  /* Footer */
  footerTagline: [
    "At Thailand’s Provincial Electricity Authority (PEA), when maps, outage records, and work systems fell out of sync during the same faultd on the same fault, control rooms and branches fell back to phone calls and spreadsheets.",
    "I owned the integration boundary so one outage identity held across OMS, GIS, SAP ERP, and reporting: APIs from eRespond into OMS, scheduled GIS shapefiles into OMS, read contracts for downstream consumers, and warehouse-backed reporting Power BI aligned to the outage lifecycle crews and reliability teams already depended on.",
  ],
};

export const outageManagementSystemProject = {
  ...getMissionGalleryManifestRow("outage-management-system"),
  /* Export */
  caseStudy: {
    ...baseOutageManagementSystemCaseStudy,
    ...outageManagementSystemCaseStudyVariant,
  },
};
