const passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
keys = require('../config/key');

passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  // function after receive details of user from google
  function(accessToken, refreshToken, profile) {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
  }
));
