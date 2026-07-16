import { useEffect, useState } from "react";
import { getAdminReports } from "../../api/adminApi";
import StudentLayout from "../../components/layouts/StudentLayout";
import { StatsSkeleton } from "../../components/common/SkeletonLoader";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await getAdminReports();
      setReport(data);
    } catch (error) {
      console.log("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (!report) return;
    const headers = "Metric,Value\n";
    const rows = [
      `Total Registered Students,${report.totalStudents}`,
      `Total Shift Drivers,${report.totalDrivers}`,
      `Total Buses Roster,${report.totalBuses}`,
      `Total Active & Completed Trips,${report.totalTrips}`,
      `Total Seating Capacity,${report.totalSeats}`,
      `Total Occupied Seats,${report.occupiedSeats}`,
      `Total Available Seats,${report.availableSeats}`
    ].join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CampusRide_Roster_Report_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Compiling database summary files...</p>
        </div>
      </StudentLayout>
    );
  }

  const occupancyRate = report && report.totalSeats > 0
    ? Math.round((report.occupiedSeats / report.totalSeats) * 100)
    : 0;

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header no-print">
          <div className="page-title-area">
            <h1>Transit System Reports</h1>
            <p>Generate and review database status logs, seating utilization, and route reports.</p>
          </div>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleExportCSV} className="btn btn-outline" style={{ padding: "10px 18px" }}>
              📥 Export CSV
            </button>
            <button onClick={handlePrint} className="btn btn-primary" style={{ padding: "10px 18px" }}>
              🖨️ Print Report
            </button>
          </div>
        </div>

        {!report ? (
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <h3>No Report Compiled</h3>
            <p>We couldn't compile a report. Please verify connection and try again.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            
            {/* Quick Metrics display inside printable zone */}
            <div className="grid no-print" style={{ margin: 0 }}>
              <div className="card" style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "28px" }}>👥</span>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase", fontWeight: "700" }}>Total Users</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Outfit', sans-serif" }}>{(report.totalStudents || 0) + (report.totalDrivers || 0)}</div>
                </div>
              </div>

              <div className="card" style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "28px" }}>🪑</span>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase", fontWeight: "700" }}>Occupancy Rate</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Outfit', sans-serif" }}>{occupancyRate}%</div>
                </div>
              </div>

              <div className="card" style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "28px" }}>🛣️</span>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase", fontWeight: "700" }}>Trips Logged</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Outfit', sans-serif" }}>{report.totalTrips}</div>
                </div>
              </div>
            </div>

            {/* Document Card */}
            <div className="card" style={{ margin: 0, padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--neutral-border)", paddingBottom: "16px", marginBottom: "20px" }}>
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: "800", margin: 0, fontFamily: "'Outfit', sans-serif" }}>CampusRide System Summary</h2>
                  <span style={{ fontSize: "12px", color: "var(--neutral-muted)" }}>Transit System Database Summary</span>
                </div>
                <span className="badge badge-active" style={{ textTransform: "uppercase", fontSize: "11px" }}>Generated Live</span>
              </div>

              <div className="table-container" style={{ margin: 0, boxShadow: "none", border: "none" }}>
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Commute System Roster Metric</th>
                      <th style={{ textAlign: "right" }}>Database Record Log Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Total Registered Students</strong></td>
                      <td style={{ textAlign: "right", fontWeight: "700", color: "var(--neutral-dark)" }}>{report.totalStudents}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Shift Drivers</strong></td>
                      <td style={{ textAlign: "right", fontWeight: "700", color: "var(--neutral-dark)" }}>{report.totalDrivers}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Buses Roster</strong></td>
                      <td style={{ textAlign: "right", fontWeight: "700", color: "var(--neutral-dark)" }}>{report.totalBuses}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Active & Completed Trips</strong></td>
                      <td style={{ textAlign: "right", fontWeight: "700", color: "var(--neutral-dark)" }}>{report.totalTrips}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Seating Capacity</strong></td>
                      <td style={{ textAlign: "right", fontWeight: "700", color: "var(--neutral-dark)" }}>{report.totalSeats}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Occupied Seats</strong></td>
                      <td style={{ textAlign: "right", fontWeight: "700", color: "var(--danger)" }}>{report.occupiedSeats}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Available Seats</strong></td>
                      <td style={{ textAlign: "right", fontWeight: "800", color: "var(--success)" }}>{report.availableSeats}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "24px", padding: "16px", border: "1px dashed var(--neutral-border)", borderRadius: "8px", fontSize: "12px", color: "var(--neutral-muted)", textAlign: "center" }}>
                Report compiled on {new Date().toLocaleString()}. Confirmed database connections active.
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .app-sidebar { display: none !important; }
          .app-navbar { display: none !important; }
          .layout-content { margin-left: 0 !important; margin-top: 0 !important; padding: 0 !important; }
          .card { border: none !important; box-shadow: none !important; padding: 0 !important; }
        }
      `}} />
    </StudentLayout>
  );
};

export default Reports;
