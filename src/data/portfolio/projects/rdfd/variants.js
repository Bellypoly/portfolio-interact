import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const rdfdCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    eyebrow: "Research · Machine Learning · Behavioral Modeling",

    /* Media */
    featuredImg: "images/portfolio/rdfd/featured-image.jpg",

    featuredImgWebp: "images/portfolio/rdfd/featured-image.webp",

    featuredImageAlt:
      "Illustration showing a driver at the wheel with GPS maps, behavioral trend lines, and anomaly-monitoring overlays for temporal driver verification",

    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",

    /* Project frame */
    task: "Explore whether temporal driving behavior can expose impersonation or credential sharing—without relying only on one-off login signals.",

    focus: [
      "Temporal behavior modeling",
      "Time-series analysis",
      "Driver verification",
    ],

    context: "Research / proof of concept",

    /* Stack */
    techStack: [
      {
        label: "Python",
        href: "https://www.python.org/",
      },
      {
        label: "Scikit-learn",
        href: "https://scikit-learn.org/",
      },
      {
        label: "Time-series pipeline",
        href: "https://en.wikipedia.org/wiki/Time_series",
      },
    ],

    /* Impact */
    results: [
      {
        value: "Temporal",
        label: "Behavior-first verification instead of one-off login checks.",
      },
      {
        value: "Rigorous",
        label:
          "Evaluation framed around shared accounts, spoofing, and route ambiguity.",
      },
      {
        value: "Operational",
        label:
          "Conservative thresholds and false-positive awareness for real-world deployment.",
      },
    ],

    resultsLabelCase: "sentence",

    /* Overview */
    overview: [
      "Trip logs are messy: the same commuter and an impostor can share a corridor, so naive averages lie. The question is whether temporal behavior leaves a stable fingerprint for the enrolled driver—and breaks when credentials are borrowed.",

      "I biased the work toward interpretable features and conservative evaluation so product and safety reviewers could argue about failure modes instead of chasing leaderboard accuracy alone.",
    ],

    /* What I did */
    strategyTitle: "What I did",

    strategyIntro:
      "My role was to own temporal feature design, evaluation framing, and the proof-of-concept driver-verification pipeline. Before modeling, I clarified what “fake” means in production: shared accounts, borrowed credentials, and scripted fraud behave differently from random mistakes. I focused the plan on separability over time and calm false-positive rates.",

    pillars: [
      {
        title: "Signal quality",

        body: "Defined behavioral features that capture habit—not just speed averages, but rhythm, hesitation, and consistency across trip segments.",
      },

      {
        title: "Evaluation rigor",

        body: "Designed stress tests across drivers, vehicles, and cities so the model could not succeed only on tidy routes or narrow datasets.",
      },

      {
        title: "Operational safety",

        body: "Specified bias checks and conservative thresholds so verification systems support humans instead of punishing edge cases.",
      },
    ],

    /* How I approached it */
    approachTitle: "How I approached it",

    approach: [
      "Built a pipeline from trip segments to temporal representations, paired with classifiers and ranking logic suited to sparse labels.",

      "Ran iteration loops with error analysis—when the model misfired, I traced failures back to route context, sensor gaps, or label ambiguity.",
    ],

    /* Outcome */
    outcome:
      "ML proof-of-concept: infer shared or spoofed driver accounts from how people actually drive over time—not from a single login check.",

    /* Links */
    projectUrl:
      "https://github.com/Bellypoly/Discovering-Fake-Drivers-Based-on-Temporal-Driving-Behaviors",

    footerTagline:
      "Temporal-behavior ML for driver verification — infer impersonation patterns from driving habits, route consistency, and time-series behavior instead of static account checks.",
  }),
});

export const rdfdCaseStudyVariant =
  rdfdCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  rdfdCaseStudyVariants.swe;
