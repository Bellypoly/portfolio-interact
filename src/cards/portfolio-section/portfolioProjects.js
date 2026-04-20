/**
 * Portfolio projects — one entry drives Mission Gallery cards and `/mission/:slug` case studies.
 * Optional `caseStudy.techStack`: `{ label, href }[]` (or legacy `string[]`) — Stack row in meta; links open in a new tab.
 *
 * Mission Gallery order: `getMissionGalleryProjects()` uses `PROFESSIONAL_MISSION_GALLERY_ORDER` for
 * professional entries (fallback: `portfolioYear` newest first, then slug). Research uses
 * `portfolioYear` + slug only.
 *
 * `portfolioLabel` — short Mission Gallery context tag (fixed vocabulary): Product, Competition,
 * Thesis, Paper, Academic, Marketplace, Platform, Civic tech, Public sector.
 */

export function getPortfolioProjectBySlug(slug) {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug) ?? null;
}

function compareMissionGalleryOrder(a, b) {
  const y = (b.portfolioYear ?? 0) - (a.portfolioYear ?? 0);
  if (y !== 0) return y;
  return (a.slug ?? "").localeCompare(b.slug ?? "");
}

/** Slug order for Mission Gallery — professional group only (overrides year + slug). */
const PROFESSIONAL_MISSION_GALLERY_ORDER = [
  "article-page-redesign",
  "dynamic-paywall",
  "subscription-checkout-activation",
  "local-elections-hub",
  "electricity-bill-breakdown",
  "parliament-watch-ocr",
  "vote62-ect-report-69",
  "jobthai",
  "map-magic",
  "pea-e-service",
  "jerdi-kids",
];

function compareProfessionalMissionGallery(a, b) {
  const ia = PROFESSIONAL_MISSION_GALLERY_ORDER.indexOf(a.slug ?? "");
  const ib = PROFESSIONAL_MISSION_GALLERY_ORDER.indexOf(b.slug ?? "");
  const aKnown = ia !== -1;
  const bKnown = ib !== -1;
  if (aKnown && bKnown) return ia - ib;
  if (aKnown !== bKnown) return aKnown ? -1 : 1;
  return compareMissionGalleryOrder(a, b);
}

/** Ordered list for the Mission Gallery section (group 1: work + competitions, group 2: research). */
export function getMissionGalleryProjects() {
  const professional = PORTFOLIO_PROJECTS.filter(
    (p) => p.portfolioGroup !== "research",
  );
  const research = PORTFOLIO_PROJECTS.filter(
    (p) => p.portfolioGroup === "research",
  );
  return [
    ...professional.sort(compareProfessionalMissionGallery),
    ...research.sort(compareMissionGalleryOrder),
  ];
}

export const PORTFOLIO_PROJECTS = [
  {
    slug: "dynamic-paywall",
    portfolioGroup: "professional",
    portfolioYear: 2025,
    portfolioLabel: "Product",
    anchorId: "portfolio",
    name: "AI-Powered Dynamic Paywall",
    desc: "Sophi ML paywall on Arc XP—gate, meter, or let stories through per visit while GA4 and flags keep rollout safe.",
    img: "images/portfolio/dynamic-paywall/thumbnail.png",
    imgWebp: "images/portfolio/dynamic-paywall/thumbnail.webp",
    /* Mission Gallery: full image width, top-aligned; bottom clipped to square */
    cardImageFit: "top-clip",
    alt: "Dallas Morning News site with paywall modal and analytics chart — AI-powered dynamic paywall",
    caseStudy: {
      eyebrow: "Product · Monetization · AI",
      // Case-study featured strip (gallery uses img/imgWebp thumbnails above)
      featuredImg: "images/portfolio/dynamic-paywall/featured-image.png",
      featuredImgWebp: "images/portfolio/dynamic-paywall/featured-image.webp",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center top",
      featuredImageObjectPositionMd: "50% 20%",
      task: "Integrate Sophi’s ML paywall into DMN’s Arc XP frontend and subscription paths. Wire JavaScript and BlueConic so on-page behavior matches Sophi’s decisions; instrument GA4; ship with feature flags and kill switches for safe rollout and trustworthy model feedback.",
      disciplines: [
        "Machine Learning paywall",
        "Analytics",
        "Frontend integration",
      ],
      context: "The Dallas Morning News",
      techStack: [
        {
          label: "Arc XP",
          href: "https://www.arcpublishing.com/products/arcxp/",
        },
        {
          label: "Sophi",
          href: "https://www.sophi.io/",
        },
        {
          label: "JavaScript",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          label: "GA4",
          href: "https://support.google.com/analytics/answer/10089681",
        },
        {
          label: "BlueConic",
          href: "https://www.blueconic.com/",
        },
        {
          label: "Feature flags",
          href: "https://martinfowler.com/articles/feature-toggles.html",
        },
      ],
      results: [
        { value: "+22%", label: "Conversion rate" },
        { value: "+15%", label: "More subscription starts" },
      ],
      overviewTitle: "Overview",
      overview: [
        "Those gains came from solving a fundamental problem: static paywalls treat every reader the same. Block too early and you lose casual readers who might have converted later. Block too late and you leave revenue on the table.",
        "What made it harder was that different content behaves differently — politics, crime, and restaurant coverage drive the most subscription starts, while high school sports, commentary, and business convert at the highest rates. No single static rule could capture that.",
        "The metrics in the Impact section (+22% conversion, +15% more subscription starts) were referenced in the DMN employee town hall on August 13, 2025.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role: integrate Sophi’s ML paywall into DMN’s Arc XP frontend and subscription flows, instrument analytics, and roll out safely with feature flags. The answer was Sophi — an AI-driven dynamic paywall that decides per-visit whether to gate, meter, or let content through, learning from every interaction. Here’s how I brought it to production:",
      strategyBullets: [
        "I integrated Sophi’s decisioning layer into frontend rendering and subscription flows so paywall responses followed user behavior and content context in real time.",
        "I designed user-state handling across new visitors, returning readers, and subscribers so gating logic and messaging stayed consistent.",
        "I established analytics instrumentation so model training and evaluation had trustworthy signals.",
        "I supported controlled rollout with feature flags and kill switches to limit risk and protect editorial trust.",
        "After first launch, GA4 and Sophi didn’t always agree — we traced which analytics definitions and events needed tuning versus which model inputs had to change so dashboards and the learning loop matched real reader behavior.",
      ],
      pillars: null,
      systemDesign: {
        intro:
          "Those four pieces connect into a single feedback loop — every visit generates data that makes the next paywall decision smarter.",
        diagramImage: "images/portfolio/dynamic-paywall/system-design.png",
        diagramImageWebp: "images/portfolio/dynamic-paywall/system-design.webp",
        diagramAlt:
          "Paywall AI Decision Model flowchart: inputs, wall types (paywall, regiwall, delay, skip), conversion and engagement paths, analytics, and model optimization feedback loop",
        caption:
          "User behavior flows down, analytics flows back up — the loop never stops learning.",
      },
      approachTitle: "What I found in production",
      approachIntro:
        "As the feedback loop matured, a clear pattern emerged in the data:",
      approach: [
        "I saw conversion performance vary sharply by content category. High-traffic sections like politics and crime drove the most subscription starts in absolute volume — but high school sports, commentary, and business converted at significantly higher rates per reader.",
        "That told me the paywall couldn’t just count pageviews. It had to weigh reader intent against content type to know when gating would help — and when it would only push people away.",
      ],
      flourishEmbed: "https://flo.uri.sh/visualisation/28171634/embed",
      flourishCaption:
        "The data below shows exactly how this plays out — volume and conversion tell very different stories depending on the section.",
      businessOutcome:
        "The result is a paywall that gets smarter every day — continuously balancing subscription conversion against reader engagement, one visit at a time. The +22% conversion lift and +15% more subscription starts reflect a system that learns, not just a feature that shipped.",
      relatedProject: {
        slug: "subscription-checkout-activation",
        label:
          "See how the checkout and onboarding system converts this intent →",
      },
    },
  },
  {
    slug: "jerdi-kids",
    portfolioGroup: "professional",
    portfolioYear: 2017,
    portfolioLabel: "Competition",
    name: "JerDi — เจอดิ",
    desc: "Architected, designed, and built — UI/UX for app and wristband, plus hands-on development; QR + BLE and receivers where you need coverage.",
    img: "images/portfolio/jerdi/thumbnail.png",
    imgWebp: "images/portfolio/jerdi/thumbnail.webp",
    alt: "JerDi — JERDi wordmark, robotic hand holding QR wristband, phone app wireframes and human outline on teal tech background",
    caseStudy: {
      eyebrow: "System design · UI/UX · Development · QR & BLE · Social impact",
      featuredImg: "images/portfolio/jerdi/featured-image.png",
      featuredImgWebp: "images/portfolio/jerdi/featured-image.webp",
      featuredImageAlt:
        "JerDi hero — Stay Connected Stay Safe tagline, phone showing Finding JerDi-Kid map UI with Navigate and Play Sound, QR wristband, Found notification, Quick Find QR callout, family in park",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Design and build a community-driven safety net: QR wristbands any passerby can scan with a camera, BLE bands heard by receivers you place where coverage matters (caregiver phones, tablets on a school bus, fixed gateways)—one notification backbone for families, call centers, and authorities. I owned caregiver UI/UX (alerts, maps, status), the wristband face (QR legibility and finish, consistent with the app), and hands-on engineering—the web platform and app UI in production code with integrations, not handoff-only mocks.",
      disciplines: [
        "System architecture",
        "UI/UX — mobile app & wristband touchpoint",
        "Software development — web platform & app",
        "BLE / QR prototyping",
        "Community platform design",
      ],
      context: "Young Technopreneur — Samart × NSTDA BIC (2017)",
      techStack: [
        {
          label: "QR codes",
          href: "https://en.wikipedia.org/wiki/QR_code",
        },
        {
          label: "BLE beacons",
          href: "https://en.wikipedia.org/wiki/Bluetooth_Low_Energy_beacon",
        },
        {
          label: "Web platform",
          href: "https://developer.mozilla.org/en-US/docs/Web",
        },
        {
          label: "Real-time notifications",
          href: "https://en.wikipedia.org/wiki/Push_technology",
        },
      ],
      results: [
        { value: "฿30,000", label: "Development grant (ทุนพัฒนาผลงาน)" },
        { value: "Top 20", label: "Final round — 138 teams entered" },
      ],
      overviewTitle: "Overview",
      overview: [
        "JerDi (เจอดิ) means \u201cencounter it\u201d in Thai — the name captures the core promise: anyone nearby can help a family find their missing person.",
        "JerDi is a community-driven platform built on two complementary technologies: QR codes on wristbands so any bystander can identify and report a sighting with a phone camera — no app required for the scan — and BLE beacons on wristbands so a missing person can be sensed when they come within range of a receiver. Receivers mean any listening device you control: a caregiver phone with the app, a tablet mounted on a school bus, a gateway at a school gate or hospital ward entrance, or Bluetooth-enabled kiosks in a mall or transit hub. Where you place receivers defines where passive detection is possible; both paths feed the same real-time notification pipeline to family, call center, and authorities.",
        "The project competed in the electronics & software industry track of Young Technopreneur (โครงการเถ้าแก่น้อยเทคโนโลยี), a national startup program co-run by Samart Group and NSTDA (National Science and Technology Development Agency) BIC. From 138 teams, the JerDi-Kids entry reached the final 20 and received the ฿30,000 development grant (ทุนพัฒนาผลงาน).",
        {
          text: "Competition materials included the full ",
          externalLink: {
            href: "https://drive.google.com/file/d/1cQqFZYl-9I-GLykKMzgalBebXird2AuS/view?usp=drive_link",
            label: "JerDi business plan (PDF)",
          },
          after:
            " — market, operations, and rollout narrative as submitted to the program.",
        },
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role covered system architecture for both QR and beacon flows, hands-on software development on the web platform and app, BLE hardware evaluation, UI/UX for the app and the wearable surface, and how those pieces read as one product.",
      pillars: [
        {
          title: "System architecture",
          body: "I designed unified pipelines for both paths: QR scan \u2192 backend \u2192 notifications to family, call center, and police, plus beacon proximity events from deployed receivers \u2192 the same backend so institutional and public scenarios share one alert model. I implemented the client and integration layers for those flows in code, not only on paper. The QR path maximizes reach; the beacon path adds passive detection wherever listening hardware or apps are in range.",
        },
        {
          title: "App & wristband UI/UX",
          body: "For the application I structured flows for high-stress use: clear alerts, map and status context, and paths for family and authorities without burying the main action. For the wristband I treated the face as a UI surface: QR size and contrast for camera scan at arm\u2019s length, brand and typography aligned with the app, and a layout that still reads when the band is partially obscured. The goal was one mental model — scan in public, sense in covered spaces — expressed consistently on glass and on the band.",
        },
        {
          title: "BLE beacon prototyping",
          body: "I prototyped and evaluated commodity BLE beacon hardware, testing proximity accuracy, signal stability indoors vs outdoors, battery lifecycle, and real-world constraints: the missing person\u2019s band must be within radio range of a receiver, and someone\u2019s phone only helps if Bluetooth is on and the app or OS can scan — which is why fixed or vehicle-mounted receivers (e.g. a school-bus tablet) matter for predictable coverage.",
        },
        {
          title: "QR + beacon as one product",
          body: "The project deliberately uses both QR codes and beacon technology: QR scales to any smartphone with a camera for broad public participation; beacons pair with receivers you deploy for coverage you design — e.g. roll call on a school bus route, check-in at a clinic lobby, perimeter alerts at a care home, or footfall zones in retail and transit. I documented how each mode fits different deployment contexts while keeping a single family-facing experience.",
        },
      ],
      approachTitle: "The competition",
      approach: [
        "Young Technopreneur (โครงการเถ้าแก่น้อยเทคโนโลยี) is a collaboration between Samart Group and NSTDA BIC designed to turn early-stage tech ideas into fundable businesses. The program runs 48 hours of business training, an Idea-to-Market BootCamp, field research, and mentorship from marketing, finance, and technology experts.",
        "The JerDi-Kids entry entered the electronics & software track, cleared the field of 138 teams to reach the final 20, and was awarded the ฿30,000 development grant — the funding tier for the highest-scoring finalists below the top-3 prize podium.",
      ],
      showcase: {
        title: "On stage at Samart Innovation Awards",
        figureGridColumns: 2,
        mobile: [
          {
            img: "images/portfolio/jerdi/award-ceremony.png",
            imgWebp: "images/portfolio/jerdi/award-ceremony.webp",
            alt: "JerDi team receiving the ฿30,000 development grant cheque at Samart Innovation Awards",
            caption:
              "Receiving the ฿30,000 ทุนพัฒนาผลงาน (development grant) at Samart Innovation Awards",
          },
          {
            img: "images/portfolio/jerdi/team.png",
            imgWebp: "images/portfolio/jerdi/team.webp",
            alt: "JerDi team selfie at the Young Technopreneur awards ceremony",
            caption:
              "Team photo at the award announcement — Young Technopreneur × NSTDA BIC",
          },
        ],
      },
    },
  },
  {
    slug: "federated-learning-energy",
    portfolioGroup: "research",
    portfolioYear: 2020,
    portfolioLabel: "Thesis",
    name: "On Simulating Energy Consumption of Federated Learning Systems",
    desc: "MATLAB simulation study: federated learning energy use under NOMA — compute vs radio, sweepable regimes, reproducible figures.",
    img: "images/portfolio/federated-learning-energy/thumbnail.png",
    imgWebp: "images/portfolio/federated-learning-energy/thumbnail.webp",
    alt: "Federated learning poster — rocket, satellite, and rover linked to a central cloud with ΔW updates; tagline: local training, no raw data sharing",
    link: "https://github.com/Bellypoly/On_simulating_energy_consumption_of_federated_learning_systems",
    caseStudy: {
      eyebrow: "Research · Systems · Wireless",
      featuredImg:
        "images/portfolio/federated-learning-energy/featured-image.jpg",
      featuredImgWebp:
        "images/portfolio/federated-learning-energy/featured-image.webp",
      featuredImageAlt:
        "Diagram — server aggregates local updates ΔW from devices with battery energy indicators; title: On Simulating Energy Consumption of Federated Learning systems",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Quantify how federated learning burns energy at the edge when the radio channel is non-orthogonal multiple access (NOMA)—so training stories stay honest about compute and transmission cost.",
      disciplines: [
        "MATLAB simulation",
        "Federated learning",
        "Wireless modeling",
      ],
      context: "Academic / systems research",
      techStack: [
        {
          label: "MATLAB",
          href: "https://www.mathworks.com/products/matlab.html",
        },
        {
          label: "C",
          href: "https://en.wikipedia.org/wiki/C_(programming_language)",
        },
        {
          label: "Federated learning",
          href: "https://en.wikipedia.org/wiki/Federated_learning",
        },
        {
          label: "NOMA (wireless)",
          href: "https://en.wikipedia.org/wiki/Non-orthogonal_multiple_access",
        },
      ],
      overview: [
        "Federated learning moves training closer to data, but the bill is never compute alone: every aggregation round pays radio energy too. With NOMA, who shares spectrum—and how—changes interference patterns, so you cannot reuse “plain OFDMA” energy arguments without lying to the reader.",
        "The thesis contribution is deliberately comparative: sweep operating regimes, separate uplink vs compute spend where the model allows, and publish assumptions so another lab can rerun the sweep or argue with the numbers.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role: implement the MATLAB simulation and analysis for federated learning energy use under NOMA. I kept the model legible to wireless and ML readers—parameters with physical meanings, outputs that separate compute vs transmit costs.",
      pillars: [
        {
          title: "Faithful abstraction",
          body: "I encoded channel and scheduling assumptions without over-claiming full-stack fidelity.",
        },
        {
          title: "Sweep-ready",
          body: "I built parameter grids that highlight breakpoints—when FL round budgets dominate, when NOMA wins, and saturation regimes.",
        },
        {
          title: "Open artifacts",
          body: "I published scripts and figures so others could re-run and challenge the conclusions.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "I wrote MATLAB modules for client sampling, aggregation rounds, and energy accounting tied to the RF model.",
        "I generated plots that isolate uplink vs downlink, per-device heterogeneity, and convergence milestones.",
      ],
      results: null,
    },
  },
  {
    slug: "local-elections-hub",
    portfolioGroup: "professional",
    portfolioYear: 2022,
    portfolioLabel: "Product",
    name: "Local Elections Hub",
    desc: "Elections hub rebuilt for Arc XP—typed race data, county anchors, lightweight viz, and mobile-first grids for live returns.",
    img: "images/portfolio/local-elections-hub/thumbnail.png",
    imgWebp: "images/portfolio/local-elections-hub/thumbnail.webp",
    cardImagePosition: "center top",
    alt: "Illustration — hand placing a marked ballot into a ballot box on a patterned background",
    caseStudy: {
      eyebrow: "Product · Data UI · Newsroom",
      featuredImg: "images/portfolio/local-elections-hub/featured-image.png",
      featuredImgWebp:
        "images/portfolio/local-elections-hub/featured-image.webp",
      featuredImageAlt:
        "The Dallas Morning News Voter Guide — Elections 2022: blue and red voting booths on a ballot-pattern background with headline typography",
      featuredImageSource: {
        href: "https://voterguide.dallasnews.com/",
        label: "The Dallas Morning News Voter Guide",
      },
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Full-stack engineer on the Local Elections Hub: owned the frontend architecture and implementation for the 2022 rebuild — turning a loose, module-based hub into a component-driven, data-aware system for real-time results, election-night traffic, and mobile-first reading.",
      taskBodyType: true,
      disciplines: [
        "Frontend architecture (React · Arc XP)",
        "Data-heavy UI & visualization",
        "Performance & progressive disclosure",
        "Accessibility & semantic HTML",
      ],
      context: "The Dallas Morning News",
      techStack: [
        {
          label: "Arc XP",
          href: "https://www.arcpublishing.com/products/arcxp/",
        },
        {
          label: "React",
          href: "https://react.dev/",
        },
        {
          label: "JavaScript",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          label: "GraphQL",
          href: "https://graphql.org/",
        },
        {
          label: "Semantic HTML",
          href: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
        },
      ],
      overviewTitle: "Overview",
      overview: [
        "Election night is deadline journalism: readers refresh, editors watch the same tables, and a fragmented hub burns trust fast. After AMP and alongside broader Arc XP work, I rebuilt the hub as one coherent, data-driven system—counties, races, and candidates mapped to reusable components instead of a bespoke page per contest.",
      ],
      overviewSystemDesign: {
        sectionTitle: "Data to UI",
        intro:
          "Editorial and wire data normalize into typed race/candidate models; the UI layer maps those models to tables, progress indicators, and metadata chips — with client-side navigation across counties without extra round-trips.",
        diagram: [
          "Feeds / CMS — structured election payloads",
          "↓",
          "Normalize — counties, races, candidates, party, vote totals",
          "↓",
          "Component registry — tables · vote bars · status tags · reporting footer",
          "↓",
          "Render — responsive grid (6-col) · anchor nav · progressive disclosure",
        ],
        caption:
          "One pipeline from structured data to reusable components; navigation and layout stay on the client where it helps perceived performance.",
        diagramAlt:
          "Flow from election data through normalization to component registry and responsive render with anchor navigation",
      },
      problemSection: {
        title: "Problem",
        paragraphs: [
          "The earlier hub was built from loosely aligned modules: election data showed up inconsistently across counties and races, mobile hierarchy was weak, and there was no shared pattern for live results or candidate metadata at scale.",
        ],
        listGroups: [
          {
            title: "What failed the newsroom and readers",
            items: [
              "Fragmented rendering of election data across counties and races.",
              "Poor mobile hierarchy and limited scanability on dense, updating tables.",
              "No clear system for lightweight visualization of standings (percent bars) alongside raw numbers.",
              "Limited patterns for candidate metadata (e.g. party, runoff status) without cluttering the layout.",
              "Hard to scale for large datasets and traffic spikes on election night.",
            ],
          },
        ],
        figureCaption:
          "Two production mobile views from different election cycles — not a date mistake: before (May 2021) vs after (November 2022) — showing clearer hierarchy, metadata, and scan-friendly tables after the rebuild.",
        beforeAfterCompare: {
          diagramAlt:
            "Before and after mobile screenshots of the Dallas Morning News local elections hub from 2021 and 2022 cycles",
          rows: [
            {
              rowTitle: "Representative mobile views",
              beforeTitle: "Before",
              afterTitle: "After",
              before: {
                img: "images/portfolio/local-elections-hub/hub-before-2021-mobile.png",
                imgWebp:
                  "images/portfolio/local-elections-hub/hub-before-2021-mobile.webp",
                alt: "Dallas Morning News mobile — Dallas City Council races, May 2021: tables with votes, percentages, and RUNOFF tags.",
                caption:
                  "2021 hub — dense tables and status tags; groundwork for the later component model.",
              },
              after: {
                img: "images/portfolio/local-elections-hub/hub-after-2022-mobile.png",
                imgWebp:
                  "images/portfolio/local-elections-hub/hub-after-2022-mobile.webp",
                alt: "Dallas Morning News mobile — Local Elections November 2022, Dallas County: candidate rows with party badges and vote share bars.",
                caption:
                  "2022 hub — same product family with county navigation, party indicators, and lightweight vote-share bars for faster scanning.",
              },
            },
          ],
          caption:
            "Different races and timestamps on purpose: the comparison is across cycles after the new data model and UI system shipped.",
        },
      },
      strategyTitle: "What I built",
      strategyBullets: null,
      pillars: [
        {
          title: "Dynamic data rendering layer",
          body: "Reusable components for structured election payloads — candidates, vote counts, percentages — with consistent formatting whether the race is county-wide, city council, or down-ballot.",
        },
        {
          title: "Client-side navigation",
          body: "Anchor-based in-page navigation across counties so readers can jump without a full reload — fewer round-trips during high-traffic windows.",
        },
        {
          title: "Lightweight visualization",
          body: "Small vote-share / progress bar components next to numeric results so standings are scannable without relying on walls of text.",
        },
        {
          title: "Metadata in the model",
          body: "Extended the data shape and UI for party affiliation, runoff and reporting status — surfaced as compact chips and badges that stay legible on narrow viewports.",
        },
        {
          title: "Progressive disclosure",
          body: "Patterns like “view all races” to keep initial render manageable while still supporting deep exploration when readers want the full ballot.",
        },
        {
          title: "Grid, semantics & a11y",
          body: "Moved to a flexible six-column grid for better density control on small screens; enforced heading order and semantic tables/regions for screen readers and SEO on high-interest pages.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "Election night is the worst time to discover layout thrash or unbounded lists. I biased toward stable shells (reserved row height where possible), bounded “view more” paths, and client navigation so the server wasn’t replaying full pages for every county hop.",
        "The hard part wasn’t a single component — it was consistency: one mental model for editors and readers across counties, with the same components whether data arrived fast or trickled in during live returns.",
      ],
      results: [
        {
          value: "Readable",
          label:
            "Denser results stayed scannable on mobile after hierarchy and metadata work",
        },
        {
          value: "Faster",
          label:
            "County and race jumps without full reloads during peak traffic",
        },
        {
          value: "Reusable",
          label:
            "Component system reused across races instead of one-off election pages",
        },
        {
          value: "Ready",
          label:
            "Layout and semantics suited to high-visibility, high-stakes publishing windows",
        },
      ],
      businessOutcome:
        "The hub became a reusable elections surface — built for real-time data, mobile majority traffic, and repeat reuse across cycles rather than a fragile set of bespoke modules.",
      relatedProject: {
        slug: "article-page-redesign",
        label:
          "Same platform: article experience, ads, engagement, and reader state →",
      },
    },
  },
  {
    slug: "subscription-checkout-activation",
    portfolioGroup: "professional",
    portfolioYear: 2025,
    portfolioLabel: "Product",
    name: "End-to-End Subscription Conversion System",
    desc: "Rebuilt a three-page checkout leak into one React surface—then used Clarity evidence to refine the flow and onboard new subscribers.",
    img: "images/portfolio/subscription-checkout/thumbnail.png",
    imgWebp: "images/portfolio/subscription-checkout/thumbnail.webp",
    cardImagePosition: "center 10%",
    alt: "End-to-end subscription conversion: checkout, identity, onboarding — case study",
    caseStudy: {
      eyebrow: "Product · Subscriptions · Platform",
      featuredImg: "images/portfolio/subscription-checkout/featured-image.png",
      featuredImgWebp:
        "images/portfolio/subscription-checkout/featured-image.webp",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Replace a leaking 3-page, server-rendered checkout with a single React surface, unify Braintree, Stripe, and Apple Pay behind one payment abstraction, and implement deterministic Arc XP identity resolution at email entry — then iterate with Microsoft Clarity in production so evidence, not assumptions, drove the V3 UX fixes.",
      disciplines: [
        "Checkout & payments system",
        "Identity & session continuity",
        "Post-purchase onboarding",
      ],
      context: "The Dallas Morning News",
      techStack: [
        {
          label: "Arc XP",
          href: "https://www.arcpublishing.com/products/arcxp/",
        },
        {
          label: "Microsoft Clarity",
          href: "https://clarity.microsoft.com/",
        },
        {
          label: "Braintree",
          href: "https://developer.paypal.com/braintree/docs/",
        },
        { label: "Stripe", href: "https://stripe.com/" },
        { label: "Apple Pay", href: "https://www.apple.com/apple-pay/" },
        { label: "React", href: "https://react.dev/" },
      ],
      earlyImpactTitle: "Impact",
      earlyImpactIntro:
        "Subscription metrics from the same internal milestone referenced elsewhere in this case study — first after the V2 single-page launch, then after the Clarity-driven V3 iteration on that same surface.",
      earlyImpactGroups: [
        {
          title: "After V2 launch",
          rows: [{ value: "+14%", label: "Digital subscriptions" }],
        },
        {
          title: "After V3 iteration",
          rows: [
            {
              value: "+7%",
              label: "Conversion uplift",
            },
            { value: "+9%", label: "Member information completion" },
            {
              value: "+22%",
              label: "Payment details completed",
            },
          ],
        },
      ],
      overviewTitle: "Overview",
      overview: [
        {
          text: "The upstream problem was already solved: ",
          link: {
            slug: "dynamic-paywall",
            label:
              "our AI-driven dynamic paywall had lifted paywall conversion +22%",
          },
          after:
            " — more readers than ever were reaching the moment they wanted to subscribe. But the checkout they hit was 3 server-rendered pages with no shared client state: member info, payment, password. Every navigation was a full round-trip, a fresh DOM, and another chance for the reader to close the tab.",
        },
        "I rebuilt the pipeline in 2 engineering passes. The first collapsed 3 pages into a single React surface, unified 3 payment providers (Braintree, Stripe, Apple Pay) behind one tokenization interface, and wrote deterministic identity resolution against Arc XP so the system could distinguish new visitors, existing accounts, and active subscribers — all at the email-entry boundary.",
        "The second pass used Microsoft Clarity tap heatmaps in production to show that some of my own earlier engineering choices had become the UX bottleneck. I shipped fixes directly against that evidence.",
      ],
      relatedProject: {
        slug: "dynamic-paywall",
        label:
          "Dig into Sophi — the paywall that fills the top of this funnel →",
      },
      overviewSystemDesign: {
        sectionTitle: "The pipeline",
        intro:
          "Not a set of pages — a system. Each stage owns one concern and hands off to the next through a clean contract. Identity is the spine: the same resolution logic that prevents dead ends at checkout also decides what onboarding a subscriber sees downstream.",
        diagram: [
          "Dynamic Paywall",
          "↓",
          "Checkout (Single Page)",
          "↓",
          "Arc XP Identity Layer",
          "↓",
          "Subscription Success",
          "↓",
          "Onboarding (3 Steps)",
          "↓",
          "Engagement / Retention",
        ],
        caption:
          "One deterministic path from paywall to retention — not a loose set of pages, but a system.",
        diagramAlt:
          "Flow from Sophi paywall through single-page checkout, Arc XP identity, success, 3-step onboarding, to engagement",
      },
      problemSection: {
        title: "Version 1: 3 pages, 3 chances to leave",
        listGroups: [
          {
            title: "The checkout was leaking conversions",
            items: [
              "Three separate pages — member info, payment, password — each with its own load time and a full page transition between them.",
              {
                text: "A reader who just decided to subscribe was forced through: paywall → login → ",
                anchor: {
                  id: "before-screenshots",
                  label: "page 1 → page 2 → page 3",
                },
                after:
                  ". Each hop was a new chance to bail — and the funnel showed it.",
              },
            ],
          },
          {
            title: "The platform fought back",
            items: [
              "Arc XP's identity layer had one entry point for 3 distinct states — new visitor, existing account, active subscriber — with no built-in branching. Every path through checkout needed explicit resolution logic or the flow silently broke.",
              "Sessions and accounts fell out of sync constantly: 'user already exists' errors on fresh signups, cart state vanishing across navigations, duplicate accounts created when retries hit the wrong endpoint.",
              "There was no abstraction over the payment providers. Braintree, Stripe, and Apple Pay each had their own tokenization flow, error contract, and validation sequence — all wired directly into the page templates.",
            ],
          },
        ],
        figures: [
          {
            img: "images/portfolio/subscription-checkout/before-step-1.webp",
            alt: "Step 1: Member information — name, email, and CAPTCHA on a mostly empty page",
            caption: "Page 1 — Name, email, CAPTCHA. That's it.",
          },
          {
            img: "images/portfolio/subscription-checkout/before-step-2.webp",
            alt: "Step 2: Payment information — card fields, PayPal option, and checkout summary",
            caption: "Page 2 — Payment and summary.",
          },
          {
            img: "images/portfolio/subscription-checkout/before-step-3.webp",
            alt: "Step 3: Post-purchase password creation blocking content access",
            caption: "Page 3 — Set password before seeing any content.",
          },
        ],
        figureColumns: 3,
        figureCaption:
          "3 pages for one purchase. Each held barely one screen of content but demanded a full server round-trip — and every round-trip was a chance to lose the session.",
        diagram: {
          sectionTitle: "Version 1 vs Version 2",
          intro:
            "The screenshots above show what readers experienced. The diagram below shows what I engineered against: how many page boundaries sit between intent and payment, and what happens to state at each one. Version 1 fragments the funnel across 3 navigations with no shared context. Version 2 puts everything on one surface with a linear pill path through the same stages — and keeps client state alive the entire time.",
          beforeAfter: true,
          beforeAfterVariant: "v1v2",
          caption:
            "Structural change: 3 navigations collapse into 1 surface. A progress bar (Select Plan → Payment → Confirmation) gives readers a sense of progress without forcing page transitions.",
          diagramAlt:
            "Version 1: 3-phone fragmented checkout; Version 2: single-page desktop checkout with progress bar and shorter journey",
        },
      },
      checkoutSection: {
        title: "Version 2: Single-page checkout",
        lead: 'The first pass rewrote the architecture. We collapsed the 3-page flow into a single React-driven surface, unified 3 payment providers behind one abstraction, and wired deterministic identity resolution into the entry point. It shipped as the "Single Page Checkout" and moved digital subscriptions materially within the first month.',
        bullets: [
          "Moved member info, payment, and order summary onto a single page — eliminating two full navigations and two server round-trips. Client state now lives in one component tree instead of being serialized and hoped to survive across page loads.",
          "Built a unified payment abstraction over Braintree, Stripe, and Apple Pay. Each provider has its own tokenization flow, validation contract, and error shape; the abstraction normalizes all of that behind one interface so the checkout form doesn't care which provider is active.",
          "Arc XP's subscription API required validated member info before it would create an order. I enforced that constraint on the client by gating payment fields behind member-info validation — the fields stayed disabled until the backend confirmed the identity. Clean engineering; the payment form couldn't submit junk. Readers saw it differently, but I didn't know that yet.",
          "Added a 3-step progress bar (Select Plan → Payment → Confirmation) and a benefits sidebar. Both felt like smart additions — wayfinding for the reader, confidence for the purchase. We were proud of them.",
        ],
        flowDiagram: {
          img: "images/portfolio/subscription-checkout/checkout-flow-diagram.png",
          imgWebp:
            "images/portfolio/subscription-checkout/checkout-flow-diagram.webp",
          alt: "Checkout flow diagram: offer selection through single-page checkout, payment validation, identity resolution, confirmation, and onboarding",
          caption:
            "End-to-end path from offer selection through checkout: signed-in checks, identity resolution, payment, confirmation, and onboarding — with branches that redirect active subscribers out before they ever reach payment.",
        },
        figures: [
          {
            img: "images/portfolio/subscription-checkout/checkout-single-page-v2.png",
            imgWebp:
              "images/portfolio/subscription-checkout/checkout-single-page-v2.webp",
            alt: "Single-page checkout: member info, payment fields, order summary, and subscribe CTA all visible on one screen",
            caption:
              "V2 — member info, payment, order summary, and CTA on 1 page. The progress bar and benefits sidebar are still present.",
          },
        ],
        figureColumns: 1,
      },
      identitySection: {
        title: "Untangling identity",
        lead: "This wasn't something we could solve with screens alone — the real constraint lived entirely in the API layer. Arc XP's identity service exposed one entry for 3 states — new visitor, existing account, active subscriber — each needing a different path after lookup. Untangling that resolution order was the hardest engineering work in this project, and every other fix depended on getting it right first.",
        bullets: [
          "Built email-first resolution: the moment a reader types their email, we call Arc XP before anything else renders. One async lookup, deterministic branch — no ambiguity, no fallback guessing.",
          "Active subscriber? Checkout short-circuits immediately. The reader never sees a payment surface — they land on a status screen showing their plan, renewal date, and one clear exit back to the site. No wasted intent, no confusing 'you can't buy this' error halfway through a form.",
          "Existing account, no subscription? We redirect through authentication and back into checkout with the full cart intact — selected plan, applied promo code, form progress. The old 'user already exists' error that killed sessions is gone because the system now expects that collision instead of treating it as an exception.",
          "Brand-new email? Create the identity record inline without leaving the page. Arc XP gets the write in the background so the subscription API has a valid account ID by the time the reader reaches payment. No duplicate-account trap at submit.",
        ],
        flowDiagram: {
          lines: [
            "User enters email",
            "↓",
            "Async lookup → Arc XP",
            "↓",
            "Account exists?",
            "   → No  → Create identity inline → Continue",
            "   → Yes → Active subscription?",
            "           → Yes → Exit checkout → Status screen",
            "           → No  → Auth → Resume with cart intact",
          ],
          caption:
            "One async lookup, 3 deterministic branches. No guessing, no dead ends, no lost state.",
        },
      },
      claritySection: {
        title: "Version 3: What Clarity showed us",
        lead: "V2 worked: strong subscription lift, clean architecture, unified payments. We could have stopped. Instead I wired Microsoft Clarity into production — session replay and tap heatmaps on the exact DOM readers touched — because shipping is not the same as knowing. The friction readers hit in V2 was not a design oversight or a missing feature; it was my own engineering choices showing up as UX problems. Iterating on that evidence — progress bar, payment affordance, benefits chrome — stacked another conversion uplift on the V2 launch.",
        figureIntro:
          "The progress bar was the first thing that lit up. Aggregate taps stacked on Confirmation while the active step was still Payment — readers were treating it like tab navigation. This is the kind of bug you will never catch in a happy-path test suite; it only shows up when you overlay thousands of real sessions on the markup you shipped. Chrome Mobile (left) and Mobile Safari (right) in the same 3-day window — same page, different engines, different tap distributions. That cross-browser delta alone is why you instrument production instead of trusting a single QA device.",
        figures: [
          {
            img: "images/portfolio/subscription-checkout/clarity-mobile-stepper-tap-heatmap.png",
            imgWebp:
              "images/portfolio/subscription-checkout/clarity-mobile-stepper-tap-heatmap.webp",
            alt: "Microsoft Clarity tap heatmaps side by side: Chrome Mobile and Mobile Safari on The Dallas Morning News single-page checkout, with intense tap concentration on the Confirmation step of the progress bar while Payment is the active step",
            caption:
              "Clarity tap heatmaps on live V2 checkout — Chrome Mobile (3,848 views / 2,925 taps) vs Mobile Safari (2,591 views / 1,394 taps). Arrow highlights taps on Confirmation while readers were still on Payment.",
          },
        ],
        figureColumns: 1,
        bullets: [
          "The progress bar had to go. Users' mental model was tab navigation; our implementation was one long form with server-side ordering constraints. Those two models can't coexist. I removed it and replaced it with prominent section headers that describe the flow without implying you can jump around. The markup stopped lying about how the form works.",
          "The payment gating was harder to let go of. I had built it deliberately: Arc XP required validated member info before creating a subscription order, so I disabled payment fields until that check passed. Architecturally clean. But Clarity showed readers interpreting disabled inputs as broken UI — and abandoning. The fix: decouple presentation from validation. Payment fields render active on first paint; order creation still waits for valid member data before it fires. Same backend safety, honest frontend.",
          "Heatmaps caught one more thing: dwell time on the benefits sidebar was competing with the form at the moment of highest purchase intent. We collapsed benefits behind a toggle — trust content one tap away without pulling focus from the fields and subscribe CTA.",
          "Tightened validation end to end: specific inline messages, immediate feedback, and recovery paths — no more generic errors that force a full retry.",
        ],
        frictionCompare: {
          caption:
            "Every row traces back to session data or heatmaps — not opinion, not a redesign for the sake of it.",
          before: {
            title: "V2 (shipped)",
            items: [
              "Progress bar confused as navigation \u2014 users clicked step numbers.",
              "Payment fields disabled until email validated — readers saw 'broken', not 'waiting'.",
              "Benefits sidebar drew attention away from completing the purchase.",
            ],
          },
          after: {
            title: "V3 (evidence-driven)",
            items: [
              "No progress bar — section headers guide the flow without implying clickable steps.",
              "Payment fields active on load — backend validation decoupled from disabled UI.",
              "Benefits collapsed into toggle — available but no longer competing with the CTA.",
            ],
          },
        },
        beforeAfterDiagram: {
          subsectionTitle: "Version 2 vs Version 3",
          intro:
            "Same single-page architecture, same React component tree, same API contracts, same payment abstraction. The only diff is what Clarity proved was misleading readers: the progress bar, the disabled payment affordance, and benefits fighting the form for attention.",
          beforeAfterVariant: "v2v3",
          diagramAlt:
            "Version 2: single-page checkout with progress bar; Version 3: same surface without progress bar after Clarity-driven iteration",
          caption:
            "Apples to apples: 1 page before and after. V3 removes the progress bar, un-gates payment fields, and tucks benefits behind a toggle — each change tied to the session data above.",
        },
      },
      onboardingSection: {
        title: "Making the first week count",
        lead: "A subscription is a recurring charge. If someone forgets why they’re paying before the first renewal, they cancel. The checkout system I built knew exactly who the new subscriber was (identity resolution), what plan they picked, and what they’d seen on the way in. I piped that context into a 3-step onboarding sequence that fires the moment payment confirms — while intent is still hot.",
        stepBullets: [
          "Newsletter selection — we already know the subscriber is authenticated (identity layer), so we pre-filter the catalog to exclude newsletters they already receive. The first email they get feels personal because the system did the work, not the reader.",
          "App adoption — a direct prompt to install the mobile app with deep links to both stores. App users have significantly higher session frequency and retention; this step is the single biggest lever for reducing churn that we could influence at onboarding time.",
          "Product discovery — a curated tour of content verticals, tools, and features most subscribers don’t know exist (events, podcasts, puzzles). This anchors the perceived value of the subscription beyond just 'articles' and gives the reader reasons to come back that aren’t tied to a single news cycle.",
        ],
        figures: [
          {
            img: "images/portfolio/subscription-checkout/onboarding-step-1.png",
            imgWebp:
              "images/portfolio/subscription-checkout/onboarding-step-1.webp",
            alt: "Onboarding step one — newsletter topic selection",
            caption: "Step 1 — Pick your newsletters.",
          },
          {
            img: "images/portfolio/subscription-checkout/onboarding-step-2.png",
            imgWebp:
              "images/portfolio/subscription-checkout/onboarding-step-2.webp",
            alt: "Onboarding step two — app download and notification prompt",
            caption: "Step 2 — Get the app.",
          },
          {
            img: "images/portfolio/subscription-checkout/onboarding-step-3.png",
            imgWebp:
              "images/portfolio/subscription-checkout/onboarding-step-3.webp",
            alt: "Onboarding step three — guided product tour",
            caption: "Step 3 — Discover what's here.",
          },
        ],
        figureColumns: 3,
      },
      impactAfterV2: {
        title: "Impact after V2 launch",
        intro:
          "First month after shipping single-page checkout — headline subscription outcome from the architectural reset.",
        figureCaption:
          "Source: The Dallas Morning News employee town hall, 13 August 2025.",
        rows: [
          {
            value: "+14%",
            label: "Digital subscriptions",
          },
        ],
      },
      impactAfterV3: {
        title: "Impact after V3 iteration",
        intro:
          "After Clarity-driven fixes on the same surface: another conversion lift, plus step-level funnel analytics showing how readers moved through member info, payment, and pay flow.",
        figureCaption:
          "Source: The Dallas Morning News employee town hall, 13 August 2025.",
        rows: [
          {
            value: "+7%",
            label: "Conversion uplift (Clarity iteration)",
          },
          {
            value: "+9%",
            label: "Member information completion",
          },
          {
            value: "+22%",
            label: "Credit card / payment details completed",
          },
        ],
      },
      approachTitle: "What I learned",
      approach: [
        "This project looked like one problem and turned out to be three. Version 1 was an architecture failure — three pages meant three round-trips, zero shared client state, and an identity layer that treated every visitor the same. Version 2 solved the structure and the plumbing: single surface, unified payments, deterministic identity. The metrics confirmed it shipped clean.",
        "Version 3 was the humbling part. The progress bar I added for wayfinding was being used as navigation. The payment gating I built for backend safety was making inputs look broken. Clarity did not surface someone else’s mistakes — it surfaced mine. The takeaway is not simply “test more”; engineering decisions have UX consequences you cannot predict from code alone, and the honest way to find them is to instrument production and let real sessions push back.",
      ],
      showcase: {
        title: "The result",
        desktop: {
          img: "images/portfolio/subscription-checkout/checkout-single-page-v3.png",
          imgWebp:
            "images/portfolio/subscription-checkout/checkout-single-page-v3.webp",
          alt: "Desktop checkout: member info, payment, order summary — all on 1 page",
          caption: "Desktop — 1 page, one decision.",
        },
        mobile: [
          {
            img: "images/portfolio/subscription-checkout/checkout-mobile-form.png",
            imgWebp:
              "images/portfolio/subscription-checkout/checkout-mobile-form.webp",
            alt: "Mobile: member info and form fields",
            caption: "Everything on 1 page — no hidden steps.",
          },
          {
            img: "images/portfolio/subscription-checkout/result-mobile-summary.png",
            imgWebp:
              "images/portfolio/subscription-checkout/result-mobile-summary.webp",
            alt: "Mobile: order summary slide-over panel",
            caption: "Order summary",
          },
          {
            img: "images/portfolio/subscription-checkout/checkout-mobile-card.png",
            imgWebp:
              "images/portfolio/subscription-checkout/checkout-mobile-card.webp",
            alt: "Mobile: card payment fields",
            caption: "Card payment — Braintree and Stripe under the hood.",
          },
          {
            img: "images/portfolio/subscription-checkout/checkout-mobile-applepay.png",
            imgWebp:
              "images/portfolio/subscription-checkout/checkout-mobile-applepay.webp",
            alt: "Mobile: Apple Pay one-tap option",
            caption: "Apple Pay — one tap instead of a form",
          },
        ],
      },
    },
  },
  {
    slug: "article-page-redesign",
    portfolioGroup: "professional",
    portfolioYear: 2025,
    portfolioLabel: "Product",
    name: "Article Experience & Engagement Optimization",
    desc: "Article stack after AMP—single-column story, lazy GAM, Viafoura, paywall-aware branches, GA4 · Datadog · BlueConic instrumentation.",
    img: "images/portfolio/article-redesign/thumbnail.png",
    imgWebp: "images/portfolio/article-redesign/thumbnail.webp",
    cardImagePosition: "center 100%",
    alt: "Dallas Morning News article page — single-column reading layout",
    caseStudy: {
      eyebrow: "Product · Reader Experience · Monetization · Performance",
      featuredImg: "images/portfolio/article-redesign/featured-image.png",
      featuredImgWebp: "images/portfolio/article-redesign/featured-image.webp",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center top",
      featuredImageSource: {
        prefix: "Live article",
        href: "https://www.dallasnews.com/business/airlines/2025/10/08/staffing-shortages-cause-more-us-flight-delays-as-government-shutdown-reaches-7th-day/",
        label: "The Dallas Morning News",
      },
      task: "Senior Full Stack Engineer on the article surface — PageBuilder (React), GAM, Core Web Vitals, Viafoura commenting, paywall-aware reader flows, and GA4, Datadog, and BlueConic instrumentation — in partnership with product, design, and ads.",
      taskBodyType: true,
      disciplines: [
        "Article frontend & Arc XP PageBuilder",
        "Ads & monetization (GAM)",
        "Performance & Core Web Vitals",
        "Engagement (commenting & community)",
        "Analytics & instrumentation (GA4 · Datadog · BlueConic)",
      ],
      context: "The Dallas Morning News",
      techStack: [
        {
          label: "Arc XP",
          href: "https://www.arcpublishing.com/products/arcxp/",
        },
        {
          label: "React",
          href: "https://react.dev/",
        },
        {
          label: "JavaScript",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          label: "Google Ad Manager",
          href: "https://admanager.google.com/",
        },
        {
          label: "Viafoura",
          href: "https://www.viafoura.com/",
        },
        {
          label: "GA4",
          href: "https://support.google.com/analytics/answer/10089681",
        },
        {
          label: "Datadog",
          href: "https://www.datadoghq.com/",
        },
        {
          label: "BlueConic",
          href: "https://www.blueconic.com/",
        },
        {
          label: "GraphQL",
          href: "https://graphql.org/",
        },
      ],
      earlyImpactTitle:
        "Impact (team program — my contribution was implementation)",
      results: [
        {
          value: "-9.91%",
          label: "Fewer ads served, no revenue loss (GAM re-architecture)",
        },
        {
          value: "Improved",
          label:
            "Core Web Vitals (CLS via ad-container reservations, LCP via deferred scripts & fonts)",
        },
        {
          value: "+4.73%",
          label:
            "Reading time / +4.09% engagement time (team redesign outcome)",
        },
        {
          value: "+38%",
          label:
            "Engagement uplift — driven by commenting adoption (org reporting)",
        },
      ],
      earlyImpactCredits: [
        {
          text: "Reading-time and engagement-time metrics are from the broader redesign program. Design & UX research: ",
          externalLink: {
            href: "https://jessicachenworks.com/project/dallas-morning-news-article-redesign-2/",
            label: "Jessica Chen",
          },
          after: ".",
        },
        {
          text: "Commenting engagement uplift reflects Viafoura rollout led by: ",
          externalLink: {
            href: "https://bryanne-mcmillen.com/work/commenting-feature-launch",
            label: "Bryanne McMillen",
          },
          after: ".",
        },
      ],
      overviewTitle: "Overview",
      overview: [
        "When AMP went away, we regained full control of the article DOM — and inherited the work to make that control measurable.",
        "I rebuilt the PageBuilder surface end to end: component-based single-column layout, lazy GAM slot injection at content breakpoints, Viafoura with an Arc auth bridge and GA4 event forwarding, and reader-state branching for paywall, regiwall, and newsletter CTAs — rolled out behind feature flags from September through full deployment by year-end.",
      ],
      overviewSystemDesign: {
        sectionTitle: "Article stack",
        intro:
          "How editorial output becomes a single-column article with ads, performance guardrails, commenting, and reader-state hooks — one system, not a pile of templates.",
        diagram: [
          "Arc XP — editorial CMS & PageBuilder output",
          "↓",
          "PageBuilder frontend · React · JavaScript (layout & content blocks)",
          "↓",
          "Single-column article + GAM at defined breakpoints",
          "↓",
          "Performance (lazy load · fonts · deferred scripts · stable ad injection · CLS · video rollout)",
          "↓",
          "Viafoura commenting + reader state → regiwall / dynamic paywall · newsletter · subscription CTAs",
        ],
        caption:
          "Story column first; ads and engagement attach at intentional breakpoints; commenting and paywall-aware states sit on the same implementation surface—not a sidebar density race.",
        diagramAlt:
          "Flow from Arc XP and PageBuilder through single-column layout, GAM, performance tuning, Viafoura commenting, and dynamic-paywall-aware reader states",
      },
      problemSection: {
        title: "Problem",
        paragraphs: [
          "The old experience was sidebar-heavy: ads and modules competed with the story, Core Web Vitals were hard to defend under shifting load, and growth paths (subscribe, register, newsletter) sat outside a coherent reading line — so engagement stayed passive and iteration was slow.",
        ],
        figureCaption:
          "2 comparisons: representative production pages, then Arc XP PageBuilder templates — same before/after story at different levels of fidelity.",
        beforeAfterCompare: {
          diagramAlt:
            "Before and after: legacy sidebar article layout versus redesigned single-column article, shown as production screenshots and as PageBuilder templates.",
          rows: [
            {
              rowTitle: "Production article (representative)",
              beforeTitle: "Before",
              afterTitle: "After",
              before: {
                img: "images/portfolio/article-redesign/figure-legacy-article.png",
                imgWebp:
                  "images/portfolio/article-redesign/figure-legacy-article.webp",
                alt: "Legacy Dallas Morning News article layout with sidebar — ads and recirculation beside the story.",
                caption:
                  "Sidebar-heavy layout: modules and ads compete with the article column for attention.",
              },
              after: {
                img: "images/portfolio/article-redesign/figure-new-article.png",
                imgWebp:
                  "images/portfolio/article-redesign/figure-new-article.webp",
                alt: "Redesigned DMN article — single-column story, ads and modules in the main reading flow.",
                caption:
                  "Content-first column: GAM and modules sit in the main flow at intentional breakpoints.",
              },
            },
            {
              rowTitle: "Arc XP PageBuilder templates",
              beforeTitle: "Before",
              afterTitle: "After",
              before: {
                img: "images/portfolio/article-redesign/template-legacy-article.png",
                imgWebp:
                  "images/portfolio/article-redesign/template-legacy-article.webp",
                alt: "Legacy DMN article template — sidebar rail with ads and recirculation beside the story column.",
                caption:
                  "Legacy template: story shares the fold with a persistent sidebar rail.",
              },
              after: {
                img: "images/portfolio/article-redesign/template-new-article.png",
                imgWebp:
                  "images/portfolio/article-redesign/template-new-article.webp",
                alt: "Redesigned DMN article template — single story column with GAM and modules in the main reading flow.",
                caption:
                  "New template: one content-first column; modules land in the story, not in a parallel rail.",
              },
            },
          ],
          caption:
            "Same structural shift in both rows — from competing sidebar to a single reading column — whether you look at shipped pages or the underlying templates.",
        },
      },
      strategyTitle: "What I built",
      strategyBullets: null,
      pillars: [
        {
          title: "Article layout & templates (Arc XP PageBuilder · React)",
          body: "Built a component-based single-column layout: text, image, embed, and ad-slot blocks composed at render time via a content-type resolver so editorial gets varied templates without one-off forks. Responsive behavior across mobile, tablet, and desktop; typography and spacing from the design system.",
        },
        {
          title: "Monetization (Google Ad Manager)",
          body: "Rewired GAM slot injection — ad units lazy-load at content breakpoints instead of eagerly filling a sidebar grid. Unified ad-request config so display, video, and high-impact formats share one component without per-placement branching. Worked with the ads team on zoning and frequency.",
        },
        {
          title: "Performance (Core Web Vitals)",
          body: "Reserved explicit dimensions for ad containers before fill to stabilize CLS; deferred non-critical scripts and subset font loads for LCP; intersection-observer–driven lazy loading for images, embeds, and GAM slots; removed heavy legacy video dependencies from the render path on 55% of pageviews.",
        },
        {
          title: "Engagement (Viafoura commenting)",
          body: "Embedded Viafoura SDK with an auth bridge to Arc XP identity so logged-in state passes through without a second login; forwarded comment events (post, reply, flag) to GA4 as custom events for engagement attribution; lazy-loaded the widget at scroll threshold to protect initial page performance.",
        },
        {
          title: "Reader state, paywall & observability",
          body: "Branching render paths for anonymous → registered → subscriber: correct paywall, regiwall, newsletter CTAs, and inline registration triggers per state. GA4 for engagement events, Datadog for errors and latency, BlueConic for reader-data enrichment. Unit and integration tests on ad-slot, reader-state, and PageBuilder rendering branches.",
        },
      ],
      approachTitle: "What I learned",
      approach: [
        "Lazy-loading the comment widget protects LCP but delays first interaction. We settled on an intersection-observer trigger near the midpoint of the article as the tradeoff. That pattern — defer cost, then measure where engagement actually starts — carried over to GAM slots and the newsletter CTA.",
        "Shipping layout, ads, commenting, and reader-state in one coordinated rollout instead of parallel tracks meant fewer integration surprises, but every feature-flag combination needed its own test matrix. Unit and integration coverage across render-branch permutations was the hardest part of the project.",
      ],
      businessOutcome:
        "One implementation surface in production, rolled out incrementally with product, design, and ads from September through full deployment by year-end.",
      showcase: {
        title: "The result",
        figureGridColumns: 3,
        mobile: [
          {
            img: "images/portfolio/article-redesign/result-mobile.png",
            imgWebp: "images/portfolio/article-redesign/result-mobile.webp",
            alt: "DMN article on a narrow mobile viewport — design-system header, serif headline and body, hero image, Subscribe in the chrome, and a sticky ad slot at the bottom.",
            caption:
              "Mobile (narrow) — single story column with clear type hierarchy; Subscribe stays in the header; monetization tucks into the flow and a dismissible bottom ad without breaking the reading line.",
          },
          {
            img: "images/portfolio/article-redesign/result-tablet.png",
            imgWebp: "images/portfolio/article-redesign/result-tablet.webp",
            alt: "DMN article at tablet width — listen/share/comments, byline, read time, hero image, and inline Marketplace module in the story column.",
            caption:
              "Tablet — same single-column story; engagement affordances (listen, share, comments) and read-time metadata; inline Marketplace/recirc module stays in the article stream, not a sidebar rail.",
          },
          {
            img: "images/portfolio/article-redesign/result-desktop.png",
            imgWebp: "images/portfolio/article-redesign/result-desktop.webp",
            alt: "DMN article on desktop — leaderboard ad, sticky header with Subscribe, centered single column, hero image, and generous margins for long-form reading.",
            caption:
              "Desktop — centered reading measure with top-of-page ad and header Subscribe; hero treatment and inline modules stay in the same content column for a calmer long-form read.",
          },
        ],
      },
      relatedProject: {
        slug: "dynamic-paywall",
        label:
          "Same reader journey: how the dynamic paywall decides when to gate the article →",
      },
    },
  },
  {
    slug: "jobthai",
    portfolioGroup: "professional",
    portfolioYear: 2019,
    portfolioLabel: "Marketplace",
    name: "JobThai",
    desc: "Thailand\u2019s national job board—Elasticsearch search, resume flows, and map-grounded filters (e.g. BTS/MRT corridors, industrial estates / นิคมอุตสาหกรรม) so listings match real commutes.",
    img: "images/portfolio/jobthai/thumbnail.png",
    imgWebp: "images/portfolio/jobthai/thumbnail.webp",
    alt: "JobThai Resume — flat illustration of a job seeker at a laptop and a recruiter with clipboard, with JobThai branding",
    link: "https://www.jobthai.com/jobsearch",
    anchorId: "portfolio-jobthai",
    caseStudy: {
      eyebrow: "Product · Marketplace",
      featuredImg: "images/portfolio/jobthai/featured-image.png",
      featuredImgWebp: "images/portfolio/jobthai/featured-image.webp",
      featuredImageAlt:
        "JobThai — job seeker and recruiter illustration with Resume branding and soft green workspace palette",
      task: "Move seekers from skimming listings to confident applications: search that surfaces the right roles under real filters, and resume tooling that strengthens each profile instead of collapsing everything into the same template.",
      disciplines: ["Search & discovery", "Recommendations", "Resume tools"],
      context:
        "JobThai — THiNKNET Co., Ltd. · national job marketplace (Thailand)",
      techStack: [
        {
          label: "THiNKNET",
          href: "https://www.thinknet.co.th/",
        },
        { label: "Laravel", href: "https://laravel.com/" },
        {
          label: "Elasticsearch",
          href: "https://www.elastic.co/elasticsearch",
        },
        {
          label: "JavaScript",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        { label: "MySQL", href: "https://www.mysql.com/" },
      ],
      overview: [
        "At national scale, the job isn’t “show more rows.” It’s whether someone can answer fast: Is this role for me? Is this employer real? Is applying worth the time? When those questions stay fuzzy, people bounce—or they blast the same generic application into the void.",
        "Search and recommendations carry the first half of that decision; resume tooling carries the second. Search has to feel fast and legible under real filters (location, pay band, seniority). Resumes need guardrails so people finish, but not so much rigidity that every profile reads like the same template.",
        "In Thailand, “where?” rarely means a single city string — commuters care about BTS/MRT corridors, and manufacturing and logistics roles cluster near industrial estates (นิคมอุตสาหกรรม).",
        "JobThai drew on THiNKNET\u2019s map and POI layer so seekers could discover roles by geography the way they plan a commute, not only by typing a province name.",
        "I worked across that full arc — Elasticsearch-backed discovery, Laravel/MySQL-backed flows, and front-end surfaces in JavaScript — so browsing, targeted search, and apply-prep (resume, alerts) each had the right density of controls under one coherent system.",
      ],
      strategyTitle: "What I focused on",
      strategyIntro:
        "Three product bets, expressed as journeys: make fit legible early, keep momentum from interest to an application-ready profile, and surface trust signals employers and seekers both lean on.",
      pillars: [
        {
          title: "Clarity of fit",
          body: "Salary, seniority, and geography moved earlier in the path—including map-grounded location so a role\u2019s “near BTS,” “along this corridor,” or “industrial estate / นิคม” reads as concretely as pay band, not a vague address line.",
        },
        {
          title: "Momentum",
          body: "Saved searches, alerts, and resume checkpoints were chained so “I like this” didn’t dead-end—the next obvious step was always one lightweight action away, especially on mobile.",
        },
        {
          title: "Credibility",
          body: "Posting freshness, verification cues, and human-readable requirements were treated as first-class UI—not fine print—so the same screen that sells the role also answers “why should I trust this?”",
        },
      ],
      approachTitle: "How it went to production",
      approach: [
        "Search refinement shipped as explainable filters: seekers could tighten results without guessing what the backend was doing. Elasticsearch work sat behind that — tuning relevance and query behavior so the experience felt obvious on the surface even when the ranking logic underneath was opaque.",
        "Resume guidance shipped as progressive checkpoints rather than a single wall of fields—enough structure to increase completion, enough flexibility that profiles still sounded like people.",
        "Funnel instrumentation split mobile vs desktop and new vs returning cohorts; we chased the worst drop-offs first instead of polishing screens nobody reached.",
      ],
      results: null,
    },
  },
  {
    slug: "map-magic",
    portfolioGroup: "professional",
    portfolioYear: 2018,
    portfolioLabel: "Platform",
    name: "MapMagic",
    desc: "Thailand map infrastructure I helped build—REST map APIs, custom tiles and POI, field Android capture, and routing that survives real Bangkok traffic, not demo coordinates.",
    img: "images/portfolio/map-magic/thumbnail.png",
    imgWebp: "images/portfolio/map-magic/thumbnail.webp",
    alt: "Isometric mapping toolkit on orange — laptop, phone with city pins, world-map screen, 360 street-view car, connected nodes and logo on tiered blocks",
    link: "https://maps.thinknet.co.th/th",
    caseStudy: {
      eyebrow: "Platform · Geospatial",
      featuredImg: "images/portfolio/map-magic/featured-image.png",
      featuredImgWebp: "images/portfolio/map-magic/featured-image.webp",
      featuredImageAlt:
        "MapMagic app promo — logo above two phones: map list (Silom Complex) and satellite view over an aerial golden-hour city; orange location pin focal point",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Turn OpenStreetMap from a respectable starting line into a Thailand-native map platform: proprietary tiles and POI, dependable REST APIs for partners and first-party Android, internal capture/QA loops that fed production indexes, and routing that respected our graph and cost models—not whatever a generic global router imagines a soi should do.",
      disciplines: [
        "Map platform & APIs",
        "Routing & graph",
        "Field + back-office ops",
        "Geospatial UX",
      ],
      context: "THiNKNET Co., Ltd. · MapMagic (consumer brand: THiNKNET Maps)",
      techStack: [
        {
          label: "THiNKNET",
          href: "https://www.thinknet.co.th/",
        },
        {
          label: "THiNKNET Maps",
          href: "https://maps.thinknet.co.th/th",
        },
        {
          label: "OpenStreetMap",
          href: "https://wiki.openstreetmap.org/wiki/About_OpenStreetMap",
        },
        {
          label: "JOSM",
          href: "https://josm.openstreetmap.de/",
        },
        {
          label: "Map APIs, tiles, routing & geocoding",
          href: "https://en.wikipedia.org/wiki/Tiled_web_map",
        },
      ],
      overview: [
        "At THiNKNET the product line was MapMagic; today most people meet it as THiNKNET Maps in the browser. We started from OpenStreetMap because it gave us a credible geography to argue with—but Thailand is not a tutorial bbox. Heat, traffic, patchy mobile signal, and Thai addressing habits will embarrass lazy tiles, lazy POIs, and lazy routing faster than any QA script. The work was never “skin OSM”; it was building the proprietary layer—tiles, POI depth, capture tooling, and a router that understood our graph—so the map felt local when it mattered.",
        {
          text: "That stack quietly props up everyday products: map-grounded job search on JobThai, travel and editorial lines such as ",
          externalLink: {
            href: "https://www.naiin.com/search-result?title=THiNKNET",
            label:
              "printed THiNKNET guidebooks, highway atlases, and road maps",
          },
          after:
            "—still the kind of highway-first print drivers trust—plus other digital surfaces that reuse the same tiles, search, and routing muscle.",
        },
        "HotelGuide Thailand was one hospitality front built on the same footprint. The standalone app is retired, but the infrastructure underneath—tiles, POI, routing, APIs—did not retire with it; it still feeds THiNKNET\u2019s live map portfolio.",
        {
          text: "The public map most people open today is ",
          externalLink: {
            href: "https://maps.thinknet.co.th/th",
            label: "THiNKNET Maps",
          },
          after:
            ", where you can swap basemap moods without swapping the road network underneath.",
        },
        {
          figureBlock: {
            img: "images/portfolio/map-magic/thinknet-maps-basemap-styles.png",
            imgWebp:
              "images/portfolio/map-magic/thinknet-maps-basemap-styles.webp",
            alt: "Examples of THiNKNET Maps basemap styles over the same Thailand viewport (e.g. Ivory, Hybrid, Charcoal, Cha Thai, Terrain, Cloudy)—illustrative, not a complete catalog.",
            caption:
              "Sample basemaps on THiNKNET Maps—same view, different styles; more options exist beyond this strip.",
          },
        },
        {
          text: "",
          externalLink: {
            href: "https://apkpure.com/mapmagic/com.thinknet.mapmagicgl",
            label: "The Map Magic Android client",
          },
          after: " was how we carried the map into the field—capture, lists, and detail screens on that familiar orange UI, all backed by the same APIs and database the desk-side tooling guarded.",
        },
        "My footprint was deliberately split: I owned the map API surface partners and the Android client actually called—REST contracts, tiles, search and geocoding, embed patterns that did not snap when data churned. I built the web and mobile back-office loops that moved field capture and QA into production tiles and search indexes. And I put serious time into the routing stack—graph usage, cost models, and algorithm behavior on OSM-derived geometry edited for Thailand—so previews and turn-by-turn did not fantasize turns the asphalt would refuse.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "Two audiences, one database. Partners wanted map capabilities that felt boring in the best way—predictable REST, embeddings that did not rot when tiles revved, errors a human could action from a log. Ops wanted to move geometry and POIs from motorcycles and desk QA into production without playing telephone. OpenStreetMap bought us honesty on day one; the craft was everything we layered on top. Routing sat in the uncomfortable center—bad graph math does not hide behind copywriting, it shows up as a nonsense turn someone tries to drive.",
      pillars: [
        {
          title: "Data & operations",
          body: "I built the web and mobile flows that let teams capture in the field, review with a straight face, and publish into our database—THiNKNET-owned fields and QA gates, not a naive OSM import. When a bike or van was the wrong tool, we still edited the network in JOSM and ArcGIS Editor so geometry and connectivity were right before tiles and routing ate the change.",
        },
        {
          title: "Routing you can trust",
          body: "I contributed to the routing stack so paths honored our road graph and cost models—fewer fairy-tale detours or impossible maneuvers where Thai topology punishes generic global routers. The win was not a slick demo line; it was a preview you would actually follow.",
        },
        {
          title: "Platform ergonomics",
          body: "I tightened API vocabulary, error shapes, and examples so integrations failed in legible ways, and kept map UI patterns readable on a phone in glare—not a lab screenshot with perfect signal.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "Shipped hardened REST contracts, embedding patterns, rate limits, and attribution so partner embeds and first-party Android stayed upright when POIs and tiles moved underneath.",
        "Delivered back-office web and mobile capture/QA that fed production tiles and search indexes—field reality in, curated data out.",
        "Iterated routing graph usage and algorithm behavior on OSM-derived geometry with our cost models and Thailand-specific graph edits, plus docs and guardrails so new basemap skins did not quietly desync overlays.",
      ],
      galleryBlock: {
        title: "MapMagic Android — sign-in, discovery, field capture",
        figureColumns: 3,
        images: [
          {
            img: "images/portfolio/map-magic/mapmagic-android-login.png",
            imgWebp: "images/portfolio/map-magic/mapmagic-android-login.webp",
            alt: "MapMagic Android — login screen: orange and black mapmagic wordmark, username and password fields, orange LOGIN button, forgot password and create account links.",
            caption:
              "Operator entry point — branded sign-in for the same Android client used in the field.",
          },
          {
            img: "images/portfolio/map-magic/mapmagic-android-silom-map-list.png",
            imgWebp:
              "images/portfolio/map-magic/mapmagic-android-silom-map-list.webp",
            alt: "MapMagic Android — split view: street map of Bangkok Silom with orange POI pins and blue user location dot; scrollable list below showing Thai place names and “Found 140 locations.”",
            caption:
              "Map-backed discovery — Silom area with pins synced to a counted result list (Thai UI).",
          },
          {
            img: "images/portfolio/map-magic/mapmagic-android-detail-capture.png",
            imgWebp:
              "images/portfolio/map-magic/mapmagic-android-detail-capture.webp",
            alt: "MapMagic Android — Detail screen: map with orange pin over Soi Silom area, photo thumbnail of an industrial building, Name field filled with Thai text “โรงงาน” (factory), Save action.",
            caption:
              "Field-style capture — pin on map, on-site photo, and localized naming before save (Thai labels).",
          },
        ],
        caption:
          "2018-era MapMagic Android—the pocket half of the same stack (REST, tiles, routing) that desk-side QC guarded. Legacy web back-office UIs from that period are not pictured here.",
      },
      results: null,
    },
  },
  {
    slug: "industrial-logistics-evaluation",
    portfolioGroup: "research",
    portfolioYear: 2016,
    portfolioLabel: "Paper",
    anchorId: "portfolio-logistics",
    name: "Industrial Logistic Performance Evaluation",
    desc: "IEOM 2016 — logistics performance at a Thai printing & packaging firm via the World Bank LPI: tie national scores to the warehouse and loading dock, benchmark peers, propose improvements.",
    img: "images/portfolio/industrial-logistics-evaluation/thumbnail.jpg",
    imgWebp: "images/portfolio/industrial-logistics-evaluation/thumbnail.webp",
    alt: "Diagram — supply chain service delivery: policy inputs (customs, infrastructure, service quality) and performance outcomes (timeliness, international shipments, tracking)",
    link: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
    caseStudy: {
      eyebrow: "Research · Logistics · IEOM 2016",
      featuredImg:
        "images/portfolio/industrial-logistics-evaluation/featured-image.jpg",
      featuredImgWebp:
        "images/portfolio/industrial-logistics-evaluation/featured-image.webp",
      featuredImageAlt:
        "LPI radar chart — Thailand, Singapore, and Malaysia 2014 compared on timeliness, customs, international shipments, and logistics competence; Thailand map and forklift illustration",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Evaluate logistics performance at a printing and packaging company in Thailand — map the operation against World Bank LPI dimensions, quantify where cost, lead time, and service reliability break down, and frame actionable improvement paths.",
      disciplines: [
        "Operations research",
        "LPI benchmarking",
        "Case study methodology",
      ],
      context: "IEOM 2016 · Academic research (Thailand)",
      techStack: [
        {
          label: "MATLAB",
          href: "https://www.mathworks.com/products/matlab.html",
        },
        {
          label: "C",
          href: "https://en.wikipedia.org/wiki/C_(programming_language)",
        },
        {
          label: "World Bank LPI",
          href: "https://lpi.worldbank.org/",
        },
        {
          label: "Thailand ILPI (DOL handbook)",
          href: "https://dol.dip.go.th/uploadcontent/DOL/Pert/ILPI_Handbook_2560.pdf",
        },
        {
          label: "IEOM proceedings",
          href: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
        },
      ],
      overviewTitle: "Overview",
      overview: [
        "Printing and packaging sits where make-to-order pressure, material handling, and outbound distribution meet. “Logistics performance” is never one headline number—it depends which LPI dimensions you measure and whether you stay at national averages or walk the shop floor.",
        "This paper applies the World Bank LPI framework to one Thai company and asks: which dimensions (timeliness, customs, infrastructure, service quality, tracking, international shipments) actually constrain this business, and what does the gap between Thailand’s national LPI score and shop-floor reality look like?",
        {
          text: "Full paper (IEOM 2016 proceedings): ",
          externalLink: {
            href: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
            label:
              "Industrial Logistic Performance Evaluation | A Case of Printing and Packaging Company in Thailand (PDF)",
          },
          after: "",
        },
      ],
      strategyTitle: "What I evaluated",
      pillars: [
        {
          title: "LPI dimension mapping",
          body: "Mapped the six World Bank LPI dimensions to specific operational touch-points inside the company — receiving, warehousing, production scheduling, and outbound shipping — so each score connects to an observable process, not an abstract national average.",
        },
        {
          title: "Gap analysis",
          body: "Compared the company’s performance against Thailand’s 2014 LPI scores and regional peers (Singapore, Malaysia) to identify where domestic infrastructure, customs friction, and internal process gaps compound.",
        },
        {
          title: "Improvement framing",
          body: "Closed with concrete recommendations: which dimensions the company can influence directly (warehouse throughput, tracking), which require policy or infrastructure change, and where the biggest cost-to-improvement leverage sits.",
        },
      ],
      approachTitle: "How I approached it",
      approach: [
        "I used a structured case-study methodology: site observation, operational data, and stakeholder interviews to ground the LPI scores in what actually happens on the warehouse floor and the loading dock.",
        "I kept the paper readable across audiences — operations managers, logistics academics, and Thai industrial SME stakeholders — with explicit assumptions and data tables rather than opaque scoring.",
      ],
      results: null,
    },
  },
  // {
  //   slug: "squeeze-it",
  //   portfolioGroup: "research",
  //   portfolioYear: 2014,
  //   portfolioLabel: "Academic",
  //   name: "Squeeze It",
  //   desc: "Heuristic-search AI for a marble puzzle—D3 board you can read, agent whose reasoning stays visible.",
  //   img: "images/portfolio/squeeze-it.jpg",
  //   alt: "Squeeze It",
  //   link: "https://github.com/Bellypoly/AI-project1",
  //   caseStudy: {
  //     eyebrow: "AI · Visualization",
  //     task: "Ship a marble puzzle people can parse move-by-move, and an AI opponent steered by legible heuristics—not an opaque win/loss score.",
  //     disciplines: ["Heuristic search", "D3.js", "Game UX"],
  //     context: "Academic AI project",
  //     techStack: [
  //       {
  //         label: "JavaScript",
  //         href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  //       },
  //       { label: "D3.js", href: "https://d3js.org/" },
  //       {
  //         label: "Heuristic search",
  //         href: "https://en.wikipedia.org/wiki/Heuristic_search",
  //       },
  //     ],
  //     overview: [
  //       "Even a compact game board fails if motion is ambiguous: readers should see the last move, the next options, and why the bot leaned one way. I treated clarity as the product—not chrome around a solver.",
  //       "D3.js carried transitions and stable geometry so the puzzle felt like software someone would demo, not a Matlab plot with buttons.",
  //     ],
  //     strategyTitle: "What I did",
  //     strategyIntro:
  //       "My role: build the full-stack academic project—D3.js game UI plus a heuristic search agent with legible reasoning. I designed for two audiences: players who want a tight loop, and reviewers who need to see why the AI moved.",
  //     pillars: [
  //       {
  //         title: "Explainable play",
  //         body: "I surfaced heuristic cues that steer search—players can disagree, but they’re never mystified.",
  //       },
  //       {
  //         title: "Performance where it matters",
  //         body: "I tuned search depth against frame time so the UI stayed responsive.",
  //       },
  //       {
  //         title: "Joyful feedback",
  //         body: "I used motion and timing (color, transitions) to celebrate good moves without noise.",
  //       },
  //     ],
  //     approachTitle: "How I shipped it",
  //     approach: [
  //       "I implemented the heuristic search core with tunable weights and a replay timeline for interesting branches.",
  //       "I built D3-driven board updates with layout that stayed stable across viewport changes.",
  //     ],
  //     results: null,
  //   },
  // },
  {
    slug: "rdfd",
    portfolioGroup: "research",
    portfolioYear: 2020,
    portfolioLabel: "Thesis",
    name: "RDFD — Discovering Fake Drivers",
    desc: "ML proof-of-concept: inferring shared or spoofed driver accounts from how people actually drive over time—not a single login check.",
    img: "images/portfolio/rdfd/thumbnail.jpg",
    imgWebp: "images/portfolio/rdfd/thumbnail.webp",
    alt: "Illustration — driver at the wheel with temporal data charts and magnifying glass over trend lines",
    link: "https://github.com/Bellypoly/Discovering-Fake-Drivers-Based-on-Temporal-Driving-Behaviors",
    caseStudy: {
      eyebrow: "Research · Machine learning",
      featuredImg: "images/portfolio/rdfd/featured-image.jpg",
      featuredImgWebp: "images/portfolio/rdfd/featured-image.webp",
      featuredImageAlt:
        "Illustration — driver at the wheel with phone and watch maps, dashboard trend lines under a magnifying glass, and alert monitoring",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Explore whether temporal driving behavior can expose impersonation or credential sharing—without relying only on one-off login signals.",
      disciplines: [
        "ML modeling",
        "Time-series analysis",
        "Driver verification",
      ],
      context: "Research / proof of concept",
      techStack: [
        { label: "Python", href: "https://www.python.org/" },
        {
          label: "Machine learning",
          href: "https://en.wikipedia.org/wiki/Machine_learning",
        },
        {
          label: "Time-series pipeline",
          href: "https://en.wikipedia.org/wiki/Time_series",
        },
      ],
      overview: [
        "Trip logs are messy: the same commuter and an impostor can share a corridor, so naive averages lie. The question is whether temporal behavior leaves a stable fingerprint for the enrolled driver—and breaks when credentials are borrowed.",
        "I biased the work toward interpretable features and conservative evaluation so product and safety reviewers could argue about failure modes, not chase leaderboard accuracy alone.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role: own temporal feature design, evaluation framing, and the proof-of-concept ML pipeline for driver verification. Before modeling, I clarified what “fake” means in production: shared accounts, borrowed credentials, and scripted fraud can look different from random mistakes. I focused the plan on separability over time and calm false-positive rates.",
      pillars: [
        {
          title: "Signal quality",
          body: "I defined behavior features that capture habit—not just speed averages, but rhythm, hesitation, and consistency across segments.",
        },
        {
          title: "Evaluation rigor",
          body: "I designed stress tests across drivers, vehicles, and cities so the model couldn’t only work on tidy lab routes.",
        },
        {
          title: "Operational safety",
          body: "I specified bias checks and conservative thresholds so verification supports humans rather than punishing edge cases.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "I built a pipeline from trip segments to temporal representations, paired with classifiers and ranking strategies suited to sparse labels.",
        "I ran iteration loops with error analysis—when the model misfired, I traced failures to route context, sensor gaps, or label ambiguity.",
      ],
      results: [
        { value: "Temporal", label: "Behavior-first signal" },
        { value: "Rigorous", label: "Evaluation framing" },
        { value: "Open", label: "Research artifacts" },
      ],
    },
  },
  {
    slug: "parliament-watch-ocr",
    portfolioGroup: "professional",
    portfolioYear: 2024,
    portfolioLabel: "Civic tech",
    name: "Parliament Watch — Thai Voting Record OCR",
    desc: "Parliament Watch OCR—from scanned House voting PDFs (Thai script & numerals, handwriting, messy tables) to rows WeVis could chart.",
    cardImagePosition: "center 71%",
    img: "images/portfolio/parliament-watch-ocr/thumbnail.png",
    imgWebp: "images/portfolio/parliament-watch-ocr/thumbnail.webp",
    alt: "WeVis Election 69 — party unity voting chart for Thailand\u2019s 26th House of Representatives (2566\u20132568)",
    link: "https://wevis.info/partyunityvisual/",
    caseStudy: {
      eyebrow: "Civic Tech · OCR · Open Data",
      featuredImg: "images/portfolio/parliament-watch-ocr/featured-image.png",
      featuredImgWebp:
        "images/portfolio/parliament-watch-ocr/featured-image.webp",
      featuredImageAlt:
        "WeVis Parliament Watch — eight Thai party-style logos in two rows, linked by thin white network lines, on a soft blurred bookshelf background; includes Move Forward, Pheu Thai, and related civic-party marks",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Build an OCR pipeline to extract structured voting data from Thai parliament PDF documents — scanned government templates with Thai numerals, handwriting, mixed table layouts, and embedded images — so downstream visualizations and analysis could run on clean, machine-readable records.",
      disciplines: ["Document OCR", "Data engineering", "Civic technology"],
      context: "WeVis / Parliament Watch (open-source civic tech, Thailand)",
      techStack: [
        {
          label: "Python",
          href: "https://www.python.org/",
        },
        {
          label: "OCR",
          href: "https://en.wikipedia.org/wiki/Optical_character_recognition",
        },
        {
          label: "WeVis / Parliament Watch",
          href: "https://parliamentwatch.wevis.info",
        },
        {
          label: "Open Data (CC BY-NC 4.0)",
          href: "https://creativecommons.org/licenses/by-nc/4.0/",
        },
      ],
      overviewTitle: "Overview",
      overview: [
        "Thailand\u2019s House of Representatives publishes voting records as PDFs on msbis.parliament.go.th—not spreadsheets. They are scans: government templates, Thai text and numerals, handwriting, photos, stamps, and tables that shift shape between sessions.",
        "Parliament Watch (WeVis) needed those pages as rows—fuel for charts like Party Unity, mapping seven major parties across 107 motions in the 26th House. I owned extraction: from PDF pixels to validated tables analysts and front-end engineers could trust.",
        {
          text: "Live visualization: ",
          externalLink: {
            href: "https://wevis.info/partyunityvisual/",
            label: "Party Unity Visual (WeVis)",
          },
          after: "",
        },
        {
          text: "Structured output (open data): ",
          externalLink: {
            href: "https://docs.google.com/spreadsheets/d/1HxHsCAc_2j-nHvmLx_XF5Je49gidRRoRtJ7NwCNURpA/edit?gid=706401250#gid=706401250",
            label: "Vote26 Data — per-party voting records (Google Sheets)",
          },
          after:
            " \u2014 the tabular dataset my OCR pipeline produced from scanned parliament PDFs, used directly by the visualization and analysis teams.",
        },
      ],
      strategyTitle: "What I built",
      pillars: [
        {
          title: "Thai-language OCR pipeline",
          body: "Handled Thai script, Thai numerals (\u0E50\u2013\u0E59), and mixed Thai/Arabic number formats that standard OCR engines misclassify or skip entirely.",
        },
        {
          title: "Layout-aware extraction",
          body: "Parsed scanned government templates where table structures, column alignment, and cell boundaries vary across sessions \u2014 some pages include handwritten marks, stamps, or embedded photographs that break naive grid detection.",
        },
        {
          title: "Validation and downstream handoff",
          body: "Output clean, structured records (per-MP vote, per-motion) that Parliament Watch consumed directly for front-end rendering and open data export \u2014 no manual correction step.",
        },
      ],
      approachTitle: "How I approached it",
      approach: [
        "I treated each PDF page as an image-first problem: detect table regions, segment cells, then run OCR per cell rather than full-page text extraction. This handled the inconsistent layouts and inline noise (stamps, handwriting) much better than document-level OCR.",
        "I built validation checks against known MP rosters and motion counts so extraction errors surfaced immediately rather than propagating silently into the visualization layer.",
      ],
      results: null,
    },
  },
  {
    slug: "vote62-ect-report-69",
    portfolioGroup: "professional",
    portfolioYear: 2026,
    portfolioLabel: "Civic tech",
    name: "VOTE62 — ECT Report 69: OCR, ETL & open election data",
    desc: "VOTE62 — 400 Thai constituencies rebuilt from ECT tally PDFs into validated tables so civic tech and newsrooms run on structure, not hand-typed cells.",
    img: "images/portfolio/vote62-ect-report-69/thumbnail.png",
    imgWebp: "images/portfolio/vote62-ect-report-69/thumbnail.webp",
    cardImagePosition: "center center",
    alt: "VOTE62 Mission Gallery thumbnail: stylized tally tables and constituency-style election graphics",
    link: "https://rocketmedialab.co/database-vote62-report-69-1/",
    caseStudy: {
      eyebrow: "Civic Tech · OCR · ETL · Data Engineering · Data Storytelling",
      featuredImg: "images/portfolio/vote62-ect-report-69/featured-image.png",
      featuredImgWebp:
        "images/portfolio/vote62-ect-report-69/featured-image.webp",
      featuredImageAlt:
        "Stacks of Thai election tally forms with handwritten edits \u2014 the paper truth voters see before it becomes rows in an open dataset.",
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "ECT Report 69 is where the public sees the count—but not in a form spreadsheets or databases can ingest. I owned the pipeline that turns those official returns into structured, auditable datasets: layout-aware OCR, Thai/Arabic numeral normalization, hard checks on totals, and a release path where humans only touch rows that validation actually flags.",
      disciplines: [
        "OCR & document parsing",
        "Data engineering & ETL",
        "Data validation",
        "Data storytelling",
      ],
      context: "VOTE62 — OpenDream × iLaw × Rocket Media Lab",
      techStack: [
        { label: "Python", href: "https://www.python.org/" },
        {
          label: "OCR",
          href: "https://en.wikipedia.org/wiki/Optical_character_recognition",
        },
        {
          label: "ECT Report 69",
          href: "https://ectreport69.ect.go.th/",
        },
        {
          label: "Rocket Media Lab — VOTE62",
          href: "https://rocketmedialab.co/tag/vote62/",
        },
      ],
      results: [
        { value: "400", label: "Constituencies processed end-to-end" },
        {
          value: "0 manual entry",
          label:
            "No wholesale retyping of the corpus—operators step in only where validation flags a suspect cell before publish",
        },
        {
          value: "Validated",
          label: "Hard checks run before anything is published as open data",
        },
      ],
      overviewTitle: "When the official release is only paper on a screen",
      overview: [
        "Thailand\u2019s Election Commission (ECT) publishes returns you can read on paper or on screen—but those releases are fixed-layout PDFs. They are authoritative, yet they are not a database: there are no companion tables, no stable schema, no API for the same numbers living inside the scan.",
        "That split creates real pressure. Newsrooms need trustworthy tables under deadline. Civic open-data projects need the same figures in a joinable format for charts, joins, and audits. Until someone reconstructs the grids, everyone is stuck retyping—or shipping charts built on fragile copy-paste. VOTE62 exists to close that gap as a coalition effort.",
        {
          mediaBlock: {
            type: "image",
            src: "images/portfolio/vote62-ect-report-69/problem-evidence.png",
            imgWebp:
              "images/portfolio/vote62-ect-report-69/problem-evidence.webp",
            alt: "Side-by-side scans of two Thai election return forms (ส.ส. 5/18): same official layout, different handwriting styles in the vote columns — illustrating real-world variability for OCR.",
            caption:
              "Same official template, different handwriting and corrections in the wild—the kind of noise that breaks naive extraction.",
          },
        },
        "Across 400 constituencies I built the reconstruction path: detect layout first, OCR cells in context (never a single naive text dump), then validation aggressive enough that bad numbers surface before they become someone else\u2019s \u201cground truth.\u201d The gallery further down compresses that arc—paper chaos, extractor logs with warnings, reviewer-ready tables—in three lightbox panels.",
        "The product goal I pushed for was never pretend-perfect OCR. It was to make uncertainty legible—so a chart or an open dataset does not silently inherit a cell that never matched the official scan.",
      ],
      strategyTitle: "What the pipeline had to get right",
      strategyIntro:
        "VOTE62 is bigger than one pipeline: partners shape how the story is told and how data reaches people. My contribution sat in the ingestion layer—Python, OCR, table reconstruction, validation, and rerunnable jobs—so the coalition could trust the rows underneath the headlines and spreadsheets.",
      pillars: [
        {
          title: "Layout-aware extraction",
          body: "Government templates repeat, but scans do not: stamps, handwriting, and crooked grids punish document-level OCR. I segmented regions and read cells in context so numbers stayed tied to the headers they belonged to.",
        },
        {
          title: "Numeral normalization",
          body: "Official rows mix Thai (๐–๙) and Arabic (0–9) digits in the same table. I mapped both to one canonical representation for arithmetic and joins—while still preserving ambiguity when the read was not safe to force.",
        },
        {
          title: "Ambiguity detection",
          body: "I treated totals, cross-checks, and low-confidence reads as first-class outputs: mismatches and suspicious tokens surface upstream instead of vanishing into a \u201cclean\u201d CSV.",
        },
        {
          title: "Re-runnable architecture",
          body: "Returns trickle out and PDFs get revised. I designed the job to rerun incrementally so refreshed official pages did not mean rebuilding every constituency from scratch.",
        },
      ],
      strategyAppend: [
        {
          referenceTable: {
            transpose: true,
            rows: [
              ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
              ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"],
            ],
            caption:
              "Same value, two glyph systems: Western Arabic (top row) and Thai numerals (ตัวเลขไทย, bottom). ECT scans mix them in one run; the pipeline normalizes for math and joins while validation still protects ambiguous reads from being overwritten quietly.",
          },
        },
      ],
      approachTitle: "Trust beats a clean-looking lie",
      approach: [
        "I insisted validation be allowed to say \u201cno\u201d: totals that do not add up, candidate rows that disagree with ballot counts, and tokens that are not plausible digits stay visible as warnings—not auto-smoothed into a tidy fiction.",
        "I wired provenance so every structured value keeps a path back to the PDF region it came from—so a skeptic with the official scan and the spreadsheet can answer the same question: where did this number appear?",
        "That is the contribution I cared about shipping: transparency over vanity metrics—a dataset that shows where the machine is confident, where it is guessing, and where a human still has to intervene after validation.",
      ],
      mediaBlock: {
        type: "ascii",
        lines: [
          "PDF ingest → OCR → table rebuild → validate → structured dataset",
        ],
      },
      galleryBlock: {
        title: "Messy human input → OCR output → validated output",
        figureColumns: 3,
        images: [
          {
            img: "images/portfolio/vote62-ect-report-69/ocr-failure-example.png",
            imgWebp:
              "images/portfolio/vote62-ect-report-69/ocr-failure-example.webp",
            alt: "Messy human input: ECT return with handwritten ballot summaries and strike-through corrections (e.g. digits overwritten on printed totals) plus a candidate table filled in ink over dotted guides",
            caption:
              "Messy human input — ink corrections, thick digits, and cursive Thai tallies on the official grid.",
          },
          {
            img: "images/portfolio/vote62-ect-report-69/raw-ocr-output.png",
            imgWebp:
              "images/portfolio/vote62-ect-report-69/raw-ocr-output.webp",
            alt: "OCR output: terminal log from extract_ect_report.py—extracted turnout and candidate rows with mixed Thai/Arabic numerals, suspected bad tokens, and validation warnings",
            caption:
              "OCR output — structured logs with mixed numerals, bad tokens, and validation warnings.",
          },
          {
            img: "images/portfolio/vote62-ect-report-69/clean-structured-table.png",
            imgWebp:
              "images/portfolio/vote62-ect-report-69/clean-structured-table.webp",
            alt: "Validated output: monospaced tables and checks—aligned fields with Arabic numerals and explicit warnings when totals disagree with valid ballots",
            caption:
              "Validated output — aligned tables with explicit checks before open data.",
          },
        ],
        caption:
          "Same story in three frames: what officials and voters put on paper, what the extractor prints before anyone trusts it, and what validation clears for downstream open data.",
      },
      iframeEmbed: {
        src: "https://docs.google.com/spreadsheets/d/1KqmtYX6Iz0ODJpLj2cB7eW1WuoP4aL8gsj9XKV6-YQo/preview?gid=780194054",
        title: "VOTE62 — structured election dataset",
        caption:
          "Live structured turnout and tallies derived from the same official PDFs—updated when ECT publishes revisions, so downstream work stays tied to the source of truth.",
        minHeight: "580px",
      },
      businessOutcome:
        "My contribution was not a prettier spreadsheet—it was shifting labor from wholesale retyping to a pipeline where machines do the bulk extraction, validation decides what is safe to publish, and humans spend their time only on rows that checks actually flag.",
      futureBlock: {
        title: "Next steps",
        body: "Where I would push next: stronger ML table detection, richer per-cell confidence, and a review surface purpose-built for post-validation fixes—so the same transparency scales when the document mix gets harder.",
      },
      referenceSection: {
        title: "Raw sources",
        intro:
          "Official ECT return PDFs for the ส.ส. 69 count—fixed-layout scans, grouped by constituency (เขตเลือกตั้ง) in the same folder layout the commission uses when it bundles releases.",
        paragraphs: [
          {
            text: "Google Drive copy (รายงานผลการนับคะแนน สส.69): ",
            externalLink: {
              href: "https://drive.google.com/drive/folders/1MApGQ8YpAG1hVMOWqfKdfag3KLWYYWY5?usp=drive_link",
              label: "Raw PDFs by constituency",
            },
            after:
              " — useful for audit, reruns, and spot-checking against the live sheet.",
          },
        ],
      },
    },
  },
  {
    slug: "electricity-bill-breakdown",
    portfolioGroup: "professional",
    portfolioYear: 2024,
    portfolioLabel: "Civic tech",
    name: "Where Does Your Electricity Bill Go?",
    desc: "Civic explainer for Thai electricity bills—progressive flow from one honest question (“what am I paying for?”) to tariffs, Ft, and fairness.",
    img: "images/portfolio/electricity-bill-breakdown/thumbnail.png",
    imgWebp: "images/portfolio/electricity-bill-breakdown/thumbnail.webp",
    alt: "Electricity bill breakdown — black square graphic with a glowing lightning bolt, stacked electricity / bill / breakdown type, and a ring of white line-art energy icons (grid, generation, fuel, industry)",
    link: "https://electricity-bill-breakdown.justpow.co/",
    caseStudy: {
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
      overviewTitle: "Overview",
      overview: [
        "Most Thai consumers see a single total on their electricity bill. Behind it sits a layered structure — base energy charges, a variable fuel tariff (Ft), regulatory surcharges, VAT — that few people can parse without domain knowledge. This tool unpacks that structure and asks an uncomfortable civic question: is the price fair?",
        "My role was flow design and information support. I mapped the reader journey from casual curiosity through progressive disclosure of each charge component, making sure every screen earns the next rather than dumping definitions upfront. I also grounded the copy in how Thai billing and tariff mechanisms actually work, so the tool educates without hand-waving.",
        "I brought firsthand utility-system context from my time at PEA (Provincial Electricity Authority of Thailand) — outage management, billing integrations, real-time consumption dashboards — which gave me the mental model to connect what appears on a PDF bill to the engineering and regulatory reality underneath.",
      ],
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
      approachTitle: "How PEA experience shaped my contribution",
      approach: [
        "At PEA I worked on the systems that generate bills — outage tracking, consumption data pipelines, customer-facing dashboards. That gave me a practical sense of what the numbers on a bill actually represent and where the gaps between engineering data and consumer-facing language create confusion.",
        "I used that context to keep terminology consistent with what Thai consumers see on real bills while explaining the engineering levers (variable fuel components, demand charges, cross-subsidy structures) in language that doesn't require a utility background.",
      ],
      results: null,
    },
  },
  {
    slug: "pea-e-service",
    portfolioGroup: "professional",
    portfolioYear: 2019,
    portfolioLabel: "Public sector",
    name: "PEA E‑Service",
    desc: "One-stop digital front door for Thailand\u2019s Provincial Electricity Authority—outages, billing, connections—without hopping legacy silos.",
    img: "images/portfolio/coe.jpg",
    alt: "PEA E-Service",
    link: "https://peacos.pea.co.th/views/paperex/",
    anchorId: "portfolio-pea",
    caseStudy: {
      eyebrow: "Public service · UX",
      task: "Consolidate what citizens need from PEA—outage info, bills, new service—into one calm entry point: fewer duplicated forms, clearer status, fewer exits to nowhere.",
      disciplines: [
        "Service design",
        "Information architecture",
        "Accessibility",
      ],
      context: "PEA — Provincial Electricity Authority (Thailand)",
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
        "Utility portals usually accrete: every department ships a corner of the site, and citizens pay the navigation tax. The goal here was one mental model—pick your job, complete it, see what happens next—rather than mirroring the org chart.",
        "Outages, bill disputes, and new connections are high-stress; they need calm type, forms that recover from mistakes, and honest timelines—not optimistic microcopy alone.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role: contribute to IA, service patterns, and citizen-facing UX for PEA’s e‑service hub (Laravel, C#, Oracle, Selenium). I grounded the IA in workshops—frontline FAQs, call-center spikes, and digital drop-offs—so navigation reflected real tasks, not org charts.",
      pillars: [
        {
          title: "Plain language",
          body: "I wrote labels that match how people describe tasks, with secondary detail on demand.",
        },
        {
          title: "Status transparency",
          body: "I specified where a request sits in process and which documents still matter.",
        },
        {
          title: "Inclusive defaults",
          body: "I pushed large tap targets, readable type, and resilient validation so users recover quickly from errors.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "I helped ship a hub-and-spoke IA with progressive forms—only the fields each task needs.",
        "I defined patterns for alerts, receipts, and follow-ups aligned with SMS/email references citizens expect.",
      ],
      results: null,
    },
  },
];
