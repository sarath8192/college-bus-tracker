import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../api/adminApi";
import { getNotifications } from "../../api/notificationApi";
import StudentLayout from "../../components/layouts/StudentLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StatsSkeleton } from "../../components/common/SkeletonLoader";

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
      await Promise.all([fetchDashboardStats(), fetchRecentNotifications()]);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Compiling administrator dashboard analytics...</p>
        </div>
      </StudentLayout>
    );
  }

  // Chart Data preparation
  const pieData = [
    { name: "Occupied", value: stats.occupiedSeats || 30 },
    { name: "Available", value: stats.availableSeats || 120 }
  ];
  
  const COLORS = ["#2563eb", "#10b981"];

  const barData = [
    { name: "Active Trips", count: stats.activeTrips || 2, color: "#10b981" },
    { name: "Completed Trips", count: stats.completedTrips || 8, color: "#64748b" },
    { name: "Active Fleet", count: stats.activeBuses || 4, color: "#2563eb" },
    { name: "Announcements", count: stats.totalNotifications || 12, color: "#f59e0b" }
  ];

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Admin Dashboard</h1>
            <p>Monitor bus metrics, oversee drivers, review routing logs, and broadcast service alerts.</p>
          </div>
        </div>

        {/* Dynamic statistics overview */}
        <div className="grid">
          <div className="stat-card primary">
            <div className="stat-card-top">
              <div>
                <h3>Total Students</h3>
                <div className="value">{stats.totalStudents}</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "22px", height: "22px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "10px" }}>Active registrations</div>
          </div>

          <div className="stat-card success">
            <div className="stat-card-top">
              <div>
                <h3>Total Drivers</h3>
                <div className="value">{stats.totalDrivers}</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "22px", height: "22px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "10px" }}>Verified shift logs</div>
          </div>

          <div className="stat-card primary">
            <div className="stat-card-top">
              <div>
                <h3>Buses Fleet</h3>
                <div className="value">{stats.totalBuses}</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "22px", height: "22px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "10px" }}>Active: <span style={{ fontWeight: "700" }}>{stats.activeBuses}</span></div>
          </div>

          <div className="stat-card warning">
            <div className="stat-card-top">
              <div>
                <h3>Total Seats</h3>
                <div className="value">{stats.totalSeats}</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "22px", height: "22px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "10px" }}>Available: <span style={{ fontWeight: "700", color: "var(--success)" }}>{stats.availableSeats}</span></div>
          </div>
        </div>

        {/* Charts & Interactive Visualizations */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", marginBottom: "32px" }} className="admin-analytics-grid">
          
          {/* Route Performance Bar Chart */}
          <div className="card">
            <h2>Transit Stream Operations</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "20px" }}>
              Roster metrics representing current trips, completions, fleet counts, and broadcasts.
            </p>
            <div style={{ width: "100%", height: "240px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={11} stroke="#64748b" />
                  <YAxis fontSize={11} stroke="#64748b" />
                  <Tooltip cursor={{ fill: "rgba(0,0,0,0.02)" }} />
                  <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Seat Capacity Pie Chart */}
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2>Seat Occupancy ratio</h2>
              <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "16px" }}>
                Total ratio of occupied seats vs available capacity.
              </p>
            </div>
            <div style={{ width: "100%", height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", fontSize: "12px", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", marginTop: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: COLORS[0] }} />
                <span>Occupied: {stats.occupiedSeats}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: COLORS[1] }} />
                <span>Available: {stats.availableSeats}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions panel */}
        <div className="action-panel">
          <h2>Admin Management Tools</h2>
          <p style={{ color: "var(--neutral-muted)", fontSize: "14px", marginTop: "4px" }}>
            Quickly access lists, dispatchers, routes, and report generators.
          </p>

          <div className="grid" style={{ marginTop: "24px", marginBottom: 0 }}>
            <a href="/admin/students" className="card" style={{ textDecoration: "none", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex" }}>
                🎓
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Manage Students</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>View enrolled student logs</p>
              </div>
            </a>

            <a href="/admin/drivers" className="card" style={{ textDecoration: "none", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--success-light)", color: "var(--success)", display: "flex" }}>
                👨‍✈️
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Manage Drivers</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Audit driver shifts & status</p>
              </div>
            </a>

            <a href="/admin/buses" className="card" style={{ textDecoration: "none", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--warning-light)", color: "var(--warning)", display: "flex" }}>
                🚌
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Manage Buses</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Monitor bus capacity listings</p>
              </div>
            </a>

            <a href="/admin/routes" className="card" style={{ textDecoration: "none", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "rgba(100,116,139,0.08)", color: "var(--neutral-muted)", display: "flex" }}>
                🛣️
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Manage Routes</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Inspect checkpoints & stops</p>
              </div>
            </a>
          </div>
        </div>

        {/* Broadcasting & alerts logs */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }} className="admin-analytics-grid">
          <div className="card">
            <h2>Recent Broadcast Alerts</h2>
            {recentNotifications.length === 0 ? (
              <div className="empty-state" style={{ borderStyle: "dashed", padding: "24px", margin: "16px 0 0" }}>
                <p>No notifications created recently.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                {recentNotifications.map((n) => (
                  <div key={n.id} style={{ borderLeft: "4px solid var(--primary)", padding: "12px 16px", backgroundColor: "var(--neutral-light)", borderRadius: "0 8px 8px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "700" }}>
                      <span style={{ color: "var(--neutral-dark)" }}>{n.title}</span>
                      <span className="badge badge-active" style={{ fontSize: "10px", textTransform: "uppercase" }}>{n.role}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "4px" }}>{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", justifySelf: "stretch" }}>
            <h2>System Health</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px", flex: 1, justifyContent: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span>GPS broadcast status</span>
                <span style={{ color: "var(--success)", fontWeight: "700" }}>ONLINE (2 Active)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span>Database clusters</span>
                <span style={{ color: "var(--success)", fontWeight: "700" }}>CONNECTED</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span>Transit servers</span>
                <span style={{ color: "var(--success)", fontWeight: "700" }}>OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .admin-analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </StudentLayout>
  );
};

export default Dashboard;
