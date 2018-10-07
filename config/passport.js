const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
var express = require('express');
var app = express();
// const env = require('./env.json');

const bcrypt = require('bcrypt');

const User = require('../models/User');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({email})
    .then((user) => {
      log.info(user);
      if(!user) {
        return done('Invalid email id', false);
      }
      if(!user.validatePassword(password)){
        return done('Incorrect Password', false);
      }
      return done(null, user);
    }).catch(done);
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: env.facebook_auth.clientID,
  clientSecret: env.facebook_auth.clientSecret,
  callbackURL: env.facebook_auth.callbackURL,
  profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, done) => {
  console.log('profile', profile);
  User.findOne({email: profile.emails[0].value}, function(err, user) {
    if(err){
      console.log('err', err);
      return done(err);
    }
    if(!user){
        var user = new User;
        user.name = profile.name.givenName+' '+profile.name.familyName;
        user.email = profile.emails[0].value;
        user.password = '123456';
        user.type = 'client';
        var error = user.validateSync();
        
        if(error){
          console.log('validation error', error);
          return done(error);
        } else {
          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        }
    } else {
        console.log(err, user);
        return done(err, user);
    }
  });
}
));