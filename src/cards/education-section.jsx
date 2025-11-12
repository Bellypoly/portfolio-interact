import React from "react";
import TimelineItem from "./timeline-item.jsx";

const EducationSection = () => (
  <div className="flex flex-col gap-6">
    {/* <h3 className="font-bold text-lg">Education</h3> */}
    <div className="flex flex-col gap-4 border-l-2 border-cyan-200 pl-3">
      <TimelineItem
        title="M.S. in Computer Science"
        time="2019 – 2020"
        org="Texas Tech University"
        where="Lubbock, TX, USA"
        badges={["Scholarship"]}
        bullets={[
          "On Simulating Energy Consumption of Federated Learning Systems (2020): Pioneered simulations of federated edge learning systems using NOMA protocols in MATLAB, exploring the energy and time trade-offs that shape the future of distributed AI. Leveraged convolutional neural networks (CNNs) to minimize loss functions and optimize model performance, uncovering new strategies for efficient, scalable AI workloads. <a href='https://github.com/Bellypoly/On_simulating_energy_consumption_of_federated_learning_systems' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;'></a>",
          "Discovering Fake Driver Based on Temporal Driving Behaviors (2020): Built classification models and optimized data pipelines, demonstrating proficiency in large-scale feature extraction and pattern recognition.",
          "Face-masked Recognition Model (2020): Augmented the Labeled Faces in the Wild (LFW) dataset with simulated face-mask images to address the challenge of masked face recognition during COVID-19. Built and tested a computer vision model that improved robustness against facial occlusions, advancing research into more reliable recognition systems.",
          "Power Consumption Observation on Mobile Web Application (2019): Developed a React Native mobile application framework to measure and analyze real-time power consumption across mobile websites and devices. Implemented background data collection, local caching, and visualization features to assess battery usage patterns. Applied machine-learning models to predict browsing behavior and identify privacy-related risks, advancing research into energy-efficient, high-performance mobile experiences.",
        ]}
      />
      <TimelineItem
        title="M.S. in Technopreneurship (Institute of Field Robotics : FIBO)"
        time="2015 – 2018"
        org="King Mongkut's University of Technology Thonburi"
        where="Bangkok, Thailand"
        badges={["Scholarship"]}
        bullets={[
          "Development of Logistics Evaluation System for Industrial Thailand Performance	(2018) : Created a decision-support system using causal loop modeling to evaluate Thailand's Logistics Performance Indexes (LPIs). Research outcomes provided insights for policymakers and were applied as guidelines to enhance national industrial logistics performance.",
          "Industrial Logistic Performance Evaluation | A Case of Printing and Packaging Company in Thailand (2016): Developed a decision-support model for Thailand's top printing and packaging industry, focusing on logistics performance improvement. Led the creation of a model to evaluate and enhance key indicators in cost, time, and reliability, delivering actionable strategies to boost industry competitiveness.<a href='https://ieomsociety.org/ieom_2016/pdfs/672.pdf' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;'>ieomsociety.org</a>",
        ]}
      />
      <TimelineItem
        title="B.B.A. in Marketing"
        time="2017"
        org="Sukhothai Thammathirat Open University"
        where="Bangkok, Thailand"
      />
      <TimelineItem
        title="B.Eng. in Computer Engineering"
        time="2010 – 2014"
        org="King Mongkut's University of Technology Thonburi"
        where="Bangkok, Thailand"
        badges={["Second Class Honor"]}
      />
    </div>
  </div>
);

export default EducationSection;
