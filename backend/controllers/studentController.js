const supabase = require("../config/supabaseClient");

// GET all students
const getStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("students")
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

// GET student by ID
const getStudentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Student not found",
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

// POST create student
const createStudent = async (req, res) => {
  try {
    const { name, email, bus, route } = req.body;

    if (!name || !email || !bus || !route) {
      return res.status(400).json({
        message: "Please provide name, email, bus and route",
      });
    }

    const { data, error } = await supabase
      .from("students")
      .insert([{ name, email, bus, route }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(201).json({
      message: "Student created successfully",
      student: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT update student
const updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, email, bus, route } = req.body;

    const { data, error } = await supabase
      .from("students")
      .update({
        name,
        email,
        bus,
        route,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};