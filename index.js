const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require('cookie-session');
const passport = require("passport");

require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongodbURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// tell passport to make use of cookie based authentication.
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = 8081 || process.env.PORT;

app.listen(PORT);
