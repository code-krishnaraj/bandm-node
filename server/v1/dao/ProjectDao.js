'use strict';
const projectObj = require('../models/ProjectModel');
const modelHelper = require('../helpers/modelHelper');
const validator = require('../validator/projectValidator');
const messageManager = require('../../../../utils/configManager');

const messageCfg = messageManager.getConfig('constants');
const modelHelperObj = new modelHelper();

class ProjectDao {

  constructor() {
    this.type = 'Project';
  }

  getAll(request, response) {
    let userId = request.session.userId, type = this.type;
    projectObj.find({$or: [{shared_users: {$elemMatch: {'uid': userId}}}, {user_id: userId}]})
      .sort({created_at: 'desc'}).exec(function (err,projects) {
      if (err) {
        response.json(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
          messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err));
      } else {
        response.json(modelHelperObj.successMessageFormat(type, projects));
      }
    });
	}

  store(request, response) {
    let type = this.type;
    let project = new projectObj({
      name: request.body.name,
      user_id: request.session.userId
    });

    project.save(function(err, result) {
      if (err) {
        response.json(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_SERVICE_NOT_AVAILABLE, 
          messageCfg.STATUS_ERROR_SERVICE_NOT_AVAILABLE_MESSAGE, err))
      } else {
        let url = request.protocol + '://' + request.get('host') + request.baseUrl + '/project/'+ result._id;
        let attribute = {title:result.name, link: url}
        response.json(modelHelperObj.successMessageFormat(type, attribute));
      }
    });
  }

  show(request, response) {
    let userId = request.session.userId, type = this.type;
    projectObj.findOne(
      {$and: [
        {_id: request.params.id},
        {$or: [{shared_users: {$elemMatch: {'uid': userId}}}, {user_id: userId}]}
      ]}, 
      function(err, project) {
      if (err) {
        response.send(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
          messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err));
      } else {
        response.send(modelHelperObj.successMessageFormat(type, project));
      }
    }); 
  }

  update(request, response) {
    let type = this.type;
    projectObj.findById(request.params.id, function(err, indProject) {
      if (err) {
        response.send(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
          messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err));
      } else {
        indProject.name = (request.body.name == undefined) ? indProject.name : request.body.name;
        if(request.body.shared_users != undefined) {
          indProject.shared_users = request.body.shared_users;
        } 

        indProject.save(function(err, result) {
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
    projectObj.remove({_id: request.params.id}, function(err, project) {
      if (err) {
        response.send(modelHelperObj.errorMessageFormat(type, messageCfg.STATUS_ERROR_BAD_REQUEST, 
              messageCfg.STATUS_ERROR_BAD_REQUEST_MESSAGE, err))
      } else {
        response.send(modelHelperObj.successMessageFormat(type, project));
      }
    });
  }

}
module.exports = ProjectDao;
