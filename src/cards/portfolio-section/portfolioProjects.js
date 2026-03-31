/**
 * Portfolio projects — one entry drives Mission Gallery cards and `/project/:slug` case studies.
 * Optional `caseStudy.techStack`: `{ label, href }[]` (or legacy `string[]`) — Stack row in meta; links open in a new tab.
 */

export function getPortfolioProjectBySlug(slug) {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug) ?? null;
}

export const PORTFOLIO_PROJECTS = [
  {
    slug: "dynamic-paywall",
    anchorId: "portfolio",
    name: "AI-Powered Dynamic Paywall",
    desc: "ML-driven dynamic paywall balancing subscription growth against reader engagement.",
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
        "Making it harder was the fact that different content behaves differently — politics, crime, and restaurant coverage drive the most subscription starts, while high school sports, commentary, and business convert at the highest rates. No single rule could account for that.",
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
    slug: "subscription-checkout-activation",
    name: "End-to-End Subscription Conversion System",
    desc: "Rebuilt a leaking 3-page checkout into a single-page conversion pipeline — then kept new subscribers engaged.",
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
      task: "Replace a leaking 3-page, server-rendered checkout with a single React surface, unify Braintree / Stripe / Apple Pay behind one payment abstraction, and implement deterministic Arc XP identity resolution at the email boundary — then iterate with Microsoft Clarity on production so evidence, not assumptions, drove the V3 UX fixes.",
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
        "I rebuilt the pipeline in 2 engineering passes. The first collapsed 3 pages into a single React surface, unified 3 payment providers (Braintree, Stripe, Apple Pay) behind one tokenization interface, and wrote deterministic identity resolution against Arc XP so the system could tell new visitors from existing accounts from active subscribers — all at the email-entry boundary. The second pass used Microsoft Clarity tap heatmaps on production to prove that some of my own V1 engineering decisions were now the problem, and I shipped fixes against the evidence.",
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
          "Moved member info, payment, and order summary onto a single page — eliminating 2 full navigations and 2 server round-trips. Client state now lives in one component tree instead of being serialized and prayed-for across page loads.",
          "Built a unified payment abstraction over Braintree, Stripe, and Apple Pay. Each provider has its own tokenization flow, validation contract, and error shape; the abstraction normalises all of that behind one interface so the checkout form doesn't care which provider is active.",
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
            "   → Yes → Active subscription?             ",
            "           → Yes → Exit checkout → Status screen",
            "            → No  → Auth → Resume with cart intact",
          ],
          caption:
            "One async lookup, 3 deterministic branches. No guessing, no dead ends, no lost state.",
        },
      },
      claritySection: {
        title: "Version 3: What Clarity showed us",
        lead: "V2 worked: strong subscription lift, clean architecture, unified payments. We could have stopped. Instead I wired Microsoft Clarity into production — session replay and tap heatmaps on the exact DOM readers touched — because shipping isn't the same as knowing. What the data showed was uncomfortable: the friction readers hit in V2 wasn't a design oversight or a missing feature. It was my own engineering decisions surfacing as UX problems. Iterating on that evidence — progress bar, payment affordance, benefits chrome — stacked another conversion uplift on top of the V2 launch.",
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
            label: "Credit Card / Payment details completed",
          },
        ],
      },
      approachTitle: "What I learned",
      approach: [
        "This project looked like one problem and turned out to be three. Version 1 was an architecture failure — 3 pages meant 3 round-trips, zero shared client state, and an identity layer that treated every visitor the same. Version 2 solved the structure and the plumbing: single surface, unified payments, deterministic identity. The metrics confirmed it shipped clean.",
        "Version 3 was the humbling part. The progress bar I added for wayfinding was being used as navigation. The payment gating I built for backend safety was making inputs look broken. Clarity didn’t show me someone else’s mistakes — it showed me mine. The takeaway isn’t ‘test more’; it’s that engineering decisions have UX consequences you can’t predict from the code alone, and the only honest way to find them is to instrument production and let real sessions talk back.",
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
    name: "Article Experience & Engagement Optimization",
    desc: "Article surface rebuilt for readability, engagement, and Core Web Vitals — smarter GAM, Viafoura commenting, paywall-aware UI, GA4 & ops monitoring.",
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
      task: "Senior Full Stack Engineer on the article surface — PageBuilder (React), GAM, Core Web Vitals, Viafoura commenting, paywall-aware reader flows, and GA4 / Datadog / BlueConic instrumentation. Partnered with product, design, and ads.",
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
        "AMP deprecation gave us back full control of the article DOM. I rebuilt the PageBuilder surface: component-based single-column layout, lazy GAM slot injection at content breakpoints, Viafoura SDK integration with auth bridge and GA4 event forwarding, and reader-state branching for paywall, regiwall, and newsletter CTAs — all behind feature flags for incremental rollout starting September, targeting full deployment by year-end.",
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
          "The old experience was sidebar-heavy: ads and modules competed with the story, loads were unpredictable for Core Web Vitals, and growth paths (subscribe, register, newsletter) sat outside a coherent reading line — so engagement stayed passive and iteration was slow.",
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
        "Lazy-loading the comment widget protects LCP but delays first interaction. We landed on an intersection-observer trigger at roughly the midpoint of the article as the tradeoff. That pattern (defer cost, measure where engagement actually starts) carried over to GAM slots and the newsletter CTA.",
        "Shipping layout, ads, commenting, and reader-state as one rollout instead of separate tracks meant fewer integration surprises, but every feature-flag combination needed its own test matrix. The unit and integration coverage on render-branch permutations was the hardest part of the project.",
      ],
      businessOutcome:
        "One implementation surface in production, rolled out incrementally with product, design, and ads from September toward full deployment by year-end.",
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
    slug: "local-elections-hub",
    name: "Local Elections Hub",
    desc: "Data-driven elections UI — dynamic race tables, anchor navigation, lightweight viz, and a responsive grid built for real-time coverage and mobile.",
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
      featuredImageCompact: true,
      featuredImageObjectPosition: "center center",
      task: "Senior full-stack engineer on the Local Elections Hub: owned the frontend architecture and implementation for the 2022 rebuild — turning a loose, module-based hub into a component-driven, data-aware system for real-time results, election-night traffic, and mobile-first reading.",
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
        "After AMP and alongside broader Arc XP work, election coverage needed the same discipline as the rest of the site: one coherent rendering model for dense, updating data — not a different ad-hoc page per race. I rebuilt the hub as a scalable, data-driven UI system so counties, races, and candidates map to reusable components instead of one-off modules.",
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
        "Raw trip data is noisy: routes, pace, and stops all vary with traffic and intent. The problem was to turn sequences of behavior into a signal that stays stable for the real driver and drifts when someone else is behind the wheel.",
        "The approach emphasized interpretable features and robust evaluation—so outcomes could be discussed with safety stakeholders, not only accuracy on a held-out set.",
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
      techStack: [
        {
          label: "REST map APIs",
          href: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
        },
        {
          label: "Tiles & geocoding",
          href: "https://en.wikipedia.org/wiki/Tiled_web_map",
        },
        {
          label: "JavaScript",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          label: "Partner integrations",
          href: "https://en.wikipedia.org/wiki/Application_programming_interface",
        },
      ],
      overview: [
        "Teams were rebuilding the same glue around basemaps, geocoding, and styling. The goal was a cohesive surface area with predictable limits, documentation, and examples that shorten time-to-first-map.",
        "Mobile-first usage meant performance and clarity matter as much as feature breadth: fewer surprises in the field beats a long menu of options.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role: shape the public map API and integration toolkit so product teams shipped maps faster—with clear contracts, docs, and examples. I balanced backward compatibility with a cleaner conceptual model for new consumers across GIS, frontend, and partner teams.",
      pillars: [
        {
          title: "Consistency",
          body: "I standardized vocabulary for endpoints, errors, and units so mistakes surface in the IDE, not only in production traffic.",
        },
        {
          title: "Progressive disclosure",
          body: "I wrote simple examples for the common path and kept advanced controls available without cluttering the quickstart.",
        },
        {
          title: "Reliability",
          body: "I defined caching, fallbacks, and observability hooks so maps degrade gracefully instead of failing silently.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "I hardened API contracts, reference embedding flows, and guardrails for rate limits and attribution.",
        "I documented design patterns for overlays and interaction states that stay legible across light/dark basemap styles.",
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
      techStack: [
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
        "Job search products compete on relevance, trust, and speed. Small friction in filters, dead-ends in search, or weak preview of requirements cost applications.",
        "Resume tooling sits in the same journey: the right guidance increases completion, but heavy-handed templates make everyone look the same.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role: improve search/discovery and resume tooling on a national marketplace (Laravel, Elasticsearch, MySQL). I aligned three journeys—fast browsing, targeted search, and deep prep (resume, alerts)—each with its own hierarchy inside one design system.",
      pillars: [
        {
          title: "Clarity of fit",
          body: "I pushed salary, location, and seniority earlier in the journey so seekers didn’t invest in mismatched roles.",
        },
        {
          title: "Momentum",
          body: "I reduced steps between interest, saved searches, and application-ready profiles.",
        },
        {
          title: "Credibility",
          body: "I emphasized signals employers and seekers trust: verification, posting freshness, and human-readable requirements.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "I shipped flows that pair search refinement with explainable filters and resume guidance as checkpoints instead of a wall of fields.",
        "I added instrumentation for drop-off by segment (mobile vs desktop, new vs returning) and prioritized the worst leaks first.",
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
      techStack: [
        {
          label: "JavaScript",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        { label: "D3.js", href: "https://d3js.org/" },
        {
          label: "Heuristic search",
          href: "https://en.wikipedia.org/wiki/Heuristic_search",
        },
      ],
      overview: [
        "Small state spaces still deserve thoughtful UI: moves must read clearly, and the board should help players understand why the AI chose a line of play.",
        "D3.js grounded the visualization in smooth transitions and legible geometry so the game reads as a product, not a debug plot.",
      ],
      strategyTitle: "What I did",
      strategyIntro:
        "My role: build the full-stack academic project—D3.js game UI plus a heuristic search agent with legible reasoning. I designed for two audiences: players who want a tight loop, and reviewers who need to see why the AI moved.",
      pillars: [
        {
          title: "Explainable play",
          body: "I surfaced heuristic cues that steer search—players can disagree, but they’re never mystified.",
        },
        {
          title: "Performance where it matters",
          body: "I tuned search depth against frame time so the UI stayed responsive.",
        },
        {
          title: "Joyful feedback",
          body: "I used motion and timing (color, transitions) to celebrate good moves without noise.",
        },
      ],
      approachTitle: "How I shipped it",
      approach: [
        "I implemented the heuristic search core with tunable weights and a replay timeline for interesting branches.",
        "I built D3-driven board updates with layout that stayed stable across viewport changes.",
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
      techStack: [
        {
          label: "MATLAB",
          href: "https://www.mathworks.com/products/matlab.html",
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
        "Federated learning pushes computation to the edge, but the training story is incomplete without the cost of communication. NOMA changes who interferes with whom—so energy curves are not interchangeable with vanilla orthogonality assumptions.",
        "The simulation’s value is comparative: sweep regimes, quantify tradeoffs, and make assumptions explicit for reproducibility.",
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
        "Utility service sites often grow by accretion: each department ships a flow, and citizens shoulder the navigation tax. The objective was a single mental model: find my task, finish it, know what happens next.",
        "High-stakes moments—outages, billing disputes, new connections—need calm typography, resilient forms, and clarity on timelines.",
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
