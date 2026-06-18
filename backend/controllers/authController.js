const generateToken = require("../utils/generateToken");

const users = [];

const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "Please provide name, email, password and role",
    });
  }

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    password,
    role,
  };

  users.push(user);

  const token = generateToken(user.id);

  res.status(201).json({
    message: "User Registered Successfully",
    token,
    user,
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

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
};

module.exports = {
  registerUser,
  loginUser,
};