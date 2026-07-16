import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import StudentLayout from "../../components/layouts/StudentLayout";
import { TableSkeleton } from "../../components/common/SkeletonLoader";

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    route_name: "",
    start_point: "",
    end_point: "",
    stops: ""
  });

  const fetchRoutes = async () => {
    try {
      setLoading(true);
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const stopsArray = formData.stops
        ? formData.stops.split(",").map((s) => s.trim())
        : [];
      
      await axiosInstance.post("/routes", {
        ...formData,
        stops: stopsArray
      });

      alert("Route added successfully!");
      setShowAddModal(false);
      setFormData({ route_name: "", start_point: "", end_point: "", stops: "" });
      fetchRoutes();
    } catch (err) {
      alert("Failed to add route");
    }
  };

  const handleEditClick = (route) => {
    setSelectedRoute(route);
    setFormData({
      route_name: route.route_name || route.name || "",
      start_point: route.start_point || route.startPoint || "",
      end_point: route.end_point || route.endPoint || "",
      stops: Array.isArray(route.stops) ? route.stops.join(", ") : route.stops || ""
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const stopsArray = formData.stops
        ? formData.stops.split(",").map((s) => s.trim())
        : [];

      await axiosInstance.put(`/routes/${selectedRoute.id}`, {
        ...formData,
        stops: stopsArray
      });

      alert("Route details updated successfully!");
      setShowEditModal(false);
      fetchRoutes();
    } catch (err) {
      alert("Failed to update route details");
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this transit route?")) {
      try {
        await axiosInstance.delete(`/routes/${id}`);
        alert("Route deleted successfully!");
        fetchRoutes();
      } catch (err) {
        alert("Failed to delete route");
      }
    }
  };

  const filteredRoutes = routes.filter((r) => {
    const query = searchQuery.toLowerCase();
    const routeName = (r.route_name || r.name || "").toLowerCase();
    const startPt = (r.start_point || r.startPoint || "").toLowerCase();
    const endPt = (r.end_point || r.endPoint || "").toLowerCase();
    return (
      routeName.includes(query) ||
      startPt.includes(query) ||
      endPt.includes(query)
    );
  });

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Manage Routes</h1>
            <p>Review registered college bus paths, dispatch checkpoints, and pick-up stops.</p>
          </div>
          
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button onClick={() => {
              setFormData({ route_name: "", start_point: "", end_point: "", stops: "" });
              setShowAddModal(true);
            }} className="btn btn-primary">
              + Add Route
            </button>

            {/* Search bar widget */}
            <div style={{ minWidth: "260px" }}>
              <input
                type="text"
                placeholder="🔍 Search route, stops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : routes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🛣️</div>
            <h3>No Routes Found</h3>
            <p>Currently, there are no routes registered in the database.</p>
          </div>
        ) : filteredRoutes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No Matches Found</h3>
            <p>We couldn't find any route matching your search term: "{searchQuery}".</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Route Name</th>
                    <th>Start Point</th>
                    <th>End Point</th>
                    <th>Checkpoints / Stops</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRoutes.map((route) => (
                    <tr key={route.id}>
                      <td style={{ fontWeight: "700" }}>#{route.id}</td>
                      <td style={{ fontWeight: "600", color: "var(--neutral-dark)" }}>
                        {route.route_name || route.name || "N/A"}
                      </td>
                      <td>{route.start_point || route.startPoint || "N/A"}</td>
                      <td>{route.end_point || route.endPoint || "N/A"}</td>
                      <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {Array.isArray(route.stops)
                          ? route.stops.join(", ")
                          : route.stops || "-"}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button onClick={() => handleEditClick(route)} className="table-action-btn" title="Edit Route">
                            ✏️
                          </button>
                          <button onClick={() => handleDeleteClick(route.id)} className="table-action-btn delete" title="Delete Route">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Cards list */}
            <div className="mobile-routes-grid" style={{ display: "none", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              {filteredRoutes.map((route) => (
                <div key={route.id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700", fontSize: "16px" }}>
                      {route.route_name || route.name || "N/A"}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--neutral-muted)" }}>ID: #{route.id}</span>
                  </div>

                  <div style={{ fontSize: "13px", color: "var(--neutral-muted)", margin: "8px 0" }}>
                    <strong>Start:</strong> {route.start_point || route.startPoint || "N/A"} <br />
                    <strong>End:</strong> {route.end_point || route.endPoint || "N/A"}
                  </div>

                  <div style={{ borderTop: "1px solid var(--neutral-border)", paddingTop: "8px", marginTop: "8px", fontSize: "13px" }}>
                    <strong style={{ display: "block", fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Intermediate Stops
                    </strong>
                    <p style={{ color: "var(--neutral-dark)", fontSize: "13px" }}>
                      {Array.isArray(route.stops) ? route.stops.join(" → ") : route.stops || "None"}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", marginTop: "12px" }}>
                    <button onClick={() => handleEditClick(route)} className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(route.id)} className="btn btn-danger" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 768px) {
                .table-container { display: none !important; }
                .mobile-routes-grid { display: flex !important; }
              }
            `}} />
          </>
        )}
      </div>

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Transit Route</h2>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label htmlFor="route_name">Route Name / Code</label>
                <input
                  type="text"
                  id="route_name"
                  name="route_name"
                  value={formData.route_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Vijayawada Express"
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="start_point">Start Point / Origin</label>
                <input
                  type="text"
                  id="start_point"
                  name="start_point"
                  value={formData.start_point}
                  onChange={handleInputChange}
                  placeholder="e.g. Benz Circle"
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_point">End Point / Destination</label>
                <input
                  type="text"
                  id="end_point"
                  name="end_point"
                  value={formData.end_point}
                  onChange={handleInputChange}
                  placeholder="e.g. Campus Terminal"
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stops">Intermediate Stops (Comma-separated)</label>
                <textarea
                  id="stops"
                  name="stops"
                  value={formData.stops}
                  onChange={handleInputChange}
                  placeholder="Ramavarappadu, Enikepadu, Gannavaram"
                  className="input"
                  rows="3"
                  style={{ resize: "vertical" }}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Route Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Route Details</h2>
              <button onClick={() => setShowEditModal(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label htmlFor="edit_route_name">Route Name / Code</label>
                <input
                  type="text"
                  id="edit_route_name"
                  name="route_name"
                  value={formData.route_name}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_start_point">Start Point / Origin</label>
                <input
                  type="text"
                  id="edit_start_point"
                  name="start_point"
                  value={formData.start_point}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_end_point">End Point / Destination</label>
                <input
                  type="text"
                  id="edit_end_point"
                  name="end_point"
                  value={formData.end_point}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_stops">Intermediate Stops (Comma-separated)</label>
                <textarea
                  id="edit_stops"
                  name="stops"
                  value={formData.stops}
                  onChange={handleInputChange}
                  className="input"
                  rows="3"
                  style={{ resize: "vertical" }}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Routes;
