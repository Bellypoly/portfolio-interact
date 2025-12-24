import "./job-card.css";

const JobCard = ({ company, role, time, points }) => (
  <div className="job-card">
    <div className="job-card-header">
      <div className="job-card-role">{role}</div>
      <div className="job-card-company">@ {company}</div>
      <div className="job-card-time">{time}</div>
    </div>
    <ul className="job-card-list">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

export default JobCard;
