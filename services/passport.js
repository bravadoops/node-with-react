const passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
keys = require('../config/key');
const mongoose = require('mongoose');
const User = mongoose.model('users')// not use require('../models/User');
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  // search id in database
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true // for dealing with redict to HTTP issue
  },
  // function after receive details of user from google
  function(accessToken, refreshToken, profile, done) {
    // create model instance and save to db
    User.findOne({ googleId : profile.id })
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        new User({ googleId : profile.id })
          .save()
          .then( u => done(null, u));
      }
    });
  }
));
