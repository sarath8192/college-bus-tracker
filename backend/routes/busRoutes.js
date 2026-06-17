const express = require("express");

const router = express.Router();

const {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
} = require("../controllers/busController");

router.get("/", getBuses);

router.get("/:id", getBusById);

router.post("/", createBus);

router.put("/:id", updateBus);

router.delete("/:id", deleteBus);

module.exports = router;