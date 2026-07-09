import { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

function SeatManagement() {
  const [occupied, setOccupied] = useState(35);

  const totalSeats = 50;

  return (
    <StudentLayout>
      <h1>🪑 Seat Management</h1>

      <h2>Bus Number: VIT-01</h2>

      <p>Total Seats: {totalSeats}</p>

      <p>Occupied Seats: {occupied}</p>

      <p>Available Seats: {totalSeats - occupied}</p>

      <button
        onClick={() => setOccupied(occupied + 1)}
        style={{
          marginRight: "10px",
        }}
      >
        + Occupied
      </button>

      <button onClick={() => setOccupied(occupied - 1)}>- Occupied</button>
    </StudentLayout>
  );
}

export default SeatManagement;
