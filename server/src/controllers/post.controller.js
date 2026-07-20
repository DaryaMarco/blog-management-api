const Post = require("../models/post.model");
const AppError = require("../utils/AppError");

// CREATE POST
const createPost = async (req, res ) => {
        const {title , content } = req.body;
         if(!title || !content){     
            throw new AppError(
                "Title and Content are required",
                400
            )
         };
        const post = await Post.create({
            title,
            content,
            user : req.user.id
        });
       
        res.status(201).json({
            message : "Post created successfully", 
            post,
        });
    };


// GETPOSTS
const getPosts = async (req,res)=> {

    // throw new AppError("Testing Error Handler", 400);

         const { search , sort, page = 1 , limit = 10 } = req.query;
            let sortOption = {};

            if(sort === "newest"){

                sortOption = {
                    createdAt: -1
                };

            }

            if(sort === "oldest"){

                sortOption = {
                    createdAt: 1
                };

            }
        const currentPage = Math.max(Number(page) || 1, 1);
        const pageLimit = Math.min(Number(limit) || 10, 50);

        let query = {};

        if(search){
            query ={
                $or:[
                    {title : {$regex : search , $options : "i"}},
                    {content :{$regex : search, $options : "i"}}
                ]
            }
        }
        const totalPosts = await Post.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / pageLimit);
        const skip = (currentPage - 1) * pageLimit;
        const posts = await Post.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(pageLimit)
        .populate("user" , "name email ").select("title content");

        res.status(200).json({
            posts,
            pagination :{
                    page: currentPage,
                    limit: pageLimit,        
                    totalPosts,
                    totalPages,
            }
        });
        
};

// GET POST
const getPost = async (req , res)=>{


        const post = await Post.findById(req.params.id);

        if(!post){
            throw new AppError("Post not Found!", 404)
        }
        res.status(200).json({
            post
        })
        
}

// UPDATE POST
const updatePost = async(req,res)=>{
    
        const {title , content} = req.body;
        const post = await Post.findById(req.params.id);
        if(!post){
           throw new AppError(
            "Post Not Found",404
           )
        }
            if(post.user.toString() !== req.user.id.toString()){
                 throw new AppError(
                        "You are not allowed to update this post",
                         403
        );
            }
            post.title = title;
            post.content = content;
            await post.save();
            res.status(200).json({
                message : "Post Was Updated Successfully",
                post,
        });
    
}


// DELETE POST
const deletePost = async (req,res)=>{
    
        const post = await Post.findById(req.params.id);

        if(!post){
             throw new AppError(
             "Post Not Found",404
           )
        }
        if(post.user.toString() !== req.user.id.toString() ){
              throw new AppError(
            "You are not allowed to delete this post!",403
           )
        }
            await post.deleteOne();
            res.status(200).json({
                message : " Post was Deleted!"
            });

}

module.exports = {createPost, getPosts, getPost, updatePost ,deletePost};







            // let sortOption = {
            // createdAt: -1 پیش فرض
            // }; // پیش‌فرض: جدیدترین اول

            // ولی اگه کاربر گفت   GET /api/posts?sort=oldest
            // if(sort === "oldest"){

            //     sortOption = {
            //         createdAt: 1
            //     };

            // }
        // const currentPage = Number(req.query.page) || 1;
        // const pageLimit = Number(req.query.limit) || 10;