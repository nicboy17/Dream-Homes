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
        res.status(400).json({ success: false, message: err.errors });
    }
}]);

router.post('/login', [UserValidation.login, async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).exec();
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


// @route    POST users/:username/favourite
// @desc     Add post to user's favourites
// @access   Private
router.post ('/:username/favourite', [UserValidation.addPostToFavourites, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate (req.decoded._id, { '$addToSet': { posts: req.body.post } }, { 'new': true }).lean ();
        if (!user) {
            return res.status (404).json ({ success: false, message: 'User not found' });
        }

        res.status (201).json ({ success: true });
    } catch (err) {
        return res.status (400).json ({ success: false, err });
    }
}]);

// @route    PUT users/:username/interests
// @desc     Update user with interests
// @access   Private
router.put('/:username/interests', async (req,res) => {
    try {
        let user = await User.findOne({username: req.params.username}); 
        if(user._id.toString() !== req.decoded._id.toString()) {
            return res.status(401).json({msg: 'You do not have the authorization to do this'});
        }
        if(!user) {
            return res.status(404).json({msg: 'User not found'});
        }
        user.interests = (req.body.interests);
        await user.save();
        res.json(user);
    } catch (err) {
        // Check to see if it is a valid object id
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'The user does not exist'});
        }
        return res.status(500).send('Server Error');
    }
});

// @route    PUT users/board/:id
// @desc     Update posts in a board
// @access   Private
router.put('/board/:id', async (req,res) => {
    try {
        const board = await Board.findById(req.params.id);
        if(board.user.toString() !== req.decoded.users._id.toString()) {
            return res.status(404).json({msg: 'You do not have the authorization to add to this board'});
        }
        // Check to see if there is a board with that id
        if(!board) {
            return res.status(404).json({msg: 'Board not found'});
        }
        // Check to see if post has already been added to board
        if (
            board.posts.filter(post => post.toString() === req.body._id).length > 0
        ) {
            return res.status(400).json({ msg: 'Post has already been added to the board' });
        }
        board.posts.unshift(req.body._id);
        await board.save();
        res.json(board);
    } catch (err) {
        // Check to see if it is a valid object id 
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'The board or post does not exist'});
        }
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
