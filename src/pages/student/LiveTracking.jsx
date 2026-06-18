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
    return <h2>Loading live tracking...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📍 Live Bus Tracking</h1>
      <p>Auto-refreshing every 5 seconds</p>

      {activeTrips.length === 0 ? (
        <p>No active buses right now</p>
      ) : (
        activeTrips.map((trip) => (
          <div key={trip.id} style={styles.card}>
            <h3>Active Bus Trip #{trip.id}</h3>
            <p><strong>Bus ID:</strong> {trip.bus_id}</p>
            <p><strong>Driver ID:</strong> {trip.driver_id}</p>
            <p><strong>Latitude:</strong> {trip.latitude}</p>
            <p><strong>Longitude:</strong> {trip.longitude}</p>
            <p><strong>Speed:</strong> {trip.speed} km/h</p>
            <p><strong>Status:</strong> {trip.status}</p>

            <iframe
              title={`trip-map-${trip.id}`}
              width="100%"
              height="300"
              style={{ border: "0", borderRadius: "10px" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${trip.latitude},${trip.longitude}&z=15&output=embed`}
            ></iframe>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  },
};

export default LiveTracking;