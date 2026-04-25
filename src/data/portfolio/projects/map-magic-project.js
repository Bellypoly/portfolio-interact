/**
 * MapMagic / THiNKNET Maps — portfolio entry + case study.
 * Extracted from portfolio-projects.js for maintainability.
 */

export const mapMagicProject = {
  slug: "map-magic",
  portfolioGroup: "professional",
  portfolioYear: 2018,
  portfolioLabel: "Platform",
  name: "MapMagic",
  desc: "Thailand map infrastructure I helped build—REST map APIs, custom tiles and POI, field Android capture, and routing that survives real Bangkok traffic, not demo coordinates.",
  img: "images/portfolio/map-magic/thumbnail.png",
  imgWebp: "images/portfolio/map-magic/thumbnail.webp",
  alt: "Isometric mapping toolkit on orange — laptop, phone with city pins, world-map screen, 360 street-view car, connected nodes and logo on tiered blocks",
  link: "https://maps.thinknet.co.th/th",
  caseStudy: {
    eyebrow: "Platform · Geospatial",
    featuredImg: "images/portfolio/map-magic/featured-image.png",
    featuredImgWebp: "images/portfolio/map-magic/featured-image.webp",
    featuredImageAlt:
      "MapMagic app promo — logo above two phones: map list (Silom Complex) and satellite view over an aerial golden-hour city; orange location pin focal point",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    task: "Turn OpenStreetMap from a respectable starting line into a Thailand-native map platform: proprietary tiles and POI, dependable REST APIs for partners and first-party Android, internal capture/QA loops that fed production indexes, and routing that respected our graph and cost models—not whatever a generic global router imagines a soi should do.",
    disciplines: [
      "Map platform & APIs",
      "Routing & graph",
      "Field + back-office ops",
      "Geospatial UX",
    ],
    context: "THiNKNET Co., Ltd. · MapMagic (consumer brand: THiNKNET Maps)",
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
    overview: [
      "At THiNKNET the product line was MapMagic; today most people meet it as THiNKNET Maps in the browser. We started from OpenStreetMap because it gave us a credible geography to argue with—but Thailand is not a tutorial bbox. Heat, traffic, patchy mobile signal, and Thai addressing habits will embarrass lazy tiles, lazy POIs, and lazy routing faster than any QA script. The work was never “skin OSM”; it was building the proprietary layer—tiles, POI depth, capture tooling, and a router that understood our graph—so the map felt local when it mattered.",
      {
        text: "That stack quietly props up everyday products: map-grounded job search on JobThai, travel and editorial lines such as ",
        externalLink: {
          href: "https://www.naiin.com/search-result?title=THiNKNET",
          label: "printed THiNKNET guidebooks, highway atlases, and road maps",
        },
        after:
          "—still the kind of highway-first print drivers trust—plus other digital surfaces that reuse the same tiles, search, and routing muscle.",
      },
      "HotelGuide Thailand was one hospitality front built on the same footprint. The standalone app is retired, but the infrastructure underneath—tiles, POI, routing, APIs—did not retire with it; it still feeds THiNKNET\u2019s live map portfolio.",
      {
        text: "The public map most people open today is ",
        externalLink: {
          href: "https://maps.thinknet.co.th/th",
          label: "THiNKNET Maps",
        },
        after:
          ", where you can swap basemap moods without swapping the road network underneath.",
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
    strategyTitle: "What I did",
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
    approachTitle: "How I shipped it",
    approach: [
      "Shipped hardened REST contracts, embedding patterns, rate limits, and attribution so partner embeds and first-party Android stayed upright when POIs and tiles moved underneath.",
      "Delivered back-office web and mobile capture/QA that fed production tiles and search indexes—field reality in, curated data out.",
      "Iterated routing graph usage and algorithm behavior on OSM-derived geometry with our cost models and Thailand-specific graph edits, plus docs and guardrails so new basemap skins did not quietly desync overlays.",
    ],
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
    results: null,
  },
};
