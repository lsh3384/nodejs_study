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

const upload = multer({ storage: storage });

const isAuthenticated = (req, res, next) => {
  console
  if(req.isAuthenticated()) {
    next();
  } else {
    console.log('req.isAuthenticated()', req.isAuthenticated());
    res.status(403).render();
  }
}

router.get("/getAllPosts", PostController.getAllPosts);
// router.get("/getPostById", function (req, res, next) { console.log(req.isAuthenticated()); next() }, PostController.getPostById);
router.get("/getPostById", isAuthenticated, PostController.getPostById);
router.get("/deletePost", isAuthenticated, PostController.deletePost);
router.post("/createPost", isAuthenticated, PostController.createPost);
router.post("/updatePost", isAuthenticated, PostController.updatePost);
router.post("/createThumbnail", isAuthenticated.bind(this), upload.single('thumbnail'), PostController.createThumbnail);
module.exports = router;
