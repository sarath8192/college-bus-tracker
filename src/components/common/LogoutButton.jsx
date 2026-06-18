import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 14px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#dc2626",
        color: "#fff",
        cursor: "pointer",
        marginTop: "20px",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;