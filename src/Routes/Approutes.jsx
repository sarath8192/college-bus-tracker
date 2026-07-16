import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));

// Student Pages
const StudentDashboard = lazy(() => import("../pages/student/Dashboard"));
const LiveTracking = lazy(() => import("../pages/student/LiveTracking"));
const SeatAvailability = lazy(() => import("../pages/student/SeatAvailability"));
const StudentProfile = lazy(() => import("../pages/student/Profile"));
const Notifications = lazy(() => import("../pages/student/Notifications"));

// Driver Pages
const DriverDashboard = lazy(() => import("../pages/driver/DriverDashboard"));
const TripManagement = lazy(() => import("../pages/driver/TripManagement"));
const SeatManagement = lazy(() => import("../pages/driver/SeatManagement"));
const EmergencyAlert = lazy(() => import("../pages/driver/EmergencyAlert"));
const TripHistory = lazy(() => import("../pages/driver/TripHistory"));
const DriverProfile = lazy(() => import("../pages/driver/Profile"));

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminStudents = lazy(() => import("../pages/admin/Students"));
const AdminDrivers = lazy(() => import("../pages/admin/Drivers"));
const AdminBuses = lazy(() => import("../pages/admin/Buses"));
const AdminRoutes = lazy(() => import("../pages/admin/Routes"));
const AdminNotifications = lazy(() => import("../pages/admin/Notifications"));
const AdminReports = lazy(() => import("../pages/admin/Reports"));

// Admin Management Alternative/Orphan Pages (Redesigned for completeness)
const AdminAnalytics = lazy(() => import("../pages/admin/Analytics"));
const AdminBusesManagement = lazy(() => import("../pages/admin/BusesManagement"));
const AdminDriversManagement = lazy(() => import("../pages/admin/DriversManagement"));
const AdminRoutesManagement = lazy(() => import("../pages/admin/RoutesManagement"));
const AdminStudentsManagement = lazy(() => import("../pages/admin/StudentsManagement"));

function PageLoader() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading page...</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student protected routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
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
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentProfile />
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

        {/* Driver protected routes */}
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

        {/* Admin protected routes */}
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
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/drivers"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDrivers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/buses"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminBuses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/routes"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminRoutes />
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
              <AdminReports />
            </ProtectedRoute>
          }
        />

        {/* Admin management optional routes */}
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/buses-management"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminBusesManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/drivers-management"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDriversManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/routes-management"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminRoutesManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students-management"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminStudentsManagement />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={
          <div className="empty-state" style={{ marginTop: "80px" }}>
            <div className="empty-state-icon">⚠️</div>
            <h3>Page Not Found</h3>
            <p>The requested URL was not found on this server.</p>
            <a href="/" className="btn btn-primary" style={{ marginTop: "16px" }}>Go to Login</a>
          </div>
        } />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;