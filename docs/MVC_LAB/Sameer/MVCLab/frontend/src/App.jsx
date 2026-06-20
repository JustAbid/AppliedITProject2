import { useEffect, useState } from "react";
import { fetchTasks, fetchUsers, createTask, deleteTask } from "./services/api";
import styles from "./App.module.css";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOwnerId, setSelectedOwnerId] = useState("");
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const loadTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        setError(null);
        try {
            const data = await fetchUsers();
            setUsers(data);
            if (!selectedOwnerId && data.length > 0) {
                setSelectedOwnerId(data[0].id);
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to load users");
        }
    };

    useEffect(() => {
        loadUsers();
        loadTasks();
    }, []);

    const handleAdd = async (e) => {
        e?.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle || !selectedOwnerId) return;

        setSaving(true);
        setError(null);
        try {
            await createTask(trimmedTitle, Number(selectedOwnerId));
            setTitle("");
            await loadTasks();
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to create task");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        setError(null);
        try {
            await deleteTask(id);
            await loadTasks();
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to delete task");
        }
    };

    const usersById = Object.fromEntries(users.map((user) => [user.id, user]));

    return (
        <div className={styles.wrap}>
            <h1>Tasks</h1>

            <form className={styles.form} onSubmit={handleAdd}>
                <input
                    className={styles.input}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="New task title"
                />
                <select
                    className={styles.input}
                    value={selectedOwnerId}
                    onChange={(event) => setSelectedOwnerId(event.target.value)}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button
                    className={styles.btn}
                    type="submit"
                    disabled={saving || !title.trim() || !selectedOwnerId}
                >
                    {saving ? "Adding..." : "Add"}
                </button>
            </form>

            {error && <div className={styles.error}>{error}</div>}

            {loading ? (
                <div className={styles.loading}>Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                tasks.map((t) => (
                    <div key={t.id} className={styles.task}>
                        <div>
                            {t.title}
                            <span className={styles.muted}>
                                {usersById[t.owner_id] ? ` (${usersById[t.owner_id].name})` : ` (owner ${t.owner_id})`}
                            </span>
                        </div>
                        <button className={styles.delete} onClick={() => handleDelete(t.id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}