#!/usr/bin/env node
var getSchemaForRelay = require('hacker-news-graphql/getSchemaForRelay');

// print full schema introspection for Babel Relay Plugin to use
getSchemaForRelay()
  .then(data => {
    process.stdout.write(JSON.stringify(data));
    process.stdout.on('finish', () => process.exit(0));
  })
  .catch(err => {
    process.stderr.write(err.toString());
    process.stderr.on('finish', () => process.exit(1));
  });
