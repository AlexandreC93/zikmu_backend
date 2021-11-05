const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controllers.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('post');
});

router.get('/submit', function(req, res, next) {
  res.render('submit');
});

router.post('/submit',postController.submit)

module.exports = router;
