/**
 * @description     Specifies the port the server listens
 *                  and initializes the API routes.
 *
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Router = require('./router');
const path = require('path');
const logger = require('../../utils/logger');
const configManager = require('../../utils/configManager');
const appCfg = configManager.getConfig('app');

class Server {

  constructor() {

    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    this.serverInstance = null;
    
  }

  initRoutes() {
    let router = new Router();
    router.index(this.app);
    router.applyAuth(this.app, express, passport);
    router.applyCommon(this.app, express);
    return this;
  }

  listen(port) {
    this.port = port;
    try {
      this.serverInstance = this.app.listen(this.port);
      logger.info(`API server is listening on port ${this.port}`);
    } catch (error) {
      logger.info(`Error while listening to the port ${this.port}`);
    }
    return this;
  }
  
  start(done) {
    this.initRoutes();
    this.connectToDb(function (success, err) {
      if (success) {
        this.listen(appCfg.server.port);
        done(null);
      } else {
        done(err);
      }
    }.bind(this));
  }


  stop(done) {
    if (this.dbInstance) {
      logger.info('Disconnecting from DB ...');
      this.dbInstance.end();
    }
    logger.info('Shutting down API server...');
    this.serverInstance.close();
    done();
  }

  connectToDb(done) {
    this.dbInstance = new Sequelize(appCfg.db.database, appCfg.db.user, appCfg.db.password, {
      host: appCfg.db.host,
      dialect: appCfg.db.name,
      pool: {
        max: appCfg.db.max,
        min: appCfg.db.min,
        idle: appCfg.db.idle
      }
    });

    this.dbInstance.sync().then(function(){
      done(true,null)
    }, function(err){
      done(err,null)
    });
  }

}
module.exports = Server;
