const app = require('./app');
const config = require('./config');

const DbService = require('./services/dbService');

const dbServiceInstance = DbService.getInstance();

(async () => {
    await dbServiceInstance.sync();    
  })();


/* server listen */
const server = app.listen(config.port, function () {
  console.log("server on! http://localhost:" + config.port);
 });