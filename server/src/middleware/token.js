const jwt = require('jsonwebtoken');
const secret = 'secret';

module.exports = function () {
    return function (req, res, next) {
        const token = req.body.token || req.body.query || req.headers['access-token']; // Check for token in body, URL, or headers

        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.status(403).json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'No token provided' });
        }
    };
};