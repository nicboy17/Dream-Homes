const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Follow = require ('../models/Follow');

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

    async follow () {
        try {
            const count = await Follow.aggregate ([
                {
                    $facet: {
                        'following': [
                            { $match: { follower: this._id } },
                            {
                                $group: {
                                    _id: '$follower',
                                    count: { $sum: 1 }
                                }
                            }
                        ],
                        'followers': [
                            { $match: { followee: this._id } },
                            {
                                $group: {
                                    _id: 'followee',
                                    count: { $sum: 1 }
                                }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        following: { $ifNull: [{ $arrayElemAt: ['$following.count', 0] }, 0] },
                        followers: { $ifNull: [{ $arrayElemAt: ['$followers.count', 0] }, 0] }
                    }
                }
            ]);
            return count[0];
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log (e);
        }
    }

    async following () {
        try {
            const count = await Follow.aggregate ([
                { $match: { follower: this._id } },
                {
                    $group: {
                        _id: '$follower',
                        following: { $push: '$followee' }
                    }
                },
                { $unwind: '$following' },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'following',
                        foreignField: '_id',
                        as: 'following'
                    }
                },
                { $project: { 'following.password': 0, 'following.email': 0 } }
            ]);
            return count[0];
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log (e);
        }
    }

    async followers () {
        try {
            const count = await Follow.aggregate ([
                { $match: { follower: this._id } },
                {
                    $group: {
                        _id: '$followee',
                        followers: { $push: '$follower' }
                    }
                },
                { $unwind: 'followers' },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'followers',
                        foreignField: '_id',
                        as: 'followers'
                    }
                },
                { $project: { 'followers.password': 0, 'followers.email': 0 } }
            ]);
            return count[0];
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log (e);
        }
    }
}

module.exports = UserClass;
