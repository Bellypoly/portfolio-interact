/**
 * JerDi — Kids (Samart × NSTDA BIC competition) — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { jerdiKidsCaseStudyVariant } from "./variants.js";

const baseJerdiKidsCaseStudy = {
  /* Header / intro */
  eyebrow: "System design · UI/UX · Development · QR & BLE · Social impact",

  /* Media */
  featuredImg: "images/portfolio/jerdi/featured-image.png",
  featuredImgWebp: "images/portfolio/jerdi/featured-image.webp",

  featuredImageAlt:
    "JerDi hero — phone showing a child-finding map UI, QR wristband, found notification, quick-find QR callout, and family in a park",

  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",

  /* Project frame */
  task: "Design and build a hybrid QR/BLE child-safety system: QR wristbands any passerby can scan with a phone camera, paired with BLE bands detectable by receivers placed where coverage matters. Both paths feed one real-time notification flow for families, call centers, and authorities.",

  focus: [
    "System architecture",
    "UI/UX — mobile app & wristband touchpoint",
    "Software development — web platform & app",
    "BLE / QR prototyping",
    "Community platform design",
  ],

  context: "Young Technopreneur program — Samart × NSTDA BIC (2017)",

  /* Stack */
  techStack: [
    {
      label: "QR codes",
      href: "https://en.wikipedia.org/wiki/QR_code",
    },
    {
      label: "BLE beacons",
      href: "https://en.wikipedia.org/wiki/Bluetooth_Low_Energy_beacon",
    },
    {
      label: "Web platform",
      href: "https://developer.mozilla.org/en-US/docs/Web",
    },
    {
      label: "Real-time notifications",
      href: "https://en.wikipedia.org/wiki/Push_technology",
    },
  ],

  /* Impact */
  results: [
    {
      value: "Finalist",
      label: "Top 20 of 138 teams · NSTDA × Samart Young Technopreneur",
    },
    {
      value: "$900",
      label: "NSTDA × Samart development grant (฿30,000 THB)",
    },
  ],

  /* Overview */
  overviewTitle: "Overview",

  overview: [
    "JerDi plays on the Thai phrase “เจอดิ” (“found them!” / “there they are!”) and captures the project’s core promise: anyone nearby can help a family find their missing person.",

    "JerDi is a hybrid QR/BLE safety system built around two complementary paths. QR codes on wristbands let any bystander identify and report a sighting with a phone camera — no app required for the scan. BLE beacons on wristbands allow a missing person to be sensed when they come within range of a receiver.",

    "Receivers mean any listening device you control: a caregiver phone with the app, a tablet mounted on a school bus, a gateway at a school gate or hospital ward entrance, or Bluetooth-enabled kiosks in a mall or transit hub. Where you place receivers defines where passive detection is possible; both QR and BLE paths feed the same real-time notification pipeline to family, call center, and authorities.",

    "The project competed in the electronics & software industry track of the Young Technopreneur program (โครงการเถ้าแก่น้อยเทคโนโลยี), a national startup initiative co-run by Samart Group and NSTDA (National Science and Technology Development Agency) BIC. From 138 teams, the JerDi-Kids entry reached the final 20 and received a US$900 development grant (฿30,000).",

    {
      text: "Competition materials included the full ",
      externalLink: {
        href: "https://drive.google.com/file/d/1cQqFZYl-9I-GLykKMzgalBebXird2AuS/view?usp=drive_link",
        label: "JerDi business plan (PDF)",
      },
      after:
        " — market, operations, and rollout narrative as submitted to the program.",
    },
  ],

  /* What I did */
  strategyTitle: "What I did",

  strategyIntro:
    "My role covered system architecture for both QR and beacon flows, hands-on software development on the web platform and app, BLE hardware evaluation, caregiver UI/UX, wristband-facing design, and how those pieces read as one product.",

  pillars: [
    {
      title: "System architecture",

      body: "Designed unified pipelines for both paths: QR scan → backend → notifications to family, call center, and police, plus beacon proximity events from deployed receivers → the same backend so institutional and public scenarios shared one alert model. I implemented the client and integration layers for those flows in code, not only on paper.",
    },

    {
      title: "App & wristband UI/UX",

      body: "Structured application flows for high-stress use: clear alerts, map and status context, and paths for family and authorities without burying the main action. For the wristband, I treated the face as a UI surface: QR size and contrast for camera scan at arm’s length, brand and typography aligned with the app, and a layout that still reads when the band is partially obscured.",
    },

    {
      title: "BLE beacon prototyping",

      body: "Prototyped and evaluated commodity BLE beacon hardware, testing proximity accuracy, signal stability indoors versus outdoors, battery lifecycle, and real-world constraints: the band must be within radio range of a receiver, and a phone only helps if Bluetooth is on and scanning is available.",
    },

    {
      title: "QR + beacon as one product",

      body: "Documented how each mode fits different deployment contexts: QR scales to any smartphone with a camera for broad public participation; beacons pair with receivers you deploy for predictable coverage — school-bus roll call, clinic check-in, care-home perimeter alerts, or transit and retail footfall zones.",
    },
  ],

  /* Competition context */
  approachTitle: "The competition",

  approach: [
    "The Young Technopreneur program is a collaboration between Samart Group and NSTDA BIC designed to turn early-stage tech ideas into fundable businesses. It includes business training, an Idea-to-Market BootCamp, field research, and mentorship from marketing, finance, and technology experts.",

    "The JerDi-Kids entry entered the electronics & software track, cleared the field of 138 teams to reach the final 20, and was awarded the development grant for high-scoring finalists below the top-3 prize tier.",
  ],

  /* Showcase */
  showcase: {
    title: "On stage at Samart Innovation Awards",

    figureGridColumns: 2,

    mobile: [
      {
        img: "images/portfolio/jerdi/award-ceremony.png",

        imgWebp: "images/portfolio/jerdi/award-ceremony.webp",

        alt: "JerDi team receiving the development grant cheque at Samart Innovation Awards",

        caption:
          "Receiving the US$900 development grant at Samart Innovation Awards",
      },

      {
        img: "images/portfolio/jerdi/team.png",

        imgWebp: "images/portfolio/jerdi/team.webp",

        alt: "JerDi team selfie at the Young Technopreneur awards ceremony",

        caption:
          "Team photo at the award announcement — Young Technopreneur × NSTDA BIC",
      },
    ],
  },

  /* Outcome */
  outcome:
    "Architected, designed, and built a hybrid QR/BLE child-safety platform — mobile UI, wristband touchpoint, web platform, receiver-aware coverage model, and real-time notification flows.",

  footerTagline:
    "Hybrid QR/BLE safety system — scan in public, sense in covered spaces, and route sightings through one family-facing notification flow.",
};

export const jerdiKidsProject = {
  ...getMissionGalleryManifestRow("jerdi-kids"),
  /* Export */
  caseStudy: { ...baseJerdiKidsCaseStudy, ...jerdiKidsCaseStudyVariant },
};
