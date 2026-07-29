const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const vehicleController = require("../controllers/vehicleController");

router.get("/", auth, vehicleController.getVehicles);

router.get("/search", auth, vehicleController.searchVehicles);

router.post("/", auth, vehicleController.createVehicle);

router.put("/:id", auth, vehicleController.updateVehicle);

router.delete("/:id", auth, admin, vehicleController.deleteVehicle);

router.post("/:id/purchase", auth, vehicleController.purchaseVehicle);

router.post("/:id/restock", auth, admin, vehicleController.restockVehicle);

module.exports = router;