import { useEffect, useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { getNotifications } from "../../api/notificationApi";
import { ListSkeleton } from "../../components/common/SkeletonLoader";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'danger', 'warning', 'info'
  const [readNotifications, setReadNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      const studentNotifications = data.filter(
        (item) => item.role === "student" || item.role === "all",
      );
      setNotifications(studentNotifications);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Helper to categorize notification severity for dynamic coloring
  const getSeverity = (title, message) => {
    const text = (title + " " + message).toLowerCase();
    if (text.includes("emergency") || text.includes("breakdown") || text.includes("cancel") || text.includes("accident")) {
      return {
        type: "danger",
        class: "danger",
        badge: "badge-danger",
        icon: (
          <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
        border: "var(--danger)",
        bg: "var(--danger-light)",
      };
    }
    if (text.includes("delay") || text.includes("late") || text.includes("minutes") || text.includes("mins")) {
      return {
        type: "warning",
        class: "warning",
        badge: "badge-warning",
        icon: (
          <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        border: "var(--warning)",
        bg: "var(--warning-light)",
      };
    }
    return {
      type: "info",
      class: "primary",
      badge: "badge-active",
      icon: (
        <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      border: "var(--primary)",
      bg: "var(--primary-light)",
    };
  };

  const handleMarkAllRead = () => {
    setReadNotifications(notifications.map(n => n.id));
  };

  const handleToggleRead = (id) => {
    if (readNotifications.includes(id)) {
      setReadNotifications(readNotifications.filter(x => x !== id));
    } else {
      setReadNotifications([...readNotifications, id]);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    const severity = getSeverity(n.title, n.message);
    return severity.type === filter;
  });

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Student Notifications</h1>
            <p>Stay updated with the latest bus schedules, route deviations, and college transport advisories.</p>
          </div>
          
          <button onClick={handleMarkAllRead} className="btn btn-outline" style={{ display: notifications.length > 0 ? "inline-flex" : "none" }}>
            Mark All as Read
          </button>
        </div>

        {/* Filter Toolbar */}
        {notifications.length > 0 && (
          <div className="card" style={{ padding: "12px 24px", marginBottom: "24px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--neutral-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Filter:</span>
            <button
              onClick={() => setFilter("all")}
              className={`btn ${filter === "all" ? "btn-primary" : "btn-outline"}`}
              style={{ padding: "6px 14px", fontSize: "13px" }}
            >
              All Alerts
            </button>
            <button
              onClick={() => setFilter("danger")}
              className={`btn ${filter === "danger" ? "btn-danger" : "btn-outline"}`}
              style={{ padding: "6px 14px", fontSize: "13px" }}
            >
              Emergencies
            </button>
            <button
              onClick={() => setFilter("warning")}
              className={`btn ${filter === "warning" ? "btn-warning" : "btn-outline"}`}
              style={{ padding: "6px 14px", fontSize: "13px" }}
            >
              Delays
            </button>
            <button
              onClick={() => setFilter("info")}
              className={`btn ${filter === "info" ? "btn-dark" : "btn-outline"}`}
              style={{ padding: "6px 14px", fontSize: "13px" }}
            >
              Announcements
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <ListSkeleton items={4} />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔔</div>
            <h3>All Clear!</h3>
            <p>There are no active notifications matching your filter at this time.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
            {filteredNotifications.map((notification) => {
              const severity = getSeverity(notification.title, notification.message);
              const isRead = readNotifications.includes(notification.id);
              
              return (
                <div
                  key={notification.id}
                  className="card"
                  onClick={() => handleToggleRead(notification.id)}
                  style={{
                    borderLeft: `5px solid ${severity.border}`,
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "20px",
                    cursor: "pointer",
                    opacity: isRead ? 0.65 : 1,
                    transition: "var(--transition-fast)"
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: severity.bg,
                      color: severity.border,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {severity.icon}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Outfit', sans-serif" }}>
                        {notification.title}
                        {!isRead && <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }}></span>}
                      </h3>
                      <span className={`badge ${severity.badge}`} style={{ fontSize: "11px", textTransform: "uppercase" }}>
                        {notification.role === "all" ? "Broadcast" : "Students Only"}
                      </span>
                    </div>

                    <p style={{ marginTop: "8px", color: "var(--neutral-muted)", fontSize: "14px", lineHeight: "1.5" }}>
                      {notification.message}
                    </p>

                    <div style={{ display: "flex", gap: "12px", marginTop: "16px", fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "500" }}>
                      <span>Posted by: Campus Dispatch</span>
                      <span>•</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default Notifications;
