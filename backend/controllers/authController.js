const supabase = require("../config/supabaseClient");
const generateToken = require("../utils/generateToken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please provide name, email, password and role",
      });
    }

    if (!["student", "driver", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (findError) {
      return res.status(400).json({
        message: findError.message,
      });
    }

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Insert user into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password,
          role,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const token = generateToken(data.id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};