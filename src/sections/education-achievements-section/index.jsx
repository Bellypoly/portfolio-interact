import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import cc from "classcat";
import {
  EducationCard,
  AchievementCard,
} from "../../components/education-card";
import {
  EDU_TIMELINE_FILTER,
  EDU_TIMELINE_FILTER_LABEL,
} from "../../constants/edu-timeline-filter.js";
import "./education-achievements-section.css";

const TITLE = {
  education: EDU_TIMELINE_FILTER_LABEL[EDU_TIMELINE_FILTER.education],
  achievement: EDU_TIMELINE_FILTER_LABEL[EDU_TIMELINE_FILTER.achievement],
};

function missionGalleryHref(slug) {
  return `${import.meta.env.BASE_URL}mission/${slug}`;
}

function withYearSpan(bullets) {
  return (
    bullets?.map((b) =>
      b.replace(
        /\[\d{4}\]/g,
        (m) => `<span class="timeline-bullet-year">${m}</span>`,
      ),
    ) ?? []
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
      `On Simulating Energy Consumption of Federated Learning Systems : [2020] <a href='${missionGalleryHref("federated-learning-energy")}' title='Mission Gallery — case study'>🔗</a> Pioneered simulations of federated edge learning systems using NOMA protocols in MATLAB, exploring the energy and time trade-offs that shape the future of distributed AI. Leveraged convolutional neural networks (CNNs) to minimize loss functions and optimize model performance, uncovering new strategies for efficient, scalable AI workloads. `,
      `Discovering Fake Drivers Based on Temporal Driving Behaviors : [2020] <a href='${missionGalleryHref("rdfd")}' title='Mission Gallery — case study'>🔗</a> Built classification models and optimized data pipelines, demonstrating proficiency in large-scale feature extraction and pattern recognition.`,
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
      `Industrial Logistic Performance Evaluation | A Case of Printing and Packaging Company in Thailand : [2016] Developed a decision-support model for Thailand's top printing and packaging industry, focusing on logistics performance improvement. Led the creation of a model to evaluate and enhance key indicators in cost, time, and reliability, delivering actionable strategies to boost industry competitiveness.<a href='${missionGalleryHref("industrial-logistics-evaluation")}' title='Mission Gallery — case study'>🔗</a>`,
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
    time: "2024",
    org: "INMA Global Media Awards 2024 (International News Media Association)",
    where: "The Dallas Morning News",
    badges: ["Organization Award"],
    missionLogs: [
      `Digital Replica Revenue Growth to Future Proof Local Journalism: Work aligns with subscription systems <a href='${missionGalleryHref("subscription-checkout-activation")}' title='Mission Gallery - subscription case study'>🔗</a>, paywall optimization <a href='${missionGalleryHref("dynamic-paywall")}' title='Mission Gallery - paywall case study'>🔗</a>, and reader-revenue growth through product and monetization engineering. Execution focus: Replica growth strategy combined print-to-digital transition, hybrid subscription packaging, and stronger digital ad value. Attribution: Organization/project recognition - contributed to initiatives within the award-winning work. → Source: <a href='https://www.inma.org/blogs/main/post.cfm/inma-unveils-40-first-place-winners-at-the-global-media-awards-with-helsingin-sanomat-taking-the-top-prize' target='_blank' rel='noreferrer'>INMA winners announcement</a>.`,
    ],
  },
  {
    sortYear: 2023,
    title: "Finalist - Best Product Iteration",
    time: "2023",
    org: "INMA Global Media Awards",
    where: "The Dallas Morning News",
    badges: ["Organization Award"],
    missionLogs: [
      `LocalGraf - Internal Database Linking From Inside Stories: Worked on newsroom entity-linking infrastructure connecting people, organizations, events, and places across article content and structured databases to power editorial discovery, contextual story relationships, and reusable newsroom knowledge systems <a href='${missionGalleryHref("article-page-redesign")}' title='Mission Gallery - article redesign case study'>🔗</a>. → Source: <a href='https://www.inma.org/best-practice/Best-Product-Iteration/2023-641/LocalGraf-Internal-database-linking-from-inside-stories' target='_blank' rel='noreferrer'>INMA finalist case study</a>.`,
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
    portfolioAnchor: "portfolio-jerdi",
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

function SectionTitle() {
  return (
    <h2 className="section-title edu-title">
      <span className="edu-title__lead">
        <span className="edu-title__education">{TITLE.education}</span>
        <span className="edu-title__amp" aria-hidden="true">
          &amp;
        </span>
      </span>
      <span className="edu-title__achievement">{TITLE.achievement}</span>
    </h2>
  );
}

const EASE_PANEL = [0.22, 1, 0.36, 1];

function timelineColumnTransition(reduceMotion) {
  return reduceMotion
    ? { duration: 0 }
    : { type: "tween", duration: 0.38, ease: EASE_PANEL };
}

function timelineRowTransition(reduceMotion) {
  return reduceMotion
    ? { duration: 0 }
    : {
        layout: { type: "tween", duration: 0.42, ease: EASE_PANEL },
        opacity: { type: "tween", duration: 0.34, ease: EASE_PANEL },
        y: { type: "tween", duration: 0.34, ease: EASE_PANEL },
      };
}

function TimelineLegend({ value, onChange }) {
  const reduceMotion = useReducedMotion();
  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 32, mass: 0.85 };

  const btn = (id, label, className) => (
    <motion.button
      key={id}
      type="button"
      layout
      className={cc([
        "edu-timeline__legend-btn",
        className,
        value === id && "edu-timeline__legend-btn--active",
      ])}
      aria-pressed={value === id}
      onClick={() => onChange(id)}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={spring}
    >
      {label}
    </motion.button>
  );

  return (
    <div
      className="edu-timeline__legend"
      role="group"
      aria-labelledby="edu-timeline-legend-prefix"
    >
      <span
        id="edu-timeline-legend-prefix"
        className="edu-timeline__legend-prefix"
      >
        {"filter : "}
      </span>
      {btn(
        EDU_TIMELINE_FILTER.all,
        EDU_TIMELINE_FILTER_LABEL[EDU_TIMELINE_FILTER.all],
        "edu-timeline__legend-btn--all",
      )}
      {btn(
        EDU_TIMELINE_FILTER.education,
        TITLE.education,
        "edu-timeline__legend-btn--education",
      )}
      {btn(
        EDU_TIMELINE_FILTER.achievement,
        TITLE.achievement,
        "edu-timeline__legend-btn--achievement",
      )}
    </div>
  );
}

export default React.memo(function EducationAchievementsSection({
  timelineFilter = EDU_TIMELINE_FILTER.all,
  onTimelineFilterChange,
}) {
  const reduceMotion = useReducedMotion();
  const tCol = timelineColumnTransition(reduceMotion);
  const tRow = timelineRowTransition(reduceMotion);

  return (
    <div className="edu-section">
      <SectionTitle />
      <TimelineLegend
        value={timelineFilter}
        onChange={onTimelineFilterChange}
      />
      <div className="edu-timeline">
        <div className="edu-timeline__inner">
          <div className="edu-timeline__body">
            <AnimatePresence initial={false} mode="sync">
              {TIMELINE_ROWS.map((row) => {
                const educationItems = row.educationItems ?? [];
                const achievementItems = row.achievementItems ?? [];
                const showEducationCol =
                  educationItems.length > 0 &&
                  timelineFilter !== EDU_TIMELINE_FILTER.achievement;
                const showAchievementCol =
                  achievementItems.length > 0 &&
                  timelineFilter !== EDU_TIMELINE_FILTER.education;

                if (!showEducationCol && !showAchievementCol) return null;

                const educationOnlyRow =
                  showEducationCol && !showAchievementCol;
                const achievementOnlyRow =
                  showAchievementCol && !showEducationCol;
                const showDot = showEducationCol || showAchievementCol;

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
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={tRow}
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
                                  bullets={withYearSpan(education.bullets)}
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
