import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";


export default function Map({ location }) {
  const [mapKey, setMapKey] = useState("default");

  useEffect(() => {
    // Update key to force re-mount if location changes
    setMapKey(location ? `${location.lat}-${location.lng}` : "default");
  }, [location]);

  const position = location
    ? [location.lat, location.lng]
    : [51.505, -0.09]; // Default fallback position

  return (
    <MapContainer
      key={mapKey}
      center={position}
      zoom={13}
      style={{ height: "700px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {location && (
        <Marker position={position}>
          <Popup>{`${location.city}, ${location.region}`}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
