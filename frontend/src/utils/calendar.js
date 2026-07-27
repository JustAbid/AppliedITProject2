function toICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function downloadEventICS(event) {
  const start = new Date(`${event.date} ${event.time}`);
  const validStart = Number.isNaN(start.getTime()) ? new Date() : start;
  const end = new Date(validStart.getTime() + 2 * 60 * 60 * 1000);

  const description = (event.description || "").replace(/\r?\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EcoConnect//Event Registration//EN",
    "BEGIN:VEVENT",
    `UID:ecoconnect-event-${event.id}@ecoconnect.org`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(validStart)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
