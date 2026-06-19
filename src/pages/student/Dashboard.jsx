import StudentLayout from "../../components/layouts/StudentLayout";
import DashboardCard from "../../components/common/DashboardCard";
import LogoutButton from "../../components/common/LogoutButton";

import { buses } from "../../mock/buses";

function Dashboard() {
  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <h1>🎓 Student Dashboard</h1>
          <p>Track your assigned bus, seats, ETA, and notifications.</p>
        </div>

        <LogoutButton />

        <div className="grid" style={{ marginTop: "24px" }}>
          <DashboardCard title="Assigned Bus" value={buses[0].busNumber} />
          <DashboardCard title="Available Seats" value={buses[0].availableSeats} />
          <DashboardCard title="ETA" value={buses[0].eta} />
        </div>

        <div className="action-panel">
          <h2>Quick Actions</h2>

          <div className="action-row">
            <a href="/student/tracking" className="btn btn-primary">
              Live Tracking
            </a>

            <a href="/student/seats" className="btn btn-success">
              Seat Availability
            </a>

            <a href="/student/notifications" className="btn btn-warning">
              Notifications
            </a>

            <a href="/student/profile" className="btn btn-dark">
              Profile
            </a>
          </div>
        </div>
      </div>
    </StudentLayout>
    
  );
}

export default Dashboard;