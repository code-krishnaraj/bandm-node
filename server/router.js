'use strict';

const PassportHelper = require('./v1/helpers/passportHelper');
const passportHlprObj = new PassportHelper();
const Authenticate = require('./v1/middleware/Authenticate');
const authenticateObj = new Authenticate();
const ProjectController = require('./v1/controllers/ProjectController');
const projectCtrlObj = new ProjectController();
const CredentialController = require('./v1/controllers/CredentialController');
const credentialCtrlObj = new CredentialController();

class Router {

  index(expressApp) {
    expressApp.get('/', function (request, response, done) {
      response.render('index', {
        title: 'ejs'
      });
    });
  }

  applyCommon(expressApp, routes, passport) {
    
    // ROUTES FOR OUR API
   let router = routes.Router();

    // on routes that end in /project
    // ----------------------------------------------------
    router.all('/project/*', function (request, response, next) {
      authenticateObj.handle(request, response, next);
    });

    router.all('/credential/*', function (request, response, next) {
      authenticateObj.handle(request, response, next);
    });

    router.route('/project')
      .get(function(request, response) {
        projectCtrlObj.index(request, response);
      })
      .post(function(request, response) {
        projectCtrlObj.store(request, response);
    });

    router.route('/project/:id')
      .get(function(request, response) {
        projectCtrlObj.show(request, response);
      })
      .put(function(request, response) {
        projectCtrlObj.update(request, response);
      })
      .delete(function(request, response) {
        projectCtrlObj.delete(request, response);
    });

    // on routes that end in /credential
    // ----------------------------------------------------
    router.route('/credential')
      .post(function(request, response) {
        credentialCtrlObj.store(request, response);
    });

    router.route('/credential/:id')
      .get(function(request, response) {
        credentialCtrlObj.show(request, response);
      })
      .put(function(request, response) {
        credentialCtrlObj.update(request, response);
      })
      .delete(function(request, response) {
        credentialCtrlObj.delete(request, response);
    });  

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api

    expressApp.use('/api/v1', router);
	}

  applyAuth(expressApp, routes, passport) {
    
    passportHlprObj.callGoogleAuth(passport);
    let authRouter = routes.Router();
        
    authRouter.get('/auth/google', 
      passport.authenticate('google', { scope: ['profile', 'email'] }));

    authRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
      function(request, response) {
        request.session.userId = request.user._id;
        response.redirect('/#/projects');
    });

    expressApp.use(authRouter);
  }

}
module.exports = Router;
