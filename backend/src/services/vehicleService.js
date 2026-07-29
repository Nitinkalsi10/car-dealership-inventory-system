const Vehicle = require("../models/Vehicle");

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