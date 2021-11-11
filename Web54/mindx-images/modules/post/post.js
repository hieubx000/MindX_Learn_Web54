/*
    // Model
    phần để kết nối tới mongoDB server 

    // VD dùng mysql
    // thò ra hàm find là controller k phải thay đổi
 */

const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createBy: String
}, {
    timestamps: true
        // createAt, UpdatedAt
})

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel;