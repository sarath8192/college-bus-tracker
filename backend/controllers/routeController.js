const supabase = require("../config/supabaseClient");

// GET all routes
const getRoutes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("routes")
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

// CREATE route
const createRoute = async (req, res) => {
  try {
    const { route_name, start_point, end_point, stops } = req.body;

    if (!route_name || !start_point || !end_point) {
      return res.status(400).json({
        message: "Please provide route_name, start_point and end_point",
      });
    }

    const { data, error } = await supabase
      .from("routes")
      .insert([
        {
          route_name,
          start_point,
          end_point,
          stops: stops || [],
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
      message: "Route created successfully",
      route: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE route
const deleteRoute = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { error } = await supabase.from("routes").delete().eq("id", id);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Route deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getRoutes,
  createRoute,
  deleteRoute,
};
