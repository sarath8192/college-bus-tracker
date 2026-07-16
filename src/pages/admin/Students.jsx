import { useEffect, useState } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../../api/studentApi";
import StudentLayout from "../../components/layouts/StudentLayout";
import { TableSkeleton } from "../../components/common/SkeletonLoader";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bus: "",
    route: ""
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.log("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
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
      await createStudent(formData);
      alert("Student added successfully!");
      setShowAddModal(false);
      setFormData({ name: "", email: "", bus: "", route: "" });
      fetchStudents();
    } catch (err) {
      alert("Failed to add student");
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name || "",
      email: student.email || "",
      bus: student.bus || "",
      route: student.route || ""
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(selectedStudent.id, formData);
      alert("Student updated successfully!");
      setShowEditModal(false);
      fetchStudents();
    } catch (err) {
      alert("Failed to update student");
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this student account?")) {
      try {
        await deleteStudent(id);
        alert("Student deleted successfully!");
        fetchStudents();
      } catch (err) {
        alert("Failed to delete student");
      }
    }
  };

  const filteredStudents = students.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      (s.name || "").toLowerCase().includes(query) ||
      (s.email || "").toLowerCase().includes(query) ||
      (s.bus || "").toLowerCase().includes(query) ||
      (s.route || "").toLowerCase().includes(query)
    );
  });

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Manage Students</h1>
            <p>Review enrolled student accounts, bus assignments, and pickup coordinates.</p>
          </div>
          
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button onClick={() => {
              setFormData({ name: "", email: "", bus: "", route: "" });
              setShowAddModal(true);
            }} className="btn btn-primary">
              + Add Student
            </button>
            
            {/* Search bar widget */}
            <div style={{ minWidth: "260px" }}>
              <input
                type="text"
                placeholder="🔍 Search name, bus, route..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎓</div>
            <h3>No Registered Students</h3>
            <p>Currently, there are no students registered in the database.</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No Matches Found</h3>
            <p>We couldn't find any student matching your search term: "{searchQuery}".</p>
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
                    <th>Assigned Bus</th>
                    <th>Route</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>
                      <td style={{ fontWeight: "600", color: "var(--neutral-dark)" }}>{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <span className="badge badge-active" style={{ fontSize: "11px" }}>
                          {student.bus || "Unassigned"}
                        </span>
                      </td>
                      <td>{student.route || "N/A"}</td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button onClick={() => handleEditClick(student)} className="table-action-btn" title="Edit Student">
                            ✏️
                          </button>
                          <button onClick={() => handleDeleteClick(student.id)} className="table-action-btn delete" title="Delete Student">
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
            <div className="mobile-students-grid" style={{ display: "none", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              {filteredStudents.map((student) => (
                <div key={student.id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700" }}>{student.name}</span>
                    <span style={{ fontSize: "12px", color: "var(--neutral-muted)" }}>ID: #{student.id}</span>
                  </div>

                  <div style={{ fontSize: "13px", color: "var(--neutral-muted)", marginBottom: "12px" }}>
                    {student.email}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", fontSize: "13px" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase" }}>Assigned Bus</strong>
                      <span className="badge badge-active" style={{ fontSize: "11px", marginTop: "4px" }}>{student.bus || "Unassigned"}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "11px", color: "var(--neutral-muted)", textTransform: "uppercase" }}>Route</strong>
                      <span style={{ fontWeight: "600", display: "inline-block", marginTop: "4px" }}>{student.route || "N/A"}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px", marginTop: "12px" }}>
                    <button onClick={() => handleEditClick(student)} className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(student.id)} className="btn btn-danger" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 768px) {
                .table-container { display: none !important; }
                .mobile-students-grid { display: flex !important; }
              }
            `}} />
          </>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Student Profile</h2>
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
                <label htmlFor="route">Route Landmark</label>
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

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Student Profile</h2>
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
                <label htmlFor="edit_route">Route Landmark</label>
                <input
                  type="text"
                  id="edit_route"
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  className="input"
                />
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

export default Students;
