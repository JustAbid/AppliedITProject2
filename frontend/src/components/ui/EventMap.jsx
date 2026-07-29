import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPin, Navigation } from "lucide-react";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Button from "./Button";
import { buildGoogleMapsUrl } from "../../utils/maps";
import "leaflet/dist/leaflet.css";
import "../../styles/ui/EventMap.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function EventMap({ latitude, longitude, locationLabel = "", zoom = 15, className = "" }) {
  const hasCoordinates = typeof latitude === "number" && typeof longitude === "number";
  const mapsUrl = buildGoogleMapsUrl({ latitude, longitude, locationLabel });

  if (!hasCoordinates) {
    return (
      <div className={`event-map event-map-empty ${className}`}>
        <MapPin size={20} aria-hidden="true" />
        <p>Map location isn&apos;t available for this event yet.</p>
        {mapsUrl && (
          <Button href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm" icon={Navigation}>
            Search {locationLabel} on Google Maps
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`event-map ${className}`}>
      <MapContainer center={[latitude, longitude]} zoom={zoom} scrollWheelZoom className="event-map-canvas">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[latitude, longitude]}
          eventHandlers={{
            click: () => mapsUrl && window.open(mapsUrl, "_blank", "noopener,noreferrer"),
          }}
        >
          <Popup>
            {locationLabel || "Event location"}
            <br />
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </Popup>
        </Marker>
      </MapContainer>

      <Button
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size="sm"
        icon={Navigation}
        className="event-map-view-btn"
      >
        View in Maps
      </Button>
    </div>
  );
}

export default EventMap;
