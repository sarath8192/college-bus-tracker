import DashboardCard from "../../components/common/DashboardCard";
import LogoutButton from "../../components/common/LogoutButton";

function DriverDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Driver Dashboard</h1>

      <LogoutButton />

      <p style={{ marginTop: "15px", color: "#555" }}>
        Welcome driver. Manage your trip, seats, emergency alerts, and trip
        history from here.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "25px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard title="Assigned Bus" value="VIT-01" />
        <DashboardCard title="Route" value="Vijayawada" />
        <DashboardCard title="Trip Status" value="Not Started" />
        <DashboardCard title="Seat Occupancy" value="20 / 40" />
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <h2>Driver Actions</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "15px",
            flexWrap: "wrap",
          }}
        >
          <a href="/driver/trip" style={buttonStyle}>
            Manage Trip
          </a>

          <a href="/driver/seats" style={buttonStyle}>
            Update Seats
          </a>

          <a href="/driver/emergency" style={dangerButtonStyle}>
            Emergency Alert
          </a>

          <a href="/driver/history" style={buttonStyle}>
            Trip History
          </a>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 14px",
  backgroundColor: "#2563eb",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
  display: "inline-block",
};

const dangerButtonStyle = {
  padding: "10px 14px",
  backgroundColor: "#dc2626",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
  display: "inline-block",
};

export default DriverDashboard;