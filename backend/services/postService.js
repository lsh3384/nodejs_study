const DbService = require('./dbService')

class PostService extends DbService {
  constructor() {
    super();
    this.dao = this.getDao('company');
  }

  findAllPosts() {
    return this.dao.findAll({
      order: [
        ['id', 'DESC']
      ]
    });
  }

  createPost({name, phone, address}) {
    return this.dao.create({
      name, phone, address,
    })
  }

  deletePosts({id}) {
    return this.dao.destroy({
      where: { id: id}
    })
  }
}

module.exports = PostService;