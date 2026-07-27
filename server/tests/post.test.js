const request = require("supertest");
const app = require("../app");
const {registerUser ,loginUser} = require("./helper/authHelper")
const {createPost} = require("./helper/postHelper");

describe("Post API", () => {


    it("should not create post without token", async () => {

        const res = await request(app)
            .post("/api/posts")
            .send({
                title: "Test Post",
                content: "Test Content"
            });


        expect(res.statusCode).toBe(401);

        expect(res.body.message)
            .toBe("No token, access denied");

    });


    it("should not create post without token", async () => {

        const res = await request(app)
            .post("/api/posts")
            .send({
                title: "Test Post",
                content: "Test Content"
            });


        expect(res.statusCode).toBe(401);

    });

   });


    // Update Post با Owner Authorization.
    it("should update own post with valid token", async () => {

  
        // Register user
       await registerUser(
            "Post User",
            "post@test.com",
            "123456"
        );

        // Login user
        const token = await loginUser(
            "post@test.com",
            "123456"
        );


    // Create Post
     const post = await createPost(
            token, 
            "Old Title",
            "Old Content"
        );
        const postId = post._id;
        

    // Update Post
    const res = await request(app)
        .put(`/api/posts/${postId}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            title: "Updated Title",
            content: "Updated Content"
        });


    expect(res.statusCode).toBe(200);
    expect(res.body.message)
        .toBe("Post Was Updated Successfully");

    expect(res.body.post.title)
        .toBe("Updated Title");

    });

    // DELETE POST 

    it("should delete own post with valid token", async () => {

            // Register user
       await registerUser(
            "Post User",
            "post@test.com",
            "123456"
        );

        // Login user
        const token = await loginUser(
            "post@test.com",
            "123456"
        );

    // 3- Create post
        const post = await createPost(
        token,
        "Post For Delete",
        "This post will be deleted"
        );

        const postId = post._id;

    // 4- Delete post
    const res = await request(app)
        .delete(`/api/posts/${postId}`)
        .set("Authorization", `Bearer ${token}`);


    expect(res.statusCode).toBe(200);
    expect(res.body.message)
        .toBe(" Post was Deleted!");

   
});

// GET Posts API

describe("GET Posts API", () => {
     
      it("should get all posts", async () => {
        await registerUser(
            "Ali",
            "ali@test.com",
            "123456"
         );

         const token = await loginUser(
            "ali@test.com",
            "123456"
        );
        await createPost(
            token,
            "Post 1",
            "Content 1"
        );

        await createPost(
            token,
            "Post 2",
            "Content 2"
        );

        await createPost(
            token,
            "Post 3",
            "Content 3"
        );

        const res = await request(app)
            .get("/api/posts");

           expect(res.statusCode).toBe(200);
           expect(res.body.posts.length)
            .toBe(3);
    });

    //   search posts by title
    it("should search posts by title", async () => {
        await registerUser(
            "Ali",
            "ali@test.com",
            "123456"
         );

         const token = await loginUser(
            "ali@test.com",
            "123456"
        );
        await createPost(
            token,
            "JavaScript",
            "Content"
        );

        await createPost(
            token,
            "Node.js",
            "Content"
        );

        await createPost(
            token,
            "React",
            "Content"
        );

        const res = await request(app)
            .get("/api/posts?search=node"); 
            expect(res.statusCode)
            .toBe(200);
            expect(res.body.posts.length)
            .toBe(1);
            expect(res.body.posts[0].title)
            .toBe("Node.js")
        }); 

        // paginate posts
        it("should paginate posts", async () => {

        await registerUser(
            "Ali",
            "ali@test.com",
            "123456"
         );

         const token = await loginUser(
            "ali@test.com",
            "123456"
        );
        await createPost(token, "Post 1", "Content");
        await createPost(token, "Post 2", "Content");
        await createPost(token, "Post 3", "Content");
        await createPost(token, "Post 4", "Content");

        const res =await request(app)
           .get("/api/posts?page=2&limit=2"); 

        expect(res.statusCode).toBe(200);

        expect(res.body.pagination.page).toBe(2);
        
        expect(res.body.pagination.limit).toBe(2);

        expect(res.body.posts.length).toBe(2);
        
        expect(res.body.posts[0].title).toBe("Post 3");

        expect(res.body.posts[1].title).toBe("Post 4");
        
       });  

// sort posts by newest
    it("should sort posts by newest", async () => {
        await registerUser(
            "Ali",
            "ali@test.com",
            "123456"
         );

         const token = await loginUser(
            "ali@test.com",
            "123456"
        );
        await createPost(
            token,
            "JavaScript",
            "Content"
        );

        await createPost(
            token,
            "First Post",
            "Content"
        );

        await createPost(
            token,
            "Second Post",
            "Content"
        );

        await createPost(
            token,
            "Third Post",
            "Content"
        );
        
        const res =await request(app)
            .get("/api/posts/?sort=newest");
            expect(res.statusCode).toBe(200)
            expect(res.body.posts[0].title).toBe("Third Post");

    });

    it("should sort posts by oldest", async () => {
        await registerUser(
            "Ali",
            "ali@test.com",
            "123456"
         );

         const token = await loginUser(
            "ali@test.com",
            "123456"
        );
       
        await createPost(
            token,
            "First Post",
            "Content"
        );

        await createPost(
            token,
            "Second Post",
            "Content"
        );

        await createPost(
            token,
            "Third Post",
            "Content"
        );
        
        const res =await request(app)
            .get("/api/posts/?sort=oldest");
            expect(res.statusCode).toBe(200);

        const titles = res.body.posts.map(
            post => post.title
        );

        expect(titles).toEqual([
            "First Post",
            "Second Post",
            "Third Post"
        ])

            expect(res.body.posts[0].title).toBe("First Post");

    });

    it("should fail validation when title is missing", async () => {

    await registerUser(
        "Post User",
        "post55@test.com",
        "123456"
    );

    const token = await loginUser(
        "post55@test.com",
        "123456"
    );

    const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({
            content: "Only content"
        });
      
        expect(res.statusCode).toBe(400);

    });

});
// DRY :::::::::> Don't Repeat Yourself`