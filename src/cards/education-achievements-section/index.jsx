/**
 * Education & achievements — year-based timeline, All/Education/Achievements filter,
 * Framer Motion on rows and columns. Styles: education-achievements-section.css
 */
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import cc from "classcat";
import {
  EducationCard,
  AchievementCard,
} from "../../components/education-card";
import "./education-achievements-section.css";

/** Display strings for the section title and legend buttons */
const TITLE = { education: "Education", achievement: "Achievements" };

/** Legend value → which timeline columns are shown */
const TIMELINE_FILTER = {
  all: "all",
  education: "education",
  achievement: "achievement",
};

/** Wraps [YYYY] in bullet HTML for the timeline year highlight */
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
    type: "education",
    anchor: "edu-ttu",
    sortYear: 2020,
    collapsible: true,
    title: "M.S. in Computer Science",
    time: "2019 - 2020",
    org: "Texas Tech University",
    where: "Lubbock, TX, USA",
    bullets: [
      "On Simulating Energy Consumption of Federated Learning Systems : [2020] <a href='https://github.com/Bellypoly/On_simulating_energy_consumption_of_federated_learning_systems' target='_blank' rel='noopener noreferrer' >🔗</a> Pioneered simulations of federated edge learning systems using NOMA protocols in MATLAB, exploring the energy and time trade-offs that shape the future of distributed AI. Leveraged convolutional neural networks (CNNs) to minimize loss functions and optimize model performance, uncovering new strategies for efficient, scalable AI workloads. ",
      "Discovering Fake Driver Based on Temporal Driving Behaviors : [2020] <a href='https://github.com/Bellypoly/Discovering-Fake-Drivers-Based-on-Temporal-Driving-Behaviors' target='_blank' rel='noopener noreferrer' >🔗</a> Built classification models and optimized data pipelines, demonstrating proficiency in large-scale feature extraction and pattern recognition.",
      "Face-masked Recognition Model : [2020] Augmented the Labeled Faces in the Wild (LFW) dataset with simulated face-mask images to address the challenge of masked face recognition during COVID-19. Built and tested a computer vision model that improved robustness against facial occlusions, advancing research into more reliable recognition systems.",
      "Power Consumption Observation on Mobile Web Application : [2019] Developed a React Native mobile application framework to measure and analyze real-time power consumption across mobile websites and devices. Implemented background data collection, local caching, and visualization features to assess battery usage patterns. Applied machine-learning models to predict browsing behavior and identify privacy-related risks, advancing research into energy-efficient, high-performance mobile experiences.",
    ],
  },
  {
    type: "education",
    anchor: "edu-kmutt",
    sortYear: 2018,
    collapsible: true,
    title: "M.S. in Technopreneurship (Field Robotics)",
    time: "2015 - 2018",
    org: "Institute of Field Robotics : FIBO, King Mongkut's University of Technology Thonburi",
    where: "Bangkok, Thailand",
    bullets: [
      "Development of Logistics Evaluation System for Industrial Thailand Performance : [2018] Created a decision-support system using causal loop modeling to evaluate Thailand's Logistics Performance Indexes (LPIs). Research outcomes provided insights for policymakers and were applied as guidelines to enhance national industrial logistics performance.",
      "Industrial Logistic Performance Evaluation | A Case of Printing and Packaging Company in Thailand : [2016] Developed a decision-support model for Thailand's top printing and packaging industry, focusing on logistics performance improvement. Led the creation of a model to evaluate and enhance key indicators in cost, time, and reliability, delivering actionable strategies to boost industry competitiveness.<a href='https://ieomsociety.org/ieom_2016/pdfs/672.pdf' target='_blank' rel='noopener noreferrer' >🔗 ieomsociety.org</a>",
    ],
  },
  {
    type: "education",
    anchor: "edu-stou",
    sortYear: 2016,
    collapsible: true,
    title: "B.B.A. in Marketing",
    time: "2011 - 2017",
    org: "Sukhothai Thammathirat Open University",
    where: "Bangkok, Thailand",
  },
  {
    type: "education",
    anchor: "edu-kmutt",
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
    type: "achievement",
    sortYear: 2020,
    title: "Recipient of J.T. and Margaret Talkington Graduate Fellowship",
    time: "2019 - 2020",
    org: "Texas Tech University",
    where: "Lubbock, TX, USA",
    badges: ["Scholarship"],
  },
  {
    type: "achievement",
    sortYear: 2017,
    title: "Recipient of Petchra Prajomklao Graduate Scholarship",
    time: "2015 - 2017",
    org: "King Mongkut's University of Technology Thonburi",
    where: "Bangkok, Thailand",
    badges: ["Scholarship"],
  },
  {
    type: "achievement",
    sortYear: 2018,
    title:
      "Consolation Prize — Young Technopreneur Innovative Business Plan Development Competition 2018",
    time: "2018",
    org: "Samart Innovation Awards 2018",
    where: "Bangkok, Thailand",
  },
  {
    type: "achievement",
    sortYear: 2014,
    title:
      "Top 20 Teams — Young Technopreneur Innovative Business Plan Development Competition 2014",
    time: "2014",
    org: "Samart Innovation Awards 2014",
    where: "Bangkok, Thailand",
  },
];

/** One row per year (education and/or achievement), sorted newest → oldest */
const TIMELINE_ROWS = (() => {
  const byYear = new Map();
  for (const item of EDUCATION_ITEMS) {
    const row = byYear.get(item.sortYear) ?? {
      sortYear: item.sortYear,
      education: null,
      achievement: null,
    };
    row.education = item;
    byYear.set(item.sortYear, row);
  }
  for (const item of ACHIEVEMENT_ITEMS) {
    const row = byYear.get(item.sortYear) ?? {
      sortYear: item.sortYear,
      education: null,
      achievement: null,
    };
    row.achievement = item;
    byYear.set(item.sortYear, row);
  }
  return [...byYear.values()].sort((a, b) => b.sortYear - a.sortYear);
})();

// --- Section title (single h2; responsive typography in CSS) ---

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

/** Material Design standard easing (Framer Motion) */
const EASE = [0.4, 0, 0.2, 1];

// --- All / Education / Achievements filter ---

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
      aria-label="Filter timeline by category"
    >
      {btn(TIMELINE_FILTER.all, "All", "edu-timeline__legend-btn--all")}
      {btn(
        TIMELINE_FILTER.education,
        TITLE.education,
        "edu-timeline__legend-btn--education",
      )}
      {btn(
        TIMELINE_FILTER.achievement,
        TITLE.achievement,
        "edu-timeline__legend-btn--achievement",
      )}
    </div>
  );
}

// --- Section: title, legend, timeline rows ---

export default React.memo(function EducationAchievementsSection() {
  const [timelineFilter, setTimelineFilter] = useState(TIMELINE_FILTER.all);
  const reduceMotion = useReducedMotion();
  const tCol = reduceMotion ? { duration: 0 } : { duration: 0.28, ease: EASE };
  const tRow = reduceMotion
    ? { duration: 0 }
    : {
        opacity: { duration: 0.26, ease: EASE },
        y: { duration: 0.26, ease: EASE },
      };

  return (
    <div className="edu-section">
      <SectionTitle />
      <TimelineLegend value={timelineFilter} onChange={setTimelineFilter} />
      <div className="edu-timeline">
        <div className="edu-timeline__body">
          <AnimatePresence initial={false} mode="sync">
            {TIMELINE_ROWS.map((row) => {
              const showEducationCol =
                Boolean(row.education) &&
                timelineFilter !== TIMELINE_FILTER.achievement;
              const showAchievementCol =
                Boolean(row.achievement) &&
                timelineFilter !== TIMELINE_FILTER.education;

              if (!showEducationCol && !showAchievementCol) {
                return null;
              }

              const educationOnlyRow = showEducationCol && !showAchievementCol;
              const achievementOnlyRow =
                showAchievementCol && !showEducationCol;

              const showDot =
                (showEducationCol && row.education) ||
                (showAchievementCol && row.achievement);

              return (
                <motion.div
                  key={row.sortYear}
                  id={row.education?.anchor}
                  className={cc([
                    "edu-timeline__row",
                    educationOnlyRow && "edu-timeline__row--education-only",
                  ])}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={tRow}
                >
                  <AnimatePresence initial={false} mode="sync">
                    {showEducationCol && row.education ? (
                      <motion.div
                        key={`edu-${row.sortYear}`}
                        className="edu-timeline__education"
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={tCol}
                      >
                        <div className="edu-timeline__content">
                          <EducationCard
                            collapsible={row.education.collapsible}
                            title={row.education.title}
                            time={row.education.time}
                            org={row.education.org}
                            where={row.education.where}
                            badges={row.education.badges ?? []}
                            bullets={withYearSpan(row.education.bullets)}
                            showMissionLog={true}
                          />
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
                  <AnimatePresence initial={false} mode="sync">
                    {showAchievementCol && row.achievement ? (
                      <motion.div
                        key={`ach-${row.sortYear}`}
                        className="edu-timeline__achievement-col"
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={tCol}
                      >
                        <div className="edu-timeline__content">
                          <AchievementCard
                            title={row.achievement.title}
                            time={row.achievement.time}
                            org={row.achievement.org}
                            where={row.achievement.where}
                            badges={row.achievement.badges ?? []}
                          />
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
  );
});
