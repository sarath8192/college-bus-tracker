import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#1E293B",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Student Menu</h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        <li>
          <Link
            to="/student/dashboard"
          >
            Dashboard
          </Link>
        </li>

        <br />

        <li>
          <Link to="#">
            Live Tracking
          </Link>
        </li>

        <br />

        <li>
          <Link to="#">
            Seat Availability
          </Link>
        </li>

        <br />

        <li>
          <Link to="#">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;