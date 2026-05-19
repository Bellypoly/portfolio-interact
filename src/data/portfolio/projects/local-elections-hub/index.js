/**
 * Local Elections Hub (DMN, 2022 rebuild) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { localElectionsHubCaseStudyVariant } from "./variants.js";

const baseLocalElectionsHubCaseStudy = {
  /* Header / intro */
  eyebrow: "Election systems · Data UI · Newsroom engineering",
  featuredImg: "images/portfolio/local-elections-hub/featured-image.png",
  featuredImgWebp: "images/portfolio/local-elections-hub/featured-image.webp",
  featuredImageAlt:
    "The Dallas Morning News Voter Guide — Elections 2022: blue and red voting booths on a ballot-pattern background with headline typography",
  featuredImageSource: {
    href: "https://voterguide.dallasnews.com/",
    label: "The Dallas Morning News Voter Guide",
  },
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  task: "Full-stack engineer on the Local Elections Hub: owned the frontend architecture and implementation for the 2022 rebuild — turning a loose, module-based hub into a component-driven, data-aware system for real-time results, election-night traffic, and mobile-first reading.",
  focus: [
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
  /* Impact */
  results: [
    {
      value: "Readable",
      label:
        "Denser results stayed scannable on mobile after hierarchy and metadata work",
    },
    {
      value: "Faster",
      label: "County and race jumps without full reloads during peak traffic",
    },
    {
      value: "Reusable",
      label:
        "Component system reused across races instead of one-off election pages",
    },
    {
      value: "Ready",
      label:
        "Layout and semantics suited to heavy-traffic election-night publishing",
    },
  ],
  /* Overview */
  overviewTitle: "Overview",
  overview: [
    "Election night is deadline journalism: readers refresh, editors watch the same tables, and a fragmented hub burns trust fast. After AMP and alongside broader Arc XP work, I rebuilt the hub as one coherent, data-driven system—counties, races, and candidates mapped to reusable components instead of a bespoke page per contest.",
  ],
  /* Data to UI */
  overviewSystemDesign: {
    sectionTitle: "Data to UI",
    intro:
      "Editorial and wire feeds were normalized into shared race and candidate structures so results, reporting status, and metadata stayed consistent across counties. The UI layer then mapped those records into reusable tables, vote indicators, and navigation patterns optimized for live election coverage.",
    diagram: [
      "Feeds / CMS — structured election payloads",
      "↓",
      "Normalize — counties, races, candidates, party, vote totals",
      "↓",
      "Election UI patterns — tables · vote bars · status tags · reporting footer",
      "↓",
      "Render — responsive grid (6-col) · anchor nav · progressive disclosure",
    ],
    caption:
      "One pipeline from structured data to reusable components; navigation and layout stay on the client where it helps perceived performance.",
    diagramAlt:
      "Flow from election data through normalization to component registry and responsive render with anchor navigation",
  },
  /* Problem */
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
              "2021 hub — dense tables and status tags that became difficult to scan quickly during live returns.",
          },
          after: {
            img: "images/portfolio/local-elections-hub/hub-after-2022-mobile.png",
            imgWebp:
              "images/portfolio/local-elections-hub/hub-after-2022-mobile.webp",
            alt: "Dallas Morning News mobile — Local Elections November 2022, Dallas County: candidate rows with party badges and vote share bars.",
            caption:
              "2022 hub — clearer hierarchy, county navigation, and lightweight vote-share indicators designed for faster scanning during election-night updates.",
          },
        },
      ],
      caption:
        "Different races and timestamps on purpose: the comparison is across cycles after the new data model and UI system shipped.",
    },
  },
  /* What I built */
  strategyTitle: "What I built",
  strategyBullets: null,
  pillars: [
    {
      title: "Reusable election result components",
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
  /* How I shipped it */
  approachTitle: "How I shipped it",
  approach: [
    "Election night is the worst time to discover layout thrash or unbounded lists. I biased toward stable shells (reserved row height where possible), bounded “view more” paths, and client navigation so the server wasn't replaying full pages for every county hop.",
    "The hard part wasn't a single component — it was consistency: one mental model for editors and readers across counties, with the same components whether data arrived fast or trickled in during live returns.",
  ],
  /* Business outcome */
  businessOutcome:
    "The rebuilt hub gave the newsroom one reusable election system for live results, mobile readers, and repeat coverage across election cycles instead of rebuilding separate layouts for every race and county.",
  /* Final related surface */
  relatedProject: {
    slug: "article-page-redesign",
    label:
      "Same platform: article experience, ads, engagement, and reader state →",
  },
  footerTagline:
    "Elections hub rebuilt for Arc XP—typed race data, county anchors, lightweight viz, and mobile-first grids for live returns.",
};

export const localElectionsHubProject = {
  ...getMissionGalleryManifestRow("local-elections-hub"),
  caseStudy: {
    ...baseLocalElectionsHubCaseStudy,
    ...localElectionsHubCaseStudyVariant,
  },
};
