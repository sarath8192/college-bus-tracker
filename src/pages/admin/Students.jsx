import BackToDashboard from "../../components/common/BackToDashboard";
import { useEffect, useState } from "react";
import { getStudents } from "../../api/studentApi";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
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

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading students...</h2>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🎓 Manage Students</h1>
        <p>View all registered students and their assigned bus details.</p>
      </div>
      <BackToDashboard />

      {students.length === 0 ? (
        <div className="card">
          <p>No students found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Bus</th>
                <th>Route</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.bus || "-"}</td>
                  <td>{student.route || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;