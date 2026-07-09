import { useEffect, useState } from "react";
import { getBuses } from "../../api/busApi";

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
    return <h2>Loading buses...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚌 Buses Management</h1>

      {buses.length === 0 ? (
        <p>No buses found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Driver</th>
              <th>Total Seats</th>
              <th>Occupied Seats</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.route}</td>
                <td>{bus.driver}</td>
                <td>{bus.totalSeats}</td>
                <td>{bus.occupiedSeats}</td>
                <td>{bus.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusesManagement;
