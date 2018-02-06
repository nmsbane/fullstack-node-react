const express = require("express");
const app = express();

const passport = require("passport");
// we are intrested in getting a Strategy property of passport-google-oauth20
const GoogleOAuthStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleOAuthStrategy());

const PORT = process.env.PORT || 8080;

app.listen(PORT);
