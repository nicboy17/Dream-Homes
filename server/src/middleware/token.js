const jwt = require('jsonwebtoken');

module.exports = (token, res) => {
    jwt.verify (token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status (403).json ({ success: false, message: 'Token invalid' });
        }

        return decoded;
    });
};
