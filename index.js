var request = require('request');
var util = require('util');
var _ = require('lodash');

// exports
//////////

var HipChatNotifier = function(room, token, from, host){
  this.room = room;
  this.token = token;
  this.from = from || '';
  this.host = host || 'api.hipchat.com';
};

module.exports = {
  'make': function(room, token, from, host){
    return new HipChatNotifier(room, token, from, host);
  }
};

// convenience
//////////////

HipChatNotifier.prototype.notice = function(message, callback){
  this.send.call(this, {'message': message, 'color': 'gray'}, callback);
};

HipChatNotifier.prototype.info = function(message, callback){
  this.send.call(this, {'message': message, 'color': 'yellow'}, callback);
};

HipChatNotifier.prototype.success = function(message, callback){
  this.send.call(this, {'message': message, 'color': 'green'}, callback);
};

HipChatNotifier.prototype.warning = function(message, callback){
  this.send.call(this, {'message': message, 'color': 'purple'}, callback);
};

HipChatNotifier.prototype.failure = function(message, callback){
  this.send.call(this, {'message': message, 'color': 'red'}, callback);
};


// prepare and send notification -- for body params, see:
//   https://www.hipchat.com/docs/apiv2/method/send_room_notification

HipChatNotifier.prototype.send = function(jsonBody, callback){

  if(!this.room) { throw new Error('hipchat-notifier: missing room'); }
  if(!this.token) { throw new Error('hipchat-notifier: missing token'); }

  var defaults = {
    message: 'bonjour!',
    from: this.from,
    color: 'random',
    message_format: /<[a-z][\s\S]*>/i.test(jsonBody.message) ? 'html' : 'text',
    notify: false
  };

  request({
    method: 'POST',
    uri: util.format('https://%s/v2/room/%s/notification', this.host, this.room),
    auth: {
      bearer: this.token
    },
    json: _.assign(defaults, jsonBody),
  }, function(err, res, body){
    if(callback) {
      callback(err, res, body);
    }
  });
};

// gettersetters
////////////////

HipChatNotifier.prototype.setFrom = function(from){
  this.from = from;
};

HipChatNotifier.prototype.setRoom = function(room_id_or_name){
  this.room = room_id_or_name;
};

HipChatNotifier.prototype.setToken = function(token){
  this.token = token;
};
