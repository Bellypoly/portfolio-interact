/**
 * Local Elections Hub (DMN, 2022 rebuild) — portfolio entry + case study.
 * Extracted from portfolio-projects.js for maintainability.
 */

export const localElectionsHubProject = {
  slug: "local-elections-hub",
  portfolioGroup: "professional",
  portfolioYear: 2022,
  portfolioLabel: "Product",
  name: "Local Elections Hub",
  desc: "Elections hub rebuilt for Arc XP—typed race data, county anchors, lightweight viz, and mobile-first grids for live returns.",
  img: "images/portfolio/local-elections-hub/thumbnail.png",
  imgWebp: "images/portfolio/local-elections-hub/thumbnail.webp",
  cardImagePosition: "center top",
  alt: "Illustration — hand placing a marked ballot into a ballot box on a patterned background",
  caseStudy: {
    eyebrow: "Product · Data UI · Newsroom",
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
      "Election night is deadline journalism: readers refresh, editors watch the same tables, and a fragmented hub burns trust fast. After AMP and alongside broader Arc XP work, I rebuilt the hub as one coherent, data-driven system—counties, races, and candidates mapped to reusable components instead of a bespoke page per contest.",
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
};
