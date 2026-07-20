const express = require("express");
const router = express.Router();

const { deleteUser } = require("../controllers/user.controller");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");


router.delete("/:id", auth, isAdmin, deleteUser);
// router.put("/:id/make-admin", makeAdmin);

module.exports = router;