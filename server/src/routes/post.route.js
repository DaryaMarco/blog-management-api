const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router(); 
const validate = require("../middleware/validate");
const {createPostSchema, updatePostSchema} = require("../validations/postValidation")
const { createPost , getPosts , getPost , updatePost, deletePost} = require( "../controllers/post.controller"); 
const asyncHandler = require("../middleware/asyncHandler");
const checkPostOwner = require("../middleware/checkPostOwner");

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first post
 *               content:
 *                 type: string
 *                 example: This is my gym article
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/",auth,validate(createPostSchema),asyncHandler(createPost));
// router.post("/", auth, validate(createPostSchema), createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 */
router.get("/", asyncHandler(getPosts));
/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get single post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Single post
 *       404:
 *         description: Post not found
 */
router.get("/:id",asyncHandler(getPost));
/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a549eb7967e6964a6aa8db0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated gym article
 *               content:
 *                 type: string
 *                 example: Updated content from Swagger
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.put("/:id",auth,validate(updatePostSchema),asyncHandler(updatePost));

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a549eb7967e6964a6aa8db0
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.delete("/:id",auth,checkPostOwner,asyncHandler(deletePost));

module.exports= router;