import StudentLayout from "../../components/layouts/StudentLayout";

function BusesManagement() {
  const buses = [
    {
      number: "VIT-01",
      route: "Vijayawada → VIT",
      seats: 50,
      status: "Active",
    },
    {
      number: "VIT-02",
      route: "Guntur → VIT",
      seats: 45,
      status: "Active",
    },
  ];

  return (
    <StudentLayout>
      <h1>🚌 Buses Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Route</th>
            <th>Seats</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus, index) => (
            <tr key={index}>
              <td>{bus.number}</td>
              <td>{bus.route}</td>
              <td>{bus.seats}</td>
              <td>{bus.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StudentLayout>
  );
}

export default BusesManagement;