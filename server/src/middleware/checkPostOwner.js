const Post = require("../models/post.model");
const AppError = require("../utils/AppError");

const checkPostOwner = async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        throw new AppError(
            "Post not found",
            404
        );
    }


    // Admin can do anything
    if (req.user.role === "admin") {
        return next();
    }


    // Check owner
    if (post.user.toString() !== req.user.id) {
        throw new AppError(
            "You are not allowed to perform this action",
            403
        );
    }


    next();
};


module.exports = checkPostOwner;