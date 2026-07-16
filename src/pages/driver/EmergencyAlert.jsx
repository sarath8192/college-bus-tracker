import { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { createNotification } from "../../api/notificationApi";

const EmergencyAlert = () => {
  const [formData, setFormData] = useState({
    message: "",
    type: "admin",
    category: "Breakdown",
    severity: "High"
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [imageName, setImageName] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      alert("Please enter emergency details");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleSendAlert = async () => {
    setShowConfirmModal(false);
    try {
      setLoading(true);

      const payloadMsg = `[Category: ${formData.category} | Severity: ${formData.severity}] ${formData.message}`;

      await createNotification({
        title: "Driver Emergency Alert",
        message: payloadMsg,
        type: formData.type,
      });

      alert("Emergency alert sent successfully to " + formData.type);

      setFormData({
        message: "",
        type: "admin",
        category: "Breakdown",
        severity: "High"
      });
      setImageName("");
    } catch (error) {
      console.log("Emergency alert error:", error);
      alert(error.response?.data?.message || "Failed to send emergency alert");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Emergency Alert</h1>
            <p>Send warning alerts to transit admins or students during breakdowns, delays, or emergencies.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", alignItems: "start" }} className="grid-2">
          
          {/* Form Card */}
          <div className="card" style={{ borderTop: "6px solid var(--danger)" }}>
            <h2>SOS Broadcasting Panel</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "14px", marginTop: "4px" }}>
              Alerts are sent immediately via push notifications to subscribers.
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="category">Emergency Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="Breakdown">Vehicle Breakdown</option>
                    <option value="Traffic">Traffic Delay</option>
                    <option value="Fuel">Refueling / Technical</option>
                    <option value="Accident">Accident / Road Block</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="severity">Severity Level</label>
                  <select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="Low">Low - Informational Only</option>
                    <option value="Medium">Medium - Minimal Delay</option>
                    <option value="High">High - Emergency Assistance</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="type">Target Recipients</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="admin">College Transit Administrator</option>
                  <option value="student">Route Students Only</option>
                  <option value="all">Broadcast to All Users</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Emergency Details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Describe the issue clearly. E.g. Flat tire near Benz Circle, delay is approximately 15 minutes."
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                  rows="4"
                  style={{ resize: "vertical" }}
                  required
                ></textarea>
              </div>

              {/* Mock File Upload for Incident Image */}
              <div className="form-group">
                <label>Incident Evidence Photo (Optional)</label>
                <div style={{
                  border: "2px dashed var(--neutral-border)",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "var(--neutral-light)",
                  cursor: "pointer",
                  position: "relative"
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer"
                    }}
                  />
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>📸</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--neutral-dark)" }}>
                    {imageName ? imageName : "Click to select or drag photo here"}
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--neutral-muted)", marginTop: "4px" }}>PNG, JPG up to 5MB</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-danger"
                style={{ width: "100%", marginTop: "12px", padding: "14px" }}
              >
                {loading ? "Broadcasting SOS..." : "Broadcast Alert Notification"}
              </button>
            </form>
          </div>

          {/* Right Instructions Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card">
              <h2>🚨 Emergency Guidelines</h2>
              <ul style={{ paddingLeft: "20px", marginTop: "12px", fontSize: "14px", lineHeight: "1.8", color: "var(--neutral-muted)" }}>
                <li>Write coordinates or nearest landmark clearly.</li>
                <li>Select **Students** if the bus is running late but safe.</li>
                <li>Select **Admin** for mechanical issues or driver replacement requests.</li>
                <li>Only select **All** for critical road issues requiring assistance.</li>
              </ul>
            </div>
            
            <div className="card" style={{ display: "flex", gap: "12px", alignItems: "center", borderLeft: "4px solid var(--danger)" }}>
              <div style={{ fontSize: "24px" }}>🛡️</div>
              <div>
                <h4 style={{ fontWeight: "700", fontSize: "14px", color: "var(--neutral-dark)" }}>Admin Helpline</h4>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>
                  Direct emergency dispatch: <br />
                  <strong>+91 99999 88888</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ borderTop: "6px solid var(--danger)" }}>
            <div className="modal-header">
              <h2>Confirm SOS Broadcast</h2>
              <button onClick={() => setShowConfirmModal(false)} className="modal-close-btn">
                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "15px", color: "var(--neutral-muted)" }}>
                You are about to broadcast a high-priority <strong>{formData.severity} Severity</strong> warning to <strong>{formData.type === 'all' ? 'All Users' : formData.type}</strong> regarding <strong>{formData.category}</strong>.
              </p>
              <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "var(--neutral-light)", borderRadius: "8px", borderLeft: "4px solid var(--danger)" }}>
                <p style={{ fontSize: "14px", color: "var(--neutral-dark)", fontStyle: "italic" }}>
                  "{formData.message}"
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleSendAlert}
                className="btn btn-danger"
              >
                Send Alert Now
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default EmergencyAlert;
