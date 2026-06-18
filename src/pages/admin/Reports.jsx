import { useEffect, useState } from "react";
import { getStudents } from "../../api/studentApi";
import { getBuses } from "../../api/busApi";
import { getDrivers } from "../../api/driverApi";

const Reports = () => {
  const [report, setReport] = useState({
    totalStudents: 0,
    totalBuses: 0,
    totalDrivers: 0,
    totalSeats: 0,
    occupiedSeats: 0,
    availableSeats: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const students = await getStudents();
      const buses = await getBuses();
      const drivers = await getDrivers();

      const totalSeats = buses.reduce(
        (sum, bus) => sum + Number(bus.totalSeats || 0),
        0
      );

      const occupiedSeats = buses.reduce(
        (sum, bus) => sum + Number(bus.occupiedSeats || 0),
        0
      );

      setReport({
        totalStudents: students.length,
        totalBuses: buses.length,
        totalDrivers: drivers.length,
        totalSeats,
        occupiedSeats,
        availableSeats: totalSeats - occupiedSeats,
      });
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
    return <h2>Loading reports...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Reports</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
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
  );
};

export default Reports;