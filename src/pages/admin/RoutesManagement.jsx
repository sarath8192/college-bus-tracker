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
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>🛣️ Routes Management (Alternative View)</h1>
            <p>Static checklist of registered routes, checkpoints, and route mileage statistics.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Intermediate Stops Count</th>
                <th>Estimated Distance</th>
              </tr>
            </thead>

            <tbody>
              {routes.map((route) => (
                <tr key={route.id}>
                  <td style={{ fontWeight: "700", color: "var(--neutral-dark)" }}>{route.name}</td>
                  <td>{route.stops} checkpoints</td>
                  <td style={{ fontWeight: "600" }}>{route.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
}

export default RoutesManagement;
