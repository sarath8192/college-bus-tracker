import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "student") {
        navigate("/student/dashboard");
      } else if (data.user.role === "driver") {
        navigate("/driver/dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid role");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-card">
        <h2 className="form-title">College Bus Tracker Login</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="button-row">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/register" className="btn btn-success" style={{ flex: 1 }}>
            Register
          </Link>
        </div>

        <p className="link-text">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <div className="demo-box">
          <p>
            <b>Demo Login:</b>
          </p>
          <p>Student: student@gmail.com / 123456</p>
          <p>Driver: driver@gmail.com / 123456</p>
          <p>Admin: admin@gmail.com / 123456</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
