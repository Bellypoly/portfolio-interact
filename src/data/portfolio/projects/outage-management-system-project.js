/**
 * PEA outage management / OMS integration — portfolio entry + full case study.
 * Extracted from portfolio-projects.js for maintainability.
 */

export const outageManagementSystemProject = {
  slug: "outage-management-system",
  portfolioGroup: "professional",
  portfolioYear: 2019,
  portfolioLabel: "Public sector",
  name: "Outage Management & Reliability Platform",
  desc: "At Thailand\u2019s Provincial Electricity Authority (PEA), when maps, outage records, and work systems disagree on the same fault, control rooms and branches fall back to phone calls and spreadsheets. I owned the integration boundary so one outage identity held across the Outage Management System, GIS (geographic information system), SAP ERP, and reporting: APIs from eRespond (PEA\u2019s operator-facing outage intake\u2014faults, planned work, ETR (estimated time of restoration)) into OMS, scheduled GIS shapefiles into OMS, read contracts for every downstream consumer, and warehouse-backed Power BI aligned to the outage lifecycle crews and reliability already depended on. SAP, GIS, SCADA, and ADMS each had PEA platform owners and third-party integrators; I coordinated handoffs across those teams while staying accountable for the seams\u2014APIs, GIS jobs, warehouse joins, and reporting alignment.",
  img: "images/portfolio/outage-management-system/thumbnail.png",
  imgWebp: "images/portfolio/outage-management-system/thumbnail.webp",
  alt: "Portfolio thumbnail: soft neumorphic hub diagram\u2014central outage data store with a power bolt, linked to grid tower, mobile alert, maps, live monitoring, and bar-chart reporting icons",
  anchorId: "portfolio-outage-ms",
  link: "https://app.powerbi.com/view?r=eyJrIjoiNjEyOWI4NGItYzA2YS00ZDY2LWE3OGMtZWU4MTBjYTZhNDY4IiwidCI6ImEyMzM5ZjZkLWJmNGEtNDRkYi04OGVjLWNiOGYyN2RhNGFiYiIsImMiOjEwfQ%3D%3D",
  caseStudy: {
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
      "Cross-org & vendor programs",
    ],
    context:
      "PEA (Thailand) \u2014 OMS reliability: eRespond\u2192OMS and GIS\u2192OMS integration, SAP touchpoints, warehouse reporting; delivered with PEA teams and third-party implementation partners",
    techStack: [
      {
        label: "SCADA (power grid monitoring)",
        href: "https://www.electricaltechnology.org/2015/09/scada-systems-for-electrical-distribution.html",
      },
      {
        label: "TIBCO (integration middleware)",
        href: "https://docs.tibco.com/pub/adr3/7.3.2/doc/adr3/html/Concepts_guide/Overview_of_TIBCO_Adapters.htm",
      },
      {
        label: "eRespond \u2192 OMS (operator outage intake)",
        href: "https://en.wikipedia.org/wiki/Outage_management_system",
      },
      {
        label: "Outage Management System",
        href: "https://sites.google.com/view/peas3oms/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%9F%E0%B8%9F%E0%B8%B2%E0%B8%82%E0%B8%94%E0%B8%82%E0%B8%AD%E0%B8%87?authuser=0",
      },
      {
        label: "GIS (PEA Map)",
        href: "https://www.esri.com/en-us/industries/electric-gas-utilities",
      },
      {
        label: "Power Grid Operation (ADMS)",
        href: "https://www.pea.co.th/about-pea/sgi/monitoring-and-control/adms",
      },
      {
        label: "SAP ERP",
        href: "https://www.sap.com/products/erp.html",
      },
      {
        label: "Power BI",
        href: "https://app.powerbi.com/view?r=eyJrIjoiNjEyOWI4NGItYzA2YS00ZDY2LWE3OGMtZWU4MTBjYTZhNDY4IiwidCI6ImEyMzM5ZjZkLWJmNGEtNDRkYi04OGVjLWNiOGYyN2RhNGFiYiIsImMiOjEwfQ%3D%3D",
      },
      {
        label: "Web APIs",
        href: "https://developer.mozilla.org/en-US/docs/Web/API",
      },
      { label: "Laravel", href: "https://laravel.com/" },
      {
        label: "C#",
        href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
      {
        label: "Oracle",
        href: "https://www.oracle.com/database/",
      },
    ],
    overview: [
      "This case study pairs with PEA E\u2011Service: where E\u2011Service faces citizens, this stack keeps branches, control rooms, and reliability pointed at the same outage when something trips or a planned outage is on the calendar.",
      "Outage truth arrives from many places\u2014real-time power grid monitoring, eRespond (where operators log faults, planned outages, and live ETR in lists and on the map), GIS, SAP ERP. Without deliberate seams, those feeds drift: different status on the map, different geometry in OMS, different restoration time on the phone.",
      "I kept OMS as the hub everyone could join. That meant shipping APIs between eRespond and OMS for intake and lifecycle fields, and running GIS shapefile ingestion on a schedule\u2014two faces of the same integration problem.",
      "From there I aligned what PEA Map, ADMS, SAP, and Power BI read from OMS so ETR and planned-outage screens matched what the field was actually doing.",
      "On intake, eRespond and SAP both need to land on the outage id OMS owns. I built the eRespond\u2192OMS APIs; with SAP ERP owners I held the line on SAP planned-work contracts. After crews close the job, the same SAP posts time, labor, materials, and billing to that outage id so operations and finance never invent a parallel story.",
      "I ran that plane\u2014APIs, GIS jobs, contracts, reporting\u2014with PEA reliability and operations alongside third-party implementation partners, in the same cadence as cutovers, joint defect triage, and production fire drills.",
      {
        text: "Real-time SCADA data was integrated through existing middleware, including ",
        externalLink: {
          href: "https://docs.tibco.com/pub/adr3/7.3.2/doc/adr3/html/Concepts_guide/Overview_of_TIBCO_Adapters.htm",
          label: "TIBCO-based adapters",
        },
        after: ", coordinated through the teams that operated that middleware.",
      },
      {
        text: "Real-time dashboard: ",
        externalLink: {
          href: "https://app.powerbi.com/view?r=eyJrIjoiNjEyOWI4NGItYzA2YS00ZDY2LWE3OGMtZWU4MTBjYTZhNDY4IiwidCI6ImEyMzM5ZjZkLWJmNGEtNDRkYi04OGVjLWNiOGYyN2RhNGFiYiIsImMiOjEwfQ%3D%3D",
          label: "PEA OMS (Power BI)",
        },
        after: ".",
      },
    ],
    openingSystemDesign: {
      sectionTitle: "Integration overview",
      intro:
        "Start here for the shape of the stack: how outage data lands in OMS, then propagates to the tools operators and reliability live in. When you are done, the link at the end of this page brings you back to the PEA E\u2011Service citizen-portal story.",
      diagramImageWebp:
        "images/portfolio/outage-management-system/integration-overview.webp",
      diagramImage:
        "images/portfolio/outage-management-system/integration-overview.png",
      diagramAlt:
        "Flow diagram: SCADA real-time power grid telemetry into eRespond (event input), GIS (spatial source), and SAP ERP (planned work orders), then into OMS as the canonical outage lifecycle. A highlighted integration layer lists eRespond to OMS API ingestion, GIS to OMS API plus scheduled ingestion, and lifecycle sync for id, status, and ETR. Downstream: SAP execution, ADMS grid view, PEA Map, and Power BI dashboards. Asterisks mark contribution areas as in the diagram legend.",
      diagramCompact: true,
      caption:
        "Here \u201cgrid\u201d means the electric power grid (not a layout metaphor). Asterisks in the figure match its legend\u2014integration work plus the SAP, PEA Map, and Power BI surfaces where my contracts and reporting alignment mattered\u2014alongside eRespond\u2192OMS and GIS\u2192OMS paths that keep OMS the hub. SAP still appears twice on purpose: planned work on the way in, then time, labor, materials, and billing after field close-out on the same outage id.",
    },
    followUpSystemDesign: {
      sectionTitle: "Expanded integration topology",
      intro:
        "Same ecosystem with more structure: SCADA and enterprise intakes converge through integration APIs and scheduled jobs into OMS, then integration logic fans out to SAP, ADMS, GIS tools (PEA Map), and Power BI.",
      diagramImageWebp:
        "images/portfolio/outage-management-system/integration-topology.webp",
      diagramImage:
        "images/portfolio/outage-management-system/integration-topology.png",
      diagramAlt:
        "Expanded topology from electrical grid and SCADA through eRespond (event intake), SAP (planned work orders), and GIS (spatial source) into an integration box (APIs and scheduled jobs), then OMS as canonical single source. Integration logic covers one outage id, lifecycle, ETR, and timing across operational, enterprise, and reporting systems. Downstream: SAP execution and billing, ADMS grid view, GIS tools for PEA Map, and Power BI dashboards. Asterisks mark contribution areas per the diagram legend.",
      diagramCompact: true,
      caption:
        "In production those paths are not a slide sequence\u2014they are one integration boundary I contributed to with PEA engineering and third-party implementation partners: eRespond\u2192OMS APIs, GIS\u2192OMS ingest, and SAP-facing read contracts that had to stay true under load while vendor roadmaps and internal releases moved at different speeds. The goal stayed simple: drift shows up in logs and queues before it becomes folklore in three different apps.",
    },
    strategyTitle: "What I contributed",
    strategyIntro:
      "Utility work is cross-functional by default. eRespond, SAP, GIS, SCADA, and ADMS each had PEA owners and external implementation partners. The bullets below are what I shipped and owned in production\u2014APIs from eRespond into OMS, scheduled GIS\u2192OMS ingestion, warehouse joins, and reporting alignment\u2014while keeping contracts, cutovers, and defect heat legible across internal teams and vendor engineers in the same room.",
    strategyBullets: [
      "Shipped APIs between eRespond and OMS for intake events, planned outages, and ETR fields\u2014same engineering bar as GIS\u2192OMS: explicit payloads, contracts, retries, and joint debugging with intake owners and vendor engineers when schemas or semantics shifted.",
      "Built API and scheduled GIS shapefile pipelines into OMS: refresh cadence, idempotent loads, drift checks against authoritative GIS exports\u2014treated as production systems, not one-off imports.",
      "Contributed to the sync surface among OMS, GIS, and SAP-facing reads with PEA engineering and implementation partners so partial failures surfaced in ops queues instead of quietly cloning divergent rows.",
      "Held one outage id and lifecycle coherent across maps, ADMS, SAP, and reporting when storms and SAP backlog stacked on the same weekend\u2014pressure-testing the contracts, not just happy-path demos.",
      "Co-developed warehouse-backed Power BI for ETR and planned outages with the reliability team\u2014same warehouse keys field staff already trusted in OMS, so metrics stayed defensible in review meetings.",
      "Hardened contracts, refresh rules, and monitoring so disagreements hit logs and dashboards before branches heard three different restoration stories.",
    ],
    problemSection: {
      title: "From intake to readout",
      paragraphs: [
        "Operators open eRespond to log faults and planned work; SAP carries execution; SCADA paints the live grid. OMS sits in the middle as the outage record everyone is supposed to cite\u2014SAP lands planned work on the way in, then posts time, labor, materials, and billing after crews finish, still on that outage id.",
        "With PEA engineering and third-party implementation partners, I wired eRespond to OMS for intake and lifecycle sync, and GIS to OMS on a schedule so geometry never quietly aged out. ADMS, PEA Map, SAP, and Power BI all read downstream from that hub; I owned the read contracts and warehouse fields so their queries could not fork under load without tripping something an operator would see.",
        "The captures below follow one outage across four layers you will recognize from a storm week: intake in eRespond, geography in PEA Map, live topology in ADMS, then ETR and planned-outage pages in Power BI.",
      ],
      listGroups: [
        {
          title: "Into OMS",
          items: [
            "SCADA: field telemetry and alarms for distribution and substation equipment.",
            "TIBCO adapters: publish SCADA and other enterprise signals onto the bus OMS consumes, without rewriting the SCADA core.",
            "eRespond (operator intake app\u2014search, lists, map, event tabs): APIs I wrote carried unplanned faults, planned outages, and live ETR updates into OMS on the same outage id.",
            "GIS shapefiles: API and scheduled jobs I wrote to refresh OMS network/spatial data from authoritative GIS exports.",
            "SAP ERP: planned work feeding OMS on intake (same outage id).",
          ],
        },
        {
          title: "Out of OMS",
          items: [
            "ADMS for single-line / switching context; PEA Map (GISWV, GISOTS, GISMJM) for maps and field jobs.",
            "Power BI dashboards I co-built with the reliability team\u2014ETR, planned-outage compliance, and warehouse-backed pages aligned to OMS.",
            "SAP lifecycle (close-out): after crews finish in the field, the same SAP installation records time, labor, materials, and billing on that outage id.",
          ],
        },
      ],
      figureCaption: {
        text: "Live captures only. Read-only Power BI report: ",
        externalLink: {
          href: "https://app.powerbi.com/view?r=eyJrIjoiNjEyOWI4NGItYzA2YS00ZDY2LWE3OGMtZWU4MTBjYTZhNDY4IiwidCI6ImEyMzM5ZjZkLWJmNGEtNDRkYi04OGVjLWNiOGYyN2RhNGFiYiIsImMiOjEwfQ%3D%3D",
          label: "PEA OMS (Power BI)",
        },
        after: ".",
      },
      figureColumns: 2,
      figures: [
        {
          img: "images/portfolio/outage-management-system/media-01-erespond.png",
          alt: "PEA eRespond (operator outage intake)\u2014event list, Esri map, and detail tabs including SCADA-reported events (Thai UI)",
          caption:
            "Intake \u2014 eRespond: search, event list, map overlay, and tabs operators live in during an event. My work was the eRespond\u2192OMS bridge so those events and ETR updates land on the canonical OMS record.",
          fullRow: true,
        },
        {
          img: "images/portfolio/outage-management-system/media-03-peamap.png",
          alt: "PEA Map portal — GISWV, GISPRJ, GISADM, GISOTS, GISMJM, GISEIS tiles",
          caption:
            "GIS surface \u2014 PEA Map: lookup, field jobs, and network views that only help if they stay married to the outage record in OMS.",
          fullRow: true,
        },
        {
          img: "images/portfolio/outage-management-system/media-04-adms.png",
          alt: "ADMS — MV one-line with feeders, switches, and Thai place labels (Krathum Baen / Samut Sakhon tabs)",
          caption:
            "Live power-grid read \u2014 ADMS (Advanced Distribution Management System): browser-based network topology and device-state for control-room operations, used alongside real-time power grid monitoring.",
          fullRow: true,
        },
        {
          img: "images/portfolio/outage-management-system/media-05-powerbi.png",
          alt: "Power BI — ETR dashboard, Krathum Baen / 2025 filters, RealTime vs Fast vs DoNothing (Thai UI)",
          caption:
            "Reporting — ETR dashboard: Near-real-time estimated restoration tracking and operational breakdowns for low-voltage maintenance.",
        },
        {
          img: "images/portfolio/outage-management-system/media-06-powerbi-planned-lv.png",
          alt: "Power BI — Distribution Transformer Planned Outage, notification compliance and OMS event table (Thai UI)",
          caption:
            "Reporting — planned outage dashboard: Planned low-voltage outage schedules, compliance tracking, and notification discipline.",
        },
      ],
    },
    pillars: [
      {
        title: "One outage id",
        body: "The outage key and lifecycle had to survive storm weekends, late GIS exports, and SAP batch lag without letting branches mint a second truth in maps, ADMS, SAP, or Power BI.",
      },
      {
        title: "Where I played",
        body: "I stayed on the integration layer: eRespond\u2192OMS APIs, GIS\u2192OMS ingestion, OMS/GIS/SAP read contracts, warehouse fields, and Power BI alignment to the authoritative outage record\u2014the seam where drift becomes visible before it becomes folklore. SCADA acquisition and SAP ERP foundations lived with other owners and vendor teams; I ran joint cutovers, dependency mapping, and defect triage when their release trains and mine did not line up.",
      },
    ],
    approachTitle: "How I kept the hub honest",
    approach: [
      "Named every consumer\u2019s OMS key and refresh rule so partial failures showed up in logs and ops queues instead of cloning divergent rows.",
      "Ran GIS shapefile loads like real production jobs\u2014idempotent loads, clear cadence, alerts when OMS spatial counts drifted from GIS exports. I held eRespond\u2192OMS APIs to the same bar: explicit payloads, retries, parity checks so intake spikes could not fork what OMS stored.",
      "Reproduced drift during weather and planned-outage peaks, then chased payloads, DAX, or warehouse fields until ETR and SAP-facing reads matched eRespond again\u2014same outage id, one narrative.",
    ],
    relatedProject: {
      slug: "pea-e-service",
      label:
        "Back to PEA E‑Service — citizen portal alongside this OMS reliability stack →",
    },
    results: [
      {
        value: "Single truth",
        label:
          "One canonical outage id from eRespond intake through OMS into GIS, SAP ERP, ADMS, and reporting\u2014kept coherent with PEA teams and vendor-led systems under real storm and backlog pressure",
      },
      {
        value: "Spatial data",
        label:
          "GIS\u2192OMS pipeline (API ingestion + scheduled jobs) so geometry tracked authoritative exports instead of a stale one-off import",
      },
      {
        value: "Ops visibility",
        label:
          "Power BI for ETR and planned outages, co-built with reliability\u2014metrics keyed to warehouse identities control rooms already trusted, so leadership reviews and field ops pointed at the same numbers",
      },
    ],
  },
};
