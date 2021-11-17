const router = require('express').Router();
const commentController = require('./comment.controller')
const isAuth = require("../../common/middlewares/isAuth")
    // tập hợp các api có routing là /api/comments

router.get('/', commentController.getAllComments)
router.get('/:commentId', commentController.getComment)
router.post('/', isAuth, commentController.createComment)
router.put('/:commentId', commentController.updateComment)
router.delete('/:commentId', commentController.deleteComment)

module.exports = router