import StudentLayout from "../../components/layouts/StudentLayout";

function DriversManagement() {
  const drivers = [
    {
      id: 1,
      name: "Ramesh",
      phone: "9876543210",
      bus: "VIT-01",
    },
    {
      id: 2,
      name: "Suresh",
      phone: "9876501234",
      bus: "VIT-02",
    },
  ];

  return (
    <StudentLayout>
      <h1>👨‍✈️ Drivers Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Bus</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.phone}</td>
              <td>{driver.bus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StudentLayout>
  );
}

export default DriversManagement;