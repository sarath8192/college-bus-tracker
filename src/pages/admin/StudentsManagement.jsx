import StudentLayout from "../../components/layouts/StudentLayout";

function StudentsManagement() {
  const students = [
    {
      id: 1,
      name: "Sarath",
      email: "sarath@gmail.com",
      bus: "VIT-01",
    },
    {
      id: 2,
      name: "Ravi",
      email: "ravi@gmail.com",
      bus: "VIT-02",
    },
  ];

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>👨‍🎓 Students Management (Alternative View)</h1>
            <p>Static checklist of registered student profiles and vehicle assignments.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Email Address</th>
                <th>Assigned Bus</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td style={{ fontWeight: "600", color: "var(--neutral-dark)" }}>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <span className="badge badge-active">
                      {student.bus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentsManagement;
