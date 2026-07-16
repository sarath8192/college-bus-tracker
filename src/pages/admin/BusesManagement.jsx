import { useEffect, useState } from "react";
import { getBuses } from "../../api/busApi";
import StudentLayout from "../../components/layouts/StudentLayout";

const BusesManagement = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBuses = async () => {
    try {
      const data = await getBuses();
      setBuses(data);
    } catch (error) {
      console.log("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Compiling bus rosters...</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>🚌 Buses Management (Alternative View)</h1>
            <p>Roster of all college bus fleets in database including active driver assignments.</p>
          </div>
        </div>

        {buses.length === 0 ? (
          <div className="empty-state">
            <p>No buses found</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Bus Number</th>
                  <th>Route</th>
                  <th>Driver Name</th>
                  <th>Total Seats</th>
                  <th>Occupied Seats</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.id}</td>
                    <td style={{ fontWeight: "700" }}>{bus.busNumber || bus.bus_number || "N/A"}</td>
                    <td>{bus.route || "N/A"}</td>
                    <td>{bus.driver || "N/A"}</td>
                    <td>{bus.totalSeats || bus.total_seats || 0}</td>
                    <td>{bus.occupiedSeats || bus.occupied_seats || 0}</td>
                    <td>
                      <span className={(bus.status || "").toLowerCase() === "active" ? "badge badge-active" : "badge badge-inactive"}>
                        {bus.status || "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default BusesManagement;
