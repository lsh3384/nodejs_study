const DbServiceManager = require('./../services/dbServiceManager');

class ComapnyController {
  static getAllCompanies(req, res) {
    const companyService = DbServiceManager.getCompanyServiceInstance();
    companyService.findAllCompanies().then((result) => {
      console.log(result);
      res.json(result.map(company => {
        return company.dataValues;
      }))
    });
  }

  static createDummyCompany(req, res) {
    const companyService = DbServiceManager.getCompanyServiceInstance();
    companyService.createDummyCompany().then((result) => {
      console.log(result);
      res.json(result);
    })
  }
}

module.exports = ComapnyController;