const express = require('express');
const router = express.Router();
const { User, Post, Board } = require('../models');
const { auth, pub } = require ('../middleware');
const PostValidation = require ('./validate/post');

// @route    GET users/posts
// @desc     Get all posts based on user's interests or filter
// @access   Public
router.get ('/', [pub, async (req, res) => {
    let { search = '', filters = ''} = req.query;
    let query = {};
    let user = { interests:[] };
    if (req.decoded) { user = await User.findById(req.decoded._id).lean(); }
    if (search) { search = [...search.split(' '), ...user.interests]; }
    if (filters) { filters = [...filters.split(',')]; }

    if (search.length > 0) {
        query.tags = { $in: search };
    }
    if (filters.length > 0) {
        query.tags = { $all: filters };
    }
    if(search.length > 0 && filters.length > 0) {
        query = { $and: [ {tags: { $in: search }}, {tags: { $all: filters }} ] };
    }

    try {
        const posts = await Post.find(query).populate('user', 'username name profile').lean();
        return res.status(200).json({ success: true, posts });
    } catch (err) {
        return res.status(400).json({ err });
    }
}]);

//authenticated routes below this middleware
router.use (auth);

router.delete ('/:id', [PostValidation.delete, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete ({
            _id: req.params.id,
            user: req.decoded._id
        }).lean ();
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const board = await Board.updateMany({
            posts: req.params.id
        }, { 'pull': { posts: req.body.post } }).lean();
        if (!board) {
            return res.status(404).json({ success: false, message: 'Board not found' });
        }

        return res.status (204).json ({});
    } catch (err) {
        return res.status (400).json ({ success: false, err });
    }
}]);

module.exports = router;
