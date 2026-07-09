const QuickActionsFooter = () => {
  const role = localStorage.getItem("role");

  const studentActions = [
    { label: "Dashboard", path: "/student/dashboard", color: "footer-blue" },
    {
      label: "Live Tracking",
      path: "/student/tracking",
      color: "footer-green",
    },
    { label: "Seats", path: "/student/seats", color: "footer-orange" },
    {
      label: "Notifications",
      path: "/student/notifications",
      color: "footer-red",
    },
    { label: "Profile", path: "/student/profile", color: "footer-purple" },
  ];

  const driverActions = [
    { label: "Dashboard", path: "/driver/dashboard", color: "footer-blue" },
    { label: "Manage Trip", path: "/driver/trip", color: "footer-green" },
    { label: "Seats", path: "/driver/seats", color: "footer-orange" },
    { label: "Emergency", path: "/driver/emergency", color: "footer-red" },
    { label: "History", path: "/driver/history", color: "footer-purple" },
  ];

  const adminActions = [
    { label: "Dashboard", path: "/admin/dashboard", color: "footer-blue" },
    { label: "Students", path: "/admin/students", color: "footer-green" },
    { label: "Drivers", path: "/admin/drivers", color: "footer-orange" },
    { label: "Buses", path: "/admin/buses", color: "footer-purple" },
    { label: "Routes", path: "/admin/routes", color: "footer-dark" },
    {
      label: "Notifications",
      path: "/admin/notifications",
      color: "footer-red",
    },
    { label: "Reports", path: "/admin/reports", color: "footer-teal" },
  ];

  let actions = [];

  if (role === "student") {
    actions = studentActions;
  } else if (role === "driver") {
    actions = driverActions;
  } else if (role === "admin") {
    actions = adminActions;
  }

  if (!role || actions.length === 0) {
    return null;
  }

  return (
    <footer className="quick-footer">
      <div className="quick-footer-title">Quick Actions</div>

      <div className="quick-footer-links">
        {actions.map((action) => (
          <a
            key={action.path}
            href={action.path}
            className={`quick-footer-link ${action.color}`}
          >
            {action.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default QuickActionsFooter;
