import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const outageManagementSystemCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Public infrastructure · OMS · Multi-system integration",
    task: Object.freeze([
      "Make outage data one continuous story: a single outage identity should travel from intake through OMS into mapping, field crews, grid operations, and reporting—including estimated restoration times—and still join cleanly when storms, SAP backlog, or delayed GIS exports stress the pipe.",
      "My role sat on the integration layer: APIs between eRespond and OMS, scheduled GIS shapefile ingestion, warehouse fields, and reporting alignment—not SCADA acquisition or deep SAP ERP core work. The work lived at the intersection of PEA engineering, reliability operations, and vendor-led systems, so clear contracts and calm cutovers mattered as much as code.",
    ]),
    /* Overview */
    overviewTitle: "Overview",
    overview: [
      "PEA’s outage management relied on multiple operational systems working together: customer calls entered through eRespond, grid telemetry fed SCADA, GIS maintained the network model, OMS coordinated restoration, and SAP handled work orders and billing. The challenge was keeping outage data coherent across those systems—especially when storms increased volume or vendor schedules slipped.",
      "My role focused on the integration boundary: APIs between eRespond and OMS, scheduled GIS shapefile ingestion, warehouse reporting models, and alignment so outage identities, restoration estimates, and status codes stayed consistent across systems. I did not own SCADA acquisition or deep SAP ERP core work; I owned the seams between systems so outage data continued to flow reliably.",
      "This was PEA’s first OMS deployment, so the work included vendor coordination, data migration, testing, training, and production cutovers—not just code. The integrations held through Thailand’s monsoon-season outages without losing track of individual incidents.",
    ],
    footerTagline: Object.freeze([
      "At Thailand’s Provincial Electricity Authority (PEA), when maps, outage records, and work systems fell out of sync during the same fault, control rooms and branches fell back to phone calls and spreadsheets. I owned the integration boundary so one outage identity held across OMS, GIS, SAP ERP, and reporting: APIs from eRespond into OMS, scheduled GIS shapefiles into OMS, contracts for downstream systems, and warehouse-backed Power BI reporting aligned to the outage lifecycle crews and reliability teams already depended on.",
      "SAP, GIS, SCADA, and ADMS each had platform owners and third-party integrators. I coordinated handoffs across those teams while staying accountable for the seams—APIs, GIS jobs, warehouse joins, and reporting alignment.",
    ]),
  }),
});

export const outageManagementSystemCaseStudyVariant =
  outageManagementSystemCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  outageManagementSystemCaseStudyVariants.swe;
