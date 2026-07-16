import { useEffect, useState } from "react";
import { createNotification, getNotifications } from "../../api/notificationApi";
import StudentLayout from "../../components/layouts/StudentLayout";
import { ListSkeleton } from "../../components/common/SkeletonLoader";

const Notifications = () => {
  const [formData, setFormData] = useState({
    title: "Admin Announcement",
    message: "",
    type: "student",
    category: "General"
  });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchNotifications = async () => {
    try {
      setFetching(true);
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.log("Fetch notifications error:", error);
    } finally {
      setFetching(false);
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

      const titleWithCat = `[${formData.category}] ${formData.title}`;

      await createNotification({
        title: titleWithCat,
        message: formData.message,
        type: formData.type,
      });

      alert("Announcement broadcasted successfully!");

      setFormData({
        title: "Admin Announcement",
        message: "",
        type: "student",
        category: "General"
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
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Admin Notifications</h1>
            <p>Broadcast alerts, delay warnings, and schedule notices to targeted account roles.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "24px" }} className="notifications-admin-grid">
          {/* Send Announcement card */}
          <div className="card">
            <h2>Send New Announcement</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginTop: "4px" }}>
              Alerts are broadcast immediately to active subscriber devices.
            </p>

            <form onSubmit={handleSendNotification} style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div className="form-group">
                <label htmlFor="title">Headline Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="category">Category Type</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="General">General Notice</option>
                    <option value="Delay">Transit Delay</option>
                    <option value="Emergency">Emergency SOS</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="type">Target Audience</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="student">Students Only</option>
                    <option value="driver">Drivers Only</option>
                    <option value="admin">Administrators Only</option>
                    <option value="all">All Users (Broadcast)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Announcement Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="E.g. Bus Route VIT-01 is delayed by 15 mins due to city traffic."
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                  rows="4"
                  style={{ resize: "vertical" }}
                  required
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "8px", padding: "12px" }}>
                {loading ? "Broadcasting..." : "Broadcast Announcement"}
              </button>
            </form>
          </div>

          {/* Recent Broadcast Log */}
          <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <h2>Announcement History Logs</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginTop: "4px", marginBottom: "20px" }}>
              Active archive of notifications broadcasted to users.
            </p>

            {fetching ? (
              <ListSkeleton items={4} />
            ) : notifications.length === 0 ? (
              <div className="empty-state" style={{ margin: "auto 0", border: "1px dashed var(--neutral-border)", padding: "24px" }}>
                <p>No broadcast history logs found.</p>
              </div>
            ) : (
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", maxHeight: "420px" }}>
                {notifications.map((notification) => {
                  const titleStr = notification.title || "Announcement";
                  const isEmergency = titleStr.includes("Emergency") || titleStr.includes("SOS");
                  const isDelay = titleStr.includes("Delay");
                  
                  let leftBorder = "var(--primary)";
                  if (isEmergency) leftBorder = "var(--danger)";
                  else if (isDelay) leftBorder = "var(--warning)";

                  return (
                    <div
                      key={notification.id}
                      style={{
                        borderLeft: `4px solid ${leftBorder}`,
                        padding: "12px 16px",
                        backgroundColor: "var(--neutral-light)",
                        borderRadius: "0 8px 8px 0",
                        fontSize: "13px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700" }}>
                        <span style={{ color: "var(--neutral-dark)" }}>{titleStr}</span>
                        <span className="badge badge-active" style={{ fontSize: "10px", textTransform: "uppercase" }}>
                          {notification.type || notification.role}
                        </span>
                      </div>
                      <p style={{ color: "var(--neutral-muted)", marginTop: "6px", lineHeight: "1.4" }}>
                        {notification.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .notifications-admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </StudentLayout>
  );
};

export default Notifications;
