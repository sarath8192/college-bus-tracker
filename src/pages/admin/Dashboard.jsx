import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../api/adminApi";
import { getNotifications } from "../../api/notificationApi";
import LogoutButton from "../../components/common/LogoutButton";
import DashboardCard from "../../components/common/DashboardCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDrivers: 0,
    totalBuses: 0,
    activeBuses: 0,
    totalSeats: 0,
    occupiedSeats: 0,
    availableSeats: 0,
    totalNotifications: 0,
    activeTrips: 0,
    completedTrips: 0,
  });

  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const data = await getAdminDashboardStats();
      setStats(data);
    } catch (error) {
      console.log("Error fetching dashboard stats:", error);
    }
  };

  const fetchRecentNotifications = async () => {
    try {
      const data = await getNotifications();
      setRecentNotifications(data.slice(0, 3));
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await fetchDashboardStats();
      await fetchRecentNotifications();
      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading dashboard...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Manage students, drivers, buses, routes, notifications, and reports.</p>
      </div>

      <LogoutButton />

      <div className="grid" style={{ marginTop: "24px" }}>
        <DashboardCard title="Total Students" value={stats.totalStudents} />
        <DashboardCard title="Total Drivers" value={stats.totalDrivers} />
        <DashboardCard title="Total Buses" value={stats.totalBuses} />
        <DashboardCard title="Active Buses" value={stats.activeBuses} />
        <DashboardCard title="Total Seats" value={stats.totalSeats} />
        <DashboardCard title="Occupied Seats" value={stats.occupiedSeats} />
        <DashboardCard title="Available Seats" value={stats.availableSeats} />
        <DashboardCard title="Notifications" value={stats.totalNotifications} />
        <DashboardCard title="Active Trips" value={stats.activeTrips} />
        <DashboardCard title="Completed Trips" value={stats.completedTrips} />
      </div>

      <div className="action-panel">
        <h2>Admin Operations</h2>
        <p style={{ marginTop: "6px", color: "#64748b" }}>
          Quickly access all admin management features.
        </p>

        <div className="action-row">
          <a href="/admin/students" className="btn btn-primary">
            🎓 Manage Students
          </a>

          <a href="/admin/drivers" className="btn btn-success">
            👨‍✈️ Manage Drivers
          </a>

          <a href="/admin/buses" className="btn btn-warning">
            🚌 Manage Buses
          </a>

          <a href="/admin/routes" className="btn btn-dark">
            🛣️ Manage Routes
          </a>

          <a href="/admin/notifications" className="btn btn-danger">
            🔔 Create Notification
          </a>

          <a href="/admin/reports" className="btn btn-primary">
            📄 View Reports
          </a>
        </div>
      </div>

      <div className="action-panel">
        <h2>Transport Analytics</h2>

        <div className="grid" style={{ marginTop: "18px" }}>
          <div className="card">
            <h2>🪑 Seat Analytics</h2>
            <p style={{ marginTop: "10px" }}>
              Total Seats: <strong>{stats.totalSeats}</strong>
            </p>
            <p>
              Occupied Seats: <strong>{stats.occupiedSeats}</strong>
            </p>
            <p>
              Available Seats: <strong>{stats.availableSeats}</strong>
            </p>
          </div>

          <div className="card">
            <h2>🚌 Bus Activity</h2>
            <p style={{ marginTop: "10px" }}>
              Total Buses: <strong>{stats.totalBuses}</strong>
            </p>
            <p>
              Active Buses: <strong>{stats.activeBuses}</strong>
            </p>
          </div>

          <div className="card">
            <h2>📍 Trip Status</h2>
            <p style={{ marginTop: "10px" }}>
              Active Trips: <strong>{stats.activeTrips}</strong>
            </p>
            <p>
              Completed Trips: <strong>{stats.completedTrips}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="action-panel">
        <h2>Recent Notifications</h2>
        <p style={{ marginTop: "6px", color: "#64748b" }}>
          Latest notifications created by admin or emergency alerts from drivers.
        </p>

        {recentNotifications.length === 0 ? (
          <div className="card" style={{ marginTop: "18px" }}>
            <p>No recent notifications found.</p>
          </div>
        ) : (
          <div className="grid" style={{ marginTop: "18px" }}>
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="card">
                <h2>{notification.title}</h2>

                <p style={{ marginTop: "10px", color: "#475569" }}>
                  {notification.message}
                </p>

                <p style={{ marginTop: "12px" }}>
                  <strong>For:</strong>{" "}
                  <span className="badge badge-active">
                    {notification.role}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="action-row">
          <a href="/admin/notifications" className="btn btn-danger">
            Go to Notifications
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;