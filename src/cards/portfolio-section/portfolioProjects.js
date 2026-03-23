/** Mission Gallery entries (single source for cards, deep-link ids, and case studies). */

export function getPortfolioProjectBySlug(slug) {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug) ?? null;
}

export const PORTFOLIO_PROJECTS = [
  {
    slug: "sophi-paywall",
    anchorId: "portfolio",
    name: "AI-Powered Dynamic Paywall",
    desc: "ML-driven dynamic paywall balancing subscription growth against reader engagement.",
    img: "images/portfolio/ai-powered-dynamic-paywall.png",
    imgWebp: "images/portfolio/ai-powered-dynamic-paywall.webp",
    alt: "Dallas Morning News site with paywall modal and analytics chart — AI-powered dynamic paywall",
    caseStudy: {
      eyebrow: "Product · Monetization · AI",
      featuredImageCompact: true,
      /* Case-study featured image only (not gallery cards) */
      featuredImageObjectPosition: "center top",
      /* md+: vertical focal (lower % = anchor higher in frame) */
      featuredImageObjectPositionMd: "50% 12.5%",
      task: null,
      disciplines: [
        "Machine Learning paywall",
        "Analytics",
        "Frontend integration",
      ],
      context: "The Dallas Morning News",
      results: [
        { value: "+22%", label: "Conversion rate" },
        { value: "+15%", label: "Subscription starts" },
      ],
      overviewTitle: "The challenge",
      overview: [
        "Those gains came from solving a fundamental problem: static paywalls treat every reader the same. Block too early and you lose casual readers who might have converted later. Block too late and you leave revenue on the table.",
        "Making it harder was the fact that different content behaves differently — politics, crime, and restaurant coverage drive the most subscription starts, while high school sports, commentary, and business convert at the highest rates. No single rule could account for that.",
      ],
      strategyTitle: "What I built",
      strategyIntro:
        "The answer was Sophi — an AI-driven dynamic paywall that decides per-visit whether to gate, meter, or let content through, learning from every interaction. Here's how I brought it to production:",
      strategyBullets: [
        "Integrated Sophi's decisioning layer into frontend rendering and subscription flows, enabling real-time paywall responses based on user behavior and content context.",
        "Designed robust user-state handling across new visitors, returning readers, and subscribers, ensuring consistent gating logic and messaging.",
        "Established reliable analytics instrumentation to ensure accurate signal collection for model training and performance evaluation.",
        "Supported controlled rollout across content sections using feature flags and kill switches to minimize risk and maintain editorial trust.",
      ],
      pillars: null,
      systemDesign: {
        intro:
          "Those four pieces connect into a single feedback loop — every visit generates data that makes the next paywall decision smarter.",
        diagramImage: "images/portfolio/paywall-diagram.png",
        diagramImageWebp: "images/portfolio/paywall-diagram.webp",
        diagramAlt:
          "Paywall AI Decision Model flowchart: inputs, wall types (paywall, regiwall, delay, skip), conversion and engagement paths, analytics, and model optimization feedback loop",
        caption:
          "User behavior flows down, analytics flows back up — the loop never stops learning.",
      },
      approachTitle: "Key insight",
      approachIntro:
        "As the feedback loop matured, a clear pattern emerged in the data:",
      approach: [
        "Conversion performance varies dramatically by content category. High-traffic sections like politics and crime generate the most subscription starts in absolute volume — but high school sports, commentary, and business convert at significantly higher rates per reader.",
        "This meant the paywall couldn't just count pageviews. It needed to weigh user intent against content type to know when gating would actually help — and when it would just push readers away.",
      ],
      flourishEmbed: "https://flo.uri.sh/visualisation/28171634/embed",
      flourishCaption:
        "The data below shows exactly how this plays out — volume and conversion tell very different stories depending on the section.",
      businessOutcome:
        "The result is a paywall that gets smarter every day — continuously balancing subscription conversion against reader engagement, one visit at a time. The +22% conversion lift and +15% subscription growth reflect a system that learns, not just a feature that shipped.",
    },
  },
  {
    slug: "rdfd",
    name: "RDFD — Discovering Fake Drivers",
    desc: "Machine learning approach for driver identification.",
    img: "images/portfolio/rdfd.jpg",
    alt: "RDFD",
    link: "https://github.com/Bellypoly/Discovering-Fake-Drivers-Based-on-Temporal-Driving-Behaviors",
    caseStudy: {
      eyebrow: "Research · Machine learning",
      task: "Explore whether temporal driving behavior can expose impersonation or credential sharing—without relying only on one-off login signals.",
      disciplines: [
        "ML modeling",
        "Time-series analysis",
        "Driver verification",
      ],
      context: "Research / proof of concept",
      overview: [
        "Raw trip data is noisy: routes, pace, and stops all vary with traffic and intent. The problem was to turn sequences of behavior into a signal that stays stable for the real driver and drifts when someone else is behind the wheel.",
        "The approach emphasized interpretable features and robust evaluation—so outcomes could be discussed with safety stakeholders, not only accuracy on a held-out set.",
      ],
      strategyTitle: "Strategy and alignment",
      strategyIntro:
        "Before modeling, the work clarified what “fake” means in production: shared accounts, borrowed credentials, and scripted fraud can look different from random mistakes. The plan focused on separability over time and calm false-positive rates.",
      pillars: [
        {
          title: "Signal quality",
          body: "Define behavior features that capture habit—not just speed averages, but rhythm, hesitation, and consistency across segments.",
        },
        {
          title: "Evaluation rigor",
          body: "Stress tests across drivers, vehicles, and cities to avoid a model that only works on tidy lab routes.",
        },
        {
          title: "Operational safety",
          body: "Bias checks and conservative thresholds so verification supports humans rather than punishing edge cases.",
        },
      ],
      approachTitle: "What we built",
      approach: [
        "A pipeline from trip segments to temporal representations, paired with classifiers and ranking strategies suited to sparse labels.",
        "Iteration loops with error analysis: when the model misfires, trace back to route context, sensor gaps, or label ambiguity.",
      ],
      results: [
        { value: "Temporal", label: "Behavior-first signal" },
        { value: "Rigorous", label: "Evaluation framing" },
        { value: "Open", label: "Research artifacts" },
      ],
    },
  },
  {
    slug: "map-magic",
    name: "Map Magic",
    desc: "Thailand map API and integration toolkit.",
    img: "images/portfolio/mapmagic.jpg",
    alt: "MapMagic",
    link: "https://maps.thinknet.co.th/",
    caseStudy: {
      eyebrow: "Platform · Geospatial",
      task: "Give product teams dependable map primitives—search, tiles, and overlays—so maps feel native instead of bolted on.",
      disciplines: ["API design", "Geospatial UX", "Integrations"],
      context: "Public mapping toolkit",
      overview: [
        "Teams were rebuilding the same glue around basemaps, geocoding, and styling. The goal was a cohesive surface area with predictable limits, documentation, and examples that shorten time-to-first-map.",
        "Mobile-first usage meant performance and clarity matter as much as feature breadth: fewer surprises in the field beats a long menu of options.",
      ],
      strategyTitle: "Strategy and alignment",
      strategyIntro:
        "Stakeholders spanned GIS engineers, frontend teams, and partner integrations. The roadmap balanced backward compatibility with a cleaner conceptual model for new consumers.",
      pillars: [
        {
          title: "Consistency",
          body: "One vocabulary for endpoints, errors, and units—so mistakes are caught early in the IDE, not in production traffic.",
        },
        {
          title: "Progressive disclosure",
          body: "Simple examples for the common path; advanced controls available without cluttering the quickstart.",
        },
        {
          title: "Reliability",
          body: "Caching, fallbacks, and observability hooks so maps degrade gracefully instead of failing silently.",
        },
      ],
      approachTitle: "What we built",
      approach: [
        "Hardened API contracts, reference flows for embedding, and guardrails for rate limits and attribution.",
        "Design patterns for overlays and interaction states that stay legible across light/dark basemap styles.",
      ],
      results: null,
    },
  },
  {
    slug: "jobthai",
    name: "JobThai",
    desc: "Thailand job search platform — search/recommendations, resume creator.",
    img: "images/portfolio/jobthai.jpg",
    alt: "JobThai",
    link: "https://www.jobthai.com/en/resume",
    anchorId: "portfolio-jobthai",
    caseStudy: {
      eyebrow: "Product · Marketplace",
      task: "Improve how seekers discover relevant roles—and how they present themselves—without turning the experience into a factory of generic resumes.",
      disciplines: ["Search & discovery", "Recommendations", "Resume tools"],
      context: "National job marketplace",
      overview: [
        "Job search products compete on relevance, trust, and speed. Small friction in filters, dead-ends in search, or weak preview of requirements cost applications.",
        "Resume tooling sits in the same journey: the right guidance increases completion, but heavy-handed templates make everyone look the same.",
      ],
      strategyTitle: "Strategy and alignment",
      strategyIntro:
        "The work aligned three journeys: fast browsing, targeted search, and deep prep (resume, alerts). Each needed a distinct information hierarchy while sharing one design system.",
      pillars: [
        {
          title: "Clarity of fit",
          body: "Surfacing salary, location, and seniority early—so seekers don’t build hope on mismatched roles.",
        },
        {
          title: "Momentum",
          body: "Reducing steps between interest, saved searches, and application-ready profiles.",
        },
        {
          title: "Credibility",
          body: "Signals that employers and seekers recognize: verification, transparent posting freshness, and human-readable requirements.",
        },
      ],
      approachTitle: "What we shipped",
      approach: [
        "Flows that pair search refinement with explainable filters, plus resume guidance structured as checkpoints instead of a wall of fields.",
        "Instrumentation to watch drop-off by segment (mobile vs desktop, new vs returning) and iterate on the worst leaks first.",
      ],
      results: null,
    },
  },
  {
    slug: "squeeze-it",
    name: "Squeeze It",
    desc: "Heuristic search marble game AI (D3.js & ML).",
    img: "images/portfolio/squeeze-it.jpg",
    alt: "Squeeze It",
    link: "https://github.com/Bellypoly/AI-project1",
    caseStudy: {
      eyebrow: "AI · Visualization",
      task: "Build an engaging marble puzzle UI and an agent that plays with human-legible heuristics—not only a black-box score.",
      disciplines: ["Heuristic search", "D3.js", "Game UX"],
      context: "Academic AI project",
      overview: [
        "Small state spaces still deserve thoughtful UI: moves must read clearly, and the board should help players understand why the AI chose a line of play.",
        "D3.js grounded the visualization in smooth transitions and legible geometry so the game reads as a product, not a debug plot.",
      ],
      strategyTitle: "Strategy and alignment",
      strategyIntro:
        "The project paired two audiences: players who want a tight loop, and reviewers who want to see reasoning. The interface supports both without separate modes.",
      pillars: [
        {
          title: "Explainable play",
          body: "Expose the heuristic cues that steer search—players can disagree, but they’re never mystified.",
        },
        {
          title: "Performance where it matters",
          body: "Balance depth of search with frame time so interaction stays responsive.",
        },
        {
          title: "Joyful feedback",
          body: "Motion and sound-adjacent cues (color, timing) that celebrate good moves without noise.",
        },
      ],
      approachTitle: "What we built",
      approach: [
        "A heuristic search core with tunable weights and a replay timeline for interesting branches.",
        "D3-driven board updates with resilient layout when the viewport changes.",
      ],
      results: null,
    },
  },
  {
    slug: "federated-learning-energy",
    name: "Federated Learning Energy Sim",
    desc: "MATLAB simulation for energy consumption in FL with NOMA.",
    img: "images/portfolio/fl.jpg",
    alt: "Federated Learning",
    link: "https://github.com/Bellypoly/On_simulating_energy_consumption_of_federated_learning_systems",
    caseStudy: {
      eyebrow: "Research · Systems",
      task: "Simulate how federated learning workloads consume energy when non-orthogonal multiple access (NOMA) shapes the radio budget.",
      disciplines: [
        "MATLAB simulation",
        "Federated learning",
        "Wireless modeling",
      ],
      context: "Academic / systems research",
      overview: [
        "Federated learning pushes computation to the edge, but the training story is incomplete without the cost of communication. NOMA changes who interferes with whom—so energy curves are not interchangeable with vanilla orthogonality assumptions.",
        "The simulation’s value is comparative: sweep regimes, quantify tradeoffs, and make assumptions explicit for reproducibility.",
      ],
      strategyTitle: "Strategy and alignment",
      strategyIntro:
        "The model had to stay legible to wireless and ML readers alike—parameters with physical meanings, outputs that separate compute vs transmit costs.",
      pillars: [
        {
          title: "Faithful abstraction",
          body: "Encode the channel and scheduling assumptions without pretending to be a full stack simulator.",
        },
        {
          title: "Sweep-ready",
          body: "Parameter grids that highlight breakpoints: when FL round budgets dominate, when NOMA wins, and when both saturate.",
        },
        {
          title: "Open artifacts",
          body: "Scripts and figures that let others re-run and challenge the conclusions.",
        },
      ],
      approachTitle: "What we built",
      approach: [
        "MATLAB modules for client sampling, aggregation rounds, and energy accounting tied to the RF model.",
        "Plots that isolate uplink vs downlink, per-device heterogeneity, and convergence milestones.",
      ],
      results: null,
    },
  },
  {
    slug: "pea-e-service",
    name: "PEA E‑Service",
    desc: "One‑stop service for Thai Provincial Electricity Authority.",
    img: "images/portfolio/coe.jpg",
    alt: "PEA E-Service",
    link: "https://peacos.pea.co.th/views/paperex/",
    anchorId: "portfolio-pea",
    caseStudy: {
      eyebrow: "Public service · UX",
      task: "Consolidate citizen-facing tasks into one calm doorway—reducing duplication, opaque statuses, and dead ends across legacy touchpoints.",
      disciplines: [
        "Service design",
        "Information architecture",
        "Accessibility",
      ],
      context: "Provincial Electricity Authority (Thailand)",
      overview: [
        "Utility service sites often grow by accretion: each department ships a flow, and citizens shoulder the navigation tax. The objective was a single mental model: find my task, finish it, know what happens next.",
        "High-stakes moments—outages, billing disputes, new connections—need calm typography, resilient forms, and clarity on timelines.",
      ],
      strategyTitle: "Strategy and alignment",
      strategyIntro:
        "Workshops mapped frontline FAQs, call-center spikes, and the most common digital drop-offs. The IA reflects real tasks, not org charts.",
      pillars: [
        {
          title: "Plain language",
          body: "Labels that match what people say out loud, with secondary detail on demand.",
        },
        {
          title: "Status transparency",
          body: "Where a request is in process, and what documents still matter.",
        },
        {
          title: "Inclusive defaults",
          body: "Large tap targets, readable type, and resilient validation that helps users recover fast.",
        },
      ],
      approachTitle: "What we shipped",
      approach: [
        "A hub-and-spoke IA with progressive forms: capture only what’s needed for the selected task.",
        "Patterns for alerts, receipts, and follow-ups that sync with offline expectations (SMS/email references).",
      ],
      results: null,
    },
  },
];
