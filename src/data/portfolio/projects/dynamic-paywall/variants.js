import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const dynamicPaywallCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    /* Header / intro */
    eyebrow: "NEWSROOM SYSTEMS · MONETIZATION · MACHINE LEARNING",

    /* Media */
    featuredImg: "images/portfolio/dynamic-paywall/featured-image.png",
    featuredImgWebp: "images/portfolio/dynamic-paywall/featured-image.webp",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center top",
    featuredImageObjectPositionMd: "50% 20%",

    /* Project frame */
    task: "Integrated a machine learning-driven paywall into DMN’s Arc XP frontend and subscription flows — wiring JavaScript, BlueConic, and GA4 instrumentation so reader-state behavior, analytics, and access decisions stayed aligned in production, then shipping behind feature flags and kill switches for safe rollout and trustworthy feedback signals.",
    context: "The Dallas Morning News (DMN)",

    /* Stack */
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

    /* Impact */
    results: [
      { value: "+22%", label: "Conversion rate" },
      { value: "+15%", label: "More subscription starts" },
    ],

    /* Overview */
    overviewTitle: "Overview",

    overview: [
      "Those gains came from solving a fundamental problem: static paywalls treat every reader the same. Block too early and you lose casual readers who might have converted later. Block too late and you leave revenue on the table.",

      "What made it harder was that different content behaves differently — politics, crime, and restaurant coverage drive the most subscription starts, while high school sports, commentary, and business convert at the highest rates. No single static rule could capture that.",

      "The metrics in the Impact section (+22% conversion, +15% more subscription starts) were referenced in the DMN employee town hall on August 13, 2025.",
    ],

    /* What I focused on */
    strategyTitle: "HOW I BROUGHT IT TO PRODUCTION",

    strategyIntro: [
      "My role: integrate a dynamic paywall into DMN’s Arc XP frontend and subscription flows, instrument analytics, and roll out safely with feature flags.",
      "The answer was an ML-driven paywall powered by Sophi — dynamically deciding when to gate, meter, or open content based on reader behavior. Here’s how I brought it to production:",
    ],

    strategyBullets: [
      "I integrated the decisioning layer into frontend rendering and subscription flows so paywall responses followed user behavior and content context in real time.",

      "I designed user-state handling across new visitors, returning readers, and subscribers so gating logic and messaging stayed consistent.",

      "I established analytics instrumentation so model training and evaluation had trustworthy signals.",

      "I supported controlled rollout with feature flags and kill switches to limit risk and protect editorial trust. The rollout needed to balance subscription growth with reader trust so aggressive gating never disrupted core newsroom coverage.",

      "After first launch, GA4 and the model outputs didn’t always agree — we traced which analytics definitions and events needed tuning versus which inputs had to change so dashboards and the learning loop matched real reader behavior.",
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

    /* How it shipped */
    approachTitle: "What I found in production",

    approachIntro:
      "As the feedback loop matured, a clear pattern emerged in the data:",

    approach: [
      "I saw conversion performance vary sharply by content category. High-traffic sections like politics and crime drove the most subscription starts in absolute volume — but high school sports, commentary, and business converted at significantly higher rates per reader.",
      "That told me the paywall couldn’t just count pageviews. It had to weigh reader intent against content type to know when gating would help — and when it would only push people away.",
      "Conversion volume and conversion efficiency turned out to be very different signals depending on the section.",
    ],

    flourishEmbed: "https://flo.uri.sh/visualisation/28171634/embed",
    // flourishCaption:
    //   "Conversion volume and conversion efficiency turned out to be very different signals depending on the section.",

    outcome:
      "The result is a paywall that gets smarter every day — continuously balancing subscription conversion against reader engagement, one visit at a time. The +22% conversion lift and +15% more subscription starts reflect a system that learns, not just a feature that shipped.",

    relatedProject: {
      slug: "subscription-checkout-activation",
      label:
        "See how the checkout and onboarding system converts this intent →",
    },

    /* Footer */
    footerTagline:
      "Adaptive ML paywall integrated into Arc XP—per-visit gating decisions tied to reader behavior, analytics instrumentation, and controlled newsroom rollout.",
  }),
});

export const dynamicPaywallCaseStudyVariant =
  dynamicPaywallCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  dynamicPaywallCaseStudyVariants.swe;
