import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      const response = await axiosInstance.get("/routes");
      setRoutes(response.data);
    } catch (error) {
      console.log("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading routes...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🛣️ Manage Routes</h1>
        <p>View all bus routes, start points, end points, and stops.</p>
      </div>
      <BackToDashboard />

      {routes.length === 0 ? (
        <div className="card">
          <p>No routes found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Route Name</th>
                <th>Start Point</th>
                <th>End Point</th>
                <th>Stops</th>
              </tr>
            </thead>

            <tbody>
              {routes.map((route) => (
                <tr key={route.id}>
                  <td>{route.id}</td>
                  <td>{route.route_name || route.name || "-"}</td>
                  <td>{route.start_point || route.startPoint || "-"}</td>
                  <td>{route.end_point || route.endPoint || "-"}</td>
                  <td>
                    {Array.isArray(route.stops)
                      ? route.stops.join(", ")
                      : route.stops || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Routes;