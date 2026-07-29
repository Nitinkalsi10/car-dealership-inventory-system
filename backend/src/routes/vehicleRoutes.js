const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const vehicleController = require("../controllers/vehicleController");
const { vehicleValidation, restockValidation } = require("../validators/vehicleValidator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: errors.array()
        });
    }

    next();
};

router.get("/", auth, vehicleController.getVehicles);

router.get("/search", auth, vehicleController.searchVehicles);

router.post("/", auth, vehicleValidation, validateRequest, vehicleController.createVehicle);

router.put("/:id", auth, vehicleController.updateVehicle);

router.delete("/:id", auth, admin, vehicleController.deleteVehicle);

router.post("/:id/purchase", auth, vehicleController.purchaseVehicle);

router.post("/:id/restock", auth, admin, restockValidation, validateRequest, vehicleController.restockVehicle);

module.exports = router;