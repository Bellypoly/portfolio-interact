import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const peaEServiceCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    /* Header / intro */
    eyebrow: "Public Infrastructure · Service Systems",

    /* Media */
    featuredImg: "images/portfolio/pea-e-service/featured-image.png",
    featuredImgWebp: "images/portfolio/pea-e-service/featured-image.webp",

    featuredImageAlt:
      "PEA E-Service banner — purple E-SERVICE branding; apply for electricity and water; service flows for individual customers, organizations, and request tracking across desktop and mobile",

    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    featuredImageObjectPositionMd: "center 35%",

    /* Project frame */
    task: "Nobody should need an org chart to apply for power or water. Co-design the software and UX so fragmented utility and government systems still feel like one product: shared authentication, honest handoffs, and citizen-facing language that explains who moves next.",

    focus: [
      "Service design",
      "Information architecture",
      "Full-stack development",
      "Accessibility",
    ],

    context:
      "PEA (Provincial Electricity Authority), PWA (Provincial Waterworks Authority of Thailand), Ministry of Interior, Department of Lands, Department of Highways, Ministry of Energy, and synchronized GIS reference services — Thailand public-sector e-service ecosystem",

    /* Stack */
    techStack: [
      { label: "Web", href: "https://developer.mozilla.org/en-US/docs/Web" },
      { label: "Laravel", href: "https://laravel.com/" },
      {
        label: "C#",
        href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
      { label: "Oracle", href: "https://www.oracle.com/database/" },
      { label: "Selenium", href: "https://www.selenium.dev/" },
    ],

    /* Impact */
    results: [
      {
        value: "One portal",
        label:
          "Electricity, water, spatial validation, and producer workflows coordinated through one authenticated portal.",
      },
      {
        value: "Cross-agency",
        label:
          "PEA, PWA, Interior, Lands, Highways, Energy, and geospatial reference services synchronized around shared case visibility.",
      },
      {
        value: "Readable systems",
        label:
          "Status, ownership, and workflow transitions translated into citizen-facing UX instead of agency jargon.",
      },
    ],
    resultsLabelCase: "sentence",

    /* Overview */
    overview: [
      "Public utilities already had the data. The harder problem was making fragmented electricity, water, land, energy, and GIS-linked workflows feel understandable as one public-facing journey.",

      "I joined the engineering side next to PWA while PEA and PWA each kept shipping their own application programming interfaces (APIs). The hardest problems were the boring-sounding ones: the same citizen session, two utilities, a pile of reference datasets, and a deadline. We folded those APIs into one public portal with shared government authentication—then stayed stubborn about the seams, because that is where multi-org software usually rots.",

      "When a case pulls civil registration from the Ministry of Interior, land or highway facts, or Ministry of Energy rules for distributed solar with PEA, the data model is never polite. A geographic information system (GIS) tier in the backend—parcels, routes, survey geometry—has to stay in lockstep with the transactional case; we designed APIs that compose spatial results with registry, utility, and policy payloads so one service request can return a single coherent answer.",

      "Different owners, different latency, different failure semantics. I translated that reality into copy, status, and flows citizens and call-center staff could actually follow—data storytelling with engineering constraints, not a slide deck.",

      {
        text: "Day-to-day services lived next to specialist energy work—intake for very small power producers (VSPP), rooftop solar, and paid interconnection studies. I also helped design and build ",
        externalLink: {
          href: "https://ppim.pea.co.th/",
          label: "PEA’s PPIM (Power Producer Information Management System)",
        },
        after:
          " so producer paperwork never hijacked the main hub people use for ordinary requests.",
      },
    ],

    /* System design */
    overviewSystemDesign: {
      sectionTitle: "How I told the system story",

      diagramCompact: true,

      intro:
        "This diagram was the cheat sheet for engineers and program owners: start from party type, drop through one authenticated portal, then show the parallel tracks so nobody pretends electricity, water, reference data, energy policy, and producers are the same pipeline.",

      diagramImage: "images/portfolio/pea-e-service/system-diagram.png",

      diagramImageWebp: "images/portfolio/pea-e-service/system-diagram.webp",

      caption:
        "Read top to bottom: party type, portal plus auth, then five lanes — PEA power, PWA water, Interior / Lands / Highways with GIS-backed reference data, Ministry of Energy with solar and PEA policy, and power producer workflows.",

      diagramAlt:
        "Vertical diagram showing party type flowing into a shared authenticated e-service portal, then branching into five operational tracks: PEA electricity, PWA water, Interior/Lands/Highways GIS-backed validation, Ministry of Energy solar policy, and power producer workflows.",
    },

    /* What I focused on */
    strategyTitle: "What I shaped",

    strategyIntro:
      "I wrote production code and product copy in the same breath: Laravel, C#, Oracle, and Selenium on the stack; information architecture and public-facing UX in the browser. With PWA, I stitched APIs and delivery channels into one authentication story so forms did not fork randomly—including geospatial reads that had to match cadastral and highway updates the moment a case moved.",

    pillars: [
      {
        title: "Readable systems",

        body: "If the backend hops across registries, land files, highway checks, energy rules, or synchronized geometry, the UI has to narrate that hop in plain language—not drown people in acronyms. I treated status lines and labels as part of the integration contract.",
      },

      {
        title: "Solid seams",

        body: "Software wins when handoffs are explicit: which service owns the next API call, what payload is missing, how spatial joins stay consistent with the operational database, and how retries surface to humans. I helped keep those contracts visible in code and in the product.",
      },

      {
        title: "Human-scale defaults",

        body: "Utility tasks arrive angry or rushed. I pushed legible type, generous tap targets, and validation that explains the fix—legibility under operational stress, not ornamental UI.",
      },
    ],

    /* How it shipped */
    approachTitle: "How it landed",
    approach: [
      "Shipped hub-and-spoke information architecture with progressive disclosure: ask only what the task needs, keep electricity and water visually related, and load spatial checks only when workflows touch land, access, or route evidence.",

      "Aligned alerts and receipts with SMS and email patterns people already trust; whenever ownership jumped agencies, the copy said so plainly.",

      "Kept producer programs on PPIM with their own sign-in so rooftop solar, VSPP, and interconnection studies never hijacked the main portal people use every day.",
    ],

    relatedProject: {
      slug: "outage-management-system",
      label: "Related story: PEA Outage Management & Reliability Platform",
    },
    /* Footer */
    footerTagline:
      "Thai utilities already had the data. The hard part was making fragmented systems read as one journey. With PWA (Provincial Waterworks Authority of Thailand), I helped unify PEA (Provincial Electricity Authority), registry, land, highway, Ministry of Energy (including solar with PEA), and synchronized GIS layers into one authenticated portal—while PPIM (Power Producer Information Management System) kept producer programs in their own operational lane.",
  }),
});

export const peaEServiceCaseStudyVariant =
  peaEServiceCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  peaEServiceCaseStudyVariants.swe;
