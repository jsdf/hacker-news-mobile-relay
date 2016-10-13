#!/usr/bin/env node

const fetch = require('node-fetch');
const graphql = require('graphql');

function graphQLFetcher(graphQLEndpoint, graphQLParams) {
  return fetch(graphQLEndpoint, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphQLParams),
    credentials: 'include',
  }).then(function (response) {
    return response.text();
  }).then(function (responseBody) {
    try {
      return JSON.parse(responseBody);
    } catch (error) {
      return Promise.reject(responseBody);
    }
  });
}

// print full schema introspection for Babel Relay Plugin to use

const graphQLEndpoint = process.argv[2];

graphQLFetcher(graphQLEndpoint, {query: graphql.introspectionQuery})
  .then(data => {
    process.stdout.write(JSON.stringify(data));
    process.stdout.on('finish', () => process.exit(0));
  })
  .catch(err => {
    process.stderr.write(err.toString());
    process.stderr.on('finish', () => process.exit(1));
  });