const validationHandler = require ('./handler');

module.exports = {
    getPosts: (req, res, next) => {
        req.checkParams ('user_id', 'No id provided').exists ().isMongoId ();
        req.checkParams ('board_id', 'No id provided').exists ().isMongoId ();

        validationHandler (req, res, next);
    }
};
