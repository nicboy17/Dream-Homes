const express = require ('express');
const router = express.Router ();

const BoardValidation = require ('./validate/board');
const { Board } = require ('../models');
const { auth } = require ('../middleware');

//authenticated routes below this middleware
router.use (auth);

// @route    POST boards/:id/posts
// @desc     gets posts from board id
// @access   Private
router.get ('/:id/posts', [BoardValidation.getPosts, async (req, res) => {
    try {
        const board = await Board.findOne ({
            _id: req.params.id,
            user: req.decoded._id
        }).populate ('posts', 'title image description tags').lean ();
        if (!board) {
            return res.status (404).json ({ success: false, message: 'no board found' });
        } else if (!board.posts.length) {
            return res.status (404).json ({ success: false, message: 'no posts found' });
        }
        
        return res.status (200).json ({ success: true, posts: board.posts });
    } catch (err) {
        return res.status (400).json ({ success: false, err });
    }
}]);

module.exports = router;
