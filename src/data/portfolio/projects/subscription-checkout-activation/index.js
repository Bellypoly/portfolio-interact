/**
 * End-to-end subscription conversion system (DMN) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { subscriptionCheckoutActivationCaseStudyVariant } from "./variants.js";

const baseSubscriptionCheckoutActivationCaseStudy = {
  eyebrow: "Product · Subscriptions · Platform",
  featuredImg: "images/portfolio/subscription-checkout/featured-image.png",
  featuredImgWebp:
    "images/portfolio/subscription-checkout/featured-image.webp",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  task: "Design and build the end-to-end subscription conversion system: from paywall interaction through checkout, payment processing, account activation, and onboarding — integrating with Arc XP, Stripe, and user management systems.",
  disciplines: [
    "Product design",
    "Platform engineering",
    "Payment integration",
    "User onboarding",
  ],
  context: "The Dallas Morning News",
  techStack: [
    {
      label: "Arc XP",
      href: "https://www.arcpublishing.com/products/arcxp/",
    },
    {
      label: "Stripe",
      href: "https://stripe.com/",
    },
    {
      label: "React",
      href: "https://react.dev/",
    },
    {
      label: "Node.js",
      href: "https://nodejs.org/",
    },
  ],
  overview: [
    "Built the complete subscription flow from paywall to active subscriber, including checkout, payment, account creation, and welcome experience.",
  ],
  strategyTitle: "What I did",
  pillars: [
    {
      title: "Checkout flow",
      body: "Designed and implemented the subscription checkout process with payment integration.",
    },
    {
      title: "Account activation",
      body: "Built account creation and activation systems with email verification and onboarding.",
    },
    {
      title: "Platform integration",
      body: "Integrated with Arc XP, Stripe, and user management for seamless subscription management.",
    },
  ],
  approachTitle: "How I shipped it",
  approach: [
    "Developed iteratively with user testing, integrated payments securely, and ensured smooth onboarding.",
  ],
  results: [
    {
      value: "Converted",
      label: "Paywall interactions to subscriptions",
    },
  ],
};

export const subscriptionCheckoutActivationProject = {
  ...getMissionGalleryManifestRow("subscription-checkout-activation"),
  caseStudy: { ...baseSubscriptionCheckoutActivationCaseStudy, ...subscriptionCheckoutActivationCaseStudyVariant },
};