const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        // ref to user model
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    tags: {
        type: [String]
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', PostSchema);