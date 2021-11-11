const express = require('express');
const mongoose = require('mongoose')
const PostRouter = require('./modules/post')
const CommentRouter = require('./modules/comment')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mindx-demo');
    console.log("MongoDB Connected");

    const app = express();
    app.use(express.json());

    app.use('/api/posts', PostRouter)
    app.use('/api/comments', CommentRouter)

    app.listen(9000, (err) => {
        if (err) throw err;

        console.log("Server Connected");
    })
}

main()