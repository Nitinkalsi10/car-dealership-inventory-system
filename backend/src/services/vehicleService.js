const Vehicle = require("../models/Vehicle");

const createError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

exports.createVehicle = async (data) => {
    return await Vehicle.create(data);
};

exports.getVehicles = async () => {

    return await Vehicle.find().sort({

        createdAt: -1

    });

};

exports.updateVehicle = async (id, data) => {

    return await Vehicle.findByIdAndUpdate(

        id,

        data,

        { new: true }

    );

};

exports.deleteVehicle = async (id) => {

    return await Vehicle.findByIdAndDelete(id);

};

exports.searchVehicles = async (query) => {

    const filter = {};

    if (query.make)
        filter.make = new RegExp(query.make, "i");

    if (query.model)
        filter.model = new RegExp(query.model, "i");

    if (query.category)
        filter.category = new RegExp(query.category, "i");

    if (query.minPrice || query.maxPrice) {

        filter.price = {};

        if (query.minPrice)
            filter.price.$gte = Number(query.minPrice);

        if (query.maxPrice)
            filter.price.$lte = Number(query.maxPrice);

    }

    return await Vehicle.find(filter);

};

exports.purchaseVehicle = async (id) => {

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }

    if (vehicle.quantity <= 0) {
        throw createError("Vehicle Out of Stock", 400);
    }

    vehicle.quantity -= 1;

    await vehicle.save();

    return vehicle;
};

exports.restockVehicle = async (id, quantity) => {

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {

        throw new Error("Vehicle not found");

    }

    vehicle.quantity += quantity;

    await vehicle.save();

    return vehicle;

};