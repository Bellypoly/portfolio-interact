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
    description="Engineered data-driven newsroom platforms that connect reporting, analytics, and user experience for millions of readers on web and mobile."
    triggerLabel="Mission log"
    bullets={[
      "Engineered data-driven newsroom platforms that connect reporting, analytics, and user experience for millions of readers across web and mobile.",
      "Built visual storytelling tools, real-time dashboards, and automated data pipelines in collaboration with newsroom, data journalists, and analysts.",
      "Integrated analytics & personalization systems (GA4, BlueConic, Sophi AI) to translate reader behavior into actionable editorial insights.",
      "Developed scalable APIs and automation for data feeds, paywall services, and content delivery, increasing subscription conversion by 22% and checkout completion by 14%.",
      "Enhanced performance and reliability using Datadog, Lighthouse, and Core Web Vitals (CLS, LCP, FID).",
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
      "Delivered reliable datasets that enabled more accurate campaign targeting and reporting for marketing and analytics teams.",
      "Enhanced cloud and database infrastructure (AWS, MySQL, MongoDB, DynamoDB) to improve data pipeline reliability and support enterprise-scale reporting.",
    ]}
  />
);

const FullStackII = () => (
  <WorkTimelineItem
    time="Jul 2016 – Jul 2019"
    title="Full Stack Developer II"
    org="Provincial Electricity Authority"
    where="Bangkok, Thailand"
    description="Improved outage management and grid reliability by implementing a nationwide Outage Management System (OMS) that integrated geospatial data from ArcGIS."
    bullets={[
      "Built and maintained ETL pipelines that processed high-volume energy and geographic data from ArcGIS, Oracle, and field devices, ensuring accurate and timely datasets for reporting and operational dashboards.",
      "Improved payment processing reliability for 20M+ customers by developing and automating integration tests with REST/SOAP services using C#, PHP (Laravel), Python, and Selenium.",
      "Designed and optimized PL/SQL stored procedures and Oracle scripts, ensuring accurate, high-volume data feeds across multiple enterprise systems.",
      "Built responsive web and mobile UIs to track energy consumption in real time, enabling millions of users to manage energy usage.",
      "Provided post-implementation support and troubleshooting, reducing downtime and increasing adoption of customer-facing platforms.",
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
    description="Boosted search accuracy and speed on JobThai.com, one of Thailand's largest job platforms, by integrating Elasticsearch."
    bullets={[
      "Designed a scalable geospatial database (~2M records) and built the MapMagic API, leveraging OpenStreetMap(OSM) data to power location-based job search and enterprise mapping tools.",
      "Developed and optimized frontend features using Laravel, D3.js, and modern JavaScript, improving UI performance and data-visualization quality.",
      "Built and maintained resume-creation and employer tools, enhancing user workflows and platform engagement.",
      "Collaborated in Agile/Kanban teams, aligning technical deliverables with product strategy and improving release efficiency.",
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
