#!/usr/bin/env node

var execSync = require('child_process').execSync;
var fetchScript = require.resolve('./fetch');

function scheduleFetch(interval) {
  setTimeout(() => {
    console.log(new Date(), 'starting fetch');
    console.time('fetch');
    execSync(fetchScript);
    console.log(new Date(), 'ran fetch');
    console.timeEnd('fetch');
    scheduleFetch(interval);
  }, interval * 1000);
}

scheduleFetch(30);
