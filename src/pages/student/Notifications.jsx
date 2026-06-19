import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import { getNotifications } from "../../api/notificationApi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();

      const studentNotifications = data.filter(
        (item) => item.role === "student" || item.role === "all"
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

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading notifications...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔔 Student Notifications</h1>
        <p>View bus updates, delay alerts, and important college transport messages.</p>
      </div>
      <BackToDashboard />

      {notifications.length === 0 ? (
        <div className="card">
          <p>No notifications available</p>
        </div>
      ) : (
        <div className="grid">
          {notifications.map((notification) => (
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
    </div>
  );
};

export default Notifications;