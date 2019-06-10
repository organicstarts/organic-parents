var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var User = require("../models/user");
var configAuth = require("../config/auth");

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new FacebookStrategy({
    clientID: "652118181901206",
    clientSecret: "9ad5d4153ada9ca4640e9c0bd7959725"
  }),
  () => {
    console.log("SUP");
  }
);

exports.module = passport;
