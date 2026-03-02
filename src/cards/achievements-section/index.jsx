import React from "react";
import { motion, useTransform } from "framer-motion";
import "./achievements-section.css";

function AchievementsSection({ sectionProgress }) {
  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3],
  );
  return (
    <motion.div className="achievements-section" style={{ opacity }}>
      <h2 className="section-title">
        Achievements
      </h2>
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
    </motion.div>
  );
}

export default AchievementsSection;
