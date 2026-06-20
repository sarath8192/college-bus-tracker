import { useEffect, useState } from "react";
import {
  createNotification,
  getNotifications,
} from "../../api/notificationApi";

const Notifications = () => {
  const [formData, setFormData] = useState({
    message: "",
    type: "student",
  });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.log("Fetch notifications error:", error);
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

  const handleSendNotification = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      alert("Please enter notification message");
      return;
    }

    try {
      setLoading(true);

      await createNotification({
        title: "Admin Notification",
        message: formData.message,
        type: formData.type,
      });

      alert("Notification sent successfully");

      setFormData({
        message: "",
        type: "student",
      });

      fetchNotifications();
    } catch (error) {
      console.log("Notification error:", error);
      alert(error.response?.data?.message || "Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔔 Admin Notifications</h1>
        <p>Send notifications to students, drivers, or everyone.</p>
      </div>

      <div className="card" style={{ maxWidth: "650px" }}>
        <h2>Send Notification</h2>

        <form onSubmit={handleSendNotification} style={{ marginTop: "18px" }}>
          <div className="form-group">
            <label>Send Notification To</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="student">Students</option>
              <option value="driver">Drivers</option>
              <option value="admin">Admin</option>
              <option value="all">All</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notification Message</label>
            <textarea
              name="message"
              placeholder="Example: Bus is delayed by 10 minutes..."
              value={formData.message}
              onChange={handleChange}
              className="input"
              rows="6"
              style={{ resize: "vertical" }}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </form>
      </div>

      <div className="card" style={{ marginTop: "24px" }}>
        <h2>Recent Notifications</h2>

        {notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Type</th>
                </tr>
              </thead>

              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.id}>
                    <td>{notification.title}</td>
                    <td>{notification.message}</td>
                    <td>{notification.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;