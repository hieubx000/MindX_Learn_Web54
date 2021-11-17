/*
    // Controller
    Phần để xử lý nghiệp vụ: kết nỗi CSDL 
    tập hợp các nghiệp vụ
 */

const PostModel = require('./post')
const CommentModel = require('../comment/comment')
const UserModel = require("../auth/user")
const jwt = require("jsonwebtoken")

const getAllPosts = async(req, res) => {

    const posts = await PostModel.find();
    res.send({
        success: 1,
        data: posts
    })

};
const getPostById = async(req, res) => {

    const { postId } = req.params;
    const foundPost = await PostModel.findById(postId);
    // const foundPost = await PostModel.findOne({ _id: postId });
    // const foundPost = await PostModel.findOne({ likeCount: 1 });
    res.send({
        success: 1,
        data: foundPost
    })

};
const createPosts = async(req, res) => {

    const { user } = req

    const newPostData = req.body; //imgUrl, title, description, createBy

    //cần phải gửi thông tin để định danh người dùng 
    // username, password để đăng nhập => check người dùng có hay không
    const newPost = await PostModel.create({
        ...newPostData,
        createBy: user._id
    });

    res.send({
        success: 1,
        data: newPost
    })

};
const updatePost = async(req, res) => {

    //chỉ người tạo mới có quyền sửa post
    const { postId } = req.params
    const { user } = req;

    // const existedPost = await PostModel.findById(postId)
    // if (!existedPost) {
    //     throw new Error("Not found post")
    // }
    // if (String(existedPost.createBy) !== String(user._id)) {
    //     throw new Error("Not have permission")
    // }


    const updatePostData = req.body;

    //option { new: true } để kết quả trả về document đã đc update
    // const updatePost = await PostModel.findByIdAndUpdate(postId, updatePostData, { new: true });
    const updatePost = await PostModel.findOneAndUpdate({ _id: postId, createBy: user._id }, updatePostData, { new: true });

    if (!updatePost) {
        throw new Error("Not found post")
    }

    res.send({
        success: 1,
        data: updatePost
    })

};
const deletePost = async(req, res) => {

    const token = req.headers.authorization;
    if (!token) {
        throw new Error("Bạn không có quyền xóa bài post")
    }
    const identityData = jwt.verify(token, "web54")

    const userId = identityData.userId

    //xác thực
    const existedUser = await UserModel.findById(userId)
    console.log(identityData, existedUser);
    //findDB => tìm ra thông tin user
    // phân quyền
    if (!existedUser && existedUser.role !== "admin") {
        throw new Error("Bạn không có quyền xóa bài post")
    }

    const { postId } = req.params

    const deletePost = await PostModel.findByIdAndDelete(postId);

    res.send({
        success: 1,
        data: deletePost
    })

};

const incLikePost = async(req, res) => {

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

};
const getCommentByPost = async(req, res) => {

    const { postId } = req.params;
    const comments = await CommentModel.find({ postId });

    res.send({
        success: 1,
        data: comments
    })

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