import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import { getAdminReports } from "../../api/adminApi";

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

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading reports...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📄 Admin Reports</h1>
        <p>Summary report generated from Supabase database.</p>
      </div>
      <BackToDashboard />

      {!report ? (
        <div className="card">
          <p>No report found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <tbody>
              <tr>
                <th>Total Students</th>
                <td>{report.totalStudents}</td>
              </tr>

              <tr>
                <th>Total Drivers</th>
                <td>{report.totalDrivers}</td>
              </tr>

              <tr>
                <th>Total Buses</th>
                <td>{report.totalBuses}</td>
              </tr>

              <tr>
                <th>Total Trips</th>
                <td>{report.totalTrips}</td>
              </tr>

              <tr>
                <th>Total Seats</th>
                <td>{report.totalSeats}</td>
              </tr>

              <tr>
                <th>Occupied Seats</th>
                <td>{report.occupiedSeats}</td>
              </tr>

              <tr>
                <th>Available Seats</th>
                <td>{report.availableSeats}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;