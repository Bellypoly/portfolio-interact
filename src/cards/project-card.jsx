import React from "react";

const ProjectCard = ({ name, desc, link, img, alt }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="rounded-2xl bg-white/70 border border-white/60 overflow-hidden block hover:shadow-lg transition-shadow"
  >
    {img && (
      <img src={img} alt={alt || name} className="w-full h-40 object-cover" />
    )}
    <div className="p-4">
      <div className="font-semibold">{name}</div>
      <div className="opacity-80 text-sm mt-1">{desc}</div>
    </div>
  </a>
);

export default ProjectCard;
