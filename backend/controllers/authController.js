const generateToken = require("../utils/generateToken");

const users = [];

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const user = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(user);

  res.status(201).json({
    message: "User Registered Successfully",
    user,
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
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