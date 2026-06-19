const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Student",
    email: "student@gmail.com",
    role: "student",
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>👤 Student Profile</h1>
        <p>View your student account and transport details.</p>
      </div>

      <div
        className="card"
        style={{
          maxWidth: "700px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : "S"}
          </div>

          <div>
            <h2>{user.name || "Student"}</h2>
            <p style={{ color: "#64748b", marginTop: "6px" }}>
              {user.email || "student@gmail.com"}
            </p>

            <span
              className="badge badge-active"
              style={{ display: "inline-block", marginTop: "10px" }}
            >
              {user.role || "student"}
            </span>
          </div>
        </div>
      </div>

      <div
        className="grid"
        style={{
          marginTop: "24px",
          maxWidth: "900px",
        }}
      >
        <div className="card">
          <h2>🚌 Assigned Bus</h2>
          <p style={{ marginTop: "10px", color: "#475569" }}>
            Your assigned bus details will be shown here.
          </p>
          <p style={{ marginTop: "12px" }}>
            <strong>Bus Number:</strong> VIT-01
          </p>
        </div>

        <div className="card">
          <h2>🛣️ Route</h2>
          <p style={{ marginTop: "10px", color: "#475569" }}>
            Your daily college bus route.
          </p>
          <p style={{ marginTop: "12px" }}>
            <strong>Route:</strong> Vijayawada
          </p>
        </div>

        <div className="card">
          <h2>📍 Pickup Point</h2>
          <p style={{ marginTop: "10px", color: "#475569" }}>
            Your registered pickup location.
          </p>
          <p style={{ marginTop: "12px" }}>
            <strong>Stop:</strong> Benz Circle
          </p>
        </div>

        <div className="card">
          <h2>📞 Driver Contact</h2>
          <p style={{ marginTop: "10px", color: "#475569" }}>
            Contact driver during trip time.
          </p>
          <p style={{ marginTop: "12px" }}>
            <strong>Phone:</strong> 9876543210
          </p>
        </div>
      </div>

      <div
        className="action-panel"
        style={{
          maxWidth: "900px",
        }}
      >
        <h2>Quick Actions</h2>

        <div className="action-row">
          <a href="/student/tracking" className="btn btn-primary">
            Live Tracking
          </a>

          <a href="/student/seats" className="btn btn-success">
            Seat Availability
          </a>

          <a href="/student/notifications" className="btn btn-warning">
            Notifications
          </a>

          <a href="/student/dashboard" className="btn btn-dark">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;