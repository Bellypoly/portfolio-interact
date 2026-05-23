import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const mapMagicCaseStudyVariants = Object.freeze({
  swe: Object.freeze({
    /* Header / intro */
    eyebrow: "Geospatial Platform · Routing · Maps",
    /* Media */
    featuredImg: "images/portfolio/map-magic/featured-image.png",
    featuredImgWebp: "images/portfolio/map-magic/featured-image.webp",
    featuredImageAlt:
      "MapMagic app promo — logo above two phones: map list (Silom Complex) and satellite view over an aerial golden-hour city; orange location pin focal point",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    /* Project frame */
    task: "Turn OpenStreetMap from a respectable starting line into a Thailand-native map platform: proprietary tiles and POI, dependable REST APIs for partners and first-party Android, internal capture/QA loops that fed production indexes, and routing that respected our graph and cost models—not whatever a generic global router imagines a soi should do.",
    focus: [
      "Map platform & APIs",
      "Routing & graph",
      "Field + back-office ops",
      "Geospatial UX",
    ],
    context: "THiNKNET Co., Ltd. · MapMagic (consumer brand: THiNKNET Maps)",
    /* Stack */
    techStack: [
      {
        label: "THiNKNET",
        href: "https://www.thinknet.co.th/",
      },
      {
        label: "THiNKNET Maps",
        href: "https://maps.thinknet.co.th/th",
      },
      {
        label: "OpenStreetMap",
        href: "https://wiki.openstreetmap.org/wiki/About_OpenStreetMap",
      },
      {
        label: "JOSM",
        href: "https://josm.openstreetmap.de/",
      },
      {
        label: "Map APIs, tiles, routing & geocoding",
        href: "https://en.wikipedia.org/wiki/Tiled_web_map",
      },
    ],
    /* Overview */
    overview: [
      "At THiNKNET the product line was MapMagic; today most people meet it as THiNKNET Maps in the browser. We started from OpenStreetMap because it gave us a credible geography to argue with—but Thailand is not a tutorial bbox. Heat, traffic, patchy mobile signal, and Thai addressing habits will embarrass lazy tiles, lazy POIs, and lazy routing faster than any QA script. The work was never only styling OpenStreetMap. We built the proprietary layer underneath—tiles, POI depth, capture tooling, and routing tuned for Thailand-specific road behavior—so the map felt local where accuracy actually mattered.",
      {
        text: "That stack quietly props up everyday products: map-grounded job search on JobThai, travel and editorial lines such as ",
        externalLink: {
          href: "https://www.naiin.com/search-result?title=THiNKNET",
          label: "printed THiNKNET guidebooks, highway atlases, and road maps",
        },
        after:
          "—still the kind of highway-first print drivers trust—plus other digital surfaces that reuse the same tiles, search, and routing muscle.",
      },
      "Reliable maps are also public-information systems: job search, travel, local discovery, routing, and civic access all depend on geospatial data people can actually trust.",
      "HotelGuide Thailand was one hospitality front built on the same footprint. The standalone app is retired, but the infrastructure underneath—tiles, POI, routing, APIs—did not retire with it; it still feeds THiNKNET\u2019s live map portfolio.",
      {
        text: "Today, most people encounter the stack through ",
        externalLink: {
          href: "https://maps.thinknet.co.th/th",
          label: "THiNKNET Maps",
        },
        after:
          ", where users can swap basemap moods without changing the road network underneath.",
      },
      {
        figureBlock: {
          img: "images/portfolio/map-magic/thinknet-maps-basemap-styles.png",
          imgWebp:
            "images/portfolio/map-magic/thinknet-maps-basemap-styles.webp",
          alt: "Examples of THiNKNET Maps basemap styles over the same Thailand viewport (e.g. Ivory, Hybrid, Charcoal, Cha Thai, Terrain, Cloudy)—illustrative, not a complete catalog.",
          caption:
            "Sample basemaps on THiNKNET Maps—same view, different styles; more options exist beyond this strip.",
        },
      },
      {
        text: "",
        externalLink: {
          href: "https://apkpure.com/mapmagic/com.thinknet.mapmagicgl",
          label: "The Map Magic Android client",
        },
        after:
          " was how we carried the map into the field—capture, lists, and detail screens on that familiar orange UI, all backed by the same APIs and database the desk-side tooling guarded.",
      },
      "My footprint was deliberately split: I owned the map API surface partners and the Android client actually called—REST contracts, tiles, search and geocoding, embed patterns that did not snap when data churned. I built the web and mobile back-office loops that moved field capture and QA into production tiles and search indexes. And I put serious time into the routing stack—graph usage, cost models, and algorithm behavior on OSM-derived geometry edited for Thailand—so previews and turn-by-turn did not fantasize turns the asphalt would refuse.",
    ],
    /* What I did */
    /* What I focused on */
    strategyTitle: "What I built",
    strategyIntro:
      "Two audiences, one database. Partners wanted map capabilities that felt boring in the best way—predictable REST, embeddings that did not rot when tiles revved, errors a human could action from a log. Ops wanted to move geometry and POIs from motorcycles and desk QA into production without playing telephone. OpenStreetMap bought us honesty on day one; the craft was everything we layered on top. Routing sat in the uncomfortable center—bad graph math does not hide behind copywriting, it shows up as a nonsense turn someone tries to drive.",
    pillars: [
      {
        title: "Data & operations",
        body: "I built the web and mobile flows that let teams capture in the field, review with a straight face, and publish into our database—THiNKNET-owned fields and QA gates, not a naive OSM import. When a bike or van was the wrong tool, we still edited the network in JOSM and ArcGIS Editor so geometry and connectivity were right before tiles and routing ate the change.",
      },
      {
        title: "Routing you can trust",
        body: "I contributed to the routing stack so paths honored our road graph and cost models—fewer fairy-tale detours or impossible maneuvers where Thai topology punishes generic global routers. The win was not a slick demo line; it was a preview you would actually follow.",
      },
      {
        title: "Platform ergonomics",
        body: "I tightened API vocabulary, error shapes, and examples so integrations failed in legible ways, and kept map UI patterns readable on a phone in glare—not a lab screenshot with perfect signal.",
      },
    ],
    /* How I shipped it */
    /* How it shipped */
    approachTitle: "How I shipped it",
    approach: [
      "Shipped hardened REST contracts, embedding patterns, rate limits, and attribution so partner embeds and first-party Android stayed upright when POIs and tiles moved underneath.",
      "Delivered back-office web and mobile capture/QA that fed production tiles and search indexes—field reality in, curated data out.",
      "Iterated routing graph usage and algorithm behavior on OSM-derived geometry with our cost models and Thailand-specific graph edits, plus docs and guardrails so new basemap skins did not quietly desync overlays.",
    ],
    /* Supporting gallery */
    galleryBlock: {
      title: "MapMagic Android — sign-in, discovery, field capture",
      figureColumns: 3,
      images: [
        {
          img: "images/portfolio/map-magic/mapmagic-android-login.png",
          imgWebp: "images/portfolio/map-magic/mapmagic-android-login.webp",
          alt: "MapMagic Android — login screen: orange and black mapmagic wordmark, username and password fields, orange LOGIN button, forgot password and create account links.",
          caption:
            "Operator entry point — branded sign-in for the same Android client used in the field.",
        },
        {
          img: "images/portfolio/map-magic/mapmagic-android-silom-map-list.png",
          imgWebp:
            "images/portfolio/map-magic/mapmagic-android-silom-map-list.webp",
          alt: "MapMagic Android — split view: street map of Bangkok Silom with orange POI pins and blue user location dot; scrollable list below showing Thai place names and “Found 140 locations.”",
          caption:
            "Map-backed discovery — Silom area with pins synced to a counted result list (Thai UI).",
        },
        {
          img: "images/portfolio/map-magic/mapmagic-android-detail-capture.png",
          imgWebp:
            "images/portfolio/map-magic/mapmagic-android-detail-capture.webp",
          alt: "MapMagic Android — Detail screen: map with orange pin over Soi Silom area, photo thumbnail of an industrial building, Name field filled with Thai text “โรงงาน” (factory), Save action.",
          caption:
            "Field-style capture — pin on map, on-site photo, and localized naming before save (Thai labels).",
        },
      ],
      caption:
        "2018-era MapMagic Android—the pocket half of the same stack (REST, tiles, routing) that desk-side QC guarded. Legacy web back-office UIs from that period are not pictured here.",
    },
    /* Impact */
    results: null,
  }),
  "data-reporter": Object.freeze({
    /* Header / intro */
    eyebrow: "Geospatial Platform · Routing · Field Operations",
    /* Media */
    featuredImg: "images/portfolio/map-magic/featured-image.png",
    featuredImgWebp: "images/portfolio/map-magic/featured-image.webp",

    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",

    featuredImageSource: {
      prefix: "Map platform",
      href: "https://maps.thinknet.co.th/th",
      label: "THiNKNET Maps",
    },

    /* Project frame */
    task: "Turn OpenStreetMap from a respectable starting line into a Thailand-native map platform: proprietary tiles and POI, dependable REST APIs for partners and first-party Android, internal capture and QA loops feeding production indexes, and routing that respected our graph and cost models—not whatever a generic global router imagines a soi should do.",

    focus: [
      "Map platform & APIs",
      "Routing & graph",
      "Field + back-office operations",
      "Geospatial UX",
    ],

    context: "THiNKNET Co., Ltd. · MapMagic (consumer brand: THiNKNET Maps)",

    /* Stack */
    techStack: [
      {
        label: "THiNKNET Maps",
        href: "https://maps.thinknet.co.th/th",
      },
      {
        label: "OpenStreetMap",
        href: "https://www.openstreetmap.org/",
      },
      {
        label: "JOSM",
        href: "https://josm.openstreetmap.de/",
      },
      {
        label: "Map APIs",
        href: "https://maps.thinknet.co.th/",
      },
      {
        label: "Routing & geocoding",
        href: "https://wiki.openstreetmap.org/wiki/Routing",
      },
    ],

    /* Overview */
    overviewTitle: "Overview",

    overview: [
      "At THiNKNET the product line was MapMagic; today most people meet it as THiNKNET Maps in the browser. We started from OpenStreetMap because it gave us a credible geography to argue with—but Thailand is not a tutorial bbox. Heat, traffic, patchy mobile signal, and Thai addressing habits will embarrass lazy tiles, lazy POIs, and lazy routing faster than any QA script.",
      "The work was never “skin OSM”; it was building the proprietary layer underneath—tiles, POI depth, capture tooling, and routing tuned for Thailand-specific road behavior—so the map felt local where accuracy actually mattered.",
      "Reliable maps are also public-information systems: job search, travel, local discovery, routing, and civic access all depend on geospatial data people can actually trust.",
      "That stack quietly props up everyday products: map-grounded job search on JobThai, travel and editorial lines such as printed THiNKNET guidebooks, highway atlases, and road maps—plus other digital surfaces reusing the same tiles, search, and routing muscle.",
      "HotelGuide Thailand was one hospitality front built on the same footprint. The standalone app is retired, but the infrastructure underneath—tiles, POI, routing, APIs—did not retire with it; it still feeds THiNKNET’s live map portfolio.",
      "Today, most people encounter the stack through THiNKNET Maps, where users can swap basemap moods without changing the road network underneath.",
    ],

    /* System design */
    overviewSystemDesign: {
      sectionTitle: "Operational map stack",
      intro:
        "Field capture, QA, routing, and APIs operating on the same Thailand-specific map infrastructure.",
      diagram: [
        "Field capture operations",
        "Android client · POI edits · on-site photos",
        "↓",
        "QA + back-office review",
        "Geometry validation · POI verification · graph edits",
        "↓",
        "Production geospatial data",
        "Tiles · POI indexes · routing graph",
        "↓",
        "Platform APIs",
        "Search · geocoding · embeds · REST contracts",
        "↓",
        "Consumer + partner surfaces",
        "THiNKNET Maps · JobThai · Android · partner embeds",
        "↓",
        "Routing + discovery",
        "Thailand-specific graph + cost models",
      ],
      caption:
        "One operational map stack: field reality flows through QA and graph edits into production tiles, APIs, routing, and consumer surfaces.",
      diagramAlt:
        "Flow from Android field capture through QA review, production map data, REST APIs, and routing into THiNKNET Maps and partner applications.",
    },

    /* Problem */
    problemSection: {
      title: "The challenge",
      paragraphs: [
        "Two audiences, one database. Partners wanted map capabilities that felt boring in the best way—predictable REST, embeddings that did not rot when tiles revved, and errors a human could action from a log. Ops wanted geometry and POIs to move from motorcycles and desk QA into production without playing telephone.",
        "Routing sat in the uncomfortable center—bad graph math does not hide behind copywriting; it shows up as a nonsense turn someone tries to drive.",
        "Thailand-specific topology punished generic global assumptions quickly: sois, frontage roads, informal turns, inconsistent addressing, and mobile conditions all exposed weak graph logic faster than a demo environment ever would.",
      ],
    },

    /* What I focused on */
    strategyTitle: "What I built",

    pillars: [
      {
        title: "Data & operations",
        body: "Built web and mobile flows that let teams capture in the field, review with QA gates, and publish into production geospatial indexes—not a naive OSM import. Edited geometry and connectivity in JOSM and ArcGIS Editor so routing and tiles reflected real road behavior before deployment.",
      },
      {
        title: "Routing & graph behavior",
        body: "Contributed to routing logic and graph behavior so paths honored Thailand-specific road constraints and cost models—fewer impossible maneuvers, broken previews, or fantasy detours where generic global routers failed local topology.",
      },
      {
        title: "Platform APIs & embeds",
        body: "Owned REST contracts, tiles, search, and geocoding surfaces consumed by Android clients and partner embeds. Tightened API vocabulary, error shapes, attribution, and embedding patterns so integrations failed in legible ways instead of silently drifting out of sync.",
      },
      {
        title: "Geospatial UX",
        body: "Worked across map UI patterns on Android and web so discovery, routing previews, and POI detail views stayed readable under glare, weak mobile signal, and dense urban map conditions—not lab-perfect screenshots.",
      },
    ],

    /* How it shipped */
    approachTitle: "How I shipped it",

    approach: [
      "Shipped hardened REST contracts, embedding patterns, attribution handling, and rate limits so partner embeds and first-party Android stayed stable when tiles and POI changed underneath.",
      "Delivered web and mobile back-office capture/QA loops that moved field reality into production search indexes and routing graphs—curated operational data in, dependable map surfaces out.",
      "Iterated routing graph behavior on OSM-derived geometry with Thailand-specific graph edits, cost models, and operational guardrails so new basemap styles did not quietly desync overlays or routing behavior.",
    ],

    showcase: {
      title: "Field operations · Android capture client",
      figureGridColumns: 3,
      mobile: [
        {
          img: "images/portfolio/map-magic/mapmagic-android-login.png",
          imgWebp: "images/portfolio/map-magic/mapmagic-android-login.webp",
          alt: "MapMagic Android sign-in screen used by field operators and QA teams.",
          caption:
            "Operator entry point — Android client connected to the same production geospatial infrastructure used across partner and consumer surfaces.",
        },
        {
          img: "images/portfolio/map-magic/mapmagic-android-silom-map-list.png",
          imgWebp:
            "images/portfolio/map-magic/mapmagic-android-silom-map-list.webp",
          alt: "Map-backed Android discovery flow showing POI pins and synchronized result lists in Thai.",
          caption:
            "Map-backed discovery — localized POI synchronized with counted search results and routing previews.",
        },
        {
          img: "images/portfolio/map-magic/mapmagic-android-detail-capture.png",
          imgWebp:
            "images/portfolio/map-magic/mapmagic-android-detail-capture.webp",
          alt: "Field capture screen with pin placement, on-site photo attachment, and Thai POI naming.",
          caption:
            "Field-style capture — map pinning, on-site imagery, and localized naming before QA and production publication.",
        },
      ],
    },

    outcomeSectionTitle: "Infrastructure outcome",

    outcome:
      "Thailand map infrastructure I helped build: REST map APIs, proprietary tiles and POI, Android field capture, and routing that survives real Bangkok traffic—not demo coordinates.",

    relatedProject: {
      slug: "jobthai",
      label:
        "Same geospatial foundation applied to marketplace discovery and job search →",
    },
    /* Footer */
    footerTagline:
      "Thailand map infrastructure I helped build—REST APIs, proprietary tiles and POI, Android field capture, and routing that survives real Bangkok traffic—not demo coordinates.",
  }),
});

export const mapMagicCaseStudyVariant =
  mapMagicCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  mapMagicCaseStudyVariants.swe;
