/*
    // Router
    để chỉ định với đường dẫn nào sử dụng controller đấy
*/

const router = require('express').Router(); // khởi tạo object
const postController = require('./post.controller');

// Router tập hợp các routing có tiền tố /api/posts
router.get('/', postController.getAllPosts)
router.get('/:postId/', postController.getPostById)
router.post('/', postController.createPosts)
router.put('/:postId/', postController.updatePost)
router.delete('/:postId/', postController.deletePost)
router.put('/:postId/like', postController.incLikePost)
router.get('/:postId/comments', postController.getCommentByPost)

module.exports = router;