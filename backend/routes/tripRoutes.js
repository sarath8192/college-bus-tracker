const express = require("express");

const router = express.Router();

const {
  getTrips,
  getActiveTrips,
  startTrip,
  updateTripLocation,
  endTrip,
  deleteTrip,
} = require("../controllers/tripController");

router.get("/", getTrips);

router.get("/active", getActiveTrips);

router.post("/start", startTrip);

router.put("/:id/location", updateTripLocation);

router.put("/:id/end", endTrip);

router.delete("/:id", deleteTrip);

module.exports = router;