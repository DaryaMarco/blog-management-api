const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router(); 
const validate = require("../middleware/validate");
const {commentSchema} = require("../validations/comment.validation");
const {createComment, getComments, updateComment, deleteComment} = require("../controllers/comment.controller");

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Create a new comment for a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: "This is an awesome post!"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Comment created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

router.post("/:postId/comments",auth,validate(commentSchema),createComment);


/*
* @swagger
* /api/posts/{postId}/comments:
*   get: 
*       summery: Get al comments from a post
*       tags: [comments]    
*       parameters:
*           -in: path
*            name: postId
*             require: true
*               schema: 
*                type: string
*               description: Post ID
*            responses:
*               200:
*                  description: Comments recieved successfully
*               400:
*                  description: Invalid post ID
*               404:
*                  description: Post not found
**/
router.get("/:postId/comments", getComments);


/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: Updated comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Validation error or invalid ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to update this comment
 *       404:
 *         description: Comment not found
 */
router.put("/:postId/comments/:commentId", auth,validate(commentSchema),updateComment);

/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to delete this comment
 *       404:
 *         description: Comment not found
 */
router.delete("/:postId/comments/:commentId", auth, deleteComment);

module.exports = router;