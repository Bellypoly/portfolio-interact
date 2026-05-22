import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const jobthaiCaseStudyVariants = Object.freeze({
  swe: Object.freeze({
    /* Header / intro */
    eyebrow: "Search & Discovery · Employment Data",
    focus: ["Search & discovery", "Application funnels", "Resume tools"],
    /* Overview */
    overview: [
      "At national scale, the job isn't “show more rows.” It's whether someone can answer fast: Is this role for me? Is this employer real? Is applying worth the time? When those questions stay fuzzy, people bounce—or apply broadly without confidence the role is actually a fit.",
      "Search and recommendations shape the first half of that decision; resume tooling shapes the second. Search has to feel fast and legible under real filters (location, pay band, seniority). Resumes need guardrails so people finish, but not so much rigidity that every profile reads like the same template.",
      "At national scale, job platforms also become labor-information systems: geography, salary visibility, and hiring patterns shape how people understand opportunity long before they submit an application.",
      "In Thailand, “where?” rarely means a single city string — commuters care about BTS (Bangkok Mass Transit System) / MRT (Metropolitan Rapid Transit) corridors, and manufacturing and logistics roles cluster near industrial estates (นิคมอุตสาหกรรม).",
      "JobThai drew on THiNKNET\u2019s map and POI layer so seekers could discover roles by geography the way they plan a commute, not only by typing a province name.",
      "I worked across that full arc — Elasticsearch-backed discovery, Laravel/MySQL-backed flows, and front-end surfaces in JavaScript — so browsing, targeted search, and apply-readiness (resume, alerts) each had the right density of controls under one coherent system.",
    ],
    /* What I focused on */
    strategyTitle: "System goals",
    pillars: [
      {
        title: "Clarity of fit",
        body: "Salary, seniority, and geography moved earlier in the path—including map-grounded location so a role\u2019s “near BTS,” “along this corridor,” or “industrial estate / นิคม” reads as concretely as pay band, not a vague address line.",
      },
      {
        title: "Momentum",
        body: "Saved searches, alerts, and resume checkpoints were chained so “I like this” didn't dead-end—the next obvious step was always one lightweight action away, especially on mobile.",
      },
      {
        title: "Credibility",
        body: "Posting freshness, verification cues, and human-readable requirements were treated as first-class UI—not fine print—so the same screen that sells the role also answers “why should I trust this?”",
      },
    ],
  }),
  "data-reporter": Object.freeze({
    eyebrow: "Product · Marketplace",
    featuredImg: "images/portfolio/jobthai/featured-image.png",
    featuredImgWebp: "images/portfolio/jobthai/featured-image.webp",
    featuredImageAlt:
      "JobThai — job seeker and recruiter illustration with Resume branding and soft green workspace palette",
    task: "Move seekers from skimming listings to confident applications: search that surfaces the right roles under real filters, and resume tooling that strengthens each profile instead of collapsing everything into the same template.",
    focus: ["Search & discovery", "Application funnels", "Resume tools"],
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
      "At national scale, the job isn’t “show more rows.” It’s whether someone can answer fast: Is this role for me? Is this employer real? Is applying worth the time? When those questions stay fuzzy, people bounce—or apply broadly without confidence the role is actually a fit.",
      "Search and discovery carry the first half of that decision; resume tooling carries the second. Search has to feel fast and legible under real filters (location, pay band, seniority). Resumes need guardrails so people finish, but not so much rigidity that every profile reads like the same template.",
      "In Thailand, “where?” rarely means a single city string — commuters care about BTS (Bangkok Mass Transit System) / MRT (Metropolitan Rapid Transit) corridors, and manufacturing and logistics roles cluster near industrial estates (นิคมอุตสาหกรรม).",
      "JobThai drew on THiNKNET’s map and POI layer so seekers could discover roles by geography the way they plan a commute, not only by typing a province name.",
      "I worked across that full arc — Elasticsearch-backed discovery, Laravel/MySQL-backed flows, and front-end surfaces in JavaScript — so browsing, targeted search, and apply-prep (resume, alerts) felt coherent instead of fragmented across separate tools.",
    ],
    strategyTitle: "Product goals",
    strategyIntro:
      "Three product goals shaped the marketplace experience: make fit legible early, keep momentum from interest to an application-ready profile, and surface trust signals employers and seekers both lean on.",
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
    results: [
      {
        value: "Thailand-scale",
        label:
          "Marketplace discovery and resume flows shaped around real commuting and hiring behavior.",
      },
      {
        value: "Map-grounded UX",
        label:
          "BTS/MRT corridors and industrial-estate geography aligned listings with real commuting behavior.",
      },
      {
        value: "Elasticsearch",
        label:
          "Explainable filtering and relevance tuning helped seekers refine results without opaque search behavior.",
      },
    ],
    resultsLabelCase: "sentence",
    footerTagline:
      "Thailand’s national job marketplace—Elasticsearch-backed discovery, resume flows, and map-grounded filters (BTS/MRT corridors, industrial estates / นิคมอุตสาหกรรม) aligned listings with real commuting behavior.",
  }),
});

export const jobthaiCaseStudyVariant =
  jobthaiCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  jobthaiCaseStudyVariants.swe;
