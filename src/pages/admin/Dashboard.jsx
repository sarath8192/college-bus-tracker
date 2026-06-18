import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../api/adminApi";
import LogoutButton from "../../components/common/LogoutButton";
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

  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const data = await getAdminDashboardStats();
      setStats(data);
    } catch (error) {
      console.log("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading dashboard...</h2>;
  }

  return (
  <div style={{ padding: "20px" }}>
    <h1>📊 Admin Dashboard</h1>
    <p>Real-time data from Supabase database</p>

    <LogoutButton />

    <div style={styles.grid}>
      <div style={styles.card}>
        <h2>{stats.totalStudents}</h2>
        <p>Total Students</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.totalDrivers}</h2>
        <p>Total Drivers</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.totalBuses}</h2>
        <p>Total Buses</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.activeBuses}</h2>
        <p>Active Buses</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.totalSeats}</h2>
        <p>Total Seats</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.occupiedSeats}</h2>
        <p>Occupied Seats</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.availableSeats}</h2>
        <p>Available Seats</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.totalNotifications}</h2>
        <p>Notifications</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.activeTrips}</h2>
        <p>Active Trips</p>
      </div>

      <div style={styles.card}>
        <h2>{stats.completedTrips}</h2>
        <p>Completed Trips</p>
      </div>
    </div>
  </div>
);
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
};

export default Dashboard;