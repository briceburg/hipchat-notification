// set the following environmental variables before executing;
//  HIPCHAT_TOKEN
//  HIPCHAT_ROOM


// instantiate a hipchat-notifier
var hipchat = require('hipchat-notifier').make(
  process.env.HIPCHAT_ROOM,
  process.env.HIPCHAT_TOKEN
);

// the pyramid of doom example, calls to hipchat are serial
hipchat.notice('this is a .notice()', function(err, response, body){
  hipchat.info('this is a .info()', function(err, response, body){
    hipchat.success('this is a .success()', function(err, response, body){
      hipchat.warning('this is a .warning()', function(err, response, body){
        hipchat.failure('this is a .failure()', function(err, response, body){

          // random color html message with callback
          //  supports cards &c, see:
          //    https://www.hipchat.com/docs/apiv2/method/send_room_notification

          var body = {
            from: 'random color label',
            message: '<p><em>this message</em> is a random color',
            color: 'random'
          };

          hipchat.send(body);

          // getters and setters are supported
          hipchat.setFrom('setter label');
          hipchat.notice('from setter label');

        });
      });
    });
  });
});
