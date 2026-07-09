import StudentLayout from "../../components/layouts/StudentLayout";

function Profile() {
  return (
    <StudentLayout>
      <h1>👨‍✈️ Driver Profile</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <p>
          <strong>Name:</strong> Ramesh Kumar
        </p>

        <p>
          <strong>Phone:</strong> 9876543210
        </p>

        <p>
          <strong>License Number:</strong> AP123456789
        </p>

        <p>
          <strong>Assigned Bus:</strong> VIT-01
        </p>

        <p>
          <strong>Assigned Route:</strong>
          Vijayawada → VIT
        </p>
      </div>
    </StudentLayout>
  );
}

export default Profile;
