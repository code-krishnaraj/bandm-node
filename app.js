'use strict';
const logger = require('./utils/logger');
const Server = require('./src/server/server');
const API = new Server();

API.start((err) => {
  if (!err) {
    console.log('To stop the API server press CTRL^C...');
  } else {
    process.exit();
  }
});

process.on('SIGINT', function () {
  API.stop(function stopAPISuccess() {
    logger.info('API stopped successfully...');
    process.exit();
  });
});