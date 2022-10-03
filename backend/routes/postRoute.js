const express = require("express");
const router = express.Router();
const fs = require('fs');

const PostController = require('../controllers/postController');

const multer  = require('multer');
const storage = multer.diskStorage({
  destination(req,file, cb) {
    const path = './static/uploads/thumbnail'
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  }
})

// const upload = multer({ dest: 'uploads/'});
const upload = multer({ storage: storage });


router.get("/getAllPosts", PostController.getAllPosts);
router.get("/getPostById", PostController.getPostById);
router.get("/deletePost", PostController.deletePost);
router.post("/createPost", PostController.createPost);
router.post("/updatePost", PostController.updatePost);
router.post("/createThumbnail", upload.single('thumbnail'), PostController.createThumbnail);
module.exports = router;