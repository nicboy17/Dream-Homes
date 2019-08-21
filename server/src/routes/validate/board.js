const validationHandler = require ('./handler');

module.exports = {
    getPosts: (req, res, next) => {
        req.checkParams ('id', 'No id provided').exists ().isMongoId ();

        validationHandler (req, res, next);
    }
};
