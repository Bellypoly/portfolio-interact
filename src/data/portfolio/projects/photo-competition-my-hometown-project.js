/**
 * Texas Tech "My Hometown" juried photography exhibit — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../mission-gallery-manifest.js";

export const photoCompetitionMyHometownProject = {
  ...getMissionGalleryManifestRow("photo-competition-my-hometown"),
  caseStudy: {
    eyebrow: "Photography · Cultural Documentation · Competition Entry",
    featuredImg:
      "images/portfolio/photo-competition-my-hometown/amphawa-floating-market.png",
    featuredImgWebp:
      "images/portfolio/photo-competition-my-hometown/amphawa-floating-market.webp",
    featuredImageAlt:
      "Amphawa Floating Market at dusk—elevated view along the canal, boats, wooden buildings on stilts, warm shop lights on the water",
    featuredImageCompact: true,
    featuredImageObjectPosition: "center center",
    task: "In the \"My Hometown\" Photography Exhibit (virtual exhibit, September–October 2020), I received 2nd runner-up for Amphawa Floating Market in Samutsongkhram, Thailand, and a consolation prize for the sunken temple in Kanchanaburi. The exhibit is a juried photography contest for international students at Texas Tech University—a chance to share images from home, shown each year with the Adventures in Study Abroad exhibit.",
    disciplines: [
      "Photography",
      "Cultural representation",
      "Competition entry",
    ],
    context:
      "Texas Tech University — My Hometown Photography Exhibit, virtual show, September–October 2020",
    /** Case study footer line (otherwise the card `desc` repeats here). */
    footerTagline:
      "Two placings from one virtual season—Amphawa and the sunken temple—still read as my answer to what \"home\" looks like through a lens.",
    techStack: [], // No tech stack for photography
    approachTitle: "How I approached the entry",
    approach: [
      "I submitted two real photos from Thailand to show two sides of home: busy evening life at Amphawa Floating Market and quiet stillness at the sunken temple in Kanchanaburi. Both images are original captures with no filters and no post-processing adjustments.",
    ],
    results: [
      {
        value: "2nd Runner-up",
        label:
          "Amphawa Floating Market — Samutsongkhram, Thailand (virtual exhibit, Sept.–Oct. 2020)",
      },
      {
        value: "Consolation Prize",
        label:
          "The Sunken Temple — Kanchanaburi, Thailand (virtual exhibit, Sept.–Oct. 2020)",
      },
    ],
    overview: [
      "The My Hometown exhibit is a juried photography contest for international students at Texas Tech. It offers a platform to share images from home and is presented with the Adventures in Study Abroad exhibit each year. In 2020 the show ran as a virtual exhibit (September–October). I received 2nd runner-up for the lead image, Amphawa Floating Market in Samutsongkhram, and a consolation prize for the sunken temple photograph from Kanchanaburi below.",
      {
        text: "Background on the program and past years of the show: ",
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
          alt: "The Sunken Temple in Kanchanaburi, Thailand",
          caption:
            "The sunken temple at Wat Saam Prasob, Kanchanaburi — my consolation prize, My Hometown (2020).",
        },
      },
      "That was the full pair I showed in 2020—night market light on the water, then quiet mist over the reservoir—two bookmarks for Thailand, juried alongside classmates telling their own hometown stories.",
    ],
  },
};
