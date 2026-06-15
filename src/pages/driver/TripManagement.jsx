import { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

function TripManagement() {
  const [status, setStatus] = useState("Not Started");

  return (
    <StudentLayout>
      <h1>🚍 Trip Management</h1>

      <h2>Current Status: {status}</h2>

      <button
        onClick={() => setStatus("Trip Started")}
        style={{
          padding: "10px",
          marginRight: "10px",
        }}
      >
        Start Trip
      </button>

      <button
        onClick={() => setStatus("Trip Ended")}
        style={{
          padding: "10px",
        }}
      >
        End Trip
      </button>
    </StudentLayout>
  );
}

export default TripManagement;