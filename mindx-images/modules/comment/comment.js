// Model kết nối CSDL

const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createBy: String,
}, {
    timestamp: true
})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel