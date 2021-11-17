const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controllers.js')
const { multerSingle } = require('../middlewares/multer.js')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('post');
});
router.get('/all', postController.readPost)
router.get('/submit', function (req, res, next) {
    res.render('submit');
});

router.put('/:id', postController.updatePost)

router.post('/submit', multerSingle, postController.createPost)

router.delete('/:id', postController.deletePost)

router.patch('/like-post/:id', postController.likePost)
router.patch('/unlike-post/:id', postController.unlikePost)
router.patch('/comment-post/:id', postController.commentPost)
router.patch('/edit-comment-post/:id', postController.editCommentPost)
router.patch('/delete-comment-post/:id', postController.deleteCommentPost)

module.exports = router;
