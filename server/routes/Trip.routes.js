const router = require("express").Router();

const TripCtrl = require("../controllers/Trip.ctrl"); // Adjust the path as needed
const auth = require("../middleware/auth");
// Routes
router.get("/", auth, TripCtrl.getTrips);
router.post("/add", auth, TripCtrl.addTrip);
router.get("/:id", auth, TripCtrl.getTripById);
router.put("/:id", auth, TripCtrl.updateTrip);
router.delete("/:id", auth, TripCtrl.deleteTrip);

module.exports = router;