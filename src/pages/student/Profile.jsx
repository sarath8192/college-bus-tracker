import { useState } from "react";
import StudentLayout from "../../components/layouts/studentlayout";
import studentData from "../../mock/student";

function Profile() {
  const [student, setStudent] = useState(studentData);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StudentLayout>
      <h1>👤 Student Profile</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Roll Number</label>
          <br />
          <input
            type="text"
            value={student.rollNumber}
            disabled
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Department</label>
          <br />
          <input
            type="text"
            value={student.department}
            disabled
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Assigned Bus</label>
          <br />
          <input
            type="text"
            value={student.assignedBus}
            disabled
          />
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => {
              alert("Profile Updated Successfully");
              setEditing(false);
            }}
          >
            Save Profile
          </button>
        )}
      </div>
    </StudentLayout>
  );
}

export default Profile;