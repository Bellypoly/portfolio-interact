import React from "react";
import TimelineItem from "../components/timeline-item.jsx";

export const SeniorFullStack = () => (
  <TimelineItem
    title="Senior Full-Stack Developer"
    time="Nov 2021 - Present"
    org="The Dallas Morning News / DallasNews Corporation"
    where="Dallas, Texas"
    bullets={[
      "Engineered data-driven newsroom platforms that connect reporting, analytics, and user experience for millions of readers on web and mobile.",
      "Collaborated with newsroom, data journalists and analysts to build visual storytelling tools, real-time dashboards, and automated data pipelines that increase audience engagement.",
      "Integrated and maintained analytics and personalization systems (GA4, BlueConic, Sophi AI) to convert reader behavior into actionable insights for editorial and product teams.",
      "Developed scalable APIs and automation for data feeds, paywall services, and content delivery, improving subscription conversion by 22% and checkout completion by 14%.",
      "Enhanced performance visibility and reliability through Datadog, Lighthouse, and Core Web Vitals (CLS, LCP, FID) to deliver fast, consistent, and trustworthy user experiences.",
    ]}
  />
);

export const DataEngineer = () => (
  <TimelineItem
    title="Data Engineer"
    time="May 2020 – Mar 2021"
    org="Freelance"
    where="Thailand"
    bullets={[
      "Built and automated ETL workflows in Python to process customer data across AWS, MongoDB, and MySQL, improving data quality and reducing manual processing time.",
      "Delivered reliable datasets that enabled more accurate campaign targeting and reporting for marketing and analytics teams.",
      "Enhanced cloud and database infrastructure (AWS, MySQL, MongoDB, DynamoDB) to improve data pipeline reliability and support enterprise-scale reporting.",
    ]}
  />
);

export const FullStackII = () => (
  <TimelineItem
    title="Full Stack Developer II"
    time="Jul 2016 – Jul 2019"
    org="Provincial Electricity Authority"
    where="Bangkok, Thailand"
    bullets={[
      "Improved outage management and grid-monitoring reliability by implementing and supporting a nationwide Outage Management System (OMS) that integrated geospatial data from ArcGIS to track faults, crew locations, and real-time service restoration.",
      "Built and maintained ETL pipelines that processed high-volume energy and geographic data from ArcGIS, Oracle, and field devices, ensuring accurate and timely datasets for reporting and operational dashboards.",
      "Improved payment processing reliability for 20M+ customers by developing and automating integration tests with REST/SOAP services using C#, PHP (Laravel), Python, and Selenium.",
      "Designed and optimized PL/SQL stored procedures and Oracle scripts, ensuring accurate, high-volume data feeds across multiple enterprise systems.",
      "Built responsive web and mobile UIs to track energy consumption in real time, enabling millions of users to monitor and manage energy usage.",
      "Provided post-implementation support and troubleshooting, reducing downtime and increasing adoption of customer-facing platforms.",
    ]}
  />
);

export const SoftwareEng = () => (
  <TimelineItem
    title="Software Engineer"
    time="Jul 2014 – Jun 2016"
    org="THiNKNET Co., Ltd. (JobThai/MapMagic)"
    where="Bangkok, Thailand"
    bullets={[
      "Boosted search accuracy and speed on JobThai.com, one of Thailand’s largest job platforms, by integrating Elasticsearch and optimizing query relevance scoring.",
      "Designed a scalable geospatial database (~2M records) and built the MapMagic API, leveraging OpenStreetMap(OSM) data to power location-based job search and enterprise mapping tools.",
      "Developed and optimized frontend features using Laravel, D3.js, and modern JavaScript, improving UI performance and data-visualization quality.",
      "Built and maintained resume-creation and employer tools, enhancing user workflows and platform engagement.",
      "Collaborated in Agile/Kanban teams, aligning technical deliverables with product strategy and improving release efficiency.",
    ]}
  />
);
