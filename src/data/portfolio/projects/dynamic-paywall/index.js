/**
 * Dynamic Paywall (Sophi on Arc XP) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { dynamicPaywallCaseStudyVariant } from "./variants.js";

const baseDynamicPaywallCaseStudy = {
  /* Header / intro */
  eyebrow: "Product · Monetization · AI",
  // Case-study featured strip (gallery uses img/imgWebp thumbnails above)
  featuredImg: "images/portfolio/dynamic-paywall/featured-image.png",
  featuredImgWebp: "images/portfolio/dynamic-paywall/featured-image.webp",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center top",
  featuredImageObjectPositionMd: "50% 20%",
  task: "Integrate Sophi's ML paywall into DMN's Arc XP frontend and subscription paths. Wire JavaScript and BlueConic so on-page behavior matches Sophi's decisions; instrument GA4; ship with feature flags and kill switches for safe rollout and reliable model feedback.",
  focus: ["Machine Learning paywall", "Analytics", "Frontend integration"],
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
  /* What I did */
  strategyTitle: "What I did",
  strategyIntro: Object.freeze([
    "My role was integrating Sophi’s ML paywall into DMN’s Arc XP frontend and subscription flows, instrumenting analytics, and rolling out safely with feature flags. The system adjusted when and how paywalls appeared per visit based on reader behavior and content context.",
    "Here’s how I brought it into production:",
  ]),
  strategyBullets: [
    "I integrated Sophi's decisioning layer into frontend rendering and subscription flows so paywall responses followed user behavior and content context in real time.",
    "I designed user-state handling across new visitors, returning readers, and subscribers so gating logic and messaging stayed consistent.",
    "I established analytics instrumentation so model training and evaluation had reliable signals.",
    "I supported controlled rollout with feature flags and kill switches to limit risk and protect editorial trust.",
    "After first launch, GA4 and Sophi didn't always agree — we traced which analytics definitions and events needed tuning versus which model inputs had to change so dashboards and the learning loop matched real reader behavior.",
  ],
  pillars: null,
  /* System design */
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
  /* Production findings */
  approachTitle: "What I found in production",
  approachIntro:
    "As the feedback loop matured, a clear pattern emerged in the data:",
  approach: [
    "I saw conversion performance vary sharply by content category. High-traffic sections like politics and crime drove the most subscription starts in absolute volume — but high school sports, commentary, and business converted at significantly higher rates per reader.",
    "That told me the paywall couldn't just count pageviews. It had to weigh reader intent against content type to know when gating would help — and when it would only push people away.",
    "Conversion volume and conversion efficiency turned out to be very different signals depending on the section.",
  ],
  flourishEmbed: "https://flo.uri.sh/visualisation/28171634/embed",
  flourishCaption: "",
  /* Outcome / result */
  businessOutcome:
    "The result is a paywall that gets smarter every day — continuously balancing subscription conversion against reader engagement, one visit at a time. The +22% conversion lift and +15% more subscription starts reflect a system that learns, not just a feature that shipped.",
  /* Final related surface */
  relatedProject: {
    slug: "subscription-checkout-activation",
    label: "See how the checkout and onboarding system converts this intent →",
  },
  footerTagline:
    "Sophi ML paywall integrated into Arc XP—per-visit gating decisions tied to reader behavior, analytics instrumentation, and controlled newsroom rollout.",
};

export const dynamicPaywallProject = {
  ...getMissionGalleryManifestRow("dynamic-paywall"),
  caseStudy: {
    ...baseDynamicPaywallCaseStudy,
    ...dynamicPaywallCaseStudyVariant,
  },
};
