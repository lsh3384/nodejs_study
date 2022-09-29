const Express = require('express');

const UserRouter = require('./userRoute');
const PostRouter = require('./postRoute');


const Router = Express.Router();

Router.use('/user', UserRouter);
Router.use('/post', PostRouter);

module.exports = Router;