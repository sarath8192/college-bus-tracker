import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import { getTrips } from "../../api/tripApi";

const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (error) {
      console.log("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading trip history...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📜 Trip History</h1>
        <p>View all active and completed bus trips.</p>
      </div>
<BackToDashboard />
      {trips.length === 0 ? (
        <div className="card">
          <p>No trips found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Bus ID</th>
                <th>Driver ID</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Speed</th>
                <th>Status</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>

            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td>{trip.id}</td>
                  <td>{trip.bus_id}</td>
                  <td>{trip.driver_id}</td>
                  <td>{trip.latitude}</td>
                  <td>{trip.longitude}</td>
                  <td>{trip.speed} km/h</td>
                  <td>
                    <span
                      className={
                        trip.status === "active"
                          ? "badge badge-active"
                          : "badge badge-inactive"
                      }
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td>
                    {trip.start_time
                      ? new Date(trip.start_time).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    {trip.end_time
                      ? new Date(trip.end_time).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TripHistory;