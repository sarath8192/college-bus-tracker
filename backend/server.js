console.log("SERVER FILE LOADED");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const busRoutes = require("./routes/busRoutes");
const studentRoutes = require("./routes/studentRoutes");
const driverRoutes = require("./routes/driverRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
//const connectDB =
  //require("./config/db");

//connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "College Bus Tracker Backend Running",
  });
});
app.use(
  "/api/buses",
  busRoutes
);

app.use(
  "/api/students",
  studentRoutes
);
app.use(
  "/api/drivers",
  driverRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);
app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/protected",
  protectedRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});