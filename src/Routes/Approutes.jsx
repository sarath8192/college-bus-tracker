import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

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

// Admin Pages
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/tracking"
        element={
          <ProtectedRoute allowedRole="student">
            <LiveTracking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/seats"
        element={
          <ProtectedRoute allowedRole="student">
            <SeatAvailability />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/notifications"
        element={
          <ProtectedRoute allowedRole="student">
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Driver Routes */}
      <Route
        path="/driver/dashboard"
        element={
          <ProtectedRoute allowedRole="driver">
            <DriverDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/driver/trip"
        element={
          <ProtectedRoute allowedRole="driver">
            <TripManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/driver/seats"
        element={
          <ProtectedRoute allowedRole="driver">
            <SeatManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/driver/emergency"
        element={
          <ProtectedRoute allowedRole="driver">
            <EmergencyAlert />
          </ProtectedRoute>
        }
      />

      <Route
        path="/driver/history"
        element={
          <ProtectedRoute allowedRole="driver">
            <TripHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/driver/profile"
        element={
          <ProtectedRoute allowedRole="driver">
            <DriverProfile />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRole="admin">
            <StudentsManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/drivers"
        element={
          <ProtectedRoute allowedRole="admin">
            <DriversManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/buses"
        element={
          <ProtectedRoute allowedRole="admin">
            <BusesManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/routes"
        element={
          <ProtectedRoute allowedRole="admin">
            <RoutesManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute allowedRole="admin">
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRole="admin">
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminNotifications />
          </ProtectedRoute>
        }
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