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
    "JerDi hero — Stay Connected Stay Safe tagline, phone showing Finding JerDi-Kid map UI with Navigate and Play Sound, QR wristband, Found notification, Quick Find QR callout, family in park",
  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",
  /* Project frame */
  task: "Design and build a community-driven safety net: QR wristbands any passerby can scan with a camera, BLE bands heard by receivers you place where coverage matters (caregiver phones, tablets on a school bus, fixed gateways)—one notification backbone for families, call centers, and authorities. I owned caregiver UI/UX (alerts, maps, status), the wristband face (QR legibility and finish, consistent with the app), and hands-on engineering—the web platform and app UI in production code with integrations, not handoff-only mocks.",
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
      value: "$900",
      label: "Development grant (฿30,000 THB)",
    },
    { value: "Consolation Prize", label: "Final round — 138 teams entered" },
  ],
  /* Overview */
  overviewTitle: "Overview",
  overview: [
    "JerDi plays on Thai เจอ — colloquially \u201cfound\u201d or \u201cran into\u201d someone — the name captures the core promise: anyone nearby can help a family find their missing person.",
    "JerDi is a community-driven platform built on two complementary technologies: QR codes on wristbands so any bystander can identify and report a sighting with a phone camera — no app required for the scan — and BLE beacons on wristbands so a missing person can be sensed when they come within range of a receiver. Receivers mean any listening device you control: a caregiver phone with the app, a tablet mounted on a school bus, a gateway at a school gate or hospital ward entrance, or Bluetooth-enabled kiosks in a mall or transit hub. Where you place receivers defines where passive detection is possible; both paths feed the same real-time notification pipeline to family, call center, and authorities.",
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
  /* What I focused on */
  strategyTitle: "What I did",
  strategyIntro:
    "My role covered system architecture for both QR and beacon flows, hands-on software development on the web platform and app, BLE hardware evaluation, UI/UX for the app and the wearable surface, and how those pieces read as one product.",
  pillars: [
    {
      title: "System architecture",
      body: "I designed unified pipelines for both paths: QR scan\u2192backend\u2192notifications to family, call center, and police, plus beacon proximity events from deployed receivers\u2192the same backend so institutional and public scenarios share one alert model. I implemented the client and integration layers for those flows in code, not only on paper. The QR path maximizes reach; the beacon path adds passive detection wherever listening hardware or apps are in range.",
    },
    {
      title: "App & wristband UI/UX",
      body: "For the application I structured flows for high-stress use: clear alerts, map and status context, and paths for family and authorities without burying the main action. For the wristband I treated the face as a UI surface: QR size and contrast for camera scan at arm\u2019s length, brand and typography aligned with the app, and a layout that still reads when the band is partially obscured. The goal was one mental model — scan in public, sense in covered spaces — expressed consistently on glass and on the band.",
    },
    {
      title: "BLE beacon prototyping",
      body: "I prototyped and evaluated commodity BLE beacon hardware, testing proximity accuracy, signal stability indoors vs outdoors, battery lifecycle, and real-world constraints: the missing person\u2019s band must be within radio range of a receiver, and someone\u2019s phone only helps if Bluetooth is on and the app or OS can scan — which is why fixed or vehicle-mounted receivers (e.g. a school-bus tablet) matter for predictable coverage.",
    },
    {
      title: "QR + beacon as one product",
      body: "The project deliberately uses both QR codes and beacon technology: QR scales to any smartphone with a camera for broad public participation; beacons pair with receivers you deploy for coverage you design — e.g. roll call on a school bus route, check-in at a clinic lobby, perimeter alerts at a care home, or footfall zones in retail and transit. I documented how each mode fits different deployment contexts while keeping a single family-facing experience.",
    },
  ],
  /* Competition context */
  /* How it shipped */
  approachTitle: "The competition",
  approach: [
    "The Young Technopreneur program is a collaboration between Samart Group and NSTDA BIC designed to turn early-stage tech ideas into fundable businesses. It runs 48 hours of business training, an Idea-to-Market BootCamp, field research, and mentorship from marketing, finance, and technology experts.",
    "The JerDi-Kids entry entered the electronics & software track, cleared the field of 138 teams to reach the final 20, and was awarded the $900 development grant (฿30,000) — the funding tier for the highest-scoring finalists below the top-3 prize podium.",
  ],
  /* Final result */
  showcase: {
    title: "On stage at Samart Innovation Awards",
    figureGridColumns: 2,
    mobile: [
      {
        img: "images/portfolio/jerdi/award-ceremony.png",
        imgWebp: "images/portfolio/jerdi/award-ceremony.webp",
        alt: "JerDi team receiving the ฿30,000 development grant cheque at Samart Innovation Awards",
        caption:
          "Receiving the ฿30,000 development grant (~$900) at Samart Innovation Awards",
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
};

export const jerdiKidsProject = {
  ...getMissionGalleryManifestRow("jerdi-kids"),
  /* Export */
  caseStudy: { ...baseJerdiKidsCaseStudy, ...jerdiKidsCaseStudyVariant },
};
