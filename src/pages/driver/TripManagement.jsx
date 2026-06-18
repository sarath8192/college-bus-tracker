import { useState } from "react";
import {
  startTrip,
  updateTripLocation,
  endTrip,
} from "../../api/tripApi";

const TripManagement = () => {
  const [activeTrip, setActiveTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tripData, setTripData] = useState({
    bus_id: 1,
    driver_id: 1,
    latitude: 16.5062,
    longitude: 80.6480,
    speed: 35,
  });

  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleStartTrip = async () => {
    try {
      setLoading(true);

      const data = await startTrip(tripData);
      setActiveTrip(data.trip);

      alert("Trip started successfully");
    } catch (error) {
      console.log("Start trip error:", error);
      alert(error.response?.data?.message || "Failed to start trip");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocation = async () => {
    if (!activeTrip) {
      alert("Please start trip first");
      return;
    }

    try {
      setLoading(true);

      const newLocation = {
        latitude: tripData.latitude + 0.002,
        longitude: tripData.longitude + 0.002,
        speed: tripData.speed + 2,
      };

      const data = await updateTripLocation(activeTrip.id, newLocation);

      setActiveTrip(data.trip);
      setTripData({
        ...tripData,
        ...newLocation,
      });

      alert("Location updated successfully");
    } catch (error) {
      console.log("Update location error:", error);
      alert(error.response?.data?.message || "Failed to update location");
    } finally {
      setLoading(false);
    }
  };

  const handleEndTrip = async () => {
    if (!activeTrip) {
      alert("No active trip found");
      return;
    }

    try {
      setLoading(true);

      await endTrip(activeTrip.id);
      setActiveTrip(null);

      alert("Trip ended successfully");
    } catch (error) {
      console.log("End trip error:", error);
      alert(error.response?.data?.message || "Failed to end trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚌 Driver Trip Management</h1>

      <div style={styles.card}>
        <h3>Trip Details</h3>

        <div style={styles.formGroup}>
          <label>Bus ID</label>
          <input
            type="number"
            name="bus_id"
            value={tripData.bus_id}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Driver ID</label>
          <input
            type="number"
            name="driver_id"
            value={tripData.driver_id}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Latitude</label>
          <input
            type="number"
            name="latitude"
            value={tripData.latitude}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Longitude</label>
          <input
            type="number"
            name="longitude"
            value={tripData.longitude}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Speed</label>
          <input
            type="number"
            name="speed"
            value={tripData.speed}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleStartTrip}
            disabled={loading || activeTrip}
            style={styles.startButton}
          >
            Start Trip
          </button>

          <button
            onClick={handleUpdateLocation}
            disabled={loading || !activeTrip}
            style={styles.updateButton}
          >
            Update Location
          </button>

          <button
            onClick={handleEndTrip}
            disabled={loading || !activeTrip}
            style={styles.endButton}
          >
            End Trip
          </button>
        </div>
      </div>

      {activeTrip && (
        <div style={styles.card}>
          <h3>Active Trip</h3>
          <p><strong>Trip ID:</strong> {activeTrip.id}</p>
          <p><strong>Bus ID:</strong> {activeTrip.bus_id}</p>
          <p><strong>Driver ID:</strong> {activeTrip.driver_id}</p>
          <p><strong>Latitude:</strong> {activeTrip.latitude}</p>
          <p><strong>Longitude:</strong> {activeTrip.longitude}</p>
          <p><strong>Speed:</strong> {activeTrip.speed} km/h</p>
          <p><strong>Status:</strong> {activeTrip.status}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "600px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  startButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#16a34a",
    color: "#fff",
    cursor: "pointer",
  },
  updateButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  endButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
  },
};

export default TripManagement;