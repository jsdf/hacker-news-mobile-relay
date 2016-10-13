var path = require('path');
var spawnSync = require('child_process').spawnSync;

var script = path.resolve(__dirname, '../scripts/printGraphQLSchema.js');

var cache = null
module.exports = function getGraphQLSchema(graphQLEndpoint) {
  console.log('getting', graphQLEndpoint)
  if (!cache) {
    var res = spawnSync(script, [graphQLEndpoint], {
      maxBuffer: 1024 * 1024,
      encoding: 'utf8',
    });
    if (res.status === 0) {
      cache = JSON.parse(res.stdout.toString());
    } else {
      throw new Error(res.stderr);
    }
  }
  return cache;
}
