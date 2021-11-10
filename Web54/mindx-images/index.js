const mongoose = require('mongoose');
const express = require('express');

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
})

const CommentSchema = new mongoose.Schema({
    content: String,
    createBy: String,
    //postId tương đương với _id của Post
    postId: mongoose.Types.ObjectId,
}, {
    timestamps: true
})

const PostModel = mongoose.model('Post', PostSchema)

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mindx-demo');
    console.log("MongoDB Connected");

    const app = express();
    app.use(express.json());

    // lấy toàn bộ bài posts
    app.get('/api/posts', async(req, res) => {
        try {
            const posts = await PostModel.find();
            res.send({
                success: 1,
                data: posts
            })
        } catch (err) {
            res
                .status(400)
                .send({
                    success: 0,
                    data: null,
                    message: err.message || "Something went wrong"
                })
        }
    });
    // lấy 1 bài post theo id
    app.get('/api/posts/:postId', async(req, res) => {
        try {
            const { postId } = req.params;
            const foundPost = await PostModel.findById(postId);
            // const foundPost = await PostModel.findOne({ _id: postId });
            // const foundPost = await PostModel.findOne({ likeCount: 1 });
            res.send({
                success: 1,
                data: foundPost
            })
        } catch (err) {
            res
                .status(400)
                .send({
                    success: 0,
                    data: null,
                    message: err.message || "Something went wrong"
                })
        }
    });
    // create post
    app.post('/api/posts/', async(req, res) => {
        try {
            const newPostData = req.body;

            const newPost = await PostModel.create(newPostData);

            res.send({
                success: 1,
                data: newPost
            })
        } catch (err) {
            res
                .status(400)
                .send({
                    success: 0,
                    data: null,
                    message: err.message || "Something went wrong"
                })
        }
    });
    // update post
    app.put('/api/posts/:postId', async(req, res) => {
        try {
            const { postId } = req.params
            const updatePostData = req.body;

            //option { new: true } để kết quả trả về document đã đc update
            const updatePost = await PostModel.findByIdAndUpdate(postId, updatePostData, { new: true });
            // const updatePost = await PostModel.findOneAndUpdate({_id: postId}, updatePostData, { new: true });
            res.send({
                success: 1,
                data: updatePost
            })
        } catch (err) {
            res
                .status(400)
                .send({
                    success: 0,
                    data: null,
                    message: err.message || "Something went wrong"
                })
        }
    });
    // delete post
    app.delete('/api/posts/:postId', async(req, res) => {
        try {
            const { postId } = req.params

            const deletePost = await PostModel.findByIdAndDelete(postId);

            res.send({
                success: 1,
                data: deletePost
            })
        } catch (err) {
            res
                .status(400)
                .send({
                    success: 0,
                    data: null,
                    message: err.message || "Something went wrong"
                })
        }
    });

    app.get('/api/post/:postId/comments', async(req, res) => {

    })

    app.put('/api/posts/:postId/like', (req, res) => {
        //yêu cầu người dùng gửi lên like => tăng like count trong document
        // tìm hiểu $inc trong mongodb
    })

    app.listen(9000, (err) => {
        if (err) throw err;

        console.log("Server Connected");
    })
}

main()

//user Story

//mindx images
// là gì, có thể làm gì, để làm gì
// là khách, có thể xem toàn bộ vài post, để lấy thông tin
// là khách có thể đăng ký
// là khách có thể đăng nhập

// là người dùng có thể like
// là người dùng có thể tạo bài post
//...