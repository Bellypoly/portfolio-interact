import React from "react";
import "./achievements-section.css";

function AchievementsSection() {
  return (
    <div className="achievements-section">
      <ul className="achievements-list">
        <li>
          <strong>
            Recipient of J.T. and Margaret Talkington Graduate Fellowship
          </strong>
          <div className="achievements-meta">
            2019 - Present • Texas Tech University, USA
          </div>
        </li>
        <li>
          <strong>Recipient of Petchra Prajomklao Graduate Scholarship</strong>
          <div className="achievements-meta">
            2015 - 2017 • KMUTT, Bangkok, Thailand
          </div>
        </li>
        <li>
          <strong>
            Consolation Prize — Young Technopreneur Innovative Business Plan
            Development Competition 2018
          </strong>
          <div className="achievements-meta">2018 • Bangkok, Thailand</div>
        </li>
        <li>
          <strong>
            Top 20 Teams — Young Technopreneur Innovative Business Plan
            Development Competition 2014
          </strong>
          <div className="achievements-meta">2014 • Bangkok, Thailand</div>
        </li>
      </ul>
    </div>
  );
}

export default AchievementsSection;
