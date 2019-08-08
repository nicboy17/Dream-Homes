const express = require('express');
const router = express.Router();

const UserValidation = require('./validate/user');
const { User, Board, Post } = require('../models');
const upload = require('../services/file-upload');
const token = require('../middleware/token');

router.post('/register', [UserValidation.register, async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user, token: user.loginToken() });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
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

//authenticated routes below this middleware
router.use(token());

// @route    GET users/:username
// @desc     Get user profile with all their posts and boards
// @access   Private
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password').populate('boards').populate('posts').lean();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, user });
    } catch (err) {
        return res.status(400).json({ success: false, message: err });
    }
});

router.put('/:username', [upload.single('image'), UserValidation.updateUser, async (req, res) => {
    let update = {};
    if(req.file) { update.profile = req.file.location; }
    if (req.body.name) { update.name = req.body.name; }
    try {
        const user = await User.findOneAndUpdate({ username: req.params.username }, update, {new:true}).select('-password').lean();
        if(!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, user });
    } catch (err) {
        return res.status(400).json({err});
    }
}]);
      
router.post('/:username/board', [UserValidation.addBoard, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('_id').lean();
        if (!user) {
            return res.status(404).json({ success: false, message: 'no user found' });
        }
        const board = await Board.create({
            title: req.body.title,
            user: user._id
        });
        return res.status(201).json({ success: true, board });
    } catch(err) {
        return res.status(400).json({ success: false, message: err.errmsg });
    }
}]);

router.post('/:username/posts', [upload.single('image'), UserValidation.addPost, async (req, res) => {
    const user = await User.findOne({ username: req.params.username }).select('_id').lean();
    if (!user) {
        return res.status(404).json({ success: false, message: 'no user found' });
    }
    if (req.file) {
        try {
            const post = await Post.create({ ...req.body, user: user._id, image: req.file.location });
            return res.status(201).json({ success: true, post });
        } catch(err) {
            return res.status(400).json({err});
        }
    } else {
        return res.status(400).json({ success: false, message: 'no file provided' });
    }
}]);

module.exports = router;
