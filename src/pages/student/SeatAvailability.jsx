import StudentLayout from "../../components/layouts/StudentLayout";

import SeatCard from "../../components/common/SeatCard";

import seats from "../../mock/seats";

function SeatAvailability() {

  const occupiedSeats =
    seats.filter(
      seat => seat.occupied
    ).length;

  const availableSeats =
    seats.length - occupiedSeats;

  return (
    <StudentLayout>

      <h1>
        🪑 Seat Availability
      </h1>

      <h3>
        Bus Number: VIT-01
      </h3>

      <p>
        Total Seats: {seats.length}
      </p>

      <p>
        Occupied Seats: {occupiedSeats}
      </p>

      <p>
        Available Seats: {availableSeats}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5, 60px)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {
          seats.map((seat) => (
            <SeatCard
              key={seat.id}
              occupied={seat.occupied}
            />
          ))
        }
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        🟩 Available

        <br />

        🟥 Occupied
      </div>

    </StudentLayout>
  );
}

export default SeatAvailability;