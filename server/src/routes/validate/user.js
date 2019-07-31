const validationHandler = require('./handler');

module.exports = {
    register : (req, res, next) => {
        req.checkBody('name', 'no name provided').exists().notEmpty();
        req.checkBody('username', 'No username provided').exists().notEmpty();
        req.checkBody('email', 'No email provided').exists().notEmpty();
        req.checkBody('password', 'No password provided').exists().notEmpty();

        validationHandler(req, res, next);
    },

    login: (req, res, next) => {
        req.checkBody('username', 'No username provided').exists().notEmpty();
        req.checkBody('password', 'No password provided').exists().notEmpty();

        validationHandler(req, res, next);
    },

    addBoard: (req, res, next) => {
        req.checkBody('title', 'No title provided').exists().notEmpty();

        validationHandler(req, res, next);
    }
};
