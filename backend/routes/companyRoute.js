var express = require("express");
var router = express.Router();

const CompanyController = require('./../controllers/companyController');

router.get("/getAllCompanies", CompanyController.getAllCompanies);
router.get("/createDummyCompany", CompanyController.createDummyCompany);
router.post("/createCompany", CompanyController.createCompany);
router.post("/test", CompanyController.test);
module.exports = router;