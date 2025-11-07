import React from "react";
import "./portfolio-section.css";
import ProjectCard from "../cards/project-card";

const PortfolioSection = () => (
  <div className="portfolio-grid">
    <ProjectCard
      name="RDFD — Discovering Fake Drivers"
      desc="Machine learning approach for driver identification."
      img="images/portfolio/rdfd.jpg"
      alt="RDFD"
      link="https://github.com/Bellypoly/Discovering-Fake-Drivers-Based-on-Temporal-Driving-Behaviors"
    />
    <ProjectCard
      name="Map Magic"
      desc="Thailand map API and integration toolkit."
      img="images/portfolio/mapmagic.jpg"
      alt="MapMagic"
      link="https://maps.thinknet.co.th/"
    />
    {/* <ProjectCard
      name="JobThai"
      desc="Thailand job search platform — search/recommendations, resume creator."
      img="images/portfolio/jobthai.jpg"
      alt="JobThai"
      link="https://www.jobthai.com/en/resume"
    />
    <ProjectCard
      name="Squeeze It"
      desc="Heuristic search marble game AI (D3.js & ML)."
      img="images/portfolio/squeeze-it.jpg"
      alt="Squeeze It"
      link="https://github.com/Bellypoly/AI-project1"
    />
    <ProjectCard
      name="Federated Learning Energy Sim"
      desc="MATLAB simulation for energy consumption in FL with NOMA."
      img="images/portfolio/fl.jpg"
      alt="Federated Learning"
      link="https://github.com/Bellypoly/On_simulating_energy_consumption_of_federated_learning_systems"
    />
    <ProjectCard
      name="PEA E‑Service"
      desc="One‑stop service for Thai Provincial Electricity Authority."
      img="images/portfolio/coe.jpg"
      alt="PEA E-Service"
      link="https://peacos.pea.co.th/views/paperex/"
    /> */}
  </div>
);

export default PortfolioSection;
