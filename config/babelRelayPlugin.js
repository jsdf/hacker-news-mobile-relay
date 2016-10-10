var path = require('path');
var execSync = require('child_process').execSync;
var getBabelRelayPlugin = require('babel-relay-plugin');

var script = path.resolve(__dirname, '../scripts/printJSONSchema.js');
var schemaJSON = execSync(script, {maxBuffer: 1024 * 1024});
var schema = JSON.parse(schemaJSON.toString());

module.exports = getBabelRelayPlugin(schema.data);
