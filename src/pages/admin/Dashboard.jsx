import StudentLayout from "../../components/layouts/StudentLayout";

function Dashboard() {
  const cards = [
    {
      title: "Total Students",
      value: 1200,
    },
    {
      title: "Total Drivers",
      value: 25,
    },
    {
      title: "Total Buses",
      value: 20,
    },
    {
      title: "Active Buses",
      value: 18,
    },
    {
      title: "Delayed Buses",
      value: 2,
    },
    {
      title: "Occupancy Rate",
      value: "78%",
    },
  ];

  return (
    <StudentLayout>
      <h1>👨‍💼 Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0px 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{card.title}</h3>

            <h1>{card.value}</h1>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
}

export default Dashboard;