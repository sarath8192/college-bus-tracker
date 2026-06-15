import StudentLayout from "../../components/layouts/StudentLayout";

import notifications from "../../mock/notifications";

function Notifications() {
  return (
    <StudentLayout>
      <h1>🔔 Notifications</h1>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              background:
                notification.status === "Unread"
                  ? "#f0f9ff"
                  : "#ffffff",
            }}
          >
            <h3>{notification.title}</h3>

            <p>{notification.message}</p>

            <p>
              <strong>Time:</strong>{" "}
              {notification.time}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {notification.status}
            </p>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
}

export default Notifications;