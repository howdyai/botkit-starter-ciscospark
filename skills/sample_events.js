module.exports = function(controller) {


  controller.on('bot_space_join', function(bot, message) {

    bot.reply(message, 'I am a bot, here to do your bidding.');

  });

  controller.on('user_space_join', function(bot, message) {

    bot.reply(message, 'Hello, ' + message.original_message.data.personDisplayName);

  });


};
