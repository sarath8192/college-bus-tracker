import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";
import CampusRideLogo from "../../components/common/CampusRideLogo";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await forgotPassword(formData);

      alert("Password updated successfully");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed. Check your email.");
    } finally {
      setLoading(false);
    }
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
            <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <path d="M 0,40 H 400 M 0,80 H 400 M 0,120 H 400 M 0,160 H 400 M 0,200 H 400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <path d="M 40,0 V 240 M 80,0 V 240 M 120,0 V 240 M 160,0 V 240 M 200,0 V 240 M 240,0 V 240 M 280,0 V 240 M 320,0 V 240 M 360,0 V 240" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <circle cx="200" cy="120" r="60" fill="none" stroke="var(--primary)" strokeWidth="4" />
              <circle cx="200" cy="120" r="40" fill="none" stroke="#10b981" strokeWidth="4" />
              <g transform="translate(180, 100)">
                <text x="0" y="30" fill="#ffffff" fontSize="32" fontWeight="bold">🔑</text>
              </g>
            </svg>
          </div>
          <h2>Secured Credential Recovery</h2>
          <p>
            Update your account password using your registered institutional email address.
          </p>
        </div>

        <div className="auth-brand-footer">
          © {new Date().getFullYear()} CampusRide. Placement-Ready Design.
        </div>
      </div>

      {/* Form Section Side (Right) */}
      <div className="auth-form-side">
        <div className="auth-form-card">
          <div style={{ display: "none" }} className="mobile-logo-header">
            <CampusRideLogo width="36px" height="36px" textColor="var(--neutral-dark)" />
          </div>

          <h2 className="auth-form-title">Reset Password</h2>
          <p className="auth-form-subtitle">Enter your registered email and choose a new password</p>

          {error && (
            <div className="alert-box danger">
              <svg style={{ width: "20px", height: "20px", flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleResetPassword}>
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
              <label htmlFor="newPassword">New Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Choose new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="input"
                  required
                  autoComplete="new-password"
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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-danger"
              style={{ width: "100%", marginTop: "16px", padding: "12px" }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }}></span>
                  <span style={{ marginLeft: "8px" }}>Updating password...</span>
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--neutral-muted)" }}>
            Remember password?{" "}
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>
              Sign In
            </Link>
          </p>
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

export default ForgotPassword;
