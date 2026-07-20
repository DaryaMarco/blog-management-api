const request = require("supertest");
const app = require("../../app");
 
const registerUser  = async ( name , email , password)=>{

    return await request(app)
    .post("/api/auth/register")
    .send({
        email,
        name,
        password
    });

}


const loginUser =async ( email,password)=>{
    
    const res = await request(app)
    .post("/api/auth/login")
    .send({
        email,
        password
    });

    return res.body.token;

}


module.exports = {registerUser, loginUser};