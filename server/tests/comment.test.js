const   request = require("supertest");
const app = require("../app");
const { loginUser } = require("./helper/commentHelper");
const { error } = require("winston");
const { register } = require("../src/controllers/auth.controller");
const {createPost} = require("./helper/postHelper");

describe("comment API" , ()=>{

    it("should create a comment", async ()=>{
        // registerRes
        // const email = `test${Date.now()}@gmail.com`;
        // const password = "12345678";

        // const registerRes = await request(app)
        
        //     .post("/api/auth/register")
        //     .send({
        //         name : "Test User",
        //         email,
        //         password
        //     })
        // // loginRes
        // const loginRes = await request(app)

        //     .post("/api/auth/login")
        //     .send({
        //         email,
        //         password    
        //     });

        // const token = loginRes.body.token; 
    const { token } = await loginUser();

        // postRes
        const postRes  = await request(app)
            .post("/api/posts")
            .set("Authorization",`Bearer ${token}`)
            .send({
                title : "Greate Post",
                content :"This is a Test Post"
            })

        const postId = postRes.body.post._id;

        // commentRes
        const commentRes = await request(app)
            .post(`/api/posts/${postId}/comments`)
            .set("Authorization",`Bearer ${token}`)
            .send({
                body:"Great comment"
            })

            expect(commentRes.statusCode)
            .toBe(201);

            expect(commentRes.body.message)
            .toBe("Comment created successfully");

            expect(commentRes.body.data.comment)
            .toBeDefined();

        const comment = commentRes.body.data.comment;

            expect(comment.post).toBe(postId);
            expect(comment.body).toBe("Great comment");

        });

    it("should not create comment without token", async ()=>{

        // registerRes
        // const email = `test${Date.now()}@gmail.com`;
        // const password = "12345678";

        // const registerRes = await request(app)
        
        //     .post("/api/auth/register")
        //     .send({
        //         name : "Test User",
        //         email,
        //         password
        //     })
        // // loginRes
        // const loginRes = await request(app)

        //     .post("/api/auth/login")
        //     .send({
        //         email,
        //         password    
        //     });

        // const token = loginRes.body.token; 
        const { token } = await loginUser();

        const postRes = await request(app)
                .post("/api/posts")
                .set("Authorization", `Bearer ${token}`)   
                .send({
                    title : "Test post",
                    content : "Test Content"
                });

        const postId = postRes.body.post._id;  
        
        const commentRes = await request(app)
            .post(`/api/posts/${postId}/comments`)
            // .set("Authorization",`Bearer ${token}`) ::::>>> عمداً توکن را ارسال نمی‌کنیم
            .send({
                body:"Great comment"
            });
            expect(commentRes.statusCode)
            .toBe(401);

            expect(commentRes.body.message)
            .toBe("No token, access denied");
    });
    
    it("should not create comment without body", async ()=>{

            const {token} = await loginUser();

            const postRes = await request(app)
                 .post("/api/posts")
                 .set("Authorization", `Bearer ${token}`)
                 .send({
                    title : "Test Without Body",
                    content :"Test Content"
                 });
            
            const postId = postRes.body.post._id;
            
            const commentRes =await request(app)
                 .post(`/api/posts/${postId}/comments`)
                 .set("Authorization", `Bearer ${token}`)
                 .send({});

                expect(commentRes.statusCode).toBe(400);
                expect(commentRes.body.message).toBe("Validation Error");
                expect(commentRes.body.error).toContain("body");
    });

    it("should not create comment for invalid postId", async () => {

        const {token} = await loginUser();
        const fakePostId = "123abc";
        const commentRes = await request(app)
             .post(`/api/posts/${fakePostId}/comments`)
             .set("Authorization", `Bearer ${token}`)
             .send({      
                body : "Greate comment"
                      });
                      
            expect(commentRes.statusCode).toBe(400);
            expect(commentRes.body.message).toBe("Invalid _id: 123abc");
   });
//     it("should not create comment for non-existing postId", async () => {

//             const {token} = await loginUser();
//             const 
//  });

// GET COMMENTS TEST ::::>>>>>

        it("should get all comments of a post", async()=>{

            const {token} = await loginUser();

            const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization",`Bearer ${token}`)
            .send({
                title:"Test post",
                content:"Post body"
            });
                console.log(postRes.body);

            const postId = postRes.body.post._id;

            await request(app)
            .post(`/api/posts/${postId}/comments`)
            .set("Authorization",`Bearer ${token}`)
            .send({
                 body : "first comment"     
                 });

            const commentsRes = await request(app)
            .get(`/api/posts/${postId}/comments`);

            expect(commentsRes.statusCode).toBe(200);
            expect(commentsRes.body.comments.length).toBe(1)

        });

         it("should return 404 if post does not exist", async()=>{

            const fakePostId = "507f1f77bcf86cd799439011";

            const res = await request(app)
            .get(`/api/posts/${fakePostId}/comments`)

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Post not Found")

        });

        it("should return 400 for invalid postId", async()=>{
            
            const res = await request(app)

                .get("/api/posts/123abc/comments");

                expect(res.statusCode).toBe(400);
        
        });

        it("should update comment successfully", async()=>{

            const {token}= await loginUser();

            const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization",`Bearer ${token}`)
            .send({
                title:"Test post",
                content:"Post body"
            });


            const postId = postRes.body.post._id;


            const commentRes = await request(app)
            .post(`/api/posts/${postId}/comments`)
            .set("Authorization",`Bearer ${token}`)
            .send({
                body:"old comment"
            });
            const commentId = commentRes.body.data.comment._id;

            const updateRes = await request(app)
                .put(`/api/posts/${postId}/comments/${commentId}`)
                .set("Authorization",`Bearer ${token}`)
                .send({
                    body : "comment updated successfully!😍"
                });

            expect(updateRes.statusCode).toBe(200);
            
            expect(updateRes.body.comment.body).toBe("comment updated successfully!😍")
                
        });

        it("should return 404 if comment does not exist", async () => {

        const {token} = await loginUser();

        const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test post",
                content: "Post body"
            });

            const postId = postRes.body.post._id;

            const fakeCommentId = "507f1f77bcf86cd799439011";

            const res = await request(app)
            .put(`/api/posts/${postId}/comments/${fakeCommentId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                body: "Updated Comment"
            });

            expect(res.statusCode).toBe(404)
            expect(res.body.message).toBe("Comment not found!")

    });

    it("should return 400 for invalid commentId", async () => {

        const { token } = await loginUser();

        const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test post",
                content: "Post body"
            });

        const postId = postRes.body.post._id;

        const res = await request(app)
            .put(`/api/posts/${postId}/comments/123abc`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                body: "Updated Comment"
            });

        expect(res.statusCode).toBe(400);

        });

        it("should not allow another user to update the comment", async () => {

            const user1 = await loginUser();

            const postRes = await request(app)
                .post("/api/posts")
                .set("Authorization", `Bearer ${user1.token}`)
                .send({
                    title : "Test Post",
                    content: "post body"
                });

            const postId = postRes.body.post._id;
            const commentRes = await request(app)
                .post(`/api/posts/${postId}/comments`)
                .set("Authorization", `Bearer ${user1.token}`)
                .send({
                    body: "Old Comment"
                });

            const commentId = commentRes.body.data.comment._id;

            const user2 = await loginUser();

            const res = await request(app)
                .put(`/api/posts/${postId}/comments/${commentId}`)
                .set("Authorization", `Bearer ${user2.token}`)
                .send({
                    body: "Hack Comment"
                });

                expect(res.statusCode).toBe(403)
                expect(res.body.message).toBe("You are not allowed to update this comment")

        });

    it("should delete comment successfully by owner", async () => {

        const {token} = await loginUser();

        const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "Test post",
            content: "Post body"
        });
        
        const postId = postRes.body.post._id;   
        
        const commentRes =await request(app)
            .post(`/api/posts/${postId}/comments/`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                        body: "Test Comment"
            });
            const commentId = commentRes.body.data.comment._id;

            const res = await  request(app)
                .delete(`/api/posts/${postId}/comments/${commentId}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.message).toBe("Comment deleted successfully!")

        });

it("should not delete comment by another user", async () => {

    const {token: ownerToken} = await loginUser();

    // create post by owner
    const postRes = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${ownerToken}`)
        .send({
            title:"Test post",
            content:"Post body"
        });

    const postId = postRes.body.post._id;


    // create comment by owner
    const commentRes = await request(app)
        .post(`/api/posts/${postId}/comments`)
        .set("Authorization", `Bearer ${ownerToken}`)
        .send({
            body:"Owner comment"
        });


    const commentId = commentRes.body.data.comment._id;


    // another user
    const {token: otherUserToken} = await loginUser();


    const res = await request(app)
        .delete(`/api/posts/${postId}/comments/${commentId}`)
        .set("Authorization", `Bearer ${otherUserToken}`);


    expect(res.statusCode).toBe(403);

    expect(res.body.message)
        .toBe("You are not allowed to delete this comment");

});

it("should not delete comment without authentication", async () => {

        const {token} = await loginUser();

        const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test post",
                content: "Post body"
            });

    const postId = postRes.body.post._id;

    // create comment by owner
    const commentRes = await request(app)
        .post(`/api/posts/${postId}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            body:"Owner comment"
        });
    const commentId = commentRes.body.data.comment._id;

    const res = await request(app)
        .delete(`/api/posts/${postId}/comments/${commentId}`);

        expect(res.statusCode).toBe(401);

        expect(res.body.message)
            .toBe("No token, access denied");
});

it("should return 404 if comment does not exist", async () => {
    
    const { token } = await loginUser();
    const postRes = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test post",
                content: "Post body"
            });

    const postId = postRes.body.post._id;

    // create comment by owner
    const commentRes = await request(app)
        .post(`/api/posts/${postId}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            body:"Owner comment"
        });
    const commentId = commentRes.body.data.comment._id;

    const fakeCommentId = "507f1f77bcf86cd799439011";

    const res = await request(app)
        .delete(`/api/posts/${postId}/comments/${fakeCommentId}`)
        .set("Authorization", `Bearer ${token}`);


    expect(res.statusCode).toBe(404);

    expect(res.body.message)
        .toBe("Comment not found!");
});

})