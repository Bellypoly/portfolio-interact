import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import WorkTimelineItem from "../../components/work-timeline-item";
import "./work-section.css";

const JourneyRoute = lazy(() => import("../../components/journey-route"));

// --- Job entries ---
const WORK_ITEMS = [
  {
    id: "work-dallas",
    time: "Nov 2021 - Apr 2026",
    showLiveDot: true,
    title: "Senior Full-Stack Developer",
    org: "The Dallas Morning News / Hearst",
    where: "Dallas, Texas, USA",
    description:
      "Built and scaled newsroom platforms for subscriptions, audience growth, engagement, experimentation, and digital storytelling, contributing to subscription conversion, reader retention, and content discovery for millions of readers.",
    triggerLabel: "Mission logs",
    technologies: [
      // Languages
      "TypeScript",
      "Python",
      "PHP",

      // Frontend
      "React",

      // Backend & APIs
      "Node.js",
      "GraphQL",
      "REST APIs",

      // Testing & Quality
      "Playwright",
      "Cypress",
      "Postman",
      "Test Automation",

      // Cloud & DevOps
      "AWS",
      "CI/CD",

      // Data
      "BigQuery",
      "GA4",
      "Looker Studio",

      // Media & Audience Platforms
      "Arc XP",
      "BlueConic",
      "Sailthru",

      // Payments
      "Braintree",
      "Stripe",
    ],
    bullets: [
      {
        label: "Dynamic Paywall & Reader Access",
        slug: "dynamic-paywall",
        metric: "+22% conversion • +15% subscription starts",
        detail:
          "Integrated per-visit decisioning, GA4 instrumentation, and controlled rollout behind feature flags.",
      },
      {
        label: "Subscription Checkout Redesign",
        slug: "subscription-checkout-activation",
        metric: "+14% lift (month one) • +7% sustained",
        detail:
          "Rebuilt fragmented multi-page flows into a deterministic single-page React checkout with unified Braintree, Stripe, and Apple Pay orchestration.",
      },
      {
        label: "Local Elections Hub Rebuild",
        slug: "local-elections-hub",
        detail:
          "Helped transform fragmented election pages into a shared React- and Arc XP-driven platform for live election results, mobile-first race navigation, and election-night newsroom publishing workflows.",
      },
      {
        label: "LocalGraf Knowledge Graph",
        // slug: "localgraf",
        detail:
          "Connected people, organizations, events, and places across newsroom content and structured editorial data to improve discovery, navigation, and story relationships.",
      },
      {
        label: "Article Experience & Monetization",
        slug: "article-page-redesign",
        metric: "-9.91% ad density • +4.73% reading time • +4.09% engagement",
        detail:
          "Improved Core Web Vitals (CLS, LCP) while maintaining revenue performance.",
      },
      {
        label: "Engagement Systems (Viafoura)",
        slug: "article-page-redesign",
        metric: "+38% engagement growth",
        detail: "Integrated commenting and reader-interaction features.",
      },
      {
        label: "Deterministic Reader Identity",
        subtle: "(anonymous -> registered -> subscriber)",
        detail:
          "Eliminated paywall-to-checkout drop-offs and stabilized subscription state across Arc XP flows.",
      },
      {
        label: "Performance & Reliability",
        slug: "article-page-redesign",
        detail:
          "Improved Core Web Vitals (LCP, CLS) and supported migration away from legacy rendering infrastructure through feature flags, rollout safeguards, and zero-downtime release practices.",
      },
    ],
    portfolioAnchor: [
      "portfolio-dmn",
      "portfolio-paywall",
      "portfolio-article-redesign",
      "portfolio-subscription",
      "portfolio-local-elections-hub",
    ],
  },
  {
    id: "work-chiangmai",
    time: "May 2020 - Mar 2021",
    title: "Data Engineer",
    org: "I GEAR GEEK Co., Ltd.",
    where: "Chiang Mai, Thailand",
    description:
      "Built data pipelines and analytics infrastructure supporting customer intelligence, marketing operations, and reporting workflows.",
    technologies: [
      // Languages
      "Python",
      "SQL",
      // Data Engineering
      "ETL",
      "Data Pipelines",
      // Databases
      "MongoDB",
      "MySQL",
      "DynamoDB",
      // Cloud
      "AWS",
      // Analytics
      "Reporting",
    ],
    bullets: [
      {
        label: "Data Ingestion & Transformation",
        detail:
          "Built automated ETL pipelines using Python, AWS, MongoDB, and MySQL to ingest, validate, and transform customer data for reporting, audience analysis, and marketing operations.",
      },
      {
        label: "Analytics Infrastructure",
        detail:
          "Developed cloud-backed data and reporting infrastructure across DynamoDB, MySQL, and MongoDB, supporting fault-tolerant analytics pipelines, operational monitoring, and SLA-driven reporting workloads.",
      },
      {
        label: "Customer Intelligence & Segmentation",
        detail:
          "Designed backend workflows for customer segmentation, campaign reporting, and cross-system data synchronization, enabling audience targeting while improving data quality and reducing manual processing across distributed marketing platforms.",
      },
    ],
    portfolioAnchor: [],
  },
  {
    id: "work-pea",
    time: "Jul 2016 - Jul 2019",
    title: "Full Stack Developer II",
    org: "Provincial Electricity Authority (PEA)",
    where: "Bangkok, Thailand",

    description:
      "Built and integrated a nationwide geospatial Outage Management System (OMS), transforming GIS network data into operational systems supporting outage response, grid reliability, and customer services across Thailand's provincial electricity network.",

    technologies: [
      // Languages
      "Python",
      "PHP",
      "C#",
      "SQL",

      // GIS & Utility Systems
      "ArcGIS",
      "OMS",
      "SAP ERP",

      // Backend & APIs
      "REST APIs",
      "SOAP",
      "Laravel",

      // Testing & Quality
      "Selenium",
      "JMeter",
      "Integration Testing",

      // Data
      "Oracle",
      "PL/SQL",
      "ETL",

      // Analytics
      "Power BI",

      "OWASP",
    ],

    bullets: [
      {
        label: "Geospatial Network Modeling",
        slug: "outage-management-system",
        detail:
          "Transformed GIS network topology, including feeders, transformers, and service areas, into operational outage-management workflows supporting outage localization and restoration activities.",
      },
      {
        label: "OMS & Enterprise Integration",
        slug: "outage-management-system",
        detail:
          "Developed integration services connecting OMS, GIS, SAP ERP, ADMS, and operational systems to synchronize outage lifecycle data, restoration timing (ETR), and utility reporting workflows.",
      },
      {
        label: "Operational Analytics & Decision Support",
        slug: "outage-management-system",
        detail:
          "Built ArcGIS- and Oracle-backed data pipelines powering real-time dashboards, outage monitoring, planned-work coordination, and utility decision-making at production scale.",
      },
      {
        label: "Customer-Facing Utility Systems",
        slug: "pea-e-service",
        detail:
          "Supported outage visibility, service coordination, and energy-information systems used by utility staff and customers across high-volume public-service platforms.",
      },
      {
        label: "Production Operations & Deployment",
        slug: "outage-management-system",
        detail:
          "Supported integration cutovers, synchronization debugging, deployment coordination, and outage-response operations alongside utility teams and third-party implementation partners.",
      },
    ],

    portfolioAnchor: [
      "portfolio-pea",
      "portfolio-outage-ms",
      "portfolio-pea-eservice",
    ],
  },
  {
    id: "work-thinknet",
    time: "Jul 2014 - Jun 2016",
    title: "Senior Software Engineer",
    org: "THiNKNET Co., Ltd.",
    where: "Bangkok, Thailand",

    description:
      "Built geospatial search, mapping, and recruitment-platform systems powering location-based job discovery across one of Thailand's largest employment marketplaces.",

    technologies: [
      // Languages
      "PHP",
      "JavaScript",
      "SQL",

      // Backend
      "Laravel",
      "Elasticsearch",
      "REST APIs",

      // GIS & Mapping
      "OpenStreetMap",
      "GIS",
      "MapMagic",

      // Visualization
      "D3.js",
    ],

    bullets: [
      {
        label: "Search & Discovery Platform",
        slug: "jobthai",
        detail:
          "Integrated Elasticsearch into a high-traffic job-search platform, improving search performance, ranking relevance, and discovery experiences at scale.",
      },
      {
        label: "MapMagic Geospatial Platform",
        slug: "map-magic",
        detail:
          "Designed APIs and geospatial data pipelines processing more than 2 million GIS records into location-based search, routing, and mapping services.",
      },
      {
        label: "Location-Based Job Discovery",
        slug: "jobthai",
        detail:
          "Built geographic and proximity-based job-search capabilities using OpenStreetMap, enabling location-aware employment discovery.",
      },
      {
        label: "Interactive Geospatial Visualization",
        slug: "map-magic",
        detail:
          "Developed map-based visualizations and user experiences using Laravel, D3.js, and modern JavaScript, improving usability and engagement.",
      },
      {
        label: "Recruitment Workflow Systems",
        slug: "jobthai",
        detail:
          "Built resume-creation and employer-management tools supporting hiring workflows across one of Thailand's largest recruitment platforms.",
      },
    ],

    portfolioAnchor: ["portfolio-thinknet", "portfolio-map-magic"],
  },
];

const SECTION_TITLE_CHARS = ["\ufe41", "w", "o", "r", "k", "\ufe42"];
const WORK_ITEM_INTRO_START_PROGRESS = 0.32;

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
  const [activeBulletKey, setActiveBulletKey] = useState(null);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const wrapperRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.9, 1],
    [0, 1, 1, 0.3],
  );
  const y = useTransform(sectionProgress, [0, 0.25], [24, 0]);

  useMotionValueEvent(sectionProgress, "change", (value) => {
    if (value >= WORK_ITEM_INTRO_START_PROGRESS) {
      setHasIntroPlayed(true);
    } else if (value <= 0.02) {
      setHasIntroPlayed(false);
    }

    if (value <= 0.02 || value >= 0.98) {
      setActiveBulletKey(null);
    }
  });

  useEffect(() => {
    if (activeBulletKey == null) return undefined;

    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    let frameId = 0;
    const closeIfWrapperIsOutsideViewport = () => {
      frameId = 0;
      const rect = wrapper.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        setActiveBulletKey(null);
      }
    };

    const scheduleViewportCheck = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(closeIfWrapperIsOutsideViewport);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setActiveBulletKey(null);
      }
    });

    observer.observe(wrapper);
    window.addEventListener("scroll", scheduleViewportCheck, { passive: true });
    window.addEventListener("resize", scheduleViewportCheck);
    scheduleViewportCheck();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleViewportCheck);
      window.removeEventListener("resize", scheduleViewportCheck);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [activeBulletKey]);

  return (
    <motion.div
      ref={wrapperRef}
      className="work-section-wrapper"
      style={{ opacity }}
    >
      <div className="work-section-title-row">
        <WorkSectionTitle />
      </div>
      <div className="work-section-cols">
        <motion.div
          className="work-section-col work-section-col--left"
          style={{ y }}
        >
          <div className="work-section">
            {WORK_ITEMS.map(({ id, ...item }, index) => (
              <motion.div
                id={id}
                key={id}
                initial={false}
                animate={
                  reduceMotion || hasIntroPlayed
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -42 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.68,
                        delay: hasIntroPlayed ? index * 0.14 : 0,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                <WorkTimelineItem
                  {...item}
                  bulletKey={id}
                  isBulletOpen={activeBulletKey === id}
                  isDimmed={activeBulletKey != null && activeBulletKey !== id}
                  setActiveBulletKey={setActiveBulletKey}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="work-section-col work-section-col--right">
          <div
            className={`work-section-journey${activeBulletKey != null ? " work-section-journey--dimmed" : ""}`}
          >
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
