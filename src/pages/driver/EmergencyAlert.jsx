import StudentLayout from "../../components/layouts/StudentLayout";

function EmergencyAlert() {
  const sendAlert = () => {
    alert("Emergency Alert Sent!");
  };

  return (
    <StudentLayout>
      <h1>🚨 Emergency Alert</h1>

      <button
        onClick={sendAlert}
        style={{
          background: "red",
          color: "white",
          padding: "15px",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Send Emergency Alert
      </button>
    </StudentLayout>
  );
}

export default EmergencyAlert;