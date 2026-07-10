import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

const StudentDashboard = lazy(() => import("../pages/student/Dashboard"));
const LiveTracking = lazy(() => import("../pages/student/LiveTracking"));
const SeatAvailability = lazy(() => import("../pages/student/SeatAvailability"));
const StudentProfile = lazy(() => import("../pages/student/Profile"));
const Notifications = lazy(() => import("../pages/student/Notifications"));

const DriverDashboard = lazy(() => import("../pages/driver/DriverDashboard"));
const TripManagement = lazy(() => import("../pages/driver/TripManagement"));
const SeatManagement = lazy(() => import("../pages/driver/SeatManagement"));
const EmergencyAlert = lazy(() => import("../pages/driver/EmergencyAlert"));
const TripHistory = lazy(() => import("../pages/driver/TripHistory"));
const DriverProfile = lazy(() => import("../pages/driver/Profile"));

function PageLoader() {
  return (
    <div style={{ padding: "30px", textAlign: "center", fontSize: "18px" }}>
      Loading page...
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/tracking" element={<LiveTracking />} />
        <Route path="/student/seats" element={<SeatAvailability />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/notifications" element={<Notifications />} />

        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/trip" element={<TripManagement />} />
        <Route path="/driver/seats" element={<SeatManagement />} />
        <Route path="/driver/emergency" element={<EmergencyAlert />} />
        <Route path="/driver/history" element={<TripHistory />} />
        <Route path="/driver/profile" element={<DriverProfile />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;