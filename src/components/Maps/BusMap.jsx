import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function BusMap() {
  return (
    <MapContainer
      center={[16.5062, 80.6480]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[16.5062, 80.6480]}>
        <Popup>
          VIT-01 Bus
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default BusMap;