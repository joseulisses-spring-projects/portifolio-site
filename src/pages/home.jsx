import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Home({ onDemoNavigate }) {
  return (
    <div className="container">
      {/* HERO */}
      <div className="section" style={{ display: "grid", gap: 14 }}>
        <div>
          <h1 style={{ marginBottom: 10 }}>José Ulisses</h1>

          <p className="text-muted" style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
            Desenvolvedor backend focado em <b>Java</b> e <b>Spring Boot</b>, com base em
            <b> Segurança</b> e experiência prática com APIs, autenticação (JWT) e PostgreSQL.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a className="btn primary" href="https://github.com/Jesseh78" target="_blank" rel="noreferrer">
            Meus projetos
          </a>

          <a className="btn ghost" href="https://www.linkedin.com/in/joseulissesdev/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      {/* SOBRE */}
      <div className="section">
        <h2 style={{ marginBottom: 12 }}>Sobre</h2>
        <p className="text-muted" style={{ lineHeight: 1.7, maxWidth: 820 }}>
          Meu foco é construir backends reais: autenticação, segurança, persistência e integração com frontend.
          Este portfólio reúne projetos completos (código + documentação + demo).
        </p>
      </div>

      {/* PROJETOS */}
      <div className="section">
        <h2 style={{ marginBottom: 12 }}>Projetos</h2>

        <div style={{ display: "grid", gap: 14 }}>
          {projects.map((p) => (
            <ProjectCard
              key={p.title}
              project={p}
              onDemoClick={(path) => (onDemoNavigate ? onDemoNavigate(path) : alert("Demo em breve"))}
            />
          ))}
        </div>
      </div>

      {/* CONTATO */}
      <div className="section">
        <h2 style={{ marginBottom: 12 }}>Contato</h2>
        <p className="text-muted">
          Se quiser falar sobre oportunidades ou projetos:{" "}
          <a href="mailto:joseulises59@gmail.com" style={{ color: "var(--primary)", fontWeight: 700 }}>
              Enviar um email.
          </a>
        </p>
      </div>
    </div>
  );
}
