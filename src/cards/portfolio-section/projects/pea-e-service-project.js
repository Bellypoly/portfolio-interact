/**
 * PEA E-Service (Thailand public-sector portal) — portfolio entry + case study.
 * Extracted from portfolioProjects.js for maintainability.
 */

export const peaEServiceProject = {
  slug: "pea-e-service",
  portfolioGroup: "professional",
  portfolioYear: 2019,
  portfolioLabel: "Public sector",
  name: "PEA E\u2011Service",
  desc: "Thai utilities already had the data. The hard part was the story people saw. With PWA (Provincial Waterworks Authority of Thailand) I helped wire PEA (Provincial Electricity Authority) and water into one authenticated portal—plus registry, land, highway, Ministry of Energy (including solar with PEA), and GIS layers kept in sync with case data—so the product read as one journey. I also worked on PPIM (Power Producer Information Management System) so producer programs had their own lane.",
  img: "images/portfolio/pea-e-service/thumbnail.png",
  imgWebp: "images/portfolio/pea-e-service/thumbnail.webp",
  alt: "PEA E\u2011Service — electricity and water portal mockups on tablet and phone, purple branding",
  link: "https://eservice.pea.co.th/",
  anchorId: "portfolio-pea",
  caseStudy: {
    eyebrow: "Public sector · Engineering & user experience (UX)",
    featuredImg: "images/portfolio/pea-e-service/featured-image.png",
    featuredImgWebp: "images/portfolio/pea-e-service/featured-image.webp",
    featuredImageAlt:
      "PEA E\u2011Service banner — purple E\u2011SERVICE branding; apply for electricity and water; three service paths (individual, organization, check request status); laptop and phone mockups; footer with eservice.pea.co.th and 1129 PEA Contact Center",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    featuredImageObjectPositionMd: "center 35%",
    task: "Nobody should need an org chart to apply for power or water. Co-design the software and UX so many backends still feel like one product: one national sign-in up front, honest handoffs in the middle, and language that says who moves next when a case touches PEA, PWA, or a ministry—including when answers depend on GIS parcels, routes, or survey geometry that must stay synchronized with the same ticket everyone sees.",
    disciplines: [
      "Service design",
      "Information architecture",
      "Full-stack development",
      "Accessibility",
    ],
    context:
      "PEA (Provincial Electricity Authority), PWA (Provincial Waterworks Authority of Thailand), Ministry of Interior (civil registry), Department of Lands, Department of Highways, Ministry of Energy (including distributed solar trading with PEA), synchronized GIS reference services — Thailand public-sector e\u2011service ecosystem",
    techStack: [
      {
        label: "Web",
        href: "https://developer.mozilla.org/en-US/docs/Web",
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
      { label: "Selenium", href: "https://www.selenium.dev/" },
    ],
    overview: [
      "I joined the engineering side next to PWA while PEA and PWA each kept shipping their own application programming interfaces (APIs). My favorite problems were the boring-sounding ones: the same citizen session, two utilities, a pile of reference datasets, and a deadline. We folded those APIs into one public portal with shared government authentication—then stayed stubborn about the seams, because that is where multi-org software usually rots.",
      "When a case pulls civil registration from the Ministry of Interior, land or highway facts, or Ministry of Energy rules for distributed solar with PEA, the data model is never polite. A geographic information system (GIS) tier in the backend—parcels, routes, survey geometry—has to stay in lockstep with the transactional case; we designed APIs that compose spatial results with registry, utility, and policy payloads so one service request can return a single coherent answer. Different owners, different latency, different failure semantics. I spent time turning that reality into copy, status, and flows both citizens and call-center staff could follow—data storytelling with engineering constraints, not a slide deck.",
      {
        text: "Day-to-day services lived next to specialist energy work—intake for very small power producers (VSPP), rooftop solar, paid interconnection studies. I also helped design and build ",
        externalLink: {
          href: "https://ppim.pea.co.th/",
          label:
            "PEA\u2019s PPIM (Power Producer Information Management System)",
        },
        after:
          " so producer paperwork never hijacked the main hub people use for ordinary requests.",
      },
      "The related link at the bottom of this case study opens the PEA OMS integration story (outage hub, GIS, SAP, dashboards).",
    ],
    overviewSystemDesign: {
      sectionTitle: "How I told the system story",
      diagramCompact: true,
      intro:
        "This diagram is the cheat sheet I used with engineers and program owners: start from party type (individual vs organization), drop through one authenticated portal, then show the parallel tracks so nobody pretends electricity, water, reference data, energy policy, and producers are the same pipeline.",
      diagramImage: "images/portfolio/pea-e-service/system-diagram.png",
      diagramImageWebp: "images/portfolio/pea-e-service/system-diagram.webp",
      caption:
        "Read top to bottom: party type, then portal plus auth, then five lanes (PEA power, PWA water, Interior / Lands / Highways with GIS-backed reference data, Ministry of Energy with solar and PEA policy, power producer) with the visible handoff from policy to producer.",
      diagramAlt:
        "Vertical diagram: party type Individual or organization; shared e-service portal with government authentication; five tracks for PEA electricity through meter install, panel inspection, and power active; PWA water to active service; Interior lands and highways through survey and permits to road access verified; Ministry of Energy solar and PEA policy to renewable feed-in approved; power producer partnership with connector from the energy column.",
    },
    strategyTitle: "What I shaped",
    strategyIntro:
      "I wrote production code and product copy in the same breath: Laravel, C#, Oracle, and Selenium on the stack; information architecture (IA) and public-facing user experience (UX) in the browser. With PWA I stitched APIs and delivery channels into one authentication story so forms did not fork randomly—including geospatial reads that had to match cadastral and highway updates the moment a case moved. Workshops, call spikes, and funnel reviews were my editor—they told me where the data story was lying.",
    pillars: [
      {
        title: "Readable systems",
        body: "If the backend hops across registries, land files, highway checks, energy rules, or synchronized GIS geometry, the UI has to narrate that hop in plain language—not drown people in acronyms. I treated status lines and labels as part of the integration contract.",
      },
      {
        title: "Solid seams",
        body: "Software wins when handoffs are explicit: which service owns the next API call, what payload is missing, how spatial joins stay consistent with the operational database, and how retries surface to humans. I helped keep those contracts visible in code and in the product.",
      },
      {
        title: "Human-scale defaults",
        body: "Utility tasks arrive angry or rushed. I pushed legible type, generous tap targets, and validation that explains the fix—engineering empathy, not decoration.",
      },
    ],
    approachTitle: "How it landed",
    approach: [
      "I shipped hub-and-spoke IA with progressive disclosure: ask only what the task needs, keep electricity and water visually related, one authenticated session underneath—then load GIS-backed checks only when the task actually touches land, access, or route evidence.",
      "I aligned alerts and receipts with short message service (SMS) and email patterns people already trust; whenever ownership jumped agencies, the copy said so plainly.",
      "I kept producer programs on PPIM with their own sign-in so rooftop solar, VSPP, and interconnection studies never hijacked the main portal people use every day.",
    ],
    relatedProject: {
      slug: "outage-management-system",
      label: "Related story: PEA Outage Management & Reliability Platform",
    },
    results: null,
  },
};
