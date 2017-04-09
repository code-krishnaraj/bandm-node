/**
 * Contains the functionality to set the preferred environment
 *
 */
'use strict';
let configManager = require('node-config-manager');
let options = {
  configDir: './config',
  env: process.env.NODE_ENV === undefined ? "local" : process.env.NODE_ENV,
  camelCase: true
};

configManager.init(options);
configManager.addConfig('logger');
configManager.addConfig('app');
configManager.addConfig('constants');
configManager.addConfig('auth');
module.exports = configManager;
