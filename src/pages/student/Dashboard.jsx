import StudentLayout from "../../components/layouts/StudentLayout";

import DashboardCard from "../../components/common/DashboardCard";

import { buses } from "../../mock/buses";

function Dashboard() {
  return (
    <StudentLayout>

      <h1>Student Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <DashboardCard
          title="Assigned Bus"
          value={buses[0].busNumber}
        />

        <DashboardCard
          title="Available Seats"
          value={buses[0].availableSeats}
        />

        <DashboardCard
          title="ETA"
          value={buses[0].eta}
        />
      </div>

    </StudentLayout>
  );
}

export default Dashboard;