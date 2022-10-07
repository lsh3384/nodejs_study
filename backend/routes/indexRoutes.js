const Express = require('express');
const path = require('path');

const UserRouter = require('./userRoute');
const PostRouter = require('./postRoute');


const Router = Express.Router();

// Router.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
// })
Router.use('/user', UserRouter);
Router.use('/post', PostRouter);

module.exports = Router;
