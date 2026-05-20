/**
 * Article experience & engagement optimization (DMN) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { articlePageRedesignCaseStudyVariant } from "./variants.js";

const baseArticlePageRedesignCaseStudy = {
  /* Header / intro */
  eyebrow: "Newsroom Systems · Reader Experience · Monetization · Performance",
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
  focus: [
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
  /* Impact */
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
      label: "Reading time / +4.09% engagement time (team redesign outcome)",
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
  /* Overview */
  overviewTitle: "Overview",
  overview: [
    "When AMP went away, we regained full control of the article DOM — and inherited the work to make that control measurable.",
    "I rebuilt the PageBuilder surface end to end: component-based single-column layout, lazy GAM slot injection at content breakpoints, Viafoura with an Arc auth bridge and GA4 event forwarding, and reader-state branching for paywall, regiwall, and newsletter CTAs — rolled out incrementally behind feature flags from September through full deployment by year-end.",
  ],
  /* Article stack */
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
  /* Problem */
  problemSection: {
    title: "Problem",
    paragraphs: [
      "The old experience was sidebar-heavy: ads and modules competed with the story, Core Web Vitals were hard to defend under shifting load, and growth paths (subscribe, register, newsletter) sat outside a coherent reading line — so engagement stayed passive and iteration was slow.",
      "The goal was not only performance improvement, but a calmer reading surface where long-form stories, visual reporting, and civic explainers could hold reader attention without competing sidebar noise.",
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
  /* What I built */
  strategyTitle: "What I built",
  strategyBullets: null,
  pillars: [
    {
      title: "Article layout & templates (Arc XP PageBuilder · React)",
      body: "Built a component-based single-column article system in Arc XP PageBuilder. Text, image, embed, and ad-slot blocks render through a shared content resolver so editorial teams can assemble varied story layouts without one-off template forks. Responsive typography and spacing adapt across mobile, tablet, and desktop.",
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
  /* Reflection */
  approachTitle: "What I learned",
  approach: [
    "Lazy-loading the comment widget protects LCP but delays first interaction. We settled on an intersection-observer trigger near the midpoint of the article as the tradeoff. That pattern — defer cost, then measure where engagement actually starts — carried over to GAM slots and the newsletter CTA.",
    "Shipping layout, ads, commenting, and reader-state in one coordinated rollout instead of parallel tracks meant fewer integration surprises, but every feature-flag combination needed its own test matrix. Unit and integration coverage across render-branch permutations was the hardest part of the project.",
  ],
  /* Outcome / result */
  businessOutcomeSectionTitle: "Deployment outcome",
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
  /* Final related surface */
  relatedProject: {
    slug: "dynamic-paywall",
    label:
      "Same reader journey: how the dynamic paywall decides when to gate the article →",
  },
};

export const articlePageRedesignProject = {
  ...getMissionGalleryManifestRow("article-page-redesign"),
  caseStudy: {
    ...baseArticlePageRedesignCaseStudy,
    ...articlePageRedesignCaseStudyVariant,
  },
};
