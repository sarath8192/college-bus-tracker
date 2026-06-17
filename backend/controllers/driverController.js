let drivers = [
  {
    id: 1,
    name: "Ramesh",
    email: "ramesh@gmail.com",
    phone: "9876543210",
    bus: "Bus-01",
    route: "Vijayawada",
    status: "Active",
  },
  {
    id: 2,
    name: "Suresh",
    email: "suresh@gmail.com",
    phone: "9876543211",
    bus: "Bus-02",
    route: "Guntur",
    status: "Active",
  },
];

// GET all drivers
const getDrivers = (req, res) => {
  res.status(200).json(drivers);
};

// GET driver by ID
const getDriverById = (req, res) => {
  const id = Number(req.params.id);

  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    return res.status(404).json({
      message: "Driver not found",
    });
  }

  res.status(200).json(driver);
};

// POST create driver
const createDriver = (req, res) => {
  const { name, email, phone, bus, route, status } = req.body;

  if (!name || !email || !phone || !bus || !route) {
    return res.status(400).json({
      message: "Please provide name, email, phone, bus and route",
    });
  }

  const newDriver = {
    id: drivers.length + 1,
    name,
    email,
    phone,
    bus,
    route,
    status: status || "Active",
  };

  drivers.push(newDriver);

  res.status(201).json({
    message: "Driver created successfully",
    driver: newDriver,
  });
};

// PUT update driver
const updateDriver = (req, res) => {
  const id = Number(req.params.id);

  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    return res.status(404).json({
      message: "Driver not found",
    });
  }

  const { name, email, phone, bus, route, status } = req.body;

  driver.name = name || driver.name;
  driver.email = email || driver.email;
  driver.phone = phone || driver.phone;
  driver.bus = bus || driver.bus;
  driver.route = route || driver.route;
  driver.status = status || driver.status;

  res.status(200).json({
    message: "Driver updated successfully",
    driver,
  });
};

// DELETE driver
const deleteDriver = (req, res) => {
  const id = Number(req.params.id);

  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    return res.status(404).json({
      message: "Driver not found",
    });
  }

  drivers = drivers.filter((d) => d.id !== id);

  res.status(200).json({
    message: "Driver deleted successfully",
  });
};

module.exports = {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};