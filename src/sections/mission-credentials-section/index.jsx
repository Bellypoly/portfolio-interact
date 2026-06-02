import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import cc from "classcat";
import {
  EducationCard,
  AchievementCard,
} from "../../components/education-card";
import "./mission-credentials-section.css";

function missionGalleryLink(slug, label) {
  return { type: "missionLink", slug, label };
}

function externalSourceLine(announcementHref, label) {
  return { type: "externalSourceLine", href: announcementHref, label };
}

function timelineYear(year) {
  return { type: "year", value: `[${year}]` };
}

const INMA_ORGANIZATION = "International News Media Association";
const INMA_2024_ANNOUNCEMENT =
  "https://www.inma.org/press-release.cfm?article=INMA-unveils-40-first--place-winners-at-the-Global-Media-Awards";
const INMA_2024_CASE_STUDY =
  "https://www.inma.org/best-practice/Advertising-Sales-and-Retention/2024-566/Digital-Replica-Revenue-Growth-to-Future-Proof-Local-Journalism";
const INMA_2023_ANNOUNCEMENT =
  "https://www.inma.org/blogs/main/post.cfm/inma-announces-finalists-for-2023-global-media-awards";
const LOCALGRAF_CASE_STUDY =
  "https://www.inma.org/best-practice/Best-Product-Iteration/2023-641/LocalGraf-Internal-database-linking-from-inside-stories";

function withYearSpan(bullets) {
  return (
    bullets?.map((b) => {
      if (typeof b !== "string") return b;

      return b.replace(
        /\[\d{4}\]/g,
        (m) => `<span class="timeline-bullet-year">${m}</span>`,
      );
    }) ?? []
  );
}

const EDUCATION_ITEMS = [
  {
    anchor: "edu-ttu",
    sortYear: 2020,
    collapsible: true,
    title: "M.S. in Computer Science",
    time: "2019 - 2020",
    org: "Texas Tech University",
    where: "Lubbock, TX, USA",
    bullets: [
      {
        summary: "On Simulating Energy Consumption of Federated Learning Systems",
        detail: [
          timelineYear(2020),
          " ",
          missionGalleryLink("federated-learning-energy", "federated learning energy"),
          " Pioneered simulations of federated edge learning systems using NOMA protocols in MATLAB, exploring the energy and time trade-offs that shape the future of distributed AI. Leveraged convolutional neural networks (CNNs) to minimize loss functions and optimize model performance, uncovering new strategies for efficient, scalable AI workloads. ",
        ],
      },
      {
        summary: "Discovering Fake Drivers Based on Temporal Driving Behaviors",
        detail: [
          timelineYear(2020),
          " ",
          missionGalleryLink("rdfd", "fake driver detection"),
          " Built classification models and optimized data pipelines, demonstrating proficiency in large-scale feature extraction and pattern recognition.",
        ],
      },
      "Face-masked Recognition Model : [2020] Augmented the Labeled Faces in the Wild (LFW) dataset with simulated face-mask images to address the challenge of masked face recognition during COVID-19. Built and tested a computer vision model that improved robustness against facial occlusions, advancing research into more reliable recognition systems.",
      "Power Consumption Observation on Mobile Web Application : [2019] Developed a React Native mobile application framework to measure and analyze real-time power consumption across mobile websites and devices. Implemented background data collection, local caching, and visualization features to assess battery usage patterns. Applied machine-learning models to predict browsing behavior and identify privacy-related risks, advancing research into energy-efficient, high-performance mobile experiences.",
    ],
  },
  {
    anchor: "edu-kmutt",
    sortYear: 2017,
    collapsible: true,
    title: "M.S. in Technopreneurship (Field Robotics)",
    time: "2015 - 2018",
    org: "Institute of Field Robotics : FIBO, King Mongkut's University of Technology Thonburi",
    where: "Bangkok, Thailand",
    badges: ["Publication"],
    bullets: [
      "Development of Logistics Evaluation System for Industrial Thailand Performance : [2018] Created a decision-support system using causal loop modeling to evaluate Thailand's Logistics Performance Indexes (LPIs). Research outcomes provided insights for policymakers and were applied as guidelines to enhance national industrial logistics performance.",
      {
        summary:
          "Industrial Logistic Performance Evaluation | A Case of Printing and Packaging Company in Thailand",
        detail: [
          timelineYear(2016),
          " Developed a decision-support model for Thailand's top printing and packaging industry, focusing on logistics performance improvement. Led the creation of a model to evaluate and enhance key indicators in cost, time, and reliability, delivering actionable strategies to boost industry competitiveness.",
          missionGalleryLink(
            "industrial-logistics-evaluation",
            "industrial logistics evaluation",
          ),
        ],
      },
    ],
  },
  {
    anchor: "edu-stou",
    sortYear: 2016,
    collapsible: true,
    title: "B.B.A. in Marketing",
    time: "2011 - 2017",
    org: "Sukhothai Thammathirat Open University",
    where: "Bangkok, Thailand",
  },
  {
    anchor: "edu-kmutt-beng",
    sortYear: 2014,
    collapsible: true,
    title: "B.Eng. in Computer Engineering",
    time: "2010 - 2014",
    org: "King Mongkut's University of Technology Thonburi",
    where: "Bangkok, Thailand",
    badges: ["Second Class Honor"],
  },
];

const ACHIEVEMENT_ITEMS = [
  {
    sortYear: 2024,
    title: "3rd Place (Global) — Best Idea to Grow Advertising Sales",
    titleHref: INMA_2024_CASE_STUDY,
    time: "2024",
    org: `INMA Global Media Awards (${INMA_ORGANIZATION})`,
    where: "The Dallas Morning News",
    badges: ["Award"],
    missionLogs: [
      {
        summary:
          "Digital Replica Revenue Growth to Future Proof Local Journalism",
        detail: [
          "Work aligns with subscription systems ",
          missionGalleryLink("subscription-checkout-activation", "subscription"),
          ", paywall optimization ",
          missionGalleryLink("dynamic-paywall", "paywall"),
          ", and reader-revenue growth through product and monetization engineering. Execution focus: Replica growth strategy combined print-to-digital transition, hybrid subscription packaging, and stronger digital ad value. Attribution: Organization/project recognition - contributed to initiatives within the award-winning work. ",
          externalSourceLine(INMA_2024_ANNOUNCEMENT, "INMA award announcement"),
        ],
      },
    ],
  },
  {
    sortYear: 2023,
    title: "Finalist - Best Product Iteration",
    titleHref: LOCALGRAF_CASE_STUDY,
    time: "2023",
    org: `INMA Global Media Awards (${INMA_ORGANIZATION})`,
    where: "The Dallas Morning News",
    badges: ["Award"],
    missionLogs: [
      {
        summary: "LocalGraf - Internal Database Linking From Inside Stories",
        detail: [
          "Worked on newsroom entity-linking infrastructure connecting people, organizations, events, and places across article content and structured databases to power editorial discovery, contextual story relationships, and reusable newsroom knowledge systems ",
          missionGalleryLink("article-page-redesign", "article redesign"),
          ".",
          externalSourceLine(INMA_2023_ANNOUNCEMENT, "INMA finalist announcement"),
        ],
      },
    ],
  },
  {
    sortYear: 2020,
    title: "Recipient of J.T. and Margaret Talkington Graduate Fellowship",
    time: "2019 - 2020",
    org: "Texas Tech University",
    where: "Lubbock, TX, USA",
    badges: ["Scholarship"],
  },
  {
    sortYear: 2017,
    title: "Recipient of Petchra Prajomklao Graduate Scholarship",
    time: "2015 - 2017",
    org: "King Mongkut's University of Technology Thonburi",
    where: "Bangkok, Thailand",
    badges: ["Scholarship"],
  },
  {
    sortYear: 2018,
    title:
      "Consolation Prize — Young Technopreneur Innovative Business Plan Development Competition 2018",
    titleHref: "/mission/jerdi-kids",
    // portfolioAnchor: "portfolio-jerdi",
    time: "2017",
    org: "Samart Innovation Awards 2017",
    where: "Bangkok, Thailand",
    badges: ["Award"],
  },
  {
    sortYear: 2015,
    title:
      "Top 20 Teams — Young Technopreneur Innovative Business Plan Development Competition 2014",
    time: "2014",
    org: "Samart Innovation Awards 2014",
    where: "Bangkok, Thailand",
    badges: ["Award"],
  },
];

function buildTimelineRows(educationItems, achievementItems) {
  const byYear = new Map();
  const put = (item, key) => {
    const row = byYear.get(item.sortYear) ?? {
      sortYear: item.sortYear,
      educationItems: [],
      achievementItems: [],
      timelineAchievementFirstOnMobile: false,
    };
    if (item.timelineAchievementFirstOnMobile) {
      row.timelineAchievementFirstOnMobile = true;
    }
    row[key].push(item);
    byYear.set(item.sortYear, row);
  };
  for (const item of educationItems) put(item, "educationItems");
  for (const item of achievementItems) put(item, "achievementItems");
  return [...byYear.values()].sort((a, b) => b.sortYear - a.sortYear);
}

const TIMELINE_ROWS = buildTimelineRows(EDUCATION_ITEMS, ACHIEVEMENT_ITEMS);
const TIMELINE_RENDER_ROWS = TIMELINE_ROWS.map((row) => ({
  ...row,
  educationItems: row.educationItems.map((item) => ({
    ...item,
    bullets: withYearSpan(item.bullets),
  })),
}));

function SectionTitle() {
  return (
    <h2 className="section-title mission-credentials-title">
      <span className="mission-credentials-title__mission">Mission</span>
      <span className="mission-credentials-title__credentials">
        Credentials
      </span>
    </h2>
  );
}

const EASE_PANEL = [0.22, 1, 0.36, 1];
const ACHIEVEMENT_INTRO_START_PROGRESS = 0.26;

function timelineColumnTransition(reduceMotion) {
  return reduceMotion
    ? { duration: 0 }
    : { type: "tween", duration: 0.38, ease: EASE_PANEL };
}

function timelineRowIntroTransition(reduceMotion, delay) {
  return reduceMotion
    ? { duration: 0 }
    : {
        layout: { type: "tween", duration: 0.42, ease: EASE_PANEL },
        opacity: { type: "tween", duration: 0.68, delay, ease: EASE_PANEL },
        y: { type: "tween", duration: 0.68, delay, ease: EASE_PANEL },
      };
}

export default React.memo(function MissionCredentialsSection({
  sectionProgress,
}) {
  const [hasAchievementIntroPlayed, setHasAchievementIntroPlayed] =
    useState(false);
  const [shouldStaggerTimelineRows, setShouldStaggerTimelineRows] =
    useState(false);
  const hasAchievementIntroPlayedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const tCol = timelineColumnTransition(reduceMotion);

  useEffect(() => {
    const playTimelineIntro = () => {
      if (hasAchievementIntroPlayedRef.current) return;

      hasAchievementIntroPlayedRef.current = true;
      setHasAchievementIntroPlayed(true);
      setShouldStaggerTimelineRows(true);
    };

    if (!sectionProgress?.on) {
      hasAchievementIntroPlayedRef.current = true;
      setHasAchievementIntroPlayed(true);
      setShouldStaggerTimelineRows(false);
      return undefined;
    }

    if (sectionProgress.get?.() >= ACHIEVEMENT_INTRO_START_PROGRESS) {
      playTimelineIntro();
    }

    return sectionProgress.on("change", (value) => {
      if (value >= ACHIEVEMENT_INTRO_START_PROGRESS) {
        playTimelineIntro();
      } else if (value <= 0.02) {
        hasAchievementIntroPlayedRef.current = false;
        setHasAchievementIntroPlayed(false);
        setShouldStaggerTimelineRows(false);
      }
    });
  }, [sectionProgress]);

  let timelineRowIntroIndex = 0;

  return (
    <div className="edu-section">
      <SectionTitle />
      <div className="edu-timeline">
        <div className="edu-timeline__inner">
          <div className="edu-timeline__body">
            <AnimatePresence initial={false} mode="sync">
              {TIMELINE_RENDER_ROWS.map((row) => {
                const educationItems = row.educationItems ?? [];
                const achievementItems = row.achievementItems ?? [];
                const showEducationCol = educationItems.length > 0;
                const showAchievementCol = achievementItems.length > 0;

                if (!showEducationCol && !showAchievementCol) return null;

                const educationOnlyRow =
                  showEducationCol && !showAchievementCol;
                const achievementOnlyRow =
                  showAchievementCol && !showEducationCol;
                const showDot = showEducationCol || showAchievementCol;
                const rowIntroDelay = shouldStaggerTimelineRows
                  ? timelineRowIntroIndex * 0.13
                  : 0;
                timelineRowIntroIndex += 1;

                return (
                  <motion.div
                    layout
                    key={row.sortYear}
                    id={educationItems[0]?.anchor}
                    className={cc([
                      "edu-timeline__row",
                      educationOnlyRow && "edu-timeline__row--education-only",
                      row.timelineAchievementFirstOnMobile &&
                        "edu-timeline__row--achievement-first-mobile",
                    ])}
                    initial={false}
                    animate={
                      reduceMotion || hasAchievementIntroPlayed
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 36 }
                    }
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={timelineRowIntroTransition(
                      reduceMotion,
                      rowIntroDelay,
                    )}
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {showEducationCol ? (
                        <motion.div
                          key={`edu-${row.sortYear}`}
                          className="edu-timeline__education"
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0 }}
                          transition={tCol}
                        >
                          <div className="edu-timeline__content">
                            <div className="edu-timeline__stack">
                              {educationItems.map((education, i) => (
                                <EducationCard
                                  key={`${row.sortYear}-edu-${education.title}-${i}`}
                                  collapsible={education.collapsible}
                                  title={education.title}
                                  time={education.time}
                                  org={education.org}
                                  where={education.where}
                                  badges={education.badges ?? []}
                                  bullets={education.bullets}
                                  showMissionLog={true}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ) : achievementOnlyRow ? (
                        <motion.div
                          key={`ph-${row.sortYear}`}
                          className="edu-timeline__education edu-timeline__education--placeholder"
                          aria-hidden="true"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={reduceMotion ? undefined : { opacity: 0 }}
                          transition={tCol}
                        />
                      ) : null}
                    </AnimatePresence>
                    {showDot ? (
                      <div className="edu-timeline__dot" aria-hidden="true" />
                    ) : null}
                    <AnimatePresence initial={false} mode="wait">
                      {showAchievementCol ? (
                        <motion.div
                          key={`ach-${row.sortYear}`}
                          className="edu-timeline__achievement-col"
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0 }}
                          transition={tCol}
                        >
                          <div className="edu-timeline__content">
                            <div className="edu-timeline__stack">
                              {achievementItems.map((achievement, i) => (
                                <AchievementCard
                                  key={`${row.sortYear}-ach-${achievement.title}-${i}`}
                                  title={achievement.title}
                                  titleHref={achievement.titleHref}
                                  portfolioAnchor={achievement.portfolioAnchor}
                                  time={achievement.time}
                                  org={achievement.org}
                                  where={achievement.where}
                                  missionLogs={achievement.missionLogs ?? []}
                                  badges={achievement.badges ?? []}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
});
