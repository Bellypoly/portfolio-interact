import React from "react";
import TimelineItem from "./timeline-item.jsx";

const ExperienceSection = () => (
  <div className="flex flex-col gap-6">
    <h3 className="font-bold text-lg">Work Experience</h3>
    <div className="flex flex-col gap-4 border-l-2 border-emerald-200 pl-3">
      <TimelineItem
        title="Senior Full‑Stack Developer"
        time="Nov 2021 – Present"
        org="The Dallas Morning News / DallasNews Corp"
        where="Dallas, Texas (remote)"
        bullets={[
          "Owned subscription, paywall, and checkout flows; improved conversion and stability.",
          "Integrated Stripe/Braintree; instrumented GA4 & Core Web Vitals; Datadog monitoring.",
          "Worked with personalization platforms (Sophi, BlueConic) to drive engagement.",
        ]}
      />
      <TimelineItem
        title="Data Engineer"
        time="May 2020 – Mar 2021"
        org="Freelance"
        where="Thailand"
        bullets={[
          "Automated ETL across AWS, MongoDB, and MySQL for marketing data workflows.",
        ]}
      />
      <TimelineItem
        title="Full Stack Developer II"
        time="Jul 2016 – Jul 2019"
        org="Provincial Electricity Authority"
        where="Bangkok, Thailand"
        bullets={[
          "Built integrations with REST/SOAP using C#, PHP (Laravel), Python, Selenium for utility payments (20M customers).",
          "Developed PL/SQL stored procedures and maintained Oracle data feeds.",
          "Designed responsive UX/UI for web and mobile to manage large‑scale usage data.",
          "Delivered GIS‑driven pipelines integrated with SAP ERP (PM/PS) for 37,000 staff.",
        ]}
      />
      <TimelineItem
        title="Senior Software Engineer"
        time="Jul 2014 – Jun 2016"
        org="THiNKNET Co., Ltd. (JobThai/MapMagic)"
        where="Bangkok, Thailand"
        bullets={[
          "Enhanced JobThai search with Elasticsearch; built resume creation features.",
          "Designed geospatial DB (~2M rows) and developed MapMagic API using OpenStreetMap.",
          "Delivered Laravel/D3.js features in Agile/Kanban teams.",
        ]}
      />
    </div>
  </div>
);

export default ExperienceSection;
