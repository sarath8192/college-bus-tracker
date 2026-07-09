const supabase = require("../config/supabaseClient");

// GET all buses
const getBuses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("buses")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET bus by ID
const getBusById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { data, error } = await supabase
      .from("buses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Bus not found",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// POST create bus
const createBus = async (req, res) => {
  try {
    const { bus_number, route, driver, total_seats, occupied_seats, status } =
      req.body;

    if (!bus_number || !route || !driver || !total_seats) {
      return res.status(400).json({
        message: "Please provide bus_number, route, driver and total_seats",
      });
    }

    const { data, error } = await supabase
      .from("buses")
      .insert([
        {
          bus_number,
          route,
          driver,
          total_seats,
          occupied_seats: occupied_seats || 0,
          status: status || "Active",
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(201).json({
      message: "Bus created successfully",
      bus: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT update bus
const updateBus = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { bus_number, route, driver, total_seats, occupied_seats, status } =
      req.body;

    const updateData = {};

    if (bus_number !== undefined) updateData.bus_number = bus_number;
    if (route !== undefined) updateData.route = route;
    if (driver !== undefined) updateData.driver = driver;
    if (total_seats !== undefined) updateData.total_seats = total_seats;
    if (occupied_seats !== undefined)
      updateData.occupied_seats = occupied_seats;
    if (status !== undefined) updateData.status = status;

    const { data, error } = await supabase
      .from("buses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Bus updated successfully",
      bus: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE bus
const deleteBus = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { error } = await supabase.from("buses").delete().eq("id", id);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Bus deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
};
