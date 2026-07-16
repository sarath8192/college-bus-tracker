import { useEffect, useState, useRef } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { getActiveTrips } from "../../api/tripApi";
import { busStops } from "../../mock/location";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper component to dynamically pan/center map when coordinates update
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.panTo(center);
    }
  }, [center, map]);
  return null;
}

const LiveTracking = () => {
  const [activeTrips, setActiveTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const fetchActiveTrips = async () => {
    try {
      const data = await getActiveTrips();
      setActiveTrips(data);
      if (data.length > 0 && !selectedTripId) {
        setSelectedTripId(data[0].id);
      }
    } catch (error) {
      console.log("Error fetching active trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveTrips();
    const interval = setInterval(() => {
      fetchActiveTrips();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Initializing GPS telemetry map layers...</p>
        </div>
      </StudentLayout>
    );
  }

  const selectedTrip = activeTrips.find((t) => t.id === selectedTripId) || activeTrips[0];
  const busPosition = selectedTrip ? [selectedTrip.latitude, selectedTrip.longitude] : [16.5062, 80.648];

  // Leaflet custom divIcons with premium layouts
  const busMarkerIcon = new L.divIcon({
    html: `<div style="font-size: 20px; display: flex; align-items: center; justify-content: center; height: 100%;">🚌</div>`,
    className: "leaflet-bus-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const stopMarkerIcon = new L.divIcon({
    html: `<div style="font-size: 12px; display: flex; align-items: center; justify-content: center; height: 100%;">📍</div>`,
    className: "leaflet-stop-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  const stopMarkerIconActive = new L.divIcon({
    html: `<div style="font-size: 12px; display: flex; align-items: center; justify-content: center; height: 100%;">🛑</div>`,
    className: "leaflet-stop-icon active",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  const polylinePositions = busStops.map((stop) => stop.position);

  return (
    <StudentLayout>
      <div className="page" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - var(--navbar-height))", paddingBottom: "24px" }}>
        <div className="page-header" style={{ marginBottom: "20px", flexShrink: 0 }}>
          <div className="page-title-area">
            <h1>Live Bus Tracking</h1>
            <p>Track your college bus in real time. Coordinates and telemetry update automatically every 5 seconds.</p>
          </div>
        </div>

        {activeTrips.length === 0 ? (
          <div className="empty-state" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="empty-state-icon">🚌</div>
            <h3>No Active Trips</h3>
            <p>Drivers must start a trip from their mobile console to update the live location tracking feed.</p>
          </div>
        ) : (
          <div className="tracking-layout" style={{ flex: 1, minHeight: 0 }}>
            {/* Left Leaflet Map Frame */}
            <div className="map-container-wrapper">
              <MapContainer
                center={busPosition}
                zoom={14}
                style={{ width: "100%", height: "100%" }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Draw Route Polyline connecting all stops */}
                <Polyline positions={polylinePositions} color="var(--primary)" weight={5} opacity={0.6} dashArray="6, 8" />

                {/* Draw Bus Stops */}
                {busStops.map((stop) => (
                  <Marker
                    key={stop.id}
                    position={stop.position}
                    icon={stop.id === 3 ? stopMarkerIconActive : stopMarkerIcon}
                  >
                    <Popup>
                      <div style={{ fontFamily: "sans-serif" }}>
                        <strong style={{ fontSize: "14px" }}>{stop.name}</strong>
                        <div style={{ fontSize: "11px", color: "var(--neutral-muted)", marginTop: "4px" }}>Stop ID: #{stop.id}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Draw Active Bus Marker */}
                {selectedTrip && (
                  <Marker position={busPosition} icon={busMarkerIcon}>
                    <Popup>
                      <div style={{ fontFamily: "sans-serif", padding: "4px" }}>
                        <strong style={{ fontSize: "14px", display: "block" }}>Bus Trip #{selectedTrip.id}</strong>
                        <span style={{ fontSize: "12px", color: "var(--neutral-muted)", display: "block", marginTop: "4px" }}>
                          Bus: {selectedTrip.bus_id}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--neutral-muted)", display: "block" }}>
                          Speed: {selectedTrip.speed} km/h
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Recenter the map view dynamically */}
                <MapRecenter center={busPosition} />
              </MapContainer>
            </div>

            {/* Right Information Panel */}
            <div className="tracking-info-panel">
              {/* Trip Selection if multiple trips exist */}
              {activeTrips.length > 1 && (
                <div className="panel-section" style={{ backgroundColor: "var(--neutral-light)" }}>
                  <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--neutral-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Select Commute Trip
                  </label>
                  <select
                    className="input"
                    value={selectedTripId}
                    onChange={(e) => setSelectedTripId(Number(e.target.value))}
                    style={{ marginTop: "8px" }}
                  >
                    {activeTrips.map((trip) => (
                      <option key={trip.id} value={trip.id}>
                        Trip #{trip.id} - Bus: {trip.bus_id}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Status and Speed Panel */}
              <div className="panel-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span className="badge badge-active" style={{ fontSize: "11px", textTransform: "uppercase" }}>
                      {selectedTrip.status || "Broadcasting"}
                    </span>
                    <h2 style={{ fontSize: "18px", fontWeight: "800", marginTop: "8px", fontFamily: "'Outfit', sans-serif" }}>
                      Trip #{selectedTrip.id}
                    </h2>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--primary)", fontFamily: "'Outfit', sans-serif" }}>
                      {selectedTrip.speed}
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--neutral-muted)", textTransform: "uppercase" }}>km/h Speed</span>
                  </div>
                </div>
              </div>

              {/* ETA and Driver Card */}
              <div className="panel-section" style={{ backgroundColor: "var(--primary-light)" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Estimated Arrival
                </h3>
                <div style={{ fontSize: "26px", fontWeight: "800", color: "var(--primary-hover)", margin: "4px 0 12px", fontFamily: "'Outfit', sans-serif" }}>
                  10 - 15 Mins
                </div>
                
                <div className="driver-info-card" style={{ borderTop: "1px solid rgba(37, 99, 235, 0.15)", paddingTop: "12px" }}>
                  <div className="driver-avatar">👨‍✈️</div>
                  <div className="driver-details">
                    <h4>Ramesh Kumar</h4>
                    <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>📞 +91 98765 43210</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Route Progress Timeline */}
              <div className="panel-section" style={{ flex: 1, overflowY: "auto" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "700", color: "var(--neutral-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "16px" }}>
                  Route Progress
                </h3>
                
                <ul className="progress-timeline">
                  {busStops.map((stop) => {
                    // Simple logic to show reached status: Benz Circle is start (1), Ramavarappadu is middle (2), Campus is end (3)
                    const isCompleted = stop.id === 1;
                    const isActive = stop.id === 2;
                    return (
                      <li key={stop.id} className={`timeline-item ${isActive ? "active" : isCompleted ? "completed" : ""}`}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <div className="stop-name">{stop.name}</div>
                          <div className="stop-status">
                            {isActive ? "Bus approaching stop" : isCompleted ? "Bus departed stop" : "Commuters waiting"}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default LiveTracking;
