import { useEffect, useMemo, useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { getTrips } from "../../api/tripApi";
import { TableSkeleton } from "../../components/common/SkeletonLoader";

const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTrips();

        console.log("Trip API response:", response);

        /*
          Supports all common response formats:

          1. response = [...]
          2. response = { trips: [...] }
          3. response = { data: [...] }
          4. response = { data: { trips: [...] } }
        */

        let tripData = [];

        if (Array.isArray(response)) {
          tripData = response;
        } else if (Array.isArray(response?.trips)) {
          tripData = response.trips;
        } else if (Array.isArray(response?.data)) {
          tripData = response.data;
        } else if (Array.isArray(response?.data?.trips)) {
          tripData = response.data.trips;
        }

        setTrips(tripData);
      } catch (err) {
        console.error("Error fetching trips:", err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load trip history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return trips.filter((trip) => {
      const busId = String(
        trip?.bus_id?.bus_number ??
          trip?.bus_id?.busNumber ??
          trip?.bus_id?._id ??
          trip?.bus_id ??
          ""
      ).toLowerCase();

      const driverId = String(
        trip?.driver_id?.name ??
          trip?.driver_id?.fullName ??
          trip?.driver_id?._id ??
          trip?.driver_id ??
          ""
      ).toLowerCase();

      const status = String(trip?.status ?? "").toLowerCase();

      const matchesSearch =
        busId.includes(searchValue) || driverId.includes(searchValue);

      const matchesFilter =
        filter === "all" || status === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [trips, filter, search]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString();
  };

  const getBusValue = (trip) => {
    return (
      trip?.bus_id?.bus_number ??
      trip?.bus_id?.busNumber ??
      trip?.bus_id?._id ??
      trip?.bus_id ??
      "-"
    );
  };

  const getDriverValue = (trip) => {
    return (
      trip?.driver_id?.name ??
      trip?.driver_id?.fullName ??
      trip?.driver_id?._id ??
      trip?.driver_id ??
      "-"
    );
  };

  const getTripId = (trip, index) => {
    return trip?.id ?? trip?._id ?? index + 1;
  };

  const getStatusClass = (status) => {
    const normalizedStatus = String(status || "").toLowerCase();

    if (normalizedStatus === "active") {
      return "badge badge-warning";
    }

    if (normalizedStatus === "completed") {
      return "badge badge-success";
    }

    return "badge";
  };

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Trip History</h1>
            <p>
              Review completed routes, speeds, timestamps, and logged
              telemetry coordinates.
            </p>
          </div>
        </div>

        {error && (
          <div
            className="card"
            style={{
              marginBottom: "20px",
              padding: "16px",
              borderLeft: "4px solid var(--danger, #dc3545)",
            }}
          >
            <strong>Unable to load trips</strong>
            <p style={{ margin: "6px 0 0" }}>{error}</p>
          </div>
        )}

        {!loading && trips.length > 0 && (
          <div
            className="card"
            style={{
              padding: "16px 24px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`btn ${
                  filter === "all" ? "btn-primary" : "btn-outline"
                }`}
                style={{ padding: "6px 14px", fontSize: "13px" }}
              >
                All Trips
              </button>

              <button
                type="button"
                onClick={() => setFilter("completed")}
                className={`btn ${
                  filter === "completed" ? "btn-success" : "btn-outline"
                }`}
                style={{ padding: "6px 14px", fontSize: "13px" }}
              >
                Completed
              </button>

              <button
                type="button"
                onClick={() => setFilter("active")}
                className={`btn ${
                  filter === "active" ? "btn-warning" : "btn-outline"
                }`}
                style={{ padding: "6px 14px", fontSize: "13px" }}
              >
                Active
              </button>
            </div>

            <div style={{ minWidth: "240px" }}>
              <input
                type="text"
                placeholder="Search Bus or Driver ID..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="input"
              />
            </div>
          </div>
        )}

        {loading ? (
          <TableSkeleton rows={5} cols={8} />
        ) : error && trips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">⚠️</div>
            <h3>Trip History Could Not Be Loaded</h3>
            <p>Check your backend server, API URL, and authentication token.</p>
          </div>
        ) : trips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📜</div>
            <h3>No Previous Trips</h3>
            <p>You have not logged or completed any bus trips yet.</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No Results Found</h3>
            <p>We could not find any trips matching your query.</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Bus ID</th>
                    <th>Driver ID</th>
                    <th>Final Coordinates</th>
                    <th>Speed</th>
                    <th>Status</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTrips.map((trip, index) => {
                    const tripId = getTripId(trip, index);

                    return (
                      <tr key={trip?._id ?? trip?.id ?? index}>
                        <td style={{ fontWeight: "700" }}>#{tripId}</td>

                        <td
                          style={{
                            fontWeight: "600",
                            color: "var(--neutral-dark)",
                          }}
                        >
                          {getBusValue(trip)}
                        </td>

                        <td>{getDriverValue(trip)}</td>

                        <td>
                          <span
                            style={{
                              fontSize: "12px",
                              fontFamily: "monospace",
                            }}
                          >
                            Lat: {trip?.latitude ?? "-"}
                            <br />
                            Lon: {trip?.longitude ?? "-"}
                          </span>
                        </td>

                        <td style={{ fontWeight: "600" }}>
                          {trip?.speed ?? 0} km/h
                        </td>

                        <td>
                          <span className={getStatusClass(trip?.status)}>
                            {trip?.status ?? "unknown"}
                          </span>
                        </td>

                        <td style={{ fontSize: "13px" }}>
                          {formatDate(trip?.start_time)}
                        </td>

                        <td style={{ fontSize: "13px" }}>
                          {formatDate(trip?.end_time)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mobile-history-grid">
              {filteredTrips.map((trip, index) => {
                const tripId = getTripId(trip, index);
                const isActive =
                  String(trip?.status).toLowerCase() === "active";

                return (
                  <div
                    key={trip?._id ?? trip?.id ?? index}
                    className="card"
                    style={{
                      borderLeft: `4px solid ${
                        isActive
                          ? "var(--warning)"
                          : "var(--success)"
                      }`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontWeight: "800" }}>
                        Trip ID: #{tripId}
                      </span>

                      <span className={getStatusClass(trip?.status)}>
                        {trip?.status ?? "unknown"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        fontSize: "13px",
                        color: "var(--neutral-muted)",
                        margin: "8px 0",
                      }}
                    >
                      <div>
                        <strong>Bus ID:</strong> {getBusValue(trip)}
                      </div>

                      <div>
                        <strong>Driver ID:</strong> {getDriverValue(trip)}
                      </div>

                      <div>
                        <strong>Speed:</strong> {trip?.speed ?? 0} km/h
                      </div>

                      <div>
                        <strong>Location:</strong>{" "}
                        {trip?.latitude ?? "-"}, {trip?.longitude ?? "-"}
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop:
                          "1px solid var(--neutral-border)",
                        paddingTop: "8px",
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "var(--neutral-muted)",
                      }}
                    >
                      <div>
                        <strong>Start:</strong>{" "}
                        {formatDate(trip?.start_time)}
                      </div>

                      <div>
                        <strong>End:</strong>{" "}
                        {formatDate(trip?.end_time)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <style>
          {`
            .mobile-history-grid {
              display: none;
              flex-direction: column;
              gap: 16px;
              margin-top: 16px;
            }

            @media (max-width: 768px) {
              .table-container {
                display: none !important;
              }

              .mobile-history-grid {
                display: flex !important;
              }
            }
          `}
        </style>
      </div>
    </StudentLayout>
  );
};

export default TripHistory;