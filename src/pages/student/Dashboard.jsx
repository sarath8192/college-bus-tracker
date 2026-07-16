import { useEffect, useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import DashboardCard from "../../components/common/DashboardCard";
import { buses } from "../../mock/buses";
import { getNotifications } from "../../api/notificationApi";

function Dashboard() {
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await getNotifications();
        const studentAlerts = data
          .filter((item) => item.role === "student" || item.role === "all")
          .slice(0, 3);
        setRecentNotifications(studentAlerts);
      } catch (error) {
        console.error("Error fetching notifications on dashboard:", error);
      } finally {
        setLoadingNotifications(false);
      }
    };
    fetchRecent();
  }, []);

  const assignedBus = buses[0] || { busNumber: "N/A", availableSeats: 0, eta: "N/A" };

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Student Dashboard</h1>
            <p>Welcome back! Check your assigned bus schedule, active seating status, and live routing updates.</p>
          </div>
        </div>

        {/* Custom Stats Cards with Icons */}
        <div className="grid">
          <div className="stat-card primary">
            <div className="stat-card-top">
              <div>
                <h3>Assigned Bus</h3>
                <div className="value">{assignedBus.busNumber}</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "12px" }}>
              Route: <span style={{ fontWeight: "700", color: "var(--neutral-dark)" }}>Vijayawada Express</span>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-card-top">
              <div>
                <h3>Available Seats</h3>
                <div className="value">{assignedBus.availableSeats}</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "12px" }}>
              Total capacity: <span style={{ fontWeight: "700", color: "var(--neutral-dark)" }}>40 seats</span>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-card-top">
              <div>
                <h3>Estimated Arrival</h3>
                <div className="value">{assignedBus.eta}</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "12px" }}>
              Status: <span style={{ fontWeight: "700", color: "var(--warning)" }}>approaching next stop</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Panels */}
        <div className="action-panel">
          <h2>Quick Navigation</h2>
          <p style={{ color: "var(--neutral-muted)", fontSize: "14px", marginTop: "4px" }}>
            Easily access all tools for your daily college commute.
          </p>

          <div className="grid" style={{ marginTop: "24px", marginBottom: 0 }}>
            <a href="/student/tracking" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Live Tracking</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Locate your bus in real time</p>
              </div>
            </a>

            <a href="/student/seats" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "var(--success-light)", color: "var(--success)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Seat Availability</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Check seat occupancy rates</p>
              </div>
            </a>

            <a href="/student/notifications" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "var(--warning-light)", color: "var(--warning)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Notifications</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>View transit delay announcements</p>
              </div>
            </a>

            <a href="/student/profile" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(100,116,139,0.08)", color: "var(--neutral-muted)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>My Profile</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>View account pickup settings</p>
              </div>
            </a>
          </div>
        </div>

        {/* Announcements List Redesign */}
        <div className="action-panel">
          <h2>Recent Transit Announcements</h2>
          <p style={{ color: "var(--neutral-muted)", fontSize: "14px", marginTop: "4px" }}>
            Critical notifications sent by admin or driver breakdown alerts.
          </p>

          {loadingNotifications ? (
            <div style={{ padding: "24px" }}>
              <div className="skeleton-box" style={{ width: "100%", height: "60px", marginBottom: "12px", borderRadius: "8px" }}></div>
              <div className="skeleton-box" style={{ width: "100%", height: "60px", borderRadius: "8px" }}></div>
            </div>
          ) : recentNotifications.length === 0 ? (
            <div className="empty-state" style={{ marginTop: "20px", borderStyle: "dashed" }}>
              <div className="empty-state-icon">📭</div>
              <h3>No announcements</h3>
              <p>Everything is running smoothly on all routes.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="card" style={{ borderLeft: "4px solid var(--primary)", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>
                      {notification.title}
                    </h3>
                    <span className="badge badge-active" style={{ fontSize: "11px", textTransform: "uppercase" }}>
                      {notification.role}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--neutral-muted)", marginTop: "8px" }}>
                    {notification.message}
                  </p>
                  <div style={{ fontSize: "11px", color: "var(--neutral-muted)", marginTop: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg style={{ width: "12px", height: "12px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Just now</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}

export default Dashboard;
