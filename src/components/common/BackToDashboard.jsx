import { useNavigate } from "react-router-dom";

const BackToDashboard = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    const role = localStorage.getItem("role");

    if (role === "student") {
      navigate("/student/dashboard");
    } else if (role === "driver") {
      navigate("/driver/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <button onClick={handleBack} className="btn btn-dark">
      ⬅ Back to Dashboard
    </button>
  );
};

export default BackToDashboard;
