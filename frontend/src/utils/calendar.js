function toICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function parseEventDateTime(event) {
  if (!event) return new Date();

  const { date, time } = event;
  if (!date && !time) return new Date();

  const dateValue = date ? new Date(date) : new Date();
  const timeValue = time ? time : "12:00 PM";

  const combined = new Date(`${dateValue.toDateString()} ${timeValue}`);
  if (!Number.isNaN(combined.getTime())) {
    return combined;
  }

  const fallback = new Date(`${date} ${time}`);
  return Number.isNaN(fallback.getTime()) ? new Date() : fallback;
}

export function downloadEventICS(event) {
  const start = parseEventDateTime(event);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const description = (event?.description || "").replace(/\r?\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EcoConnect//Event Registration//EN",
    "BEGIN:VEVENT",
    `UID:ecoconnect-event-${event?.id ?? "event"}@ecoconnect.org`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${event?.title || "EcoConnect Event"}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${event?.location || "TBD"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${(event?.title || "ecoconnect-event").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
