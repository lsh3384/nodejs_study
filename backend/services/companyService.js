const DbService = require('./dbService')

class CompanyService extends DbService {
  constructor() {
    super();
    this.dao = this.getDao('company');
  }

  findAllCompanies() {
    return this.dao.findAll({
      order: [
        ['id', 'DESC']
      ]
    });
  }

  createCompany({name, phone, address}) {
    return this.dao.create({
      name, phone, address,
    })
  }

  createDummyCompany() {
    return this.dao.create({
      name: "dummy",
      phone: "010-1234-1234",
      address: "Daejeon",
    });
  }

  deleteCompanies({id}) {
    return this.dao.destroy({
      where: { id: id}
    })
  }
}

module.exports = CompanyService;