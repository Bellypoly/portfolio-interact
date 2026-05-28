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
    description="Built and scaled newsroom systems for subscriptions, engagement, experimentation, and digital storytelling serving millions of readers."
    triggerLabel="Mission logs"
    bullets={[
      "Dynamic paywall & reader access: +22% conversion, +15% subscription starts through per-visit decisioning, GA4 instrumentation, and controlled rollout behind feature flags.",
      "Subscription checkout redesign: rebuilt fragmented multi-page flows into a deterministic single-page React checkout with unified Braintree, Stripe, and Apple Pay orchestration; +14% lift (month one), +7% sustained.",
      "Local Elections Hub rebuild: helped transform fragmented election pages into a shared React- and Arc XP–driven platform for live election results, mobile-first race navigation, and election-night newsroom publishing workflows.",
      "Article experience & monetization: reduced ad density 9.91% with no revenue loss; increased reading time (+4.73%) and engagement (+4.09%) while improving Core Web Vitals (CLS, LCP).",
      "Engagement systems (Viafoura commenting): +38% engagement growth through integrated commenting and reader interaction features.",
      "Deterministic reader identity (anonymous → registered → subscriber): eliminated paywall-to-checkout drop-offs and stabilized subscription state across Arc XP flows.",
      "Performance & reliability: improved Core Web Vitals (LCP, CLS) and supported migration away from legacy rendering infrastructure through feature flags, rollout safeguards, and zero-downtime release practices.",
    ]}
    portfolioAnchor={[
      "portfolio-dmn",
      "portfolio-paywall",
      "portfolio-article-redesign",
      "portfolio-subscription",
      "portfolio-local-elections-hub",
    ]}
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
      "Built automated ETL pipelines (Python, AWS, MongoDB, MySQL) for customer-data ingestion, validation, and reporting workflows, reducing manual processing and improving marketing data quality.",
      "Developed cloud-backed reporting infrastructure across DynamoDB, MySQL, and MongoDB to support fault-tolerant analytics pipelines, operational monitoring, and SLA-driven reporting workloads.",
      "Designed backend workflows for large-scale customer segmentation, campaign reporting, and data synchronization across distributed marketing systems.",
    ]}
  />
);

const FullStackII = () => (
  <WorkTimelineItem
    time="Jul 2016 – Jul 2019"
    title="Full Stack Developer II"
    org="PEA (Provincial Electricity Authority)"
    where="Bangkok, Thailand"
    description="Built and integrated a nationwide geospatial Outage Management System (OMS), transforming GIS network data into operational systems to improve grid reliability, real-time outage response, and customer-facing services across Thailand's provincial electricity network."
    bullets={[
      "Geospatial data ingestion: designed APIs and ETL pipelines (ArcGIS, Oracle, field devices) to ingest GIS shapefiles and transform utility-network topology into structured outage-management workflows.",
      "Spatial modeling: mapped GIS topology (feeders, transformers, service areas) to operational entities, enabling accurate outage localization, restoration workflows, and planned-outage coordination.",
      "System integration: developed REST/SOAP integration services (C#, Laravel, Python) connecting OMS, GIS, SAP ERP, ADMS, and operational systems to synchronize outage IDs, lifecycle states, restoration timing (ETR), and reporting workflows.",
      "Operational analytics: aligned outage and planned-work data across OMS, GIS, SAP ERP, and Power BI systems so dashboards, maps, and field workflows reflected consistent outage states.",
      "Data pipelines & reporting: built ArcGIS- and Oracle-backed pipelines powering real-time operational dashboards, outage monitoring, and utility decision-making at production scale.",
      "Production operations: supported integration cutovers, synchronization debugging, and deployment coordination alongside utility operations teams and third-party implementation partners.",
    ]}
    portfolioAnchor={[
      "portfolio-pea",
      "portfolio-outage-ms",
      "portfolio-pea-eservice",
    ]}
  />
);

const SoftwareEng = () => (
  <WorkTimelineItem
    time="Jul 2014 – Jun 2016"
    title="Software Engineer"
    org="THiNKNET Co., Ltd." // (JobThai / MapMagic)"
    where="Bangkok, Thailand"
    description="Built geospatial search and mapping systems powering location-based job discovery for millions of users."
    bullets={[
      "Integrated Elasticsearch into a high-traffic job search system, improving query performance and ranking relevance at scale.",

      "Geospatial platform (MapMagic): designed APIs and data pipelines to process ~2M+ GIS records into structured location-based search and mapping services.",

      "Built location-based job discovery features on OpenStreetMap, enabling geographic and proximity-based search.",

      "Developed interactive geospatial visualizations using Laravel, D3.js, and modern JavaScript, improving map usability and location-based discovery.",

      "Built resume creation and employer tools, streamlining hiring workflows across one of Thailand’s largest recruitment platforms.",
    ]}
    portfolioAnchor={[
      "portfolio-thinknet",
      "portfolio-map-magic",
      "portfolio-thinknet",
    ]}
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
