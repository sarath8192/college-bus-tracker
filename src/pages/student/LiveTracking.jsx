import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { getActiveTrips } from "../../api/tripApi";
import { busStops } from "../../mock/location";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* -------------------------------------------------------
   Recenter map on the bus when directions are not active
------------------------------------------------------- */
function MapRecenter({ center, directionsActive }) {
  const map = useMap();

  useEffect(() => {
    if (center && !directionsActive) {
      map.panTo(center, {
        animate: true,
        duration: 1,
      });
    }
  }, [center, directionsActive, map]);

  return null;
}

/* -------------------------------------------------------
   Fit the map around the student-to-bus road route
------------------------------------------------------- */
function FitRouteBounds({ routeCoordinates }) {
  const map = useMap();

  useEffect(() => {
    if (!routeCoordinates || routeCoordinates.length < 2) {
      return;
    }

    const bounds = L.latLngBounds(routeCoordinates);

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 16,
      animate: true,
    });
  }, [routeCoordinates, map]);

  return null;
}

/* -------------------------------------------------------
   Clicking or tapping the map starts directions
------------------------------------------------------- */
function MapClickHandler({ onMapClick, disabled }) {
  useMapEvents({
    click: () => {
      if (!disabled) {
        onMapClick();
      }
    },
  });

  return null;
}

/* -------------------------------------------------------
   Convert browser geolocation errors to readable messages
------------------------------------------------------- */
function getLocationErrorMessage(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location permission was denied. Please allow location access in your browser settings.";

    case error.POSITION_UNAVAILABLE:
      return "Your current location is unavailable. Please check GPS or location services.";

    case error.TIMEOUT:
      return "Getting your location took too long. Please try again.";

    default:
      return "Unable to get your current location.";
  }
}

const LiveTracking = () => {
  const [activeTrips, setActiveTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTripId, setSelectedTripId] = useState(null);

  /* Directions states */
  const [directionsActive, setDirectionsActive] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState("");

  const routeRequestController = useRef(null);

  /* -------------------------------------------------------
     Fetch active bus trips every five seconds
  ------------------------------------------------------- */
  const fetchActiveTrips = useCallback(async () => {
    try {
      const data = await getActiveTrips();
      const trips = Array.isArray(data) ? data : [];

      setActiveTrips(trips);

      setSelectedTripId((currentTripId) => {
        if (currentTripId !== null) {
          const selectedTripStillExists = trips.some(
            (trip) => String(trip.id) === String(currentTripId),
          );

          if (selectedTripStillExists) {
            return currentTripId;
          }
        }

        return trips.length > 0 ? trips[0].id : null;
      });
    } catch (error) {
      console.error("Error fetching active trips:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveTrips();

    const interval = setInterval(fetchActiveTrips, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchActiveTrips]);

  const selectedTrip =
    activeTrips.find(
      (trip) => String(trip.id) === String(selectedTripId),
    ) || activeTrips[0];

  const busLatitude = Number(selectedTrip?.latitude) || 16.5062;
  const busLongitude = Number(selectedTrip?.longitude) || 80.648;

  const busPosition = useMemo(
    () => [busLatitude, busLongitude],
    [busLatitude, busLongitude],
  );

  const polylinePositions = useMemo(
    () => busStops.map((stop) => stop.position),
    [],
  );

  /* -------------------------------------------------------
     Custom map markers
  ------------------------------------------------------- */
  const busMarkerIcon = useMemo(
    () =>
      new L.DivIcon({
        html: `
          <div style="
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: white;
            border: 3px solid #2563eb;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            font-size: 21px;
          ">
            🚌
          </div>
        `,
        className: "",
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -24],
      }),
    [],
  );

  const userMarkerIcon = useMemo(
    () =>
      new L.DivIcon({
        html: `
          <div style="
            position: relative;
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              position: absolute;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: rgba(37, 99, 235, 0.20);
            "></div>

            <div style="
              position: relative;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: #2563eb;
              border: 4px solid white;
              box-shadow: 0 2px 10px rgba(0,0,0,0.35);
            "></div>
          </div>
        `,
        className: "",
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -20],
      }),
    [],
  );

  const stopMarkerIcon = useMemo(
    () =>
      new L.DivIcon({
        html: `
          <div style="
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: white;
            border: 2px solid #64748b;
            box-shadow: 0 2px 8px rgba(0,0,0,0.20);
            font-size: 13px;
          ">
            📍
          </div>
        `,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    [],
  );

  const stopMarkerIconActive = useMemo(
    () =>
      new L.DivIcon({
        html: `
          <div style="
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: white;
            border: 2px solid #ef4444;
            box-shadow: 0 2px 8px rgba(0,0,0,0.20);
            font-size: 14px;
          ">
            🛑
          </div>
        `,
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    [],
  );

  /* -------------------------------------------------------
     Request the student's current location
  ------------------------------------------------------- */
  const getStudentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setRouteError(
        "Geolocation is not supported by your browser.",
      );
      return;
    }

    setRouteLoading(true);
    setRouteError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserLocation(currentLocation);
        setDirectionsActive(true);
      },
      (error) => {
        setDirectionsActive(false);
        setRouteLoading(false);
        setRouteError(getLocationErrorMessage(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
      },
    );
  }, []);

  /* -------------------------------------------------------
     Clicking Get Directions or tapping the map
  ------------------------------------------------------- */
  const handleGetDirections = useCallback(() => {
    if (directionsActive && userLocation) {
      return;
    }

    getStudentLocation();
  }, [directionsActive, getStudentLocation, userLocation]);

  /* -------------------------------------------------------
     Get road route, distance and duration from OSRM
  ------------------------------------------------------- */
  useEffect(() => {
    if (!directionsActive || !userLocation || !selectedTrip) {
      return undefined;
    }

    const fetchRoadRoute = async () => {
      if (routeRequestController.current) {
        routeRequestController.current.abort();
      }

      const controller = new AbortController();
      routeRequestController.current = controller;

      setRouteLoading(true);
      setRouteError("");

      const [userLatitude, userLongitude] = userLocation;

      const routeUrl =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${userLongitude},${userLatitude};` +
        `${busLongitude},${busLatitude}` +
        `?overview=full&geometries=geojson&steps=false`;

      try {
        const response = await fetch(routeUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to contact the routing service.");
        }

        const data = await response.json();

        if (
          data.code !== "Ok" ||
          !Array.isArray(data.routes) ||
          data.routes.length === 0
        ) {
          throw new Error(
            "No road route was found between your location and the bus.",
          );
        }

        const bestRoute = data.routes[0];

        const convertedCoordinates =
          bestRoute.geometry.coordinates.map(
            ([longitude, latitude]) => [latitude, longitude],
          );

        setRouteCoordinates(convertedCoordinates);
        setRouteDistance(bestRoute.distance / 1000);
        setRouteDuration(bestRoute.duration / 60);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Routing error:", error);

          setRouteError(
            error.message ||
              "Unable to calculate directions. Please try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setRouteLoading(false);
        }
      }
    };

    fetchRoadRoute();

    return () => {
      controllerCleanup();
    };

    function controllerCleanup() {
      if (routeRequestController.current) {
        routeRequestController.current.abort();
      }
    }
  }, [
    directionsActive,
    userLocation,
    busLatitude,
    busLongitude,
    selectedTrip,
  ]);

  /* -------------------------------------------------------
     Clear displayed route
  ------------------------------------------------------- */
  const handleClearRoute = () => {
    if (routeRequestController.current) {
      routeRequestController.current.abort();
    }

    setDirectionsActive(false);
    setUserLocation(null);
    setRouteCoordinates([]);
    setRouteDistance(null);
    setRouteDuration(null);
    setRouteLoading(false);
    setRouteError("");
  };

  useEffect(() => {
    return () => {
      if (routeRequestController.current) {
        routeRequestController.current.abort();
      }
    };
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

  return (
    <StudentLayout>
      <div
        className="page"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - var(--navbar-height))",
          paddingBottom: "24px",
        }}
      >
        <div
          className="page-header"
          style={{
            marginBottom: "20px",
            flexShrink: 0,
          }}
        >
          <div className="page-title-area">
            <h1>Live Bus Tracking</h1>

            <p>
              Track your college bus in real time. Tap the map or select
              Get Directions to view the road distance from your location.
            </p>
          </div>
        </div>

        {activeTrips.length === 0 ? (
          <div
            className="empty-state"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="empty-state-icon">🚌</div>
            <h3>No Active Trips</h3>
            <p>
              Drivers must start a trip from their mobile console to
              update the live location tracking feed.
            </p>
          </div>
        ) : (
          <div
            className="tracking-layout"
            style={{
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Map */}
            <div
              className="map-container-wrapper"
              style={{
                position: "relative",
              }}
            >
              {/* Map buttons */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1000,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "10px",
                  width: "calc(100% - 120px)",
                  pointerEvents: "none",
                }}
              >
                {!directionsActive ? (
                  <button
                    type="button"
                    onClick={handleGetDirections}
                    disabled={routeLoading}
                    style={{
                      ...styles.primaryButton,
                      pointerEvents: "auto",
                    }}
                  >
                    {routeLoading
                      ? "Getting Location..."
                      : "🧭 Get Directions"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClearRoute}
                    style={{
                      ...styles.clearButton,
                      pointerEvents: "auto",
                    }}
                  >
                    ✕ Clear Route
                  </button>
                )}
              </div>

              {/* Distance information */}
              {directionsActive && (
                <div style={styles.routeSummary}>
                  {routeLoading ? (
                    <div style={styles.routeLoading}>
                      <span style={styles.smallSpinner}></span>
                      Calculating the latest road route...
                    </div>
                  ) : routeDistance !== null &&
                    routeDuration !== null ? (
                    <>
                      <div>
                        <div style={styles.summaryLabel}>
                          Road distance
                        </div>

                        <strong style={styles.summaryValue}>
                          {routeDistance.toFixed(1)} km
                        </strong>
                      </div>

                      <div style={styles.summaryDivider}></div>

                      <div>
                        <div style={styles.summaryLabel}>
                          Estimated time
                        </div>

                        <strong style={styles.summaryValue}>
                          {Math.max(1, Math.round(routeDuration))} min
                        </strong>
                      </div>
                    </>
                  ) : null}
                </div>
              )}

              {routeError && (
                <div style={styles.errorMessage}>
                  <span>⚠️</span>
                  <span>{routeError}</span>
                </div>
              )}

              <MapContainer
                center={busPosition}
                zoom={14}
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: directionsActive ? "grab" : "crosshair",
                }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Existing college route */}
                <Polyline
                  positions={polylinePositions}
                  pathOptions={{
                    color: "#2563eb",
                    weight: 5,
                    opacity: directionsActive ? 0.25 : 0.6,
                    dashArray: "6, 8",
                  }}
                />

                {/* Student-to-bus road route */}
                {routeCoordinates.length > 1 && (
                  <>
                    <Polyline
                      positions={routeCoordinates}
                      pathOptions={{
                        color: "#ffffff",
                        weight: 9,
                        opacity: 0.9,
                      }}
                    />

                    <Polyline
                      positions={routeCoordinates}
                      pathOptions={{
                        color: "#2563eb",
                        weight: 6,
                        opacity: 1,
                      }}
                    />
                  </>
                )}

                {/* Student location */}
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={userMarkerIcon}
                  >
                    <Popup>
                      <div
                        style={{
                          fontFamily: "sans-serif",
                          padding: "4px",
                        }}
                      >
                        <strong>Your Current Location</strong>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginTop: "4px",
                          }}
                        >
                          Starting point
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Bus stops */}
                {busStops.map((stop) => (
                  <Marker
                    key={stop.id}
                    position={stop.position}
                    icon={
                      stop.id === 3
                        ? stopMarkerIconActive
                        : stopMarkerIcon
                    }
                  >
                    <Popup>
                      <div style={{ fontFamily: "sans-serif" }}>
                        <strong style={{ fontSize: "14px" }}>
                          {stop.name}
                        </strong>

                        <div
                          style={{
                            fontSize: "11px",
                            color: "#64748b",
                            marginTop: "4px",
                          }}
                        >
                          Stop ID: #{stop.id}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Active bus */}
                {selectedTrip && (
                  <Marker
                    position={busPosition}
                    icon={busMarkerIcon}
                  >
                    <Popup>
                      <div
                        style={{
                          fontFamily: "sans-serif",
                          padding: "4px",
                        }}
                      >
                        <strong
                          style={{
                            fontSize: "14px",
                            display: "block",
                          }}
                        >
                          Bus Trip #{selectedTrip.id}
                        </strong>

                        <span
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            display: "block",
                            marginTop: "4px",
                          }}
                        >
                          Bus: {selectedTrip.bus_id}
                        </span>

                        <span
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            display: "block",
                          }}
                        >
                          Speed: {selectedTrip.speed || 0} km/h
                        </span>

                        {routeDistance !== null && (
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#2563eb",
                              display: "block",
                              marginTop: "5px",
                              fontWeight: 700,
                            }}
                          >
                            {routeDistance.toFixed(1)} km from you
                          </span>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                )}

                <MapClickHandler
                  onMapClick={handleGetDirections}
                  disabled={
                    directionsActive ||
                    routeLoading ||
                    !selectedTrip
                  }
                />

                <MapRecenter
                  center={busPosition}
                  directionsActive={directionsActive}
                />

                <FitRouteBounds
                  routeCoordinates={routeCoordinates}
                />
              </MapContainer>
            </div>

            {/* Right information panel */}
            <div className="tracking-info-panel">
              {activeTrips.length > 1 && (
                <div
                  className="panel-section"
                  style={{
                    backgroundColor: "var(--neutral-light)",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--neutral-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Select Commute Trip
                  </label>

                  <select
                    className="input"
                    value={selectedTripId ?? ""}
                    onChange={(event) =>
                      setSelectedTripId(event.target.value)
                    }
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

              {/* Status and speed */}
              <div className="panel-section">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span
                      className="badge badge-active"
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                      }}
                    >
                      {selectedTrip?.status || "Broadcasting"}
                    </span>

                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        marginTop: "8px",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      Trip #{selectedTrip?.id}
                    </h2>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "800",
                        color: "var(--primary)",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {selectedTrip?.speed || 0}
                    </div>

                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--neutral-muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      km/h Speed
                    </span>
                  </div>
                </div>
              </div>

              {/* Directions information */}
              <div
                className="panel-section"
                style={{
                  backgroundColor: directionsActive
                    ? "#eff6ff"
                    : "var(--neutral-light)",
                }}
              >
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Directions to Bus
                </h3>

                {routeDistance !== null &&
                routeDuration !== null ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginTop: "12px",
                    }}
                  >
                    <div style={styles.panelMetric}>
                      <span style={styles.panelMetricLabel}>
                        Distance
                      </span>

                      <strong style={styles.panelMetricValue}>
                        {routeDistance.toFixed(1)} km
                      </strong>
                    </div>

                    <div style={styles.panelMetric}>
                      <span style={styles.panelMetricLabel}>
                        Travel time
                      </span>

                      <strong style={styles.panelMetricValue}>
                        {Math.max(
                          1,
                          Math.round(routeDuration),
                        )}{" "}
                        min
                      </strong>
                    </div>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "var(--neutral-muted)",
                      fontSize: "13px",
                      marginTop: "8px",
                      lineHeight: 1.5,
                    }}
                  >
                    Tap anywhere on the map or select Get Directions
                    to calculate the road route from your location to
                    the bus.
                  </p>
                )}
              </div>

              {/* ETA and driver */}
              <div
                className="panel-section"
                style={{
                  backgroundColor: "var(--primary-light)",
                }}
              >
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Estimated Arrival
                </h3>

                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: "800",
                    color: "var(--primary-hover)",
                    margin: "4px 0 12px",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {routeDuration !== null
                    ? `${Math.max(
                        1,
                        Math.round(routeDuration),
                      )} Mins`
                    : "10 - 15 Mins"}
                </div>

                <div
                  className="driver-info-card"
                  style={{
                    borderTop:
                      "1px solid rgba(37, 99, 235, 0.15)",
                    paddingTop: "12px",
                  }}
                >
                  <div className="driver-avatar">👨‍✈️</div>

                  <div className="driver-details">
                    <h4>Ramesh Kumar</h4>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>📞 +91 98765 43210</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Route progress */}
              <div
                className="panel-section"
                style={{
                  flex: 1,
                  overflowY: "auto",
                }}
              >
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "var(--neutral-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "16px",
                  }}
                >
                  Route Progress
                </h3>

                <ul className="progress-timeline">
                  {busStops.map((stop) => {
                    const isCompleted = stop.id === 1;
                    const isActive = stop.id === 2;

                    return (
                      <li
                        key={stop.id}
                        className={`timeline-item ${
                          isActive
                            ? "active"
                            : isCompleted
                              ? "completed"
                              : ""
                        }`}
                      >
                        <div className="timeline-dot"></div>

                        <div className="timeline-content">
                          <div className="stop-name">
                            {stop.name}
                          </div>

                          <div className="stop-status">
                            {isActive
                              ? "Bus approaching stop"
                              : isCompleted
                                ? "Bus departed stop"
                                : "Commuters waiting"}
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

const styles = {
  primaryButton: {
    minHeight: "42px",
    padding: "0 18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
    cursor: "pointer",
  },

  clearButton: {
    minHeight: "42px",
    padding: "0 18px",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#dc2626",
    fontSize: "14px",
    fontWeight: 700,
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.15)",
    cursor: "pointer",
  },

  routeSummary: {
    position: "absolute",
    bottom: "18px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: "18px",
    minWidth: "270px",
    padding: "12px 18px",
    borderRadius: "14px",
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    boxShadow: "0 8px 25px rgba(15, 23, 42, 0.20)",
    backdropFilter: "blur(10px)",
  },

  routeLoading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "9px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 600,
  },

  smallSpinner: {
    width: "15px",
    height: "15px",
    border: "2px solid #bfdbfe",
    borderTopColor: "#2563eb",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  summaryLabel: {
    color: "#64748b",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  summaryValue: {
    display: "block",
    color: "#0f172a",
    fontSize: "18px",
    marginTop: "2px",
  },

  summaryDivider: {
    width: "1px",
    height: "38px",
    backgroundColor: "#e2e8f0",
  },

  errorMessage: {
    position: "absolute",
    left: "50%",
    bottom: "18px",
    transform: "translateX(-50%)",
    zIndex: 1001,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "calc(100% - 40px)",
    maxWidth: "520px",
    padding: "11px 14px",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
    fontSize: "13px",
    fontWeight: 600,
    boxShadow: "0 5px 18px rgba(15, 23, 42, 0.16)",
  },

  panelMetric: {
    padding: "12px",
    border: "1px solid #dbeafe",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },

  panelMetricLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  panelMetricValue: {
    display: "block",
    color: "#1d4ed8",
    fontSize: "17px",
    marginTop: "3px",
  },
};

export default LiveTracking;