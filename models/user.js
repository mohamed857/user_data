const mongoose = require('mongoose')
const User = mongoose.model('user', {
    name: String,
    latsName: String,
    age: Number,
    email: String,
    password: String
} );

module.exports = User;  