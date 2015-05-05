var request = require('request');

var getPlayerSummary = function(steamKey, steamIDs) {
  return "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+steamKey+"&steamids="+steamIDs;
};

var getFriendsURL = function(steamKey, steamID) {
  return "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+steamKey+"&steamid="+steamID+"&relationship=friend";
};

module.exports = function (steamKey, steamID, clb) {
  var data = [];
  request.get(getFriendsURL(steamKey, steamID), function (err, response, body) {
    if(err) throw new Error(err);

    body = JSON.parse(body);
    var friends = body.friendslist.friends.map(function (friend) {
      return friend.steamid;
    }).join(',');

    request.get(getPlayerSummary(steamKey, friends), function (err, response, body) {
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

      clb(data);
    });
  });
};
