import { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Student",
    email: "student@gmail.com",
    role: "student",
  };

  const [formData, setFormData] = useState({
    name: user.name || "Student User",
    email: user.email || "student@gmail.com",
    studentId: "STU-2026-879",
    department: "Computer Science & Engineering",
    phone: "+91 94401 23456",
    emergencyContact: "+91 94409 87654",
    emergencyRelation: "Father",
    pickupPoint: "Benz Circle",
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const getInitials = (name) => {
    if (!name) return "S";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    
    setTimeout(() => {
      // Save changes to localStorage to update navbar instantly!
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setSaving(false);
      setSuccessMsg("Profile information updated successfully!");
      
      setTimeout(() => {
        setSuccessMsg("");
        window.location.reload(); // Reload to refresh navbar context
      }, 1000);
    }, 800);
  };

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Student Profile</h1>
            <p>Manage your account settings, emergency details, and view your active transport schedules.</p>
          </div>
        </div>

        {successMsg && (
          <div className="alert-box success" style={{ maxWidth: "1000px", margin: "0 auto 24px" }}>
            <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid-2" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          {/* Left Side: Avatar Card and Bus details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* User Avatar Card */}
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--primary), var(--success))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "40px",
                    fontWeight: "800",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  {getInitials(formData.name)}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800" }}>{formData.name}</h2>
                  <span className="badge badge-active" style={{ textTransform: "uppercase", marginTop: "6px" }}>
                    {user.role || "student"}
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--neutral-muted)", marginTop: "-6px" }}>
                  ID: {formData.studentId}
                </p>
              </div>
            </div>

            {/* Transport Details Card */}
            <div className="card">
              <h2>Commute Roster</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>🚌</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Assigned Bus</h4>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>VIT-01 (Plate: AP07-TV-1234)</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>🛣️</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Assigned Route</h4>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>Vijayawada Express (NH-16)</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>📍</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Pickup Landmark</h4>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>Benz Circle (ETA 07:45 AM)</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", borderTop: "1px solid var(--neutral-border)", paddingTop: "12px" }}>
                  <span style={{ fontSize: "20px" }}>👨‍✈️</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Driver: Ramesh Kumar</h4>
                    <a href="tel:9876543210" style={{ fontSize: "13px", color: "var(--primary)", textDecoration: "none", fontWeight: "600", marginTop: "2px", display: "inline-block" }}>
                      📞 Call +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Edit Form */}
          <div className="card">
            <h2>Personal Information</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "24px" }}>
              Keep your profile and emergency contact details updated for administrative notifications.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                <label htmlFor="department">Department / Branch</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Contact Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="emergencyContact">Emergency Contact</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyRelation">Relationship</label>
                  <input
                    type="text"
                    id="emergencyRelation"
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pickupPoint">Select Pickup Stop</label>
                <select
                  id="pickupPoint"
                  name="pickupPoint"
                  value={formData.pickupPoint}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="Benz Circle">Benz Circle</option>
                  <option value="Ramavarappadu Ring">Ramavarappadu Ring</option>
                  <option value="Enikepadu Junction">Enikepadu Junction</option>
                  <option value="Gannavaram Road">Gannavaram Road</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ minWidth: "160px" }}>
                  {saving ? "Saving Changes..." : "Save Information"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Profile;
