'use strict';
const credentialObj = require('../models/CredentialModel');
const modelHelper = require('../helpers/modelHelper');
const messageManager = require('../../../../utils/configManager');

const messageCfg = messageManager.getConfig('constants');
const modelHelperObj = new modelHelper();

class CredentialDao {

  constructor() {
    this.type = 'Credential';
  }

  store(request, response) {
    let type = this.type;
    let credential = new credentialObj({
      name: request.body.name,
      project_id: request.body.project_id,
      content: request.body.content
    });
    
    credential.save(function(err, result) {
      if (err) {
        response.send(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_SERVICE_NOT_AVAILABLE, 
          messageCfg.STATUS_ERROR_SERVICE_NOT_AVAILABLE_MESSAGE, err))
      } else {
        let url = request.protocol + '://' + request.get('host') + request.baseUrl + '/credential/'+ 
              result._id;
        let attribute = {title:result.name, link: url}
        response.send(modelHelperObj.successMessageFormat(type, attribute));
      }
    });
  }

  show(request, response) {
    let id = request.params.id, type = this.type;
    credentialObj.find({$or: [{'project_id': id}, {'_id': id}]})
      .sort({created_at: 'desc'}).exec(function (err,credentials) {
      if (err) {
        response.send(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
          messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err));
      } else {
        response.send(modelHelperObj.successMessageFormat(type, credentials));
      }
    });
     
  }

  update(request, response) {
    let type = this.type;
    credentialObj.findById(request.params.id, function(err, indCredential) {
      if (err) {
        response.send(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
          messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err));
      } else {
        indCredential.name = (request.body.name == undefined) ? indCredential.name : request.body.name;
        indCredential.project_id = (request.body.project_id == undefined) ? 
                                    indCredential.project_id : request.body.project_id;
        if(request.body.content != undefined) {
          indCredential.content = request.body.content;
        }

        indCredential.save(function(err, result) {
          if (err) {
            response.send(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
              messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err));
          } else {
            response.send(modelHelperObj.successMessageFormat(type, result));    
          }
        });
      }
    });
  }

  delete(request, response) {
   let type = this.type;
    credentialObj.remove({_id: request.params.id}, function(err, credential) {
      if (err) {
        response.json(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
              messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err))
      } else {
        response.json(modelHelperObj.successMessageFormat(type, credential));
      }
    }); 
  }

}
module.exports = CredentialDao;
