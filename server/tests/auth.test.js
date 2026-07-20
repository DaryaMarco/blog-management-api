const request = require("supertest");
const app = require("../app");


describe("Auth API", () => {

    it("should return 404 for unknown route", async () => {

        const res = await request(app)
            .get("/api/unknown");

        expect(res.statusCode).toBe(404);

    });


    it("should register a new user", async () => {

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@test.com",
                password: "123456"
            });


        expect(res.statusCode).toBe(201);

        expect(res.body.message)
            .toBe("User registered successfully");


        expect(res.body.user.email)
            .toBe("test@test.com");

    });

});


// LOGIN_TEST
it("should login user and return token", async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Login User",
            email: "login@test.com",
            password: "123456"
        });


    const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: "login@test.com",
            password: "123456"
        });


    expect(res.statusCode).toBe(200);

    expect(res.body.message)
        .toBe("Login was Successful");


    expect(res.body.token)
        .toBeDefined();

}); 