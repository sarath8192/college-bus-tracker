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
      <h1>👨‍🎓 Students Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Bus</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.bus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StudentLayout>
  );
}

export default StudentsManagement;