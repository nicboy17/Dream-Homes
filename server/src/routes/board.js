const express = require ('express');
const router = express.Router ();

const BoardValidation = require ('./validate/board');
const { Board } = require ('../models');
const { auth } = require ('../middleware');

// @route    GET boards/:id/posts
// @desc     gets posts from board id
// @access   Private
router.get ('/:id/posts', [BoardValidation.getPosts, async (req, res) => {
    try {
        const board = await Board.findOne({ _id: req.params.id })
            .populate({ path: 'posts', select: 'title image description tags' })
            .lean();
        if (!board) {
            return res.status (404).json ({ success: false, message: 'no board found' });
        } else if (!board.posts.length) {
            return res.status (404).json ({ success: false, message: 'no posts found' });
        }
        return res.status (200).json ({ success: true, board });
    } catch (err) {
        return res.status (400).json ({ success: false, err });
    }
}]);

//authenticated routes below this middleware
router.use(auth);

// @route    PUT boards/:id/post
// @desc     Add post to a board
// @access   Private
router.put('/:id/post', async (req, res) => {
    try {
        const board = await Board.findOneAndUpdate({
            _id: req.params.id,
            user: req.decoded._id
        }, { $addToSet: { posts: req.body.post }} ).lean();
        if (!board) {
            return res.status(404).json({ msg: 'Board not found' });
        }

        res.status(200).json({ success: true, board });
    } catch (err) {
        return res.status(400).json({ err });
    }
});

// @route    PUT boards/:id/remove
// @desc     Remove post from a board
// @access   Private
router.put('/:id/remove', [BoardValidation.removePost, async (req, res) => {
    try {
        const board = await Board.findOneAndUpdate({
            _id: req.params.id,
            user: req.decoded._id
        }, { $pull: { posts: req.body.post } }).lean();
        if (!board) {
            return res.status(404).json({ success: false, message: 'Board not found' });
        }

        res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
}]);

router.delete ('/:id', [BoardValidation.delete, async (req, res) => {
    try {
        const board = await Board.findOneAndDelete ({ _id: req.params.id, user: req.decoded._id }).lean();
        if (!board) {
            return res.status (404).json({ success: false, message: 'no board found' });
        }

        return res.status (204).json({});
    } catch (err) {
        return res.status (400).json({ success: false, err });
    }
}]);

module.exports = router;
