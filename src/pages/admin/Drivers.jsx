import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import { getDrivers } from "../../api/driverApi";

const Drivers = () => {
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
    return <h2 style={{ padding: "20px" }}>Loading drivers...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>👨‍✈️ Manage Drivers</h1>
        <p>View all drivers, assigned buses, routes, and current status.</p>
      </div>
      <BackToDashboard />

      {drivers.length === 0 ? (
        <div className="card">
          <p>No drivers found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bus</th>
                <th>Route</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td>{driver.id}</td>
                  <td>{driver.name}</td>
                  <td>{driver.email}</td>
                  <td>{driver.phone || "-"}</td>
                  <td>{driver.bus || "-"}</td>
                  <td>{driver.route || "-"}</td>
                  <td>
                    <span
                      className={
                        driver.status === "Active"
                          ? "badge badge-active"
                          : "badge badge-inactive"
                      }
                    >
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
  );
};

export default Drivers;