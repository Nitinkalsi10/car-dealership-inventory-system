const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

describe("Inventory API", () => {

    let token;
    let adminToken;
    let vehicleId;
    let emptyVehicleId;

    beforeEach(async () => {
        await User.deleteMany({});
        await Vehicle.deleteMany({});

        const userEmail = `user${Date.now()}@test.com`;
        const adminEmail = `admin${Date.now()}@test.com`;

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: userEmail,
                password: "123456"
            });

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin User",
                email: adminEmail,
                password: "123456"
            });

        await User.findOneAndUpdate(
            { email: userEmail },
            { role: "user" },
            { new: true }
        );

        await User.findOneAndUpdate(
            { email: adminEmail },
            { role: "admin" },
            { new: true }
        );

        const userLoginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: userEmail,
                password: "123456"
            });

        const adminLoginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: adminEmail,
                password: "123456"
            });

        token = userLoginResponse.body.token;
        adminToken = adminLoginResponse.body.token;

        const vehicleResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 1
            });

        vehicleId = vehicleResponse.body.data._id;

        const emptyVehicleResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Honda",
                model: "Civic",
                category: "Sedan",
                price: 22000,
                quantity: 0
            });

        emptyVehicleId = emptyVehicleResponse.body.data._id;
    });

    it("should purchase a vehicle", async () => {

        const response = await request(app)

            .post(`/api/vehicles/${vehicleId}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

    });

    it("should not purchase an out-of-stock vehicle", async () => {

        const response = await request(app)

            .post(`/api/vehicles/${emptyVehicleId}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(400);

    });

    it("should restock vehicle", async () => {

        const response = await request(app)

            .post(`/api/vehicles/${vehicleId}/restock`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({

                quantity: 10

            });

        expect(response.statusCode).toBe(200);

    });

});