const supabase = require("../config/supabaseClient");

// GET all drivers
const getDrivers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("drivers")
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

// GET driver by ID
const getDriverById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Driver not found",
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

// POST create driver
const createDriver = async (req, res) => {
  try {
    const { name, email, phone, bus, route, status } = req.body;

    if (!name || !email || !phone || !bus || !route) {
      return res.status(400).json({
        message: "Please provide name, email, phone, bus and route",
      });
    }

    const { data, error } = await supabase
      .from("drivers")
      .insert([
        {
          name,
          email,
          phone,
          bus,
          route,
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
      message: "Driver created successfully",
      driver: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT update driver
const updateDriver = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, email, phone, bus, route, status } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (bus !== undefined) updateData.bus = bus;
    if (route !== undefined) updateData.route = route;
    if (status !== undefined) updateData.status = status;

    const { data, error } = await supabase
      .from("drivers")
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
      message: "Driver updated successfully",
      driver: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE driver
const deleteDriver = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { error } = await supabase.from("drivers").delete().eq("id", id);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Driver deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};
