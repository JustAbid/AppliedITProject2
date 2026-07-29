export function buildGoogleMapsUrl({ latitude, longitude, locationLabel }) {
  if (latitude != null && longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }
  if (locationLabel) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationLabel)}`;
  }
  return null;
}
