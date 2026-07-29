# frontend

The public-facing web client volunteers and organisers use to browse events, register, view an event's location on an interactive map, and explore community content.

## What this service does

A React single-page app (built with Vite) that renders every page of EcoConnect and talks to the `backend` service over REST/JSON. It has no server-side logic or database access of its own — all data comes from the backend API, with a small bundled fallback dataset (`src/data/events.js`) used only if the API is unreachable.

## Running locally

```bash
# from the repo root
docker compose up frontend
```

Or without Docker (see the root [README.md](../../README.md#run-locally-without-docker) for full setup steps):

```bash
cd frontend
npm install
npm run dev
```

The app expects the backend URL in `frontend/.env` as `VITE_API_URL` (defaults to `http://localhost:8000`).

## Routes

This is a client application, not an API — it has no HTTP endpoints of its own. It exposes these client-side routes (via `react-router-dom`), defined in `src/App.jsx`:

| Path | Page |
|---|---|
| `/` | Home |
| `/events` | Events listing |
| `/events/:id` | Event details (incl. interactive map) |
| `/events/:id/register` | Event registration |
| `/community` | Community groups, activity feed, gallery |
| `/about` | About |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |
| `/accessibility` | Accessibility statement |
| `*` | 404 Not Found |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | No (default `http://localhost:8000`) | Base URL of the `backend` service's REST API. |

## Tech stack

- Language / framework: React 19, Vite
- Routing: React Router v7
- Maps: Leaflet + react-leaflet (OpenStreetMap tiles) for the event-location map
- Icons: lucide-react
- Styling: hand-written CSS with design-token custom properties (no CSS framework)
- Database: none — stateless client, all persistence lives in the `backend`/`database` services
