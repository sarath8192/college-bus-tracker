import StudentLayout from "../../components/layouts/StudentLayout";

function DriverDashboard() {
  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Driver Dashboard</h1>
            <p>Welcome back, Captain! Manage your active trip status, update seats, and broadcast live GPS coordinates.</p>
          </div>
        </div>

        {/* Dynamic statistics overview */}
        <div className="grid">
          <div className="stat-card primary">
            <div className="stat-card-top">
              <div>
                <h3>Assigned Bus</h3>
                <div className="value">VIT-01</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "12px" }}>
              Plate: <span style={{ fontWeight: "700", color: "var(--neutral-dark)" }}>AP07-TV-1234</span>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-card-top">
              <div>
                <h3>Route Name</h3>
                <div className="value">Vijayawada</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "12px" }}>
              Checkpoints: <span style={{ fontWeight: "700", color: "var(--neutral-dark)" }}>3 stops</span>
            </div>
          </div>

          <div className="stat-card gray">
            <div className="stat-card-top">
              <div>
                <h3>Trip Status</h3>
                <div className="value" style={{ fontSize: "24px" }}>Not Started</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "12px" }}>
              GPS: <span style={{ fontWeight: "700", color: "var(--danger)" }}>Offline</span>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-card-top">
              <div>
                <h3>Seat Occupancy</h3>
                <div className="value">20 / 40</div>
              </div>
              <div className="stat-card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "12px" }}>
              Status: <span style={{ fontWeight: "700", color: "var(--success)" }}>50% capacity available</span>
            </div>
          </div>
        </div>

        {/* Driver Commute Controls */}
        <div className="action-panel">
          <h2>Driver Commute Controls</h2>
          <p style={{ color: "var(--neutral-muted)", fontSize: "14px", marginTop: "4px" }}>
            Trigger and log your daily college bus transit metrics.
          </p>

          <div className="grid" style={{ marginTop: "24px", marginBottom: 0 }}>
            <a href="/driver/trip" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Manage Trip</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Start trip & broadcast GPS</p>
              </div>
            </a>

            <a href="/driver/seats" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "var(--success-light)", color: "var(--success)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Seat Counter</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Increment occupied seats count</p>
              </div>
            </a>

            <a href="/driver/emergency" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "var(--danger-light)", color: "var(--danger)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Emergency Alert</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Send breakdown/delay warning</p>
              </div>
            </a>

            <a href="/driver/history" className="card" style={{ textDecoration: "none", display: "flex", gap: "18px", alignItems: "center" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(100,116,139,0.08)", color: "var(--neutral-muted)", display: "flex" }}>
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>Trip History</h3>
                <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>Review previous trip logs</p>
              </div>
            </a>
          </div>
        </div>

        {/* Safety Tip Advisory */}
        <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center", borderLeft: "4px solid var(--warning)" }}>
          <div style={{ fontSize: "28px" }}>💡</div>
          <div>
            <h4 style={{ fontWeight: "700", fontSize: "15px", color: "var(--neutral-dark)" }}>Safety First Checklist</h4>
            <p style={{ fontSize: "13px", color: "var(--neutral-muted)", marginTop: "2px" }}>
              Ensure your mobile device GPS location tracking is active and permission is allowed before starting your trip. Turn on high accuracy mode.
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

export default DriverDashboard;
