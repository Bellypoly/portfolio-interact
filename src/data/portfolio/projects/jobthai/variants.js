import { ACTIVE_MISSION_GALLERY_VERSION } from "../../mission-gallery-version-config.js";

export const jobthaiCaseStudyVariants = Object.freeze({
  swe: Object.freeze({}),
  "data-reporter": Object.freeze({
    // eyebrow: "Data journalism · Marketplace",
    task: "Analyze job market trends from Thai marketplace data to inform civic platforms and newsroom reports on employment patterns." /* Overview */,
    overview: [
      "At national scale, the job isn't “show more rows.” It's whether someone can answer fast: Is this role for me? Is this employer real? Is applying worth the time? When those answers stay fuzzy, people bounce—or apply broadly without confidence the role actually fits.",
      "Search and recommendations shape the first half of that decision; resume tooling shapes the second. Search has to feel fast and legible under real filters (location, pay band, seniority). Resumes need guardrails so people finish, but not so much rigidity that every profile reads like the same template.",
      "At national scale, job platforms also become labor-information systems: geography, salary visibility, and hiring patterns shape how people understand opportunity long before they submit an application.",
      "In Thailand, “where?” rarely means a single city string — commuters care about BTS/MRT corridors, and manufacturing and logistics roles cluster near industrial estates (นิคมอุตสาหกรรม).",
      "JobThai drew on THiNKNET\u2019s map and POI layer so seekers could discover roles by geography the way they plan a commute, not only by typing a province name.",
      "I worked across that full arc — Elasticsearch-backed discovery, Laravel/MySQL-backed flows, and front-end surfaces in JavaScript — so browsing, targeted search, and apply-readiness (resume, alerts) each had the right density of controls under one coherent system.",
    ],
  }),
});

export const jobthaiCaseStudyVariant =
  jobthaiCaseStudyVariants[ACTIVE_MISSION_GALLERY_VERSION] ??
  jobthaiCaseStudyVariants.swe;
