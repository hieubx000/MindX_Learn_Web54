/*
    // Router
    để chỉ định với đường dẫn nào sử dụng controller đấy
*/

const router = require('express').Router(); // khởi tạo object
const postController = require('./post.controller');
const isAuth = require("../../common/middlewares/isAuth")

// Router tập hợp các routing có tiền tố /api/posts
router.get('/', postController.getAllPosts)
router.get('/:postId/', postController.getPostById)
router.post('/', isAuth, postController.createPosts)
router.put('/:postId/', isAuth, postController.updatePost)
router.delete('/:postId/', isAuth, postController.deletePost)
router.put('/:postId/like', isAuth, postController.incLikePost)
router.get('/:postId/comments', postController.getCommentByPost)

module.exports = router;