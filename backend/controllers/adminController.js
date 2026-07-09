const supabase = require("../config/supabaseClient");

// GET admin dashboard stats
const getAdminDashboard = async (req, res) => {
  try {
    const { data: students, error: studentsError } = await supabase
      .from("students")
      .select("*");

    const { data: drivers, error: driversError } = await supabase
      .from("drivers")
      .select("*");

    const { data: buses, error: busesError } = await supabase
      .from("buses")
      .select("*");

    const { data: notifications, error: notificationsError } = await supabase
      .from("notifications")
      .select("*");

    const { data: trips, error: tripsError } = await supabase
      .from("trips")
      .select("*");

    if (
      studentsError ||
      driversError ||
      busesError ||
      notificationsError ||
      tripsError
    ) {
      return res.status(400).json({
        message: "Error fetching dashboard data",
      });
    }

    const activeBuses = buses.filter((bus) => bus.status === "Active").length;

    const totalSeats = buses.reduce(
      (sum, bus) => sum + Number(bus.total_seats || 0),
      0,
    );

    const occupiedSeats = buses.reduce(
      (sum, bus) => sum + Number(bus.occupied_seats || 0),
      0,
    );

    const activeTrips = trips.filter((trip) => trip.status === "active").length;

    const completedTrips = trips.filter(
      (trip) => trip.status === "completed",
    ).length;

    res.status(200).json({
      totalStudents: students.length,
      totalDrivers: drivers.length,
      totalBuses: buses.length,
      activeBuses,
      totalSeats,
      occupiedSeats,
      availableSeats: totalSeats - occupiedSeats,
      totalNotifications: notifications.length,
      activeTrips,
      completedTrips,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET reports
const getReports = async (req, res) => {
  try {
    const { data: students } = await supabase.from("students").select("*");
    const { data: drivers } = await supabase.from("drivers").select("*");
    const { data: buses } = await supabase.from("buses").select("*");
    const { data: trips } = await supabase.from("trips").select("*");

    const totalSeats = buses.reduce(
      (sum, bus) => sum + Number(bus.total_seats || 0),
      0,
    );

    const occupiedSeats = buses.reduce(
      (sum, bus) => sum + Number(bus.occupied_seats || 0),
      0,
    );

    res.status(200).json({
      totalStudents: students.length,
      totalDrivers: drivers.length,
      totalBuses: buses.length,
      totalTrips: trips.length,
      totalSeats,
      occupiedSeats,
      availableSeats: totalSeats - occupiedSeats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
  getReports,
};
