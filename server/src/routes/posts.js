const express = require('express');
const router = express.Router();

const { User, Board, Post } = require('../models');

const token = require('../middleware/token');

const _ = require('lodash');

//authenticated routes below this middleware
router.use(token());

// @route    GET users/posts
// @desc     Get all posts based on user's interest or filter
// @access   Private
router.get('/', async (req, res) => {
    const {search_filter = '', easy_filters = ''} = req.query;
    try {
        const promises = [
            Post.find({}, (err, post) => {
                if (err) {
                    res.status(500).send('Server Error');
                }
                return post;
            }).sort({ date: -1 }),
            User.findOne({ username: req.decoded.username })
        ];
        let result = await Promise.all(promises);
        let posts = result[0];
        const user = result[1];
        // Filter based on search_filter 
        if(search_filter){
            posts = _.filter(posts, post => post.tags.includes(search_filter.trim()));
            // Further filtering with easy_filters
            if(easy_filters) {
                let easyArr = easy_filters.split(',');
                posts = _.filter(posts, post => {
                    return !_.isEmpty(_.intersection(post.tags, easyArr));
                });
            }
        }
        // Filter based on user's interest
        else if (user.interest) {
            posts = _.filter(posts, post => {
                return !_.isEmpty(_.intersection(post.tags, user.interest));
            });
        }

        res.json(posts);
    } catch (err) {
        res.status(500).send('Something went wrong with the server');
    }
});

module.exports = router;