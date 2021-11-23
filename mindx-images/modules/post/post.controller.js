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
    // const filter = {
    //     // createdBy: '618ce5f1c04a8b2549c456ef',
    //     likeCount: 2
    // }

    // const filter = {
    //     likeCount: { $ne: 2 }
    // }

    // const filter = {
    //     createdBy: { $ne: '618ce5f1c04a8b2549c456ef' }
    // }
    // const filter = {
    //     title: { $nin: ['Mặt trời', 'Mặt trăng'] }
    // }
    // const filter = {
    //     likeCount: { $lte: 3 }
    // }
    const { keyword, createdBy, tag, skip, limit, sortDirection, sortField } = req.query
        //cách serch không dấu
        // title => slug(title) => mat-troi (slug)
        // keyword => slug(keyword) => trời => troi
        // {slug: { $regex: new RegExp(slug(keyword))}}

    // chuỗi có keyword ở bất cứ vị trí nào
    //title: { $regex: new RegExp(keyword, 'i') }
    // chuỗi có keyword ở vị trí đầu
    // title: { $regex: new RegExp(`^${keyword}`, 'i') }
    // chuỗi có keyword ở vị trí cuối
    // title: { $regex: new RegExp(`${keyword}$`, 'i') }

    const createdByFilter = createdBy ? { createdBy } : {};
    const keywordFilter = keyword ? {
        $or: [
            { title: { $regex: new RegExp(`${keyword}`, 'i') } },
            { description: { $regex: new RegExp(`${keyword}`, 'i') } }
        ]
    } : {}
    const tagFilter = tag ? { tags: tag } : {}

    const filter = {
        ...createdByFilter,
        ...keywordFilter,
        ...tagFilter
    };
    // console.log(filter);

    //aggregate không tự động parse string sang object
    //hàm find, findOne, find... là tự động parse string có dạng Id sang ObjectId để so sánh

    const pagination = {
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 4
    }

    /* SKIP - LIMIT */
    //  page bắt đầu từ 1
    // page = 1, skip 0, limit = pageOfSize = 4; => 0, 1, 2, 3
    // page = 2, skip = 4, limit = 4 => 4, 5, 6, 7
    // page = 3, skip = 8, limit = 4 => 8, 9, 10, 11 
    // skip = (page - 1) * pageOfSize
    // limit = pageOfSize
    // trách nhiệm tính skip và limit để cho client

    // tổng số là 26
    // pageOfSize là 4
    // maxSize = Math.ceil(total / pageOfSize) // làm tròn lên

    // nhận xét: tìm post thep curent page, 
    // tìm tổng sốp posts là 2 câu lệnh k liên quan lẫn nhau
    // có nhu cầu gọi song song
    // const posts = await PostModel
    //     .find(filter)
    //     .skip(pagination.skip)
    //     .limit(pagination.limit);
    // const totalPosts = await PostModel.find(filter).countDocuments();

    /* SORT */
    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortParams = sortField ? {
        [sortField]: sortDirectionParams
    } : {}

    console.log("hi", sortDirectionParams);
    // const sortDirection = sortCreateAt ? Number(sortCreateAt) : -1;
    const [posts, totalPosts] = await Promise.all([
        PostModel
        .find(filter)
        .populate('createdBy', '-password -__v')
        .populate({ // populate ngược => virtual field
            path: 'comments',
            populate: {
                path: 'createdBy',
                select: 'username' // populate multi level
            }
        })
        .sort(sortParams)
        .skip(pagination.skip)
        .limit(pagination.limit),
        PostModel.find(filter).countDocuments()
    ]);
    // $lookup trong mongodb

    res.send({
        success: 1,
        data: posts,
        total: totalPosts
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