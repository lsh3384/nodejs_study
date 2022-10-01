var express = require("express");
var router = express.Router();

const PostController = require('../controllers/postController');

router.get("/getAllPosts", PostController.getAllPosts);
router.post("/createPost", PostController.createPost);
router.post("/deletePost", PostController.deletePosts);
module.exports = router;