const Express = require('express');

const UserRouter = require('./userRoute');


const Router = Express.Router();


Router.use('/user', UserRouter)

module.exports = Router