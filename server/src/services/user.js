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
}

module.exports = UserClass;