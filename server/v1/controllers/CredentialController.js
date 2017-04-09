'use strict';
const CredentialDao = require('../dao/CredentialDao');
const CredentialDaoObj = new CredentialDao();
class CredentialController {
  
  store(request, response) {
    CredentialDaoObj.store(request, response);
  }

  show(request, response) {
    CredentialDaoObj.show(request, response);
  }

  update(request, response) {
    CredentialDaoObj.update(request, response);
  }

  delete(request, response) {
    CredentialDaoObj.delete(request, response);
  }

}
module.exports = CredentialController;
