
const debug = require('debug')('talk:graph:typeDefs');
const plugins = require('../../services/plugins');

// Core subscription resolvers
const Subscription = {};

// Add subscription resolvers from Plugins
plugins.get('server', 'subscriptionResolvers').map(({plugin, subscriptionResolvers}) => {
  debug(`added plugin '${plugin.name}'`);

  for (i in subscriptionResolvers) {
    Subscription[i] = subscriptionResolvers[i];
  }

  return;
})

module.exports = Subscription;
