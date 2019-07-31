const express = require('express');
const router = express.Router();

const UserValidation = require('./validate/user');
const User = require('../models/user');

router.post('/register', [UserValidation.register, async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user, token: user.loginToken() });
    } catch (err) {
        res.status(400).json({ success: false, message: err.errmsg });
    }
}]);

router.post('/login', [UserValidation.login, async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
        res.status(400).json({ success: false, message: 'Could not authenticate' });
    } else {
        const validPassword = await user.comparePassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ success: false, message: 'Could not authenticate' });
        } else {
            res.status(200).json({ success: true, user, token: user.loginToken() });
        }
    }
}]);

module.exports = router;