import StudentLayout from "../../components/layouts/studentlayout";

function DriverDashboard() {
  return (
    <StudentLayout>
      <h1>👨‍✈️ Driver Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Assigned Bus</h3>
          <p>VIT-01</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Route</h3>
          <p>Vijayawada → VIT</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Status</h3>
          <p>Active</p>
        </div>
      </div>
    </StudentLayout>
  );
}

export default DriverDashboard;