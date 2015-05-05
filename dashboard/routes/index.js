var express = require('express');
var steam   = require('../components/steam.js');

var router = express.Router();

STEAM_KEY = require('../keys').steam.simon;
STEAM_ID = '76561197971417897'; // sijoh006

/* GET home page. */
router.get('/', function(req, res, next) {

  steam(STEAM_KEY, STEAM_ID, function (data) {
      res.render('index', { friends: data });
  });
});

module.exports = router;
