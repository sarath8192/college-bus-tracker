import { useEffect, useState } from "react";
import {
  getNotifications,
  createNotification,
  deleteNotification,
} from "../../api/notificationApi";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "",
    role: "all",
  });

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateNotification = async (e) => {
    e.preventDefault();

    try {
      await createNotification(formData);

      setFormData({
        title: "",
        message: "",
        type: "",
        role: "all",
      });

      fetchNotifications();
    } catch (error) {
      console.log("Error creating notification:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create notification"
      );
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      fetchNotifications();
    } catch (error) {
      console.log("Error deleting notification:", error);
      alert("Failed to delete notification");
    }
  };

  if (loading) {
    return <h2>Loading notifications...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔔 Admin Notifications</h1>

      <form
        onSubmit={handleCreateNotification}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
          maxWidth: "600px",
        }}
      >
        <h3>Create Notification</h3>

        <div style={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Message</label>
          <textarea
            name="message"
            placeholder="Enter message"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Type</option>
            <option value="Delay">Delay</option>
            <option value="Emergency">Emergency</option>
            <option value="Route Change">Route Change</option>
            <option value="Arrival">Arrival</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Visible To</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="all">All</option>
            <option value="student">Student</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Create Notification
        </button>
      </form>

      <h3>All Notifications</h3>

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
            <p>
              <strong>Role:</strong> {notification.role}
            </p>

            <button
              onClick={() =>
                handleDeleteNotification(notification.id)
              }
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
  },
};

export default AdminNotifications;