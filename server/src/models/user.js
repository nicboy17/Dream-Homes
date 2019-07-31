const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userValidator = require('./validate/user');
const UserClass = require('../services/user');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: userValidator.name
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: userValidator.username
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: userValidator.email
    },
    password: {
        type: String,
        required: true,
        validate: userValidator.password
    },
});

user.pre('save', function (next) {
    let user = this;

    bcrypt.hash(user.password, 10, function(err, hash) {
        // if (err) console.log(err);
        user.password = hash;
        next();
    });
});

user.loadClass(UserClass);
module.exports = mongoose.model('users', user, 'users');