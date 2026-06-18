import { useEffect, useState } from "react";
import { getDrivers } from "../../api/driverApi";

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
    return <h2>Loading drivers...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>👨‍✈️ Drivers Management</h1>

      {drivers.length === 0 ? (
        <p>No drivers found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
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
                <td>{driver.phone}</td>
                <td>{driver.bus}</td>
                <td>{driver.route}</td>
                <td>{driver.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DriversManagement;