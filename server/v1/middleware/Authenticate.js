'use strict';
const messageManager = require('../../../../utils/configManager');
const modelHelper = require('../helpers/modelHelper');

const messageCfg = messageManager.getConfig('constants');
const modelHelperObj = new modelHelper();

class Authenticate {

  handle(request, response, next) {
    if (!request.session.userId) {
      response.json(modelHelperObj.errorMessageFormat('auth', messageCfg.STATUS_ERROR_UN_AUTHORIZED_CODE,
        messageCfg.STATUS_ERROR_UN_AUTHORIZED_MESSAGE, ''));
    } else {
      next();
    }
  }
}
module.exports = Authenticate;