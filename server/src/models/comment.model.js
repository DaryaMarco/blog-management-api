const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

        body : {
            type : String,
            required : true,
            trim : true,
            maxlength : 500
        },

        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required:true
        }
    }, 
        {
            timestamps: true
        });


        
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;