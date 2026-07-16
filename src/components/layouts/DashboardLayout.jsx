import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import CampusRideLogo from "../common/CampusRideLogo";
import { getNotifications } from "../../api/notificationApi";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const role = localStorage.getItem("role") || "student";
  const userStr = localStorage.getItem("user");
  let user = { name: "User", email: "", role: role };
  
  try {
    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f8fafc";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f8fafc";
      document.body.style.color = "#0f172a";
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Close sidebar on path change (mobile drawer helper)
  useEffect(() => {
    setIsSidebarOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  // Fetch notifications for the header badge
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const data = await getNotifications();
        // Filter notifications by role or general
        const filtered = data.filter((item) => item.role === role || item.role === "all" || role === "admin");
        setNotifications(filtered);
      } catch (err) {
        console.error("Error loading header notifications:", err);
      }
    };
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 15000);
    return () => clearInterval(interval);
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  const getSidebarLinks = () => {
    if (role === "admin") {
      return [
        {
          label: "Dashboard",
          path: "/admin/dashboard",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
          ),
        },
        {
          label: "Manage Students",
          path: "/admin/students",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          ),
        },
        {
          label: "Manage Drivers",
          path: "/admin/drivers",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
        {
          label: "Manage Buses",
          path: "/admin/buses",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ),
        },
        {
          label: "Manage Routes",
          path: "/admin/routes",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          ),
        },
        {
          label: "Notifications",
          path: "/admin/notifications",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          ),
        },
        {
          label: "Reports & Analytics",
          path: "/admin/reports",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
      ];
    } else if (role === "driver") {
      return [
        {
          label: "Dashboard",
          path: "/driver/dashboard",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
          ),
        },
        {
          label: "Manage Trip",
          path: "/driver/trip",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        },
        {
          label: "Seats Capacity",
          path: "/driver/seats",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
        },
        {
          label: "Report Emergency",
          path: "/driver/emergency",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        },
        {
          label: "Trip History",
          path: "/driver/history",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          label: "Profile",
          path: "/driver/profile",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
        },
      ];
    } else {
      // student
      return [
        {
          label: "Dashboard",
          path: "/student/dashboard",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
          ),
        },
        {
          label: "Live Tracking",
          path: "/student/tracking",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
        },
        {
          label: "Seat Availability",
          path: "/student/seats",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
        },
        {
          label: "Notifications",
          path: "/student/notifications",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          ),
        },
        {
          label: "Profile Settings",
          path: "/student/profile",
          icon: (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
        },
      ];
    }
  };

  const activeLinks = getSidebarLinks();

  const getPageTitle = () => {
    const active = activeLinks.find((l) => l.path === location.pathname);
    return active ? active.label : "CampusRide";
  };

  const getInitials = (name) => {
    if (!name) return "CR";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className={`layout-wrapper ${isCollapsed ? "collapsed-sidebar" : ""}`}>
      {/* Collapsible Sidebar */}
      <aside className={`app-sidebar ${isSidebarOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        <Link to={`/${role}/dashboard`} className="sidebar-logo">
          <CampusRideLogo width="32px" height="32px" showText={!isCollapsed} />
        </Link>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            {activeLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active" : ""}`
                  }
                  end
                  title={isCollapsed ? link.label : ""}
                >
                  {link.icon}
                  <span className="sidebar-link-text" style={{ display: isCollapsed ? "none" : "inline" }}>
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className="btn btn-danger sidebar-logout-btn"
            title="Log Out"
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="layout-content">
        <header className="app-navbar">
          <div className="navbar-left">
            {/* Desktop Collapse Trigger */}
            <button
              className="menu-toggle"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Collapse Sidebar"
              style={{ display: "none" }} // Show via css on media query
            >
              <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              className="menu-toggle mobile-only-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle Mobile Menu"
            >
              <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="navbar-title">{getPageTitle()}</span>
          </div>

          <div className="navbar-right">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="notification-bell-btn"
              title="Toggle Theme"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {isDarkMode ? (
                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.727l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="notification-bell-container">
              <button
                className="notification-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="View announcements"
              >
                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-dropdown-header">
                    <h4>Announcements</h4>
                    <span className="badge badge-active">{notifications.length} alerts</span>
                  </div>
                  <div className="notification-dropdown-list">
                    {notifications.length === 0 ? (
                      <div style={{ padding: "20px", textAlign: "center", color: "var(--neutral-muted)", fontSize: "13px" }}>
                        No announcements active
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className="notification-dropdown-item">
                          <span style={{ fontSize: "18px" }}>📢</span>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "13px", fontWeight: "600" }}>{notif.title}</span>
                            <p style={{ fontSize: "12px", color: "var(--neutral-muted)", marginTop: "2px", lineBreak: "anywhere" }}>
                              {notif.message.slice(0, 80)}{notif.message.length > 80 ? "..." : ""}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="notification-dropdown-footer">
                    <Link to={`/${role}/notifications`} onClick={() => setShowNotifications(false)}>
                      View All Alerts
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Widget */}
            <div className="user-profile-badge" onClick={() => navigate(`/${role}/profile`)}>
              <div className="user-avatar">{getInitials(user.name)}</div>
              <div className="user-info" style={{ display: "none" }}> {/* Managed by CSS media query in layout */}
                <span className="user-name">{user.name}</span>
                <span className="user-role">{role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic styling for responsive toggle displays */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1025px) {
            .menu-toggle { display: flex !important; }
            .mobile-only-toggle { display: none !important; }
            .user-info { display: flex !important; }
          }
          /* Custom Dark Mode override variables */
          .dark {
            --white: #1e293b;
            --neutral-light: #0f172a;
            --neutral-dark: #f8fafc;
            --neutral-border: #334155;
            --neutral-muted: #94a3b8;
          }
          .dark .app-navbar {
            background-color: rgba(30, 41, 59, 0.85);
          }
          .dark .sidebar-logo {
            background-color: rgba(0, 0, 0, 0.3);
          }
          .dark .notification-dropdown {
            background-color: #1e293b;
            border-color: #334155;
          }
          .dark .notification-dropdown-header,
          .dark .notification-dropdown-footer {
            border-color: #334155;
            background-color: #0f172a;
          }
          .dark .modern-table th {
            background-color: #0f172a;
          }
          .dark .bus-cabin-frame {
            background-color: #0f172a;
          }
          .dark .bus-seat.available {
            background-color: #064e3b;
            border-color: #059669;
            color: #a7f3d0;
          }
          .dark .bus-seat.occupied {
            background-color: #1e293b;
            border-color: #334155;
            color: #64748b;
          }
          .dark .bus-seat.reserved {
            background-color: #78350f;
            border-color: #d97706;
            color: #fde68a;
          }
          .dark .legend-color.available { background-color: #064e3b; border-color: #059669; }
          .dark .legend-color.occupied { background-color: #1e293b; border-color: #334155; }
          .dark .legend-color.reserved { background-color: #78350f; border-color: #d97706; }
        `}} />

        <main style={{ flex: 1, position: "relative" }} className="fade-in-up">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 99 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout;
