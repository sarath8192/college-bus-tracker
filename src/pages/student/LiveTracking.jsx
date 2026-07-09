import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import { getActiveTrips } from "../../api/tripApi";

const LiveTracking = () => {
  const [activeTrips, setActiveTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveTrips = async () => {
    try {
      const data = await getActiveTrips();
      setActiveTrips(data);
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
    return <h2 style={{ padding: "20px" }}>Loading live tracking...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📍 Live Bus Tracking</h1>
        <p>
          Track active buses in real time. Location refreshes every 5 seconds.
        </p>
      </div>
      <BackToDashboard />

      {activeTrips.length === 0 ? (
        <div className="card">
          <p>No active buses right now.</p>
          <p style={{ marginTop: "8px", color: "#64748b" }}>
            Driver must start a trip first.
          </p>
        </div>
      ) : (
        <div className="grid">
          {activeTrips.map((trip) => (
            <div key={trip.id} className="card">
              <h2>Bus Trip #{trip.id}</h2>

              <p style={{ marginTop: "12px" }}>
                <strong>Bus ID:</strong> {trip.bus_id}
              </p>

              <p>
                <strong>Driver ID:</strong> {trip.driver_id}
              </p>

              <p>
                <strong>Latitude:</strong> {trip.latitude}
              </p>

              <p>
                <strong>Longitude:</strong> {trip.longitude}
              </p>

              <p>
                <strong>Speed:</strong> {trip.speed} km/h
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge badge-active">{trip.status}</span>
              </p>

              <iframe
                title={`trip-map-${trip.id}`}
                className="map-frame"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${trip.latitude},${trip.longitude}&z=15&output=embed`}
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveTracking;
