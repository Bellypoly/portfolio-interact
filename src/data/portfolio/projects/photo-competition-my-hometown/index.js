/**
 * Texas Tech "My Hometown" juried photography exhibit — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { photoCompetitionMyHometownCaseStudyVariant } from "./variants.js";

const basePhotoCompetitionMyHometownCaseStudy = {
  /* Header / intro */
  eyebrow:
    "Photography · Cultural Documentation · International Student Exhibit",

  /* Media */
  featuredImg:
    "images/portfolio/photo-competition-my-hometown/amphawa-floating-market.png",

  featuredImgWebp:
    "images/portfolio/photo-competition-my-hometown/amphawa-floating-market.webp",

  featuredImageAlt:
    "Amphawa Floating Market at dusk — elevated canal view with boats, wooden buildings on stilts, and warm shop lights reflecting on the water",

  featuredImageCompact: true,
  featuredImageObjectPosition: "center center",

  /* Project frame */
  task: "Submit photographs from Thailand to Texas Tech’s juried My Hometown exhibit — using Amphawa Floating Market and the sunken temple in Kanchanaburi to represent two different atmospheres of home.",

  focus: ["Photography", "Cultural representation", "Visual storytelling"],

  context:
    "Texas Tech University — My Hometown Photography Exhibit, virtual show, September–October 2020",

  /* Stack */
  techStack: [
    {
      label: "Digital photography",
      href: "https://en.wikipedia.org/wiki/Digital_photography",
    },
  ],

  /* Impact */
  results: [
    {
      value: "2nd Runner-up",
      label: "Amphawa Floating Market — Samutsongkhram, Thailand",
    },

    {
      value: "Consolation Prize",
      label: "The Sunken Temple — Kanchanaburi, Thailand",
    },
  ],

  resultsLabelCase: "sentence",

  /* Overview */
  overview: [
    "The My Hometown exhibit is a juried photography program for international students at Texas Tech University, presented alongside the Adventures in Study Abroad exhibit each year. In 2020 the exhibition ran virtually during September–October.",

    "I submitted two photographs from Thailand that reflected very different emotional textures of home: evening movement and warm light along Amphawa Floating Market, and the quiet stillness of the sunken temple at Wat Saam Prasob in Kanchanaburi.",

    "The Amphawa image received 2nd runner-up recognition, while the sunken-temple photograph received a consolation prize. Together, the pair became a small visual contrast between density and emptiness, movement and stillness, market light and reservoir mist.",

    {
      text: "Background on the program and past years of the exhibit: ",

      externalLink: {
        href: "https://www.depts.ttu.edu/international/intlopr/exhibits/my-hometown/",

        label: "My Hometown exhibit — Texas Tech International Programs",
      },

      after: ".",
    },

    {
      mediaBlock: {
        type: "image",

        src: "images/portfolio/photo-competition-my-hometown/the-sunken-temple.png",

        imgWebp:
          "images/portfolio/photo-competition-my-hometown/the-sunken-temple.webp",

        alt: "The sunken temple at Wat Saam Prasob in Kanchanaburi, Thailand, surrounded by mist and reservoir water",

        caption:
          "The sunken temple at Wat Saam Prasob, Kanchanaburi — consolation prize, My Hometown exhibit (2020).",
      },
    },

    "That was the full pair I showed in 2020 — night market light on the water, then quiet mist over the reservoir — two bookmarks for Thailand, juried alongside classmates telling their own hometown stories.",
  ],

  /* Approach */
  approachTitle: "How I approached the entry",

  approach: [
    "I photographed both locations as lived environments rather than tourist postcards: crowd flow and canal movement at Amphawa, then open water and silence at the reservoir in Kanchanaburi.",

    "Both photographs relied primarily on natural light and restrained editing in Lightroom so the atmosphere, color, and lighting stayed close to how the places felt in person.",
  ],

  /* Footer */
  footerTagline:
    "Two placings from one virtual season — Amphawa and the sunken temple — still read as my answer to what “home” looks like through a lens.",
};

export const photoCompetitionMyHometownProject = {
  ...getMissionGalleryManifestRow("photo-competition-my-hometown"),
  /* Export */
  caseStudy: {
    ...basePhotoCompetitionMyHometownCaseStudy,
    ...photoCompetitionMyHometownCaseStudyVariant,
  },
};
