/**
 * RDFD — Discovering Fake Drivers — portfolio entry + case study.
 * Extracted from portfolio-projects.js for maintainability.
 */

export const rdfdProject = {
  slug: "rdfd",
  portfolioGroup: "research",
  portfolioYear: 2020,
  portfolioLabel: "Thesis",
  name: "RDFD — Discovering Fake Drivers",
  desc: "ML proof-of-concept: inferring shared or spoofed driver accounts from how people actually drive over time—not a single login check.",
  img: "images/portfolio/rdfd/thumbnail.jpg",
  imgWebp: "images/portfolio/rdfd/thumbnail.webp",
  alt: "Illustration — driver at the wheel with temporal data charts and magnifying glass over trend lines",
  link: "https://github.com/Bellypoly/Discovering-Fake-Drivers-Based-on-Temporal-Driving-Behaviors",
  caseStudy: {
    eyebrow: "Research · Machine learning",
    featuredImg: "images/portfolio/rdfd/featured-image.jpg",
    featuredImgWebp: "images/portfolio/rdfd/featured-image.webp",
    featuredImageAlt:
      "Illustration — driver at the wheel with phone and watch maps, dashboard trend lines under a magnifying glass, and alert monitoring",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    task: "Explore whether temporal driving behavior can expose impersonation or credential sharing—without relying only on one-off login signals.",
    disciplines: ["ML modeling", "Time-series analysis", "Driver verification"],
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
      "Trip logs are messy: the same commuter and an impostor can share a corridor, so naive averages lie. The question is whether temporal behavior leaves a stable fingerprint for the enrolled driver—and breaks when credentials are borrowed.",
      "I biased the work toward interpretable features and conservative evaluation so product and safety reviewers could argue about failure modes, not chase leaderboard accuracy alone.",
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
};
