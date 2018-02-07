const express = require("express");
const app = express();
const passport = require("passport");
// we are intrested in getting a Strategy property of passport-google-oauth20
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;
// get the google oauth keys
const keys = require("./config/keys");


passport.use(new GoogleOAuthStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken) => {
    console.log(accessToken);
}));

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

const PORT = process.env.PORT || 8080;

app.listen(PORT);
