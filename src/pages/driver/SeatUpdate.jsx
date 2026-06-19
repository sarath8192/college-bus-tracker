import BackToDashboard from "../../components/common/BackToDashboard";
import { useState } from "react";

const SeatUpdate = () => {
  const [totalSeats, setTotalSeats] = useState(40);
  const [occupiedSeats, setOccupiedSeats] = useState(0);

  const availableSeats = totalSeats - occupiedSeats;

  const handleIncrease = () => {
    if (occupiedSeats < totalSeats) {
      setOccupiedSeats(occupiedSeats + 1);
    }
  };

  const handleDecrease = () => {
    if (occupiedSeats > 0) {
      setOccupiedSeats(occupiedSeats - 1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🪑 Seat Update</h1>
      <BackToDashboard />

      <div style={styles.card}>
        <h2>Bus Seat Occupancy</h2>

        <p>
          <strong>Total Seats:</strong> {totalSeats}
        </p>

        <p>
          <strong>Occupied Seats:</strong> {occupiedSeats}
        </p>

        <p>
          <strong>Available Seats:</strong> {availableSeats}
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={handleIncrease} style={styles.button}>
            + Add Passenger
          </button>

          <button onClick={handleDecrease} style={styles.dangerButton}>
            - Remove Passenger
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    marginTop: "20px",
  },
  button: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  dangerButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
  },
};

export default SeatUpdate;