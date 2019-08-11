const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserClass {
    async comparePassword(password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (err) {
            return false;
        }
    };

    loginToken() {
        return jwt.sign({
            _id: this._id,
            username: this.username,
        }, process.env.SECRET, { expiresIn: '24hr' });
    };

    static registerError(error) {
        let message = '';

        if ('username' in error && 'email' in error) {
            message = 'username and email already taken';
        } else if ('username' in error) {
            message = 'username already taken';
        } else if ('email' in error) {
            message = 'email already taken';
        } else {
            message = 'server error, please try again later';
        }
        return message;
    }
}

module.exports = UserClass;