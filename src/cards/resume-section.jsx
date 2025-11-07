import React from "react";
import "./resume-section.css";
import TimelineItem from "./timeline-item.jsx";

const ResumeSection = () => (
  <div className="resume-container">
    <h3 className="resume-title">Work Experience</h3>
    <div className="resume-timeline">
      <TimelineItem
        title="Junior Data Engineer"
        time="May 2020 – Present"
        org="Freelancer"
        where="Thailand"
        bullets={[
          "Automated ETL processes across AWS, MongoDB, and MySQL to support marketing data workflows.",
        ]}
      />
      <TimelineItem
        title="Full Stack Developer II"
        time="Jul 2016 – Jul 2019"
        org="Provincial Electricity Authority"
        where="Bangkok, Thailand"
        bullets={[
          "Built and tested integrations with REST/SOAP using C#, PHP (Laravel), Python, Selenium for utility payment processes (20M customers).",
          "Developed PL/SQL stored procedures and maintained Oracle data feeds.",
          "Designed responsive UX/UI for web and mobile to manage large‑scale electricity usage data.",
          "Created GIS‑driven data pipelines integrated with SAP ERP (PM/PS) for 37,000 staff.",
          "Provided post‑implementation support and troubleshooting for new apps and upgrades.",
        ]}
      />
      {/* <TimelineItem
        title="Senior Software Engineer"
        time="Jul 2014 – Jun 2016"
        org="THiNKNET Co., Ltd."
        where="Bangkok, Thailand"
        bullets={[
          "Enhanced profile building and job search algorithms for JobThai (Elasticsearch).",
          "Designed geospatial DB (~2M records) and developed MapMagic API using OpenStreetMap data.",
          "Developed and unit tested apps with Laravel, D3.js in Agile/Kanban teams.",
        ]}
      /> */}
    </div>
    {/* <h3 className="resume-title">Education</h3>
    <ul className="resume-education">
      <li>
        <div className="resume-school">
          Texas Tech University — Lubbock, TX, USA
        </div>
        <div className="resume-degree">
          M.S. in Computer Science (2019–2020)
        </div>
      </li>
      <li>
        <div className="resume-school">
          King Mongkut's University of Technology Thonburi — Bangkok, Thailand
        </div>
        <div className="resume-degree">
          M.S. in Technopreneurship (FIBO) (2015–2018)
        </div>
      </li>
      <li>
        <div className="resume-school">
          Sukhothai Thammathirat Open University — Bangkok, Thailand
        </div>
        <div className="resume-degree">B.B.A. in Marketing (2017)</div>
      </li>
      <li>
        <div className="resume-school">
          King Mongkut's University of Technology Thonburi — Bangkok, Thailand
        </div>
        <div className="resume-degree">
          B.Eng. in Computer Engineering (Second Class Honors) (2010–2014)
        </div>
      </li>
    </ul> */}
  </div>
);

export default ResumeSection;
