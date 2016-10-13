var getBabelRelayPlugin = require('babel-relay-plugin');
var getGraphQLSchema = require('./getGraphQLSchema');
var relayConfig = require('./relayConfig');

var schema = getGraphQLSchema(relayConfig.development.graphQLEndpoint);

module.exports = getBabelRelayPlugin(schema.data);
