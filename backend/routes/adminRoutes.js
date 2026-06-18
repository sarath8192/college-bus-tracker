const express = require("express");

const router = express.Router();

const {
  getAdminDashboard,
  getReports,
} = require("../controllers/adminController");

router.get("/dashboard", getAdminDashboard);

router.get("/reports", getReports);

module.exports = router;