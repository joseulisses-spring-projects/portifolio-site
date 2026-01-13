import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, clearToken, getToken, setToken } from "../services/api";

export default function AuthDemo() {
    const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = useMemo(() => getToken(), [result]);
    const tokenPreview = token ? `${token.slice(0, 18)}...${token.slice(-10)}` : "—";

    // ✅ ENDPOINTS DO SEU BACKEND
    const ENDPOINTS = {
        register: "/users",
        login: "/auth/login",
        me: "/me",
    };

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const data = await apiFetch(ENDPOINTS.register, { method: "POST", body: registerForm });
            setResult({ ok: true, title: "Register OK", data });
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
            const data = await apiFetch(ENDPOINTS.login, { method: "POST", body: loginForm });

            const receivedToken = data?.token || data?.accessToken || data?.jwt || data?.data?.token;
            if (!receivedToken) throw new Error("Login OK, mas não encontrei o token na resposta.");

            setToken(receivedToken);
            setResult({ ok: true, title: "Login OK", data });
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
            const data = await apiFetch(ENDPOINTS.me, { method: "GET", auth: true });
            setResult({ ok: true, title: "GET /me OK", data });
        } catch (err) {
            setResult({ ok: false, title: "GET /me FAIL", data: String(err.message || err) });
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        clearToken();
        setResult({ ok: true, title: "Logout", data: "Token removido do localStorage." });
    }

    return (
        <div className="container"><div style={{ marginBottom: 12 }}>
            <button
                className="btn primary"
                onClick={() => navigate("/")}
            >
                ← Voltar para Home
            </button>
        </div>
            <div className="section" style={{ display: "grid", gap: 10 }}>
                <h1 style={{ fontSize: 34 }}>Demo – Auth Service</h1>
                <p className="text-muted">
                    Register, Login e rota protegida usando JWT.
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                        <div className="text-muted" style={{ fontSize: 12 }}>Token atual</div>
                        <div style={{ fontFamily: "ui-monospace, monospace" }}>{tokenPreview}</div>
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button className="btn primary" disabled={loading} onClick={handleMe}>Testar /me</button>
                        <button className="btn ghost" disabled={loading} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                <div className="section">
                    <h3 style={{ marginBottom: 10 }}>Register</h3>
                    <form onSubmit={handleRegister} style={{ display: "grid", gap: 10 }}>
                        <input placeholder="Nome" value={registerForm.name}
                            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} />
                        <input placeholder="Email" value={registerForm.email}
                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
                        <input placeholder="Senha" type="password" value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
                        <button className="btn primary" disabled={loading}>
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
                        <input placeholder="Email" value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                        <input placeholder="Senha" type="password" value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                        <button className="btn primary" disabled={loading}>
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
