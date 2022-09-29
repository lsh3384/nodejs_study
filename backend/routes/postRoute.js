var express = require("express");
var router = express.Router();

const PostController = require('../controllers/postController');

router.get("/getAllCompanies", PostController.getAllPosts);
router.post("/createCompany", PostController.createPost);
router.post("/deleteCompanies", PostController.deletePosts);
module.exports = router;