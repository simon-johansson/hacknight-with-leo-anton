var express = require('express');
var request = require('request');
var router = express.Router();

STEAM_KEY = require('../keys').STEAM;
STEAM_ID = '76561197971417897'; // sijoh006

var getPlayerSummary = function(steamID) {
  return "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+STEAM_KEY+"&steamids="+steamID;
};

var getFriendsURL = function(steamID) {
  return "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+STEAM_KEY+"&steamid="+steamID+"&relationship=friend";
};

/* GET home page. */
router.get('/', function(req, res, next) {

  var data = [];
  request.get(getFriendsURL(STEAM_ID), function (err, response, body) {
    if(err) throw new Error(err);

    body = JSON.parse(body);

    var friends = body.friendslist.friends.map(function (friend) {
      return friend.steamid;
    }).join(',');

    request.get(getPlayerSummary(friends), function (err, response, body) {
      if(err) throw new Error(err);

      body = JSON.parse(body);
      body.response.players.map(function (friend) {
        var obj = {};
        obj.personaname = friend.personaname;
        obj.avatarfull = friend.avatarfull;
        obj.realname = friend.realname;
        obj.personastate = friend.personastate;

        data.push(obj);
      });

    res.render('index', { friends: data });
    });
  });
});

module.exports = router;
