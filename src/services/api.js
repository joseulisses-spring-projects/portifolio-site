const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function getToken() {
    return localStorage.getItem("token");
}
export function setToken(token) {
    localStorage.setItem("token", token);
}
export function clearToken() {
    localStorage.removeItem("token");
}

export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
    const headers = { "Content-Type": "application/json" };

    if (auth) {
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text || null;
    }

    if (!res.ok) {
        throw new Error((data && data.message) ? data.message : `Erro ${res.status}`);
    }
    return data;
}
