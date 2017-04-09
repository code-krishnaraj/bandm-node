/**
 * @description logger.js file which exports a logger object
 * which takes care of information and error logs
 * using bunyan logger
 */
'use strict';
let bunyan = require('bunyan');
let configManager = require('./configManager');
let loggerCfg = configManager.getConfig('logger');
let logger = bunyan.createLogger({
  name: loggerCfg.name,
  streams: loggerCfg.streams,
  serializers: bunyan.stdSerializers,
  src: loggerCfg.src
});
module.exports = logger;
