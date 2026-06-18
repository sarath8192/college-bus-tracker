const supabase = require("../config/supabaseClient");

// GET all trips
const getTrips = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .order("id", { ascending: false });

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

// GET active trips
const getActiveTrips = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("status", "active")
      .order("id", { ascending: false });

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

// POST start trip
const startTrip = async (req, res) => {
  try {
    const { bus_id, driver_id, latitude, longitude, speed } = req.body;

    if (!bus_id || !driver_id || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Please provide bus_id, driver_id, latitude and longitude",
      });
    }

    const { data, error } = await supabase
      .from("trips")
      .insert([
        {
          bus_id,
          driver_id,
          latitude,
          longitude,
          speed: speed || 0,
          status: "active",
          start_time: new Date().toISOString(),
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
      message: "Trip started successfully",
      trip: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT update location
const updateTripLocation = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { latitude, longitude, speed } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Please provide latitude and longitude",
      });
    }

    const { data, error } = await supabase
      .from("trips")
      .update({
        latitude,
        longitude,
        speed: speed || 0,
      })
      .eq("id", id)
      .eq("status", "active")
      .select();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Active trip not found",
      });
    }

    res.status(200).json({
      message: "Trip location updated successfully",
      trip: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT end trip
const endTrip = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { data, error } = await supabase
      .from("trips")
      .update({
        status: "completed",
        end_time: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "active")
      .select();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Active trip not found",
      });
    }

    res.status(200).json({
      message: "Trip ended successfully",
      trip: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE trip
const deleteTrip = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getTrips,
  getActiveTrips,
  startTrip,
  updateTripLocation,
  endTrip,
  deleteTrip,
};