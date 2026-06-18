const supabase = require("../config/supabaseClient");

// GET all notifications
const getNotifications = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
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

// GET notification by ID
const getNotificationById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Notification not found",
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

// POST create notification
const createNotification = async (req, res) => {
  try {
    const { title, message, type, role } = req.body;

    if (!title || !message || !type) {
      return res.status(400).json({
        message: "Please provide title, message and type",
      });
    }

    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          title,
          message,
          type,
          role: role || "all",
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
      message: "Notification created successfully",
      notification: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT update notification
const updateNotification = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { title, message, type, role } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (message !== undefined) updateData.message = message;
    if (type !== undefined) updateData.type = type;
    if (role !== undefined) updateData.role = role;

    const { data, error } = await supabase
      .from("notifications")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification updated successfully",
      notification: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE notification
const deleteNotification = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};