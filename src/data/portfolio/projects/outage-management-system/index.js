/**
 * PEA outage management / OMS integration — portfolio entry + full case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { outageManagementSystemCaseStudyVariant } from "./variants.js";

const baseOutageManagementSystemCaseStudy = {
  eyebrow: "Public sector · OMS · Multi-system integration",
  featuredImg:
    "images/portfolio/outage-management-system/featured-oms-hub.png",
  featuredImgWebp:
    "images/portfolio/outage-management-system/featured-oms-hub.webp",
  featuredImageAlt:
    "OMS at the center: inputs from grid telemetry, eRespond, GIS, and planning; outputs to ADMS, maps, SAP execution, and analytics\u2014utility truck and outage map in the background.",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  featuredImageObjectPositionMd: "center 35%",
  task: "Make outage data one continuous story: a single outage id should travel from intake through the Outage Management System (OMS) into mapping, field and grid operations, and reporting\u2014including ETR (estimated time of restoration)\u2014and still join cleanly when storms, SAP backlog, or late GIS exports stress the pipe. I stayed on the integration layer: APIs between eRespond and OMS (the same class of work as GIS (geographic information system)\u2192OMS), scheduled GIS shapefile ingestion, warehouse fields, and reporting alignment\u2014not SCADA (supervisory control and data acquisition) acquisition or deep SAP ERP core work. That work sat at the intersection of Provincial Electricity Authority (PEA) engineering, reliability, and vendor-led programs, so clear contracts and calm cutovers mattered as much as code.",
  disciplines: [
    "API integration",
    "Data synchronization",
    "Distributed systems",
    "Reliability reporting",
  ],
  context: "Provincial Electricity Authority of Thailand (PEA)",
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
  overviewTitle: "Overview",
  overview: [
    "PEA\u2019s outage management is a distributed system: customer calls land in eRespond, grid telemetry feeds SCADA, GIS holds the network model, OMS orchestrates restoration, ADMS optimizes the grid, and SAP handles billing and work orders. The challenge is keeping one outage\u2019s data coherent across all those systems\u2014especially when storms spike volume or vendor schedules slip.",
    "My role was integration: APIs between eRespond and OMS, scheduled GIS shapefile ingestion, warehouse fields for reporting, and alignment so outage ids, ETRs, and status codes stayed consistent. I did not own SCADA acquisition or deep SAP core work; I owned the pipes between systems so data flowed reliably.",
    "This was PEA\u2019s first OMS deployment, so the work included vendor coordination, data migration, and training\u2014not just code. The result was a system that could handle Thailand\u2019s monsoon season outages without losing track of individual incidents.",
  ],
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
  approachTitle: "How I shipped it",
  approach: [
    "Started with data mapping and API design, then built ETL pipelines and monitoring. Tested integrations under simulated load before production cutovers.",
    "Documented all contracts and processes so future changes could be made without rediscovering the system.",
  ],
  results: [
    {
      value: "Integrated",
      label: "OMS with eRespond, GIS, SAP, and ADMS",
    },
    {
      value: "Reliable",
      label: "Outage tracking and ETR reporting",
    },
    {
      value: "Scalable",
      label: "Handled monsoon season outages",
    },
  ],
};

export const outageManagementSystemProject = {
  ...getMissionGalleryManifestRow("outage-management-system"),
  caseStudy: { ...baseOutageManagementSystemCaseStudy, ...outageManagementSystemCaseStudyVariant },
};