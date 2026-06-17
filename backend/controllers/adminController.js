const adminDashboard = (req, res) => {
  res.status(200).json({
    totalStudents: 250,
    totalDrivers: 20,
    totalBuses: 15,
    activeTrips: 10,
  });
};

const getReports = (req, res) => {
  res.status(200).json({
    reportType: "Monthly",
    totalTrips: 450,
    totalPassengers: 7800,
  });
};

module.exports = {
  adminDashboard,
  getReports,
};