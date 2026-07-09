import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import { busLocation, busStops } from "../../mock/location";

function BusMap() {
  const routePath = busStops.map((stop) => stop.position);

  return (
    <MapContainer
      center={[busLocation.latitude, busLocation.longitude]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      {/* Map Tiles */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Route Line */}
      <Polyline
        positions={routePath}
        pathOptions={{
          color: "blue",
          weight: 5,
        }}
      />

      {/* Current Bus Location */}
      <Marker position={[busLocation.latitude, busLocation.longitude]}>
        <Popup>🚌 {busLocation.busNumber}</Popup>
      </Marker>

      {/* Bus Stops */}
      {busStops.map((stop) => (
        <Marker key={stop.id} position={stop.position}>
          <Popup>📍 {stop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default BusMap;
