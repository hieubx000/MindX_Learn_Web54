// xử lý nghiệp vụ
const CommentModel = require('./comment')

const getAllComments = async(req, res) => {
    try {
        const comments = await CommentModel.find().populate({ path: 'postId', select: 'title' }).populate('createdBy', 'username');
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
}

const getComment = async(req, res) => {
    try {
        const { commentId } = req.params;
        const foundComment = await CommentModel.findOne({ _id: commentId })

        res.send({
            success: 1,
            data: foundComment
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
}

const createComment = async(req, res) => {
    try {
        const newCommentContent = req.body

        const newComment = await CommentModel.create(newCommentContent);

        res.send({
            success: 1,
            data: newComment
        })
    } catch (err) {
        res
            .status(400)
            .send({
                success: 00,
                data: null,
                message: err.message || "Something went wrong"
            })
    }
}

const updateComment = async(req, res) => {
    try {
        const { commentId } = req.params;
        const updateCommentContent = req.body;

        const updateComment = await CommentModel.findOneAndUpdate({ _id: commentId }, updateCommentContent, { new: true })

        res.send({
            success: 1,
            data: updateComment
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
}

const deleteComment = async(req, res) => {
    try {
        const { commentId } = req.params;


        const deleteComment = await CommentModel.findOneAndDelete({ _id: commentId })

        res.send({
            success: 1,
            data: deleteComment
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
}

module.exports = {
    getAllComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
}