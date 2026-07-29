const request = require("supertest");
const app = require("../app");
const User = require("../models/User");


describe("Authentication", () => {
    it("should register a new user", async () => {
        
        const res = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Nitin",
            email: `nitin${Date.now()}@test.com`,
            password: "123456"
        });
        
        expect(res.statusCode).toBe(201);
    });
});

afterEach(async () => {
    await User.deleteMany({});
});