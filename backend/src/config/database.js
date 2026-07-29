const mongoose = require("mongoose");

const connectDB = async () => {
    const primaryUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/car-dealership";
    const localUri = "mongodb://127.0.0.1:27017/car-dealership";

    try {
        await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 4000 });
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.warn("Primary MongoDB connection failed, attempting local fallback (mongodb://127.0.0.1:27017/car-dealership)...");
        try {
            await mongoose.connect(localUri);
            console.log("MongoDB Connected locally (mongodb://127.0.0.1:27017/car-dealership)");
        } catch (fallbackError) {
            console.error("MongoDB Connection Failed:", fallbackError);
            process.exit(1);
        }
    }
};

module.exports = connectDB;