const Comment = require("../models/comment.model");
const AppError = require("../utils/AppError");
const Post = require("../models/post.model");
const { request } = require("../../app");


const getComments = async (req, res,next) =>{
    try{
        const {postId} = req.params;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({
                message : "Post not Found"
            })
        };
        const comments =  await Comment.find({
            post : postId
        })
        .populate("user", "name email")
        .sort("-createdAt");
        
        res.status(200).json({
            results : comments.length,
            comments
        });

    }catch(err){
        next(err);
    }
}
const createComment = async (req, res) => {

    const post = await Post.findById(req.params.postId);

    if(!post){
        throw new AppError("Post Not Found", 404);
    }

    const { body } = req.body;

    const comment = await Comment.create({
        body,
        user: req.user.id,
        post: req.params.postId
    });

    return res.status(201).json({
    status: "success",
    message: "Comment created successfully",
    data: {
        comment
    }
});
};

const updateComment = async (req, res, next) =>{

    try{           

    const {commentId , postId} = req.params;
    const {body} = req.body;

    const comment = await Comment.findOne({
        _id : commentId,
        post : postId
    });

    if(!comment){
        return res.status(404).json({
            message : "Comment not found!"
        });
    }

    if(comment.user.toString() !== req.user.id.toString()){

        return res.status(403).json({
          message:"You are not allowed to update this comment"

        });}
    
    comment.body = body;
    await comment.save();

    res.status(200).json({
        message : "comment updated successfully!😍",
        comment
    })
    }catch(err){
        next(err);
    };
}
const deleteComment = async (req,res, next)=>{
    try{
        const { postId, commentId } = req.params;
        const userId = req.user.id;
              
        const comment = await Comment.findOne({
        _id : commentId,
        post : postId
        });
         
        if(!comment){
        return res.status(404).json({
            message : "Comment not found!"
        });
        }
        if (comment.user.toString() !== req.user.id) {
        return res.status(403).json({
          message:"You are not allowed to delete this comment"

        });
        }
        await comment.deleteOne();

        return res.status(200).json({
        message: "Comment deleted successfully!"
        });
            
        }catch(err){
                next(err);
        }
}
    



module.exports = {
    createComment, getComments, updateComment, deleteComment
};