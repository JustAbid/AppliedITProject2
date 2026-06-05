import sqlite3
import os

class TaskRepository:
    def __init__(self, db_path: str = "/app/tasks.db"):
        # default DB path inside the container app folder so it appears
        # in the host workspace when ./backend is bind-mounted to /app
        self._db = db_path
        # ensure directory exists
        directory = os.path.dirname(self._db)
        if directory and not os.path.exists(directory):
            try:
                os.makedirs(directory, exist_ok=True)
            except Exception:
                pass
        self._init()

    def _init(self):
        with sqlite3.connect(self._db) as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT
                )
                """
            )
            conn.commit()

    def all(self):
        with sqlite3.connect(self._db) as conn:
            rows = conn.execute("SELECT id, title FROM tasks ORDER BY id").fetchall()
            return [{"id": r[0], "title": r[1]} for r in rows]

    def add(self, title: str) -> dict:
        with sqlite3.connect(self._db) as conn:
            cur = conn.execute("INSERT INTO tasks (title) VALUES (?)", (title,))
            conn.commit()
            return {"id": cur.lastrowid, "title": title}

    def remove(self, task_id: int) -> bool:
        with sqlite3.connect(self._db) as conn:
            cur = conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
            conn.commit()
            return cur.rowcount > 0
