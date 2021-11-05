const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers.js')
const eventController = require('../controllers/event.controllers')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('event');
});

router.get('/form', (req, res, next) => {
    res.render('eventForm')
})

router.post('/form', eventController.create)

module.exports = router;
