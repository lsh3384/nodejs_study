const DbServiceManager = require('./../services/dbServiceManager');

class ComapnyController {
  static getAllCompanies(req, res) {
    const companyService = DbServiceManager.getCompanyServiceInstance();
    companyService.findAllCompanies().then((result) => {
      // console.log(result);
      res.json(result.map(company => {
        return company.dataValues;
      }))
    });
  }

  static createDummyCompany(req, res) {
    const companyService = DbServiceManager.getCompanyServiceInstance();
    companyService.createDummyCompany().then((result) => {
      res.json(result);
    })
  }

  static createCompany(req, res) {
    const companyService = DbServiceManager.getCompanyServiceInstance();
    companyService.createCompany(req.body).then((result)=> {
      res.json(result);
    })
  }

  static deleteCompanies(req, res) {
    const companyService = DbServiceManager.getCompanyServiceInstance();
    companyService.deleteCompanies(req.body).then((result)=> {
      res.json(result);
    })
  }

  static test(req, res) {
    console.log(req.body);
    console.log(req.body.jobs);
  }
}

module.exports = ComapnyController;