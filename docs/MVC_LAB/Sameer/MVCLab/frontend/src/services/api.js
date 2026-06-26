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

    if (!res.ok) throw new Error("Login failed");

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

export async function fetchTasks() {
    const res = await fetch(`${BASE}/tasks/`, {
        headers: { "Content-Type": "application/json", ...authHeaders() },
    });
    if (!res.ok) throw new Error("Failed to load tasks");
    return res.json();
}

export async function fetchUsers() {
    const res = await fetch(`${BASE}/users/`, {
        headers: { "Content-Type": "application/json", ...authHeaders() },
    });
    if (!res.ok) throw new Error("Failed to load users");
    return res.json();
}

export async function createTask(title, owner_id) {
    const res = await fetch(`${BASE}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ title, owner_id }),
    });
    if (!res.ok) throw new Error("Create failed");
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${BASE}/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Delete failed");
}