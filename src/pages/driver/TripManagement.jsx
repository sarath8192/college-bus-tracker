import { useRef, useState } from "react";
import { startTrip, updateTripLocation, endTrip } from "../../api/tripApi";

const TripManagement = () => {
  const [busId, setBusId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [tripId, setTripId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const watchIdRef = useRef(null);
  const tripIdRef = useRef("");

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
        },
      );
    });
  };

  const startAutoLocationTracking = (activeTripId) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser");
      return;
    }

    tripIdRef.current = activeTripId;

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCurrentLocation(location);

        try {
          await updateTripLocation(tripIdRef.current, {
            latitude: location.latitude,
            longitude: location.longitude,
          });

          console.log("Live location updated:", location);
        } catch (error) {
          console.log("Auto location update error:", error);
        }
      },
      (error) => {
        console.log("Watch position error:", error);

        if (error.code === 1) {
          alert("Location permission denied. Please allow location access.");
        } else if (error.code === 2) {
          alert("Location unavailable. Please turn on GPS.");
        } else if (error.code === 3) {
          alert("Location update timed out.");
        } else {
          alert("Failed to track live location.");
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000,
      },
    );

    setIsTracking(true);
  };

  const stopAutoLocationTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setIsTracking(false);
  };

  const handleStartTrip = async () => {
    if (!busId.trim()) {
      alert("Please enter Bus ID");
      return;
    }

    if (!driverId.trim()) {
      alert("Please enter Driver ID");
      return;
    }

    try {
      setLoading(true);

      const location = await getDriverLocation();
      setCurrentLocation(location);

      const data = await startTrip({
        bus_id: busId,
        driver_id: driverId,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      const newTripId = data?.id || data?.trip?.id;

      if (!newTripId) {
        alert("Trip started, but trip ID was not received from backend");
        return;
      }

      setTripId(newTripId);
      tripIdRef.current = newTripId;

      startAutoLocationTracking(newTripId);

      alert("Trip started. Live location is updating automatically.");
    } catch (error) {
      console.log("Start trip error:", error);
      alert(error.response?.data?.message || error || "Failed to start trip");
    } finally {
      setLoading(false);
    }
  };

  const handleManualUpdateLocation = async () => {
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
      console.log("Manual location update error:", error);
      alert(
        error.response?.data?.message || error || "Failed to update location",
      );
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

      stopAutoLocationTracking();

      await endTrip(tripId);

      alert("Trip ended. Live location tracking stopped.");

      setTripId("");
      tripIdRef.current = "";
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
        <p>Start trip and automatically update driver mobile GPS location.</p>
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

        <div className="form-group">
          <label>Driver ID</label>
          <input
            type="text"
            placeholder="Enter Driver ID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="input"
          />
        </div>

        <p style={{ marginTop: "10px", color: "#475569" }}>
          Latitude and longitude will be captured automatically from driver
          mobile GPS.
        </p>

        {tripId && (
          <div className="success-box" style={{ marginTop: "18px" }}>
            <p>
              <strong>Active Trip ID:</strong> {tripId}
            </p>
            <p>
              <strong>Live Tracking:</strong>{" "}
              {isTracking ? "Running automatically ✅" : "Stopped ❌"}
            </p>
          </div>
        )}

        {currentLocation && (
          <div
            className="card"
            style={{ marginTop: "18px", background: "#f8fafc" }}
          >
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
            disabled={loading || isTracking}
            className="btn btn-primary"
          >
            {loading ? "Getting Location..." : "Start Trip"}
          </button>

          <button
            onClick={handleManualUpdateLocation}
            disabled={loading || !tripId}
            className="btn btn-warning"
          >
            Manual Update Location
          </button>

          <button
            onClick={handleEndTrip}
            disabled={loading || !tripId}
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
          <li>Enter Bus ID and Driver ID.</li>
          <li>Click Start Trip.</li>
          <li>Allow location permission.</li>
          <li>Live location will update automatically when driver moves.</li>
          <li>Keep the browser tab open during the trip.</li>
          <li>Click End Trip after completing the trip.</li>
        </ul>
      </div>
    </div>
  );
};

export default TripManagement;
