const DbService = require('./dbService')

class PostService extends DbService {
  constructor() {
    super();
    this.dao = this.getDao('post');
  }

  findAllPosts() {
    return this.dao.findAll({
      order: [
        ['id', 'DESC']
      ]
    });
  }

  createPost({title, content, writer}) {
    return this.dao.create({
      title, content, writer,
    })
  }

  deletePosts({id}) {
    return this.dao.destroy({
      where: { id: id}
    })
  }
}

module.exports = PostService;