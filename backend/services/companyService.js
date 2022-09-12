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

  createDummyCompany() {
    return this.dao.create({
      name: "dummy",
      phone: "010-1234-1234",
      address: "Daejeon",
    });
  }
}

module.exports = CompanyService;