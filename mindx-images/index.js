require('dotenv').config();
const express = require('express');
require("express-async-errors")
const mongoose = require('mongoose')
const PostRouter = require('./modules/post')
const CommentRouter = require('./modules/comment')
const AuthRouter = require('./modules/auth')
const uploadRouter = require('./modules/upload')
const log = require("./common/middlewares/log")
const errorHandler = require("./common/errorHandler")

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const app = express();
    app.use(express.json()); // every request => parse body thành biến JS => gắn field body của request

    app.use(log)

    app.use('/uploads', express.static('uploads'))

    app.use('/api/posts', PostRouter)
    app.use('/api/comments', CommentRouter)
    app.use('/api/auth', AuthRouter)
    app.use('/api/upload', uploadRouter)

    //module router
    // handle error
    app.use(errorHandler)

    app.listen(process.env.PORT || 9000, (err) => {
        if (err) throw err;

        console.log("Server Connected");
    })
}

main()