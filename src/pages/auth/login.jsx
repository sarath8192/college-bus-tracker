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
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1 }}>
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

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  loginButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  registerButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#16a34a",
    color: "#fff",
    textDecoration: "none",
    textAlign: "center",
  },
  forgotText: {
    textAlign: "center",
    marginTop: "12px",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  demoBox: {
    marginTop: "20px",
    padding: "10px",
    background: "#f1f5f9",
    borderRadius: "8px",
    fontSize: "13px",
  },
};

export default Login;