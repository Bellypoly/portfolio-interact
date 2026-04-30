import React from "react";
import { motion, useTransform } from "framer-motion";
import WorkTimelineItem from "../../components/work-timeline-item";
import JourneyRoute from "../../components/journey-route";
import "./work-section.css";

// --- Job entries ---
const SeniorFullStack = ({ showLiveDot }) => (
  <WorkTimelineItem
    time="Nov 2021 - Present"
    showLiveDot={showLiveDot}
    title="Senior Full-Stack Developer"
    org="The Dallas Morning News / Hearst"
    where="Dallas, Texas"
    description="Engineered data-driven newsroom platforms connecting reporting, analytics, and user experience for millions of readers across web and mobile."
    triggerLabel="Mission logs"
    bullets={[
      "ML-driven dynamic paywall: +22% conversion, +15% subscription starts; Arc XP integration, GA4, feature-flag rollout.",
      "Single-page checkout: +14% digital subs in month one; +7% uplift through behavioral iteration.",
      "Deterministic reader state (anonymous, signed-in, lapsed) — eliminated paywall-to-checkout drop-offs caused by identity ambiguity.",
      "Unified identity, payments, and personalization (BlueConic, Sailthru) on Arc XP — a streamlined path from acquisition to retention.",
      "Real-time publishing stack (Node.js, React, GraphQL, Python); feature flags and kill switches for safe, zero-downtime releases.",
      "Automated regression suites and production monitoring → fewer incidents; mentored juniors through reviews and pairing.",
    ]}
    portfolioAnchor="portfolio"
  />
);

const DataEngineer = () => (
  <WorkTimelineItem
    time="May 2020 – Mar 2021"
    title="Data Engineer"
    org="Freelance"
    where="Chiang Mai, Thailand"
    description="Built and automated ETL workflows in Python to process customer data across AWS, MongoDB, and MySQL."
    bullets={[
      "Designed and automated ETL pipelines in Python to ingest, validate, and transform customer data across AWS, MongoDB, and MySQL — enabling marketing teams to cut ad spend waste through cleaner targeting datasets.",
      "Hardened cloud infrastructure (AWS, DynamoDB, MySQL, MongoDB) for pipeline reliability and fault tolerance, supporting enterprise-scale reporting under production SLAs.",
    ]}
  />
);

const FullStackII = () => (
  <WorkTimelineItem
    time="Jul 2016 – Jul 2019"
    title="Full Stack Developer II"
    org="PEA (Provincial Electricity Authority)"
    where="Bangkok, Thailand"
    description="Implemented a nationwide Outage Management System integrating ArcGIS geospatial data with Oracle backends, improving grid reliability and outage response across Thailand's provincial electricity network."
    bullets={[
      "Built ETL pipelines processing high-volume energy and geographic data from ArcGIS, Oracle, and field devices into operational dashboards used by grid operators for real-time outage response.",
      "Automated REST/SOAP integration tests (C#, PHP/Laravel, Python, Selenium) for payment processing serving 20M+ customers — reduced regression risk across billing cycles.",
      "Optimized PL/SQL stored procedures and Oracle batch scripts, cutting processing time and improving data accuracy across enterprise systems.",
      "Built responsive web and mobile UIs for real-time energy consumption tracking, enabling millions of ratepayers to monitor and manage usage.",
    ]}
    portfolioAnchor="portfolio-pea"
  />
);

const SoftwareEng = () => (
  <WorkTimelineItem
    time="Jul 2014 – Jun 2016"
    title="Software Engineer"
    org="THiNKNET Co., Ltd." //(JobThai/MapMagic)"
    where="Bangkok, Thailand"
    description="Integrated Elasticsearch into JobThai.com, one of Thailand's largest job platforms, measurably improving search relevance and query speed for millions of job seekers."
    bullets={[
      "Designed a scalable geospatial database (~2M records) and built the MapMagic API on OpenStreetMap, powering location-based job search and enterprise mapping tools.",
      "Developed interactive data visualizations and UI features with Laravel, D3.js, and modern JavaScript — improved responsiveness and user engagement across the platform.",
      "Built resume-creation and employer management tools that streamlined hiring workflows and increased platform stickiness.",
    ]}
    portfolioAnchor="portfolio-jobthai"
  />
);

// --- WorkSection ---
const SECTION_TITLE_CHARS = ["﹁", "w", "o", "r", "k", "﹂"];

function WorkSectionTitle() {
  return (
    <h2 className="section-title work-section-title">
      <span className="work-section-title-label">wo</span>
      <span className="work-section-title-text">
        {SECTION_TITLE_CHARS.map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </span>
      <span className="work-section-title-label">rk</span>
    </h2>
  );
}

const WorkSection = React.memo(function WorkSection({ sectionProgress }) {
  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.9, 1],
    [0, 1, 1, 0.3],
  );
  const y = useTransform(sectionProgress, [0, 0.25], [24, 0]);

  return (
    <motion.div className="work-section-wrapper" style={{ opacity }}>
      <div className="work-section-title-row">
        <WorkSectionTitle />
      </div>
      <div className="work-section-cols">
        <motion.div
          className="work-section-col work-section-col--left"
          style={{ y }}
        >
          <div className="work-section">
            <div id="work-dallas">
              <SeniorFullStack showLiveDot />
            </div>
            <div id="work-chiangmai">
              <DataEngineer />
            </div>
            <div id="work-pea">
              <FullStackII />
            </div>
            <div id="work-thinknet">
              <SoftwareEng />
            </div>
          </div>
        </motion.div>
        <div className="work-section-col work-section-col--right">
          <div className="work-section-journey">
            <JourneyRoute />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default WorkSection;
