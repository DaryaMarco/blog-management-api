const Joi = require("joi");


const createPostSchema = Joi.object({

    title:Joi.string()
        .min(3)
        .max(100)
        .required(),

    content:Joi.string()
        .min(5)
        .required()

});


const updatePostSchema = Joi.object({

    title:Joi.string()
        .min(3)
        .max(100),

    content:Joi.string()
        .min(5)

});


module.exports = {
    createPostSchema,
    updatePostSchema
};


// Request
//    |
//    ↓
// validate()
//    |
//    ↓
// Controller
//    |
//    ↓
// Database