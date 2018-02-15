const mongoose = require("mongoose");
const { Schema } = mongoose; // ES6 shor hand
// or const Schema = mongoose.Schema.

const userSchema = new Schema({
    googleId: String
})

mongoose.model('users', userSchema);
