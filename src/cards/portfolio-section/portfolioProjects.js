/**
 * Portfolio projects — one entry drives Mission Gallery cards and `/project/:slug` case studies.
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
      overviewTitle: "Overview",
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
        diagramImage: "images/portfolio/dynamic-paywall/system-design.png",
        diagramImageWebp: "images/portfolio/dynamic-paywall/system-design.webp",
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
      task: null,
      disciplines: [
        "Checkout & payments system",
        "Identity & session continuity",
        "Post-purchase onboarding",
      ],
      context: "The Dallas Morning News",
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
        {
          text: "I rebuilt the pipeline in 2 engineering passes. The first collapsed 3 pages into a single React surface, unified 3 payment providers (Braintree, Stripe, Apple Pay) behind one tokenization interface, and wrote deterministic identity resolution against Arc XP so the system could tell new visitors from existing accounts from active subscribers — all at the email-entry boundary. The second pass used Microsoft Clarity tap heatmaps on production to prove that some of my own V1 engineering decisions were now the problem, and I shipped fixes against the evidence. ",
          emphasis:
            "Together: +14% digital subscriptions, then an additional +7% conversion uplift.",
        },
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
        lead: 'The first pass rewrote the architecture. We collapsed the 3-page flow into a single React-driven surface, unified 3 payment providers behind one abstraction, and wired deterministic identity resolution into the entry point. It shipped as the "Single Page Checkout" and drove a +14% increase in digital subscriptions within the first month.',
        sectionResults: [
          { value: "+14%", label: "Digital subscriptions (V2 launch)" },
        ],
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
        lead: "V2 worked. +14%, clean architecture, unified payments. We could have stopped. Instead I wired Microsoft Clarity into production — session replay and tap heatmaps on the exact DOM readers touched — because shipping isn't the same as knowing. What the data showed was uncomfortable: the friction readers hit in V2 wasn't a design oversight or a missing feature. It was my own engineering decisions surfacing as UX problems.",
        sectionResults: [
          { value: "+7%", label: "Conversion uplift (V3 iteration)" },
        ],
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
