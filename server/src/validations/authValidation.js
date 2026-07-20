const joi = require("joi");

const registerSchema = joi.object({
    name : joi.string()
    .min(3)
    .max(50)
    .required(),

    email : joi.string()
        .email()
        .required(),

    password : joi.string()
    .min(6)
    .required()
    
});

const loginSchema = joi.object({
      email: joi.string()
        .email()
        .required(),

    password: joi.string()
        .required()
});

module.exports = {registerSchema , loginSchema};