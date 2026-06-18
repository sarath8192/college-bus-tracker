import { useEffect, useState } from "react";
import { getNotifications } from "../../api/notificationApi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();

      const studentNotifications = data.filter(
        (notification) =>
          notification.role === "student" ||
          notification.role === "all"
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
    return <h2>Loading notifications...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔔 Student Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          >
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <p>
              <strong>Type:</strong> {notification.type}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;