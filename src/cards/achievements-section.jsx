import React from "react";

function AchievementsSection() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-lg">Achievements</h3>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        <li>
          <strong>
            Recipient of J.T. and Margaret Talkington Graduate Fellowship
          </strong>
          <div className="opacity-80 italic">
            2019 – Present • Texas Tech University, USA
          </div>
        </li>
        <li>
          <strong>Recipient of Petchra Prajomklao Graduate Scholarship</strong>
          <div className="opacity-80 italic">
            2015 – 2017 • KMUTT, Bangkok, Thailand
          </div>
        </li>
        <li>
          <strong>
            Consolation Prize — Young Technopreneur Innovative Business Plan
            Development Competition 2018
          </strong>
          <div className="opacity-80 italic">2018 • Bangkok, Thailand</div>
        </li>
        <li>
          <strong>
            Top 20 Teams — Young Technopreneur Innovative Business Plan
            Development Competition 2014
          </strong>
          <div className="opacity-80 italic">2014 • Bangkok, Thailand</div>
        </li>
      </ul>
    </div>
  );
}

export default AchievementsSection;
