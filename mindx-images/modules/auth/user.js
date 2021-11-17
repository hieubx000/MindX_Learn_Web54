const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel