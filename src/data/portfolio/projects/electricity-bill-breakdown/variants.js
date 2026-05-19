import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

/** PEA vs MEA sample bills — `CaseStudyFigures` two-up grid after overview (data-reporter site version only). */
export const electricityBillBreakdownOverviewFigureGrid = Object.freeze({
  figureColumns: 2,
  figures: Object.freeze([
    Object.freeze({
      img: "images/portfolio/electricity-bill-breakdown/pea-bill.png",
      imgWebp: "images/portfolio/electricity-bill-breakdown/pea-bill.webp",
      alt: "Provincial Electricity Authority (PEA) Thailand residential bill with energy, Ft, service, and VAT line items",
    }),
    Object.freeze({
      img: "images/portfolio/electricity-bill-breakdown/mea-bill.png",
      imgWebp: "images/portfolio/electricity-bill-breakdown/mea-bill.webp",
      alt: "Metropolitan Electricity Authority (MEA) Thailand residential bill with energy, Ft, service, and VAT line items",
    }),
  ]),
  caption:
    "Monthly electricity bills contain multiple layered charges—fuel-adjustment tariffs, infrastructure costs, taxes, and base energy pricing—that are rarely explained in consumer-facing language.",
});

/** User-flow diagram after the PEA / approach reflection (data-reporter site version only). */
export const electricityBillBreakdownApproachFigureGrid = Object.freeze({
  figureColumns: 1,
  figures: Object.freeze([
    Object.freeze({
      img: "images/portfolio/electricity-bill-breakdown/webflow.png",
      imgWebp: "images/portfolio/electricity-bill-breakdown/webflow.webp",
      alt: "User flow diagram for Where Does Your Electricity Bill Go? — five linked stages from JustPow landing through bill entry, allocation breakdown, systemic context, and co-signers action",
    }),
  ]),
  caption:
    "Civic explainer translating Thai electricity bills, fuel-adjustment charges, and infrastructure pricing systems into structured information for non-technical audiences.",
  afterFigure:
    "The explainer focused on helping readers connect a monthly electricity bill to the infrastructure, pricing systems, and regulatory decisions behind it.",
});

export const electricityBillBreakdownCaseStudyVariants = Object.freeze({
  swe: Object.freeze({
    techStack: [
      {
        label: "FigJam",
        href: "https://www.figma.com/figjam/",
      },
      {
        label: "Civic explainer design",
        href: "",
      },
    ],
  }),
  "data-reporter": Object.freeze({
    focus: [
      "Energy literacy",
      "Public-interest explanation",
      "Information architecture",
      "Regulatory transparency",
    ],
    /* Overview */
    overviewTitle: "Overview",
    overview: [
      "Most Thai consumers see a single total on their electricity bill. What sits underneath it—fuel-adjustment tariffs (Ft), infrastructure costs, taxes, and regulatory pricing mechanisms—is difficult to interpret without utility or regulatory knowledge.",
      "This project explored how complex electricity pricing systems could be explained progressively for non-specialist audiences without losing technical accuracy. The explainer helped readers understand how infrastructure decisions, energy policy, and regulatory pricing shape the final bill they receive each month.",
      "It also connected household electricity costs to broader structural questions inside Thailand’s energy system—including fuel dependence, reserve-capacity policy, and state price-intervention mechanisms.",
      ">>_Is the price fair?_<<",
      "Rather than overwhelming readers with technical definitions upfront, the experience introduced one billing concept at a time so readers could move through increasingly complex pricing structures and energy-policy decisions step by step.",
    ],
    overviewFigures: electricityBillBreakdownOverviewFigureGrid,
    /* What I shaped */
    strategyTitle: "What I shaped",
    strategyIntro:
      "My contribution focused on how readers moved through layered utility concepts—and whether the explanations still held up technically against real billing and tariff systems.",
    pillars: [
      {
        title: "Progressive disclosure flow",
        body: "Mapped the reader journey from a simple consumer question (“_what am I paying for?_”) into more complex concepts—fuel-adjustment tariffs (Ft), fixed infrastructure costs, taxes, and cross-subsidy mechanisms—so each section explained one layer of the bill before introducing the next.",
        afterBlocks: [
          "The goal was not to flatten the system into oversimplified answers, but to structure it in a way non-technical readers could still follow.",
        ],
      },
      {
        title: "Domain-accurate language",
        body: "Wrote and reviewed explanations against real Thai tariff structures and utility billing logic, replacing vague or misleading shorthand with explanations grounded in how Thai billing systems and energy pricing actually work.",
        afterBlocks: [
          "This helped ensure the explainer remained accessible without sacrificing technical accuracy.",
        ],
      },
      {
        title: "Fairness as reader judgment",
        body: "The project framed fairness as a reader conclusion rather than a prescribed answer: the explainer surfaces billing structures, regulatory mechanics, and infrastructure costs transparently while leaving the final judgment to the public.",
        afterBlocks: ["The goal was civic understanding, not advocacy."],
      },
    ],
    /* Reflection */
    approachTitle: "How PEA experience shaped my contribution",
    approach: [
      "My earlier work at [[/#work-pea|PEA (Provincial Electricity Authority of Thailand)]] provided practical context for how billing systems, outage management, consumption data, and customer-facing dashboards connect operational infrastructure to the numbers consumers ultimately see on a monthly bill.",
      "That experience helped ground the explainer in real utility-system behavior rather than abstract pricing descriptions, while translating engineering and regulatory concepts into language non-specialist audiences could still follow.",
    ],
    approachFigures: electricityBillBreakdownApproachFigureGrid,
    results: null,
  }),
});

export const electricityBillBreakdownCaseStudyVariant =
  electricityBillBreakdownCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  electricityBillBreakdownCaseStudyVariants.swe;
