const vehicleService = require("../services/vehicleService");

exports.createVehicle = async (req, res, next) => {

    try {

        const vehicle = await vehicleService.createVehicle(req.body);

        res.status(201).json({

            success: true,

            message: "Vehicle Added Successfully",

            data: vehicle

        });

    } catch (error) {

        next(error);

    }

};

exports.getVehicles = async (req, res, next) => {

    try {

        const vehicles = await vehicleService.getVehicles();

        res.json({

            success: true,

            data: vehicles

        });

    } catch (error) {

        next(error);

    }

};

exports.updateVehicle = async (req, res, next) => {

    try {

        const vehicle = await vehicleService.updateVehicle(

            req.params.id,

            req.body

        );

        if (!vehicle) {

            return res.status(404).json({

                success: false,

                message: "Vehicle not found"

            });

        }

        res.json({

            success: true,

            message: "Vehicle Updated",

            data: vehicle

        });

    } catch (error) {

        next(error);

    }

};

exports.deleteVehicle = async (req, res, next) => {

    try {

        const vehicle = await vehicleService.deleteVehicle(req.params.id);

        if (!vehicle) {

            return res.status(404).json({

                success: false,

                message: "Vehicle not found"

            });

        }

        res.json({

            success: true,

            message: "Vehicle Deleted"

        });

    } catch (error) {

        next(error);

    }

};

exports.searchVehicles = async (req, res, next) => {

    try {

        const vehicles = await vehicleService.searchVehicles(req.query);

        res.json({

            success: true,

            data: vehicles

        });

    } catch (error) {

        next(error);

    }

};

exports.purchaseVehicle = async (req, res) => { };

exports.restockVehicle = async (req, res) => { };