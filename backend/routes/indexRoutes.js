const Express = require('express');

const UserRouter = require('./userRoute');
const CompanyRouter = require('./companyRoute');


const Router = Express.Router();

Router.use('/user', UserRouter);
Router.use('/company', CompanyRouter);

module.exports = Router