/*
    // Controller
    Phần để xử lý nghiệp vụ: kết nỗi CSDL 
    tập hợp các nghiệp vụ
 */

const PostModel = require('./post')
const CommentModel = require('../comment/comment')

const getAllPosts = async(req, res) => {
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
};
const getPostById = async(req, res) => {
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
};
const createPosts = async(req, res) => {
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
};
const updatePost = async(req, res) => {
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
};
const deletePost = async(req, res) => {
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
};

const incLikePost = async(req, res) => {
    try {
        const { postId } = req.params;
        // lấy ra post => 3
        // đã có lient khác gọi API inc like =>4
        // +1 => +1 vào giá trị 3
        // save 4
        // xử lý tương tranh

        const updatePost = await PostModel
            .findOneAndUpdate({ _id: postId }, { $inc: { likeCount: 1 } }, { new: true });

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
};
const getCommentByPost = async(req, res) => {
    try {
        const { postId } = req.params;
        const comments = await CommentModel.find({ postId });

        res.send({
            success: 1,
            data: comments
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
};

module.exports = {
    getAllPosts,
    getPostById,
    createPosts,
    updatePost,
    deletePost,
    incLikePost,
    getCommentByPost
}