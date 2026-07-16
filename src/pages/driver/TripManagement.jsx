import { useRef, useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { startTrip, updateTripLocation, endTrip } from "../../api/tripApi";
import { busStops } from "../../mock/location";

const TripManagement = () => {
  const [busId, setBusId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [tripId, setTripId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [completedStops, setCompletedStops] = useState([1]); // Benz Circle completed by default

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
        // If driver has paused, do not broadcast location updates
        if (isPaused) return;

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
    setIsPaused(false);
  };

  const stopAutoLocationTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setIsTracking(false);
    setIsPaused(false);
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

      alert("Trip started successfully. Live location is updating automatically.");
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

      alert("Location coordinates updated successfully");
    } catch (error) {
      console.log("Manual location update error:", error);
      alert(
        error.response?.data?.message || error || "Failed to update location",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePauseTrip = () => {
    setIsPaused(true);
    alert("Trip status set to PAUSED. Location broadcasting is suspended.");
  };

  const handleResumeTrip = () => {
    setIsPaused(false);
    alert("Trip status RESUMED. GPS broadcasting reactivated.");
    // Instantly fire location update
    handleManualUpdateLocation();
  };

  const handleEndTrip = async () => {
    if (!tripId) {
      alert("Please start trip first");
      return;
    }

    const confirmEnd = window.confirm("Are you sure you want to end this trip?");
    if (!confirmEnd) return;

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

  const toggleStopCompleted = (stopId) => {
    if (completedStops.includes(stopId)) {
      setCompletedStops(completedStops.filter(id => id !== stopId));
    } else {
      setCompletedStops([...completedStops, stopId]);
    }
  };

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Trip Management</h1>
            <p>Start route broadcast to share live GPS coordinates with students waiting at checkpoints.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", alignItems: "start" }} className="grid-2">
          
          {/* Main Controls Card */}
          <div className="card">
            <h2>Start Commute Route</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "14px", marginTop: "4px", marginBottom: "24px" }}>
              Enter assigned vehicle ID and driver code. Geolocation coordinates will be fetched.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="busId">Bus ID / Number</label>
                  <input
                    type="text"
                    id="busId"
                    placeholder="e.g. VIT-01"
                    value={busId}
                    onChange={(e) => setBusId(e.target.value)}
                    className="input"
                    disabled={isTracking}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="driverId">Driver ID</label>
                  <input
                    type="text"
                    id="driverId"
                    placeholder="e.g. DRV-89"
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    className="input"
                    disabled={isTracking}
                  />
                </div>
              </div>

              {/* Status Box */}
              {tripId && (
                <div className="alert-box success" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 0 }}>
                  <div>
                    <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--success-hover)", fontWeight: "700" }}>
                      Active Transit Stream
                    </span>
                    <h4 style={{ margin: "2px 0 0", fontSize: "16px", fontWeight: "800" }}>Trip ID: #{tripId}</h4>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: isPaused ? "var(--warning)" : "var(--success)",
                        display: "inline-block",
                        animation: isPaused ? "none" : "pulse-ring 1.5s infinite",
                      }}
                    />
                    <span style={{ fontSize: "13px", fontWeight: "700" }}>
                      {isPaused ? "Broadcasting Paused" : "Broadcasting Live"}
                    </span>
                  </div>
                </div>
              )}

              {/* Live coordinates tracker */}
              {currentLocation && (
                <div className="card" style={{ background: "var(--neutral-light)", padding: "16px", border: "1px dashed var(--neutral-border)", margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "14px", margin: 0, fontWeight: "700" }}>📡 GPS Telemetry Radar</h3>
                    <span className="badge badge-active" style={{ fontSize: "10px" }}>High Accuracy</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "12px", fontFamily: "monospace" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "600" }}>LATITUDE</div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--neutral-dark)" }}>{currentLocation.latitude}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "600" }}>LONGITUDE</div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--neutral-dark)" }}>{currentLocation.longitude}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                {!isTracking ? (
                  <button
                    onClick={handleStartTrip}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: "14px" }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }}></span>
                        <span style={{ marginLeft: "8px" }}>Synchronizing GPS...</span>
                      </>
                    ) : (
                      "Start Broadcast Trip"
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleManualUpdateLocation}
                      disabled={loading}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: "12px 14px", fontSize: "13px" }}
                    >
                      Ping GPS coordinates
                    </button>

                    {isPaused ? (
                      <button
                        onClick={handleResumeTrip}
                        className="btn btn-success"
                        style={{ flex: 1, padding: "12px 14px", fontSize: "13px" }}
                      >
                        Resume Trip
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseTrip}
                        className="btn btn-warning"
                        style={{ flex: 1, padding: "12px 14px", fontSize: "13px" }}
                      >
                        Pause Trip
                      </button>
                    )}

                    <button
                      onClick={handleEndTrip}
                      disabled={loading}
                      className="btn btn-danger"
                      style={{ flex: 1, padding: "12px 14px", fontSize: "13px" }}
                    >
                      End Broadcast
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right side: Route Progress Timeline & Instructions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Route Progress tracker */}
            {isTracking && (
              <div className="card fade-in-up">
                <h2>Route Stops Checklist</h2>
                <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "16px" }}>
                  Check off stops as you complete them to update ETA calculations.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {busStops.map((stop) => {
                    const isDone = completedStops.includes(stop.id);
                    return (
                      <div
                        key={stop.id}
                        onClick={() => toggleStopCompleted(stop.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          backgroundColor: isDone ? "var(--success-light)" : "var(--neutral-light)",
                          border: `1.5px solid ${isDone ? "var(--success)" : "var(--neutral-border)"}`,
                          cursor: "pointer"
                        }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: "600" }}>{stop.name}</span>
                        <span className={`badge ${isDone ? "badge-success" : "badge-gray"}`} style={{ fontSize: "10px" }}>
                          {isDone ? "Completed" : "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Commute Instructions card */}
            <div className="card">
              <h2>Commute Guidelines</h2>
              <ul style={{ paddingLeft: "20px", marginTop: "12px", fontSize: "14px", lineHeight: "1.8", color: "var(--neutral-muted)" }}>
                <li>Allow browser permissions to access your mobile **Device Location** GPS.</li>
                <li>Keep this screen active while driving to automatically sync locations.</li>
                <li>Use **Pause Trip** during long intermediate stops.</li>
                <li>Always click **End Broadcast** when your route is completed.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </StudentLayout>
  );
};

export default TripManagement;
