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
    <div style={{ padding: "20px" }}>
      <h1>📄 Admin Reports</h1>
      <p>Reports from Supabase database</p>

      {!report ? (
        <p>No report found</p>
      ) : (
        <table
          border="1"
          cellPadding="12"
          style={{
            borderCollapse: "collapse",
            minWidth: "500px",
            backgroundColor: "#fff",
          }}
        >
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
      )}
    </div>
  );
};

export default Reports;