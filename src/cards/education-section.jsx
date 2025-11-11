import React from "react";
import TimelineItem from "./timeline-item.jsx";

const EducationSection = () => (
  <div className="flex flex-col gap-6">
    <h3 className="font-bold text-lg">Education</h3>
    <div className="flex flex-col gap-4 border-l-2 border-cyan-200 pl-3">
      <TimelineItem
        title="M.S. in Computer Science"
        time="2019 – 2020"
        org="Texas Tech University"
        where="Lubbock, TX, USA"
        bullets={[
          "Research: Simulated energy & time consumption of federated edge learning (NOMA).",
        ]}
      />
      <TimelineItem
        title="M.S. in Technopreneurship (FIBO)"
        time="2015 – 2018"
        org="King Mongkut's University of Technology Thonburi"
        where="Bangkok, Thailand"
      />
      <TimelineItem
        title="B.B.A. in Marketing"
        time="2017"
        org="Sukhothai Thammathirat Open University"
        where="Bangkok, Thailand"
      />
      <TimelineItem
        title="B.Eng. in Computer Engineering (Second Class Honors)"
        time="2010 – 2014"
        org="King Mongkut's University of Technology Thonburi"
        where="Bangkok, Thailand"
      />
    </div>
  </div>
);

export default EducationSection;
