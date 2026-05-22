import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const federatedLearningEnergyCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    // eyebrow: "Data journalism · Systems · Wireless",
    /* Header / intro */
    eyebrow: "Research · Systems · Wireless · Machine Learning",

    /* Media */
    featuredImg:
      "images/portfolio/federated-learning-energy/featured-image.jpg",

    featuredImgWebp:
      "images/portfolio/federated-learning-energy/featured-image.webp",

    featuredImageAlt:
      "Diagram showing a server aggregating local updates from edge devices with battery indicators, representing federated learning energy consumption under wireless constraints",

    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",

    /* Project frame */
    task: "Quantify how federated learning burns energy at the edge when the radio channel is non-orthogonal multiple access (NOMA)—so training stories stay honest about compute and transmission cost.",

    focus: ["MATLAB simulation", "Federated learning", "Wireless modeling"],

    context: "Academic / systems research",

    /* Stack */
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

    /* Impact */
    results: [
      {
        value: "Energy accounting",
        label:
          "Separated compute and radio transmission costs across federated-learning aggregation rounds.",
      },
      {
        value: "Sweep-ready",
        label:
          "Parameter grids exposed saturation regimes, uplink bottlenecks, and NOMA tradeoffs.",
      },
      {
        value: "Reproducible",
        label:
          "Published scripts and figures so assumptions, plots, and operating regimes could be rerun and challenged.",
      },
    ],

    resultsLabelCase: "sentence",

    /* Overview */
    overview: [
      "Federated learning moves training closer to data, but the bill is never compute alone: every aggregation round pays radio energy too. With NOMA, who shares spectrum—and how—changes interference patterns, so you cannot reuse “plain OFDMA” energy arguments without lying to the reader.",

      "The thesis contribution is deliberately comparative: sweep operating regimes, separate uplink versus compute spend where the model allows, and publish assumptions so another lab can rerun the sweep or challenge the numbers.",
    ],

    /* What I focused on */
    strategyTitle: "What I did",

    strategyIntro:
      "My role was to implement the MATLAB model and analysis for federated-learning energy use under NOMA. I kept the system legible to wireless and ML readers: parameters with physical meaning, outputs that separate compute from transmit cost, and figures that make tradeoffs visible.",

    pillars: [
      {
        title: "Constraint-aware modeling",

        body: "Encoded channel, scheduling, and aggregation assumptions without pretending the model captured full production complexity.",
      },

      {
        title: "Sweep-ready",

        body: "Built parameter grids that highlight breakpoints: when FL round budgets dominate, when NOMA helps, and where saturation regimes appear.",
      },

      {
        title: "Reproducible outputs",

        body: "Published scripts and figures so others could rerun the model, inspect assumptions, and challenge the conclusions.",
      },
    ],

    /* How it shipped */
    approachTitle: "How I shipped it",

    approach: [
      "Wrote MATLAB modules for client sampling, aggregation rounds, and energy accounting tied to the RF model.",

      "Generated plots that isolate uplink versus downlink behavior, per-device heterogeneity, and convergence milestones.",
    ],

    /* Outcome */
    outcome:
      "MATLAB study: federated-learning energy use under NOMA — separate compute versus radio cost, expose operating-regime breakpoints, and publish reproducible figures.",

    /* Links */
    projectUrl:
      "https://github.com/Bellypoly/On_simulating_energy_consumption_of_federated_learning_systems",

    footerTagline:
      "MATLAB study: federated-learning energy use under NOMA — separate compute from radio cost, expose operating-regime breakpoints, and publish reproducible figures.",
  }),
});

export const federatedLearningEnergyCaseStudyVariant =
  federatedLearningEnergyCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  federatedLearningEnergyCaseStudyVariants.swe;
