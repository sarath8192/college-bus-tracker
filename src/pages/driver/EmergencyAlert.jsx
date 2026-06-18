import { useState } from "react";
import { createNotification } from "../../api/notificationApi";

const EmergencyAlert = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmergencyAlert = async (e) => {
    e.preventDefault();

    if (!message) {
      alert("Please enter emergency message");
      return;
    }

    try {
      setLoading(true);

      await createNotification({
        title: "Emergency Alert",
        message,
        type: "Emergency",
        role: "admin",
      });

      setMessage("");
      alert("Emergency alert sent to admin");
    } catch (error) {
      console.log("Error sending emergency alert:", error);
      alert("Failed to send emergency alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚨 Emergency Alert</h1>

      <form
        onSubmit={handleEmergencyAlert}
        style={{
          maxWidth: "500px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <label>Emergency Message</label>

        <textarea
          placeholder="Example: Bus breakdown near Vijayawada..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            minHeight: "100px",
            marginTop: "10px",
            marginBottom: "15px",
            padding: "10px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#dc2626",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Emergency Alert"}
        </button>
      </form>
    </div>
  );
};

export default EmergencyAlert;