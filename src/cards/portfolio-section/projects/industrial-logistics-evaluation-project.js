/**
 * Industrial Logistic Performance Evaluation (IEOM 2016) — portfolio entry + case study.
 * Extracted from portfolioProjects.js for maintainability.
 */

export const industrialLogisticsEvaluationProject = {
  slug: "industrial-logistics-evaluation",
  portfolioGroup: "research",
  portfolioYear: 2016,
  portfolioLabel: "Paper",
  anchorId: "portfolio-logistics",
  name: "Industrial Logistic Performance Evaluation",
  desc: "IEOM 2016 — logistics performance at a Thai printing & packaging firm via the World Bank LPI: tie national scores to the warehouse and loading dock, benchmark peers, propose improvements.",
  img: "images/portfolio/industrial-logistics-evaluation/thumbnail.jpg",
  imgWebp: "images/portfolio/industrial-logistics-evaluation/thumbnail.webp",
  alt: "Diagram — supply chain service delivery: policy inputs (customs, infrastructure, service quality) and performance outcomes (timeliness, international shipments, tracking)",
  link: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
  caseStudy: {
    eyebrow: "Research · Logistics · IEOM 2016",
    featuredImg:
      "images/portfolio/industrial-logistics-evaluation/featured-image.jpg",
    featuredImgWebp:
      "images/portfolio/industrial-logistics-evaluation/featured-image.webp",
    featuredImageAlt:
      "LPI radar chart — Thailand, Singapore, and Malaysia 2014 compared on timeliness, customs, international shipments, and logistics competence; Thailand map and forklift illustration",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    task: "Evaluate logistics performance at a printing and packaging company in Thailand — map the operation against World Bank LPI dimensions, quantify where cost, lead time, and service reliability break down, and frame actionable improvement paths.",
    disciplines: [
      "Operations research",
      "LPI benchmarking",
      "Case study methodology",
    ],
    context: "IEOM 2016 · Academic research (Thailand)",
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
        label: "World Bank LPI",
        href: "https://lpi.worldbank.org/",
      },
      {
        label: "Thailand ILPI (DOL handbook)",
        href: "https://dol.dip.go.th/uploadcontent/DOL/Pert/ILPI_Handbook_2560.pdf",
      },
      {
        label: "IEOM proceedings",
        href: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
      },
    ],
    overviewTitle: "Overview",
    overview: [
      "Printing and packaging sits where make-to-order pressure, material handling, and outbound distribution meet. “Logistics performance” is never one headline number—it depends which LPI dimensions you measure and whether you stay at national averages or walk the shop floor.",
      "This paper applies the World Bank LPI framework to one Thai company and asks: which dimensions (timeliness, customs, infrastructure, service quality, tracking, international shipments) actually constrain this business, and what does the gap between Thailand’s national LPI score and shop-floor reality look like?",
      {
        text: "Full paper (IEOM 2016 proceedings): ",
        externalLink: {
          href: "https://ieomsociety.org/ieom_2016/pdfs/672.pdf",
          label:
            "Industrial Logistic Performance Evaluation | A Case of Printing and Packaging Company in Thailand (PDF)",
        },
        after: "",
      },
    ],
    strategyTitle: "What I evaluated",
    pillars: [
      {
        title: "LPI dimension mapping",
        body: "Mapped the six World Bank LPI dimensions to specific operational touch-points inside the company — receiving, warehousing, production scheduling, and outbound shipping — so each score connects to an observable process, not an abstract national average.",
      },
      {
        title: "Gap analysis",
        body: "Compared the company’s performance against Thailand’s 2014 LPI scores and regional peers (Singapore, Malaysia) to identify where domestic infrastructure, customs friction, and internal process gaps compound.",
      },
      {
        title: "Improvement framing",
        body: "Closed with concrete recommendations: which dimensions the company can influence directly (warehouse throughput, tracking), which require policy or infrastructure change, and where the biggest cost-to-improvement leverage sits.",
      },
    ],
    approachTitle: "How I approached it",
    approach: [
      "I used a structured case-study methodology: site observation, operational data, and stakeholder interviews to ground the LPI scores in what actually happens on the warehouse floor and the loading dock.",
      "I kept the paper readable across audiences — operations managers, logistics academics, and Thai industrial SME stakeholders — with explicit assumptions and data tables rather than opaque scoring.",
    ],
    results: null,
  },
};
