const DbService = require('./dbService')

class PostService extends DbService {
  constructor() {
    super();
    this.dao = this.getDao('post');
  }

  findAllPosts() {
    return this.dao.findAll({
      where: {
        use_yn: 'y',
      },
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

  updatePost({id, title, content, writer, thumbnail}) {
    return this.dao.update(
      {title, content, writer, thumbnail},
      {where: { id: id}}
    )
  }
  

  deletePost({id}) {
    return this.dao.update(
      {use_yn: 'n'},
      {where: { id: id}})
  }
}

module.exports = PostService;