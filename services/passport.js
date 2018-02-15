const passport = require("passport");
// we are intrested in getting a Strategy property of passport-google-oauth20
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;
// get the google oauth keys
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model('users');

// user is the final returned user information for DB.
// done is a callback.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleOAuthStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "https://" + process.env.C9_HOSTNAME + "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
            // user already exists in the database
            done(null, existingUser);
        }
        else {
            // user does not already exist, create the entry
            new User({
                googleId: profile.id
            }).save().then(user => {
                done(null, user);
            }); // save will convert the model instance in JS world into mongo world
        }
    })
}));
