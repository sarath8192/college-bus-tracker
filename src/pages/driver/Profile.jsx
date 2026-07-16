import { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Ramesh Kumar",
    email: "driver@gmail.com",
    role: "driver",
  };

  const [formData, setFormData] = useState({
    name: user.name || "Ramesh Kumar",
    email: user.email || "driver@gmail.com",
    phone: "+91 98765 43210",
    licenseNo: "AP123456789",
    licenseClass: "HMV (Heavy Motor Vehicle)",
    assignedBus: "VIT-01",
    experience: "8 Years",
    bloodGroup: "O+ve",
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const getInitials = (name) => {
    if (!name) return "D";
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
      setSuccessMsg("Driver profile details saved successfully!");
      
      setTimeout(() => {
        setSuccessMsg("");
        window.location.reload();
      }, 1000);
    }, 800);
  };

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Driver Profile</h1>
            <p>Review your licensing files, assigned bus schedules, and active transit details.</p>
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
          
          {/* Left Side: Avatar Card and Duty info */}
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
                    {user.role || "driver"}
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--neutral-muted)", marginTop: "-6px" }}>
                  License status: <span style={{ color: "var(--success)", fontWeight: "600" }}>Verified AP-RTA ✅</span>
                </p>
              </div>
            </div>

            {/* Transport Details Card */}
            <div className="card">
              <h2>Duty Credentials</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>🪪</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>License Number</h4>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>{formData.licenseNo} ({formData.licenseClass})</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>🚌</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Assigned Bus</h4>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>{formData.assignedBus} (50 Seater Fleet)</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>🕰️</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Years of Service</h4>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>{formData.experience} experience</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>🩸</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Blood Group</h4>
                    <p style={{ fontSize: "13px", color: "var(--neutral-muted)" }}>{formData.bloodGroup} (Emergency Records)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Edit Form */}
          <div className="card">
            <h2>Personal Information</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "24px" }}>
              Keep your contact details updated for administrative notifications and dispatcher reports.
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
                  <label htmlFor="licenseNo">License Number</label>
                  <input
                    type="text"
                    id="licenseNo"
                    name="licenseNo"
                    value={formData.licenseNo}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <input
                    type="text"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ minWidth: "160px" }}>
                  {saving ? "Saving Details..." : "Save Profile Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

export default Profile;
