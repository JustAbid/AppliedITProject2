import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "./services/api";
import styles from "./App.module.css";

export default function App() {
    const [tasks, setTasks] = useState([]);
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

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAdd = async (e) => {
        e?.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        setSaving(true);
        setError(null);
        try {
            await createTask(trimmedTitle);
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
                <button className={styles.btn} type="submit" disabled={saving || !title.trim()}>
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
                        <div>{t.title}</div>
                        <button className={styles.delete} onClick={() => handleDelete(t.id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}