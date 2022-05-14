const express = require("express");
const router = express.Router()

const { createPost, getPosts } = require("../controllers/posts.controller")

router.route("/post").post(createPost)
router.route("/posts").get(getPosts)
module.exports = router