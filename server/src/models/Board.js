const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref:'post'
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('board', BoardSchema);