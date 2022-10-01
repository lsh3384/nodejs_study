const DbServiceManager = require('../services/dbServiceManager');

class PostController {
  static getAllPosts(req, res) {
    const postService = DbServiceManager.getPostServiceInstance();
    postService.findAllPosts().then((result) => {
      // console.log(result);
      res.json(result.map(post => {
        return post.dataValues;
      }))
    });
  }

  static createPost(req, res) {
    console.log(req.body);
    const postService = DbServiceManager.getPostServiceInstance();
    postService.createPost(req.body).then((result)=> {
      res.json(result);
    })
  }

  static deletePosts(req, res) {
    const postService = DbServiceManager.getPostServiceInstance();
    postService.deletePosts(req.body).then((result)=> {
      res.json(result);
    })
  }

  static test(req, res) {
    console.log(req.body);
    console.log(req.body.jobs);
  }
}

module.exports = PostController;