const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function normalizeEvent(e) {
  if (!e) return e;
  return {
    id: e.id ?? e.id,
    title: e.title ?? e.name ?? "",
    date: e.date ?? "",
    time: e.time ?? "",
    location: e.location ?? "",
    description: e.description ?? e.shortDescription ?? "",
    long_description: e.long_description ?? e.longDescription ?? e.longDescription ?? "",
    highlights: e.highlights ?? e.highlight ?? [],
    required_items: e.required_items ?? e.requiredItems ?? [],
    category: e.category ?? e.category ?? "",
    available_spots: e.available_spots ?? e.availableSpots ?? 0,
    organizer: e.organizer ?? "",
    capacity: e.capacity ?? "",
    image: e.image ?? "",
  };
}

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error("Unable to load data");
  return response.json();
}

export async function fetchEvents() {
  const data = await fetchJson(`/api/events`);
  return Array.isArray(data) ? data.map(normalizeEvent) : [];
}

export async function fetchEventById(eventId) {
  const data = await fetchJson(`/api/events/${eventId}`);
  return normalizeEvent(data);
}
