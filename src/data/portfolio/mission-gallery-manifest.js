/**
 * Mission Gallery + shared card fields for `/mission/:slug` case studies. No `caseStudy` here—that
 * lives in `projects/<slug>/index.js` (each module spreads `getMissionGalleryManifestRow(slug)` then adds `caseStudy`).
 *
 * Display order comes from the active Mission Gallery version (`ACTIVE_MISSION_GALLERY_VERSION`).
 *
 * Row shape (omit optional keys when unused): slug → portfolioGroup → portfolioYear → portfolioLabel → companyBadge? →
 * hideFooterTagline? (when true, `/mission/:slug` omits the footer tagline; gallery tiles still use `desc`) → anchorId? →
 * name → desc → cardImageFit? → cardImagePosition? → img → imgWebp → alt → link?
 *
 * New mission: row in this file, then slug in `load-portfolio-project.js`, then `projects/<slug>/index.js`
 * (optional `projects/<slug>/variants.js` for site-version case-study overlays).
 */

import { ACTIVE_MISSION_GALLERY_VERSION } from "./mission-gallery-version-config.js";

const MISSION_GALLERY_ROWS = [
  {
    slug: "vote62",
    portfolioGroup: "professional",
    portfolioYear: 2026,
    portfolioLabel: "Civic tech",
    anchorId: "portfolio-vote69",
    name: "VOTE62 — Structured election data from ECT PDF records",
    desc: "400 Thai constituencies rebuilt from ECT tally PDFs into validated structured datasets so public-interest projects run on structure, not hand-typed spreadsheets.",
    hideFooterTagline: true,
    cardImagePosition: "center center",
    img: "images/portfolio/vote62/thumbnail.png",
    imgWebp: "images/portfolio/vote62/thumbnail.webp",
    alt: "VOTE62 Mission Gallery thumbnail: stylized tally tables and constituency-style election graphics",
    link: "https://docs.google.com/spreadsheets/d/1KqmtYX6Iz0ODJpLj2cB7eW1WuoP4aL8gsj9XKV6-YQo/preview",
  },
  {
    slug: "parliament-watch-ocr",
    portfolioGroup: "professional",
    portfolioYear: 2024,
    portfolioLabel: "Civic tech",
    anchorId: "portfolio-parliament-watch",
    name: "Parliament Watch — Structured parliamentary records from Thai voting PDFs",
    desc: "Transformed parliamentary voting PDFs containing Thai script, numerals, and semi-structured legislative records into structured datasets supporting legislative analysis, civic transparency, and public-facing visualization.",
    cardImagePosition: "center 71%",
    img: "images/portfolio/parliament-watch-ocr/thumbnail.png",
    imgWebp: "images/portfolio/parliament-watch-ocr/thumbnail.webp",
    alt: "Election 69 — party unity voting chart for Thailand\u2019s 26th House of Representatives (2566\u20132568)",
    link: "https://wevis.info/partyunityvisual/",
  },
  {
    slug: "electricity-bill-breakdown",
    portfolioGroup: "professional",
    portfolioYear: 2024,
    portfolioLabel: "Civic tech",
    anchorId: "portfolio-electricity-bill-breakdown",
    name: "Where Does Your Electricity Bill Go?",
    desc: "Public-interest explainer translating Thai electricity bills, fuel-adjustment charges (Ft), and energy pricing systems into progressively structured information for non-specialist readers.",
    hideFooterTagline: true,
    img: "images/portfolio/electricity-bill-breakdown/thumbnail.png",
    imgWebp: "images/portfolio/electricity-bill-breakdown/thumbnail.webp",
    alt: "Electricity bill breakdown — black square graphic with a glowing lightning bolt, stacked electricity / bill / breakdown type, and a ring of white line-art energy icons (grid, generation, fuel, industry)",
    link: "https://electricity-bill-breakdown.justpow.co/",
  },
  {
    slug: "local-elections-hub",
    portfolioGroup: "professional",
    portfolioYear: 2022,
    portfolioLabel: "Product",
    companyBadge: "DMN",
    anchorId: "portfolio-local-elections-hub",
    name: "Local Elections Hub",
    desc: "Reusable election-results system for Arc XP—shared race models, lightweight vote visualizations, county navigation, and mobile-first layouts built for live election coverage.",
    cardImagePosition: "center top",
    img: "images/portfolio/local-elections-hub/thumbnail.png",
    imgWebp: "images/portfolio/local-elections-hub/thumbnail.webp",
    alt: "Illustration — hand placing a marked ballot into a ballot box on a patterned background",
  },
  {
    slug: "outage-management-system",
    portfolioGroup: "professional",
    portfolioYear: 2019,
    portfolioLabel: "Public sector",
    companyBadge: "PEA",
    anchorId: "portfolio-outage-ms",
    name: "Outage Management & Reliability Platform",
    desc: "PEA outage-management integrations across OMS, GIS, SAP, and reporting systems—keeping outage identities, restoration estimates, and operational data aligned during high-volume monsoon outages.",
    hideFooterTagline: true,
    img: "images/portfolio/outage-management-system/thumbnail.png",
    imgWebp: "images/portfolio/outage-management-system/thumbnail.webp",
    alt: "Portfolio thumbnail: soft neumorphic hub diagram\u2014central outage data store with a power bolt, linked to grid tower, mobile alert, maps, live monitoring, and bar-chart reporting icons",
    link: "https://app.powerbi.com/view?r=eyJrIjoiNjEyOWI4NGItYzA2YS00ZDY2LWE3OGMtZWU4MTBjYTZhNDY4IiwidCI6ImEyMzM5ZjZkLWJmNGEtNDRkYi04OGVjLWNiOGYyN2RhNGFiYiIsImMiOjEwfQ%3D%3D",
  },
  {
    slug: "dynamic-paywall",
    portfolioGroup: "professional",
    portfolioYear: 2025,
    portfolioLabel: "Product",
    companyBadge: "DMN",
    anchorId: "portfolio-paywall",
    name: "AI-Powered Dynamic Paywall",
    desc: "Sophi ML paywall on Arc XP—gate, meter, or let stories through per visit while GA4 and flags keep rollout safe.",
    cardImageFit: "top-clip",
    img: "images/portfolio/dynamic-paywall/thumbnail.png",
    imgWebp: "images/portfolio/dynamic-paywall/thumbnail.webp",
    alt: "Dallas Morning News site with paywall modal and analytics chart — AI-powered dynamic paywall",
  },
  {
    slug: "map-magic",
    portfolioGroup: "professional",
    portfolioYear: 2018,
    portfolioLabel: "Platform",
    companyBadge: "thnknet",
    anchorId: "portfolio-map-magic",
    name: "MapMagic",
    desc: "Thailand map infrastructure I helped build—REST map APIs, custom tiles and POI, field Android capture, and routing that survives real Bangkok traffic, not demo coordinates.",
    img: "images/portfolio/map-magic/thumbnail.png",
    imgWebp: "images/portfolio/map-magic/thumbnail.webp",
    alt: "Isometric mapping toolkit on orange — laptop, phone with city pins, world-map screen, 360 street-view car, connected nodes and logo on tiered blocks",
    link: "https://maps.thinknet.co.th/th",
  },
  {
    slug: "jobthai",
    portfolioGroup: "professional",
    portfolioYear: 2019,
    portfolioLabel: "Marketplace",
    companyBadge: "thnknet",
    anchorId: "portfolio-thinknet",
    name: "JobThai",
    desc: "Thailand\u2019s national job board—Elasticsearch search, resume flows, and map-grounded filters (e.g. BTS/MRT corridors, industrial estates / นิคมอุตสาหกรรม) so listings match real commutes.",
    img: "images/portfolio/jobthai/thumbnail.png",
    imgWebp: "images/portfolio/jobthai/thumbnail.webp",
    alt: "JobThai Resume — flat illustration of a job seeker at a laptop and a recruiter with clipboard, with JobThai branding",
    link: "https://www.jobthai.com/jobsearch",
  },
  {
    slug: "article-page-redesign",
    portfolioGroup: "professional",
    portfolioYear: 2025,
    portfolioLabel: "Product",
    companyBadge: "DMN",
    anchorId: "portfolio-article-redesign",
    name: "Article Experience & Engagement Optimization",
    desc: "Article stack after AMP—single-column story, lazy GAM, Viafoura, paywall-aware branches, GA4 · Datadog · BlueConic instrumentation.",
    cardImagePosition: "center 100%",
    img: "images/portfolio/article-redesign/thumbnail.png",
    imgWebp: "images/portfolio/article-redesign/thumbnail.webp",
    alt: "Dallas Morning News article page — single-column reading layout",
  },
  {
    slug: "subscription-checkout-activation",
    portfolioGroup: "professional",
    portfolioYear: 2025,
    portfolioLabel: "Product",
    companyBadge: "DMN",
    anchorId: "portfolio-subscription",
    name: "Evidence-Driven Redesign of a News Subscription Funnel",
    desc: "Rebuilt a three-page checkout leak into one React surface—then used Clarity evidence to refine the flow and onboard new subscribers.",
    cardImagePosition: "center 10%",
    img: "images/portfolio/subscription-checkout/thumbnail.png",
    imgWebp: "images/portfolio/subscription-checkout/thumbnail.webp",
    alt: "End-to-end subscription conversion: checkout, identity, onboarding — case study",
  },
  {
    slug: "pea-e-service",
    portfolioGroup: "professional",
    portfolioYear: 2019,
    portfolioLabel: "Public sector",
    companyBadge: "PEA",
    anchorId: "portfolio-pea-eservice",
    name: "PEA E\u2011Service",
    desc: "Thai utilities already had the data. The hard part was the story people saw. With PWA (Provincial Waterworks Authority of Thailand) I helped wire PEA (Provincial Electricity Authority) and water into one authenticated portal—plus registry, land, highway, Ministry of Energy (including solar with PEA), and GIS layers kept in sync with case data—so the product read as one journey. I also worked on PPIM (Power Producer Information Management System) so producer programs had their own lane.",
    img: "images/portfolio/pea-e-service/thumbnail.png",
    imgWebp: "images/portfolio/pea-e-service/thumbnail.webp",
    alt: "PEA E\u2011Service — electricity and water portal mockups on tablet and phone, purple branding",
    link: "https://eservice.pea.co.th/",
  },
  {
    slug: "industrial-logistics-evaluation",
    portfolioGroup: "research",
    portfolioYear: 2016,
    portfolioLabel: "Paper",
    anchorId: "portfolio-ieom",
    name: "Industrial Logistic Performance Evaluation",
    desc: "IEOM 2016 — logistics performance at a Thai printing & packaging firm via the World Bank LPI: tie national scores to the warehouse and loading dock, benchmark peers, propose improvements.",
    img: "images/portfolio/industrial-logistics-evaluation/thumbnail.jpg",
    imgWebp: "images/portfolio/industrial-logistics-evaluation/thumbnail.webp",
    alt: "Diagram — supply chain service delivery: policy inputs (customs, infrastructure, service quality) and performance outcomes (timeliness, international shipments, tracking)",
    link: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
  },
  {
    slug: "rdfd",
    portfolioGroup: "research",
    portfolioYear: 2020,
    portfolioLabel: "Thesis",
    anchorId: "portfolio-rdfd",
    name: "RDFD — Discovering Fake Drivers",
    desc: "ML proof-of-concept: inferring shared or spoofed driver accounts from how people actually drive over time—not a single login check.",
    img: "images/portfolio/rdfd/thumbnail.jpg",
    imgWebp: "images/portfolio/rdfd/thumbnail.webp",
    alt: "Illustration — driver at the wheel with temporal data charts and magnifying glass over trend lines",
    link: "https://github.com/Bellypoly/Discovering-Fake-Drivers-Based-on-Temporal-Driving-Behaviors",
  },
  {
    slug: "federated-learning-energy",
    portfolioGroup: "research",
    portfolioYear: 2020,
    portfolioLabel: "Thesis",
    anchorId: "portfolio-federated-learning-energy",
    name: "On Simulating Energy Consumption of Federated Learning Systems",
    desc: "MATLAB simulation study: federated learning energy use under NOMA — compute vs radio, sweepable regimes, reproducible figures.",
    img: "images/portfolio/federated-learning-energy/thumbnail.png",
    imgWebp: "images/portfolio/federated-learning-energy/thumbnail.webp",
    alt: "Federated learning poster — rocket, satellite, and rover linked to a central cloud with ΔW updates; tagline: local training, no raw data sharing",
    link: "https://github.com/Bellypoly/On_simulating_energy_consumption_of_federated_learning_systems",
  },
  {
    slug: "jerdi-kids",
    portfolioGroup: "professional",
    portfolioYear: 2018,
    portfolioLabel: "Competition",
    anchorId: "portfolio-jerdi",
    name: "JerDi-Kids — Child Tracking System",
    desc: "Architected, designed, and built — UI/UX for app and wristband, plus hands-on development; QR + BLE and receivers where you need coverage.",
    img: "images/portfolio/jerdi/thumbnail.png",
    imgWebp: "images/portfolio/jerdi/thumbnail.webp",
    alt: "JerDi — JERDi wordmark, robotic hand holding QR wristband, phone app wireframes and human outline on teal tech background",
  },
  {
    slug: "photo-competition-my-hometown",
    portfolioGroup: "professional",
    portfolioYear: 2020,
    portfolioLabel: "Competition",
    anchorId: "portfolio-my-hometown",
    name: "My Hometown at Texas Tech — international student photo exhibit",
    desc: "Two prints in Texas Tech's virtual My Hometown exhibit (Sept.–Oct. 2020): I placed 2nd runner-up for Amphawa at night and received a consolation prize for the sunken temple.",
    img: "images/portfolio/photo-competition-my-hometown/thumbnail.png",
    imgWebp: "images/portfolio/photo-competition-my-hometown/thumbnail.webp",
    alt: "Portfolio entry: Amphawa Floating Market at dusk in Samutsongkhram, and the sunken temple pavilion in Kanchanaburi, Thailand",
    link: "https://www.depts.ttu.edu/international/intlopr/exhibits/my-hometown/",
  },
];

const MISSION_GALLERY_ROW_BY_SLUG = new Map(
  MISSION_GALLERY_ROWS.map((row) => [row.slug, row]),
);

/**
 * Data-reporter order is curated, not chronological:
 * public-interest -> computational journalism -> civic data infra ->
 * newsroom engineering -> broader platform depth.
 *
 * Rule: first 4-6 cards must establish identity fast.
 */
const MISSION_GALLERY_ORDER = Object.freeze({
  swe: Object.freeze([
    // TIER 1: Product/newsroom platform execution.
    "dynamic-paywall",
    "subscription-checkout-activation",
    "article-page-redesign",
    "local-elections-hub",
    "outage-management-system",
    "pea-e-service",
    "jobthai",
    "map-magic",
    // TIER 2: Civic/public-interest data impact.
    "vote62",
    "parliament-watch-ocr",
    "electricity-bill-breakdown",
    // TIER 3: Research/technical depth.
    "federated-learning-energy",
    "industrial-logistics-evaluation",
    "rdfd",
    // TIER 4: Personal/creative signal.
    "jerdi-kids",
    "photo-competition-my-hometown",
  ]),
  "data-reporter": Object.freeze([
    // TIER 1: Identity-defining civic/public-interest data work.
    "vote62",
    "parliament-watch-ocr",
    "electricity-bill-breakdown",
    "local-elections-hub",
    "outage-management-system",
    // TIER 2: Newsroom/product engineering and audience systems.
    "dynamic-paywall",
    "subscription-checkout-activation",
    "article-page-redesign",

    // TIER 3: Technical platform depth (GIS, infra, analytics, ML).
    "map-magic",
    "jobthai",
    "pea-e-service",
    "industrial-logistics-evaluation",
    "federated-learning-energy",
    "rdfd",
    // TIER 4: Personal/creative signal.
    "jerdi-kids",
    "photo-competition-my-hometown",
  ]),
});

/**
 * @param {string} version
 * @returns {Array<object>}
 */
function buildMissionGalleryManifestForVersion(version) {
  const slugsInOrder = MISSION_GALLERY_ORDER[version];
  const fallbackOrder = MISSION_GALLERY_ORDER.swe;
  if (!slugsInOrder) {
    if (import.meta?.env?.DEV) {
      console.warn(
        `Unknown mission gallery version "${version}". Falling back to "swe".`,
      );
    }
    return fallbackOrder
      .map((slug) => MISSION_GALLERY_ROW_BY_SLUG.get(slug))
      .filter(Boolean);
  }
  const rows = slugsInOrder.map((slug) =>
    MISSION_GALLERY_ROW_BY_SLUG.get(slug),
  );
  if (import.meta?.env?.DEV) {
    const missing = slugsInOrder.filter((slug, i) => !rows[i]);
    if (missing.length > 0) {
      console.warn(
        `Mission Gallery version "${version}" has unknown slugs:`,
        missing,
      );
    }
  }
  return rows.filter(Boolean);
}

export const MISSION_GALLERY_MANIFEST = buildMissionGalleryManifestForVersion(
  ACTIVE_MISSION_GALLERY_VERSION,
);

/*
 * Archived `squeeze-it` is intentionally excluded from `MISSION_GALLERY_MANIFEST`.
 * To ship it: add a live gallery row, loader entry, and `projects/squeeze-it/index.js`.
 *
 * {
 *   slug: "squeeze-it",
 *   portfolioGroup: "research",
 *   portfolioYear: 2014,
 *   portfolioLabel: "Academic",
 *   name: "Squeeze It",
 *   desc: "Heuristic-search AI for a marble puzzle—D3 board you can read, agent whose reasoning stays visible.",
 *   img: "<add-live-asset-path>",
 *   alt: "Squeeze It",
 *   link: "https://github.com/Bellypoly/AI-project1",
 *   caseStudy: {
 *     eyebrow: "AI · Visualization",
 *     task: "Ship a marble puzzle people can parse move-by-move, and an AI opponent steered by legible heuristics—not an opaque win/loss score.",
 *     focus: ["Heuristic search", "D3.js", "Game UX"],
 *     context: "Academic AI project",
 *     techStack: [
 *       {
 *         label: "JavaScript",
 *         href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
 *       },
 *       { label: "D3.js", href: "https://d3js.org/" },
 *       {
 *         label: "Heuristic search",
 *         href: "https://en.wikipedia.org/wiki/Heuristic_search",
 *       },
 *     ],
 *     overview: [
 *       "Even a compact game board fails if motion is ambiguous: readers should see the last move, the next options, and why the bot leaned one way. I treated clarity as the product—not chrome around a solver.",
 *       "D3.js carried transitions and stable geometry so the puzzle felt like software someone would demo, not a Matlab plot with buttons.",
 *     ],
 *     strategyTitle: "What I did",
 *     strategyIntro:
 *       "My role: build the full-stack academic project—D3.js game UI plus a heuristic search agent with legible reasoning. I designed for two audiences: players who want a tight loop, and reviewers who need to see why the AI moved.",
 *     pillars: [
 *       {
 *         title: "Explainable play",
 *         body: "I surfaced heuristic cues that steer search—players can disagree, but they're never mystified.",
 *       },
 *       {
 *         title: "Performance where it matters",
 *         body: "I tuned search depth against frame time so the UI stayed responsive.",
 *       },
 *       {
 *         title: "Joyful feedback",
 *         body: "I used motion and timing (color, transitions) to celebrate good moves without noise.",
 *       },
 *     ],
 *     approachTitle: "How I shipped it",
 *     approach: [
 *       "I implemented the heuristic search core with tunable weights and a replay timeline for interesting branches.",
 *       "I built D3-driven board updates with layout that stayed stable across viewport changes.",
 *     ],
 *     results: null,
 *   },
 * },
 */

/** Slug -> row (same object references as entries in `MISSION_GALLERY_MANIFEST`). */
export const MISSION_GALLERY_MANIFEST_BY_SLUG = new Map(
  MISSION_GALLERY_MANIFEST.map((row) => [row.slug, row]),
);

/**
 * Gallery fields for case-study modules; single source of truth is `MISSION_GALLERY_MANIFEST`.
 * @param {string} slug
 */
export function getMissionGalleryManifestRow(slug) {
  const row = MISSION_GALLERY_MANIFEST_BY_SLUG.get(slug);
  if (!row) {
    throw new Error(
      `Missing MISSION_GALLERY_MANIFEST row for slug "${slug}". Add the row first, or ship a stand-alone project without this helper.`,
    );
  }
  return row;
}
