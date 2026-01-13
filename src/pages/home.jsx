export default function Home() {
  return (
    <div className="container">
      <header style={{ marginTop: 24, marginBottom: 24 }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.1, marginBottom: 10 }}>
          José Ulisses
        </h1>

        <p className="text-muted" style={{ fontSize: 16, marginBottom: 18 }}>
          Backend Developer | Java | Spring Boot | Segurança | PostgreSQL
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a className="btn" href="https://github.com/Jesseh78" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn" href="https://www.linkedin.com/in/joseulissesdev/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn ghost" href="mailto:joseulises59@gmail.com">
            Email
          </a>
        </div>
      </header>

      <section className="card" style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 8 }}>Projetos</h2>
        <p className="text-muted">
          Em breve: Auth Service (JWT) + outros projetos.
        </p>
      </section>
    </div>
  );
}
