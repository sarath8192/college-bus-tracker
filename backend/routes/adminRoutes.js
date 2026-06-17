const express = require("express");

const router = express.Router();

const {
  adminDashboard,
  getReports,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  adminDashboard
);

router.get(
  "/reports",
  getReports
);

module.exports = router;