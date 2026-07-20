const Joi = require("joi");
  
const commentSchema = Joi.object({

    body : Joi.string()
            .max(500)
            .min(1)
            .required()
});

module.exports = {commentSchema}; 