import { Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Student Pages
import Dashboard from "../pages/student/Dashboard";
import LiveTracking from "../pages/student/LiveTracking";
import SeatAvailability from "../pages/student/SeatAvailability";
import Notifications from "../pages/student/Notifications";
import Profile from "../pages/student/Profile";

// Driver Pages
import DriverDashboard from "../pages/driver/DriverDashboard";
import TripManagement from "../pages/driver/TripManagement";
import SeatManagement from "../pages/driver/SeatManagement";
import EmergencyAlert from "../pages/driver/EmergencyAlert";
import TripHistory from "../pages/driver/TripHistory";
import DriverProfile from "../pages/driver/Profile";

//Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import StudentsManagement from "../pages/admin/StudentsManagement";
import DriversManagement from "../pages/admin/DriversManagement";
import BusesManagement from "../pages/admin/BusesManagement";
import RoutesManagement from "../pages/admin/RoutesManagement";
import Analytics from "../pages/admin/Analytics";
import Reports from "../pages/admin/Reports";
import AdminNotifications from "../pages/admin/Notifications";

function AppRoutes() {
  return (
    <Routes>

      {/* Authentication Routes */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Student Routes */}

      <Route
        path="/student/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/student/tracking"
        element={<LiveTracking />}
      />

      <Route
        path="/student/seats"
        element={<SeatAvailability />}
      />

      <Route
        path="/student/notifications"
        element={<Notifications />}
      />

      <Route
        path="/student/profile"
        element={<Profile />}
      />

      {/* Driver Routes */}

      <Route
        path="/driver/dashboard"
        element={<DriverDashboard />}
      />

      <Route
        path="/driver/trip"
        element={<TripManagement />}
      />

      <Route
        path="/driver/seats"
        element={<SeatManagement />}
      />

      <Route
        path="/driver/emergency"
        element={<EmergencyAlert />}
      />

      <Route
        path="/driver/history"
        element={<TripHistory />}
      />

      <Route
        path="/driver/profile"
        element={<DriverProfile />}
      />
      <Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/admin/students"
  element={<StudentsManagement />}
/>

<Route
  path="/admin/drivers"
  element={<DriversManagement />}
/>

<Route
  path="/admin/buses"
  element={<BusesManagement />}
/>

<Route
  path="/admin/routes"
  element={<RoutesManagement />}
/>
<Route
  path="/admin/analytics"
  element={<Analytics />}
/>
<Route
  path="/admin/reports"
  element={<Reports />}
/>

<Route
  path="/admin/notifications"
  element={<AdminNotifications />}
/>
      {/* 404 Page */}

      <Route
        path="*"
        element={
          <h1
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            404 - Page Not Found
          </h1>
        }
      />

    </Routes>
  );
}

export default AppRoutes;