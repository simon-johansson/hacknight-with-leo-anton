var express = require('express');
var router = express.Router();

var messages = ['one', 'two'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', { messages: messages });
});

router.post('/', function(req, res, next) {
  messages.push(req.body.message);
  res.redirect(req.get('referer'));
});

module.exports = router;
