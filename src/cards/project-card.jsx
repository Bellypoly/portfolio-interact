const ProjectCard = ({ name, desc, img, alt, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl overflow-hidden border border-slate-200 bg-white/80 hover:bg-white transition shadow-sm hover:shadow-md"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={img}
          alt={alt || name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
        />
      </div>
      <div className="p-4">
        <div className="font-semibold">{name}</div>
        <div className="text-sm opacity-80 mt-1">{desc}</div>
      </div>
    </a>
  );
};

export default ProjectCard;
