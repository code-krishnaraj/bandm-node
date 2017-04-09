'use strict';

const mongoose = require('mongoose');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const authManager = require('../../../../utils/configManager');
const authCfg = authManager.getConfig('auth');

const userModelObj = require('../models/UserModel');


class PassportHelper {

  callGoogleAuth(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      userModelObj.findById(id, function(err, user) {
        done(err, user);
      });
    });

    passport.use(new googleStrategy({
        clientID: authCfg.GOOGLE.CLIENT_ID,
        clientSecret: authCfg.GOOGLE.CLIENT_SECRET,
        callbackURL: authCfg.GOOGLE.CALLBACK_URL
      }, function(accessToken, refreshToken, profile, done) {
        userModelObj.findOne({google_id: profile.id }, function (err, user) {
          if (err) {
            return done(err)
          }
          if (!user) {
            user = new userModelObj({
                name: profile.displayName,
                google_id: profile.id,
                email: profile.emails[0].value
            });

            user.save(function(err, user) {
                return done(err, user);
            });
          }
          else {
            return done(err, user)
          }
        });
      }
    ));
  }  
}
module.exports = PassportHelper;
