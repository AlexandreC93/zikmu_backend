const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/contact', (req, res, next) => {
    res.render('contact')
})

router.post('/contact', authController.contact)

module.exports = router;
