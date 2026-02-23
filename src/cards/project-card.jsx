import "./project-card.css";

const ProjectCard = ({ name, desc, img, alt, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <div className="project-card-image-wrap">
        <img
          src={img}
          alt={alt || name}
          className="project-card-image"
        />
      </div>
      <div className="project-card-body">
        <div className="project-card-name">{name}</div>
        <div className="project-card-desc">{desc}</div>
      </div>
    </a>
  );
};

export default ProjectCard;
