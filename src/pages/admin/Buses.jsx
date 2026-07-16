import { useEffect, useState } from "react";
import { getBuses, createBus, updateBus, deleteBus } from "../../api/busApi";
import StudentLayout from "../../components/layouts/StudentLayout";
import { TableSkeleton } from "../../components/common/SkeletonLoader";

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    bus_number: "",
    total_seats: 40,
    occupied_seats: 0,
    status: "Active"
  });

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const data = await getBuses();
      setBuses(data);
    } catch (error) {
      console.log("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
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
      await createBus({
        ...formData,
        total_seats: Number(formData.total_seats),
        occupied_seats: Number(formData.occupied_seats)
      });
      alert("Bus registered successfully!");
      setShowAddModal(false);
      setFormData({ bus_number: "", total_seats: 40, occupied_seats: 0, status: "Active" });
      fetchBuses();
    } catch (err) {
      alert("Failed to register bus");
    }
  };

  const handleEditClick = (bus) => {
    setSelectedBus(bus);
    setFormData({
      bus_number: bus.bus_number || bus.busNumber || "",
      total_seats: bus.total_seats || bus.totalSeats || 40,
      occupied_seats: bus.occupied_seats || bus.occupiedSeats || 0,
      status: bus.status || "Active"
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBus(selectedBus.id, {
        ...formData,
        total_seats: Number(formData.total_seats),
        occupied_seats: Number(formData.occupied_seats)
      });
      alert("Bus specifications updated successfully!");
      setShowEditModal(false);
      fetchBuses();
    } catch (err) {
      alert("Failed to update bus details");
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to remove this bus from the fleet?")) {
      try {
        await deleteBus(id);
        alert("Bus deleted successfully!");
        fetchBuses();
      } catch (err) {
        alert("Failed to delete bus");
      }
    }
  };

  const filteredBuses = buses.filter((b) => {
    const query = searchQuery.toLowerCase();
    const busNum = (b.bus_number || b.busNumber || "").toLowerCase();
    return (
      busNum.includes(query) ||
      (b.status && b.status.toLowerCase().includes(query))
    );
  });

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Manage Buses</h1>
            <p>Monitor bus roster, seating configurations, active occupied counts, and status.</p>
          </div>
          
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button onClick={() => {
              setFormData({ bus_number: "", total_seats: 40, occupied_seats: 0, status: "Active" });
              setShowAddModal(true);
            }} className="btn btn-primary">
              + Add Bus Fleet
            </button>
            
            {/* Search bar widget */}
            <div style={{ minWidth: "260px" }}>
              <input
                type="text"
                placeholder="🔍 Search bus number, status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={5} cols={6} />
        ) : buses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🚌</div>
            <h3>No Buses Registered</h3>
            <p>Currently, there are no buses registered in the database.</p>
          </div>
        ) : filteredBuses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No Matches Found</h3>
            <p>We couldn't find any bus matching your search term: "{searchQuery}".</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Bus Number</th>
                    <th>Total Seats</th>
                    <th>Occupied Seats</th>
                    <th>Available Seats</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBuses.map((bus) => {
                    const totalSeats = bus.total_seats || bus.totalSeats || 0;
                    const occupiedSeats = bus.occupied_seats || bus.occupiedSeats || 0;
                    const availableSeats = totalSeats - occupiedSeats;

                    return (
                      <tr key={bus.id}>
                        <td>#{bus.id}</td>
                        <td style={{ fontWeight: "700", color: "var(--neutral-dark)" }}>
                          {bus.bus_number || bus.busNumber || "N/A"}
                        </td>
                        <td>{totalSeats}</td>
                        <td>{occupiedSeats}</td>
                        <td style={{ fontWeight: "700", color: availableSeats > 5 ? "var(--success)" : "var(--danger)" }}>
                          {availableSeats}
                        </td>
                        <td>
                          <span className={bus.status === "Active" ? "badge badge-success" : "badge badge-gray"}>
                            {bus.status || "Inactive"}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <button onClick={() => handleEditClick(bus)} className="table-action-btn" title="Edit Bus">
                              ✏️
                            </button>
                            <button onClick={() => handleDeleteClick(bus.id)} className="table-action-btn delete" title="Delete Bus">
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Cards list */}
            <div className="mobile-buses-grid" style={{ display: "none", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              {filteredBuses.map((bus) => {
                const totalSeats = bus.total_seats || bus.totalSeats || 0;
                const occupiedSeats = bus.occupied_seats || bus.occupiedSeats || 0;
                const availableSeats = totalSeats - occupiedSeats;

                return (
                  <div key={bus.id} className="card" style={{ borderLeft: `4px solid ${bus.status === 'Active' ? 'var(--success)' : 'var(--neutral-border)'}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontWeight: "700", fontSize: "16px" }}>
                        Bus: {bus.bus_number || bus.busNumber || "N/A"}
                      </span>
                      <span className={bus.status === "Active" ? "badge badge-success" : "badge badge-gray"}>
                        {bus.status || "Inactive"}
                      </span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", fontSize: "13px", color: "var(--neutral-muted)", marginTop: "12px" }}>
                      <div>
                        <strong>Total Seats:</strong> {totalSeats}
                      </div>
                      <div>
                        <strong>Occupied:</strong> {occupiedSeats}
                      </div>
                      <div style={{ color: availableSeats > 5 ? "var(--success)" : "var(--danger)", fontWeight: "600" }}>
                        <strong>Available:</strong> {availableSeats}
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", marginTop: "12px" }}>
                      <button onClick={() => handleEditClick(bus)} className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "12px" }}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteClick(bus.id)} className="btn btn-danger" style={{ padding: "6px 12px", fontSize: "12px" }}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 768px) {
                .table-container { display: none !important; }
                .mobile-buses-grid { display: flex !important; }
              }
            `}} />
          </>
        )}
      </div>

      {/* Add Bus Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Register Fleet Vehicle</h2>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label htmlFor="bus_number">Bus Number / Code</label>
                <input
                  type="text"
                  id="bus_number"
                  name="bus_number"
                  value={formData.bus_number}
                  onChange={handleInputChange}
                  placeholder="e.g. VIT-03"
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="total_seats">Total Seats Capacity</label>
                <input
                  type="number"
                  id="total_seats"
                  name="total_seats"
                  value={formData.total_seats}
                  onChange={handleInputChange}
                  className="input"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="occupied_seats">Occupied Seats</label>
                <input
                  type="number"
                  id="occupied_seats"
                  name="occupied_seats"
                  value={formData.occupied_seats}
                  onChange={handleInputChange}
                  className="input"
                  min="0"
                  max={formData.total_seats}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Fleet Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="Active">Active / In Service</option>
                  <option value="Inactive">Under Maintenance / Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Register Bus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Bus Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Fleet Specifications</h2>
              <button onClick={() => setShowEditModal(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label htmlFor="edit_bus_number">Bus Number / Code</label>
                <input
                  type="text"
                  id="edit_bus_number"
                  name="bus_number"
                  value={formData.bus_number}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_total_seats">Total Seats Capacity</label>
                <input
                  type="number"
                  id="edit_total_seats"
                  name="total_seats"
                  value={formData.total_seats}
                  onChange={handleInputChange}
                  className="input"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_occupied_seats">Occupied Seats</label>
                <input
                  type="number"
                  id="edit_occupied_seats"
                  name="occupied_seats"
                  value={formData.occupied_seats}
                  onChange={handleInputChange}
                  className="input"
                  min="0"
                  max={formData.total_seats}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_status">Fleet Status</label>
                <select
                  id="edit_status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="Active">Active / In Service</option>
                  <option value="Inactive">Under Maintenance / Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Specifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Buses;
