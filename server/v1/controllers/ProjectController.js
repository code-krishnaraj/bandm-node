'use strict';
const ProjectDao = require('../dao/ProjectDao');
const projectDaoObj = new ProjectDao();
class ProjectController {
  
  index(request, response) {
    projectDaoObj.getAll(request, response);
	}

  store(request, response) {
    projectDaoObj.store(request, response);
  }

  show(request, response) {
    projectDaoObj.show(request, response);
  }

  update(request, response) {
    projectDaoObj.update(request, response);
  }

  delete(request, response) {
    projectDaoObj.delete(request, response);
  }

}
module.exports = ProjectController;
