const express = require('express'),
passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
app = express(),
keys = require('./config/key');

// client id
// client secret

passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    googleClientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  // error handle function
  function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
  }
));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
