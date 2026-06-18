let buses = [
  {
    id: 1,
    busNumber: "VIT-01",
    route: "Vijayawada",
    driver: "Ramesh",
    totalSeats: 40,
    occupiedSeats: 20,
    status: "Active",
  },
  {
    id: 2,
    busNumber: "VIT-02",
    route: "Guntur",
    driver: "Suresh",
    totalSeats: 40,
    occupiedSeats: 15,
    status: "Active",
  },
];

const getBuses = (req, res) => {
  res.status(200).json(buses);
};

const getBusById = (req, res) => {
  const id = Number(req.params.id);

  const bus = buses.find((b) => b.id === id);

  if (!bus) {
    return res.status(404).json({
      message: "Bus not found",
    });
  }

  res.status(200).json(bus);
};

const createBus = (req, res) => {
  const {
    busNumber,
    route,
    driver,
    totalSeats,
    occupiedSeats,
    status,
  } = req.body;

  if (!busNumber || !route || !driver || !totalSeats) {
    return res.status(400).json({
      message: "Please provide busNumber, route, driver and totalSeats",
    });
  }

  const newBus = {
    id: buses.length + 1,
    busNumber,
    route,
    driver,
    totalSeats,
    occupiedSeats: occupiedSeats || 0,
    status: status || "Active",
  };

  buses.push(newBus);

  res.status(201).json({
    message: "Bus created successfully",
    bus: newBus,
  });
};

const updateBus = (req, res) => {
  const id = Number(req.params.id);

  const bus = buses.find((b) => b.id === id);

  if (!bus) {
    return res.status(404).json({
      message: "Bus not found",
    });
  }

  const {
    busNumber,
    route,
    driver,
    totalSeats,
    occupiedSeats,
    status,
  } = req.body;

  bus.busNumber = busNumber || bus.busNumber;
  bus.route = route || bus.route;
  bus.driver = driver || bus.driver;
  bus.totalSeats = totalSeats || bus.totalSeats;
  bus.occupiedSeats =
    occupiedSeats !== undefined ? occupiedSeats : bus.occupiedSeats;
  bus.status = status || bus.status;

  res.status(200).json({
    message: "Bus updated successfully",
    bus,
  });
};

const deleteBus = (req, res) => {
  const id = Number(req.params.id);

  const bus = buses.find((b) => b.id === id);

  if (!bus) {
    return res.status(404).json({
      message: "Bus not found",
    });
  }

  buses = buses.filter((b) => b.id !== id);

  res.status(200).json({
    message: "Bus deleted successfully",
  });
};

module.exports = {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
};