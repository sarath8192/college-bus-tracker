import StudentLayout from "../../components/layouts/StudentLayout";

function RoutesManagement() {
  const routes = [
    {
      id: 1,
      name: "Vijayawada → VIT",
      stops: 5,
      distance: "25 KM",
    },
    {
      id: 2,
      name: "Guntur → VIT",
      stops: 4,
      distance: "20 KM",
    },
  ];

  return (
    <StudentLayout>
      <h1>🛣 Routes Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Route</th>
            <th>Stops</th>
            <th>Distance</th>
          </tr>
        </thead>

        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td>{route.name}</td>
              <td>{route.stops}</td>
              <td>{route.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StudentLayout>
  );
}

export default RoutesManagement;