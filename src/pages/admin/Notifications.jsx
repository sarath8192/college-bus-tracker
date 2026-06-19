import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import {
  getNotifications,
  createNotification,
  deleteNotification,
} from "../../api/notificationApi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    role: "all",
  });

  const [loading, setLoading] = useState(true);

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
      alert("Notification created successfully");

      setFormData({
        title: "",
        message: "",
        role: "all",
      });

      fetchNotifications();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create notification");
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      alert("Notification deleted successfully");
      fetchNotifications();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete notification");
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading notifications...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔔 Admin Notifications</h1>
        <p>Create, view, and delete notifications for students and drivers.</p>
      </div>

<BackToDashboard />
      <div className="card" style={{ maxWidth: "700px", marginBottom: "24px" }}>
        <h2>Create Notification</h2>

        <form onSubmit={handleCreateNotification} style={{ marginTop: "18px" }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter notification title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Enter notification message"
              value={formData.message}
              onChange={handleChange}
              className="input"
              rows="4"
              style={{ resize: "vertical" }}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Send To</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input"
            >
              <option value="all">All</option>
              <option value="student">Students</option>
              <option value="driver">Drivers</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Create Notification
          </button>
        </form>
      </div>

      {notifications.length === 0 ? (
        <div className="card">
          <p>No notifications found</p>
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
                <strong>Role:</strong>{" "}
                <span className="badge badge-active">
                  {notification.role}
                </span>
              </p>

              <button
                onClick={() => handleDeleteNotification(notification.id)}
                className="btn btn-danger"
                style={{ marginTop: "14px" }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;