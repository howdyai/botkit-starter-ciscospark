var request = require('request');
var debug = require('debug')('botkit:subscribe_events');

module.exports = function(controller) {

    debug('Subscribing to Cisco webhook events...');

    var webhook_name = controller.config.webhook_name || 'Botkit Firehose';

    var list = controller.api.webhooks.list().then(function(list) {
        var hook_id = null;

        for (var i = 0; i < list.items.length; i++) {
            if (list.items[i].name == webhook_name) {
                hook_id = list.items[i].id;
            }
        }

        var hook_url = 'https://' + controller.config.public_address + '/ciscospark/receive';

        debug('Cisco Spark: incoming webhook url is ', hook_url);

        if (hook_id) {
            controller.api.webhooks.update({
                id: hook_id,
                resource: 'all',
                targetUrl: hook_url,
                event: 'all',
                secret: controller.config.secret,
                name: webhook_name,
            }).then(function(res) {
                debug('Cisco Spark: SUCCESSFULLY UPDATED CISCO SPARK WEBHOOKS');
            }).catch(function(err) {
                debug('FAILED TO REGISTER WEBHOOK', err);
                throw new Error(err);
            });

        } else {
            controller.api.webhooks.create({
                resource: 'all',
                targetUrl: hook_url,
                event: 'all',
                secret: controller.config.secret,
                name: webhook_name,
            }).then(function(res) {

                debug('Cisco Spark: SUCCESSFULLY REGISTERED CISCO SPARK WEBHOOKS');
            }).catch(function(err) {
                debug('FAILED TO REGISTER WEBHOOK', err);
                throw new Error(err);
            });

        }
    });
};
