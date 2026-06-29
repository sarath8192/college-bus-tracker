import { useState } from "react";
import {
  startTrip,
  updateTripLocation,
  endTrip,
} from "../../api/tripApi";

const TripManagement = () => {
  const [busId, setBusId] = useState("");
  const [tripId, setTripId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const getDriverLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === 1) {
            reject("Location permission denied. Please allow location access.");
          } else if (error.code === 2) {
            reject("Location unavailable. Please turn on GPS.");
          } else if (error.code === 3) {
            reject("Location request timed out. Try again.");
          } else {
            reject("Failed to get location.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  };

  const handleStartTrip = async () => {
    if (!busId.trim()) {
      alert("Please enter Bus ID");
      return;
    }

    try {
      setLoading(true);

      const location = await getDriverLocation();
      setCurrentLocation(location);

      const data = await startTrip({
        bus_id: busId,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      alert("Trip started successfully");

      if (data?.id) {
        setTripId(data.id);
      } else if (data?.trip?.id) {
        setTripId(data.trip.id);
      }
    } catch (error) {
      console.log("Start trip error:", error);
      alert(error.response?.data?.message || error || "Failed to start trip");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocation = async () => {
    if (!tripId) {
      alert("Please start trip first");
      return;
    }

    try {
      setLoading(true);

      const location = await getDriverLocation();
      setCurrentLocation(location);

      await updateTripLocation(tripId, {
        latitude: location.latitude,
        longitude: location.longitude,
      });

      alert("Location updated successfully");
    } catch (error) {
      console.log("Update location error:", error);
      alert(error.response?.data?.message || error || "Failed to update location");
    } finally {
      setLoading(false);
    }
  };

  const handleEndTrip = async () => {
    if (!tripId) {
      alert("Please start trip first");
      return;
    }

    try {
      setLoading(true);

      await endTrip(tripId);

      alert("Trip ended successfully");

      setTripId("");
      setCurrentLocation(null);
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
        <h1>🚌 Trip Management</h1>
        <p>Start trip using driver mobile GPS location.</p>
      </div>

      <div className="card" style={{ maxWidth: "650px" }}>
        <h2>Start Driver Trip</h2>

        <div className="form-group" style={{ marginTop: "18px" }}>
          <label>Bus ID</label>
          <input
            type="text"
            placeholder="Enter Bus ID"
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            className="input"
          />
        </div>

        <p style={{ marginTop: "10px", color: "#475569" }}>
          Latitude and longitude will be captured automatically from driver mobile GPS.
        </p>

        {tripId && (
          <div className="success-box" style={{ marginTop: "18px" }}>
            <strong>Active Trip ID:</strong> {tripId}
          </div>
        )}

        {currentLocation && (
          <div className="card" style={{ marginTop: "18px", background: "#f8fafc" }}>
            <h3>Current Driver Location</h3>
            <p>
              <strong>Latitude:</strong> {currentLocation.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {currentLocation.longitude}
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "22px",
          }}
        >
          <button
            onClick={handleStartTrip}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Getting Location..." : "Start Trip"}
          </button>

          <button
            onClick={handleUpdateLocation}
            disabled={loading}
            className="btn btn-warning"
          >
            Update Live Location
          </button>

          <button
            onClick={handleEndTrip}
            disabled={loading}
            className="btn btn-danger"
          >
            End Trip
          </button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: "650px", marginTop: "24px" }}>
        <h2>Instructions</h2>

        <ul style={{ lineHeight: "1.8", paddingLeft: "20px" }}>
          <li>Open this page on driver mobile phone.</li>
          <li>Enter Bus ID only.</li>
          <li>Click Start Trip.</li>
          <li>Allow location permission.</li>
          <li>Latitude and longitude are captured automatically.</li>
          <li>Click Update Live Location to update bus position.</li>
          <li>Click End Trip after completing the trip.</li>
        </ul>
      </div>
    </div>
  );
};

export default TripManagement;