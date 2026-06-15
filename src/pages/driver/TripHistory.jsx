import StudentLayout from "../../components/layouts/StudentLayout";

function TripHistory() {
  const trips = [
    {
      id: 1,
      date: "15 Jun",
      route: "Vijayawada → VIT",
      status: "Completed",
    },
    {
      id: 2,
      date: "14 Jun",
      route: "Vijayawada → VIT",
      status: "Completed",
    },
  ];

  return (
    <StudentLayout>
      <h1>📋 Trip History</h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Route</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.date}</td>
              <td>{trip.route}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StudentLayout>
  );
}

export default TripHistory;