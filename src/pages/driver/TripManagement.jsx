import BackToDashboard from "../../components/common/BackToDashboard";
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
    longitude: 80.648,
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
        latitude: Number(tripData.latitude) + 0.002,
        longitude: Number(tripData.longitude) + 0.002,
        speed: Number(tripData.speed) + 2,
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
    <div className="page">
      <div className="page-header">
        <h1>🚌 Driver Trip Management</h1>
        <p>Start trips, update live location, and end active trips.</p>
      </div>
<BackToDashboard />
      <div className="card" style={{ maxWidth: "650px" }}>
        <h2>Trip Details</h2>

        <div className="form-group" style={{ marginTop: "18px" }}>
          <label>Bus ID</label>
          <input
            type="number"
            name="bus_id"
            value={tripData.bus_id}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Driver ID</label>
          <input
            type="number"
            name="driver_id"
            value={tripData.driver_id}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input
            type="number"
            name="latitude"
            value={tripData.latitude}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Longitude</label>
          <input
            type="number"
            name="longitude"
            value={tripData.longitude}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Speed</label>
          <input
            type="number"
            name="speed"
            value={tripData.speed}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="action-row">
          <button
            onClick={handleStartTrip}
            disabled={loading || activeTrip}
            className="btn btn-success"
          >
            Start Trip
          </button>

          <button
            onClick={handleUpdateLocation}
            disabled={loading || !activeTrip}
            className="btn btn-primary"
          >
            Update Location
          </button>

          <button
            onClick={handleEndTrip}
            disabled={loading || !activeTrip}
            className="btn btn-danger"
          >
            End Trip
          </button>
        </div>
      </div>

      {activeTrip && (
        <div className="card" style={{ maxWidth: "650px", marginTop: "24px" }}>
          <h2>Active Trip</h2>

          <p style={{ marginTop: "12px" }}>
            <strong>Trip ID:</strong> {activeTrip.id}
          </p>

          <p>
            <strong>Bus ID:</strong> {activeTrip.bus_id}
          </p>

          <p>
            <strong>Driver ID:</strong> {activeTrip.driver_id}
          </p>

          <p>
            <strong>Latitude:</strong> {activeTrip.latitude}
          </p>

          <p>
            <strong>Longitude:</strong> {activeTrip.longitude}
          </p>

          <p>
            <strong>Speed:</strong> {activeTrip.speed} km/h
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="badge badge-active">{activeTrip.status}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TripManagement;