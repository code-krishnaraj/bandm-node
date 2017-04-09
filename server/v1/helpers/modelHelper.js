'use strict';

/**
 * Class for adding helper functions using in models 
*/
const messageManager = require('../../../../utils/configManager');
const messageCfg = messageManager.getConfig('constants');

class ModelHelper {

  /**
   * Method to format a success message
   */

  successMessageFormat(typeVal, attributesVal = null) {
    let success = {
        type: typeVal,
        status: messageCfg.STATUS_SUCCESS_CODE,
        message: messageCfg.STATUS_SUCCESS_MESSAGE,
        attributes: attributesVal
    }
    return success;
  }

  /**
   * Method to format an error message
   */

  errorMessageFormat(typeVal, code, message, attributesVal = null) {
    let error = {
        type : typeVal,
        status : code,
        message : message,
        attributes : attributesVal
    }
    return error;
  }
    
}
module.exports = ModelHelper;
