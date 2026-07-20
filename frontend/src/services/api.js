import localEvents from "../data/events";

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

async function fetchJson(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.detail || "Unable to complete the request");
    }
    return payload;
  } catch (error) {
    console.warn("API request failed, falling back to local data:", error);
    return null;
  }
}

export async function fetchEvents() {
  const data = await fetchJson(`/api/events`);
  if (Array.isArray(data) && data.length > 0) {
    return data.map(normalizeEvent);
  }
  return localEvents.map((event) => normalizeEvent(event));
}

export async function fetchEventById(eventId) {
  const data = await fetchJson(`/api/events/${eventId}`);
  if (data) {
    return normalizeEvent(data);
  }
  return normalizeEvent(localEvents.find((event) => String(event.id) === String(eventId)) || null);
}

export async function registerForEvent(eventId, registrationData) {
  return fetchJson(`/api/events/${eventId}/registrations`, {
    method: "POST",
    body: JSON.stringify(registrationData),
  });
}
