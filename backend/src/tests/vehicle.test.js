const request = require("supertest");
const app = require("../app");

describe("Vehicle API", () => {
    
    let token;
    
    beforeAll(async () => {
        const email = `test${Date.now()}@test.com`;
        
        // Register user
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email,
                password: "123456"
            });

        // Login user
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "123456"
            });

        token = loginResponse.body.token;
    });

    it("should create a vehicle", async () => {

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 45000,
                quantity: 5
            });

        expect(response.statusCode).toBe(201);
    });

});