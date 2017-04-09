/**
 * Contains the functionality to load messages   
 *
 */
'use strict';
let messageManager = require('node-config-manager');
let options = {
  configDir: './config',
  camelCase: true
};

messageManager.init(options);
messageManager.addConfig('constants');
module.exports = messageManager;
