export default function ProjectCard({ project, onDemoClick }) {
  return (
    <div className="section" style={{ display: "grid", gap: 14 }}>
      <div>
        <h3 style={{ marginBottom: 6, fontSize: 20 }}>{project.title}</h3>
        <p className="text-muted" style={{ lineHeight: 1.6 }}>
          {project.description}
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {project.stack.map((tech) => (
          <span className="tag" key={tech}>{tech}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a className="btn primary" href={project.githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>

        <button className="btn ghost" onClick={() => onDemoClick(project.demoPath)}>
          Demo
        </button>
      </div>
    </div>
  );
}
