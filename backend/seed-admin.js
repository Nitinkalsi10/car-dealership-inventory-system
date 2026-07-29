const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./src/models/User");

async function seedAdmin() {
  const primaryUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/car-dealership";
  const localUri = "mongodb://127.0.0.1:27017/car-dealership";

  try {
    try {
      await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 4000 });
      console.log("Connected to MongoDB for seeding...");
    } catch {
      console.log("Primary Mongo failed, connecting to local Mongo for seeding...");
      await mongoose.connect(localUri);
    }

    const adminEmail = "admin@dealership.com";
    let admin = await User.findOne({ email: adminEmail });

    const hashedPassword = await bcrypt.hash("adminpassword123", 10);

    if (admin) {
      admin.role = "admin";
      admin.password = hashedPassword;
      await admin.save();
      console.log("Updated existing user to Admin:", adminEmail);
    } else {
      admin = await User.create({
        name: "Dealership Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });
      console.log("Created new Admin user:", adminEmail);
    }

    console.log("Admin credentials seeded successfully: admin@dealership.com / adminpassword123");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
}

seedAdmin();
