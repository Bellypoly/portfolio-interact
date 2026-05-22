/**
 * Texas Tech "My Hometown" juried photography exhibit — portfolio entry + case study.
 */

import { getMissionGalleryManifestRow } from "../../mission-gallery-manifest.js";
import { photoCompetitionMyHometownCaseStudyVariant } from "./variants.js";

const basePhotoCompetitionMyHometownCaseStudy = {
  /* Header / intro */
  eyebrow: "Photography · Cultural Documentation · Competition Entry",
  /* Media */
  featuredImg:
    "images/portfolio/photo-competition-my-hometown/amphawa-floating-market.png",
  featuredImgWebp:
    "images/portfolio/photo-competition-my-hometown/amphawa-floating-market.webp",
  featuredImageAlt:
    "Amphawa Floating Market — boats on canal with vendors, palm trees, and traditional Thai architecture in golden hour light.",
  featuredImageCompact: true,
  /* Project frame */
  task: "Document cultural heritage through photography: capture the essence of Amphawa Floating Market and submit to Texas Tech's 'My Hometown' juried photography exhibit.",
  focus: ["Photography", "Cultural documentation", "Visual storytelling"],
  context: "Texas Tech University · 'My Hometown' Photography Competition",
  /* Stack */
  techStack: [
    {
      label: "Digital photography",
      href: "https://en.wikipedia.org/wiki/Digital_photography",
    },
    {
      label: "Adobe Lightroom",
      href: "https://www.adobe.com/products/photoshop-lightroom.html",
    },
  ],
  /* Impact */
  results: [
    {
      value: "Juried",
      label: "Accepted into Texas Tech exhibit",
    },
  ],
  /* Overview */
  overview: [
    "Captured the vibrant culture of Amphawa Floating Market through photography, documenting traditional Thai market life, architecture, and community interactions.",
  ],
  /* What I did */
  /* What I focused on */
  strategyTitle: "What I did",
  pillars: [
    {
      title: "Cultural documentation",
      body: "Photographed traditional market scenes, vendors, and architecture to preserve cultural heritage.",
    },
    {
      title: "Visual storytelling",
      body: "Composed images to tell stories of daily life and community in Amphawa.",
    },
  ],
  /* How I approached it */
  /* How it shipped */
  approachTitle: "How I approached it",
  approach: [
    "Visited the market during golden hour, used natural light, and edited photos to highlight cultural elements.",
  ],
};

export const photoCompetitionMyHometownProject = {
  ...getMissionGalleryManifestRow("photo-competition-my-hometown"),
  /* Export */
  caseStudy: {
    ...basePhotoCompetitionMyHometownCaseStudy,
    ...photoCompetitionMyHometownCaseStudyVariant,
  },
};
