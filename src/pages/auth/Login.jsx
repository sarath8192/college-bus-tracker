import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import CampusRideLogo from "../../components/common/CampusRideLogo";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
        setError("Invalid user role");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (email, password) => {
    setFormData({ email, password });
    setError("");
  };

  return (
    <div className="auth-split-wrapper">
      {/* Brand Illustration Panel (Left) */}
      <div className="auth-brand-side">
        <div className="auth-brand-header">
          <CampusRideLogo width="40px" height="40px" textColor="#ffffff" />
        </div>

        <div className="auth-brand-illustration">
          <div className="illustration-svg-box">
            {/* Custom SVG Transit Illustration */}
            <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <path d="M 0,40 H 400 M 0,80 H 400 M 0,120 H 400 M 0,160 H 400 M 0,200 H 400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <path d="M 40,0 V 240 M 80,0 V 240 M 120,0 V 240 M 160,0 V 240 M 200,0 V 240 M 240,0 V 240 M 280,0 V 240 M 320,0 V 240 M 360,0 V 240" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <path d="M 50,200 C 120,200 120,60 220,60 C 320,60 300,180 350,180" stroke="url(#routeGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="1 1" />
              <circle cx="50" cy="200" r="10" fill="#10b981" stroke="rgba(16,185,129,0.3)" strokeWidth="8" />
              <circle cx="220" cy="60" r="10" fill="#f59e0b" stroke="rgba(245,158,11,0.3)" strokeWidth="8" />
              <circle cx="350" cy="180" r="10" fill="#2563eb" stroke="rgba(37,99,235,0.3)" strokeWidth="8" />
              <g transform="translate(180, 75)">
                <rect width="60" height="34" rx="8" fill="#2563eb" />
                <rect x="5" y="5" width="20" height="12" rx="2" fill="#e2e8f0" />
                <rect x="30" y="5" width="25" height="12" rx="2" fill="#e2e8f0" />
                <circle cx="15" cy="34" r="6" fill="#0f172a" />
                <circle cx="45" cy="34" r="6" fill="#0f172a" />
              </g>
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes dash {
                to { stroke-dashoffset: -1000; }
              }
              @keyframes float {
                0%, 100% { transform: translateY(75px) translateX(170px); }
                50% { transform: translateY(71px) translateX(170px); }
              }
            `}} />
          </div>
          <h2>Live Transit Telemetry</h2>
          <p>
            Track routes in real-time, view seat capacity alerts, and review direct driver feedback from your mobile browser or desktop.
          </p>
        </div>

        <div className="auth-brand-footer">
          © {new Date().getFullYear()} CampusRide. Placement-Ready Design.
        </div>
      </div>

      {/* Login Credentials Form Side (Right) */}
      <div className="auth-form-side">
        <div className="auth-form-card">
          <div style={{ display: "none" }} className="mobile-logo-header">
            <CampusRideLogo width="36px" height="36px" textColor="var(--neutral-dark)" />
          </div>
          
          <h2 className="auth-form-title">Welcome to CampusRide</h2>
          <p className="auth-form-subtitle">Enter your credentials to access your transit tracking console</p>

          {error && (
            <div className="alert-box danger">
              <svg style={{ width: "20px", height: "20px", flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-password-toggle"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox"
                />
                Remember me
              </label>
              
              <Link to="/forgot-password" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none", fontSize: "14px" }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px" }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }}></span>
                  <span style={{ marginLeft: "8px" }}>Authenticating...</span>
                </>
              ) : (
                "Sign In to Console"
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--neutral-muted)" }}>
            Need a student or driver profile?{" "}
            <Link to="/register" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>
              Create Account
            </Link>
          </p>

          {/* Quick Demo Fillers */}
          <div className="demo-box" style={{ marginTop: "32px", border: "1px dashed var(--neutral-border)", borderRadius: "8px", padding: "16px" }}>
            <p style={{ fontWeight: "700", marginBottom: "10px", color: "var(--neutral-dark)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Demo Profile Fillers
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                type="button"
                onClick={() => handleDemoFill("student@gmail.com", "123456")}
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "space-between", padding: "8px 12px", fontSize: "13px", height: "36px" }}
              >
                <span>🎓 Student Demo</span>
                <code style={{ fontSize: "11px", color: "var(--neutral-muted)" }}>student@gmail.com</code>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill("driver@gmail.com", "123456")}
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "space-between", padding: "8px 12px", fontSize: "13px", height: "36px" }}
              >
                <span>👨‍✈️ Driver Demo</span>
                <code style={{ fontSize: "11px", color: "var(--neutral-muted)" }}>driver@gmail.com</code>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill("admin@gmail.com", "123456")}
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "space-between", padding: "8px 12px", fontSize: "13px", height: "36px" }}
              >
                <span>🛡️ Admin Demo</span>
                <code style={{ fontSize: "11px", color: "var(--neutral-muted)" }}>admin@gmail.com</code>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .mobile-logo-header {
            display: flex !important;
            justify-content: center;
            margin-bottom: 24px;
          }
        }
      `}} />
    </div>
  );
};

export default Login;
