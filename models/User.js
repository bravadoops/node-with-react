const mongoose = require('mongoose');
const { Schema } = mongoose;
// create schema
const userSchema = new Schema ({
    googleId : String
});

// create models
mongoose.model('users', userSchema);