const express = require("express");

const router = express.Router();

const {
  getRoutes,
  createRoute,
  deleteRoute,
} = require("../controllers/routeController");

router.get("/", getRoutes);
router.post("/", createRoute);
router.delete("/:id", deleteRoute);

module.exports = router;
