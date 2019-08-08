const express = require('express');
const router = express.Router();

const { User, Post } = require('../models');

const token = require('../middleware/token');

const _ = require('lodash');

//authenticated routes below this middleware
router.use(token());

// @route    GET users/posts
// @desc     Get all posts based on user's interests or filter
// @access   Private
router.get('/', async (req, res) => {
    const { search_filter = '', easy_filters = '' } = req.query;
    try {
        let query;
        let searchTags = [];

        if (search_filter) {
            searchTags = [...searchTags, search_filter];
        }
        if (easy_filters) {
            searchTags = [...searchTags, ...easy_filters.split(',')];
        }

        if (_.isEmpty(searchTags)) {
            const user = await User.findById(req.decoded._id);
            searchTags = [...searchTags, ...user.interests];
            query = { tags: { $in: user.interests } };
        } else {
            query = { tags: { $all: searchTags } };
        }
        const posts = await Post.find(query);
        res.send(posts);
    } catch (err) {
        res.status(500).send('Something went wrong with the server');
    }
});

module.exports = router;
