/**
 * End-to-end subscription conversion system (DMN) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { subscriptionCheckoutActivationCaseStudyVariant } from "./variants.js";

const subscriptionCheckoutActivationCaseStudyBase = {
  /* Header / intro */
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

  /* Impact */
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

  /* Overview */
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

  /* The pipeline */
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
      "Flow from the dynamic paywall through single-page checkout, Arc XP identity, success, 3-step onboarding, to engagement",
  },

  /* Version 1: problem */
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

  /* Version 2: single-page checkout */
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
  /* Impact after V2 */
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

  /* Identity */
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
        "  → Yes → Active subscription?",
        "           → Yes → Exit checkout → Status screen",
        "            → No  → Auth → Resume with cart intact",
      ],
      caption:
        "One async lookup, 3 deterministic branches. No guessing, no dead ends, no lost state.",
    },
  },

  /* Version 3: Clarity-driven iteration */
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
  /* Impact after V3 */
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

  /* Onboarding */
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

  /* Reflection */
  approachTitle: "What I learned",
  approach: [
    "This project looked like one problem and turned out to be three. Version 1 was an architecture failure — three pages meant three round-trips, zero shared client state, and an identity layer that treated every visitor the same. Version 2 solved the structure and the plumbing: single surface, unified payments, deterministic identity. The metrics confirmed it shipped clean.",
    "Version 3 was the humbling part. The progress bar I added for wayfinding was being used as navigation. The payment gating I built for backend safety was making inputs look broken. Clarity did not surface someone else’s mistakes — it surfaced mine. The takeaway is not simply “test more”; engineering decisions have UX consequences you cannot predict from code alone, and the honest way to find them is to instrument production and let real sessions push back.",
  ],

  /* Final result */
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

  /* Final related surface */
  relatedProject: {
    slug: "dynamic-paywall",
    label:
      "Dig into the AI-powered dynamic paywall — it sits at the top of this funnel →",
  },
};

export const subscriptionCheckoutActivationProject = {
  ...getMissionGalleryManifestRow("subscription-checkout-activation"),
  caseStudy: {
    ...subscriptionCheckoutActivationCaseStudyBase,
    ...subscriptionCheckoutActivationCaseStudyVariant,
  },
};
