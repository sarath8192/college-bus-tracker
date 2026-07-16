import { useEffect, useState } from "react";
import { getDrivers } from "../../api/driverApi";
import StudentLayout from "../../components/layouts/StudentLayout";

const DriversManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      console.log("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Compiling driver rosters...</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>👨‍✈️ Drivers Management (Alternative View)</h1>
            <p>Database roster of college bus drivers, phone contacts, and vehicle assignments.</p>
          </div>
        </div>

        {drivers.length === 0 ? (
          <div className="empty-state">
            <p>No drivers found</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Driver Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Assigned Bus</th>
                  <th>Route</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.id}</td>
                    <td style={{ fontWeight: "600" }}>{driver.name}</td>
                    <td>{driver.email}</td>
                    <td>{driver.phone || "N/A"}</td>
                    <td>
                      <span className="badge badge-active" style={{ fontSize: "11px" }}>
                        {driver.bus || "Unassigned"}
                      </span>
                    </td>
                    <td>{driver.route || "N/A"}</td>
                    <td>
                      <span className={driver.status === "Active" ? "badge badge-success" : "badge badge-inactive"}>
                        {driver.status || "Inactive"}
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

export default DriversManagement;
