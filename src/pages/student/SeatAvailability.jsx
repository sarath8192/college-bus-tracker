import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import { getBuses } from "../../api/busApi";

const SeatAvailability = () => {
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
    return <h2 style={{ padding: "20px" }}>Loading seat availability...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🪑 Seat Availability</h1>
        <p>Check available seats for each college bus in real time.</p>
      </div>
      <BackToDashboard />

      {buses.length === 0 ? (
        <div className="card">
          <p>No bus data found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Total Seats</th>
                <th>Occupied Seats</th>
                <th>Available Seats</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {buses.map((bus) => {
                const totalSeats = bus.total_seats || bus.totalSeats || 0;
                const occupiedSeats =
                  bus.occupied_seats || bus.occupiedSeats || 0;
                const availableSeats = totalSeats - occupiedSeats;

                return (
                  <tr key={bus.id}>
                    <td>{bus.bus_number || bus.busNumber || "-"}</td>
                    <td>{totalSeats}</td>
                    <td>{occupiedSeats}</td>
                    <td>{availableSeats}</td>
                    <td>
                      <span
                        className={
                          bus.status === "Active"
                            ? "badge badge-active"
                            : "badge badge-inactive"
                        }
                      >
                        {bus.status || "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeatAvailability;
