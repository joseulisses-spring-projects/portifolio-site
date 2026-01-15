import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, getToken, setToken, clearToken } from "../services/api";

export default function AuthDemo() {
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Sempre que o result muda, recalcula token (assim logout/login refletem na UI)
  const token = useMemo(() => getToken(), [result]);
  const tokenPreview = token ? `${token.slice(0, 18)}...${token.slice(-10)}` : "—";
  const hasToken = Boolean(token);

  // ENDPOINTS
  const ENDPOINTS = {
    register: "/users",
    login: "/auth/login",
    me: "/me",
  };

  const canRegister =
    !loading &&
    registerForm.name.trim() &&
    registerForm.email.trim() &&
    registerForm.password.trim();

  const canLogin =
    !loading &&
    loginForm.email.trim() &&
    loginForm.password.trim();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const data = await apiFetch(ENDPOINTS.register, {
        method: "POST",
        body: registerForm,
      });

      setResult({ ok: true, title: "Register OK", data });

      // limpar form após sucesso
      setRegisterForm({ name: "", email: "", password: "" });
    } catch (err) {
      setResult({ ok: false, title: "Register FAIL", data: String(err.message || err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const data = await apiFetch(ENDPOINTS.login, {
        method: "POST",
        body: loginForm,
      });

      // backend retorna { "token": "..." }, mas deixei flexível
      const receivedToken = data?.token || data?.accessToken || data?.jwt || data?.data?.token;
      if (!receivedToken) throw new Error("Login OK, mas não encontrei o token na resposta.");

      setToken(receivedToken);
      setResult({ ok: true, title: "Login OK", data });

      // limpar form após sucesso
      setLoginForm({ email: "", password: "" });
    } catch (err) {
      setResult({ ok: false, title: "Login FAIL", data: String(err.message || err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleMe() {
    setLoading(true);
    setResult(null);

    try {
      const data = await apiFetch(ENDPOINTS.me, {
        method: "GET",
        auth: true,
      });

      setResult({ ok: true, title: "GET /me OK", data });
    } catch (err) {
      const msg = String(err.message || err);

      // feedback ao usuário baseado no erro
      if (msg.includes("401") || msg.toLowerCase().includes("unauthorized")) {
        setResult({
          ok: false,
          title: "Não autenticado (401)",
          data: "Faça login para obter um token válido.",
        });
      } else if (msg.includes("403") || msg.toLowerCase().includes("forbidden")) {
        setResult({
          ok: false,
          title: "Acesso negado (403)",
          data: "Token foi enviado, mas a API bloqueou o acesso.",
        });
      } else {
        setResult({ ok: false, title: "GET /me FAIL", data: msg });
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearToken();
    setResult({ ok: true, title: "Logout", data: "Token removido do localStorage." });
  }

  async function handleCopyToken() {
    if (!hasToken) return;

    try {
      await navigator.clipboard.writeText(token);
      setResult({ ok: true, title: "Token copiado", data: "Token copiado para a área de transferência." });
    } catch {
      setResult({ ok: false, title: "Falha ao copiar", data: "Seu navegador bloqueou a cópia. Copie manualmente." });
    }
  }

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <button className="btn ghost" onClick={() => navigate("/")}>
          ← Voltar para Home
        </button>
      </div>

      <div className="section" style={{ display: "grid", gap: 10 }}>
        <h1 style={{ fontSize: 34 }}>Demo – Auth Service</h1>
        <p className="text-muted">Register, Login e rota protegida usando JWT.</p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div className="text-muted" style={{ fontSize: 12 }}>
              Token atual
            </div>
            <div style={{ fontFamily: "ui-monospace, monospace" }}>{tokenPreview}</div>

            <div className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>
              Status:{" "}
              <span
                style={{
                  color: hasToken ? "var(--primary)" : "var(--muted)",
                  fontWeight: 800,
                }}
              >
                {hasToken ? "Autenticado" : "Não autenticado"}
              </span>
            </div>

            {/* botão copiar token */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              <button className="btn ghost" disabled={!hasToken || loading} onClick={handleCopyToken}>
                Copiar token
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              className="btn primary"
              disabled={loading || !hasToken}
              onClick={handleMe}
              title={!hasToken ? "Faça login para testar /me" : ""}
            >
              Testar /me
            </button>

            <button className="btn ghost" disabled={loading} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="section">
          <h3 style={{ marginBottom: 10 }}>Register</h3>

          <form onSubmit={handleRegister} style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="Nome"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            />
            <input
              placeholder="Senha"
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />

            {/* desabilitar se inválido */}
            <button className="btn primary" disabled={!canRegister}>
              {loading ? "Aguarde..." : "Criar usuário"}
            </button>
          </form>

          <p className="text-muted" style={{ marginTop: 10, fontSize: 12 }}>
            POST {ENDPOINTS.register}
          </p>
        </div>

        <div className="section">
          <h3 style={{ marginBottom: 10 }}>Login</h3>

          <form onSubmit={handleLogin} style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
            <input
              placeholder="Senha"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />

            {/* desabilitar se inválido */}
            <button className="btn primary" disabled={!canLogin}>
              {loading ? "Aguarde..." : "Entrar (salvar token)"}
            </button>
          </form>

          <p className="text-muted" style={{ marginTop: 10, fontSize: 12 }}>
            POST {ENDPOINTS.login}
          </p>
        </div>
      </div>

      <div className="section" style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 10 }}>Resultado</h3>

        {!result ? (
          <p className="text-muted">Faça Register/Login ou teste a rota /me.</p>
        ) : (
          <>
            <div style={{ marginBottom: 10, fontWeight: 800 }}>
              {result.ok ? "✅ " : "❌ "} {result.title}
            </div>

            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {typeof result.data === "string" ? result.data : JSON.stringify(result.data, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
