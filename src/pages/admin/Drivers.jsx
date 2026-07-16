import { useEffect, useState } from "react";
import { getDrivers, createDriver, updateDriver, deleteDriver } from "../../api/driverApi";
import StudentLayout from "../../components/layouts/StudentLayout";
import { TableSkeleton } from "../../components/common/SkeletonLoader";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bus: "",
    route: "",
    status: "Active"
  });

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      console.log("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
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
      await createDriver(formData);
      alert("Driver added successfully!");
      setShowAddModal(false);
      setFormData({ name: "", email: "", phone: "", bus: "", route: "", status: "Active" });
      fetchDrivers();
    } catch (err) {
      alert("Failed to add driver");
    }
  };

  const handleEditClick = (driver) => {
    setSelectedDriver(driver);
    setFormData({
      name: driver.name || "",
      email: driver.email || "",
      phone: driver.phone || "",
      bus: driver.bus || "",
      route: driver.route || "",
      status: driver.status || "Active"
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDriver(selectedDriver.id, formData);
      alert("Driver details updated successfully!");
      setShowEditModal(false);
      fetchDrivers();
    } catch (err) {
      alert("Failed to update driver details");
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to remove this driver profile?")) {
      try {
        await deleteDriver(id);
        alert("Driver profile deleted successfully!");
        fetchDrivers();
      } catch (err) {
        alert("Failed to delete driver");
      }
    }
  };

  const filteredDrivers = drivers.filter((d) => {
    const query = searchQuery.toLowerCase();
    return (
      (d.name || "").toLowerCase().includes(query) ||
      (d.email || "").toLowerCase().includes(query) ||
      (d.phone && d.phone.includes(query)) ||
      (d.bus || "").toLowerCase().includes(query) ||
      (d.route || "").toLowerCase().includes(query)
    );
  });

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Manage Drivers</h1>
            <p>Monitor driver accounts, contact phones, vehicle duty files, and shift statuses.</p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button onClick={() => {
              setFormData({ name: "", email: "", phone: "", bus: "", route: "", status: "Active" });
              setShowAddModal(true);
            }} className="btn btn-primary">
              + Add Driver
            </button>
            
            {/* Search bar widget */}
            <div style={{ minWidth: "260px" }}>
              <input
                type="text"
                placeholder="🔍 Search name, phone, bus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={5} cols={7} />
        ) : drivers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👨‍✈️</div>
            <h3>No Drivers Found</h3>
            <p>Currently, there are no drivers registered in the database.</p>
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No Matches Found</h3>
            <p>We couldn't find any driver matching your search term: "{searchQuery}".</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Assigned Bus</th>
                    <th>Route</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDrivers.map((driver) => (
                    <tr key={driver.id}>
                      <td>#{driver.id}</td>
                      <td style={{ fontWeight: "600", color: "var(--neutral-dark)" }}>{driver.name}</td>
                      <td>{driver.email}</td>
                      <td>{driver.phone || "N/A"}</td>
                      <td>
                        <span className="badge badge-active" style={{ fontSize: "11px" }}>
                          {driver.bus || "Unassigned"}
                        </span>
                      </td>
                      <td>{driver.route || "N/A"}</td>
                      <td>
                        <span className={driver.status === "Active" ? "badge badge-success" : "badge badge-gray"}>
                          {driver.status || "Inactive"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button onClick={() => handleEditClick(driver)} className="table-action-btn" title="Edit Driver">
                            ✏️
                          </button>
                          <button onClick={() => handleDeleteClick(driver.id)} className="table-action-btn delete" title="Delete Driver">
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
            <div className="mobile-drivers-grid" style={{ display: "none", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="card" style={{ borderLeft: `4px solid ${driver.status === 'Active' ? 'var(--success)' : 'var(--neutral-border)'}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700" }}>{driver.name}</span>
                    <span className={driver.status === "Active" ? "badge badge-success" : "badge badge-gray"}>
                      {driver.status || "Inactive"}
                    </span>
                  </div>

                  <div style={{ fontSize: "13px", color: "var(--neutral-muted)", marginBottom: "4px" }}>
                    Email: {driver.email}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--neutral-muted)", marginBottom: "12px" }}>
                    Phone: {driver.phone || "N/A"}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", fontSize: "13px" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase" }}>Bus Duty</strong>
                      <span style={{ fontWeight: "600", display: "inline-block", marginTop: "4px" }}>{driver.bus || "Unassigned"}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase" }}>Route</strong>
                      <span style={{ fontWeight: "600", display: "inline-block", marginTop: "4px" }}>{driver.route || "N/A"}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", marginTop: "12px" }}>
                    <button onClick={() => handleEditClick(driver)} className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(driver.id)} className="btn btn-danger" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 768px) {
                .table-container { display: none !important; }
                .mobile-drivers-grid { display: flex !important; }
              }
            `}} />
          </>
        )}
      </div>

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Driver Profile</h2>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 99999 88888"
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bus">Assigned Bus ID</label>
                <input
                  type="text"
                  id="bus"
                  name="bus"
                  value={formData.bus}
                  onChange={handleInputChange}
                  placeholder="e.g. VIT-01"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="route">Assigned Route</label>
                <input
                  type="text"
                  id="route"
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  placeholder="e.g. Vijayawada"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Duty Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="Active">Active Duty</option>
                  <option value="Inactive">On Leave / Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Driver Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Driver Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label htmlFor="edit_name">Full Name</label>
                <input
                  type="text"
                  id="edit_name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_email">Email Address</label>
                <input
                  type="email"
                  id="edit_email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_phone">Phone Number</label>
                <input
                  type="text"
                  id="edit_phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_bus">Assigned Bus ID</label>
                <input
                  type="text"
                  id="edit_bus"
                  name="bus"
                  value={formData.bus}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_route">Assigned Route</label>
                <input
                  type="text"
                  id="edit_route"
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_status">Duty Status</label>
                <select
                  id="edit_status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="Active">Active Duty</option>
                  <option value="Inactive">On Leave / Inactive</option>
                </select>
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

export default Drivers;
