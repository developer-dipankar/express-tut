const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;

const bcrypt = require('bcrypt');

const Users = require('../models/User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  Users.findOne({email})
    .then((user) => {
      if(!user) {
        return done('Invalid email id', false);
      }
      if(!bcrypt.compareSync(password, user.password)){
        return done('Incorrect Password', false);
      }

      return done('Login Successfully', user);
    }).catch(done);
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: '1939053793043063',
  clientSecret: 'bf25ad9e08f883c6b55bd927da5f6e88',
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate(..., function(err, user) {
  //   if (err) { return done(err); }
  //   done(null, user);
  // });
  console.log(accessToken, refreshToken, profile);
}
));