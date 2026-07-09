import DashboardCard from "../../components/common/DashboardCard";
import LogoutButton from "../../components/common/LogoutButton";

function DriverDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>👨‍✈️ Driver Dashboard</h1>
        <p>Manage your trip, seats, emergencies, and route activity.</p>
      </div>

      <LogoutButton />

      <div className="grid" style={{ marginTop: "24px" }}>
        <DashboardCard title="Assigned Bus" value="VIT-01" />
        <DashboardCard title="Route" value="Vijayawada" />
        <DashboardCard title="Trip Status" value="Not Started" />
        <DashboardCard title="Seat Occupancy" value="20 / 40" />
      </div>

      <div className="action-panel">
        <h2>Driver Actions</h2>

        <div className="action-row">
          <a href="/driver/trip" className="btn btn-primary">
            Manage Trip
          </a>

          <a href="/driver/seats" className="btn btn-success">
            Update Seats
          </a>

          <a href="/driver/emergency" className="btn btn-danger">
            Emergency Alert
          </a>

          <a href="/driver/history" className="btn btn-dark">
            Trip History
          </a>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
