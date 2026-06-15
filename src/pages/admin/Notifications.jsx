import StudentLayout from "../../components/layouts/StudentLayout";

function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Bus Delay Alert",
      message: "Bus VIT-01 delayed by 10 minutes",
    },
    {
      id: 2,
      title: "Emergency Alert",
      message: "Driver reported engine issue",
    },
    {
      id: 3,
      title: "Route Update",
      message: "Route 3 updated due to road work",
    },
  ];

  return (
    <StudentLayout>
      <h1>🔔 Admin Notifications</h1>

      {notifications.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.title}</h3>

          <p>{item.message}</p>
        </div>
      ))}
    </StudentLayout>
  );
}

export default Notifications;