const request = require("supertest");
const app = require("../../app");


const loginUser = async () => {

    const email = `test${Date.now()}@gmail.com`;
    const password = "12345678";


    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email,
            password
        });


    const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password
        });


    const token = loginRes.body.token;


    return {
        token,
        email,
        password
    };
     const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization",`Bearer ${token}`)
            .send({
                title:"Test post",
                content:"Post body"
            });

};


module.exports = {
    loginUser
};