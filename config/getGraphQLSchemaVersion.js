var path = require('path');
var execSync = require('child_process').execSync;
var crypto = require('crypto');

var script = path.resolve(__dirname, '../scripts/printJSONSchema.js');

function digest(content) {
  var shasum = crypto.createHash('sha1');
  shasum.update(content);
  return shasum.digest('hex');
}

module.exports = function getGraphQLSchemaVersion() {
  var schemaJSON = execSync(script, {maxBuffer: 1024 * 1024});
  return digest(schemaJSON);
}
