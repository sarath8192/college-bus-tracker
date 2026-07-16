import StudentLayout from "../../components/layouts/StudentLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts";

function Analytics() {
  // Bus seating capacity utilization data
  const occupancyData = [
    { name: "VIT-01", Occupied: 35, Total: 50 },
    { name: "VIT-02", Occupied: 28, Total: 40 },
    { name: "VIT-03", Occupied: 48, Total: 50 },
    { name: "VIT-04", Occupied: 12, Total: 30 },
  ];

  // Daily transit delay trends (minutes)
  const delayData = [
    { day: "Mon", RouteA: 5, RouteB: 12, RouteC: 2 },
    { day: "Tue", RouteA: 15, RouteB: 4, RouteC: 8 },
    { day: "Wed", RouteA: 2, RouteB: 8, RouteC: 15 },
    { day: "Thu", RouteA: 8, RouteB: 18, RouteC: 5 },
    { day: "Fri", RouteA: 10, RouteB: 2, RouteC: 12 },
  ];

  // Fleet availability breakdown
  const fleetData = [
    { name: "Active Service", value: 6 },
    { name: "Under Maintenance", value: 2 },
  ];

  const FLEET_COLORS = ["#10b981", "#ef4444"];

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Analytics & Insights</h1>
            <p>Review transit capacities, active delay metrics, route performance, and fleet service health status.</p>
          </div>
        </div>

        {/* Dynamic Analytics Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }} className="analytics-grid">
          
          {/* Seating Capacity Comparison */}
          <div className="card">
            <h2>Seating Capacity Utilization</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "20px" }}>
              Compare current passenger counts vs total vehicle limits across routes.
            </p>
            <div style={{ width: "100%", height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: "11px" }} />
                  <YAxis stroke="#64748b" style={{ fontSize: "11px" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Occupied" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Total" fill="var(--neutral-border)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Delay Metrics */}
          <div className="card">
            <h2>Transit Delay Trends (Mins)</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "20px" }}>
              Analyze average intermediate checkpoint delay logs across routes (Monday to Friday).
            </p>
            <div style={{ width: "100%", height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={delayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: "11px" }} />
                  <YAxis stroke="#64748b" style={{ fontSize: "11px" }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="RouteA" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="RouteB" stroke="var(--warning)" strokeWidth={2} />
                  <Line type="monotone" dataKey="RouteC" stroke="var(--danger)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom row: Fleet status & operational performance */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }} className="analytics-grid">
          
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2>Operational Summary</h2>
              <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "16px" }}>
                Active statistics metrics for this week's commute performance.
              </p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div style={{ padding: "16px", backgroundColor: "var(--neutral-light)", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "700", textTransform: "uppercase" }}>Commute Reliability</span>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--success)", marginTop: "4px", fontFamily: "'Outfit', sans-serif" }}>94.2%</div>
                <p style={{ fontSize: "11px", color: "var(--neutral-muted)", marginTop: "4px" }}>On-time arrivals at campus terminal.</p>
              </div>

              <div className="card" style={{ padding: "16px", backgroundColor: "var(--neutral-light)", border: "none", margin: 0 }}>
                <span style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "700", textTransform: "uppercase" }}>Average Occupancy</span>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--primary)", marginTop: "4px", fontFamily: "'Outfit', sans-serif" }}>68%</div>
                <p style={{ fontSize: "11px", color: "var(--neutral-muted)", marginTop: "4px" }}>Seat reservation load factor this week.</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2>Fleet Distribution</h2>
              <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "16px" }}>
                Fleet breakdown of active service buses vs maintenance.
              </p>
            </div>
            
            <div style={{ height: "140px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fleetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {fleetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={FLEET_COLORS[index % FLEET_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around", fontSize: "12px", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", marginTop: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: FLEET_COLORS[0] }} />
                <span>Active Service ({fleetData[0].value})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: FLEET_COLORS[1] }} />
                <span>Maintenance ({fleetData[1].value})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </StudentLayout>
  );
}

export default Analytics;
