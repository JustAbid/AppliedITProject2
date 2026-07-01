import { useEffect, useState } from "react";
import { isLoggedIn, login, logout, fetchMe, fetchTasks, createTask, deleteTask } from "./services/api";
import styles from "./App.module.css";

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(name, password);
      onLogin();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card} style={{ maxWidth: 360 }}>
        <h1>Log in</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
          autoFocus
        />
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button className={styles.btn} type="submit">
          Log in
        </button>
      </form>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [me, setMe] = useState(null);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function refresh() {
    try {
      const [t, u] = await Promise.all([fetchTasks(), fetchMe()]);
      setTasks(t);
      setMe(u);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      await createTask(title.trim());
      setTitle("");
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    setBusy(true);
    try {
      await deleteTask(id);
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card} style={{ maxWidth: 520 }}>
        <div className={styles.headerRow}>
        <div>
          <h1>My Tasks</h1>
          {me && <p className={styles.subtle}>Logged in as {me.name}</p>}
        </div>
        <button
          className={styles.btnSecondary}
          type="button"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          Log out
        </button>
      </div>

      <form className={styles.form} onSubmit={handleAdd}>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          disabled={busy}
          style={{ flex: 1 }}
        />
        <button className={styles.btn} type="submit" disabled={busy || !title.trim()}>
          Add
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((t) => (
          <div key={t.id} className={styles.task}>
            <div>
              {t.title}
              <span className={styles.muted}> #{t.id}</span>
            </div>
            <button className={styles.delete} type="button" onClick={() => handleDelete(t.id)} disabled={busy}>
              Delete
            </button>
          </div>
        ))
      )}
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  return loggedIn ? <TaskList /> : <LoginScreen onLogin={() => setLoggedIn(true)} />;
}
