import StudentLayout from "../../components/layouts/StudentLayout";

function Reports() {
  const reports = [
    {
      id: 1,
      title: "Daily Transport Report",
      date: "16 June 2026",
    },
    {
      id: 2,
      title: "Weekly Occupancy Report",
      date: "15 June 2026",
    },
    {
      id: 3,
      title: "Monthly Bus Performance Report",
      date: "01 June 2026",
    },
  ];

  return (
    <StudentLayout>
      <h1>📄 Reports</h1>

      {reports.map((report) => (
        <div
          key={report.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{report.title}</h3>

          <p>{report.date}</p>

          <button>
            View Report
          </button>
        </div>
      ))}
    </StudentLayout>
  );
}

export default Reports;