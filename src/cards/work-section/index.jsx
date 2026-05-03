import React, { lazy, Suspense } from "react";
import { motion, useTransform } from "framer-motion";
import WorkTimelineItem from "../../components/work-timeline-item";
import "./work-section.css";

const JourneyRoute = lazy(() => import("../../components/journey-route"));

// --- Job entries ---
const SeniorFullStack = ({ showLiveDot }) => (
  <WorkTimelineItem
    time="Nov 2021 - Present"
    showLiveDot={showLiveDot}
    title="Senior Full-Stack Developer"
    org="The Dallas Morning News / Hearst"
    where="Dallas, Texas"
    description="Built and scaled a data-driven subscription and content platform powering acquisition, conversion, and engagement for millions of readers."
    triggerLabel="Mission logs"
    bullets={[
      "AI-driven dynamic paywall: +22% conversion, +15% subscription starts via per-visit decisioning and controlled rollout.",

      "Subscription checkout redesign: simplified multi-step flow into a single-page experience; +14% lift (month one), +7% sustained.",

      "Article experience & monetization: reduced ad density 9.91% with no revenue loss; increased reading time (+4.73%) and engagement (+4.09%).",

      "Engagement systems (commenting): +38% engagement; up to 85% higher interaction on enabled content.",

      "Deterministic reader identity (anonymous → registered → subscriber): eliminated paywall-to-checkout drop-offs.",

      "Performance & reliability: improved Core Web Vitals (LCP, CLS); migrated 55% off legacy architecture; enabled zero-downtime releases via feature flags.",
    ]}
    portfolioAnchor="portfolio-dmn"
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
    description="Built and integrated a nationwide geospatial Outage Management System (OMS), transforming GIS network data into operational systems to improve grid reliability, real-time outage response, and customer-facing services across Thailand’s provincial electricity network."
    bullets={[
      "Geospatial data ingestion: designed APIs and data pipelines to ingest and transform GIS shapefiles into structured network models for outage tracking.",

      "Spatial modeling: mapped GIS topology (feeders, transformers, service areas) to operational entities, enabling accurate outage localization and restoration workflows.",

      "System integration: engineered data synchronization across GIS, OMS, and SAP ERP to maintain consistent outage IDs, lifecycle state, and estimated time to restoration (ETR).",

      "Data pipelines: built pipelines using ArcGIS and Oracle to serve real-time dashboards for grid monitoring and operational decision-making.",

      "Analytics layer: developed Power BI dashboards for outage tracking (ETR, planned outages), aligning spatial and operational data through modeling and DAX.",

      "Customer-facing systems: enabled integration with PEA E-Service, allowing outage and service data to be surfaced to end users.",
    ]}
    portfolioAnchor="portfolio-pea"
  />
);

const SoftwareEng = () => (
  <WorkTimelineItem
    time="Jul 2014 – Jun 2016"
    title="Software Engineer"
    org="THiNKNET Co., Ltd." // (JobThai / MapMagic)"
    where="Bangkok, Thailand"
    description="Built search and geospatial systems powering job discovery and location-based services for millions of users."
    bullets={[
      "Integrated Elasticsearch into a high-traffic job search system, improving query performance and ranking relevance at scale.",

      "Geospatial platform (MapMagic): designed APIs and data pipelines to process ~2M+ GIS records into structured location-based search and mapping services.",

      "Built location-based job discovery features on OpenStreetMap, enabling geographic and proximity-based search.",

      "Developed interactive geospatial visualizations using Laravel, D3.js, and modern JavaScript, improving responsiveness and engagement.",

      "Built resume creation and employer tools, streamlining hiring workflows and increasing platform retention.",
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
            <Suspense
              fallback={
                <div
                  className="work-section-journey__fallback"
                  aria-hidden="true"
                />
              }
            >
              <JourneyRoute />
            </Suspense>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default WorkSection;
