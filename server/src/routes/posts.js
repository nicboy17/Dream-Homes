const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId; 
const { User, Post } = require('../models');

const _ = require('lodash');

// @route    GET users/posts
// @desc     Get all posts based on user's interests or filter
// @access   Public
router.get('/', async (req, res) => {
    const { search_filter = '', easy_filters = '', userId = ''} = req.query;
    try {
        let query;
        let searchTags = [];

        if (search_filter) {
            searchTags = [...searchTags, search_filter];
        }
        if (easy_filters) {
            searchTags = [...searchTags, ...easy_filters.split(',')];
        }
        // If logged in with empty search
        if (_.isEmpty(searchTags) && userId) {
            // Get user's interest and add interest into search tags
            const user = await User.findById(ObjectId(userId));
            searchTags = [...searchTags, ...user.interests];
            query = { tags: { $in: user.interests } };
        }
        // Search by filters if present
        else if (!_.isEmpty(searchTags)) {
            query = { tags: { $all: searchTags } };
        // If not logged in will return a bunch of posts
        } else {
            query = {};
        }
        const posts = await Post.find(query);
        res.send(posts);
    } catch (err) {
        res.status(500).send('Something went wrong with the server');
    }
});

module.exports = router;
