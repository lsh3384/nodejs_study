var express = require("express");
var router = express.Router();

const CompanyController = require('./../controllers/companyController');

router.get("/getAllCompanies", CompanyController.getAllCompanies);
router.get("/createDummyCompany", CompanyController.createDummyCompany);

module.exports = router;