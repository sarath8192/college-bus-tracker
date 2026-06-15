import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/student/Dashboard";
import LiveTracking from "../pages/student/LiveTracking";
import SeatAvailability from "../pages/student/SeatAvailability";
import Profile from "../pages/student/Profile";
import Notifications from "../pages/student/Notifications";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
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
        path="/student/profile"
        element={<Profile />}
      />

      <Route
  path="/student/notifications"
  element={<Notifications />}
/>
    </Routes>
  );
}

export default AppRoutes;