const BASE = "http://localhost:8000";

function authHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(name, password) {
    const form = new URLSearchParams({ username: name, password });
    const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    return data;
}

export function logout() {
    localStorage.removeItem("token");
}

export function isLoggedIn() {
    return !!localStorage.getItem("token");
}

async function authedFetch(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
            ...options.headers,
        },
    });
    if (res.status === 401) {
        logout();
        window.location.reload();
        throw new Error("Session expired");
    }
    return res;
}

export async function fetchMe() {
    const res = await authedFetch(`${BASE}/auth/me`);
    if (!res.ok) throw new Error("Failed to load user");
    return res.json();
}

export async function fetchTasks() {
    const res = await authedFetch(`${BASE}/tasks/`);
    if (!res.ok) throw new Error("Failed to load tasks");
    return res.json();
}

export async function fetchUsers() {
    const res = await authedFetch(`${BASE}/users/`);
    if (!res.ok) throw new Error("Failed to load users");
    return res.json();
}

export async function createTask(title) {
    const res = await authedFetch(`${BASE}/tasks/`, {
        method: "POST",
        body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error(`Create failed: ${res.status}`);
    return res.json();
}

export async function deleteTask(id) {
    const res = await authedFetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
}
