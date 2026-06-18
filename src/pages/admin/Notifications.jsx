const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Bus Delay",
      message: "Bus VIT-01 is delayed by 10 minutes",
      type: "Delay",
    },
    {
      id: 2,
      title: "Emergency Alert",
      message: "Driver reported emergency on Route Vijayawada",
      type: "Emergency",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔔 Notifications</h1>

      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{notification.title}</h3>
          <p>{notification.message}</p>
          <strong>Type: {notification.type}</strong>
        </div>
      ))}
    </div>
  );
};

export default Notifications;