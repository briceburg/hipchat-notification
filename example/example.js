// set the following environmental variables before executing;
//  HIPCHAT_TOKEN
//  HIPCHAT_ROOM

//var hipchat = require('hipchat-notifier').make(
var hipchat = require('../index.js').make(
  process.env.HIPCHAT_ROOM,
  process.env.HIPCHAT_TOKEN
);


hipchat.notice('this is a .notice()');
hipchat.info('this is a .info()');
hipchat.success('this is a .success()');
hipchat.warning('this is a .warning()');
hipchat.failure('this is a .failure()');


// random color html message with callback
//  supports cards &c, see:
//    https://www.hipchat.com/docs/apiv2/method/send_room_notification

var body = {
  from: 'hipchat notifier',
  message: '<p><em>this message</em> is a random color',
  color: 'random'
};

hipchat.send(body, function(err, response, body){
  console.log('NOTIFIER CALLBACK!', response);
});


// getters and setters are supported
hipchat.setFrom('hipchat notifier deux');
hipchat.notice('from deux');
