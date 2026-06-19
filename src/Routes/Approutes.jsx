import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import ProtectedRoute from "../components/common/ProtectedRoute";
import SeatAvailability from "../pages/student/SeatAvailability";

// Student pages
import StudentDashboard from "../pages/student/Dashboard";
import LiveTracking from "../pages/student/LiveTracking";
import StudentNotifications from "../pages/student/Notifications";
import StudentProfile from "../pages/student/Profile";

// Driver pages
import DriverDashboard from "../pages/driver/DriverDashboard";
import TripManagement from "../pages/driver/TripManagement";
import SeatUpdate from "../pages/driver/SeatUpdate";
import EmergencyAlert from "../pages/driver/EmergencyAlert";
import TripHistory from "../pages/driver/TripHistory";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import Drivers from "../pages/admin/Drivers";
import Buses from "../pages/admin/Buses";
import RoutesPage from "../pages/admin/Routes";
import AdminNotifications from "../pages/admin/Notifications";
import Reports from "../pages/admin/Reports";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
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
        path="/student/tracking"
        element={
          <ProtectedRoute allowedRole="student">
            <LiveTracking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/notifications"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentNotifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
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
            <SeatUpdate />
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
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/drivers"
        element={
          <ProtectedRoute allowedRole="admin">
            <Drivers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/buses"
        element={
          <ProtectedRoute allowedRole="admin">
            <Buses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/routes"
        element={
          <ProtectedRoute allowedRole="admin">
            <RoutesPage />
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

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRole="admin">
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;