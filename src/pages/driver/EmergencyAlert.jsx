import BackToDashboard from "../../components/common/BackToDashboard";
import { useState } from "react";
import { createNotification } from "../../api/notificationApi";

const EmergencyAlert = () => {
  const [formData, setFormData] = useState({
    message: "",
    type: "admin",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendAlert = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      alert("Please enter emergency message");
      return;
    }

    try {
      setLoading(true);

      await createNotification({
        title: "Driver Emergency Alert",
        message: formData.message,
        type: formData.type,
      });

      alert("Emergency alert sent successfully");

      setFormData({
        message: "",
        type: "admin",
      });
    } catch (error) {
      console.log("Emergency alert error:", error);
      alert(error.response?.data?.message || "Failed to send emergency alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>🚨 Emergency Alert</h1>
        <p>
          Send emergency or breakdown alerts to admin, students, or everyone.
        </p>
      </div>
      <BackToDashboard />

      <div className="card" style={{ maxWidth: "650px" }}>
        <h2>Report Emergency</h2>

        <form onSubmit={handleSendAlert} style={{ marginTop: "18px" }}>
          <div className="form-group">
            <label>Send Alert To</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="admin">Admin</option>
              <option value="student">Students</option>
              <option value="all">All</option>
            </select>
          </div>

          <div className="form-group">
            <label>Emergency Message</label>
            <textarea
              name="message"
              placeholder="Example: Bus breakdown near Benz Circle..."
              value={formData.message}
              onChange={handleChange}
              className="input"
              rows="6"
              style={{ resize: "vertical" }}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn btn-danger">
            {loading ? "Sending..." : "Send Emergency Alert"}
          </button>
        </form>
      </div>

      <div className="card" style={{ maxWidth: "650px", marginTop: "24px" }}>
        <h2>Emergency Guidelines</h2>

        <ul
          style={{ marginTop: "12px", paddingLeft: "20px", lineHeight: "1.8" }}
        >
          <li>Select Admin for breakdown or driver-related issues.</li>
          <li>
            Select Students if students must know about delay or route change.
          </li>
          <li>Select All for serious emergency alerts.</li>
          <li>Write the location clearly.</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyAlert;
