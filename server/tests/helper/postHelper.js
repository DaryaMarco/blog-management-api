const request = require("supertest");
const app = require("../../app");


const createPost = async (token, title, content)=>{

    const res = await request(app)
    .post("/api/posts")
    .set("Authorization", `Bearer ${token}` )
    .send({
        title, content
    });

    return res.body.post;
};

module.exports = {createPost};