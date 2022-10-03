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

  findPostById({id}) {
    return this.dao.findOne({
      where: {
        id: id,
      },
    });
  }

  createPost({title, content, writer, thumbnail}) {
    return this.dao.create({
      title, content, writer, thumbnail
    })
  }

  deletePosts({id}) {
    return this.dao.destroy({
      where: { id: id}
    })
  }
}

module.exports = PostService;