import { useEffect, useState } from "react";
import { getStudents } from "../../api/studentApi";
import { getBuses } from "../../api/busApi";
import { getDrivers } from "../../api/driverApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    buses: 0,
    drivers: 0,
    activeBuses: 0,
    totalSeats: 0,
    occupiedSeats: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const students = await getStudents();
      const buses = await getBuses();
      const drivers = await getDrivers();

      const activeBuses = buses.filter((bus) => bus.status === "Active").length;

      const totalSeats = buses.reduce(
        (sum, bus) => sum + Number(bus.totalSeats || 0),
        0
      );

      const occupiedSeats = buses.reduce(
        (sum, bus) => sum + Number(bus.occupiedSeats || 0),
        0
      );

      setStats({
        students: students.length,
        buses: buses.length,
        drivers: drivers.length,
        activeBuses,
        totalSeats,
        occupiedSeats,
      });
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  const availableSeats = stats.totalSeats - stats.occupiedSeats;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h2>{stats.students}</h2>
          <p>Total Students</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.drivers}</h2>
          <p>Total Drivers</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.buses}</h2>
          <p>Total Buses</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.activeBuses}</h2>
          <p>Active Buses</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.occupiedSeats}</h2>
          <p>Occupied Seats</p>
        </div>

        <div style={cardStyle}>
          <h2>{availableSeats}</h2>
          <p>Available Seats</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  width: "180px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: "#f5f5f5",
};

export default Dashboard;