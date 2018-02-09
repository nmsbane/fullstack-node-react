const passport = require("passport");
// we are intrested in getting a Strategy property of passport-google-oauth20
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;
// get the google oauth keys
const keys = require("../config/keys");

passport.use(new GoogleOAuthStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "https://" + process.env.C9_HOSTNAME + "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    console.log(refreshToken);
    console.log(accessToken);
    console.log(profile);
}));
